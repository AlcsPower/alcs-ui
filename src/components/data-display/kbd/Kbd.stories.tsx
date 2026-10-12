import type { Meta, StoryObj } from '@storybook/react';
import { Kbd, KbdGroup } from './index';

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
  render: () => (
    <KbdGroup separator="+">
      <Kbd platform="macos" keyName="command" />
      <Kbd>K</Kbd>
    </KbdGroup>
  ),
};

export const MultiPlatform: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <span className="text-xs font-mono w-20 text-gray-500">macOS:</span>
        <KbdGroup separator="+">
          <Kbd platform="macos" keyName="command" />
          <Kbd>S</Kbd>
        </KbdGroup>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-xs font-mono w-20 text-gray-500">Windows:</span>
        <KbdGroup separator="+">
          <Kbd platform="windows" keyName="modifier" />
          <Kbd>S</Kbd>
        </KbdGroup>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-xs font-mono w-20 text-gray-500">Linux:</span>
        <KbdGroup separator="+">
          <Kbd platform="linux" keyName="modifier" />
          <Kbd>S</Kbd>
        </KbdGroup>
      </div>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Kbd variant="outline">⌘K</Kbd>
      <Kbd variant="filled">⌘K</Kbd>
      <Kbd variant="primary">⌘K</Kbd>
      <Kbd variant="minimal">⌘K</Kbd>
    </div>
  ),
};

export const PressedPhysicalState: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Kbd variant="outline">Normal</Kbd>
      <Kbd variant="outline" pressed>Presionado</Kbd>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Kbd size="xs">Esc</Kbd>
      <Kbd size="sm">Esc</Kbd>
      <Kbd size="md">Esc</Kbd>
      <Kbd size="lg">Esc</Kbd>
      <Kbd size="xl">Esc</Kbd>
    </div>
  ),
};
