import { type FC } from 'react'
import { useFlightSearchStore } from '../useFlightSearchStore';

export const Counter: FC<{keys: 'adults' | 'kids' | 'babies' | 'pets' }> = ({keys}) => {
  const {flightSearchInfos, setFlightSearchInfos} = useFlightSearchStore();
  return (
    <div className='flex gap-3 items-center'>
        <button onClick={()=>{
          if(flightSearchInfos.travelers[keys] > 0){
            setFlightSearchInfos({
              ...flightSearchInfos,
              travelers: {
                ...flightSearchInfos.travelers,
                [keys]: flightSearchInfos.travelers[keys] - 1
              }
            })
          }
          }} className={'w-8 h-8 rounded-full bg-neutral-300 shadow-2xs font-bold cursor-pointer duration-200 hover:bg-gray-100' + (
            (!flightSearchInfos.travelers[keys] || 
            (keys ==='adults' && Object.entries(flightSearchInfos.travelers).some(([key,val])=>key!=='adults' && val>0) && flightSearchInfos.travelers.adults === 1)) ? ' opacity-40' : ' hover:scale-110')}
          disabled={(keys ==='adults' && Object.entries(flightSearchInfos.travelers).some(([key,val])=>key!=='adults' && val>0) && flightSearchInfos.travelers.adults === 1)}
          >-</button>
        <span>{Number(flightSearchInfos.travelers[keys])}</span>
        <button onClick={()=>{
            setFlightSearchInfos({
              ...flightSearchInfos,
              travelers: {
                ...flightSearchInfos.travelers,
                adults: (keys !== 'adults' && flightSearchInfos.travelers.adults === 0) ? 1 : flightSearchInfos.travelers.adults,
                [keys]: flightSearchInfos.travelers[keys] + 1
              }
            })
        }} className='w-8 h-8 rounded-full bg-neutral-200 font-bold cursor-pointer hover:scale-110 duration-200 hover:bg-gray-100'>+</button>
    </div>
  )
}

export default Counter;
