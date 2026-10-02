import { clsx, type ClassValue } from 'clsx';
import { customTwMerge } from './tw-merge-config';

/**
 * Combina condicionalmente clases CSS y resuelve conflictos de Tailwind
 * respetando los tokens institucionales de @mific/ui.
 */
export function cn(...inputs: ClassValue[]): string {
  return customTwMerge(clsx(inputs));
}
