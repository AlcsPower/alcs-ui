import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Slider } from './Slider';

const meta: Meta<typeof Slider> = {
  title: 'Formularios/Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  render: () => {
    const [val, setVal] = React.useState([40]);
    return (
      <div className="w-[320px] space-y-4">
        <div className="flex justify-between text-sm font-medium text-alcspower-foreground">
          <span>Capacidad Asignada</span>
          <span className="font-mono text-alcspower-primary">{val[0]}%</span>
        </div>
        <Slider value={val} onValueChange={setVal} max={100} step={1} aria-label="Capacidad" />
      </div>
    );
  },
};

export const RangoDoble: Story = {
  render: () => {
    const [range, setRange] = React.useState([25, 75]);
    return (
      <div className="w-[320px] space-y-4">
        <div className="flex justify-between text-sm font-medium text-alcspower-foreground">
          <span>Rango de Presupuesto</span>
          <span className="font-mono text-alcspower-primary">${range[0]} - ${range[1]}k</span>
        </div>
        <Slider value={range} onValueChange={setRange} max={100} step={5} aria-label="Rango de Presupuesto" />
      </div>
    );
  },
};

export const Deshabilitado: Story = {
  render: () => (
    <div className="w-[320px] space-y-2">
      <span className="text-sm text-alcspower-muted-foreground">Control Bloqueado</span>
      <Slider defaultValue={[60]} disabled aria-label="Deshabilitado" />
    </div>
  ),
};
