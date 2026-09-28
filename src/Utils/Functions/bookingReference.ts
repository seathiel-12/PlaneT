/**
 * Creates a human-readable, collision-resistant booking reference.
 * Uses the browser cryptographic random number generator.
 * @returns A reference prefixed with `PLN-`.
 */
export function createBookingReference(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(8));
  const token = Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('').toUpperCase();
  return `PLN-${token}`;
}
