import { describe, it, expect } from 'vitest';
import { cn } from './utils';

describe('tailwind-merge & cn() resolution with @alcspower/ui tokens', () => {
  it('resuelve conflictos de fondo (bg): bg-alcspower-primary vs bg-red-500', () => {
    const result = cn('bg-alcspower-primary', 'bg-red-500');
    expect(result).toBe('bg-red-500');
  });

  it('resuelve conflictos de fondo semántico (destructive): bg-alcspower-destructive vs bg-emerald-600', () => {
    const result = cn('bg-alcspower-destructive', 'bg-emerald-600');
    expect(result).toBe('bg-emerald-600');
  });

  it('resuelve conflictos de texto (text): text-alcspower-foreground vs text-red-500', () => {
    const result = cn('text-alcspower-foreground', 'text-red-500');
    expect(result).toBe('text-red-500');
  });

  it('resuelve conflictos de borde (border): border-alcspower-border vs border-red-500', () => {
    const result = cn('border-alcspower-border', 'border-red-500');
    expect(result).toBe('border-red-500');
  });

  it('resuelve conflictos de borde input: border-alcspower-input vs border-alcspower-destructive', () => {
    const result = cn('border-alcspower-input', 'border-alcspower-destructive');
    expect(result).toBe('border-alcspower-destructive');
  });

  it('resuelve conflictos de anillo (ring): ring-alcspower-ring vs ring-red-500', () => {
    const result = cn('ring-alcspower-ring', 'ring-red-500');
    expect(result).toBe('ring-red-500');
  });

  it('resuelve conflictos de radios (rounded): rounded-alcspower-md vs rounded-lg', () => {
    const result = cn('rounded-alcspower-md', 'rounded-lg');
    expect(result).toBe('rounded-lg');
  });

  it('resuelve conflictos con modificador hover: hover:bg-alcspower-primary vs hover:bg-red-500', () => {
    const result = cn('hover:bg-alcspower-primary', 'hover:bg-red-500');
    expect(result).toBe('hover:bg-red-500');
  });

  it('resuelve conflictos con modificador focus: focus:ring-alcspower-ring vs focus:ring-red-500', () => {
    const result = cn('focus:ring-alcspower-ring', 'focus:ring-red-500');
    expect(result).toBe('focus:ring-red-500');
  });

  it('resuelve conflictos con modificador dark: dark:bg-alcspower-primary vs dark:bg-red-500', () => {
    const result = cn('dark:bg-alcspower-primary', 'dark:bg-red-500');
    expect(result).toBe('dark:bg-red-500');
  });

  it('preserva clases que NO deben entrar en conflicto y deben coexistir', () => {
    const result = cn('bg-alcspower-primary', 'text-white', 'p-4', 'rounded-md', 'flex', 'items-center');
    expect(result).toBe('bg-alcspower-primary text-white p-4 rounded-md flex items-center');
  });

  it('permite sobrescribir clases condicionalmente con falsy values', () => {
    const hasError = true;
    const isSuccess = false;
    const result = cn(
      'border-alcspower-border',
      hasError && 'border-alcspower-destructive',
      isSuccess && 'border-alcspower-success'
    );
    expect(result).toBe('border-alcspower-destructive');
  });
});
