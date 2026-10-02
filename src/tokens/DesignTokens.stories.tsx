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
    <div className="space-y-8 max-w-4xl text-mific-foreground">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Design Tokens - Colores Semánticos</h2>
        <p className="text-sm text-mific-muted-foreground mt-1">
          Variables CSS institucionales con soporte automático y adaptativo para modo claro y oscuro.
        </p>
      </div>

      {/* Marca Principal */}
      <section className="space-y-3">
        <h3 className="text-base font-semibold">Marca Institucional MIFIC</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-md border border-mific-border bg-mific-primary text-mific-primary-foreground shadow-sm">
            <div className="font-semibold text-sm">Primary</div>
            <div className="text-xs opacity-80 font-mono mt-1">--mific-primary</div>
          </div>
          <div className="p-4 rounded-md border border-mific-border bg-mific-primary-hover text-mific-primary-foreground shadow-sm">
            <div className="font-semibold text-sm">Primary Hover</div>
            <div className="text-xs opacity-80 font-mono mt-1">--mific-primary-hover</div>
          </div>
          <div className="p-4 rounded-md border border-mific-border bg-mific-primary-active text-mific-primary-foreground shadow-sm">
            <div className="font-semibold text-sm">Primary Active</div>
            <div className="text-xs opacity-80 font-mono mt-1">--mific-primary-active</div>
          </div>
          <div className="p-4 rounded-md border border-mific-border bg-mific-primary-subtle text-mific-primary shadow-sm">
            <div className="font-semibold text-sm">Primary Subtle</div>
            <div className="text-xs opacity-80 font-mono mt-1">--mific-primary-subtle</div>
          </div>
        </div>
      </section>

      {/* Superficies y Fondos */}
      <section className="space-y-3">
        <h3 className="text-base font-semibold">Superficies y Lienzo</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-md border border-mific-border bg-mific-background text-mific-foreground shadow-sm">
            <div className="font-semibold text-sm">Background / Canvas</div>
            <div className="text-xs text-mific-muted-foreground font-mono mt-1">--mific-background</div>
          </div>
          <div className="p-4 rounded-md border border-mific-border bg-mific-surface text-mific-foreground shadow-sm">
            <div className="font-semibold text-sm">Surface Base</div>
            <div className="text-xs text-mific-muted-foreground font-mono mt-1">--mific-surface</div>
          </div>
          <div className="p-4 rounded-md border border-mific-border bg-mific-surface-card text-mific-foreground shadow-sm">
            <div className="font-semibold text-sm">Surface Card / Dialog</div>
            <div className="text-xs text-mific-muted-foreground font-mono mt-1">--mific-surface-card</div>
          </div>
          <div className="p-4 rounded-md border border-mific-border bg-mific-surface-muted text-mific-foreground shadow-sm">
            <div className="font-semibold text-sm">Surface Muted</div>
            <div className="text-xs text-mific-muted-foreground font-mono mt-1">--mific-surface-muted</div>
          </div>
        </div>
      </section>

      {/* Estados Funcionales (Feedback) */}
      <section className="space-y-3">
        <h3 className="text-base font-semibold">Estados Funcionales (Feedback)</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-md border border-mific-destructive-border bg-mific-destructive-subtle text-mific-destructive">
            <div className="font-semibold text-sm">Destructive / Error</div>
            <div className="text-xs opacity-80 font-mono mt-1">--mific-destructive</div>
          </div>
          <div className="p-4 rounded-md border border-mific-success-border bg-mific-success-subtle text-mific-success">
            <div className="font-semibold text-sm">Success</div>
            <div className="text-xs opacity-80 font-mono mt-1">--mific-success</div>
          </div>
          <div className="p-4 rounded-md border border-mific-warning-border bg-mific-warning-subtle text-mific-warning">
            <div className="font-semibold text-sm">Warning</div>
            <div className="text-xs opacity-80 font-mono mt-1">--mific-warning</div>
          </div>
          <div className="p-4 rounded-md border border-mific-info-border bg-mific-info-subtle text-mific-info">
            <div className="font-semibold text-sm">Info</div>
            <div className="text-xs opacity-80 font-mono mt-1">--mific-info</div>
          </div>
        </div>
      </section>

      {/* Modo Oscuro Preview */}
      <section className="space-y-3">
        <h3 className="text-base font-semibold">Muestra en Modo Oscuro (.dark)</h3>
        <div className="dark bg-mific-background text-mific-foreground p-6 rounded-lg border border-mific-border space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold">Superficie Elevada (.dark)</span>
            <span className="text-xs font-mono bg-mific-surface-muted px-2 py-1 rounded">bg-mific-surface-card</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-3 rounded bg-mific-primary text-mific-primary-foreground font-medium text-xs text-center">
              Primary (#38bdf8)
            </div>
            <div className="p-3 rounded bg-mific-surface-card border border-mific-border text-mific-foreground font-medium text-xs text-center">
              Card Surface
            </div>
            <div className="p-3 rounded bg-mific-destructive-subtle text-mific-destructive border border-mific-destructive-border font-medium text-xs text-center">
              Destructive Subtle
            </div>
            <div className="p-3 rounded bg-mific-success-subtle text-mific-success border border-mific-success-border font-medium text-xs text-center">
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
    <div className="space-y-6 max-w-3xl text-mific-foreground">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Jerarquía Tipográfica</h2>
        <p className="text-sm text-mific-muted-foreground mt-1">
          La biblioteca no impone fuentes globales. Consume el stack sans-serif del sistema o la fuente corporativa configurada por la app consumidora.
        </p>
      </div>

      <div className="space-y-4 border border-mific-border rounded-lg p-6 bg-mific-surface">
        <div className="border-b border-mific-border pb-3">
          <div className="text-xs font-mono text-mific-muted-foreground mb-1">text-2xl font-bold tracking-tight</div>
          <h2 className="text-2xl font-bold tracking-tight">Título Principal de Sección</h2>
        </div>
        <div className="border-b border-mific-border pb-3">
          <div className="text-xs font-mono text-mific-muted-foreground mb-1">text-lg font-semibold leading-none (CardTitle, DialogTitle)</div>
          <h3 className="text-lg font-semibold leading-none">Título de Tarjeta o Modal Institucional</h3>
        </div>
        <div className="border-b border-mific-border pb-3">
          <div className="text-xs font-mono text-mific-muted-foreground mb-1">text-sm font-semibold (AlertTitle, Subtítulos)</div>
          <h4 className="text-sm font-semibold">Subtítulo de Alerta o Grupo de Controles</h4>
        </div>
        <div className="border-b border-mific-border pb-3">
          <div className="text-xs font-mono text-mific-muted-foreground mb-1">text-sm font-medium (Labels, Buttons, Tabs)</div>
          <p className="text-sm font-medium">Texto para etiquetas de formulario, botones y acciones</p>
        </div>
        <div className="border-b border-mific-border pb-3">
          <div className="text-xs font-mono text-mific-muted-foreground mb-1">text-sm text-mific-muted-foreground (Helper text, Descripciones)</div>
          <p className="text-sm text-mific-muted-foreground leading-relaxed">
            Texto explicativo y descriptivo para orientar al ciudadano o usuario institucional en el diligenciamiento de trámites.
          </p>
        </div>
        <div>
          <div className="text-xs font-mono text-mific-muted-foreground mb-1">text-xs font-medium / font-semibold (Badges, Tooltips, Captions)</div>
          <span className="text-xs font-medium bg-mific-surface-muted px-2 py-1 rounded text-mific-muted-foreground">
            Etiqueta pequeña, tooltip y pie de tabla
          </span>
        </div>
      </div>
    </div>
  )
};

