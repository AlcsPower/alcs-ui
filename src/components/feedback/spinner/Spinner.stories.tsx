import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from './Spinner';
import { Button } from '../../forms/button';

const meta: Meta<typeof Spinner> = {
  title: 'Feedback/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Tamaño del spinner'
    },
    label: {
      control: 'text',
      description: 'Texto accesible para lectores de pantalla (sr-only)'
    }
  }
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
  args: {
    size: 'md',
    label: 'Cargando información...'
  }
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-6 text-alcspower-primary">
      <div className="text-center">
        <Spinner size="sm" />
        <p className="text-xs text-alcspower-text-muted mt-2">sm (16px)</p>
      </div>
      <div className="text-center">
        <Spinner size="md" />
        <p className="text-xs text-alcspower-text-muted mt-2">md (20px)</p>
      </div>
      <div className="text-center">
        <Spinner size="lg" />
        <p className="text-xs text-alcspower-text-muted mt-2">lg (24px)</p>
      </div>
      <div className="text-center">
        <Spinner size="xl" />
        <p className="text-xs text-alcspower-text-muted mt-2">xl (32px)</p>
      </div>
    </div>
  )
};

export const InsideButton: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button disabled>
        <Spinner size="sm" className="mr-2" />
        Guardando...
      </Button>
      <Button variant="secondary" disabled>
        <Spinner size="sm" className="mr-2" />
        Procesando trámite
      </Button>
      <Button variant="outline" disabled>
        <Spinner size="sm" className="mr-2 text-alcspower-primary" />
        Verificando estado
      </Button>
    </div>
  )
};

export const CustomColors: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <Spinner size="lg" className="text-alcspower-primary" />
      <Spinner size="lg" className="text-emerald-600" />
      <Spinner size="lg" className="text-amber-500" />
      <Spinner size="lg" className="text-alcspower-destructive" />
    </div>
  )
};

export const DarkMode: Story = {
  render: () => (
    <div className="dark bg-alcspower-surface-card p-6 rounded-lg flex items-center gap-4 text-alcspower-text-primary">
      <Spinner size="md" className="text-alcspower-primary" />
      <span className="text-sm">Cargando datos corporativos en modo oscuro...</span>
    </div>
  )
};
