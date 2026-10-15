import type { Meta, StoryObj } from '@storybook/react';
import { ScrollArea } from './ScrollArea';

const meta: Meta<typeof ScrollArea> = {
  title: 'Layout/ScrollArea',
  component: ScrollArea,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal', 'both'],
      description: 'Dirección de la barra de desplazamiento',
    },
    scrollbarSize: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Grosor de la barra',
    },
    type: {
      control: 'select',
      options: ['auto', 'always', 'scroll', 'hover'],
      description: 'Comportamiento de visibilidad de la barra',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ScrollArea>;

const tags = Array.from({ length: 40 }).map(
  (_, i, a) => `Registro de auditoría corporativa #${a.length - i} — Evento registrado con éxito`
);

export const Default: Story = {
  args: {
    orientation: 'vertical',
    scrollbarSize: 'md',
    type: 'hover',
  },
  render: (args) => (
    <div className="max-w-md mx-auto">
      <ScrollArea
        {...args}
        className="h-72 w-full rounded-xl border border-alcspower-border bg-alcspower-surface p-4 shadow-sm"
      >
        <div className="space-y-3 pr-2">
          <h4 className="text-sm font-semibold text-alcspower-foreground sticky top-0 bg-alcspower-surface/95 backdrop-blur-sm pb-2 border-b border-alcspower-border">
            Historial de Operaciones
          </h4>
          {tags.map((tag) => (
            <div
              key={tag}
              className="text-xs text-alcspower-muted-foreground p-2 rounded-lg bg-alcspower-surface-muted/40 hover:bg-alcspower-surface-muted transition-colors"
            >
              {tag}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  ),
};

export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
    scrollbarSize: 'md',
    type: 'hover',
  },
  render: (args) => (
    <div className="max-w-xl mx-auto">
      <ScrollArea
        {...args}
        className="w-full whitespace-nowrap rounded-xl border border-alcspower-border bg-alcspower-surface p-4 shadow-sm"
      >
        <div className="flex w-max space-x-4 pb-3">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="w-48 shrink-0 rounded-lg border border-alcspower-border bg-alcspower-surface-muted/30 p-4"
            >
              <div className="text-xs font-semibold text-alcspower-foreground">
                Métrica #{i + 1}
              </div>
              <div className="text-xl font-bold text-alcspower-primary mt-1">
                {(i * 12.5 + 45).toFixed(1)}%
              </div>
              <div className="text-[11px] text-alcspower-muted-foreground mt-0.5">
                Cumplimiento de SLA
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  ),
};

export const Bidirectional: Story = {
  args: {
    orientation: 'both',
    scrollbarSize: 'md',
    type: 'hover',
  },
  render: (args) => (
    <div className="max-w-lg mx-auto">
      <ScrollArea
        {...args}
        className="h-72 w-full rounded-xl border border-alcspower-border bg-alcspower-surface p-4 shadow-sm"
      >
        <div className="w-[850px] space-y-3">
          <h4 className="text-sm font-semibold text-alcspower-foreground">
            Matriz de Datos Extensa (Scroll Horizontal y Vertical)
          </h4>
          <p className="text-xs text-alcspower-muted-foreground">
            Desplázate en ambas direcciones para inspeccionar la tabla multidimensional.
          </p>
          <div className="grid grid-cols-6 gap-2 pt-2">
            {Array.from({ length: 48 }).map((_, i) => (
              <div
                key={i}
                className="p-3 text-xs text-center rounded border border-alcspower-border bg-alcspower-surface-muted/20"
              >
                Celda {i + 1}
              </div>
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
      <div>
        <span className="text-xs font-medium text-alcspower-muted-foreground mb-1 block">
          Tamaño sm (delgado - 6px)
        </span>
        <ScrollArea
          scrollbarSize="sm"
          type="always"
          className="h-44 rounded-lg border border-alcspower-border bg-alcspower-surface p-3"
        >
          <div className="space-y-2">
            {tags.slice(0, 10).map((t) => (
              <div key={t} className="text-xs text-alcspower-foreground">
                {t}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      <div>
        <span className="text-xs font-medium text-alcspower-muted-foreground mb-1 block">
          Tamaño md (estándar - 10px)
        </span>
        <ScrollArea
          scrollbarSize="md"
          type="always"
          className="h-44 rounded-lg border border-alcspower-border bg-alcspower-surface p-3"
        >
          <div className="space-y-2">
            {tags.slice(0, 10).map((t) => (
              <div key={t} className="text-xs text-alcspower-foreground">
                {t}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      <div>
        <span className="text-xs font-medium text-alcspower-muted-foreground mb-1 block">
          Tamaño lg (amplio - 14px)
        </span>
        <ScrollArea
          scrollbarSize="lg"
          type="always"
          className="h-44 rounded-lg border border-alcspower-border bg-alcspower-surface p-3"
        >
          <div className="space-y-2">
            {tags.slice(0, 10).map((t) => (
              <div key={t} className="text-xs text-alcspower-foreground">
                {t}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  ),
};
