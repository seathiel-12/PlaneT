import { z } from 'zod/v4';
import { email } from 'zod/v4-mini';

const isTodayOrLater = (value: string) => {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return false;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);

    return date >= today;
};

const FlightDateSchema = z.string()
    .trim()
    .min(1, { error: 'Date is required.' })
    .refine(isTodayOrLater, { error: 'Date must be today or later.' });

export const BookFlightSchema = z.object({
    travelFrom: z.string().trim().min(2, { error: 'Departure city is required.' }),
    travelTo: z.string().trim().min(2, { error: 'Destination city is required.' }),
    departureDate: FlightDateSchema,
    returnDate: FlightDateSchema.optional().or(z.literal('')),
    passengersCount: z.number().int().min(1).max(8),
    travelClass: z.enum(['Business', 'Economy', 'First Class'])
});

export const PassengerInfoSchema = z.object({
    num: z.number().int().min(1),
    firstname: z.string().trim().min(2, { error: 'Name required!' }),
    lastname: z.string().trim().min(2, { error: 'Lastname required!' }),
    passportNumber: z.string().trim().min(6, { error: 'Invalid passport number!' }),
    nationality: z.string().trim().min(1, { error: 'Nationality is required.' }),
    bornAt: z.string().trim().min(1, { error: 'Date of birth is required.' }),
    email: z.email({ error: 'Invalid email address.' }),
    phoneNumber: z.string().trim().min(10, { error: 'Invalid format number!' })
});

export const PassengersSchema = z.array(PassengerInfoSchema).min(1);

export const PassengerSettingsSchema = z.object({
    seat: z.string().trim().min(1),
    luggage: z.string().trim().min(1),
    insurance: z.boolean()
});

export const PassengerFormSchema = z.object({
    passengers: PassengersSchema,
    settings: PassengerSettingsSchema,
});

export const PaymentCreditSchema = z.object({
    cardNumber: z.string().trim().min(16, { error: 'Card number must be 16 digits.' }).max(16, { error: 'Card number must be 16 digits.' }),
    cardholderName: z.string().trim().min(2, { error: 'Cardholder name is required.' }).refine((value) => /^[a-zA-Z\s]+$/.test(value), { error: 'Cardholder name must contain only letters and spaces.' }),
    expiryDate: z.string().trim().min(1, { error: 'Expiry date is required.' }),
    cvv: z.string().trim().min(3, { error: 'CVV must be 3 digits.' }).max(3, { error: 'CVV must be 3 digits.' }),
    agreement: z.literal(true, { error: 'You must accept the booking terms.' })
});

export type PaymentCreditType = z.infer<typeof PaymentCreditSchema>;

export const PaymentMyFedaSchema = z.object({
    agreement: z.literal(true, { error: 'You must accept the booking terms.' })
});

export type PaymentMyFedaType = z.infer<typeof PaymentMyFedaSchema>;

export const paymentMethodSchema = (type: string) => {
    return type === 'credit-card' ? PaymentCreditSchema : PaymentMyFedaSchema;
}

export const ContactFormSchema = z.object({
    firstname: z.string().trim().min(2, { error: 'First name name is required.' }).refine((value) => /^[a-zA-Z\s]+$/.test(value), { error: 'First name must contain only letters and spaces.' }),
    lastname: z.string().trim().min(2, { error: 'Last name name is required.' }).refine((value) => /^[a-zA-Z\s]+$/.test(value), { error: 'Last name must contain only letters and spaces.' }),
    email: z.email({ error: 'Invalid email address.' }),
    phoneNumber: z.string().trim().min(10, { error: 'Invalid format number!' }),
    subject: z.string(),
    message: z.string()
})

export type ContactFormType = z.infer<typeof ContactFormSchema>;
