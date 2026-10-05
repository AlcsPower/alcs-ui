import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { Mail, Calendar, Trash2, ArrowRight, Download, RefreshCw } from 'lucide-react';

const meta: Meta<typeof Button> = {
  title: 'Formularios/Button',
  component: Button,
  parameters: {
    layout: 'padded'
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'destructive', 'danger', 'link']
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'icon', 'icon-sm', 'icon-lg']
    },
    isLoading: { control: 'boolean' },
    disabled: { control: 'boolean' }
  }
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primario: Story = {
  args: {
    variant: 'primary',
    children: 'Guardar Trámite'
  }
};

export const Secundario: Story = {
  args: {
    variant: 'secondary',
    children: 'Cancelar'
  }
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Descargar Constancia'
  }
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Eliminar Registro'
  }
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Eliminar Registro (Alias)'
  }
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ver más'
  }
};

export const LinkVariant: Story = {
  args: {
    variant: 'link',
    children: 'Consultar portal de trámites'
  }
};

export const ConIcono: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="primary">
        <Mail className="h-4 w-4" /> Enviar Notificación
      </Button>
      <Button variant="secondary">
        <Download className="h-4 w-4" /> Exportar Informe
      </Button>
      <Button variant="outline">
        <Calendar className="h-4 w-4" /> Agendar Cita
      </Button>
      <Button variant="destructive">
        <Trash2 className="h-4 w-4" /> Eliminar Archivo
      </Button>
    </div>
  )
};

export const BotonesDeIcono: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Button variant="primary" size="icon-sm" title="Icono sm">
        <Calendar className="h-3.5 w-3.5" />
      </Button>
      <Button variant="primary" size="icon" title="Icono md">
        <Calendar className="h-4 w-4" />
      </Button>
      <Button variant="primary" size="icon-lg" title="Icono lg">
        <Calendar className="h-5 w-5" />
      </Button>
      <Button variant="secondary" size="icon" title="Secundario">
        <Download className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon" title="Outline">
        <RefreshCw className="h-4 w-4" />
      </Button>
      <Button variant="destructive" size="icon" title="Destructive">
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  )
};

export const Cargando: Story = {
  args: {
    variant: 'primary',
    isLoading: true,
    loadingText: 'Procesando trámite...'
  }
};

export const Deshabilitado: Story = {
  args: {
    variant: 'primary',
    disabled: true,
    children: 'Acción No Permitida'
  }
};

export const MatrizDeEstados: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-6 border border-alcspower-border rounded-lg bg-alcspower-surface max-w-2xl">
      <div className="flex items-center gap-3">
        <Button variant="primary">Normal</Button>
        <Button variant="primary" disabled>Disabled</Button>
        <Button variant="primary" isLoading loadingText="Cargando">Loading</Button>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="secondary">Normal</Button>
        <Button variant="secondary" disabled>Disabled</Button>
        <Button variant="secondary" isLoading loadingText="Cargando">Loading</Button>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="outline">Normal</Button>
        <Button variant="outline" disabled>Disabled</Button>
        <Button variant="outline" isLoading loadingText="Cargando">Loading</Button>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="destructive">Normal</Button>
        <Button variant="destructive" disabled>Disabled</Button>
        <Button variant="destructive" isLoading loadingText="Cargando">Loading</Button>
      </div>
    </div>
  )
};

/**
 * Showcase Interactivo Completo — Basado en la guía de diseño de alta fidelidad.
 * Demuestra variantes, jerarquía de tamaños, microinteracciones táctiles,
 * simulación de operaciones asíncronas y accesibilidad.
 */
