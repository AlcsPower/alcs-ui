import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { OTPInput } from './OTPInput';
import { Label } from '../label';
import { Button } from '../button';

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
    separator: 'dash',
    defaultValue: '123',
    statusText: 'Ingresá el código de 6 dígitos',
  },
};

export const CuatroDigitosPIN: Story = {
  args: {
    length: 4,
    defaultValue: '92',
    statusText: 'Ingresá tu PIN de 4 dígitos',
  },
};

export const EnmascaradoPIN: Story = {
  args: {
    length: 4,
    mask: true,
    defaultValue: '123',
    statusText: 'Los caracteres están enmascarados',
  },
};

export const ErrorValidacion: Story = {
  args: {
    length: 4,
    defaultValue: '9999',
    state: 'error',
    statusText: 'Código caducado.',
  },
};

export const CompletadoExito: Story = {
  args: {
    length: 4,
    defaultValue: '4821',
    state: 'success',
    statusText: 'Código verificado',
  },
};

export const Escalas: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="space-y-1.5">
        <span className="text-xs font-mono text-gray-500">sm · casillas 36×42px</span>
        <OTPInput size="sm" length={6} separator="dash" defaultValue="123" />
      </div>
      <div className="space-y-1.5">
        <span className="text-xs font-mono text-gray-500">md · casillas 48×56px</span>
        <OTPInput size="md" length={6} separator="dash" defaultValue="123" />
      </div>
      <div className="space-y-1.5">
        <span className="text-xs font-mono text-gray-500">lg · casillas 60×68px</span>
        <OTPInput size="lg" length={6} separator="dash" defaultValue="123" />
      </div>
    </div>
  ),
};

export const Autenticacion2FA: Story = {
  render: () => {
    const [code, setCode] = React.useState('');
    const [status, setStatus] = React.useState<'normal' | 'error' | 'success'>('normal');
    const [statusMsg, setStatusMsg] = React.useState('Esperando código...');
    const [resendTimer, setResendTimer] = React.useState(30);

    const handleComplete = (val: string) => {
      if (val === '482910') {
        setStatus('success');
        setStatusMsg('Código verificado correctamente');
      } else {
        setStatus('error');
        setStatusMsg('Código incorrecto. Intentá con 482910 para probar éxito.');
      }
    };

    return (
      <div className="max-w-md p-6 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl shadow-sm space-y-5 font-sans">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <svg className="w-5 h-5 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900 dark:text-white">Autenticación de Dos Pasos</h3>
            <p className="text-xs text-gray-500">Código SMS enviado a <strong>+505 8888-9999</strong></p>
          </div>
        </div>

        <div className="space-y-2">
          <OTPInput
            length={6}
            separator="dash"
            value={code}
            onChange={(v) => {
              setCode(v);
              if (status !== 'normal') setStatus('normal');
            }}
            onComplete={handleComplete}
            state={status}
            statusText={statusMsg}
            autoFocus
          />
        </div>

        <div className="flex items-center justify-between gap-4 pt-1">
          <div className="flex flex-col items-start">
            <button
              type="button"
              disabled={resendTimer > 0}
              onClick={() => {
                setCode('');
                setStatus('normal');
                setStatusMsg('Código reenviado...');
                setResendTimer(30);
              }}
              className="p-0 m-0 border-0 bg-transparent text-[13px] font-semibold text-[#6366f1] dark:text-indigo-400 hover:text-[#4f46e5] dark:hover:text-indigo-300 hover:underline cursor-pointer disabled:text-[#6366f1] dark:disabled:text-indigo-400 disabled:no-underline disabled:cursor-not-allowed transition-colors text-left"
            >
              Reenviar código
            </button>
            <div className="text-[12px] text-gray-500 dark:text-gray-400 mt-0.5 font-sans">
              {resendTimer > 0 ? `Disponible en ${resendTimer}s` : 'Listo para reenviar'}
            </div>
          </div>

          <button
            type="button"
            disabled={code.length < 6}
            onClick={() => handleComplete(code)}
            className="px-5 py-2.5 rounded-[10px] text-sm font-semibold text-white transition-all cursor-pointer bg-[#6366f1] hover:bg-[#4f46e5] hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(99,102,241,0.3)] disabled:bg-[#9ca3ff] dark:disabled:bg-indigo-400/60 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
          >
            Verificar
          </button>
        </div>
      </div>
    );
  },
};
