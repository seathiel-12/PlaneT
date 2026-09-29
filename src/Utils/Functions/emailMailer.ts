import type { CachedBooking } from './bookingCache';

type EmailSettings = { serviceId: string; templateId: string; publicKey: string };

/** Checks whether the public EmailJS settings required by the frontend are present. */
export function isEmailMailerConfigured(): boolean {
  const env = import.meta.env;
  return Boolean(env.EMAILJS_SERVICE_ID && env.EMAILJS_TEMPLATE_ID && env.EMAILJS_PUBLIC_KEY);
}

/**
 * Sends a booking confirmation through EmailJS using its browser REST endpoint.
 * Configure a template with `to_email`, `booking_reference`, `traveler_name`,
 * `flight_route`, `departure_date`, `passengers_count`, and `total_price` variables.
 * Only the provider's public key is used in this frontend integration.
 * @param booking Confirmed booking data.
 * @param recipient Recipient email address.
 * @param travelerName Name displayed in the email.
 */
export async function sendBookingConfirmation(booking: CachedBooking, recipient: string, travelerName: string): Promise<void> {
  const env = import.meta.env;
  const settings: EmailSettings = {
    serviceId: env.EMAILJS_SERVICE_ID ?? '',
    templateId: env.EMAILJS_TEMPLATE_ID ?? '',
    publicKey: env.EMAILJS_PUBLIC_KEY ?? '',
  };
  if (!settings.serviceId || !settings.templateId || !settings.publicKey) {
    throw new Error('EmailJS is not configured. Add its service, template, and public key to the local environment.');
  }

  const FEES = 50;
  const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      service_id: settings.serviceId,
      template_id: settings.templateId,
      user_id: settings.publicKey,
      template_params: {
        email: recipient,
        traveler_name: travelerName,
        booking_reference: booking.reference,
        flight_route: `${booking.flight.fromCountry} → ${booking.flight.toCountry}`,
        departure_date: booking.flight.departureAt,
        passengers_count: booking.passengersCount,
        total_price: booking.price,
        priceHT: booking.price - FEES      
      },
    }),
  });
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Email provider returned ${response.status}.`);
  }
}
