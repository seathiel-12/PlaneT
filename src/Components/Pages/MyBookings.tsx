import { Calendar, Clock, MapPin, Plane } from 'lucide-react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { getBookings, type CachedBooking } from '../../Utils/Functions/bookingCache';
import { useState } from 'react';

const BookingCard = ({ booking }: { booking: CachedBooking }) => {
  const departure = new Date(booking.flight.departureAt);
  return (
    <article className='rounded-2xl border border-gray-200 bg-white p-5 text-left shadow-sm sm:p-7'>
      <div className='flex flex-col justify-between gap-3 sm:flex-row sm:items-center'>
        <div>
          <p className='text-xs uppercase tracking-wide text-gray-400'>Booking reference</p>
          <p className='font-semibold text-(--sb-blue-250)'>{booking.reference}</p>
        </div>
        <p className='text-sm text-gray-400'>{new Date(booking.bookedAt).toLocaleDateString()}</p>
      </div>
      <div className='my-5 grid gap-4 sm:grid-cols-3'>
        <div className='flex items-center gap-3'><Plane className='text-(--sb-blue-250)' size={20}/><span>{booking.flight.company}</span></div>
        <div className='flex items-center gap-3'><MapPin className='text-gray-400' size={20}/><span>{booking.flight.fromCountry} to {booking.flight.toCountry}</span></div>
        <div className='flex items-center gap-3'><Calendar className='text-gray-400' size={20}/><span>{departure.toLocaleDateString()}</span></div>
      </div>
      <div className='flex items-center justify-between border-t border-gray-100 pt-4 text-sm text-gray-500'>
        <span className='flex items-center gap-2'><Clock size={17}/> {booking.flight.duration}</span>
        <span className='font-semibold text-gray-800'>${booking.flight.price * booking.passengersCount}.00</span>
      </div>
    </article>
  );
};

function MyBookings() {
  const { user } = useAuth();
  const [bookings] = useState(() => user ? getBookings(user.email) : []);

  if (!user) return <Navigate to='/sign-in' replace />;

  return (
    <main className='min-h-[60vh] bg-gray-50 px-4 py-12 sm:px-8 lg:px-16'>
      <div className='mx-auto max-w-5xl'>
        <p className='text-sm font-semibold uppercase tracking-wide text-(--sb-blue-250)'>Travel history</p>
        <h1 className='playfair-display mt-2 text-4xl'>My bookings</h1>
        <p className='mt-3 text-gray-500'>Your saved reservations, {user.firstname}.</p>
        <div className='mt-8 grid gap-4'>
          {bookings.length ? bookings.map((booking) => <BookingCard key={booking.reference} booking={booking}/>) : (
            <div className='rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500'>No bookings saved yet.</div>
          )}
        </div>
      </div>
    </main>
  );
}

export default MyBookings;