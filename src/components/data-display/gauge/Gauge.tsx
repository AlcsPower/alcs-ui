import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils';

export type GaugeVariant = 'semicircle' | 'arc' | 'circle';
export type GaugeColor = 'primary' | 'success' | 'warning' | 'destructive' | 'neutral' | 'auto';
export type GaugeSize = 'sm' | 'md' | 'lg' | 'xl';

export const gaugeVariants = cva('relative inline-flex flex-col items-center justify-center select-none font-sans', {
  variants: {
    size: {
      sm: 'w-24',
      md: 'w-36',
      lg: 'w-48',
      xl: 'w-60',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export interface GaugeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gaugeVariants> {
  /** Valor numérico actual */
  value: number;
  /** Valor mínimo de la escala (predeterminado: 0) */
  min?: number;
  /** Valor máximo de la escala (predeterminado: 100) */
  max?: number;
  /** Unidad o sufijo del valor (ej. '%', 'ms', 'MB') */
  unit?: string;
  /** Disposición geométrica del arco: 'semicircle' (180°), 'arc' (240°) o 'circle' (360°) */
  variant?: GaugeVariant;
  /** Paleta semántica o cálculo automático de umbrales */
  color?: GaugeColor;
  /** Umbrales semánticos para color="auto" */
  thresholds?: {
    /** Valor a partir del cual se considera advertencia (warning) */
    warning?: number;
    /** Valor a partir del cual se considera óptimo (success) */
    success?: number;
  };
  /** Muestra aguja mecánica indicadora (solo en semicircle y arc) */
  showNeedle?: boolean;
  /** Muestra el valor numérico formateado en el centro */
  showValue?: boolean;
  /** Muestra los valores mínimos y máximos en los extremos inferiores */
  showMinMax?: boolean;
  /** Etiqueta descriptiva superior o inferior */
  label?: React.ReactNode;
  /** Subtítulo contextual o meta de rendimiento */
  sublabel?: React.ReactNode;
  /** Grosor del trazo del arco en píxeles */
  strokeWidth?: number;
  /** Función para formatear el valor numérico */
  formatValue?: (val: number) => string;
  /** Etiqueta accesible para lectores de pantalla */
  ariaLabel?: string;
}

const SIZE_MAP: Record<GaugeSize, { px: number; stroke: number; valueFont: string; labelFont: string }> = {
  sm: { px: 96, stroke: 8, valueFont: 'text-base font-bold', labelFont: 'text-[10px]' },
  md: { px: 144, stroke: 12, valueFont: 'text-2xl font-bold', labelFont: 'text-xs' },
  lg: { px: 192, stroke: 16, valueFont: 'text-3xl font-extrabold', labelFont: 'text-sm' },
  xl: { px: 240, stroke: 18, valueFont: 'text-4xl font-extrabold', labelFont: 'text-base' },
};

export const Gauge = React.forwardRef<HTMLDivElement, GaugeProps>(
  (
    {
      value = 0,
      min = 0,
      max = 100,
      unit = '%',
      variant = 'semicircle',
      color = 'primary',
      thresholds = { warning: 50, success: 75 },
      showNeedle = false,
      showValue = true,
      showMinMax = false,
      label,
      sublabel,
      size = 'md',
      strokeWidth: customStrokeWidth,
      formatValue = (v) => v.toLocaleString(),
      ariaLabel,
      className,
      ...restProps
    },
    ref
  ) => {
    const sizeConfig = SIZE_MAP[(size as GaugeSize) || 'md'];
    const diameter = sizeConfig.px;
    const stroke = customStrokeWidth ?? sizeConfig.stroke;

    // Normalizar valor dentro de los límites
    const clampedValue = Math.min(Math.max(value, min), max);
    const range = max - min === 0 ? 1 : max - min;
    const percentage = Math.min(Math.max((clampedValue - min) / range, 0), 1);

    // Color semántico
    const resolvedStrokeColor = React.useMemo(() => {
      if (color === 'auto') {
        const warnThresh = thresholds.warning ?? 50;
        const succThresh = thresholds.success ?? 75;
        if (clampedValue >= succThresh) return 'var(--alcspower-success)';
        if (clampedValue >= warnThresh) return 'var(--alcspower-warning)';
        return 'var(--alcspower-destructive)';
      }
      switch (color) {
        case 'success':
          return 'var(--alcspower-success)';
        case 'warning':
          return 'var(--alcspower-warning)';
        case 'destructive':
          return 'var(--alcspower-destructive)';
        case 'neutral':
          return 'var(--alcspower-muted-foreground)';
        case 'primary':
        default:
          return 'var(--alcspower-primary)';
      }
    }, [color, clampedValue, thresholds]);

    // Geometría según la variante
    const radius = (diameter - stroke) / 2;
    const center = diameter / 2;

    let totalAngle = 180;
    let startAngle = 180;
    let svgHeight = diameter;
    let viewBox = `0 0 ${diameter} ${diameter}`;

    if (variant === 'semicircle') {
      totalAngle = 180;
      startAngle = -90;
      svgHeight = diameter / 2 + stroke;
      viewBox = `0 0 ${diameter} ${diameter / 2 + stroke}`;
    } else if (variant === 'arc') {
      totalAngle = 240;
      startAngle = -120;
      svgHeight = diameter * 0.85;
      viewBox = `0 0 ${diameter} ${diameter * 0.85}`;
    } else {
      // Circle
      totalAngle = 360;
      startAngle = -90;
      svgHeight = diameter;
      viewBox = `0 0 ${diameter} ${diameter}`;
    }

    const arcLength = 2 * Math.PI * radius * (totalAngle / 360);
    const filledLength = arcLength * percentage;
    const dashOffset = arcLength - filledLength;

    // Calcular coordenadas de un arco SVG
    const polarToCartesian = (cx: number, cy: number, r: number, angleInDegrees: number) => {
      const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
      return {
        x: cx + r * Math.cos(angleInRadians),
        y: cy + r * Math.sin(angleInRadians),
      };
    };

    const describeArc = (cx: number, cy: number, r: number, startA: number, endA: number) => {
      const start = polarToCartesian(cx, cy, r, startA);
      const end = polarToCartesian(cx, cy, r, endA);
      const largeArcFlag = endA - startA <= 180 ? '0' : '1';
      return ['M', start.x, start.y, 'A', r, r, 0, largeArcFlag, 1, end.x, end.y].join(' ');
    };

    // Ángulo de la aguja mecánica
    const needleAngle = React.useMemo(() => {
      if (variant === 'semicircle') {
        return -90 + percentage * 180;
      }
      if (variant === 'arc') {
        return -120 + percentage * 240;
      }
      return -90 + percentage * 360;
    }, [variant, percentage]);

    const accessibleLabel =
      ariaLabel || `${label ? `${label}: ` : ''}${formatValue(clampedValue)}${unit} (mín: ${min}, máx: ${max})`;

    return (
      <div
        ref={ref}
        role="meter"
        aria-valuenow={clampedValue}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-label={accessibleLabel}
        className={cn(gaugeVariants({ size }), className)}
        {...restProps}
      >
        {/* Contenedor SVG del medidor */}
        <div className="relative flex items-center justify-center">
          <svg
            width={diameter}
            height={svgHeight}
            viewBox={viewBox}
            className="overflow-visible"
            aria-hidden="true"
          >
            {/* Pista de fondo (Track) */}
            {variant === 'circle' ? (
              <circle
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                stroke="var(--alcspower-surface-muted, #e2e8f0)"
                strokeWidth={stroke}
                className="opacity-70 dark:opacity-40"
              />
            ) : (
              <path
                d={describeArc(center, center, radius, startAngle, startAngle + totalAngle)}
                fill="none"
                stroke="var(--alcspower-surface-muted, #e2e8f0)"
                strokeWidth={stroke}
                strokeLinecap="round"
                className="opacity-70 dark:opacity-40"
              />
            )}

            {/* Arco relleno de valor actual */}
            {variant === 'circle' ? (
              <circle
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                stroke={resolvedStrokeColor}
                strokeWidth={stroke}
                strokeDasharray={arcLength}
                strokeDashoffset={dashOffset}
                strokeLinecap="round"
                transform={`rotate(-90 ${center} ${center})`}
                className="transition-[stroke-dashoffset] duration-700 ease-out motion-reduce:transition-none"
              />
            ) : (
              <path
                d={describeArc(center, center, radius, startAngle, startAngle + totalAngle)}
                fill="none"
                stroke={resolvedStrokeColor}
                strokeWidth={stroke}
                strokeDasharray={arcLength}
                strokeDashoffset={dashOffset}
                strokeLinecap="round"
                className="transition-[stroke-dashoffset] duration-700 ease-out motion-reduce:transition-none"
              />
            )}

            {/* Aguja mecánica indicadora (Needle) */}
            {showNeedle && variant !== 'circle' && (
              <g
                transform={`translate(${center}, ${center}) rotate(${needleAngle})`}
                className="transition-transform duration-700 ease-out motion-reduce:transition-none"
              >
                {/* Cuerpo de la aguja */}
                <polygon
                  points={`0,-${radius * 0.85} 3,0 -3,0`}
                  fill="var(--alcspower-foreground)"
                  className="drop-shadow-xs"
                />
                {/* Perno central */}
                <circle cx="0" cy="0" r={stroke * 0.45} fill="var(--alcspower-foreground)" />
                <circle cx="0" cy="0" r={stroke * 0.22} fill="var(--alcspower-surface)" />
              </g>
            )}
          </svg>

          {/* Información numérica central */}
          {showValue && !showNeedle && (
            <div
              className={cn(
                'absolute flex flex-col items-center justify-center text-center pointer-events-none',
                variant === 'semicircle' ? 'bottom-0 translate-y-1' : 'inset-0'
              )}
            >
              <div className="flex items-baseline justify-center gap-0.5">
                <span className={cn('text-alcspower-foreground tracking-tight', sizeConfig.valueFont)}>
                  {formatValue(clampedValue)}
                </span>
                {unit && (
                  <span className="text-xs font-semibold text-alcspower-muted-foreground ml-0.5">
                    {unit}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Extremos Min / Max */}
        {showMinMax && variant !== 'circle' && (
          <div className="w-full flex justify-between px-2 text-[10px] text-alcspower-muted-foreground/80 font-mono mt-0.5">
            <span>{min}</span>
            <span>{max}</span>
          </div>
        )}

        {/* Etiquetas descriptivas contextuales */}
        {(label || sublabel) && (
          <div className="flex flex-col items-center justify-center text-center mt-1 space-y-0.5">
            {label && (
              <div className={cn('font-semibold text-alcspower-foreground', sizeConfig.labelFont)}>
                {label}
              </div>
            )}
            {sublabel && (
              <div className="text-[11px] text-alcspower-muted-foreground">
                {sublabel}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
);

Gauge.displayName = 'Gauge';
