import { describe, it, expect } from 'vitest';
import { cn } from './utils';

describe('tailwind-merge & cn() resolution with @alcs/ui tokens', () => {
  it('resuelve conflictos de fondo (bg): bg-mific-primary vs bg-red-500', () => {
    const result = cn('bg-mific-primary', 'bg-red-500');
    expect(result).toBe('bg-red-500');
  });

  it('resuelve conflictos de fondo semántico (destructive): bg-mific-destructive vs bg-emerald-600', () => {
    const result = cn('bg-mific-destructive', 'bg-emerald-600');
    expect(result).toBe('bg-emerald-600');
  });

  it('resuelve conflictos de texto (text): text-mific-foreground vs text-red-500', () => {
    const result = cn('text-mific-foreground', 'text-red-500');
    expect(result).toBe('text-red-500');
  });

  it('resuelve conflictos de borde (border): border-mific-border vs border-red-500', () => {
    const result = cn('border-mific-border', 'border-red-500');
    expect(result).toBe('border-red-500');
  });

  it('resuelve conflictos de borde input: border-mific-input vs border-mific-destructive', () => {
    const result = cn('border-mific-input', 'border-mific-destructive');
    expect(result).toBe('border-mific-destructive');
  });

  it('resuelve conflictos de anillo (ring): ring-mific-ring vs ring-red-500', () => {
    const result = cn('ring-mific-ring', 'ring-red-500');
    expect(result).toBe('ring-red-500');
  });

  it('resuelve conflictos de radios (rounded): rounded-mific-md vs rounded-lg', () => {
    const result = cn('rounded-mific-md', 'rounded-lg');
    expect(result).toBe('rounded-lg');
  });

  it('resuelve conflictos con modificador hover: hover:bg-mific-primary vs hover:bg-red-500', () => {
    const result = cn('hover:bg-mific-primary', 'hover:bg-red-500');
    expect(result).toBe('hover:bg-red-500');
  });

  it('resuelve conflictos con modificador focus: focus:ring-mific-ring vs focus:ring-red-500', () => {
    const result = cn('focus:ring-mific-ring', 'focus:ring-red-500');
    expect(result).toBe('focus:ring-red-500');
  });

  it('resuelve conflictos con modificador dark: dark:bg-mific-primary vs dark:bg-red-500', () => {
    const result = cn('dark:bg-mific-primary', 'dark:bg-red-500');
    expect(result).toBe('dark:bg-red-500');
  });

  it('preserva clases que NO deben entrar en conflicto y deben coexistir', () => {
    const result = cn('bg-mific-primary', 'text-white', 'p-4', 'rounded-md', 'flex', 'items-center');
    expect(result).toBe('bg-mific-primary text-white p-4 rounded-md flex items-center');
  });

  it('permite sobrescribir clases condicionalmente con falsy values', () => {
    const hasError = true;
    const isSuccess = false;
    const result = cn(
      'border-mific-border',
      hasError && 'border-mific-destructive',
      isSuccess && 'border-mific-success'
    );
    expect(result).toBe('border-mific-destructive');
  });
});
