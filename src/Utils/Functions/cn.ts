import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combine des classes Tailwind CSS en résolvant les conflits
 * @param inputs - Classes CSS à fusionner
 * @returns Chaîne de classes optimisée
 */
/** Merges conditional class names and resolves conflicting Tailwind utilities. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
