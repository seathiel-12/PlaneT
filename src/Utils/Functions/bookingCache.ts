import type { Flight } from '../../types';

export type CachedBooking = {
  reference: string;
  bookedAt: string;
  passengersCount: number;
  flight: Flight;
};

const BOOKINGS_KEY = 'planet_bookings';

const readAll = (): Record<string, CachedBooking[]> => {
  try {
    return JSON.parse(localStorage.getItem(BOOKINGS_KEY) ?? '{}') as Record<string, CachedBooking[]>;
  } catch {
    return {};
  }
};

export const getBookings = (email: string) => readAll()[email] ?? [];

export const saveBooking = (email: string, booking: CachedBooking) => {
  const bookings = readAll();
  bookings[email] = [booking, ...(bookings[email] ?? [])];
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
};