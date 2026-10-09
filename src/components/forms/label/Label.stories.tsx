import type { Meta, StoryObj } from '@storybook/react';
import { Label } from './Label';
import { Input } from '../input';

const meta: Meta<typeof Label> = {
  title: 'Formularios/Label',
  component: Label,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    required: { control: 'boolean' }
  }
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = {
  args: {
    children: 'Nombre del Representante Legal'
  }
};

export const Requerido: Story = {
  args: {
    required: true,
    children: 'Cédula de Identidad'
  }
};

export const VinculadoAInput: Story = {
  render: () => (
    <div className="grid w-80 gap-1.5">
      <Label htmlFor="ruc-field" required>RUC Institucional</Label>
      <Input id="ruc-field" placeholder="J0310000000000" />
    </div>
  )
};
