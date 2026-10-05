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
  data: any[];
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
    const computedInnerRadius = donut ? (innerRadius ?? 55) : (innerRadius ?? 0);
    const computedOuterRadius = outerRadius ?? 85;

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
        <RechartsPieChart margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
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
            paddingAngle={donut ? 2 : 0}
            stroke="var(--alcspower-surface)"
            strokeWidth={2}
          >
            {data.map((entry, index) => {
              const entryKey = entry[nameKey] || entry.name || entry.id;
              const fallbackColor = `var(--alcspower-chart-${(index % 5) + 1})`;
              const cellColor =
                entry.fill ||
                entry.color ||
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
