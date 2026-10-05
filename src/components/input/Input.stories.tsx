import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Input } from './Input';
import { Label } from '../label';
import { Search, Key, Mail, Lock, Eye, EyeOff, CheckCircle2, AlertCircle, Sparkles, ArrowRight } from 'lucide-react';

const meta: Meta<typeof Input> = {
  title: 'Formularios/Input',
  component: Input,
  parameters: {
    layout: 'padded'
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: 'Número de expediente (ej. EXP-2026-001)'
  }
};

export const ConEtiqueta: Story = {
  render: () => (
    <div className="grid w-80 gap-1.5">
      <Label htmlFor="expediente" required>
        Número de Expediente
      </Label>
      <Input id="expediente" placeholder="EXP-2026-001" />
    </div>
  )
};

export const ConError: Story = {
  render: () => (
    <div className="grid w-80 gap-1.5">
      <Label htmlFor="ruc" required>
        RUC del Contribuyente
      </Label>
      <Input id="ruc" hasError defaultValue="J03100000000" />
      <span className="text-xs text-alcspower-destructive">El número RUC ingresado no es válido.</span>
    </div>
  )
};

export const ConExito: Story = {
  render: () => (
    <div className="grid w-80 gap-1.5">
      <Label htmlFor="cedula-valida">
        Cédula de Identidad
      </Label>
      <Input
        id="cedula-valida"
        hasSuccess
        defaultValue="001-120590-0045B"
        rightElement={<CheckCircle2 className="h-4 w-4 text-emerald-600" />}
      />
      <span className="text-xs text-emerald-600 font-medium">Cédula verificada contra el registro central</span>
    </div>
  )
};

export const ConIconoIzquierdo: Story = {
  render: () => (
    <div className="w-80">
      <Input leftElement={<Search className="h-4 w-4" />} placeholder="Buscar por nombre o trámite..." />
    </div>
  )
};

export const ConIconoDerecho: Story = {
  render: () => (
    <div className="w-80">
      <Input type="password" rightElement={<Key className="h-4 w-4" />} placeholder="Contraseña..." />
    </div>
  )
};

export const Deshabilitado: Story = {
  args: {
    disabled: true,
    defaultValue: 'Campo de solo lectura institucional'
  }
};

/**
 * Story completa con el nuevo diseño y especificación visual basada en el diseño de tokens 2026.
 */
