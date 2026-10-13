import type { Meta, StoryObj } from '@storybook/react';
import { CopyButton } from './CopyButton';
import { Input } from '../input';

const meta: Meta<typeof CopyButton> = {
  title: 'Formularios/CopyButton',
  component: CopyButton,
  tags: ['autodocs'],
  argTypes: {
    timeout: {
      control: 'number',
    },
    tooltipText: {
      control: 'text',
    },
    copiedTooltipText: {
      control: 'text',
    },
    showTooltip: {
      control: 'boolean',
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['icon-sm', 'icon', 'icon-lg', 'sm', 'md'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof CopyButton>;

export const Default: Story = {
  args: {
    value: 'EXP-2026-MIFIC-9941',
  },
  render: (args) => (
    <div className="flex items-center gap-3 p-4 border border-alcspower-border rounded-xl bg-alcspower-surface max-w-sm">
      <div className="font-mono text-sm text-alcspower-foreground font-semibold">EXP-2026-MIFIC-9941</div>
      <CopyButton {...args} />
    </div>
  ),
};

export const InInput: Story = {
  render: () => (
    <div className="relative max-w-sm">
      <Input
        value="https://mific.gob.ni/api/v1/tramites/349"
        readOnly
        className="pr-10 font-mono text-xs"
      />
      <div className="absolute right-1 top-1/2 -translate-y-1/2">
        <CopyButton
          value="https://mific.gob.ni/api/v1/tramites/349"
          size="icon-sm"
          variant="ghost"
          tooltipText="Copiar URL"
          copiedTooltipText="URL copiada"
        />
      </div>
    </div>
  ),
};

export const OutlineVariant: Story = {
  args: {
    value: '001-280492-0001V',
    variant: 'outline',
    size: 'sm',
    children: (copied: boolean) => (
      <span className="flex items-center gap-1.5 text-xs">
        {copied ? '¡Cédula Copiada!' : 'Copiar Cédula'}
      </span>
    ),
  },
};
