import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from './Switch';
import { Label } from '../label';

const meta: Meta<typeof Switch> = {
  title: 'Controles/Switch',
  component: Switch,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: {
    'aria-label': 'Interruptor simple'
  }
};

export const ConEtiqueta: Story = {
  render: () => (
    <div className="flex items-center space-x-3">
      <Switch id="notif" />
      <Label htmlFor="notif" className="cursor-pointer">
        Recibir notificaciones por correo electrónico
      </Label>
    </div>
  )
};

export const ActivadoPorDefecto: Story = {
  args: {
    defaultChecked: true,
    'aria-label': 'Interruptor activado'
  }
};

export const Deshabilitado: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center space-x-3">
        <Switch id="dis1" disabled />
        <Label htmlFor="dis1" className="opacity-50">Deshabilitado apagado</Label>
      </div>
      <div className="flex items-center space-x-3">
        <Switch id="dis2" disabled defaultChecked />
        <Label htmlFor="dis2" className="opacity-50">Deshabilitado encendido</Label>
      </div>
    </div>
  )
};
