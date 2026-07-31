import { create } from 'zustand';
import type { FlightSearchInfosType } from './SearchBar';


interface FlightSearchStoreProps {
  flightSearchInfos: FlightSearchInfosType,
    setFlightSearchInfos: (value: FlightSearchInfosType | ((prev: FlightSearchInfosType) => FlightSearchInfosType)) => void
}


export const useFlightSearchStore = create<FlightSearchStoreProps>((set)=>({
    flightSearchInfos: {
        destination:undefined,
        dates:{
            startDate: null,
            endDate: null
        },
        flexible: {
            from: [],
            for: undefined
        },
        travelers:{
            adults: 0,
            kids: 0,
            babies: 0,
            pets: 0
        }
    },
    setFlightSearchInfos: (value: FlightSearchInfosType | ((prev: FlightSearchInfosType) => FlightSearchInfosType)) => {
        if (typeof value === 'function') {
            set((state) => ({ flightSearchInfos: (value as (prev: FlightSearchInfosType) => FlightSearchInfosType)(state.flightSearchInfos) }));
        } else {
            set({ flightSearchInfos: value });
        }
    }
}))