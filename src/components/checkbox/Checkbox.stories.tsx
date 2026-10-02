import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';
import { Label } from '../label';

const meta: Meta<typeof Checkbox> = {
  title: 'Controles/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    'aria-label': 'Opción de selección simple'
  }
};

export const ConEtiqueta: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms" className="cursor-pointer">
        Declaro que la información proporcionada es verídica
      </Label>
    </div>
  )
};

export const Seleccionado: Story = {
  args: {
    defaultChecked: true,
    'aria-label': 'Casilla preseleccionada'
  }
};

export const Indeterminado: Story = {
  args: {
    checked: 'indeterminate',
    'aria-label': 'Selección parcial de expedientes'
  }
};

export const Deshabilitado: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center space-x-2">
        <Checkbox id="dis1" disabled />
        <Label htmlFor="dis1" className="opacity-50">Deshabilitado sin marcar</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="dis2" disabled defaultChecked />
        <Label htmlFor="dis2" className="opacity-50">Deshabilitado marcado</Label>
      </div>
    </div>
  )
};
