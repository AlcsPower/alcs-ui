import * as React from 'react';
import { Toaster as Sonner, type ToasterProps as SonnerToasterProps } from 'sonner';

export interface ToasterProps extends SonnerToasterProps {
  /**
   * Clases adicionales para el contenedor o los toasts
   */
  className?: string;
}

/**
 * Componente `Toaster` institucional de `@alcspower/ui`.
 * Basado en `sonner`, con soporte completo de tema claro/oscuro,
 * tokens semánticos, apilamiento interactivo y accesibilidad WCAG.
 */
export const Toaster: React.FC<ToasterProps> = ({
  position = 'bottom-right',
  closeButton = true,
  richColors = true,
  duration = 4000,
  toastOptions,
  ...props
}) => {
  return (
    <Sonner
      position={position}
      closeButton={closeButton}
      richColors={richColors}
      duration={duration}
      className="toaster group font-sans"
      toastOptions={{
        ...toastOptions,
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-alcspower-surface group-[.toaster]:text-alcspower-text-primary group-[.toaster]:border-alcspower-border group-[.toaster]:shadow-alcspower-lg group-[.toaster]:rounded-alcspower-lg group-[.toaster]:text-sm group-[.toaster]:border group-[.toaster]:p-4 group-[.toaster]:gap-3',
          title: 'group-[.toast]:font-semibold group-[.toast]:text-alcspower-text-primary text-sm',
          description: 'group-[.toast]:text-alcspower-text-secondary text-xs mt-1',
          actionButton:
            'group-[.toast]:bg-alcspower-primary group-[.toast]:text-alcspower-primary-foreground group-[.toast]:font-medium group-[.toast]:rounded-alcspower-md group-[.toast]:px-3 group-[.toast]:py-1.5 group-[.toast]:text-xs hover:group-[.toast]:bg-alcspower-primary-hover transition-colors',
          cancelButton:
            'group-[.toast]:bg-alcspower-surface-muted group-[.toast]:text-alcspower-text-secondary group-[.toast]:font-medium group-[.toast]:rounded-alcspower-md group-[.toast]:px-3 group-[.toast]:py-1.5 group-[.toast]:text-xs hover:group-[.toast]:bg-alcspower-surface-subtle transition-colors',
          closeButton:
            'group-[.toast]:bg-alcspower-surface group-[.toast]:text-alcspower-text-secondary group-[.toast]:border-alcspower-border hover:group-[.toast]:text-alcspower-text-primary transition-colors',
          ...toastOptions?.classNames,
        },
      }}
      {...props}
    />
  );
};

Toaster.displayName = 'Toaster';
