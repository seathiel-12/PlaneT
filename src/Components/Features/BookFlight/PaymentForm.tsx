import { Clock, CornerRightDown, CreditCard, Lock, MapPin, Plane, Shield } from 'lucide-react'
import Card from '../../../Utils/Components/Card/Card'
import { useBookFlightStore } from './store';
import { formatDuration } from '../../../Utils/Functions/formatDuration';
import { useEffect, useState, type ReactNode } from 'react';
import { TextInput } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { paymentMethodSchema, type PaymentCreditType, type PaymentMyFedaType } from './validation';
import { routeMatcher } from '../../router';

const PaymentForm = () => {
    const [currentMethod, setCurrentMethod] = useState(0);
    const {control, formState: {isValid, isLoading}, register} = useForm<PaymentCreditType | PaymentMyFedaType>({
        resolver: zodResolver(paymentMethodSchema(currentMethod === 0 ? 'credit-card' : 'myfeda')),
        mode: 'all',
    });
    const paymentMethod: {title:string, subtitle: string, Icon: typeof CreditCard, render:()=>ReactNode}[] = [
        {
            title: 'Credit Card',
            subtitle: 'Visa, Mastercard, Amex',
            Icon: CreditCard,
            render: ()=> <Card classname='p-7 bg-white my-5'>
                <h2 className='text-2xl font-semibold mb-5'>Card Details</h2>
                <Controller
                    name='cardNumber'
                    control={control}
                    render={({field, fieldState:{error}})=> <TextInput required className="my-3" leftSection={<CreditCard/>} type='number'  placeholder='1234 5678 9012 3456' label='Card Number' maxLength={16} {...field} error={error?.message ?? error?.root?.message} />}
                />
                <Controller
                    name='cardholderName'
                    control={control}
                    render={({field, fieldState:{error}})=> <TextInput required className="my-3" leftSection={<CreditCard/>} type='text'  placeholder='John Doe' label='Cardholder Name' {...field} error={error?.message ?? error?.root?.message} />}
                />
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                    <Controller
                        name='expiryDate'
                        control={control}
                        render={({field, fieldState:{error}})=> <TextInput required className="my-3" type='date' placeholder='MM/YY' label='Expiry Date' {...field} error={error?.message ?? error?.root?.message} />}
                    />
                    <Controller
                        name='cvv'
                        control={control}
                        render={({field, fieldState:{error}})=> <TextInput className="my-3" required leftSection={<Lock/>} type='number' maxLength={3} placeholder='123' label='CVV' {...field} error={error?.message ?? error?.root?.message} />}
                    />
                </div>

            </Card>
        },
        {
            title: 'MyFeda',
            subtitle: 'MTN MoMo, Moov Money',
            Icon: CreditCard,
            render: ()=> <Card classname='py-30 px-5 my-5 bg-white'>
                <p className='text-3xl text-gray-600 font-semibold text-center'>API MyFeda will be integrated soon.</p>
            </Card>
        }
    ];

    const { price, flightSelected, setIsBooked, flightInfos: {passengersCount, travelClass}, passengersSetting: {luggage}, setFlightSelectedInfos } = useBookFlightStore();
    const { company = '', fromCountry = '', toCountry = '', departureAt = '', landingAt = '' } = flightSelected ?? {};
    const FEES = 50;
    const navigate = useNavigate();
    
        useEffect(()=>{
        setFlightSelectedInfos({
            company: "Air France",
            classTravel: "Economy",
            fromCountry: "Paris, France",
            continent: "America",
            toCountry: "New York, USA",
            departureAt: "2026-08-20T08:00:00Z",
            landingAt: "2026-08-20T12:30:00Z",
            duration: "4h30",
            price: 450,
            typeFlight: "Direct",
            seatsLeft: 12,
            city: "New York",
            rating: 4.2,
            ratingCount: 128,
            description: "Vol direct confortable avec service à bord.",
            caracteristics: ["Wifi", "Repas inclus", "Divertissement"],
            isLiked: false,
            isPopular: true,
            imagePath: ["https://loremflickr.com/1280/720/new-york,usa"]
        });
    },[]);


  return (
    <form className='my-6 sm:my-10 flex flex-col lg:flex-row gap-5'>
        <div className='w-full lg:w-[65%] min-w-0'>
            <Card classname='p-5'>
                <div className='flex items-center gap-2'>
                    <CreditCard className='text-(--sb-blue-250)' width={30} />
                    <h1 className='playfair-display text-2xl'>Payment Method</h1>
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 my-3 w-full p-3 sm:p-5'>
                    {paymentMethod.map(({title, subtitle, Icon})=> <label className='flex items-start sm:items-center gap-3 p-3 py-4 border border-(--sb-blue-250) bg-(--sb-blue-fade-4) rounded-2xl' htmlFor={title}>
                        <input checked={paymentMethod[currentMethod].title === title} onClick={()=> setCurrentMethod(title === 'Credit Card' ? 0 : 1)} type="radio" name='payment' id={title} />
                        <Icon/>
                        <div>
                            <p className=''>{title}</p>
                            <p className='text-gray-400'>{subtitle}</p>
                        </div>
                    </label>)}
                </div>
            </Card>
            {paymentMethod[currentMethod] && paymentMethod[currentMethod].render()}
            <Card classname=' p-5 bg-white my-5'>
                <h2 className='text-2xl font-semibold mb-6'>Order Summary</h2>

                <div className='flex items-center justify-between my-2'>
                    <p className='text-gray-500'>Flight Total</p>
                    <p className='text-lg'>{`$${price}.00`}</p>
                </div>
                <div className='flex items-center justify-between'>
                    <p className='text-gray-500'>Taxes & Fees</p>
                    <p className='text-lg'>${FEES}.00</p>
                </div>
                <hr className='border-gray-300 my-4' />
                
                <div className='flex items-center justify-between'>
                    <p className='font-semibold text-xl'>Total</p>
                    <p className='text-2xl font-semibold text-(--sb-blue-250)'>${price + FEES}.00</p>
                </div>
            </Card>

            <button type="submit" disabled={!isValid} onClick={(event)=>{
                event.preventDefault();
                console.log('Test')
                setIsBooked(true);
                navigate(routeMatcher.booked);
            }} className={'flex items-center justify-center gap-2 rounded-xl py-2 bg-(--sb-blue-250) text-white w-full my-5 font-semibold duration-200 hover:scale-95 ' + ( !isValid ? ' opacity-50' : '')}>
                {   isLoading ?                                             
                    <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                    :
                    <Lock width={20}/>
                }
                <span>{`Pay $${price + FEES}.00`}</span>
            </button>
        </div>

        <div className='w-full lg:w-[33%] min-w-0'>
            <Card classname='py-7 px-5 h-max'>
                <h2 className='font-semibold text-lg'>Booking Summary</h2>

                    <div className='rounded-2xl p-4 sm:p-5 bg-(--sb-blue-fade-4) my-5'>
                    <div className='flex items-center gap-2 text-xl mb-3'>
                        <Plane width={19} stroke='var(--sb-blue-250)' />
                        <p className='font-semibold'>{company}</p>
                    </div>

                    <div>
                        <div className='flex items-center gap-2 text-[17px] my-2'>
                            <MapPin stroke='gray' width={25} />
                            <p className='flex items-center text-gray-400 wrap-break-word w-full'>{fromCountry || 'Paris, France'} <CornerRightDown strokeWidth={1} width={30} className="translate-y-1 shrink-0" /></p>
                        </div>
                        <p className="pl-9 sm:pl-15 wrap-break-word">{toCountry || 'New York, USA'}</p>
                    </div>

                    <div className='flex gap-2 text-gray-400 text-[17px] items-baseline my-2 pl-1'>
                        <Clock stroke='gray' width={17} className='relative top-1.5' />
                        <p>{formatDuration(departureAt, landingAt)}</p>
                    </div> 
                </div>

                <div className='flex items-center justify-between text-lg'>   
                    <p className='text-gray-400'>{passengersCount} x {travelClass}</p>
                    <p>{`$${price}`}</p>
                </div>

                <div className='flex items-center justify-between text-lg'>   
                    <p className='text-gray-400'>Taxes & fees</p>
                    <p>{`$${FEES}`}</p>
                </div>

                <hr className='border-[0.5px] border-gray-300 my-2' />
                <div className='flex items-center justify-between'>
                    <p className='font-semibold text-xl'>Total</p>
                    <p className='text-2xl font-semibold text-(--sb-blue-250)'>{`$${price + FEES}`}</p>
                </div>
                <hr className='border-[0.5px] border-gray-300 my-5' />

                <ul className=''>
                    <p className='font-semibold text-lg text-gray-600 my-2'>Included in your booking</p>
                    {['Free cancellation within 24 hours', `${luggage} baggage included`, 'Seat Selection at check-in', '24/7 customer support'].map(text => <li className='flex items-center gap-2 text-gray-600'><span className='text-xl'>•</span> <span>{text}</span></li>)}
                </ul>
            </Card>
            <div className='flex px-1 my-5 items-start gap-2 text-sm sm:text-base font-semibold text-gray-700'>
                <input {...register('agreement')} type="checkbox" name='agreement' id='agreement' className='scale-130 relative top-0.75'/>
                <label htmlFor="agreement">I agree to the <a href="" className='text-(--sb-blue-250) font-semibold hover:underline'>Terms of Service</a> and <a href="" className='text-(--sb-blue-250) font-semibold hover:underline'>Privacy Policy</a>. I understand that my booking is subject to the airline's terms and conditions.</label>
            </div>

            <div className='flex gap-2 rounded-xl p-2 px-4 items-start sm:items-center justify-center bg-(--sb-blue-fade-4) text-sm sm:text-base'>
                <Shield stroke='var(--sb-blue-250)' className='scale-120'/>
                <p>Your payment is secured with 256-bit SSL encryption.</p>
            </div>
        </div>
        
    </form>
  )
}

export default PaymentForm