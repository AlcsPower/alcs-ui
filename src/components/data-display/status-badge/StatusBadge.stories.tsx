import type { Meta, StoryObj } from '@storybook/react';
import { StatusBadge } from './StatusBadge';

const meta: Meta<typeof StatusBadge> = {
  title: 'Controles/StatusBadge',
  component: StatusBadge,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    status: {
      control: 'select',
      options: ['success', 'warning', 'error', 'info', 'neutral'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
    },
    dot: {
      control: 'boolean',
    },
    pulse: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof StatusBadge>;

export const Default: Story = {
  args: {
    children: 'Neutral',
    status: 'neutral',
  },
};

export const AllStatuses: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <StatusBadge status="neutral">Neutral</StatusBadge>
      <StatusBadge status="success">Activo / Éxito</StatusBadge>
      <StatusBadge status="warning">Pendiente / Alerta</StatusBadge>
      <StatusBadge status="error">Error / Fallido</StatusBadge>
      <StatusBadge status="info">Información</StatusBadge>
    </div>
  ),
};

export const WithDot: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <StatusBadge status="neutral" dot>Neutral</StatusBadge>
      <StatusBadge status="success" dot>En línea</StatusBadge>
      <StatusBadge status="warning" dot>En proceso</StatusBadge>
      <StatusBadge status="error" dot>Desconectado</StatusBadge>
      <StatusBadge status="info" dot>Actualizando</StatusBadge>
    </div>
  ),
};

export const WithPulse: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <StatusBadge status="success" dot pulse>En vivo</StatusBadge>
      <StatusBadge status="warning" dot pulse>Atención requerida</StatusBadge>
      <StatusBadge status="error" dot pulse>Incidente crítico</StatusBadge>
      <StatusBadge status="info" dot pulse>Sincronizando</StatusBadge>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <StatusBadge size="sm" dot>Pequeño (sm)</StatusBadge>
      <StatusBadge size="md" dot>Mediano (md)</StatusBadge>
    </div>
  ),
};

export const DarkMode: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3 rounded-alcspower-md bg-alcspower-foreground p-6 text-alcspower-background">
      <StatusBadge status="neutral" dot>Neutral</StatusBadge>
      <StatusBadge status="success" dot pulse>Activo</StatusBadge>
      <StatusBadge status="warning" dot>Revisión</StatusBadge>
      <StatusBadge status="error" dot>Bloqueado</StatusBadge>
      <StatusBadge status="info" dot>Info</StatusBadge>
    </div>
  ),
};
