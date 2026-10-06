import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import type { DateRange } from 'react-day-picker';
import { DateRangePicker } from './DateRangePicker';

const meta: Meta<typeof DateRangePicker> = {
  title: 'Fechas/DateRangePicker',
  component: DateRangePicker,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DateRangePicker>;

export const Default: Story = {
  render: () => {
    const [range, setRange] = React.useState<DateRange | undefined>({
      from: new Date(2026, 9, 5),
      to: new Date(2026, 9, 19),
    });
    return (
      <div className="max-w-sm mx-auto p-4">
        <DateRangePicker value={range} onChange={setRange} />
      </div>
    );
  },
};

export const Tamanos: Story = {
  render: () => {
    const [range, setRange] = React.useState<DateRange | undefined>({
      from: new Date(2026, 9, 5),
      to: new Date(2026, 9, 19),
    });
    return (
      <div className="max-w-md mx-auto p-4 space-y-4">
        <div className="space-y-1.5">
          <span className="text-xs font-semibold text-slate-500">small (sm - 36px)</span>
          <DateRangePicker size="sm" value={range} onChange={setRange} />
        </div>
        <div className="space-y-1.5">
          <span className="text-xs font-semibold text-slate-500">medium (md - 42px)</span>
          <DateRangePicker size="md" value={range} onChange={setRange} />
        </div>
        <div className="space-y-1.5">
          <span className="text-xs font-semibold text-slate-500">large (lg - 48px)</span>
          <DateRangePicker size="lg" value={range} onChange={setRange} />
        </div>
      </div>
    );
  },
};

export const Estados: Story = {
  render: () => {
    const [range, setRange] = React.useState<DateRange | undefined>({
      from: new Date(2026, 9, 5),
      to: new Date(2026, 9, 19),
    });
    return (
      <div className="max-w-md mx-auto p-4 space-y-4">
        <div className="space-y-1.5">
          <span className="text-xs font-semibold text-slate-500">Con selección</span>
          <DateRangePicker value={range} onChange={setRange} />
        </div>
        <div className="space-y-1.5">
          <span className="text-xs font-semibold text-slate-500">Sin selección</span>
          <DateRangePicker placeholder="Seleccionar rango de fechas" />
        </div>
        <div className="space-y-1.5">
          <span className="text-xs font-semibold text-slate-500">Con error</span>
          <DateRangePicker value={range} onChange={setRange} hasError />
        </div>
        <div className="space-y-1.5">
          <span className="text-xs font-semibold text-slate-500">Deshabilitado</span>
          <DateRangePicker value={range} onChange={setRange} disabled />
        </div>
      </div>
    );
  },
};
