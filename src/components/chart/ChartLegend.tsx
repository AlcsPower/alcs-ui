import * as React from 'react';
import { Legend } from 'recharts';
import { cn } from '../../lib/utils';
import { useChart } from './ChartContext';

export const ChartLegend = Legend;

export interface ChartLegendContentProps extends React.HTMLAttributes<HTMLDivElement> {
  payload?: any[];
  verticalAlign?: 'top' | 'bottom';
  hideIcon?: boolean;
  nameKey?: string;
}

export const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  ChartLegendContentProps
>(
  (
    { className, hideIcon = false, payload, verticalAlign = 'bottom', nameKey },
    ref
  ) => {
    const { config } = useChart();

    if (!payload?.length) {
      return null;
    }

    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center justify-center gap-4 text-xs',
          verticalAlign === 'top' ? 'pb-3' : 'pt-3',
          className
        )}
      >
        {payload.map((item) => {
          const key = `${nameKey || item.dataKey || 'value'}`;
          const itemConfig = config[key];

          return (
            <div
              key={item.value}
              className={cn(
                'flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-alcspower-muted-foreground'
              )}
            >
              {itemConfig?.icon && !hideIcon ? (
                <itemConfig.icon />
              ) : (
                <div
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{
                    backgroundColor: item.color || itemConfig?.color || 'var(--alcspower-primary)'
                  }}
                />
              )}
              <span className="text-alcspower-muted-foreground">
                {itemConfig?.label || item.value}
              </span>
            </div>
          );
        })}
      </div>
    );
  }
);

ChartLegendContent.displayName = 'ChartLegendContent';
