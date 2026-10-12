import type { Meta, StoryObj } from '@storybook/react';
import { Kbd, KbdGroup, KBD_SYMBOLS } from './index';

const meta = {
  title: 'Data Display/Kbd',
  component: Kbd,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Kbd>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: '⌘K',
  },
};

export const ShortcutCombination: Story = {
  render: () => (
    <KbdGroup separator="+">
      <Kbd>{KBD_SYMBOLS.cmd}</Kbd>
      <Kbd>{KBD_SYMBOLS.shift}</Kbd>
      <Kbd>P</Kbd>
    </KbdGroup>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Kbd size="xs">Esc</Kbd>
      <Kbd size="sm">Esc</Kbd>
      <Kbd size="md">Esc</Kbd>
      <Kbd size="lg">Esc</Kbd>
    </div>
  ),
};
