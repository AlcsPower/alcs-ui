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
    defaultValue: 5,
    min: 0,
    max: 100,
    step: 1,
  },
};

export const SteppersSplit: Story = {
  args: {
    defaultValue: 2,
    min: 1,
    max: 20,
    stepperPosition: 'split',
  },
};

export const SteppersInlineRight: Story = {
  args: {
    defaultValue: 10,
    stepperPosition: 'inline-right',
  },
};

export const MonedaYArancel: Story = {
  args: {
    defaultValue: 1500.5,
    step: 50,
    precision: 2,
    prefix: 'C$',
    suffix: 'NIO',
    min: 0,
  },
};

export const Porcentaje: Story = {
  args: {
    defaultValue: 15,
    min: 0,
    max: 100,
    step: 0.5,
    precision: 1,
    suffix: '%',
  },
};

export const ConError: Story = {
  args: {
    defaultValue: -5,
    hasError: true,
  },
};

export const Deshabilitado: Story = {
  args: {
    defaultValue: 42,
    disabled: true,
  },
};
