import * as React from 'react';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';
import { ChartContainer } from './ChartContainer';
import { ChartTooltip, ChartTooltipContent } from './ChartTooltip';
import { ChartLegend, ChartLegendContent } from './ChartLegend';
import type { ChartConfig } from './ChartContext';

export interface LineChartSeries {
  key: string;
  name?: string;
  color?: string;
  strokeWidth?: number;
  dot?: boolean;
  strokeDasharray?: string;
}

export interface LineChartProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  data: Array<Record<string, unknown>>;
  config: ChartConfig;
  xAxisKey: string;
  series: LineChartSeries[];
  curve?: 'linear' | 'natural' | 'monotone' | 'step';
  showGrid?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
  minHeight?: number | string;
  accessibleTitle?: string;
  accessibleDescription?: string;
}

export const LineChart = React.forwardRef<HTMLDivElement, LineChartProps>(
  (
    {
      data,
      config,
      xAxisKey,
      series,
      curve = 'monotone',
      showGrid = true,
      showLegend = false,
      showTooltip = true,
      minHeight = 300,
      accessibleTitle,
      accessibleDescription,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <ChartContainer
        ref={ref}
        config={config}
        minHeight={minHeight}
        accessibleTitle={accessibleTitle || 'Gráfico de líneas'}
        accessibleDescription={accessibleDescription}
        className={className}
        {...props}
      >
        <RechartsLineChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          {showGrid && <CartesianGrid strokeDasharray="3 3" vertical={false} />}

          <XAxis
            dataKey={xAxisKey}
            tickLine={false}
            axisLine={false}
            tickMargin={8}
          />
          <YAxis tickLine={false} axisLine={false} tickMargin={8} />

          {showTooltip && (
            <ChartTooltip content={<ChartTooltipContent />} />
          )}

          {showLegend && <ChartLegend content={<ChartLegendContent />} />}

          {series.map((s, index) => {
            const fallbackColor = `var(--alcspower-chart-${(index % 5) + 1})`;
            const strokeColor = s.color || `var(--color-${s.key}, ${fallbackColor})`;

            return (
              <Line
                key={s.key}
                type={curve}
                dataKey={s.key}
                name={s.name || (config[s.key]?.label as string) || s.key}
                stroke={strokeColor}
                strokeWidth={s.strokeWidth || 2}
                dot={s.dot ?? false}
                activeDot={{ r: 5 }}
                strokeDasharray={s.strokeDasharray}
              />
            );
          })}
        </RechartsLineChart>
      </ChartContainer>
    );
  }
);

LineChart.displayName = 'LineChart';
