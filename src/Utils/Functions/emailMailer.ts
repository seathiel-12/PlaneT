import emailjs from '@emailjs/browser';
import type { CachedBooking } from './bookingCache';
import { apiFetch } from './apiFetch';

type DevEmailMailerConfig = {
  serviceId: string;
  templateId: string;
  publicKey: string;
  blockedEmails: string[];
};

let initializedPublicKey: string | undefined;

/** Reads the EmailJS browser configuration used by Vite development mode. */
function getDevEmailMailerConfig(): DevEmailMailerConfig {
  const env = import.meta.env;
  return {
    serviceId: env.VITE_EMAILJS_SERVICE_ID?.trim() ?? '',
    templateId: env.VITE_EMAILJS_TEMPLATE_ID?.trim() ?? '',
    publicKey: env.VITE_EMAILJS_PUBLIC_KEY?.trim() ?? '',
    blockedEmails: (env.VITE_EMAILJS_BLOCKED_EMAILS ?? '')
      .split(',')
      .map((email) => email.trim().toLowerCase())
      .filter(Boolean),
  };
}

/**
 * Checks EmailJS configuration locally in development and through Vercel in production.
 * A failed status request is treated as an unavailable configuration.
 */
export async function isEmailMailerConfigured(): Promise<boolean> {
  if (!import.meta.env.PROD) {
    const { serviceId, templateId, publicKey } = getDevEmailMailerConfig();
    return Boolean(serviceId && templateId && publicKey);
  }

  try {
    const response = await apiFetch<{ configured: boolean }>('/api/proxy');
    return response.success && response.body?.configured === true;
  } catch {
    return false;
  }
}

/** Initializes the EmailJS browser SDK once for the development environment. */
function initializeDevEmailMailer(config: DevEmailMailerConfig): void {
  if (initializedPublicKey === config.publicKey) return;

  emailjs.init({
    publicKey: config.publicKey,
    blockHeadless: true,
    blockList: {
      list: config.blockedEmails,
      watchVariable: 'email',
    },
    limitRate: {
      id: 'planet-booking-confirmation-dev',
      throttle: 10_000,
    },
  });
  initializedPublicKey = config.publicKey;
}

/**
 * Sends a booking confirmation. Development uses the browser SDK; production sends
 * the template parameters to the Vercel function, which reads its server variables.
 * @param booking Confirmed booking data.
 * @param recipient Recipient email address.
 * @param travelerName Name displayed in the email.
 */
export async function sendBookingConfirmation(
  booking: CachedBooking,
  recipient: string,
  travelerName: string,
): Promise<void> {
  const fees = 50;
  const templateParams = {
    email: recipient,
    traveler_name: travelerName,
    booking_reference: booking.reference,
    flight_route: `${booking.flight.fromCountry} → ${booking.flight.toCountry}`,
    departure_date: booking.flight.departureAt,
    passengers_count: booking.passengersCount,
    total_price: booking.price,
    priceHT: booking.price - fees,
  };

  if (import.meta.env.PROD) {
    const response = await apiFetch<null>('/api/proxy', {
      method: 'POST',
      body: templateParams,
    });
    if (!response.success) {
      throw new Error(response.message || `Email provider returned ${response.status}.`);
    }
    return;
  }

  const config = getDevEmailMailerConfig();
  if (!config.serviceId || !config.templateId || !config.publicKey) {
    throw new Error('EmailJS is not configured for development.');
  }

  initializeDevEmailMailer(config);
  const response = await emailjs.send(config.serviceId, config.templateId, templateParams);
  if (response.status < 200 || response.status >= 300) {
    throw new Error(response.text || `Email provider returned ${response.status}.`);
  }
}
