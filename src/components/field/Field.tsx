import * as React from 'react';
import { cn } from '../../lib/utils';
import { FieldContext, type FieldContextValue } from './FieldContext';

export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  /** ID personalizado para el control. Si no se suministra, se genera uno determinista con useId() */
  id?: string;
  /** Estado de error de validación */
  hasError?: boolean;
  /** Deshabilita el campo y sus controles dependientes */
  disabled?: boolean;
  /** Marca el campo como obligatorio */
  required?: boolean;
  /** Escala de tamaño para controles hijos ('sm' | 'md' | 'lg') */
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Field es el contenedor raíz para formularios accesibles.
 * Coordina automáticamente identificadores (id, htmlFor), asociaciones ARIA (aria-describedby, aria-invalid)
 * y estados de validación entre etiqueta, control, texto de ayuda y mensaje de error.
 */
export const Field = React.forwardRef<HTMLDivElement, FieldProps>(
  (
    {
      id: customId,
      hasError = false,
      disabled = false,
      required = false,
      size = 'md',
      className,
      children,
      ...props
    },
    ref
  ) => {
    const reactId = React.useId();
    const controlId = customId || `alcspower-field-${reactId}`;
    const labelId = `${controlId}-label`;
    const hintId = `${controlId}-hint`;
    const errorId = `${controlId}-error`;

    const [hasHint, setHasHint] = React.useState(false);
    const [hasErrorMsg, setHasErrorMsg] = React.useState(false);

    const describedBy = React.useMemo(() => {
      const ids: string[] = [];
      if (hasHint) ids.push(hintId);
      if (hasErrorMsg || hasError) ids.push(errorId);
      return ids.length > 0 ? ids.join(' ') : undefined;
    }, [hasHint, hasErrorMsg, hasError, hintId, errorId]);

    const contextValue = React.useMemo<FieldContextValue>(
      () => ({
        controlId,
        labelId,
        hintId,
        errorId,
        hasError,
        disabled,
        required,
        size,
        describedBy,
        setHasHint,
        setHasErrorMsg
      }),
      [
        controlId,
        labelId,
        hintId,
        errorId,
        hasError,
        disabled,
        required,
        size,
        describedBy
      ]
    );

    return (
      <FieldContext.Provider value={contextValue}>
        <div
          ref={ref}
          role="group"
          data-disabled={disabled ? 'true' : undefined}
          data-invalid={hasError ? 'true' : undefined}
          className={cn('flex flex-col gap-1.5 w-full', className)}
          {...props}
        >
          {children}
        </div>
      </FieldContext.Provider>
    );
  }
);

Field.displayName = 'Field';
