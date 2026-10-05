import * as React from 'react';
import { cn } from '../../lib/utils';
import { useFieldContext } from './FieldContext';

export interface FieldHintProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

export const FieldHint = React.forwardRef<
  HTMLParagraphElement,
  FieldHintProps
>(({ className, children, id, ...props }, ref) => {
  const context = useFieldContext();
  const setHasHint = context?.setHasHint;

  React.useEffect(() => {
    if (setHasHint) {
      setHasHint(true);
      return () => {
        setHasHint(false);
      };
    }
    return undefined;
  }, [setHasHint]);

  return (
    <p
      ref={ref}
      id={id ?? context?.hintId}
      className={cn('text-xs text-alcspower-muted-foreground', className)}
      {...props}
    >
      {children}
    </p>
  );
});

FieldHint.displayName = 'FieldHint';
