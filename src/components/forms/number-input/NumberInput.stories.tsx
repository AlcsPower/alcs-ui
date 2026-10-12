import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { NumberInput } from './NumberInput';

const meta: Meta<typeof NumberInput> = {
  title: 'Formularios/NumberInput',
  component: NumberInput,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof NumberInput>;

export const Default: Story = {
  args: {
    defaultValue: 10,
    min: 0,
    max: 100,
    step: 1,
    stepperPosition: 'stacked',
  },
};

export const SteppersSplit: Story = {
  args: {
    defaultValue: 4,
    min: 0,
    max: 100,
    step: 1,
    stepperPosition: 'split',
  },
};

export const SteppersInlineRight: Story = {
  args: {
    defaultValue: 100,
    min: 0,
    max: 1000,
    step: 1,
    stepperPosition: 'inline-right',
  },
};

export const SteppersNone: Story = {
  args: {
    defaultValue: 2500,
    min: 0,
    max: 10000,
    step: 100,
    stepperPosition: 'none',
  },
};

export const MonedaYArancel: Story = {
  args: {
    defaultValue: 750.5,
    step: 50,
    precision: 2,
    prefix: 'C$',
    suffix: 'NIO',
    min: 0,
    max: 10000,
  },
};

export const Porcentaje: Story = {
  args: {
    defaultValue: 15.0,
    min: 0,
    max: 100,
    step: 0.5,
    precision: 1,
    suffix: '%',
  },
};

export const Escalas: Story = {
  render: () => (
    <div className="flex flex-col gap-4 max-w-xs">
      <NumberInput size="sm" defaultValue={15} prefix="N°" />
      <NumberInput size="md" defaultValue={15} prefix="N°" />
      <NumberInput size="lg" defaultValue={15} prefix="N°" />
    </div>
  ),
};

export const ConError: Story = {
  args: {
    defaultValue: 999,
    min: 0,
    max: 500,
    hasError: true,
    prefix: 'Código',
  },
};

export const Deshabilitado: Story = {
  args: {
    defaultValue: 42,
    disabled: true,
    prefix: 'N°',
  },
};
