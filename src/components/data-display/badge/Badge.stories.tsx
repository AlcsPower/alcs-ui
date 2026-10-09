import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Controles/Badge',
  component: Badge,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    variant: 'default',
    children: 'Institucional'
  }
};

export const Exitoso: Story = {
  args: {
    variant: 'success',
    children: 'Aprobado'
  }
};

export const Advertencia: Story = {
  args: {
    variant: 'warning',
    children: 'En Revisión'
  }
};

export const Peligro: Story = {
  args: {
    variant: 'danger',
    children: 'Rechazado'
  }
};

export const Informacion: Story = {
  args: {
    variant: 'info',
    children: 'Nuevo Trámite'
  }
};

export const TodasLasVariantes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="success">Aprobado</Badge>
      <Badge variant="warning">Pendiente</Badge>
      <Badge variant="danger">Rechazado</Badge>
      <Badge variant="info">Información</Badge>
      <Badge variant="outline">Borrador</Badge>
    </div>
  )
};
