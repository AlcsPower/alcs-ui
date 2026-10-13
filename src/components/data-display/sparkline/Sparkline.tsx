import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils';

export type SparklineDataPoint = number | { value: number; label?: string; date?: string };

export type SparklineType = 'line' | 'area' | 'bar';
export type SparklineVariant = 'primary' | 'success' | 'warning' | 'destructive' | 'neutral' | 'auto';
export type SparklineCurve = 'monotone' | 'linear';

export const sparklineVariants = cva('inline-block overflow-visible select-none align-middle', {
  variants: {
    size: {
      sm: 'h-6',
      md: 'h-9',
      lg: 'h-12',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export interface SparklineProps
  extends React.SVGAttributes<SVGSVGElement>,
    VariantProps<typeof sparklineVariants> {
  /** Serie de datos numéricos o con metadatos asociados */
  data: SparklineDataPoint[];
  /** Tipo visual de renderizado: línea continua, área rellena con gradiente o gráfico de micro-barras */
  type?: SparklineType;
  /** Variante cromática semántica o cálculo automático de tendencia */
  variant?: SparklineVariant;
  /** Ancho del contenedor SVG en píxeles numéricos o porcentaje CSS (ej. '100%') */
  width?: number | string;
  /** Altura del contenedor SVG en píxeles numéricos */
  height?: number;
  /** Grosor del trazo de la línea */
  strokeWidth?: number;
  /** Muestra puntos circulares en todas las muestras de datos */
  showPoints?: boolean;
  /** Resalta con un punto focal el último valor de la serie */
  showLastPoint?: boolean;
  /** Resalta con puntos diferenciados los valores mínimo y máximo */
  showMinMaxPoints?: boolean;
  /** Tipo de curvatura del trazo: 'monotone' (suave spline) o 'linear' (líneas rectas) */
  curve?: SparklineCurve;
  /** Habilita interacción táctil/ratón con cursor en cruz y tooltip flotante */
  interactive?: boolean;
  /** Función formateadora para el valor mostrado en el tooltip o accesibilidad */
  formatValue?: (val: number) => string;
  /** Etiqueta accesible para lectores de pantalla */
  ariaLabel?: string;
}

// Generador de curva cúbica suave (Monotone / Cardinal Spline)
function generateSvgPath(points: { x: number; y: number }[], smooth: boolean): string {
  if (points.length === 0) return '';
  const firstPoint = points[0];
  if (!firstPoint) return '';
  if (points.length === 1) return `M ${firstPoint.x.toFixed(1)} ${firstPoint.y.toFixed(1)}`;
  if (!smooth || points.length === 2) {
    return points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
  }

  let path = `M ${firstPoint.x.toFixed(1)} ${firstPoint.y.toFixed(1)}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i === 0 ? 0 : i - 1] ?? firstPoint;
    const p1 = points[i] ?? firstPoint;
    const p2 = points[i + 1] ?? p1;
    const p3 = points[i + 2 >= points.length ? points.length - 1 : i + 2] ?? p2;

    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;

    path += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  }
  return path;
}

export const Sparkline = React.forwardRef<SVGSVGElement, SparklineProps>(
  (
    {
      data = [],
      type = 'area',
      variant = 'primary',
      width = 120,
      height = 36,
      strokeWidth = 2,
      showPoints = false,
      showLastPoint = true,
      showMinMaxPoints = false,
      curve = 'monotone',
      interactive = false,
      formatValue = (v) => v.toLocaleString(),
      ariaLabel,
      className,
      ...restProps
    },
    ref
  ) => {
    const [hoverIndex, setHoverIndex] = React.useState<number | null>(null);
    const uniqueId = React.useId();
    const gradientId = `sparkline-gradient-${uniqueId.replace(/:/g, '')}`;

    // Normalizar puntos de datos
    const normalizedData = React.useMemo(() => {
      return data.map((item) => {
        if (typeof item === 'number') {
          return { value: item, label: undefined, date: undefined };
        }
        return item;
      });
    }, [data]);

    const values = React.useMemo(() => normalizedData.map((d) => d.value), [normalizedData]);

    // Cálculo de extremos
    const { minVal, maxVal, minIndex, maxIndex, isUpTrend } = React.useMemo(() => {
      if (values.length === 0) {
        return { minVal: 0, maxVal: 0, minIndex: -1, maxIndex: -1, isUpTrend: true };
      }
      let min = values[0] ?? 0;
      let max = values[0] ?? 0;
      let minIdx = 0;
      let maxIdx = 0;

      values.forEach((v, idx) => {
        if (v < min) {
          min = v;
          minIdx = idx;
        }
        if (v > max) {
          max = v;
          maxIdx = idx;
        }
      });

      const first = values[0] ?? 0;
      const last = values[values.length - 1] ?? 0;
      return {
        minVal: min,
        maxVal: max,
        minIndex: minIdx,
        maxIndex: maxIdx,
        isUpTrend: last >= first,
      };
    }, [values]);

    // Resolución cromática semántica
    const resolvedColor = React.useMemo(() => {
      if (variant === 'auto') {
        return isUpTrend ? 'var(--alcspower-success)' : 'var(--alcspower-destructive)';
      }
      switch (variant) {
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
    }, [variant, isUpTrend]);

    // Dimensiones internas del viewBox
    const viewBoxWidth = typeof width === 'number' ? width : 200;
    const viewBoxHeight = height;
    const paddingX = type === 'bar' ? 4 : strokeWidth + 3;
    const paddingY = strokeWidth + 4;

    const availableWidth = Math.max(1, viewBoxWidth - paddingX * 2);
    const availableHeight = Math.max(1, viewBoxHeight - paddingY * 2);
    const range = maxVal - minVal === 0 ? 1 : maxVal - minVal;

    // Puntos normalizados (x, y)
    const points = React.useMemo(() => {
      if (values.length === 0) return [];
      if (values.length === 1) {
        return [{ x: viewBoxWidth / 2, y: viewBoxHeight / 2, value: values[0] ?? 0 }];
      }

      return values.map((val, i) => {
        const x = paddingX + (i / (values.length - 1)) * availableWidth;
        const y = viewBoxHeight - paddingY - ((val - minVal) / range) * availableHeight;
        return { x, y, value: val };
      });
    }, [values, paddingX, availableWidth, viewBoxHeight, paddingY, minVal, range, availableHeight, viewBoxWidth]);

    // Rutas SVG
    const linePath = React.useMemo(() => {
      return generateSvgPath(points, curve === 'monotone');
    }, [points, curve]);

    const areaPath = React.useMemo(() => {
      if (points.length < 2) return '';
      const firstPt = points[0];
      const lastPt = points[points.length - 1];
      if (!firstPt || !lastPt) return '';
      const baselineY = viewBoxHeight - paddingY;
      const firstX = firstPt.x;
      const lastX = lastPt.x;
      return `${linePath} L ${lastX.toFixed(1)} ${baselineY.toFixed(1)} L ${firstX.toFixed(1)} ${baselineY.toFixed(1)} Z`;
    }, [linePath, points, viewBoxHeight, paddingY]);

    // Manejador interactivo de cursor
    const handleMouseMove = React.useCallback(
      (e: React.MouseEvent<SVGSVGElement>) => {
        if (!interactive || points.length === 0) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const clientX = e.clientX - rect.left;
        const ratio = clientX / rect.width;
        const svgX = ratio * viewBoxWidth;

        // Buscar el punto más cercano
        let closestIndex = 0;
        let closestDistance = Infinity;
        points.forEach((p, idx) => {
          const dist = Math.abs(p.x - svgX);
          if (dist < closestDistance) {
            closestDistance = dist;
            closestIndex = idx;
          }
        });
        setHoverIndex(closestIndex);
      },
      [interactive, points, viewBoxWidth]
    );

    const handleMouseLeave = React.useCallback(() => {
      setHoverIndex(null);
    }, []);

    // Texto de accesibilidad
    const startVal = values[0] ?? 0;
    const endVal = values[values.length - 1] ?? 0;
    const defaultAria = `Micrográfico de tendencia con ${values.length} muestras, valor inicial ${formatValue(
      startVal
    )}, valor final ${formatValue(endVal)}`;

    if (values.length === 0) {
      return (
        <svg
          ref={ref}
          role="img"
          aria-label="Micrográfico sin datos"
          width={width}
          height={height}
          viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
          className={cn('inline-block text-alcspower-muted-foreground/30', className)}
          {...restProps}
        >
          <line
            x1="0"
            y1={viewBoxHeight / 2}
            x2={viewBoxWidth}
            y2={viewBoxHeight / 2}
            stroke="currentColor"
            strokeDasharray="3 3"
            strokeWidth="1"
          />
        </svg>
      );
    }

    const activePoint = hoverIndex !== null && points[hoverIndex] ? points[hoverIndex] : null;
    const activeData = hoverIndex !== null && normalizedData[hoverIndex] ? normalizedData[hoverIndex] : null;

    return (
      <div className="relative inline-block align-middle group/sparkline">
        <svg
          ref={ref}
          role="img"
          aria-label={ariaLabel || defaultAria}
          width={width}
          height={height}
          viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={cn(sparklineVariants(), interactive && 'cursor-crosshair', className)}
          {...restProps}
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={resolvedColor} stopOpacity="0.28" />
              <stop offset="85%" stopColor={resolvedColor} stopOpacity="0.04" />
              <stop offset="100%" stopColor={resolvedColor} stopOpacity="0.00" />
            </linearGradient>
          </defs>

          {/* Renderizado en modo BARRAS */}
          {type === 'bar' ? (
            <g className="transition-all">
              {points.map((pt, idx) => {
                const barWidth = Math.max(2, (availableWidth / points.length) * 0.7);
                const barHeight = Math.max(2, viewBoxHeight - paddingY - pt.y);
                const isHovered = hoverIndex === idx;
                return (
                  <rect
                    key={idx}
                    x={pt.x - barWidth / 2}
                    y={pt.y}
                    width={barWidth}
                    height={barHeight}
                    rx={Math.min(2, barWidth / 2)}
                    fill={resolvedColor}
                    opacity={isHovered ? 1 : hoverIndex !== null ? 0.4 : 0.85}
                    className="transition-opacity duration-150"
                  />
                );
              })}
            </g>
          ) : (
            <>
              {/* Área con gradiente debajo de la curva */}
              {type === 'area' && areaPath && (
                <path d={areaPath} fill={`url(#${gradientId})`} className="transition-all duration-300" />
              )}

              {/* Trazo continuo de la línea */}
              <path
                d={linePath}
                fill="none"
                stroke={resolvedColor}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-all duration-300"
              />

              {/* Puntos de todos los datos */}
              {showPoints &&
                points.map((pt, idx) => (
                  <circle
                    key={idx}
                    cx={pt.x}
                    cy={pt.y}
                    r={strokeWidth * 0.9}
                    fill={resolvedColor}
                    className="transition-transform"
                  />
                ))}

              {/* Punto mínimo y máximo */}
              {showMinMaxPoints && (
                <>
                  {points[minIndex] && (
                    <circle
                      cx={points[minIndex].x}
                      cy={points[minIndex].y}
                      r={strokeWidth + 1}
                      fill="var(--alcspower-destructive)"
                      stroke="var(--alcspower-surface)"
                      strokeWidth="1.5"
                    />
                  )}
                  {points[maxIndex] && (
                    <circle
                      cx={points[maxIndex].x}
                      cy={points[maxIndex].y}
                      r={strokeWidth + 1}
                      fill="var(--alcspower-success)"
                      stroke="var(--alcspower-surface)"
                      strokeWidth="1.5"
                    />
                  )}
                </>
              )}

              {/* Punto final destacado */}
              {showLastPoint && points.length > 0 && hoverIndex === null && points[points.length - 1] && (
                <circle
                  cx={points[points.length - 1]!.x}
                  cy={points[points.length - 1]!.y}
                  r={strokeWidth + 1.2}
                  fill={resolvedColor}
                  stroke="var(--alcspower-surface)"
                  strokeWidth="1.5"
                  className="animate-pulse"
                />
              )}

              {/* Línea de cursor interactivo */}
              {activePoint && (
                <>
                  <line
                    x1={activePoint.x}
                    y1={paddingY}
                    x2={activePoint.x}
                    y2={viewBoxHeight - paddingY}
                    stroke="var(--alcspower-border-strong, #94a3b8)"
                    strokeWidth="1"
                    strokeDasharray="2 2"
                    opacity="0.75"
                  />
                  <circle
                    cx={activePoint.x}
                    cy={activePoint.y}
                    r={strokeWidth + 2.5}
                    fill={resolvedColor}
                    stroke="var(--alcspower-surface)"
                    strokeWidth="2"
                    className="drop-shadow-xs"
                  />
                </>
              )}
            </>
          )}
        </svg>

        {/* Tooltip flotante al pasar el cursor */}
        {interactive && activePoint && activeData && (
          <div
            style={{
              left: `${(activePoint.x / viewBoxWidth) * 100}%`,
              transform: 'translate(-50%, -100%)',
            }}
            className="absolute top-0 -mt-1.5 pointer-events-none z-30 transition-all duration-75"
          >
            <div className="rounded-md bg-slate-900/90 dark:bg-slate-100/90 text-white dark:text-slate-900 px-2 py-0.5 text-[10px] font-medium shadow-md whitespace-nowrap flex items-center gap-1 backdrop-blur-xs">
              <span>{formatValue(activeData.value)}</span>
              {activeData.label && (
                <span className="text-slate-300 dark:text-slate-600 font-normal">({activeData.label})</span>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
);

Sparkline.displayName = 'Sparkline';
