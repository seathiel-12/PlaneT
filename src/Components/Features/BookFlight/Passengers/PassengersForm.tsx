import {  User } from 'lucide-react';
import PassengerInfosForm from './PassengerInfosForm';
import { useBookFlightStore } from '../store';


const PassengersForm = () => {
    const {flightInfos: {passengersCount}} = useBookFlightStore();
  return (
    <form className='rounded-2xl p-10 border-[0.5px] border-gray-300 shadow-xs bg-white my-10'>
        <div className='flex items-center gap-2'><User stroke='var(--sb-blue-250)' /> <h1 className='playfair-display text-2xl'>Passengers Informations</h1></div>
        <div>
            { Array(passengersCount).fill(0).map((pass, index) => <PassengerInfosForm num={pass + index + 1} />) }
        </div>
        
    </form>
  )
}

export default PassengersForm