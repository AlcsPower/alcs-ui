import * as React from 'react';
import { ResponsiveContainer } from 'recharts';
import { cn } from '../../lib/utils';
import { VisuallyHidden } from '../visually-hidden';
import { ChartContext, type ChartConfig } from './ChartContext';

export interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  config: ChartConfig;
  children: React.ReactElement;
  /** Título accesible anunciado a tecnologías de asistencia */
  accessibleTitle?: string;
  /** Descripción accesible o resumen de los datos del gráfico */
  accessibleDescription?: string;
  /** Relación de aspecto o altura fija (por defecto 300px o 100%) */
  aspectRatio?: number;
  minHeight?: number | string;
}

export const ChartContainer = React.forwardRef<HTMLDivElement, ChartContainerProps>(
  (
    {
      id: customId,
      className,
      children,
      config,
      accessibleTitle,
      accessibleDescription,
      aspectRatio,
      minHeight = 300,
      ...props
    },
    ref
  ) => {
    const reactId = React.useId();
    const chartId = customId || `alcspower-chart-${reactId.replace(/:/g, '')}`;

    // Construcción de variables CSS semánticas dinámicas basadas en ChartConfig
    const styleVariables = React.useMemo(() => {
      const vars: Record<string, string> = {};
      Object.entries(config).forEach(([key, item]) => {
        if (item.color) {
          vars[`--color-${key}`] = item.color;
        }
      });
      return vars;
    }, [config]);

    return (
      <ChartContext.Provider value={{ config }}>
        <div
          ref={ref}
          id={chartId}
          data-chart={chartId}
          role="img"
          aria-label={accessibleTitle || 'Gráfico de visualización de datos'}
          className={cn(
            'relative flex aspect-video justify-center text-xs w-full text-alcspower-foreground',
            '[&_.recharts-cartesian-axis-tick_text]:fill-alcspower-muted-foreground [&_.recharts-cartesian-grid_line]:stroke-alcspower-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-alcspower-border [&_.recharts-polar-grid_[stroke]]:stroke-alcspower-border [&_.recharts-radial-bar-background-sector]:fill-alcspower-surface-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-alcspower-surface-muted/50 [&_.recharts-reference-line_[stroke]]:stroke-alcspower-border',
            className
          )}
          style={{
            minHeight: typeof minHeight === 'number' ? `${minHeight}px` : minHeight,
            ...styleVariables,
            ...(props.style || {})
          }}
          {...props}
        >
          {accessibleDescription && (
            <VisuallyHidden>
              <p>{accessibleDescription}</p>
            </VisuallyHidden>
          )}

          <ResponsiveContainer
            width="100%"
            height="100%"
            aspect={aspectRatio}
          >
            {children}
          </ResponsiveContainer>
        </div>
      </ChartContext.Provider>
    );
  }
);

ChartContainer.displayName = 'ChartContainer';
