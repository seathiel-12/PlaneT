import { ChevronDown, ChevronRight, Luggage } from 'lucide-react'
import { useEffect, useState } from 'react';
import Card from '../../../../Utils/Components/Card/Card';

import { useStepperContext } from '../../../Pages/BookFlight';
import type { PassengerInfosFormProps, PassengerSettingsFormProps } from '../type';
import { useBookFlightStore } from '../store';
import { Controller } from 'react-hook-form';
import { Select, TextInput } from '@mantine/core';
import { clsx } from 'clsx';

const countries = ['Benin', 'Togo', "Cote d'ivoire", "Senegal"];


const PassengerInfosForm: React.FC<PassengerInfosFormProps> = ({ num, form}) => {
    const [isVisible, setIsVisible] = useState(num === 1)
    const {passengersInfos, setPassengersInfos} = useBookFlightStore();
    const passenger = passengersInfos[num-1];
  return (
    <Card classname='p-4 sm:p-5 mt-5 transition-all sizing-animation'>
            <div>
            <div className='flex justify-between items-center'>
               <h2 className='font-semibold'>Passenger {num}</h2>
               <div onClick={() => setIsVisible(!isVisible)}><ChevronDown width={17} className='text-gray-400 cursor-pointer'/></div> 
            </div>
            { isVisible && 
                <div className='opacity-animation'>
                   <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-8 my-3'>
                        <Controller 
                            control={form.control}
                            name={`passengers.${num - 1}.firstname`}
                            render={({field,fieldState:{error}})=> 
                            <TextInput 
                                value={field.value} 
                                error={error?.message} 
                                required 
                                onChange={(e)=> {
                                    if(e)
                                    setPassengersInfos(num, 'firstname', e.currentTarget.value)
                                    field.onChange(e);
                                }} 
                                label='First Name' 
                                placeholder='As shown on passport' />}
                        />
                       <Controller 
                            name={`passengers.${num - 1}.lastname`}
                            control={form.control}
                            render={({field, fieldState:{error}})=>
                            <TextInput 
                                error={error?.message} 
                                required 
                                value={field.value} 
                                onChange={(e)=> {
                                    if(e)
                                    setPassengersInfos(num, 'lastname', e.currentTarget.value)
                                field.onChange(e);
                                }
                            } label='Last Name' placeholder='As shown on passport' />}
                       />
                        
                    </div>

                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-8 items-baseline my-3'>
                        <div>
                            <Controller
                                name={`passengers.${num - 1}.nationality`}
                                control={form.control}
                                render={({field})=>
                                    <Select
                                        {...field}
                                        label='Nationality'
                                        placeholder='Select a country'
                                        data={countries}
                                        required
                                        onChange={(value)=>{
                                            if(value)
                                            setPassengersInfos(num, 'nationality', value)
                                        }}
                                        value={passenger?.nationality ?? ''}
                                    />
                                }
                            />
    
                        </div>
                        <Controller 

                                name={`passengers.${num - 1}.passportNumber`}
                            control={form.control}
                            render={({field, fieldState:{error}})=>
                            <TextInput 
                                error={error?.message} 
                                required 
                                value={field.value} 
                                onChange={(e)=> {
                                    if(e)
                                        setPassengersInfos(num, 'passportNumber', e.currentTarget.value)
                                    field.onChange(e);
                                }}
                                label='Passport Number' 
                                placeholder='Enter passport number' 
                            />}
                        
                       />
                        
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-3 gap-5 my-3'>
                        <Controller 
                            control={form.control}
                            name={`passengers.${num - 1}.bornAt`}
                            render={({field, fieldState:{error}})=>
                            <TextInput error={error?.message} required value={field.value} onChange={(e)=> {
                            if(e)
                                setPassengersInfos(num, 'bornAt', e.currentTarget.value)
                            field.onChange(e);
                        }
                            } type='date' label='Date of Birth' placeholder=''/>}
                        />
                        
                        <Controller 
                            control={form.control}
                            name={`passengers.${num - 1}.email`}
                            render={({field, fieldState:{error}})=>
                            <TextInput 
                                error={error?.message} 
                                required 
                                value={field.value} 
                                onChange={(e)=> {
                                    if(e)
                                        setPassengersInfos(num, 'email', e.currentTarget.value)
                                    field.onChange(e);
                                }}
                                label='Email' 
                                placeholder='email@example.com' 
                                type='email' 
                            />}
                        />
                        
                        <Controller 
                            control={form.control}
                            name={`passengers.${num - 1}.phoneNumber`}
                            render={({field, fieldState:{error}})=>
                            <TextInput 
                                error={error?.message} 
                                required 
                                value={field.value} 
                                onChange={(e)=> {
                                    if(e)
                                        setPassengersInfos(num, 'phoneNumber', e.currentTarget.value)
                                    field.onChange(e);
                                }}
                                label='Phone Number' 
                                placeholder='+1 554 755 9400' 
                            />}
                        
                        />
                          
                    </div> 
                </div>
            }
            </div>
        </Card>        
  )
}

