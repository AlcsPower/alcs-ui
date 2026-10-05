import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '../../lib/utils';

export const deltaIndicatorVariants = cva(
  'inline-flex items-center font-medium font-mono tabular-nums leading-none rounded-alcspower-sm transition-colors',
  {
    variants: {
      intent: {
        positive: 'text-alcspower-success bg-alcspower-success-subtle border border-alcspower-success-border',
        negative: 'text-alcspower-destructive bg-alcspower-destructive-subtle border border-alcspower-destructive-border',
        neutral: 'text-alcspower-muted-foreground bg-alcspower-surface-muted border border-alcspower-border'
      },
      size: {
        sm: 'text-[11px] px-1.5 py-0.5 gap-1',
        md: 'text-xs px-2 py-0.5 gap-1.5',
        lg: 'text-sm px-2.5 py-1 gap-2'
      }
    },
    defaultVariants: {
      intent: 'neutral',
      size: 'md'
    }
  }
);

export interface DeltaIndicatorProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof deltaIndicatorVariants> {
  value: number | string;
  type?: 'increase' | 'decrease' | 'neutral';
  /** Si un incremento representa una mejora (true por defecto). Si es false (ej. costos, latencia, errores), un decremento será positivo (verde). */
  isPositiveGood?: boolean;
  showIcon?: boolean;
  prefix?: string;
  suffix?: string;
}

export const DeltaIndicator = React.forwardRef<HTMLSpanElement, DeltaIndicatorProps>(
  (
    {
      value,
      type: customType,
      isPositiveGood = true,
      showIcon = true,
      size = 'md',
      prefix = '',
      suffix = '%',
      className,
      ...props
    },
    ref
  ) => {
    // Determinar la dirección si el valor es numérico
    const direction = React.useMemo<'increase' | 'decrease' | 'neutral'>(() => {
      if (customType) return customType;
      const num = typeof value === 'number' ? value : parseFloat(String(value));
      if (isNaN(num) || num === 0) return 'neutral';
      return num > 0 ? 'increase' : 'decrease';
    }, [value, customType]);

    // Determinar la intención semántica (positivo/verde vs negativo/rojo)
    const intent = React.useMemo<'positive' | 'negative' | 'neutral'>(() => {
      if (direction === 'neutral') return 'neutral';
      if (direction === 'increase') {
        return isPositiveGood ? 'positive' : 'negative';
      }
      return isPositiveGood ? 'negative' : 'positive';
    }, [direction, isPositiveGood]);

    const formattedValue = React.useMemo(() => {
      if (typeof value === 'number') {
        const sign = value > 0 ? '+' : '';
        return `${sign}${value.toLocaleString('es-NI')}`;
      }
      return String(value);
    }, [value]);

    const Icon =
      direction === 'increase'
        ? TrendingUp
        : direction === 'decrease'
        ? TrendingDown
        : Minus;

    const iconSizeClass =
      size === 'sm' ? 'h-3 w-3' : size === 'lg' ? 'h-4 w-4' : 'h-3.5 w-3.5';

    const accessibleLabel =
      direction === 'increase'
        ? `Aumento de ${formattedValue}${suffix}`
        : direction === 'decrease'
        ? `Disminución de ${formattedValue}${suffix}`
        : `Sin variación (${formattedValue}${suffix})`;

    return (
      <span
        ref={ref}
        aria-label={accessibleLabel}
        className={cn(deltaIndicatorVariants({ intent, size }), className)}
        {...props}
      >
        {showIcon && <Icon className={iconSizeClass} aria-hidden="true" />}
        <span>
          {prefix}
          {formattedValue}
          {suffix}
        </span>
      </span>
    );
  }
);

DeltaIndicator.displayName = 'DeltaIndicator';
