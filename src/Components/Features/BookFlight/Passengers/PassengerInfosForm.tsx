import { ChevronDown, ChevronRight, Luggage } from 'lucide-react'
import TextField from '../../../../Utils/Components/TextField/TextField'
import { useEffect, useState } from 'react';
import Card from '../../../../Utils/Components/Card/Card';

import { useStepperContext } from '../../../Pages/BookFlight';
import type { PassengerInfosFormProps } from '../type';
import { useBookFlightStore } from '../store';

const countries = ['Benin', 'Togo', "Cote d'ivoire", "Senegal"];


const PassengerInfosForm: React.FC<PassengerInfosFormProps> = ({num}) => {
    const [isVisible, setIsVisible] = useState(num === 1)
    const {passengersInfos, setPassengersInfos} = useBookFlightStore();
  return (
       <Card classname='p-5 mt-5 transition-all sizing-animation'>
            <div>
            <div className='flex justify-between items-center'>
               <h2 className='font-semibold'>Passenger {num}</h2>
               <div onClick={()=>setIsVisible(!isVisible)}><ChevronDown width={17} className='text-gray-400'/></div> 
            </div>
            { isVisible && 
                <div className='opacity-animation'>
                   <div className='grid grid-cols-2 gap-8'>
                        <TextField value={passengersInfos[num - 1 ].firstname} onChange={(e)=> {
                            if(e)
                                setPassengersInfos(num, 'firstname', e.currentTarget.value)
                        }} label='First Name *' placeholder='As shown on passport' />
                        <TextField value={passengersInfos[num - 1].lastname} onChange={(e)=> {
                            if(e)
                                setPassengersInfos(num, 'lastname', e.currentTarget.value)
                        }
                            } label='Last Name *' placeholder='As shown on passport' />
                    </div>

                    <div className='grid grid-cols-2 gap-8 items-baseline'>
                        <div>
                            <label htmlFor="nationality" className='font-semibold'>Nationality</label>
                            <select name="nationality" id="nationality" className='bg-gray-50 block rounded-xl border-[0.5px] border-gray-300 shadow-xs py-2 px-3 text-gray-400 mt-2'>
                                <option value="" hidden>Select a country</option>
                                {countries.map(country => <option key={country} value={country}>{country}</option>)}
                            </select>
                        </div>
                        <TextField value={passengersInfos[num - 1].passportNumber} onChange={(e)=> {
                            if(e)
                                setPassengersInfos(num, 'passportNumber', e.currentTarget.value)
                        }
                            } label='Passport Number *' placeholder='Enter passport number' />
                    </div>

                    <div className='grid grid-cols-3 gap-5'>
                        <TextField value={passengersInfos[num - 1].bornAt} onChange={(e)=> {
                            if(e)
                                setPassengersInfos(num, 'bornAt', e.currentTarget.value)
                        }
                            } type='date' label='Date of Birth *' placeholder=''/>
                        <TextField value={passengersInfos[num - 1].email} onChange={(e)=> {
                            if(e)
                                setPassengersInfos(num, 'email', e.currentTarget.value)
                        }
                            } label='Email *' placeholder='email@example.com' type='email' />
                        <TextField value={passengersInfos[num - 1].phoneNumber} onChange={(e)=> {
                            if(e)
                                setPassengersInfos(num, 'phoneNumber', e.currentTarget.value)
                        }
                            } label='Phone Number *' placeholder='+1 554 755 9400' />  
                    </div> 
                </div>
            }
            </div>
        </Card>        
  )
}

export default PassengerInfosForm


export const PassengerSetting = () => {
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
        console.log(amountOptions)
    }, [passengersSetting])

    return (
        <div>
            <Card classname='p-10 bg-white'>
                <h2 className='playfair-display text-2xl'>Seat Preference</h2>

                <div>
                    <label htmlFor="seat" className='grid grid-cols-3 gap-5 my-5'>
                        {
                            seatSettings.map(({title, subtitle}, index) => 
                                <label onClick={()=>{
                                    setPassengersSetting({...passengersSetting, seat:title})
                                }} htmlFor={title} className={(passengersSetting.seat === title ? 'bg-(--sb-blue-fade-4) border-(--sb-blue-250)' : 'border-gray-200') + ' flex gap-4 items-baseline rounded-2xl border-[0.5px]  p-5 py-4'} key={index}>
                                    <input checked={title === passengersSetting.seat} className='scale-130 top-[7.5%] relative' type="radio" name="seat" id={title} />
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

            <Card classname='p-10 bg-white my-10'>
                <div className='flex items-center gap-3'>
                    <Luggage width={24}stroke='var(--sb-blue-250)'/>
                    <h2 className='playfair-display text-2xl'>Luggage Options</h2>
                </div>

                <div>
                <label htmlFor="luggage" className='grid grid-cols-3 gap-5 my-5'>
                    {
                        luggageSettings.map(({title, subtitle, price}, index) => 
                            <label onClick={()=>{
                                setPassengersSetting({...passengersSetting, luggage: title})
                            }} htmlFor={title} className={(passengersSetting.luggage === title ? 'bg-(--sb-blue-fade-4) border-(--sb-blue-250)' : 'border-gray-200') + ' flex gap-4 items-baseline rounded-2xl border-[0.5px]  p-5 py-4'} key={index}>
                                <input checked={title === passengersSetting.luggage} className='scale-130 top-[7.5%] relative' type="radio" name="luggage" id={title} />
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

            <Card classname='p-10 bg-white my-10'>
                <div>

                    <h2 className='playfair-display text-2xl'>Travel Insurance</h2>
                </div>  

                <label  className={ (passengersSetting.insurance ? 'bg-(--sb-blue-fade-4) border-(--sb-blue-250)' : 'border-gray-200') + ' border-[0.5px] p-5 flex gap-4 items-baseline rounded-2xl mt-5'} htmlFor='insurance'>
                    <input onClick={()=> {
                        setPassengersSetting({...passengersSetting, insurance: !passengersSetting.insurance})
                    }} type="checkbox" name='insurance' id='insurance' className='scale-130 top-[7.5%] relative rounded-xl'/>
                    <div className='text-lg w-full'>
                        <p className='flex w-full justify-between items-center font-semibold'><span>Comprehensive Travel Protection</span> <span className='text-(--sb-blue-250) font-medium'>{`+$${insurancePrice}/person`}</span></p>
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
    const {price, flightInfos: {passengersCount}} = useBookFlightStore();
    return (
        <div className='border border-(--sb-blue-250) px-7 py-10 bg-(--sb-blue-fade-4) flex items-center justify-between my-10 rounded-2xl'>
            <div className='text-left'>
                <p className='text-gray-500'>Total Price</p>
                <p className='text-5xl font-semibold'>${price}</p>
                <p className='text-gray-500'>{passengersCount} passenger(s) • All fees included</p>
            </div>
            <button onClick={()=> setActiveStep(3)} className='rounded-2xl py-3 px-5 bg-(--sb-blue-250) text-white flex items-center gap-2'>
                <span>Continue to payment</span>
                <ChevronRight/>
            </button>
        </div>
    )
}