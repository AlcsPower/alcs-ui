import type { Meta, StoryObj } from '@storybook/react';
import { Avatar, AvatarImage, AvatarFallback } from './Avatar';

const meta: Meta = {
  title: 'Controles/Avatar',
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj;

export const ConImagen: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80" alt="Foto de perfil" />
      <AvatarFallback>JP</AvatarFallback>
    </Avatar>
  )
};

export const ConFallbackTipografico: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="https://imagen-inexistente.com/404.jpg" alt="Usuario sin foto" />
      <AvatarFallback>MC</AvatarFallback>
    </Avatar>
  )
};

export const GrupoDeUsuarios: Story = {
  render: () => (
    <div className="flex items-center -space-x-2">
      <Avatar className="ring-2 ring-alcspower-surface">
        <AvatarFallback>AA</AvatarFallback>
      </Avatar>
      <Avatar className="ring-2 ring-alcspower-surface">
        <AvatarFallback>MR</AvatarFallback>
      </Avatar>
      <Avatar className="ring-2 ring-alcspower-surface">
        <AvatarFallback>LG</AvatarFallback>
      </Avatar>
      <Avatar className="ring-2 ring-alcspower-surface bg-alcspower-primary text-white">
        <AvatarFallback className="bg-alcspower-primary text-white">+5</AvatarFallback>
      </Avatar>
    </div>
  )
};
