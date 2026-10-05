import * as React from 'react';

export interface FieldContextValue {
  /** ID único del control asociado */
  controlId: string;
  /** ID del label asociado */
  labelId: string;
  /** ID del texto de ayuda descriptivo */
  hintId: string;
  /** ID del mensaje de error de validación */
  errorId: string;
  /** Indica si el campo tiene error de validación */
  hasError?: boolean;
  /** Indica si el campo está deshabilitado */
  disabled?: boolean;
  /** Indica si el campo es obligatorio */
  required?: boolean;
  /** Escala de tamaño compartida ('sm' | 'md' | 'lg') */
  size?: 'sm' | 'md' | 'lg';
  /** IDs para aria-describedby calculados automáticamente */
  describedBy?: string;
  /** Registro dinámico de hint */
  setHasHint: (hasHint: boolean) => void;
  /** Registro dinámico de error */
  setHasErrorMsg: (hasErrorMsg: boolean) => void;
}

export const FieldContext = React.createContext<FieldContextValue | null>(null);

export function useFieldContext(): FieldContextValue | null {
  return React.useContext(FieldContext);
}
