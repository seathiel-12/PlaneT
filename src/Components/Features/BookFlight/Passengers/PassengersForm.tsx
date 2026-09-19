import {  User } from 'lucide-react';
import PassengerInfosForm, { PassengerSetting } from './PassengerInfosForm';
import { useBookFlightStore } from '../store';
import { useForm } from 'react-hook-form';
import { type PassengerFormProps } from '../type';
import { PassengerFormSchema } from '../validation';
import { zodResolver } from '@hookform/resolvers/zod';


const PassengersForm = () => {
    const {flightInfos: {passengersCount}} = useBookFlightStore();
    const {passengersInfos, passengersSetting} = useBookFlightStore();
    const form=useForm<PassengerFormProps, undefined, PassengerFormProps>({
      mode: 'all',
      resolver: zodResolver(PassengerFormSchema),
      defaultValues: {
        passengers: passengersInfos,
        settings: passengersSetting,
      },
    });

    const onsubmit = (data:PassengerFormProps)=> {
      console.log(data);
    }
  return (
    <form onSubmit={form.handleSubmit(onsubmit)} className='rounded-2xl p-4 sm:p-6 md:p-10 border-[0.5px] border-gray-300 shadow-xs bg-white my-6 sm:my-10'>
      <div className='flex items-start gap-2'><User className='mt-1 shrink-0' stroke='var(--sb-blue-250)' /> <h1 className='playfair-display text-xl sm:text-2xl'>Passengers Informations</h1></div>
        <div>
            { Array.from({length: passengersCount}, (_, index) => <PassengerInfosForm key={index} form={form} num={index + 1} />) }
        </div>

        <div className=' mt-10'>
          <PassengerSetting form={form}/>
        </div>
    </form>
  )
}

export default PassengersForm