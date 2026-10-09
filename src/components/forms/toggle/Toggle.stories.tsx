import type { Meta, StoryObj } from '@storybook/react';
import { Toggle } from './Toggle';
import { Bold, Italic, Underline } from 'lucide-react';

const meta: Meta<typeof Toggle> = {
  title: 'Formularios/Toggle',
  component: Toggle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  render: () => (
    <Toggle aria-label="Alternar negrita">
      <Bold className="h-4 w-4" />
    </Toggle>
  ),
};

export const Outline: Story = {
  render: () => (
    <Toggle variant="outline" aria-label="Alternar cursiva">
      <Italic className="h-4 w-4" />
    </Toggle>
  ),
};

export const ConTexto: Story = {
  render: () => (
    <Toggle variant="outline" aria-label="Favorito">
      ★ Guardar
    </Toggle>
  ),
};

export const Deshabilitado: Story = {
  render: () => (
    <Toggle disabled aria-label="Deshabilitado">
      <Underline className="h-4 w-4" />
    </Toggle>
  ),
};
