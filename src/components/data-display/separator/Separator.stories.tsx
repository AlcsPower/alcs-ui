import type { Meta, StoryObj } from '@storybook/react';
import { Separator } from './Separator';
import { Pencil, Copy, RotateCcw, Trash2 } from 'lucide-react';

const meta: Meta<typeof Separator> = {
  title: 'Layout/Separator',
  component: Separator,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Orientación del separador'
    },
    variant: {
      control: 'select',
      options: ['default', 'soft', 'thick', 'dashed', 'dotted', 'gradient'],
      description: 'Estilo visual del trazo'
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'success', 'warning', 'error'],
      description: 'Color semántico o institucional'
    },
    inset: {
      control: 'boolean',
      description: 'Margen interior en los extremos'
    },
    decorative: {
      control: 'boolean',
      description: 'Si es puramente decorativo (ignorado por lectores de pantalla)'
    }
  }
};

export default meta;
type Story = StoryObj<typeof Separator>;

export const HorizontalVariants: Story = {
  render: () => (
    <div className="max-w-xl space-y-6 text-sm text-alcspower-foreground">
      <div>
        <span className="text-xs font-mono text-alcspower-muted-foreground">default (sólido 1px)</span>
        <Separator className="my-3" />
      </div>

      <div>
        <span className="text-xs font-mono text-alcspower-muted-foreground">soft (suave)</span>
        <Separator variant="soft" className="my-3" />
      </div>

      <div>
        <span className="text-xs font-mono text-alcspower-muted-foreground">thick (grueso 2px)</span>
        <Separator variant="thick" className="my-3" />
      </div>

      <div>
        <span className="text-xs font-mono text-alcspower-muted-foreground">dashed (discontinuo)</span>
        <Separator variant="dashed" className="my-3" />
      </div>

      <div>
        <span className="text-xs font-mono text-alcspower-muted-foreground">dotted (punteado)</span>
        <Separator variant="dotted" className="my-3" />
      </div>

      <div>
        <span className="text-xs font-mono text-alcspower-muted-foreground">gradient (gradiente)</span>
        <Separator variant="gradient" className="my-3" />
      </div>

      <div>
        <span className="text-xs font-mono text-alcspower-muted-foreground">inset (con margen)</span>
        <Separator inset className="my-3" />
      </div>
    </div>
  )
};

export const BrandColors: Story = {
  render: () => (
    <div className="max-w-xl space-y-6 text-sm text-alcspower-foreground">
      <div>
        <p className="font-semibold text-alcspower-primary">Sección importante</p>
        <Separator color="primary" className="my-3" />
        <p className="text-xs text-alcspower-muted-foreground">Contenido destacado</p>
      </div>

      <div>
        <p className="font-semibold text-emerald-600">Operación completada</p>
        <Separator color="success" className="my-3" />
        <p className="text-xs text-alcspower-muted-foreground">Resultado exitoso</p>
      </div>

      <div>
        <p className="font-semibold text-amber-600">Advertencia pendiente</p>
        <Separator color="warning" className="my-3" />
        <p className="text-xs text-alcspower-muted-foreground">Revisar antes de continuar</p>
      </div>

      <div>
        <p className="font-semibold text-red-600">Error detectado</p>
        <Separator color="error" className="my-3" />
        <p className="text-xs text-alcspower-muted-foreground">Acción requerida</p>
      </div>
    </div>
  )
};

export const WithText: Story = {
  render: () => (
    <div className="max-w-xl space-y-4">
      <Separator label="O" />
      <Separator color="primary" label="Nuevo mensaje" />
      <Separator color="success" label="Completado" />
      <Separator color="warning" label="Pendiente" />
      <Separator color="error" label="Error" />
      <Separator variant="soft" label="Hoy, 15 de octubre" />
    </div>
  )
};

export const VerticalVariants: Story = {
  render: () => (
    <div className="space-y-6 text-sm text-alcspower-foreground">
      <div className="flex h-8 items-center gap-0">
        <span className="px-3">Editar</span>
        <Separator orientation="vertical" />
        <span className="px-3">Copiar</span>
        <Separator orientation="vertical" />
        <span className="px-3">Pegar</span>
        <Separator orientation="vertical" />
        <span className="px-3 text-red-600">Eliminar</span>
      </div>

      <div className="flex h-8 items-center gap-0">
        <span className="px-3 inline-flex items-center gap-1.5"><Pencil className="h-4 w-4" /> Editar</span>
        <Separator orientation="vertical" />
        <span className="px-3 inline-flex items-center gap-1.5"><Copy className="h-4 w-4" /> Copiar</span>
        <Separator orientation="vertical" />
        <span className="px-3 inline-flex items-center gap-1.5"><RotateCcw className="h-4 w-4" /> Deshacer</span>
        <Separator orientation="vertical" color="primary" />
        <span className="px-3 inline-flex items-center gap-1.5 text-red-600"><Trash2 className="h-4 w-4" /> Eliminar</span>
      </div>

      <div className="flex h-8 items-center gap-0">
        <span className="px-3">Opción A</span>
        <Separator orientation="vertical" variant="thick" />
        <span className="px-3">Opción B</span>
        <Separator orientation="vertical" variant="thick" />
        <span className="px-3">Opción C</span>
      </div>
    </div>
  )
};

export const DarkMode: Story = {
  render: () => (
    <div className="dark bg-alcspower-surface p-6 rounded-2xl border border-alcspower-border max-w-xl space-y-5 text-alcspower-foreground">
      <div>
        <h4 className="text-sm font-semibold">Modo Oscuro</h4>
        <p className="text-xs text-alcspower-muted-foreground mt-1">
          Separadores con contraste optimizado y tokens semánticos en tema oscuro.
        </p>
      </div>
      <Separator />
      <Separator label="Opciones" />
      <Separator color="primary" />
      <div className="flex h-7 items-center text-xs text-alcspower-muted-foreground">
        <span className="px-3">Guardar</span>
        <Separator orientation="vertical" />
        <span className="px-3">Exportar</span>
        <Separator orientation="vertical" color="primary" />
        <span className="px-3 text-blue-400">Publicar</span>
      </div>
    </div>
  )
};