export const SpacingAndRadius: Story = {
  render: () => (
    <div className="space-y-8 max-w-3xl text-mific-foreground">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Espaciado y Radios de Borde</h2>
        <p className="text-sm text-mific-muted-foreground mt-1">
          Escalas consistentes aplicadas transversalmente a todos los componentes de la biblioteca.
        </p>
      </div>

      {/* Radios */}
      <section className="space-y-3">
        <h3 className="text-base font-semibold">Escala de Border Radius</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 border border-mific-border bg-mific-surface-muted rounded-mific-sm text-center">
            <div className="font-semibold text-sm">Small (4px)</div>
            <div className="text-xs font-mono text-mific-muted-foreground mt-1">rounded-mific-sm</div>
          </div>
          <div className="p-4 border border-mific-border bg-mific-surface-muted rounded-mific-md text-center">
            <div className="font-semibold text-sm">Medium (6px)</div>
            <div className="text-xs font-mono text-mific-muted-foreground mt-1">rounded-mific-md</div>
          </div>
          <div className="p-4 border border-mific-border bg-mific-surface-muted rounded-mific-lg text-center">
            <div className="font-semibold text-sm">Large (8px)</div>
            <div className="text-xs font-mono text-mific-muted-foreground mt-1">rounded-mific-lg</div>
          </div>
          <div className="p-4 border border-mific-border bg-mific-surface-muted rounded-mific-full text-center">
            <div className="font-semibold text-sm">Full (Pill)</div>
            <div className="text-xs font-mono text-mific-muted-foreground mt-1">rounded-mific-full</div>
          </div>
        </div>
      </section>

      {/* Alturas de Controles */}
      <section className="space-y-3">
        <h3 className="text-base font-semibold">Alturas de Controles Interactivos</h3>
        <div className="space-y-3 border border-mific-border rounded-lg p-6 bg-mific-surface">
          <div className="flex items-center gap-4">
            <span className="w-24 text-xs font-mono text-mific-muted-foreground">h-8 (32px) - sm</span>
            <div className="h-8 px-4 rounded-md bg-mific-primary text-mific-primary-foreground text-xs flex items-center font-medium">
              Control Small (Button, Tag)
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="w-24 text-xs font-mono text-mific-muted-foreground">h-10 (40px) - md</span>
            <div className="h-10 px-4 rounded-md bg-mific-primary text-mific-primary-foreground text-sm flex items-center font-medium">
              Control Estándar (Button, Input, Select)
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="w-24 text-xs font-mono text-mific-muted-foreground">h-12 (48px) - lg</span>
            <div className="h-12 px-6 rounded-md bg-mific-primary text-mific-primary-foreground text-base flex items-center font-medium">
              Control Large (Hero button, CTA)
            </div>
          </div>
        </div>
      </section>
    </div>
  )
};
