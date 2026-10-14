import type { Meta, StoryObj } from '@storybook/react';
import { Container } from './Container';

const meta: Meta<typeof Container> = {
  title: 'Layout/Container',
  component: Container,
  tags: ['autodocs'],
  argTypes: {
    maxWidth: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', '2xl', 'prose', 'full'],
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl'],
    },
    centered: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Container>;

export const Default: Story = {
  args: {
    maxWidth: 'xl',
    padding: 'md',
    centered: true,
  },
  render: (args) => (
    <Container {...args} className="bg-alcspower-surface border border-alcspower-border rounded-xl p-6">
      <h2 className="text-lg font-bold text-alcspower-foreground">Contenedor Corporativo</h2>
      <p className="text-sm text-alcspower-muted-foreground mt-2">
        Delimita el ancho del contenido adaptándose a los puntos de quiebre del sistema de diseño.
      </p>
    </Container>
  ),
};

export const Small: Story = {
  args: {
    maxWidth: 'sm',
    padding: 'sm',
    centered: true,
  },
  render: (args) => (
    <Container {...args} className="bg-alcspower-surface-muted/30 border border-alcspower-border rounded-lg p-4">
      <p className="text-xs text-alcspower-foreground font-medium">Contenedor estrecho (ej. formularios de login o diálogos).</p>
    </Container>
  ),
};

export const Prose: Story = {
  args: {
    maxWidth: 'prose',
    padding: 'md',
    centered: true,
  },
  render: (args) => (
    <Container {...args} className="bg-alcspower-surface border border-alcspower-border rounded-xl p-6 leading-relaxed">
      <h3 className="text-base font-semibold text-alcspower-foreground">Lectura Editorial</h3>
      <p className="text-sm text-alcspower-muted-foreground mt-2">
        La escala prose limita el ancho a 65 caracteres para optimizar la legibilidad de acuerdos corporativos, circulares y normativas.
      </p>
    </Container>
  ),
};
