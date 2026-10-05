import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Calendar } from '../components/calendar';
import { DatePicker } from '../components/date-picker';
import { DateRangePicker } from '../components/date-range-picker';
import { Card, CardHeader, CardTitle, CardContent } from '../components/card';
import type { DateRange } from 'react-day-picker';

const meta: Meta = {
  title: 'Fechas/Sistema de Fechas',
  parameters: {
    layout: 'padded',
  },
};

export default meta;

export const CalendarioInteractivo: StoryObj = {
  render: () => {
    const [selected, setSelected] = useState<Date | undefined>(new Date());
    return (
      <div className="flex flex-col gap-4 max-w-sm">
        <Card>
          <CardHeader>
            <CardTitle>Calendario Mensual</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Calendar
              mode="single"
              selected={selected}
              onSelect={setSelected}
            />
          </CardContent>
        </Card>
        <p className="text-sm text-alcspower-muted-foreground text-center">
          Fecha seleccionada: {selected ? selected.toLocaleDateString('es-NI') : 'Ninguna'}
        </p>
      </div>
    );
  },
};

export const SelectorFecha: StoryObj = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <div className="space-y-6 max-w-md">
        <div>
          <label className="text-sm font-medium mb-1.5 block">Fecha de Registro</label>
          <DatePicker value={date} onChange={setDate} />
        </div>

        <div>
          <label className="text-sm font-medium mb-1.5 block">Tamaño Compacto (sm)</label>
          <DatePicker size="sm" value={date} onChange={setDate} />
        </div>

        <div>
          <label className="text-sm font-medium mb-1.5 block">Tamaño Grande (lg)</label>
          <DatePicker size="lg" value={date} onChange={setDate} />
        </div>

        <div>
          <label className="text-sm font-medium mb-1.5 block">Estado con Error</label>
          <DatePicker hasError={true} value={date} onChange={setDate} />
        </div>
      </div>
    );
  },
};

export const RangoFechas: StoryObj = {
  render: () => {
    const [range, setRange] = useState<DateRange | undefined>({
      from: new Date(),
      to: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    return (
      <div className="space-y-4 max-w-lg">
        <div>
          <label className="text-sm font-medium mb-1.5 block">Período de Auditoría</label>
          <DateRangePicker value={range} onChange={setRange} />
        </div>
      </div>
    );
  },
};
