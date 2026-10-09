import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from './Textarea';
import { Label } from '../label';

const meta: Meta<typeof Textarea> = {
  title: 'Formularios/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    hasError: { control: 'boolean' },
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
    rows: { control: 'number' }
  }
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {
    placeholder: 'Escriba la justificación o descripción detallada de su solicitud...',
    rows: 4
  }
};

export const ConEtiqueta: Story = {
  render: () => (
    <div className="grid w-96 gap-1.5">
      <Label htmlFor="motivo" required>Motivo del Trámite</Label>
      <Textarea id="motivo" placeholder="Describa el objetivo de la importación..." rows={3} />
    </div>
  )
};

export const ConError: Story = {
  render: () => (
    <div className="grid w-96 gap-1.5">
      <Label htmlFor="observaciones" required>Observaciones Técnicas</Label>
      <Textarea id="observaciones" hasError defaultValue="Texto insuficiente" rows={3} />
      <span className="text-xs text-alcspower-danger">Debe ingresar al menos 50 caracteres para la justificación.</span>
    </div>
  )
};

export const Deshabilitado: Story = {
  args: {
    disabled: true,
    defaultValue: 'Este campo no se puede editar porque el trámite ya fue aprobado.',
    rows: 3
  }
};
