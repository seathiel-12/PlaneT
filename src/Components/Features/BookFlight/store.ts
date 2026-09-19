import { create } from "zustand"
import type { BookFlightProps, PassengerInfo, PassengersInfosProps } from "./type"
import type { PassengerSettings } from "./type"
import type { Flight } from "../../../types";

type BookFlightstore = {
  flightInfos: BookFlightProps,
  flightSelected: Flight | undefined,
  passengersInfos: PassengersInfosProps,
  passengersSetting: PassengerSettings,
  price: number,
  isBooked:boolean,
  lookingFlights: Flight[],
  setLookingFlights: (lookingFlights:Flight[])=>void
  setFlightInfos: (value:BookFlightProps)=> void,
  setFlightSelectedInfos: (value: Flight)=> void,
  setPassengersInfos: (num:number, props:string, value: string | number)=> void,
  setPassengersSetting: (value: PassengerSettings)=> void,
  setPricePlus: (amount:number) => void,
  setIsBooked: (isBooked:boolean)=>void,
  reset: ()=>void
}

const createPassenger = (num: number): PassengerInfo => ({
  num,
  firstname: '',
  lastname: '',
  passportNumber: '',
  bornAt: '',
  phoneNumber: '',
  email: '',
  nationality: ''
});

const defaultBookingState = {
  flightInfos: {
    travelClass: "Economy" as 'Economy' | 'Business' | 'First Class',
    travelFrom: '',
    travelTo: '',
    departureDate: '',
    returnDate: '',
    passengersCount: 1
  },
  flightSelected: undefined,
  passengersInfos: [createPassenger(1)],
  passengersSetting: {
    seat: 'Window Seat',
    luggage: 'Carry-on Only',
    insurance: false
  },
  price: 0,
  isBooked: false,
  proceedToPayment: false,
  lookingFlights: []
}


export const useBookFlightStore = create<BookFlightstore>((set)=>({
  ...defaultBookingState,
  setLookingFlights: (value)=>{set(()=>({lookingFlights:value}))},
  setFlightInfos: (value)=> set((state)=> ({
    flightInfos: {...value},
    passengersInfos: Array.from({ length: value.passengersCount }, (_, index) => state.passengersInfos[index] ?? createPassenger(index + 1))
  })),
  setFlightSelectedInfos: (value)=> {set({flightSelected: {...value}})},
  setPassengersInfos: (num, props, value)=> {
    set((state)=>({passengersInfos: state.passengersInfos.map((passenger, index)=> index + 1 === num ? {...passenger, [props]: value} : passenger )}))
  },
  setPassengersSetting: (value)=> {set({passengersSetting: {...value}})},
  setPricePlus: (amount)=> {set((state)=>({price: ((state?.flightSelected?.price ?? 0) * (state?.flightInfos?.passengersCount ?? 0)) + amount}))} ,
  setIsBooked: (value) => {set(()=>({isBooked:value}))},
  reset: () => {set(defaultBookingState)} 
}))