import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Calendar } from './Calendar';
import { CalendarEventList, CalendarSelectedDateCard, type CalendarEvent } from './CalendarEventList';
import { Sun, ChevronLeft, ChevronRight } from 'lucide-react';
import type { DateRange } from 'react-day-picker';

const meta: Meta<typeof Calendar> = {
  title: 'Fechas/Calendar',
  component: Calendar,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Calendar>;

export const Default: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<Date | undefined>(new Date(2026, 9, 4));
    return (
      <div className="flex justify-center p-4">
        <Calendar mode="single" selected={selected} onSelect={setSelected} defaultMonth={new Date(2026, 9, 1)} />
      </div>
    );
  },
};

export const RangoFechas: Story = {
  render: () => {
    const [range, setRange] = React.useState<DateRange | undefined>({
      from: new Date(2026, 9, 4),
      to: new Date(2026, 9, 10),
    });
    return (
      <div className="flex justify-center p-4">
        <Calendar mode="range" selected={range} onSelect={setRange} defaultMonth={new Date(2026, 9, 1)} />
      </div>
    );
  },
};

export const ShowcaseRedesign: Story = {
  render: () => {
    const [mode, setMode] = React.useState<'single' | 'range' | 'multiple'>('single');
    const [selectedSingle, setSelectedSingle] = React.useState<Date | undefined>(new Date(2026, 9, 4));
    const [selectedRange, setSelectedRange] = React.useState<DateRange | undefined>({
      from: new Date(2026, 9, 4),
      to: new Date(2026, 9, 10),
    });
    const [selectedMultiple, setSelectedMultiple] = React.useState<Date[] | undefined>([
      new Date(2026, 9, 4),
      new Date(2026, 9, 12),
      new Date(2026, 9, 22),
    ]);
    const [month, setMonth] = React.useState<Date>(new Date(2026, 9, 1));

    const events: Record<string, Array<{ time: string; title: string; desc: string; type: 'primary' | 'warning' | 'success' }>> = {
      '2026-10-4': [
        { time: '09:00', title: 'Reunión de equipo', desc: 'Sala de conferencias A', type: 'primary' },
        { time: '14:30', title: 'Review de sprint', desc: 'Virtual · Zoom', type: 'warning' },
        { time: '17:00', title: 'Deploy a producción', desc: 'v2.4.1', type: 'success' },
      ],
      '2026-10-12': [
        { time: '10:00', title: 'Workshop de diseño', desc: 'Laboratorio UX', type: 'success' },
      ],
      '2026-10-22': [
        { time: '11:00', title: 'Entrega de proyecto', desc: 'Deadline final', type: 'warning' },
        { time: '16:00', title: 'Retro del equipo', desc: 'Sala B', type: 'primary' },
      ],
    };

    const currentKey = selectedSingle
      ? `${selectedSingle.getFullYear()}-${selectedSingle.getMonth() + 1}-${selectedSingle.getDate()}`
      : '2026-10-4';
    const dayEvents = events[currentKey] || [];

    const monthNames = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

    return (
      <div className="max-w-4xl mx-auto space-y-12 py-6 font-sans">
        {/* Header */}
        <div className="space-y-3 border-b pb-6">
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Calendar Component — Redesign</h2>
            <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-blue-100 text-blue-700">v0.7.0</span>
            <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-slate-100 text-slate-600 border">Design System</span>
          </div>
          <p className="text-sm text-slate-500 max-w-2xl">
            Calendario interactivo con soporte de selección simple, múltiple y rangos, navegación por teclado, eventos y localización en español. Rediseño con panel lateral de contexto, microinteracciones y mejor jerarquía visual.
          </p>
        </div>

        {/* Sección interactiva */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 items-start">
          {/* Tarjeta del Calendario */}
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden p-6 space-y-4">
            {/* Header del Calendario */}
            <div className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl font-extrabold text-slate-900 capitalize">
                  {monthNames[month.getMonth()]}
                </span>
                <span className="px-3 py-0.5 text-xs font-bold rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  {month.getFullYear()}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setMonth(new Date())}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 border flex items-center gap-1.5 transition-all active:scale-95"
                >
                  <Sun className="h-3.5 w-3.5 text-amber-500" />
                  Hoy
                </button>
                <button
                  type="button"
                  onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))}
                  className="h-8 w-8 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-600 border flex items-center justify-center transition-all active:scale-95"
                  title="Mes anterior"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))}
                  className="h-8 w-8 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-600 border flex items-center justify-center transition-all active:scale-95"
                  title="Mes siguiente"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Selector de Modos */}
            <div className="flex items-center gap-1.5 bg-slate-50 p-1 rounded-xl w-fit border">
              <button
                type="button"
                onClick={() => setMode('single')}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                  mode === 'single'
                    ? 'bg-white text-blue-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Simple
              </button>
              <button
                type="button"
                onClick={() => setMode('range')}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                  mode === 'range'
                    ? 'bg-white text-blue-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Rango
              </button>
              <button
                type="button"
                onClick={() => setMode('multiple')}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                  mode === 'multiple'
                    ? 'bg-white text-blue-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Múltiple
              </button>
            </div>

            {/* Grid del Calendario */}
            <div className="flex justify-center pt-2">
              {mode === 'single' && (
                <Calendar
                  mode="single"
                  month={month}
                  onMonthChange={setMonth}
                  selected={selectedSingle}
                  onSelect={setSelectedSingle}
                  className="border-0 shadow-none p-0"
                />
              )}
              {mode === 'range' && (
                <Calendar
                  mode="range"
                  month={month}
                  onMonthChange={setMonth}
                  selected={selectedRange}
                  onSelect={setSelectedRange}
                  className="border-0 shadow-none p-0"
                />
              )}
              {mode === 'multiple' && (
                <Calendar
                  mode="multiple"
                  month={month}
                  onMonthChange={setMonth}
                  selected={selectedMultiple}
                  onSelect={setSelectedMultiple}
                  className="border-0 shadow-none p-0"
                />
              )}
            </div>
          </div>

          {/* Panel Lateral Desacoplado */}
          <div className="space-y-4">
            <CalendarEventList
              date={selectedSingle}
              events={dayEvents}
              showDateCard
              onEventClick={(evt) => console.log('Evento seleccionado:', evt)}
            />

            {/* Atajos de teclado */}
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">
                Atajos de teclado
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-600">Día ant. / sig.</span>
                  <span className="font-mono text-[10px] font-bold bg-white px-1.5 py-0.5 rounded border text-slate-700">← →</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-600">Semana</span>
                  <span className="font-mono text-[10px] font-bold bg-white px-1.5 py-0.5 rounded border text-slate-700">↑ ↓</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-600">Ir a Hoy</span>
                  <span className="font-mono text-[10px] font-bold bg-white px-1.5 py-0.5 rounded border text-slate-700">T</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-600">Seleccionar</span>
                  <span className="font-mono text-[10px] font-bold bg-white px-1.5 py-0.5 rounded border text-slate-700">Enter</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

export const ListaEventosStandalone: Story = {
  render: () => {
    const demoEvents: CalendarEvent[] = [
      { id: 1, time: '09:00 AM', title: 'Reunión con Alcaldía de Managua', desc: 'Presentación de propuesta técnica', type: 'primary' },
      { id: 2, time: '11:30 AM', title: 'Revisión de Firma Electrónica', desc: 'Certificados y tokens criptográficos', type: 'warning' },
      { id: 3, time: '02:00 PM', title: 'Comité de Seguridad Informática', desc: 'Validación de roles y permisos', type: 'success' },
      { id: 4, time: '04:30 PM', title: 'Incidente Crítico en Servidor', desc: 'Atención prioritaria equipo DevOps', type: 'danger' },
    ];

    return (
      <div className="max-w-md mx-auto p-4 space-y-6">
        <CalendarSelectedDateCard date={new Date(2026, 9, 4)} eventCount={demoEvents.length} />
        <CalendarEventList events={demoEvents} title="ITINERARIO DEL DÍA" />
      </div>
    );
  },
};

