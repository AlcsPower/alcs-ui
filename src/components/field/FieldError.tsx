import * as React from 'react';
import { cn } from '../../lib/utils';
import { useFieldContext } from './FieldContext';

export interface FieldErrorProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  /** Fuerza la renderización incluso si no hay children */
  forceMount?: boolean;
}

export const FieldError = React.forwardRef<
  HTMLParagraphElement,
  FieldErrorProps
>(({ className, children, id, forceMount = false, ...props }, ref) => {
  const context = useFieldContext();
  const setHasErrorMsg = context?.setHasErrorMsg;

  const hasContent = Boolean(children) || forceMount;

  React.useEffect(() => {
    if (setHasErrorMsg) {
      setHasErrorMsg(hasContent);
      return () => {
        setHasErrorMsg(false);
      };
    }
    return undefined;
  }, [setHasErrorMsg, hasContent]);

  if (!hasContent) {
    return null;
  }

  return (
    <p
      ref={ref}
      id={id ?? context?.errorId}
      role="alert"
      aria-live="polite"
      className={cn('text-xs font-medium text-alcspower-destructive', className)}
      {...props}
    >
      {children}
    </p>
  );
});

FieldError.displayName = 'FieldError';
