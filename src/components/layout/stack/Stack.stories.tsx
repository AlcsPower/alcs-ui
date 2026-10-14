import type { Meta, StoryObj } from '@storybook/react';
import { Stack } from './Stack';
import { Button } from '../../forms/button';
import { Badge } from '../../data-display/badge';
import { Separator } from '../../data-display/separator';

const meta: Meta<typeof Stack> = {
  title: 'Layout/Stack',
  component: Stack,
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: 'radio',
      options: ['vertical', 'horizontal'],
    },
    spacing: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch', 'baseline'],
    },
    justify: {
      control: 'select',
      options: ['start', 'center', 'end', 'between', 'around', 'evenly'],
    },
    wrap: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Stack>;

export const Vertical: Story = {
  args: {
    direction: 'vertical',
    spacing: 'md',
    align: 'stretch',
  },
  render: (args) => (
    <Stack {...args} className="p-4 border border-alcspower-border rounded-xl bg-alcspower-surface max-w-sm">
      <div className="font-semibold text-alcspower-foreground">Panel de Control</div>
      <div className="text-xs text-alcspower-muted-foreground">Opciones y estado del sistema.</div>
      <Button variant="primary" size="sm">Actualizar Datos</Button>
    </Stack>
  ),
};

export const Horizontal: Story = {
  args: {
    direction: 'horizontal',
    spacing: 'sm',
    align: 'center',
    wrap: true,
  },
  render: (args) => (
    <Stack {...args}>
      <Badge variant="outline">Trámite Activo</Badge>
      <Badge variant="secondary">Prioridad Alta</Badge>
      <Badge variant="default">DGCE</Badge>
    </Stack>
  ),
};

export const WithDivider: Story = {
  args: {
    direction: 'vertical',
    spacing: 'md',
    divider: <Separator className="my-1" />,
  },
  render: (args) => (
    <Stack {...args} className="p-4 border border-alcspower-border rounded-xl bg-alcspower-surface max-w-md">
      <div>
        <div className="text-sm font-bold text-alcspower-foreground">Fase 1: Recepción</div>
        <div className="text-xs text-alcspower-muted-foreground">Documentos ingresados al canal de atención.</div>
      </div>
      <div>
        <div className="text-sm font-bold text-alcspower-foreground">Fase 2: Dictamen Técnico</div>
        <div className="text-xs text-alcspower-muted-foreground">Evaluación de cumplimiento normativo.</div>
      </div>
      <div>
        <div className="text-sm font-bold text-alcspower-foreground">Fase 3: Resolución Corporativa</div>
        <div className="text-xs text-alcspower-muted-foreground">Emisión de certificado oficial.</div>
      </div>
    </Stack>
  ),
};
