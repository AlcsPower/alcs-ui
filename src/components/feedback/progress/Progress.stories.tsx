import type { Meta, StoryObj } from '@storybook/react';
import { Progress } from './Progress';

const meta: Meta<typeof Progress> = {
  title: 'Feedback/Progress',
  component: Progress,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Valor del progreso entre 0 y 100'
    },
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'destructive', 'info'],
      description: 'Variante cromática del indicador de progreso'
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Grosor de la barra de progreso'
    },
    showLabel: {
      control: 'boolean',
      description: 'Muestra la etiqueta con el porcentaje a la derecha'
    }
  }
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Default: Story = {
  args: {
    value: 60,
    'aria-label': 'Progreso de carga'
  },
  render: (args) => (
    <div className="w-[350px]">
      <Progress {...args} />
    </div>
  )
};

export const Variants: Story = {
  render: () => (
    <div className="w-[350px] space-y-4">
      <div>
        <span className="text-xs font-medium text-alcspower-muted-foreground mb-1 block">Default</span>
        <Progress value={65} variant="default" aria-label="Progreso por defecto" />
      </div>
      <div>
        <span className="text-xs font-medium text-alcspower-muted-foreground mb-1 block">Success</span>
        <Progress value={100} variant="success" aria-label="Progreso completado" />
      </div>
      <div>
        <span className="text-xs font-medium text-alcspower-muted-foreground mb-1 block">Warning</span>
        <Progress value={45} variant="warning" aria-label="Progreso con advertencia" />
      </div>
      <div>
        <span className="text-xs font-medium text-alcspower-muted-foreground mb-1 block">Destructive</span>
        <Progress value={25} variant="destructive" aria-label="Progreso crítico" />
      </div>
      <div>
        <span className="text-xs font-medium text-alcspower-muted-foreground mb-1 block">Info</span>
        <Progress value={75} variant="info" aria-label="Progreso informativo" />
      </div>
    </div>
  )
};

export const Sizes: Story = {
  render: () => (
    <div className="w-[350px] space-y-4">
      <div>
        <span className="text-xs font-medium text-alcspower-muted-foreground mb-1 block">Pequeño (sm - 6px)</span>
        <Progress value={40} size="sm" aria-label="Progreso tamaño pequeño" />
      </div>
      <div>
        <span className="text-xs font-medium text-alcspower-muted-foreground mb-1 block">Mediano (md - 10px)</span>
        <Progress value={60} size="md" aria-label="Progreso tamaño mediano" />
      </div>
      <div>
        <span className="text-xs font-medium text-alcspower-muted-foreground mb-1 block">Grande (lg - 16px)</span>
        <Progress value={80} size="lg" aria-label="Progreso tamaño grande" />
      </div>
    </div>
  )
};

export const WithLabel: Story = {
  render: () => (
    <div className="w-[350px] space-y-3">
      <Progress value={45} showLabel aria-label="Progreso con porcentaje" />
      <Progress value={80} variant="success" showLabel aria-label="Progreso con porcentaje completando" />
      <Progress value={100} variant="success" showLabel aria-label="Progreso 100%" />
    </div>
  )
};

export const Indeterminate: Story = {
  render: () => (
    <div className="w-[350px] space-y-2">
      <span className="text-xs text-alcspower-muted-foreground block">Cargando recurso...</span>
      <Progress aria-label="Cargando recurso indefinido" />
    </div>
  )
};

export const CustomFormat: Story = {
  render: () => (
    <div className="w-[350px] space-y-3">
      <Progress
        value={60}
        showLabel
        formatLabel={(val) => `${val / 10}/10`}
        aria-label="Paso 6 de 10"
      />
      <Progress
        value={30}
        showLabel
        formatLabel={() => '3 de 5 archivos'}
        aria-label="Archivos procesados"
      />
    </div>
  )
};

export const DarkMode: Story = {
  render: () => (
    <div className="dark bg-alcspower-surface-card p-6 rounded-lg w-[400px] space-y-4">
      <h4 className="text-sm font-semibold text-alcspower-foreground">Modo Oscuro</h4>
      <Progress value={65} showLabel aria-label="Progreso en modo oscuro" />
      <Progress value={90} variant="success" showLabel aria-label="Progreso exitoso en modo oscuro" />
      <Progress value={30} variant="warning" showLabel aria-label="Progreso advertencia en modo oscuro" />
      <Progress value={15} variant="destructive" showLabel aria-label="Progreso destructivo en modo oscuro" />
      <Progress aria-label="Progreso indeterminado en modo oscuro" />
    </div>
  )
};
