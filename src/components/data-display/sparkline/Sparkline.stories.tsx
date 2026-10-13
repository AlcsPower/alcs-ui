import type { Meta, StoryObj } from '@storybook/react';
import { Sparkline } from './Sparkline';
import { Card, CardHeader, CardTitle, CardContent } from '../card';
import { Badge } from '../badge';

const sampleTrend = [14, 18, 16, 22, 28, 25, 38, 42, 50];
const sampleDownTrend = [65, 58, 62, 45, 40, 42, 30, 24, 18];

const meta: Meta<typeof Sparkline> = {
  title: 'Data Display/Sparkline',
  component: Sparkline,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['area', 'line', 'bar'],
      description: 'Tipo visual de renderizado',
    },
    variant: {
      control: 'select',
      options: ['primary', 'success', 'warning', 'destructive', 'neutral', 'auto'],
      description: 'Variante cromática semántica',
    },
    curve: {
      control: 'select',
      options: ['monotone', 'linear'],
      description: 'Tipo de curva',
    },
    interactive: {
      control: 'boolean',
      description: 'Habilita tooltip e interactividad al pasar el cursor',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Sparkline>;

export const Default: Story = {
  args: {
    data: sampleTrend,
    type: 'area',
    variant: 'primary',
    width: 140,
    height: 38,
    interactive: true,
  },
};

export const TiposDeRenderizado: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-8 p-4">
      <div className="space-y-1">
        <div className="text-xs font-semibold text-alcspower-muted-foreground uppercase">Área con Gradiente</div>
        <Sparkline data={sampleTrend} type="area" variant="primary" width={140} height={38} interactive />
      </div>

      <div className="space-y-1">
        <div className="text-xs font-semibold text-alcspower-muted-foreground uppercase">Línea Pura (Monotone)</div>
        <Sparkline data={sampleTrend} type="line" variant="success" width={140} height={38} interactive />
      </div>

      <div className="space-y-1">
        <div className="text-xs font-semibold text-alcspower-muted-foreground uppercase">Micro-Barras</div>
        <Sparkline data={sampleTrend} type="bar" variant="warning" width={140} height={38} interactive />
      </div>
    </div>
  ),
};

export const TendenciaAutomatica: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-8 p-4">
      <div className="space-y-1">
        <div className="text-xs font-semibold text-alcspower-muted-foreground uppercase flex items-center gap-2">
          <span>Alcista (+36%)</span>
          <Badge variant="outline" size="sm" className="text-emerald-600 border-emerald-500/30">Auto: Verde</Badge>
        </div>
        <Sparkline data={sampleTrend} variant="auto" type="area" width={140} height={38} interactive />
      </div>

      <div className="space-y-1">
        <div className="text-xs font-semibold text-alcspower-muted-foreground uppercase flex items-center gap-2">
          <span>Bajista (-72%)</span>
          <Badge variant="outline" size="sm" className="text-rose-600 border-rose-500/30">Auto: Rojo</Badge>
        </div>
        <Sparkline data={sampleDownTrend} variant="auto" type="area" width={140} height={38} interactive />
      </div>
    </div>
  ),
};

export const EnTarjetaKpi: Story = {
  render: () => (
    <div className="max-w-xs">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xs font-medium text-alcspower-muted-foreground uppercase tracking-wider">
            Exportaciones Mensuales
          </CardTitle>
          <div className="text-2xl font-bold text-alcspower-foreground">$4.85M</div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center justify-between gap-4">
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              +14.2% vs mes anterior
            </span>
            <Sparkline
              data={sampleTrend}
              variant="success"
              type="area"
              width={100}
              height={32}
              interactive
            />
          </div>
        </CardContent>
      </Card>
    </div>
  ),
};
