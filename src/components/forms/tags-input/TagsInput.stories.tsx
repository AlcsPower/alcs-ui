import type { Meta, StoryObj } from '@storybook/react';
import { TagsInput } from './TagsInput';

const meta: Meta<typeof TagsInput> = {
  title: 'Formularios/TagsInput',
  component: TagsInput,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TagsInput>;

export const Default: Story = {
  args: {
    placeholder: 'Agregar etiquetas...',
    defaultValue: ['React', 'TypeScript', 'Tailwind'],
  },
};

export const ConLimite: Story = {
  args: {
    placeholder: 'Máximo 4 etiquetas...',
    defaultValue: ['Frontend', 'UI/UX'],
    maxTags: 4,
    clearable: true,
  },
};

export const FormaSquircle: Story = {
  args: {
    placeholder: 'Etiquetas con silueta squircle...',
    defaultValue: ['Next.js', 'Vite', 'Turbopack'],
    shape: 'squircle',
    clearable: true,
  },
};

export const ConError: Story = {
  args: {
    defaultValue: ['Etiqueta Inválida'],
    hasError: true,
  },
};

export const Deshabilitado: Story = {
  args: {
    defaultValue: ['Solo lectura', 'Bloqueado'],
    disabled: true,
  },
};
