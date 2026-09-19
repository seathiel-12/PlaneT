import type { UseFormReturn } from 'react-hook-form';
import type { z } from 'zod/v4';
import { BookFlightSchema, PassengerFormSchema, PassengerInfoSchema, PassengerSettingsSchema } from './validation';
export type FlightTicketProps = {
    company: string, 
    classTravel: 'Economy'| 'Business' | 'First Class',
    departureAt: string,
    landingAt: string,
    from: string,
    duration: string,
    to: string,
    price: number,
    seatsLeft: number
    typeFlight: string
}
export type BookFlightProps = z.infer<typeof BookFlightSchema>;

export type PassengerInfosFormProps = {
    num: number,
    form: UseFormReturn<PassengerFormProps, undefined, PassengerFormProps>,
}

export type PassengerSettingsFormProps = {
    form: UseFormReturn<PassengerFormProps, undefined, PassengerFormProps>,
}

export type PassengerSettings = z.infer<typeof PassengerSettingsSchema>;
export type PassengerInfo = z.infer<typeof PassengerInfoSchema>;
export type PassengerFormProps = z.infer<typeof PassengerFormSchema>;

export type PassengersInfosProps = PassengerInfo[];