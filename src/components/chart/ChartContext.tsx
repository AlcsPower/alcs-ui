import * as React from 'react';

export type ChartConfig = Record<
  string,
  {
    label?: React.ReactNode;
    icon?: React.ComponentType<{ className?: string }>;
    color?: string;
    theme?: Record<string, string>;
  }
>;

export interface ChartContextProps {
  config: ChartConfig;
}

export const ChartContext = React.createContext<ChartContextProps | null>(null);

export function useChart(): ChartContextProps {
  const context = React.useContext(ChartContext);

  if (!context) {
    throw new Error('useChart debe ser utilizado dentro de un <ChartContainer />');
  }

  return context;
}
