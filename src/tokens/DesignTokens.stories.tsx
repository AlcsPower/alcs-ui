import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Design System/Tokens',
  parameters: {
    layout: 'padded'
  }
};

export default meta;
type Story = StoryObj;

export const Colors: Story = {
  render: () => (
    <div className="space-y-8 max-w-4xl text-alcspower-foreground">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Design Tokens - Colores Semánticos</h2>
        <p className="text-sm text-alcspower-muted-foreground mt-1">
          Variables CSS corporativas con soporte automático y adaptativo para modo claro y oscuro.
        </p>
      </div>

      {/* Marca Principal */}
      <section className="space-y-3">
        <h3 className="text-base font-semibold">Marca Corporativa AlcsPower</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-md border border-alcspower-border bg-alcspower-primary text-alcspower-primary-foreground shadow-sm">
            <div className="font-semibold text-sm">Primary</div>
            <div className="text-xs opacity-80 font-mono mt-1">--alcspower-primary</div>
          </div>
          <div className="p-4 rounded-md border border-alcspower-border bg-alcspower-primary-hover text-alcspower-primary-foreground shadow-sm">
            <div className="font-semibold text-sm">Primary Hover</div>
            <div className="text-xs opacity-80 font-mono mt-1">--alcspower-primary-hover</div>
          </div>
          <div className="p-4 rounded-md border border-alcspower-border bg-alcspower-primary-active text-alcspower-primary-foreground shadow-sm">
            <div className="font-semibold text-sm">Primary Active</div>
            <div className="text-xs opacity-80 font-mono mt-1">--alcspower-primary-active</div>
          </div>
          <div className="p-4 rounded-md border border-alcspower-border bg-alcspower-primary-subtle text-alcspower-primary shadow-sm">
            <div className="font-semibold text-sm">Primary Subtle</div>
            <div className="text-xs opacity-80 font-mono mt-1">--alcspower-primary-subtle</div>
          </div>
        </div>
      </section>

      {/* Superficies y Fondos */}
      <section className="space-y-3">
        <h3 className="text-base font-semibold">Superficies y Lienzo</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-md border border-alcspower-border bg-alcspower-background text-alcspower-foreground shadow-sm">
            <div className="font-semibold text-sm">Background / Canvas</div>
            <div className="text-xs text-alcspower-muted-foreground font-mono mt-1">--alcspower-background</div>
          </div>
          <div className="p-4 rounded-md border border-alcspower-border bg-alcspower-surface text-alcspower-foreground shadow-sm">
            <div className="font-semibold text-sm">Surface Base</div>
            <div className="text-xs text-alcspower-muted-foreground font-mono mt-1">--alcspower-surface</div>
          </div>
          <div className="p-4 rounded-md border border-alcspower-border bg-alcspower-surface-card text-alcspower-foreground shadow-sm">
            <div className="font-semibold text-sm">Surface Card / Dialog</div>
            <div className="text-xs text-alcspower-muted-foreground font-mono mt-1">--alcspower-surface-card</div>
          </div>
          <div className="p-4 rounded-md border border-alcspower-border bg-alcspower-surface-muted text-alcspower-foreground shadow-sm">
            <div className="font-semibold text-sm">Surface Muted</div>
            <div className="text-xs text-alcspower-muted-foreground font-mono mt-1">--alcspower-surface-muted</div>
          </div>
        </div>
      </section>

      {/* Estados Funcionales (Feedback) */}
      <section className="space-y-3">
        <h3 className="text-base font-semibold">Estados Funcionales (Feedback)</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-md border border-alcspower-destructive-border bg-alcspower-destructive-subtle text-alcspower-destructive">
            <div className="font-semibold text-sm">Destructive / Error</div>
            <div className="text-xs opacity-80 font-mono mt-1">--alcspower-destructive</div>
          </div>
          <div className="p-4 rounded-md border border-alcspower-success-border bg-alcspower-success-subtle text-alcspower-success">
            <div className="font-semibold text-sm">Success</div>
            <div className="text-xs opacity-80 font-mono mt-1">--alcspower-success</div>
          </div>
          <div className="p-4 rounded-md border border-alcspower-warning-border bg-alcspower-warning-subtle text-alcspower-warning">
            <div className="font-semibold text-sm">Warning</div>
            <div className="text-xs opacity-80 font-mono mt-1">--alcspower-warning</div>
          </div>
          <div className="p-4 rounded-md border border-alcspower-info-border bg-alcspower-info-subtle text-alcspower-info">
            <div className="font-semibold text-sm">Info</div>
            <div className="text-xs opacity-80 font-mono mt-1">--alcspower-info</div>
          </div>
        </div>
      </section>

      {/* Modo Oscuro Preview */}
      <section className="space-y-3">
        <h3 className="text-base font-semibold">Muestra en Modo Oscuro (.dark)</h3>
        <div className="dark bg-alcspower-background text-alcspower-foreground p-6 rounded-lg border border-alcspower-border space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold">Superficie Elevada (.dark)</span>
            <span className="text-xs font-mono bg-alcspower-surface-muted px-2 py-1 rounded">bg-alcspower-surface-card</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-3 rounded bg-alcspower-primary text-alcspower-primary-foreground font-medium text-xs text-center">
              Primary (#38bdf8)
            </div>
            <div className="p-3 rounded bg-alcspower-surface-card border border-alcspower-border text-alcspower-foreground font-medium text-xs text-center">
              Card Surface
            </div>
            <div className="p-3 rounded bg-alcspower-destructive-subtle text-alcspower-destructive border border-alcspower-destructive-border font-medium text-xs text-center">
              Destructive Subtle
            </div>
            <div className="p-3 rounded bg-alcspower-success-subtle text-alcspower-success border border-alcspower-success-border font-medium text-xs text-center">
              Success Subtle
            </div>
          </div>
        </div>
      </section>
    </div>
  )
};

export const Typography: Story = {
  render: () => (
    <div className="space-y-6 max-w-3xl text-alcspower-foreground">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Jerarquía Tipográfica</h2>
        <p className="text-sm text-alcspower-muted-foreground mt-1">
          La biblioteca no impone fuentes globales. Consume el stack sans-serif del sistema o la fuente corporativa configurada por la app consumidora.
        </p>
      </div>

      <div className="space-y-4 border border-alcspower-border rounded-lg p-6 bg-alcspower-surface">
        <div className="border-b border-alcspower-border pb-3">
          <div className="text-xs font-mono text-alcspower-muted-foreground mb-1">text-2xl font-bold tracking-tight</div>
          <h2 className="text-2xl font-bold tracking-tight">Título Principal de Sección</h2>
        </div>
        <div className="border-b border-alcspower-border pb-3">
          <div className="text-xs font-mono text-alcspower-muted-foreground mb-1">text-lg font-semibold leading-none (CardTitle, DialogTitle)</div>
          <h3 className="text-lg font-semibold leading-none">Título de Tarjeta o Modal Corporativo</h3>
        </div>
        <div className="border-b border-alcspower-border pb-3">
          <div className="text-xs font-mono text-alcspower-muted-foreground mb-1">text-sm font-semibold (AlertTitle, Subtítulos)</div>
          <h4 className="text-sm font-semibold">Subtítulo de Alerta o Grupo de Controles</h4>
        </div>
        <div className="border-b border-alcspower-border pb-3">
          <div className="text-xs font-mono text-alcspower-muted-foreground mb-1">text-sm font-medium (Labels, Buttons, Tabs)</div>
          <p className="text-sm font-medium">Texto para etiquetas de formulario, botones y acciones</p>
        </div>
        <div className="border-b border-alcspower-border pb-3">
          <div className="text-xs font-mono text-alcspower-muted-foreground mb-1">text-sm text-alcspower-muted-foreground (Helper text, Descripciones)</div>
          <p className="text-sm text-alcspower-muted-foreground leading-relaxed">
            Texto explicativo y descriptivo para orientar al usuario en el diligenciamiento de formularios y solicitudes.
          </p>
        </div>
        <div>
          <div className="text-xs font-mono text-alcspower-muted-foreground mb-1">text-xs font-medium / font-semibold (Badges, Tooltips, Captions)</div>
          <span className="text-xs font-medium bg-alcspower-surface-muted px-2 py-1 rounded text-alcspower-muted-foreground">
            Etiqueta pequeña, tooltip y pie de tabla
          </span>
        </div>
      </div>
    </div>
  )
};

export const SpacingAndRadius: Story = {
  render: () => (
    <div className="space-y-8 max-w-3xl text-alcspower-foreground">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Espaciado y Radios de Borde</h2>
        <p className="text-sm text-alcspower-muted-foreground mt-1">
          Escalas consistentes aplicadas transversalmente a todos los componentes de la biblioteca.
        </p>
      </div>

      {/* Radios */}
      <section className="space-y-3">
        <h3 className="text-base font-semibold">Escala de Border Radius</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 border border-alcspower-border bg-alcspower-surface-muted rounded-alcspower-sm text-center">
            <div className="font-semibold text-sm">Small (4px)</div>
            <div className="text-xs font-mono text-alcspower-muted-foreground mt-1">rounded-alcspower-sm</div>
          </div>
          <div className="p-4 border border-alcspower-border bg-alcspower-surface-muted rounded-alcspower-md text-center">
            <div className="font-semibold text-sm">Medium (6px)</div>
            <div className="text-xs font-mono text-alcspower-muted-foreground mt-1">rounded-alcspower-md</div>
          </div>
          <div className="p-4 border border-alcspower-border bg-alcspower-surface-muted rounded-alcspower-lg text-center">
            <div className="font-semibold text-sm">Large (8px)</div>
            <div className="text-xs font-mono text-alcspower-muted-foreground mt-1">rounded-alcspower-lg</div>
          </div>
          <div className="p-4 border border-alcspower-border bg-alcspower-surface-muted rounded-alcspower-full text-center">
            <div className="font-semibold text-sm">Full (Pill)</div>
            <div className="text-xs font-mono text-alcspower-muted-foreground mt-1">rounded-alcspower-full</div>
          </div>
        </div>
      </section>

      {/* Alturas de Controles */}
      <section className="space-y-3">
        <h3 className="text-base font-semibold">Alturas de Controles Interactivos</h3>
        <div className="space-y-3 border border-alcspower-border rounded-lg p-6 bg-alcspower-surface">
          <div className="flex items-center gap-4">
            <span className="w-24 text-xs font-mono text-alcspower-muted-foreground">h-8 (32px) - sm</span>
            <div className="h-8 px-4 rounded-md bg-alcspower-primary text-alcspower-primary-foreground text-xs flex items-center font-medium">
              Control Small (Button, Tag)
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="w-24 text-xs font-mono text-alcspower-muted-foreground">h-10 (40px) - md</span>
            <div className="h-10 px-4 rounded-md bg-alcspower-primary text-alcspower-primary-foreground text-sm flex items-center font-medium">
              Control Estándar (Button, Input, Select)
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="w-24 text-xs font-mono text-alcspower-muted-foreground">h-12 (48px) - lg</span>
            <div className="h-12 px-6 rounded-md bg-alcspower-primary text-alcspower-primary-foreground text-base flex items-center font-medium">
              Control Large (Hero button, CTA)
            </div>
          </div>
        </div>
      </section>
    </div>
  )
};
