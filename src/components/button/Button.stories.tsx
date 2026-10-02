import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { Mail } from 'lucide-react';

const meta: Meta<typeof Button> = {
  title: 'Formularios/Button',
  component: Button,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'danger', 'link']
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'icon']
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

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Eliminar Registro'
  }
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ver más'
  }
};

export const ConIcono: Story = {
  render: () => (
    <Button variant="primary">
      <Mail className="h-4 w-4" /> Enviar Notificación
    </Button>
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
    <div className="flex flex-col gap-4 p-4 border rounded-lg bg-mific-surface">
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
        <Button variant="danger">Normal</Button>
        <Button variant="danger" disabled>Disabled</Button>
      </div>
    </div>
  )
};
