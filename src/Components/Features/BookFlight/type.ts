import type { Control } from 'react-hook-form';
import { z } from 'zod/v4';
export type FlightTicketProps = {
    company: string, 
    classTravel: 'Economy'| 'Business' | 'First Class',
    departureAt: string,
    landingAt: string,
    from: string,
    duration: string,
    to: string,
    price: number,
    seatsLeft: string
    typeFlight: string
}
export type BookFlightProps = {
    travelFrom: string,
    travelTo: string,
    departureDate: string,
    returnDate: string,
    passengersCount: number,
    travelClass: 'Business' | 'Economy' | 'First Class' | string,
}

export type PassengerInfosFormProps ={
    num: number,
    control: Control<PassengersInfosProps>,
}

export type PassengerSettings = {
    seat: string,
    luggage: string,
    insurance: boolean
}

export const PassengerInfosSchema = z.object({
    num: z.number(),
    firstname: z.string().min(2, {error: 'Name required!'}),
    lastname: z.string().min(2, {error: 'Lastname required!'}),
    passportNumber: z.string().min(6, {error: 'Invalid passport number!'}),
    nationality: z.string(),
    bornAt: z.string(),    
    email: z.email(), 
    phoneNumber: z.string().min(10, {error: 'Invalid format number!'})   
})

export type PassengersInfosProps = z.infer<typeof PassengerInfosSchema>