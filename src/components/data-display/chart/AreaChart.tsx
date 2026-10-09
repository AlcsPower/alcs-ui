import * as React from 'react';
import {
  AreaChart as RechartsAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';
import { ChartContainer } from './ChartContainer';
import { ChartTooltip, ChartTooltipContent } from './ChartTooltip';
import { ChartLegend, ChartLegendContent } from './ChartLegend';
import type { ChartConfig } from './ChartContext';

export interface AreaChartSeries {
  key: string;
  name?: string;
  color?: string;
  stackId?: string;
  fillOpacity?: number;
  strokeWidth?: number;
}

export interface AreaChartProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  data: Array<Record<string, unknown>>;
  config: ChartConfig;
  xAxisKey: string;
  series: AreaChartSeries[];
  curve?: 'linear' | 'natural' | 'monotone' | 'step';
  useGradient?: boolean;
  showGrid?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
  minHeight?: number | string;
  accessibleTitle?: string;
  accessibleDescription?: string;
}

export const AreaChart = React.forwardRef<HTMLDivElement, AreaChartProps>(
  (
    {
      data,
      config,
      xAxisKey,
      series,
      curve = 'monotone',
      useGradient = true,
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
    const reactId = React.useId();
    const gradientPrefix = `alcspower-grad-${reactId.replace(/:/g, '')}`;

    return (
      <ChartContainer
        ref={ref}
        config={config}
        minHeight={minHeight}
        accessibleTitle={accessibleTitle || 'Gráfico de área'}
        accessibleDescription={accessibleDescription}
        className={className}
        {...props}
      >
        <RechartsAreaChart
          data={data}
          margin={{ top: 16, right: 16, left: 0, bottom: 4 }}
        >
          {useGradient && (
            <defs>
              {series.map((s, index) => {
                const fallbackColor = `var(--alcspower-chart-${(index % 5) + 1})`;
                const color = s.color || `var(--color-${s.key}, ${fallbackColor})`;
                const gradId = `${gradientPrefix}-${s.key}`;

                return (
                  <linearGradient key={s.key} id={gradId} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={color} stopOpacity={0.42} />
                    <stop offset="100%" stopColor={color} stopOpacity={0.02} />
                  </linearGradient>
                );
              })}
            </defs>
          )}

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
            const gradId = `${gradientPrefix}-${s.key}`;
            const fill = useGradient ? `url(#${gradId})` : strokeColor;
            const effectiveStrokeWidth = s.strokeWidth ?? 2.5;

            return (
              <Area
                key={s.key}
                type={curve}
                dataKey={s.key}
                name={s.name || (config[s.key]?.label as string) || s.key}
                stroke={strokeColor}
                strokeWidth={effectiveStrokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill={fill}
                fillOpacity={useGradient ? 1 : s.fillOpacity ?? 0.25}
                stackId={s.stackId}
              />
            );
          })}
        </RechartsAreaChart>
      </ChartContainer>
    );
  }
);

AreaChart.displayName = 'AreaChart';
