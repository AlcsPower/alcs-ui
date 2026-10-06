import * as React from 'react';
import { Tooltip } from 'recharts';
import { cn } from '../../lib/utils';
import { useChart } from './ChartContext';

export const ChartTooltip = Tooltip;

export interface ChartTooltipPayloadItem {
  value?: unknown;
  name?: unknown;
  color?: string;
  dataKey?: string | number;
  payload?: Record<string, any>;
  [key: string]: unknown;
}

export interface ChartTooltipContentProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean;
  payload?: ChartTooltipPayloadItem[];
  label?: React.ReactNode;
  labelFormatter?: (label: React.ReactNode, payload: ChartTooltipPayloadItem[]) => React.ReactNode;
  labelClassName?: string;
  formatter?: (value: unknown, name: unknown, item: ChartTooltipPayloadItem, index: number, payload?: any) => React.ReactNode;
  indicator?: 'dot' | 'line' | 'dashed';
  hideLabel?: boolean;
  hideIndicator?: boolean;
  nameKey?: string;
  labelKey?: string;
}

export const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  ChartTooltipContentProps
>(
  (
    {
      active,
      payload,
      className,
      indicator = 'dot',
      hideLabel = false,
      hideIndicator = false,
      label,
      labelFormatter,
      labelClassName,
      formatter,
      nameKey,
      labelKey
    },
    ref
  ) => {
    const { config } = useChart();

    const tooltipLabel = React.useMemo(() => {
      if (hideLabel || !payload?.length) {
        return null;
      }

      const [item] = payload;
      const key = `${labelKey || item?.dataKey || item?.name || 'value'}`;
      const itemConfig = config[key];
      const value =
        !labelKey && typeof label === 'string'
          ? config[label]?.label || label
          : itemConfig?.label;

      if (labelFormatter) {
        return (
          <div className={cn('font-medium text-alcspower-foreground', labelClassName)}>
            {labelFormatter(value || label, payload)}
          </div>
        );
      }

      if (!value && !label) {
        return null;
      }

      return (
        <div className={cn('font-medium text-alcspower-foreground', labelClassName)}>
          {value || label}
        </div>
      );
    }, [label, labelFormatter, payload, hideLabel, labelClassName, config, labelKey]);

    if (!active || !payload?.length) {
      return null;
    }

    const nestLabel = payload.length === 1 && indicator !== 'dot';

    return (
      <div
        ref={ref}
        className={cn(
          'grid min-w-[8rem] items-start gap-1.5 rounded-alcspower-md border border-alcspower-border bg-alcspower-surface p-2.5 text-xs shadow-md',
          className
        )}
      >
        {!nestLabel ? tooltipLabel : null}
        <div className="grid gap-1.5">
          {payload.map((item, index) => {
            const key = `${nameKey || item.name || item.dataKey || 'value'}`;
            const itemConfig = config[key];
            const indicatorColor = item.payload?.fill || item.color || itemConfig?.color || 'var(--alcspower-primary)';

            return (
              <div
                key={item.dataKey || index}
                className={cn(
                  'flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-alcspower-muted-foreground',
                  indicator === 'dot' && 'items-center'
                )}
              >
                {formatter && item?.value !== undefined && item.name ? (
                  formatter(item.value, item.name, item, index, item.payload)
                ) : (
                  <>
                    {!hideIndicator && (
                      <div
                        className={cn(
                          'shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg]',
                          {
                            'h-2.5 w-2.5 rounded-full': indicator === 'dot',
                            'w-1': indicator === 'line',
                            'w-0 border-[1.5px] border-dashed bg-transparent':
                              indicator === 'dashed',
                            'my-0.5': nestLabel && indicator === 'dashed'
                          }
                        )}
                        style={
                          {
                            '--color-bg': indicatorColor,
                            '--color-border': indicatorColor
                          } as React.CSSProperties
                        }
                      />
                    )}
                    <div
                      className={cn(
                        'flex flex-1 justify-between leading-none',
                        nestLabel ? 'items-end' : 'items-center'
                      )}
                    >
                      <div className="grid gap-1.5">
                        {nestLabel ? tooltipLabel : null}
                        <span className="text-alcspower-muted-foreground">
                          {itemConfig?.label || (item.name as React.ReactNode)}
                        </span>
                      </div>
                      {item.value !== undefined && (
                        <span className="font-mono font-medium tabular-nums text-alcspower-foreground ml-3">
                          {typeof item.value === 'number'
                            ? item.value.toLocaleString('es-NI')
                            : String(item.value)}
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

ChartTooltipContent.displayName = 'ChartTooltipContent';