export default PassengerInfosForm


export const PassengerSetting = ({form}: PassengerSettingsFormProps) => {
    const seatSettings = [
        {title: 'Window Seat', subtitle: 'Enjoy the view'},
        {title: 'Aisle Seat', subtitle: 'Easy access'},
        {title: 'Middle Seat', subtitle: 'Between travelers'}
    ];
    const luggageSettings = [
        { title: 'Carry-on Only', subtitle: '1 bag up to 10kg', price: 0 },
        { title: 'Checked Bag', subtitle: '1 bag up to 23kg', price: 35 },
        { title: 'Extra Luggage', subtitle: '2 bag up to 23kg each', price: 75 },
    ]
    const insurancePrice = 29;

    const {setPricePlus, flightInfos: {passengersCount}, passengersSetting, setPassengersSetting} = useBookFlightStore();


    useEffect(()=>{
        const amountOptions = ((luggageSettings.find((luggage)=>luggage.title === passengersSetting.luggage)?.price ?? 0) + (passengersSetting.insurance ? insurancePrice : 0)) *  passengersCount;

        setPricePlus(amountOptions);
    }, [passengersSetting])

    return (
        <div>
            <Card classname='p-5 sm:p-10 bg-white'>
                <h2 className='playfair-display text-xl sm:text-2xl'>Seat Preference</h2>

                <div>
                    <label htmlFor="seat" className='grid grid-cols-1 md:grid-cols-3 gap-5 my-5'>
                        {
                            seatSettings.map(({title, subtitle}, index) => 
                                <label onClick={()=>{
                                    setPassengersSetting({...passengersSetting, seat:title})
                                }} htmlFor={title} className={(passengersSetting.seat === title ? 'bg-(--sb-blue-fade-4) border-(--sb-blue-250)' : 'border-gray-200') + ' flex gap-4 items-baseline rounded-2xl border-[0.5px] p-4 sm:p-5 py-4'} key={index}>
                                    <Controller
                                        control={form.control}
                                        name='settings.seat'
                                        render={({field, fieldState: {error}}) => <>
                                            <input {...field} value={title} onChange={(event) => {
                                                field.onChange(event);
                                                setPassengersSetting({...passengersSetting, seat: title});
                                            }} checked={title === passengersSetting.seat} className='scale-130 top-[7.5%] relative' type="radio" name="seat" id={title} />
                                            {error && <span className='text-red-600 text-sm'>{error.message}</span>}
                                        </>}
                                    />
                                    <div>
                                        <p className='font-semibold'>{title}</p>
                                        <p className=' text-gray-500'>{subtitle}</p>
                                </div>
                                </label>
                            )
                        }
                    </label>
                </div>
            </Card>

            <Card classname='p-5 sm:p-10 bg-white my-6 sm:my-10'>
                <div className='flex items-center gap-3'>
                    <Luggage width={24}stroke='var(--sb-blue-250)'/>
                    <h2 className='playfair-display text-xl sm:text-2xl'>Luggage Options</h2>
                </div>

                <div>
                <label htmlFor="luggage" className='grid grid-cols-1 md:grid-cols-3 gap-5 my-5'>
                    {
                        luggageSettings.map(({title, subtitle, price}, index) => 
                            <label onClick={()=>{
                                setPassengersSetting({...passengersSetting, luggage: title})
                            }} htmlFor={title} className={(passengersSetting.luggage === title ? 'bg-(--sb-blue-fade-4) border-(--sb-blue-250)' : 'border-gray-200') + ' flex gap-4 items-baseline rounded-2xl border-[0.5px] p-4 sm:p-5 py-4'} key={index}>
                                <Controller
                                    control={form.control}
                                    name='settings.luggage'
                                    render={({field, fieldState: {error}}) => <>
                                        <input {...field} value={title} onChange={(event) => {
                                            field.onChange(event);
                                            setPassengersSetting({...passengersSetting, luggage: title});
                                        }} checked={title === passengersSetting.luggage} className='scale-130 top-[7.5%] relative' type="radio" name="luggage" id={title} />
                                        {error && <span className='text-red-600 text-sm'>{error.message}</span>}
                                    </>}
                                />
                                <div className='w-full'>
                                    <p className='font-semibold flex justify-between w-full'><span>{title}</span> <span className='text-(--sb-blue-250) font-medium'>{price === 0 ? 'Included' : `+${price}$/person`}</span></p>
                                    <p className=' text-gray-500'>{subtitle}</p>
                               </div>
                            </label>
                        )
                    }
                </label>
            </div>
            </Card>

            <Card classname='p-5 sm:p-10 bg-white my-6 sm:my-10'>
                <div>

                    <h2 className='playfair-display text-xl sm:text-2xl'>Travel Insurance</h2>
                </div>  

                <label  className={ (passengersSetting.insurance ? 'bg-(--sb-blue-fade-4) border-(--sb-blue-250)' : 'border-gray-200') + ' border-[0.5px] p-4 sm:p-5 flex gap-4 items-start sm:items-baseline rounded-2xl mt-5'} htmlFor='insurance'>
                    <Controller
                        control={form.control}
                        name='settings.insurance'
                        render={({field, fieldState: {error}}) => <>
                            <input
                                name={field.name}
                                ref={field.ref}
                                onBlur={field.onBlur}
                                checked={passengersSetting.insurance}
                                onChange={(event) => {
                                field.onChange(event);
                                setPassengersSetting({...passengersSetting, insurance: event.currentTarget.checked});
                            }} type="checkbox" id='insurance' className='scale-130 top-[7.5%] relative rounded-xl'/>
                            {error && <span className='text-red-600 text-sm'>{error.message}</span>}
                        </>}
                    />
                    <div className='text-base sm:text-lg w-full'>
                        <p className='flex flex-col sm:flex-row w-full justify-between items-start sm:items-center gap-1 font-semibold'><span>Comprehensive Travel Protection</span> <span className='text-(--sb-blue-250) font-medium whitespace-nowrap'>{`+$${insurancePrice}/person`}</span></p>
                        <p className='text-gray-400'>Cover trip cancellation, medical emergencies, lost luggage, and flight delays up to $50,000.</p>
                    </div>
                </label>
            </Card>

            <PriceFlight />
        </div>
        
    )
}

const PriceFlight = ()=>{
    const {setActiveStep} = useStepperContext();
    const {price, flightInfos: {passengersCount}, passengersInfos} = useBookFlightStore();

    return (
        <div className='border border-(--sb-blue-250) px-5 sm:px-7 py-7 sm:py-10 bg-(--sb-blue-fade-4) flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-4 justify-between my-6 sm:my-10 rounded-2xl'>
            <div className='text-left'>
                <p className='text-gray-500'>Total Price</p>
                <p className='text-4xl sm:text-5xl font-semibold'>${price}</p>
                <p className='text-gray-500'>{passengersCount} passenger(s) • All fees included</p>
            </div>
            <button type='submit' onClick={()=> {
                if(passengersInfos.every(p=> Object.values(p).every(val=> String(val).trim().length>0)))
                    setActiveStep(3)
                }
            } 
            className={clsx('rounded-2xl py-3 px-5 bg-(--sb-blue-250) text-white flex items-center justify-center gap-2 w-full sm:w-auto')}>
                <span>Continue to payment</span>
                <ChevronRight/>
            </button>
        </div>
    )
}