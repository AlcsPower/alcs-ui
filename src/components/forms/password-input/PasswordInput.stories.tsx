import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { PasswordInput } from './PasswordInput';
import { Label } from '../label';

const meta: Meta<typeof PasswordInput> = {
  title: 'Formularios/PasswordInput',
  component: PasswordInput,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PasswordInput>;

export const Default: Story = {
  args: {
    placeholder: 'Ingresa tu contraseña...',
  },
};

export const ConIndicadorDeFortaleza: Story = {
  args: {
    placeholder: 'Crea una contraseña segura...',
    showStrengthIndicator: true,
    defaultValue: 'Clave123!',
  },
};

export const Showcase: Story = {
  render: () => {
    const [password, setPassword] = React.useState('');

    return (
      <div className="max-w-4xl mx-auto space-y-10 py-6 font-sans">
        {/* Header */}
        <div className="space-y-2 border-b pb-6">
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              PasswordInput — Campo de Contraseña
            </h2>
            <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-blue-100 text-blue-700">
              v1.5.0
            </span>
          </div>
          <p className="text-sm text-slate-500 max-w-2xl">
            Control de entrada para contraseñas con botón de visibilidad accesible (Eye/EyeOff),
            medidor de robustez segmentado en 4 niveles y soporte completo para estados de validación.
          </p>
        </div>

        {/* 01. VARIANTES Y CONFIGURACIONES */}
        <section className="space-y-4">
          <div className="flex items-baseline gap-3">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
              01. VARIANTES Y OPCIONES
            </span>
            <span className="text-sm text-slate-500">Con candado, sin toggle, con valor inicial</span>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="pwd-normal">Estándar con botón de visualización</Label>
                <PasswordInput id="pwd-normal" placeholder="Introduce contraseña..." />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="pwd-lock">Con icono institucional de candado</Label>
                <PasswordInput id="pwd-lock" showLockIcon placeholder="Contraseña institucional..." />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="pwd-no-toggle">Sin alternador de visibilidad (solo máscara)</Label>
                <PasswordInput id="pwd-no-toggle" showToggle={false} defaultValue="secreto123" />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="pwd-disabled">Estado deshabilitado</Label>
                <PasswordInput id="pwd-disabled" disabled defaultValue="ClaveBloqueada" />
              </div>
            </div>
          </div>
        </section>

        {/* 02. ESCALAS DE TAMAÑO */}
        <section className="space-y-4">
          <div className="flex items-baseline gap-3">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
              02. ESCALAS DE TAMAÑO
            </span>
            <span className="text-sm text-slate-500">sm (32px), md (40px, default), lg (48px)</span>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm divide-y divide-slate-100">
            <div className="flex items-center py-3.5 first:pt-0 last:pb-0 gap-6">
              <span className="w-28 text-xs font-semibold text-slate-400 font-mono">sm (32px)</span>
              <div className="flex-1 max-w-md">
                <PasswordInput size="sm" placeholder="Contraseña pequeña..." />
              </div>
            </div>
            <div className="flex items-center py-3.5 first:pt-0 last:pb-0 gap-6">
              <span className="w-28 text-xs font-semibold text-slate-400 font-mono">md (40px)</span>
              <div className="flex-1 max-w-md">
                <PasswordInput size="md" placeholder="Contraseña mediana..." />
              </div>
            </div>
            <div className="flex items-center py-3.5 first:pt-0 last:pb-0 gap-6">
              <span className="w-28 text-xs font-semibold text-slate-400 font-mono">lg (48px)</span>
              <div className="flex-1 max-w-md">
                <PasswordInput size="lg" placeholder="Contraseña destacada..." />
              </div>
            </div>
          </div>
        </section>

        {/* 03. MEDIDOR DE FORTALEZA EN TIEMPO REAL */}
        <section className="space-y-4">
          <div className="flex items-baseline gap-3">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
              03. MEDIDOR DE FORTALEZA EN TIEMPO REAL
            </span>
            <span className="text-sm text-slate-500">Evaluación automática según longitud, mayúsculas, números y símbolos</span>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm max-w-md space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="live-pwd">Escribe para evaluar la seguridad:</Label>
              <PasswordInput
                id="live-pwd"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                showStrengthIndicator
                showLockIcon
                placeholder="Ej: Mific2026$Seguro"
              />
            </div>
          </div>
        </section>
      </div>
    );
  },
};
