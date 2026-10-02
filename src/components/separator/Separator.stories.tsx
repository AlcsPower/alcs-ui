import type { Meta, StoryObj } from '@storybook/react';
import { Separator } from './Separator';

const meta: Meta<typeof Separator> = {
  title: 'Layout/Separator',
  component: Separator,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Orientación del separador'
    },
    decorative: {
      control: 'boolean',
      description: 'Si es puramente decorativo (ignorado por tecnologías de asistencia)'
    }
  }
};

export default meta;
type Story = StoryObj<typeof Separator>;

export const Horizontal: Story = {
  render: () => (
    <div className="max-w-md space-y-4 text-mific-text-primary">
      <div>
        <h4 className="text-sm font-semibold leading-none">Ministerio de Fomento, Industria y Comercio</h4>
        <p className="text-sm text-mific-text-muted mt-1">
          Sistema de Diseño Institucional y Gestión de Trámites.
        </p>
      </div>
      <Separator />
      <div className="flex h-5 items-center space-x-4 text-sm">
        <span>Documentación</span>
        <Separator orientation="vertical" />
        <span>Soporte</span>
        <Separator orientation="vertical" />
        <span>Guía de Estilos</span>
      </div>
    </div>
  )
};

export const Vertical: Story = {
  render: () => (
    <div className="flex h-10 items-center space-x-4 text-sm text-mific-text-primary">
      <span className="font-medium">Inicio</span>
      <Separator orientation="vertical" />
      <span>Trámites</span>
      <Separator orientation="vertical" />
      <span>Reportes</span>
      <Separator orientation="vertical" />
      <span className="text-mific-text-muted">Configuración</span>
    </div>
  )
};

export const DarkMode: Story = {
  render: () => (
    <div className="dark bg-mific-surface-card p-6 rounded-lg max-w-md text-mific-text-primary space-y-4">
      <div>
        <h4 className="text-sm font-semibold">Modo Oscuro</h4>
        <p className="text-sm text-mific-text-muted">El separador utiliza el token semántico border en modo oscuro.</p>
      </div>
      <Separator />
      <div className="text-xs text-mific-text-muted">Sección inferior dividida</div>
    </div>
  )
};