export const ShowcaseRedesign: Story = {
  render: () => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const [touched, setTouched] = React.useState(false);

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const showError = touched && email.length > 0 && !isValidEmail;
    const showSuccess = touched && isValidEmail;

    return (
      <div className="max-w-4xl mx-auto space-y-12 py-6 font-sans">
        {/* Header */}
        <div className="space-y-3 border-b pb-6">
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Input Component — Redesign</h2>
            <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-blue-100 text-blue-700">v0.7.0</span>
            <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-slate-100 text-slate-600 border">Design System</span>
          </div>
          <p className="text-sm text-slate-500 max-w-2xl">
            Rediseño completo del campo de entrada con bordes nítidos de 1.5px, radio armonizado (7px, 10px, 12px), sombras difusas, estado focus-ring con resplandor y soporte integrado para ranuras de íconos interactivos.
          </p>
        </div>

        {/* 01. TAMAÑOS */}
        <section className="space-y-4">
          <div className="flex items-baseline gap-3">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">01. TAMAÑOS</span>
            <span className="text-sm text-slate-500">sm (32px), md (40px, default), lg (48px)</span>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm divide-y divide-slate-100">
            <div className="flex items-center py-3.5 first:pt-0 last:pb-0 gap-6">
              <span className="w-32 text-xs font-semibold text-slate-400 font-mono">sm (32px)</span>
              <div className="flex-1 max-w-md">
                <Input size="sm" placeholder="Input pequeño — 32px de alto" />
              </div>
            </div>
            <div className="flex items-center py-3.5 first:pt-0 last:pb-0 gap-6">
              <span className="w-32 text-xs font-semibold text-slate-400 font-mono">md (40px)</span>
              <div className="flex-1 max-w-md">
                <Input size="md" placeholder="Input mediano — 40px (predeterminado)" />
              </div>
            </div>
            <div className="flex items-center py-3.5 first:pt-0 last:pb-0 gap-6">
              <span className="w-32 text-xs font-semibold text-slate-400 font-mono">lg (48px)</span>
              <div className="flex-1 max-w-md">
                <Input size="lg" placeholder="Input grande — 48px de alto" />
              </div>
            </div>
          </div>
        </section>

        {/* 02. ESTADOS */}
        <section className="space-y-4">
          <div className="flex items-baseline gap-3">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">02. ESTADOS</span>
            <span className="text-sm text-slate-500">Normal, con valor, deshabilitado, solo lectura, error y éxito</span>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm divide-y divide-slate-100">
            <div className="flex items-center py-3.5 first:pt-0 last:pb-0 gap-6">
              <span className="w-32 text-xs font-semibold text-slate-400 font-mono">Default</span>
              <div className="flex-1 max-w-md">
                <Input placeholder="Escribe algo..." />
              </div>
            </div>
            <div className="flex items-center py-3.5 first:pt-0 last:pb-0 gap-6">
              <span className="w-32 text-xs font-semibold text-slate-400 font-mono">Con valor</span>
              <div className="flex-1 max-w-md">
                <Input defaultValue="Carlos Martínez" />
              </div>
            </div>
            <div className="flex items-center py-3.5 first:pt-0 last:pb-0 gap-6">
              <span className="w-32 text-xs font-semibold text-slate-400 font-mono">Disabled</span>
              <div className="flex-1 max-w-md">
                <Input disabled defaultValue="Campo bloqueado no editable" />
              </div>
            </div>
            <div className="flex items-center py-3.5 first:pt-0 last:pb-0 gap-6">
              <span className="w-32 text-xs font-semibold text-slate-400 font-mono">Read-only</span>
              <div className="flex-1 max-w-md">
                <Input readOnly defaultValue="ID-98234-CONF" />
              </div>
            </div>
            <div className="flex items-center py-3.5 first:pt-0 last:pb-0 gap-6">
              <span className="w-32 text-xs font-semibold text-slate-400 font-mono">Error</span>
              <div className="flex-1 max-w-md space-y-1">
                <Input
                  hasError
                  defaultValue="usuario_invalido@"
                  rightElement={<AlertCircle className="h-4 w-4 text-red-600" />}
                />
                <span className="text-xs text-red-600 font-medium">Ingresa un correo electrónico válido</span>
              </div>
            </div>
            <div className="flex items-center py-3.5 first:pt-0 last:pb-0 gap-6">
              <span className="w-32 text-xs font-semibold text-slate-400 font-mono">Success</span>
              <div className="flex-1 max-w-md space-y-1">
                <Input
                  hasSuccess
                  defaultValue="alcides.altamirano@mific.gob.ni"
                  rightElement={<CheckCircle2 className="h-4 w-4 text-emerald-600" />}
                />
                <span className="text-xs text-emerald-600 font-medium">Correo verificado y disponible</span>
              </div>
            </div>
          </div>
        </section>

        {/* 03. SLOTS / ELEMENTOS */}
        <section className="space-y-4">
          <div className="flex items-baseline gap-3">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">03. SLOTS & ÍCONOS</span>
            <span className="text-sm text-slate-500">leftElement, rightElement y botones interactivos dentro del input</span>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm divide-y divide-slate-100">
            <div className="flex items-center py-3.5 first:pt-0 last:pb-0 gap-6">
              <span className="w-32 text-xs font-semibold text-slate-400 font-mono">Izquierda</span>
              <div className="flex-1 max-w-md">
                <Input
                  leftElement={<Search className="h-4 w-4" />}
                  placeholder="Buscar expedientes, personas..."
                />
              </div>
            </div>
            <div className="flex items-center py-3.5 first:pt-0 last:pb-0 gap-6">
              <span className="w-32 text-xs font-semibold text-slate-400 font-mono">Contraseña</span>
              <div className="flex-1 max-w-md">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  leftElement={<Lock className="h-4 w-4" />}
                  rightElement={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
                      title={showPassword ? 'Ocultar' : 'Mostrar'}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  }
                  placeholder="Introduce tu contraseña..."
                />
              </div>
            </div>
            <div className="flex items-center py-3.5 first:pt-0 last:pb-0 gap-6">
              <span className="w-32 text-xs font-semibold text-slate-400 font-mono">Ambos lados</span>
              <div className="flex-1 max-w-md">
                <Input
                  leftElement={<Mail className="h-4 w-4" />}
                  rightElement={<span className="text-xs font-semibold text-slate-400">.gob.ni</span>}
                  placeholder="usuario institucional"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 04. VALIDACIÓN EN VIVO */}
        <section className="space-y-4">
          <div className="flex items-baseline gap-3">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">04. DEMO INTERACTIVA</span>
            <span className="text-sm text-slate-500">Prueba la validación reactiva en tiempo real</span>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm max-w-xl space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="live-email" required>
                Correo Institucional
              </Label>
              <Input
                id="live-email"
                type="email"
                value={email}
                hasError={showError}
                hasSuccess={showSuccess}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setTouched(true);
                }}
                leftElement={<Mail className="h-4 w-4" />}
                rightElement={
                  showSuccess ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 animate-in fade-in zoom-in" />
                  ) : showError ? (
                    <AlertCircle className="h-4 w-4 text-red-600 animate-in fade-in zoom-in" />
                  ) : null
                }
                placeholder="ejemplo@mific.gob.ni"
              />
              {showError && (
                <p className="text-xs text-red-600 font-medium animate-in fade-in slide-in-from-top-1">
                  Introduce una dirección de correo válida (ej. usuario@dominio.com).
                </p>
              )}
              {showSuccess && (
                <p className="text-xs text-emerald-600 font-medium animate-in fade-in slide-in-from-top-1">
                  Dirección con sintaxis válida.
                </p>
              )}
              {!touched && (
                <p className="text-xs text-slate-400">Escribe para disparar la validación visual automática.</p>
              )}
            </div>
          </div>
        </section>

        {/* 05. ANTES VS DESPUÉS */}
        <section className="space-y-4">
          <div className="flex items-baseline gap-3">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">05. ANTES VS DESPUÉS</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">❌ Antes (Genérico)</span>
              <div className="space-y-3 opacity-75">
                <input
                  type="text"
                  disabled
                  value="Borde genérico 1px gris"
                  className="w-full h-10 px-3 text-sm bg-white border border-gray-300 rounded shadow-none"
                />
                <input
                  type="text"
                  disabled
                  value="Focus sin glow personalizado"
                  className="w-full h-10 px-3 text-sm bg-white border border-gray-300 rounded"
                />
              </div>
            </div>

            <div className="rounded-2xl border border-blue-200 bg-blue-50/30 p-6 space-y-3 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5" /> ✨ Ahora (v0.7.0 Moderno)
              </span>
              <div className="space-y-3">
                <Input defaultValue="Borde nítido 1.5px con esquinas 10px" />
                <Input
                  hasSuccess
                  defaultValue="Glow adaptativo en foco y ranuras nativas"
                  rightElement={<CheckCircle2 className="h-4 w-4 text-emerald-600" />}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
};
