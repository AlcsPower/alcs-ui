import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { OTPInput } from './OTPInput';
import { Label } from '../label';

const meta: Meta<typeof OTPInput> = {
  title: 'Formularios/OTPInput',
  component: OTPInput,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof OTPInput>;

export const Default: Story = {
  args: {
    length: 6,
    separator: '-',
  },
};

export const CuatroDigitos: Story = {
  args: {
    length: 4,
  },
};

export const EnmascaradoPIN: Story = {
  args: {
    length: 4,
    mask: true,
  },
};

export const Showcase: Story = {
  render: () => {
    const [code, setCode] = React.useState('');
    const [completedCode, setCompletedCode] = React.useState('');

    return (
      <div className="max-w-4xl mx-auto space-y-10 py-6 font-sans">
        {/* Header */}
        <div className="space-y-2 border-b pb-6">
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              OTPInput — Código de Verificación (2FA)
            </h2>
            <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-blue-100 text-blue-700">
              v1.5.0
            </span>
          </div>
          <p className="text-sm text-slate-500 max-w-2xl">
            Entrada segmentada para autenticación de dos factores (2FA / OTP), con soporte de pegado
            directo de SMS/email, navegación por teclado inteligente y máscara para PIN.
          </p>
        </div>

        {/* 01. VARIANTES Y CONFIGURACIONES */}
        <section className="space-y-4">
          <div className="flex items-baseline gap-3">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
              01. VARIANTES Y MODOS
            </span>
            <span className="text-sm text-slate-500">6 dígitos con guión, 4 dígitos PIN, enmascarado y error</span>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
            <div className="space-y-2">
              <Label>6 dígitos con separador institucional</Label>
              <OTPInput length={6} separator="-" />
            </div>

            <div className="space-y-2">
              <Label>4 dígitos tipo PIN numérico</Label>
              <OTPInput length={4} />
            </div>

            <div className="space-y-2">
              <Label>Enmascarado tipo contraseña (mask=true)</Label>
              <OTPInput length={4} mask defaultValue="12" />
            </div>

            <div className="space-y-2">
              <Label>Estado de error de validación (hasError=true)</Label>
              <OTPInput length={4} hasError defaultValue="9999" />
              <p className="text-xs text-rose-600 font-medium">El código ingresado ha caducado o es incorrecto.</p>
            </div>
          </div>
        </section>

        {/* 02. ESCALAS DE TAMAÑO */}
        <section className="space-y-4">
          <div className="flex items-baseline gap-3">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
              02. ESCALAS DE TAMAÑO
            </span>
            <span className="text-sm text-slate-500">sm, md (default), lg</span>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-6">
              <span className="w-20 text-xs font-semibold text-slate-400 font-mono">sm</span>
              <OTPInput size="sm" length={6} separator="·" />
            </div>
            <div className="flex items-center gap-6">
              <span className="w-20 text-xs font-semibold text-slate-400 font-mono">md</span>
              <OTPInput size="md" length={6} separator="·" />
            </div>
            <div className="flex items-center gap-6">
              <span className="w-20 text-xs font-semibold text-slate-400 font-mono">lg</span>
              <OTPInput size="lg" length={6} separator="·" />
            </div>
          </div>
        </section>

        {/* 03. DEMO INTERACTIVA CON PORTAPAPELES */}
        <section className="space-y-4">
          <div className="flex items-baseline gap-3">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
              03. DEMO INTERACTIVA EN TIEMPO REAL
            </span>
            <span className="text-sm text-slate-500">
              Prueba pegar un código como 482910 o escribir dígito por dígito
            </span>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm max-w-lg space-y-4">
            <div className="space-y-2">
              <Label>Código enviado al +505 8888-0000:</Label>
              <OTPInput
                length={6}
                separator="-"
                value={code}
                onChange={setCode}
                onComplete={(res) => setCompletedCode(res)}
                autoFocus
              />
            </div>

            <div className="p-3 bg-slate-50 rounded-lg text-xs space-y-1">
              <p className="text-slate-600">
                Valor en tiempo real: <span className="font-mono font-bold text-slate-900">{code || '(vacío)'}</span>
              </p>
              {completedCode && (
                <p className="text-emerald-700 font-semibold animate-in fade-in">
                  ✓ Código verificado y completado: {completedCode}
                </p>
              )}
            </div>
          </div>
        </section>
      </div>
    );
  },
};
