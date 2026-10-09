import * as React from 'react';
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell
} from 'recharts';
import { ChartContainer } from './ChartContainer';
import { ChartTooltip, ChartTooltipContent } from './ChartTooltip';
import { ChartLegend, ChartLegendContent } from './ChartLegend';
import type { ChartConfig } from './ChartContext';

export interface PieChartProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  data: Array<Record<string, unknown>>;
  config: ChartConfig;
  dataKey: string;
  nameKey: string;
  donut?: boolean;
  innerRadius?: number;
  outerRadius?: number;
  showLegend?: boolean;
  showTooltip?: boolean;
  minHeight?: number | string;
  accessibleTitle?: string;
  accessibleDescription?: string;
}

export const PieChart = React.forwardRef<HTMLDivElement, PieChartProps>(
  (
    {
      data,
      config,
      dataKey,
      nameKey,
      donut = false,
      innerRadius,
      outerRadius,
      showLegend = true,
      showTooltip = true,
      minHeight = 300,
      accessibleTitle,
      accessibleDescription,
      className,
      ...props
    },
    ref
  ) => {
    const computedInnerRadius = donut ? (innerRadius ?? 65) : (innerRadius ?? 0);
    const computedOuterRadius = outerRadius ?? (donut ? 105 : 95);

    return (
      <ChartContainer
        ref={ref}
        config={config}
        minHeight={minHeight}
        accessibleTitle={accessibleTitle || 'Gráfico circular'}
        accessibleDescription={accessibleDescription}
        className={className}
        {...props}
      >
        <RechartsPieChart margin={{ top: 16, right: 16, left: 16, bottom: 16 }}>
          {showTooltip && (
            <ChartTooltip
              content={<ChartTooltipContent nameKey={nameKey} />}
            />
          )}

          {showLegend && <ChartLegend content={<ChartLegendContent nameKey={nameKey} />} />}

          <Pie
            data={data}
            dataKey={dataKey}
            nameKey={nameKey}
            innerRadius={computedInnerRadius}
            outerRadius={computedOuterRadius}
            paddingAngle={donut ? 3 : 0}
            stroke="var(--alcspower-surface)"
            strokeWidth={3}
          >
            {data.map((entry, index) => {
              const entryKey = String(entry[nameKey] ?? (entry as any).name ?? (entry as any).id ?? index);
              const fallbackColor = `var(--alcspower-chart-${(index % 5) + 1})`;
              const cellColor =
                (entry.fill as string | undefined) ||
                (entry.color as string | undefined) ||
                config[entryKey]?.color ||
                `var(--color-${entryKey}, ${fallbackColor})`;

              return <Cell key={`cell-${index}`} fill={cellColor} />;
            })}
          </Pie>
        </RechartsPieChart>
      </ChartContainer>
    );
  }
);

PieChart.displayName = 'PieChart';
