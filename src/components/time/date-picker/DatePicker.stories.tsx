import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DatePicker } from './DatePicker';

const meta: Meta<typeof DatePicker> = {
  title: 'Fechas/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date(2026, 9, 5));
    return (
      <div className="max-w-xs mx-auto p-4">
        <DatePicker value={date} onChange={setDate} placeholder="Seleccionar fecha" />
      </div>
    );
  },
};

export const Tamanos: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date(2026, 9, 5));
    return (
      <div className="max-w-md mx-auto p-4 space-y-4">
        <div className="space-y-1.5">
          <span className="text-xs font-semibold text-slate-500">small (sm - 36px)</span>
          <DatePicker size="sm" value={date} onChange={setDate} />
        </div>
        <div className="space-y-1.5">
          <span className="text-xs font-semibold text-slate-500">medium (md - 42px)</span>
          <DatePicker size="md" value={date} onChange={setDate} />
        </div>
        <div className="space-y-1.5">
          <span className="text-xs font-semibold text-slate-500">large (lg - 48px)</span>
          <DatePicker size="lg" value={date} onChange={setDate} />
        </div>
      </div>
    );
  },
};

export const Estados: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date(2026, 9, 5));
    return (
      <div className="max-w-md mx-auto p-4 space-y-4">
        <div className="space-y-1.5">
          <span className="text-xs font-semibold text-slate-500">Por defecto</span>
          <DatePicker value={date} onChange={setDate} />
        </div>
        <div className="space-y-1.5">
          <span className="text-xs font-semibold text-slate-500">Con error (hasError)</span>
          <DatePicker value={date} onChange={setDate} hasError />
        </div>
        <div className="space-y-1.5">
          <span className="text-xs font-semibold text-slate-500">Con éxito (hasSuccess)</span>
          <DatePicker value={date} onChange={setDate} hasSuccess />
        </div>
        <div className="space-y-1.5">
          <span className="text-xs font-semibold text-slate-500">Deshabilitado (disabled)</span>
          <DatePicker value={date} onChange={setDate} disabled />
        </div>
      </div>
    );
  },
};

export const ShowcaseRedesign: Story = {
  render: () => {
    const [dateMd, setDateMd] = React.useState<Date | undefined>(new Date(2026, 9, 5));
    const [dateSm, setDateSm] = React.useState<Date | undefined>(new Date(2026, 9, 5));
    const [dateLg, setDateLg] = React.useState<Date | undefined>(new Date(2026, 9, 5));
    const [dateErr, setDateErr] = React.useState<Date | undefined>(new Date(2026, 9, 5));
    const [dateSucc, setDateSucc] = React.useState<Date | undefined>(new Date(2026, 9, 5));

    return (
      <div className="max-w-4xl mx-auto space-y-10 py-6 font-sans">
        {/* Header */}
        <div className="space-y-3 border-b pb-6">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">DatePicker</h1>
            <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-blue-100 text-blue-700">con tests</span>
            <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-slate-100 text-slate-700 border">con stories</span>
          </div>
          <p className="text-sm text-slate-500 max-w-2xl">
            Selector de fecha individual con popover interactivo, formateo de fecha configurable y soporte para Field. Rediseño con mejor UX, animaciones suaves y estados visuales claros.
          </p>
          <div className="text-xs font-mono text-slate-400">src/components/date-picker/DatePicker.tsx</div>
        </div>

        {/* Sección Tamaños y Estados */}
        <div className="space-y-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400 block mb-1">
              TAMAÑOS Y ESTADOS
            </span>
            <p className="text-sm text-slate-500">
              Hacé clic en el ícono de calendario para abrir el selector. También podés hacer clic en el input.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-xs divide-y divide-slate-100">
            <div className="grid grid-cols-[140px_1fr] items-center gap-4 py-4 first:pt-0">
              <span className="text-xs font-semibold text-slate-400">medium (md)</span>
              <div className="max-w-xs">
                <DatePicker size="md" value={dateMd} onChange={setDateMd} />
              </div>
            </div>

            <div className="grid grid-cols-[140px_1fr] items-center gap-4 py-4">
              <span className="text-xs font-semibold text-slate-400">small (sm)</span>
              <div className="max-w-xs">
                <DatePicker size="sm" value={dateSm} onChange={setDateSm} />
              </div>
            </div>

            <div className="grid grid-cols-[140px_1fr] items-center gap-4 py-4">
              <span className="text-xs font-semibold text-slate-400">large (lg)</span>
              <div className="max-w-xs">
                <DatePicker size="lg" value={dateLg} onChange={setDateLg} />
              </div>
            </div>

            <div className="grid grid-cols-[140px_1fr] items-center gap-4 py-4">
              <span className="text-xs font-semibold text-slate-400">con error</span>
              <div className="max-w-xs">
                <DatePicker size="md" value={dateErr} onChange={setDateErr} hasError />
              </div>
            </div>

            <div className="grid grid-cols-[140px_1fr] items-center gap-4 py-4">
              <span className="text-xs font-semibold text-slate-400">disabled</span>
              <div className="max-w-xs">
                <DatePicker size="md" value={dateMd} onChange={setDateMd} disabled />
              </div>
            </div>

            <div className="grid grid-cols-[140px_1fr] items-center gap-4 py-4 last:pb-0">
              <span className="text-xs font-semibold text-slate-400">con éxito</span>
              <div className="max-w-xs">
                <DatePicker size="md" value={dateSucc} onChange={setDateSucc} hasSuccess />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
};
