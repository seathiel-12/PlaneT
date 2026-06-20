import { create } from "zustand"
import type { BookFlightProps, PassengersInfosProps } from "./type"
import type { FlightTicketProps, PassengerSettings } from "./type"

type BookFlightstore = {
  flightInfos: BookFlightProps,
  flightSelected: FlightTicketProps,
  passengersInfos: PassengersInfosProps[],
  passengersSetting: PassengerSettings,
  price: number,
  setFlightInfos: (value:BookFlightProps)=> void,
  setFlightSelectedInfos: (value: FlightTicketProps)=> void,
  setPassengersInfos: (num:number, props:string, value: string | number)=> void,
  setPassengersSetting: (value: PassengerSettings)=> void,
  setPricePlus: (amount:number) => void,

}

export const useBookFlightStore = create<BookFlightstore>((set)=>({
  flightInfos: {
    travelClass: 'Business',
    travelFrom: null,
    travelTo: null,
    departureDate: '',
    returnDate: '',
    passengersCount: 1
  },
  flightSelected: {
        company: 'Air France',
        classTravel: 'Business',
        departureAt: new Date().toUTCString(),
        landingAt: new Date().toUTCString(),
        duration: '7h 30min',
        from: 'Paris CDG',
        to: 'Japan JPY',
        price: 869,
        typeFlight:'Direct',
        seatsLeft: '32'
    },
  passengersInfos: [{
    num: 1,
    firstname: '',
    lastname: '',
    passportNumber: '',
    bornAt: '',
    phoneNumber: '',
    email:'',
    nationality: ''
  }],
  passengersSetting: {
    seat: 'Window Seat',
    luggage: 'Carry-on Only',
    insurance: false
  },
  price: 0,
  proceedToPayment: false,
  setFlightInfos: (value)=> set({flightInfos: {...value}}),
  setFlightSelectedInfos: (value)=> {set({flightSelected: {...value}})},
  setPassengersInfos: (num, props, value)=> {
    set((state)=>({passengersInfos: state.passengersInfos.map((passenger, index)=> index + 1 === num ? {...passenger, [props]: value} : passenger )}))
  },
  setPassengersSetting: (value)=> {set({passengersSetting: {...value}})},
  setPricePlus: (amount)=> {set((state)=>({price: state.flightSelected.price + amount}))} 
} 
))