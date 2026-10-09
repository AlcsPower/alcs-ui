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
          margin={{ top: 16, right: 16, left: 0, bottom: 4 }}
        >
          {showGrid && (
            <CartesianGrid
              strokeDasharray="4 4"
              stroke="var(--alcspower-border)"
              strokeOpacity={0.6}
              vertical={false}
            />
          )}

          <XAxis
            dataKey={xAxisKey}
            tickLine={false}
            axisLine={false}
            tickMargin={10}
          />
          <YAxis tickLine={false} axisLine={false} tickMargin={10} />

          {showTooltip && (
            <ChartTooltip content={<ChartTooltipContent />} />
          )}

          {showLegend && <ChartLegend content={<ChartLegendContent />} />}

          {series.map((s, index) => {
            const fallbackColor = `var(--alcspower-chart-${(index % 5) + 1})`;
            const strokeColor = s.color || `var(--color-${s.key}, ${fallbackColor})`;
            const effectiveStrokeWidth = s.strokeWidth ?? 2.5;

            return (
              <Line
                key={s.key}
                type={curve}
                dataKey={s.key}
                name={s.name || (config[s.key]?.label as string) || s.key}
                stroke={strokeColor}
                strokeWidth={effectiveStrokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
                dot={
                  s.dot
                    ? {
                        r: 4,
                        strokeWidth: 2,
                        fill: 'var(--alcspower-surface)',
                        stroke: strokeColor
                      }
                    : false
                }
                activeDot={{
                  r: 6,
                  strokeWidth: 2,
                  fill: strokeColor,
                  stroke: 'var(--alcspower-surface)'
                }}
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
