import type { Meta, StoryObj } from '@storybook/react';
import { ToggleGroup, ToggleGroupItem } from './ToggleGroup';
import { AlignLeft, AlignCenter, AlignRight, AlignJustify, Bold, Italic, Underline } from 'lucide-react';

const meta: Meta<typeof ToggleGroup> = {
  title: 'Formularios/ToggleGroup',
  component: ToggleGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ToggleGroup>;

export const SeleccionSimple: Story = {
  render: () => (
    <ToggleGroup type="single" defaultValue="center" variant="outline" aria-label="Alineación">
      <ToggleGroupItem value="left" aria-label="Alinear a la izquierda">
        <AlignLeft className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Centrar">
        <AlignCenter className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Alinear a la derecha">
        <AlignRight className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="justify" aria-label="Justificar">
        <AlignJustify className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const SeleccionMultiple: Story = {
  render: () => (
    <ToggleGroup type="multiple" defaultValue={['bold']} variant="outline" aria-label="Estilos de texto">
      <ToggleGroupItem value="bold" aria-label="Negrita">
        <Bold className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Cursiva">
        <Italic className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Subrayado">
        <Underline className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};
