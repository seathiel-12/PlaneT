import { create } from "zustand"
import type { BookFlightProps, PassengersInfosProps } from "./type"
import type { FlightTicketProps, PassengerSettings } from "./type"

type BookFlightstore = {
  flightInfos: BookFlightProps,
  flightSelected: FlightTicketProps | undefined,
  passengersInfos: PassengersInfosProps[],
  passengersSetting: PassengerSettings,
  price: number,
  isBooked:boolean,
  setFlightInfos: (value:BookFlightProps)=> void,
  setFlightSelectedInfos: (value: FlightTicketProps)=> void,
  setPassengersInfos: (num:number, props:string, value: string | number)=> void,
  setPassengersSetting: (value: PassengerSettings)=> void,
  setPricePlus: (amount:number) => void,
  setIsBooked: (isBooked:boolean)=>void
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
  flightSelected: undefined,
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
  isBooked: false,
  proceedToPayment: false,
  setFlightInfos: (value)=> set({flightInfos: {...value}}),
  setFlightSelectedInfos: (value)=> {set({flightSelected: {...value}})},
  setPassengersInfos: (num, props, value)=> {
    set((state)=>({passengersInfos: state.passengersInfos.map((passenger, index)=> index + 1 === num ? {...passenger, [props]: value} : passenger )}))
  },
  setPassengersSetting: (value)=> {set({passengersSetting: {...value}})},
  setPricePlus: (amount)=> {set((state)=>({price: (state?.flightSelected?.price ?? 0) + amount}))} ,
  setIsBooked: (value) => {set(()=>({isBooked:value}))}
} 
))