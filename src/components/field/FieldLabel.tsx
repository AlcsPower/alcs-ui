import * as React from 'react';
import { Label, type LabelProps } from '../label';
import { useFieldContext } from './FieldContext';

export interface FieldLabelProps extends LabelProps {}

export const FieldLabel = React.forwardRef<
  React.ElementRef<typeof Label>,
  FieldLabelProps
>(({ htmlFor, id, required, ...props }, ref) => {
  const context = useFieldContext();

  const finalHtmlFor = htmlFor ?? context?.controlId;
  const finalId = id ?? context?.labelId;
  const finalRequired = required ?? context?.required;

  return (
    <Label
      ref={ref}
      id={finalId}
      htmlFor={finalHtmlFor}
      required={finalRequired}
      {...props}
    />
  );
});

FieldLabel.displayName = 'FieldLabel';
