import type { Flight } from '../../types';
import { confirmStorageRecovery } from './storageRecovery';

export type CachedBooking = {
  accountId?: string;
  reference: string;
  bookedAt: string;
  passengersCount: number;
  flight: Flight;
  price: number
};

const BOOKINGS_KEY = 'planet_bookings';

/** Reads and parses the local demo booking cache, returning an empty cache if it is invalid. */
const readAll = (): Record<string, CachedBooking[]> => {
  try {
    return JSON.parse(localStorage.getItem(BOOKINGS_KEY) ?? '{}') as Record<string, CachedBooking[]>;
  } catch {
    return {};
  }
};

/** Returns bookings stored for the account ID, with an optional legacy email lookup. */
export const getBookings = (accountId: string, legacyEmail?: string): CachedBooking[] => {
  const bookings = readAll();
  if (bookings[accountId]) return bookings[accountId];
  return legacyEmail ? bookings[legacyEmail] ?? [] : [];
};

/** Prepends an account-tagged booking to the local cache and migrates legacy email entries. */
export const saveBooking = (accountId: string, booking: CachedBooking, legacyEmail?: string) => {
  const bookings = readAll();
  const existing = bookings[accountId] ?? (legacyEmail ? bookings[legacyEmail] ?? [] : []);
  bookings[accountId] = [{ ...booking, accountId }, ...existing.map((entry) => ({ ...entry, accountId }))];
  if (legacyEmail && legacyEmail !== accountId) delete bookings[legacyEmail];
  try { localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings)); }
  catch {
    confirmStorageRecovery('localStorage');
    throw new Error('Browser storage is full; saved booking data must be cleared to continue.');
  }
};