export const ShowcaseRedesign: Story = {
  render: () => {
    const [loadingStates, setLoadingStates] = React.useState<Record<string, boolean>>({});
    const [feedback, setFeedback] = React.useState<string>('Esperando interacción...');

    const handleSimulate = (key: string, label: string) => {
      setLoadingStates((prev) => ({ ...prev, [key]: true }));
      setFeedback(`⏳ Procesando "${label}"...`);

      setTimeout(() => {
        setLoadingStates((prev) => ({ ...prev, [key]: false }));
        setFeedback(`✅ "${label}" completado con éxito.`);

        setTimeout(() => {
          setFeedback('Esperando interacción...');
        }, 2500);
      }, 1600);
    };

    return (
      <div className="max-w-4xl mx-auto space-y-10 py-6 text-alcspower-foreground">
        {/* Encabezado */}
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <h1 className="text-3xl font-extrabold tracking-tight">Button System</h1>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200">
              con tests vitest
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-alcspower-surface-muted text-alcspower-muted-foreground border border-alcspower-border">
              WCAG 2.1 AA
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-alcspower-surface-muted text-alcspower-muted-foreground border border-alcspower-border">
              v0.7.0
            </span>
          </div>
          <p className="text-sm text-alcspower-muted-foreground max-w-2xl">
            Botón interactivo con 6 variantes principales, 3 tamaños proporcionales, botones de ícono, soporte polimórfico asChild y microinteracciones fluidas.
          </p>
          <div className="text-xs font-mono text-alcspower-muted-foreground mt-2">
            src/components/button/Button.tsx
          </div>
        </div>

        {/* Sección: Variantes */}
        <section className="space-y-4">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-alcspower-muted-foreground">
              Variantes Visuales
            </h2>
            <p className="text-sm text-alcspower-muted-foreground mt-1">
              Jerarquía visual clara con feedback háptico en hover y active.
            </p>
          </div>

          <div className="bg-alcspower-surface rounded-xl border border-alcspower-border p-6 shadow-sm divide-y divide-alcspower-border">
            <div className="py-3 flex items-center gap-4 flex-wrap first:pt-0">
              <span className="w-28 text-xs font-medium text-alcspower-muted-foreground">primary</span>
              <Button variant="primary">Acción</Button>
              <Button variant="primary" disabled>Acción</Button>
            </div>
            <div className="py-3 flex items-center gap-4 flex-wrap">
              <span className="w-28 text-xs font-medium text-alcspower-muted-foreground">secondary</span>
              <Button variant="secondary">Acción</Button>
              <Button variant="secondary" disabled>Acción</Button>
            </div>
            <div className="py-3 flex items-center gap-4 flex-wrap">
              <span className="w-28 text-xs font-medium text-alcspower-muted-foreground">outline</span>
              <Button variant="outline">Acción</Button>
              <Button variant="outline" disabled>Acción</Button>
            </div>
            <div className="py-3 flex items-center gap-4 flex-wrap">
              <span className="w-28 text-xs font-medium text-alcspower-muted-foreground">ghost</span>
              <Button variant="ghost">Acción</Button>
              <Button variant="ghost" disabled>Acción</Button>
            </div>
            <div className="py-3 flex items-center gap-4 flex-wrap">
              <span className="w-28 text-xs font-medium text-alcspower-muted-foreground">destructive</span>
              <Button variant="destructive">Acción</Button>
              <Button variant="destructive" disabled>Acción</Button>
            </div>
            <div className="py-3 flex items-center gap-4 flex-wrap">
              <span className="w-28 text-xs font-medium text-alcspower-muted-foreground">danger (alias)</span>
              <Button variant="danger">Acción</Button>
              <Button variant="danger" disabled>Acción</Button>
            </div>
            <div className="py-3 flex items-center gap-4 flex-wrap last:pb-0">
              <span className="w-28 text-xs font-medium text-alcspower-muted-foreground">link</span>
              <Button variant="link">Acción como enlace</Button>
            </div>
          </div>
        </section>

        {/* Sección: Tamaños */}
        <section className="space-y-4">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-alcspower-muted-foreground">
              Escala de Tamaños
            </h2>
            <p className="text-sm text-alcspower-muted-foreground mt-1">
              Escalas simétricas compatibles con Input, Select y DatePicker.
            </p>
          </div>

          <div className="bg-alcspower-surface rounded-xl border border-alcspower-border p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="w-24 text-xs font-mono text-alcspower-muted-foreground">sm · 32px</span>
              <Button variant="primary" size="sm">Acción</Button>
              <Button variant="secondary" size="sm">Acción</Button>
              <Button variant="outline" size="sm">Acción</Button>
              <Button variant="primary" size="icon-sm" title="Icon sm">
                <Calendar className="h-3.5 w-3.5" />
              </Button>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="w-24 text-xs font-mono text-alcspower-muted-foreground">md · 40px</span>
              <Button variant="primary" size="md">Acción</Button>
              <Button variant="secondary" size="md">Acción</Button>
              <Button variant="outline" size="md">Acción</Button>
              <Button variant="primary" size="icon" title="Icon md">
                <Calendar className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="w-24 text-xs font-mono text-alcspower-muted-foreground">lg · 48px</span>
              <Button variant="primary" size="lg">Acción</Button>
              <Button variant="secondary" size="lg">Acción</Button>
              <Button variant="outline" size="lg">Acción</Button>
              <Button variant="primary" size="icon-lg" title="Icon lg">
                <Calendar className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Sección: Estados */}
        <section className="space-y-4">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-alcspower-muted-foreground">
              Estados Interactivos
            </h2>
            <p className="text-sm text-alcspower-muted-foreground mt-1">
              Indicador de carga con spinner contrastado, deshabilitado accesible y asChild.
            </p>
          </div>

          <div className="bg-alcspower-surface rounded-xl border border-alcspower-border p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="w-28 text-xs font-medium text-alcspower-muted-foreground">isLoading</span>
              <Button variant="primary" isLoading />
              <Button variant="secondary" isLoading />
              <Button variant="outline" isLoading />
              <Button variant="destructive" isLoading />
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="w-28 text-xs font-medium text-alcspower-muted-foreground">isLoading + texto</span>
              <Button variant="primary" isLoading loadingText="Guardando cambios...">Guardar</Button>
              <Button variant="secondary" isLoading loadingText="Cargando constancia...">Descargar</Button>
              <Button variant="outline" size="sm" isLoading loadingText="Actualizando...">Refrescar</Button>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="w-28 text-xs font-medium text-alcspower-muted-foreground">asChild</span>
              <Button asChild variant="primary" size="md">
                <a href="#demo" className="inline-flex items-center gap-2">
                  Enlace estilizado como Botón <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Sección: Demo Interactiva en Vivo */}
        <section className="space-y-4">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-alcspower-muted-foreground">
              Demo Interactiva en Vivo
            </h2>
            <p className="text-sm text-alcspower-muted-foreground mt-1">
              Hacé clic en los botones para probar el comportamiento de carga en tiempo real.
            </p>
          </div>

          <div className="bg-alcspower-surface rounded-xl border border-alcspower-border p-8 text-center space-y-6 shadow-sm">
            <div className="flex flex-wrap justify-center gap-3">
              <Button
                variant="primary"
                isLoading={loadingStates.save}
                onClick={() => handleSimulate('save', 'Guardar expediente')}
              >
                Guardar expediente
              </Button>
              <Button
                variant="secondary"
                isLoading={loadingStates.cancel}
                onClick={() => handleSimulate('cancel', 'Cancelar proceso')}
              >
                Cancelar proceso
              </Button>
              <Button
                variant="outline"
                isLoading={loadingStates.export}
                onClick={() => handleSimulate('export', 'Exportar constancia')}
              >
                <Download className="h-4 w-4" /> Exportar
              </Button>
              <Button
                variant="destructive"
                isLoading={loadingStates.delete}
                onClick={() => handleSimulate('delete', 'Eliminar registro')}
              >
                <Trash2 className="h-4 w-4" /> Eliminar
              </Button>
            </div>

            <div className="text-sm font-medium text-alcspower-primary transition-all">
              {feedback}
            </div>
          </div>
        </section>
      </div>
    );
  }
};
