import { ArrowRight, Clock, CreditCard, Lock, MapPin, Plane, Shield } from 'lucide-react'
import Card from '../../../Utils/Components/Card/Card'
import TextField from '../../../Utils/Components/TextField/TextField';
import { useBookFlightStore } from './store';
import { formatNumber } from '../../../Utils/Functions/formatNumber';
import { useState, type ReactNode } from 'react';

const PayementForm = () => {
    const [currentMethod, setCurrentMethod] = useState(0);
    const [agreement, setAgreement] = useState(false);
    const paymentMethod: {title:string, subtitle: string, Icon: typeof CreditCard, render:()=>ReactNode}[] = [
        {
            title: 'Credit Card',
            subtitle: 'Visa, Mastercard, Amex',
            Icon: CreditCard,
            render: ()=> <Card classname='p-7 bg-white my-5'>
                <h2 className='text-2xl font-semibold mb-5'>Card Details</h2>
                <TextField Icon={CreditCard} type='number'  placeholder='1234 5678 9012 3456' label='Card Number' value={''} />
                <TextField placeholder='John Doe' label='Cardholder Name' value={''} />
                <div className='grid grid-cols-2 gap-3'>
                    <TextField type='date' placeholder='MM/YY' label='Expiry Date' value={''} />
                    <TextField Icon={Lock} type='number' placeholder='123' label='CVV' value={''} />
                </div>

                <div className='flex items-center gap-2 mt-4 text-lg text-gray-800'><input className='scale-110' type="checkbox" name='saveCard' id='saveCard'/> <label htmlFor="saveCard">Save card for future payments</label></div>
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

    const { price, flightSelected:{company, from, to, departureAt, landingAt}, flightInfos: {passengersCount, travelClass}, passengersSetting: {luggage} }= useBookFlightStore();
    const FEES = 50;

    const formatTravelingDuration = (date1:string, date2: string)=> {
        
        if(new Date(date1).getDay() === new Date(date2).getDay())
            return new Date(date1).toUTCString().slice(0, -7) + ' • ' + formatNumber(new Date(date2).getHours()) + ':' + formatNumber(new Date(date2).getMinutes());

        return date1.slice(0, -7) + ' • ' + date2.slice(0, -7);
    } 

  return (
    <form className='my-10 flex gap-5'>
        <div className='w-[65%]'>
            <Card classname='p-5'>
                <div className='flex items-center gap-2'>
                    <CreditCard className='text-(--sb-blue-250)' width={30} />
                    <h1 className='playfair-display text-2xl'>Payment Method</h1>
                </div>

                <div className='grid grid-cols-2 gap-4 my-3 w-full p-5'>
                    {paymentMethod.map(({title, subtitle, Icon})=> <label className='flex items-center gap-3 p-3 py-4 border border-(--sb-blue-250) bg-(--sb-blue-fade-4) rounded-2xl' htmlFor={title}>
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
        </div>

        <div className='w-[33%]'>
            <Card classname='py-7 px-5 h-max'>
                <h2 className='font-semibold text-lg'>Booking Summary</h2>

                <div className='rounded-2xl p-5 bg-(--sb-blue-fade-4) my-5'>
                    <div className='flex items-center gap-2 text-xl mb-3'>
                        <Plane width={19} stroke='var(--sb-blue-250)' />
                        <p className='font-semibold'>{company}</p>
                    </div>

                    <div className='flex items-center gap-2 text-[17px] my-2'>
                        <MapPin stroke='gray' width={20} />
                        <p className='flex items-center text-gray-400'>{`${from}`} <ArrowRight strokeWidth={1} width={30}/> {`${to}`}</p>
                    </div>

                    <div className='flex gap-2 text-gray-400 text-[17px] items-baseline my-2'>
                        <Clock stroke='gray' width={20} className='relative top-1.5' />
                        <p>{formatTravelingDuration(departureAt, landingAt)}</p>
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
            <div className='flex px-1 my-5 items-baseline gap-2 font-semibold text-gray-700'>
                <input onClick={()=> setAgreement(!agreement)} type="checkbox" name='agreement' id='agreement' className='scale-130 relative top-0.75'/>
                <label htmlFor="agreement">I agree to the <a href="" className='text-(--sb-blue-250) font-semibold hover:underline'>Terms of Service</a> and <a href="" className='text-(--sb-blue-250) font-semibold hover:underline'>Privacy Policy</a>. I understand that my booking is subject to the airline's terms and conditions.</label>
            </div>

            <div className='flex gap-2 rounded-xl p-2 px-4 items-center justify-center bg-(--sb-blue-fade-4)'>
                <Shield stroke='var(--sb-blue-250)' className='scale-120'/>
                <p>Your payment is secured with 256-bit SSL encryption.</p>
            </div>

            <button className={'flex items-center justify-center gap-2 rounded-xl py-2 bg-(--sb-blue-250) text-white w-full my-5 font-semibold duration-200 hover:scale-95 ' + ( !agreement ? ' opacity-50' : '')}>
                <Lock width={20}/>
                <span>{`Pay $${price +  FEES}.00`}</span>
            </button>

        </div>
        
    </form>
  )
}

export default PayementForm