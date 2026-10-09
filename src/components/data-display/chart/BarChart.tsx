import * as React from 'react';
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';
import { ChartContainer } from './ChartContainer';
import { ChartTooltip, ChartTooltipContent } from './ChartTooltip';
import { ChartLegend, ChartLegendContent } from './ChartLegend';
import type { ChartConfig } from './ChartContext';

export interface BarChartSeries {
  key: string;
  name?: string;
  color?: string;
  stackId?: string;
  radius?: number | [number, number, number, number];
}

export interface BarChartProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  data: Array<Record<string, unknown>>;
  config: ChartConfig;
  xAxisKey: string;
  series: BarChartSeries[];
  layout?: 'horizontal' | 'vertical';
  showGrid?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
  minHeight?: number | string;
  accessibleTitle?: string;
  accessibleDescription?: string;
}

export const BarChart = React.forwardRef<HTMLDivElement, BarChartProps>(
  (
    {
      data,
      config,
      xAxisKey,
      series,
      layout = 'horizontal',
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
        accessibleTitle={accessibleTitle || 'Gráfico de barras'}
        accessibleDescription={accessibleDescription}
        className={className}
        {...props}
      >
        <RechartsBarChart
          data={data}
          layout={layout}
          margin={{ top: 16, right: 16, left: 0, bottom: 4 }}
        >
          {showGrid && (
            <CartesianGrid
              strokeDasharray="4 4"
              stroke="var(--alcspower-border)"
              strokeOpacity={0.6}
              vertical={layout === 'horizontal' ? false : true}
              horizontal={layout === 'horizontal' ? true : false}
            />
          )}

          {layout === 'horizontal' ? (
            <>
              <XAxis
                dataKey={xAxisKey}
                tickLine={false}
                axisLine={false}
                tickMargin={10}
              />
              <YAxis tickLine={false} axisLine={false} tickMargin={10} />
            </>
          ) : (
            <>
              <XAxis type="number" tickLine={false} axisLine={false} tickMargin={10} />
              <YAxis
                dataKey={xAxisKey}
                type="category"
                tickLine={false}
                axisLine={false}
                tickMargin={10}
              />
            </>
          )}

          {showTooltip && (
            <ChartTooltip
              content={<ChartTooltipContent />}
              cursor={{ fill: 'var(--alcspower-surface-muted)', opacity: 0.5 }}
            />
          )}

          {showLegend && <ChartLegend content={<ChartLegendContent />} />}

          {series.map((s, index) => {
            const fallbackColor = `var(--alcspower-chart-${(index % 5) + 1})`;
            const barColor = s.color || `var(--color-${s.key}, ${fallbackColor})`;
            const defaultRadius: [number, number, number, number] = [6, 6, 0, 0];

            return (
              <Bar
                key={s.key}
                dataKey={s.key}
                name={s.name || (config[s.key]?.label as string) || s.key}
                fill={barColor}
                stackId={s.stackId}
                radius={s.radius !== undefined ? s.radius : defaultRadius}
                maxBarSize={48}
              />
            );
          })}
        </RechartsBarChart>
      </ChartContainer>
    );
  }
);

BarChart.displayName = 'BarChart';
