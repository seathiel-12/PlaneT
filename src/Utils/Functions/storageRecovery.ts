const BOOKINGS_KEY = 'planet_bookings';
const AUTH_COOKIE = 'planet_auth';

/**
 * Asks permission to remove saved reservation data and end the current session.
 * Account records are retained so the user can sign in again after cleanup.
 * @param storageName Browser storage that rejected a write.
 * @returns Whether cleanup was accepted.
 */
export function confirmStorageRecovery(storageName: 'cookie' | 'localStorage'): boolean {
  const accepted = window.confirm(
    `The browser ${storageName} storage is full. Clear saved booking data and sign out now? You will be redirected to the sign-in page. Your locally saved account will be kept.`
  );
  if (!accepted) return false;

  try { localStorage.removeItem(BOOKINGS_KEY); } catch { /* Storage may be unavailable; continue to sign-out. */ }
  document.cookie = `${AUTH_COOKIE}=; path=/; max-age=0; SameSite=Lax`;
  window.location.assign('/sign-in');
  return true;
}
