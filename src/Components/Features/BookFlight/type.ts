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
    num: number
}

export type PassengerSettings = {
    seat: string,
    luggage: string,
    insurance: boolean
}

export type PassengersInfosProps = {
    num: number,
    firstname: string,
    lastname: string,
    passportNumber: string,
    nationality: string,
    bornAt: string,
    email: string, 
    phoneNumber: string
}


