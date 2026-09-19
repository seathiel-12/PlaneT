import { Calendar, CheckCircle, Clock, CreditCard, Download, Mail, Plane, Users } from 'lucide-react';
import Bubble from '../../../Utils/Components/Bubble/Bubble';
import { useEffect, type FC } from 'react';
import type { Flight } from '../../../types';
import { useBookFlightStore } from './store';
import { Button } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';
import { routeMatcher } from '../../router';
import { useAuth } from '../../../contexts/AuthContext';
import { saveBooking } from '../../../Utils/Functions/bookingCache';

const PaymentChecked = () => {
    const { flightSelected, flightInfos: { passengersCount }, reset } = useBookFlightStore();
    const { user } = useAuth();
    const navigate = useNavigate();

    // useEffect(()=>{
    //     setFlightSelectedInfos({
    //         company: "Air France",
    //         classTravel: "Economy",
    //         fromCountry: "Paris, France",
    //         continent: "America",
    //         toCountry: "New York, USA",
    //         departureAt: "2026-08-20T08:00:00Z",
    //         landingAt: "2026-08-20T12:30:00Z",
    //         duration: "4h30",
    //         price: 450,
    //         typeFlight: "Direct",
    //         seatsLeft: 12,
    //         city: "New York",
    //         rating: 4.2,
    //         ratingCount: 128,
    //         description: "Vol direct confortable avec service à bord.",
    //         caracteristics: ["Wifi", "Repas inclus", "Divertissement"],
    //         isLiked: false,
    //         isPopular: true,
    //         imagePath: ["https://loremflickr.com/1280/720/new-york,usa"]
    //     });
    // },[]);

    useEffect(()=>{
        if(!flightSelected){
            navigate(routeMatcher.home);
        } else if (user) {
            saveBooking(user.email, {
                reference: `PLN-${Date.now().toString(36).toUpperCase()}`,
                bookedAt: new Date().toISOString(),
                passengersCount,
                flight: flightSelected,
            });
        }
    },[flightSelected, navigate, passengersCount, user]);

  return (
        <div className='bg-gray-50 p-4 sm:p-8 lg:p-20 text-center text-base sm:text-lg'>
            <Bubble text="Booking Confirmed" Icons={CreditCard} />
            
            <div className='my-7'>
                <h2 className="text-3xl sm:text-4xl font-bold playfair-display">Thank You!</h2>
                <p className="text-gray-600 mt-2">Your booking has been successfully processed</p>
            </div>

            <div className='my-15 mt-20'>
                <div className='rounded-full bg-green-100 p-3 w-max m-auto mb-12 scale-200'>
                    <CheckCircle className="text-green-600" />
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold playfair-display">Booking confirmed!</h2>
                <p className="text-gray-600 mt-4">Your flight has been successfully booked. A confirmation email has been sent to your inbox</p>
            </div>

            <div className='my-6 mb-10 rounded-2xl border border-(--sb-blue-250) bg-blue-50 p-5 sm:p-10 shadow-sm text-gray-600'>
                <p>Booking reference</p>
                <p className='font-semibold my-4 text-2xl sm:text-3xl break-all text-(--sb-blue-250)'>PLAKNFAK495MAKND</p>
                <p className="">Please save this reference for your records  </p>
            </div>

            {flightSelected ? <FlightDetails flight={flightSelected} passengersCount={passengersCount} /> : (
                <p className='rounded-2xl border border-amber-200 bg-amber-50 p-5 text-amber-800'>Flight details are unavailable.</p>
            )}

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
                <Button className="py-2 rounded-lg border border-gray-400 shadow-md flex items-center gap-3 justify-center hover:scale-95 duration-200">
                   <Mail/> 
                   <p>Resend Confirmation</p>
                </Button>
                <Button className="py-2 rounded-lg border border-gray-400 shadow-md flex items-center gap-3 justify-center hover:scale-95 duration-200">
                    <Download/>
                    <p>Download E-Ticket</p>
                    </Button>
            </div>

            <div className="py-8 sm:py-13 px-5 sm:px-9 shadow-md rounded-2xl bg-gray-100 my-7 text-left">
                <h2 className="font-bold text-left">What's Next?</h2>
                {
                    [
                        'Check your email for detailed booking confirmation',
                        'Complete online check-in 24 hours before departure',
                        'Arrive at the airport at least 3 hours before your flight',
                        'Bring valid passport and travel documents'
                    ].map((line, index)=> <div key={index} className="flex items-center gap-3 my-3">
                        <CheckCircle className="text-green-500 shrink-0"/>
                        <p>{line}</p>
                    </div>)
                }
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-5">
                <Button onClick={() => navigate('/my-bookings')} className={'gap-2 rounded-xl py-2 px-5 sm:px-10 bg-(--sb-blue-250) text-white shadow-md hover:scale-95 duration-200'}>View my Booking →</Button>
                <Button onClick={()=>{
                    navigate(routeMatcher.home);
                    reset();
                    }} className={'flex items-center justify-center gap-2 rounded-xl py-2 px-5 sm:px-10 shadow-md bg-gray-200 hover:scale-95 duration-200'}>Back to Home</Button>

            </div>
        </div>
  )
}

const FlightDetails: FC<{ flight: Flight; passengersCount: number }> = ({ flight, passengersCount }) => {
    const departure = new Date(flight.departureAt);
    const arrival = new Date(flight.landingAt);
    const content = [
        {
            title: 'Travel road',
            subtitle: `${flight.fromCountry} → ${flight.toCountry}`,
            Icon: Plane
        },
        {
            title: 'Date',
            subtitle: departure.toLocaleDateString(),
            Icon: Calendar
        },
        {
            title: 'Time',
            subtitle: `${departure.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${arrival.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
            Icon: Clock
        },
        {
            title: 'Passengers',
            subtitle: `${passengersCount} passenger${passengersCount === 1 ? '' : 's'}`,
            Icon: Users
        }
    ]

    return <div className='text-left rounded-2xl border border-gray-200 bg-white p-5 sm:p-9 py-7 sm:py-10 shadow-sm'>
        <h2 className='mb-5 text-xl font-semibold'>Flight Details</h2>
        <div className='grid gap-4 sm:grid-cols-2'>
            {content.map(({ title, subtitle, Icon }) => (
                <div className='flex items-center gap-3 text-lg' key={title}>
                    <div className='rounded-full bg-(--sb-blue-fade-4) p-3'>
                        <Icon className='text-(--sb-blue-250)' size={21} />
                    </div>

                    <div className='min-w-0'>
                        <p className='text-sm text-gray-500'>{title}</p>
                        <p className='font-semibold text-md text-gray-700 wrap-break-word'>{subtitle}</p>
                    </div>
                </div>
            ))}
        </div>    

        <hr className='border-gray-200 w-full my-10' />

        <div className='flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between'>
            <p className='font-medium text-gray-700 text-xl'>Total Paid</p>
            <p className='text-2xl font-semibold text-(--sb-blue-250)'>${flight.price * passengersCount}.00</p>
        </div>
        
    </div>

}
export default PaymentChecked