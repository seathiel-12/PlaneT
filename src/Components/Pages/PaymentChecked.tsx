import { Calendar, CheckCircle, Clock, CreditCard, Download, Mail, Plane, Users } from 'lucide-react';
import Bubble from '../../Utils/Components/Bubble/Bubble';
import { useEffect, useLayoutEffect, useRef, useState, type FC } from 'react';
import gsap from 'gsap';
import type { Flight } from '../../types';
import { useBookFlightStore } from '../Features/BookFlight/store';
import { Button } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';
import { routeMatcher } from '../router';
import { useAuth } from '../../contexts/AuthContext';
import { saveBooking } from '../../Utils/Functions/bookingCache';
import type { CachedBooking } from '../../Utils/Functions/bookingCache';
import { createBookingReference } from '../../Utils/Functions/bookingReference';
import { downloadFile, type DownloadFormat, DOWNLOAD_FORMATS } from '../../Utils/Functions/downloadFile';
import { isEmailMailerConfigured, sendBookingConfirmation } from '../../Utils/Functions/emailMailer';
import { useToasting } from '../../Utils/Functions/useToasting';
import { Select } from '@mantine/core';

const PaymentChecked = () => {
    const { flightSelected, flightInfos: { passengersCount }, reset, price } = useBookFlightStore();
    const { user } = useAuth();
    const navigate = useNavigate();
    const { notify } = useToasting();
    const bookingRef = useRef<CachedBooking | null>(null);
    const [booking, setBooking] = useState<CachedBooking | null>(null);
    const [downloadFormat, setDownloadFormat] = useState<DownloadFormat>('json');
    const [isSending, setIsSending] = useState(false);
    const pageRef = useRef<HTMLDivElement>(null);
    const successBadgeRef = useRef<HTMLDivElement>(null);
    const successCircleRef = useRef<SVGCircleElement>(null);
    const successCheckRef = useRef<SVGPathElement>(null);

    useLayoutEffect(() => {
        const page = pageRef.current;
        const badge = successBadgeRef.current;
        const circle = successCircleRef.current;
        const check = successCheckRef.current;
        if (!page || !badge || !circle || !check) return;

        const context = gsap.context(() => {
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

            gsap.set(circle, { strokeDasharray: 239, strokeDashoffset: 239 });
            gsap.set(check, { strokeDasharray: 62, strokeDashoffset: 62 });
            gsap.set(badge, { scale: 0.35, opacity: 0, rotate: -18, transformOrigin: '50% 50%' });

            const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
            timeline.to(badge, { scale: 1, opacity: 1, rotate: 0, duration: 0.55, ease: 'back.out(1.8)' })
                .to(circle, { strokeDashoffset: 0, duration: 0.55, ease: 'power2.inOut' }, '-=0.2')
                .to(check, { strokeDashoffset: 0, duration: 0.36, ease: 'power2.out' }, '-=0.12')
                .fromTo(page.querySelectorAll('[data-payment-reveal]'),
                    { y: 18, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.45, stagger: 0.1, clearProps: 'transform' },
                    '-=0.1');
        }, page);

        return () => context.revert();
    }, []);
    const FEES = 50;

    useEffect(() => {
        if(!flightSelected){
            navigate(routeMatcher.home);
        } else if (!bookingRef.current) {
            const confirmedBooking = {
                accountId: user?.id,
                reference: createBookingReference(),
                bookedAt: new Date().toISOString(),
                passengersCount,
                flight: flightSelected,
                price: price + FEES
            };
            bookingRef.current = confirmedBooking;
            setBooking(confirmedBooking);
            if (user) saveBooking(user.id, confirmedBooking, user.email);
        }
    },[flightSelected, navigate, passengersCount, user]);


    const handleDownload = () => {
        if (!booking) return;
        const row = {
            reference: booking.reference,
            bookedAt: booking.bookedAt,
            from: booking.flight.fromCountry,
            to: booking.flight.toCountry,
            departureAt: booking.flight.departureAt,
            passengers: booking.passengersCount,
            total: price + FEES,
        };
        const content = downloadFormat === 'json'
            ? JSON.stringify(booking, null, 2)
            : downloadFormat === 'csv'
                ? `${Object.keys(row).join(',')}\r\n${Object.values(row).map((value) => `"${String(value).replaceAll('"', '""')}"`).join(',')}`
                : `PlaneT e-ticket\nReference: ${row.reference}\nRoute: ${row.from} to ${row.to}\nDeparture: ${row.departureAt}\nPassengers: ${row.passengers}\nTotal: $${row.total}`;
        downloadFile(content, `PlaneT-${booking.reference}`, downloadFormat);
    };

    const handleSendConfirmation = async () => {
        if (!booking || !user) {
            notify('Sign in to send the confirmation to your email.', 'warning');
            return;
        }
        setIsSending(true);
        try {
            await sendBookingConfirmation(booking, user.email, user.firstname);
            notify('Confirmation email sent.', 'success');
        } catch (error) {
            notify(error instanceof Error ? error.message : 'Could not send the confirmation email.', 'error');
        } finally {
            setIsSending(false);
        }
    };

  return (
        <div ref={pageRef} className='bg-gray-50 p-4 sm:p-8 md:p-15 lg:px-30 lg:p-20 text-center text-base sm:text-lg'>
            <Bubble text="Booking Confirmed" Icons={CreditCard} />
            
            <div className='my-7' data-payment-reveal>
                <h2 className="text-3xl sm:text-4xl font-bold playfair-display">Thank You!</h2>
                <p className="text-gray-600 mt-2">Your booking has been successfully processed</p>
            </div>

            <div className='my-15 mt-20'>
                <div ref={successBadgeRef} className='rounded-full bg-green-100 p-3 w-16 h-16 m-auto mb-12 flex items-center justify-center shadow-[0_0_0_10px_rgba(34,197,94,0.08)]'>
                    <svg viewBox="0 0 80 80" role="img" aria-label="Payment successful" className="h-14 w-14 overflow-visible">
                        <circle ref={successCircleRef} cx="40" cy="40" r="38" fill="none" stroke="currentColor" strokeWidth="3" className="text-green-600" />
                        <path ref={successCheckRef} d="M23 41 L34 52 L57 28" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" className="text-green-600" />
                    </svg>
                </div>
                <h2 data-payment-reveal className="text-3xl sm:text-4xl font-bold playfair-display">Booking confirmed!</h2>
                <p className="text-gray-600 mt-4">Your booking confirmation is ready. {user ? 'Your reservation is saved in this browser.' : 'Sign in before booking to save this reservation in your account.'} {isEmailMailerConfigured() ? 'Send the confirmation by email using the button below.' : 'Email confirmation is available after EmailJS is configured.'}</p>
            </div>

            <div data-payment-reveal className='my-6 mb-10 rounded-2xl border border-(--sb-blue-250) bg-blue-50 p-5 sm:p-10 shadow-sm text-gray-600'>
                <p>Booking reference</p>
                <p className='font-semibold my-4 text-2xl sm:text-3xl break-all text-(--sb-blue-250)'>{booking?.reference ?? 'Preparing your reference…'}</p>
                <p className="">Please save this reference for your records  </p>
            </div>

            {flightSelected ? <div data-payment-reveal><FlightDetails flight={flightSelected} passengersCount={passengersCount} /></div> : (
                <p className='rounded-2xl border border-amber-200 bg-amber-50 p-5 text-amber-800'>Flight details are unavailable.</p>
            )}

            <div data-payment-reveal className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 mt-5">
                <Button onClick={handleSendConfirmation} disabled={isSending || !booking} className="py-2 rounded-lg border border-gray-400 shadow-md flex items-center gap-3 justify-center hover:scale-98 duration-200 disabled:opacity-50">
                   <Mail width={17}/> 
                   <p>{isSending ? 'Sending…' : isEmailMailerConfigured() ? 'Send Confirmation' : 'Configure Email Confirmation'}</p>
                </Button>
                <div className="relative min-w-0">
                    <Button
                        onClick={handleDownload}
                        disabled={!booking}
                        className="py-2 rounded-lg border border-gray-400 shadow-md flex items-center px-5 pr-36 w-full justify-between duration-200 hover:scale-98 disabled:opacity-50"
                    >
                        <span className="flex items-center gap-2">
                            <Download width={17} />
                            <span>Download E-Ticket</span>
                        </span>
                    </Button>
                    <Select
                        aria-label="Ticket download format"
                        data={Object.entries(DOWNLOAD_FORMATS).map(([format, option]) => ({ value: format, label: option.label }))}
                        className="absolute right-2 top-1/2 z-20 w-42 text-left -translate-y-1/2"
                        value={downloadFormat}
                        onChange={(value) => {
                            if (value && value in DOWNLOAD_FORMATS) setDownloadFormat(value as DownloadFormat);
                        }}
                        onClick={(event) => event.stopPropagation()}
                        styles={{ input: { background: 'white', boxShadow: 'none', textAlign: 'left' } }}
                    />
                </div>
            </div>

            <div data-payment-reveal className="py-8 sm:py-13 px-5 sm:px-9 shadow-md rounded-2xl bg-gray-100 my-7 text-left">
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

            <div data-payment-reveal className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-5">
                <Button onClick={() => navigate(routeMatcher.myBookings)} className={'gap-2 rounded-xl py-2 px-5 sm:px-10 bg-(--sb-blue-250) text-white shadow-md hover:scale-95 duration-200'}>View my Booking →</Button>
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
            <p className='font-medium text-gray-700 text-xl'>Flight's price</p>
            <p className='text-2xl font-semibold text-(--sb-blue-250)'>${flight.price.toFixed(2)}</p>
        </div>
        
    </div>

}
export default PaymentChecked
