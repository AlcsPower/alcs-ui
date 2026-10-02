import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from './Skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'Feedback/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Clases Tailwind para ajustar dimensiones y bordes'
    }
  }
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  render: () => <Skeleton className="h-6 w-48" />
};

export const CardSkeleton: Story = {
  render: () => (
    <div className="flex flex-col space-y-3 w-[280px] p-4 border border-mific-border rounded-lg bg-mific-surface">
      <Skeleton className="h-[125px] w-full rounded-md" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[160px]" />
      </div>
    </div>
  )
};

export const ProfileSkeleton: Story = {
  render: () => (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[150px]" />
        <Skeleton className="h-4 w-[100px]" />
      </div>
    </div>
  )
};

export const TextLines: Story = {
  render: () => (
    <div className="space-y-2 max-w-sm">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-[90%]" />
      <Skeleton className="h-4 w-[80%]" />
      <Skeleton className="h-4 w-[60%]" />
    </div>
  )
};

export const DarkMode: Story = {
  render: () => (
    <div className="dark bg-mific-surface-card p-6 rounded-lg max-w-sm space-y-4">
      <div className="flex items-center space-x-3">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>
      <Skeleton className="h-20 w-full rounded-md" />
    </div>
  )
};
