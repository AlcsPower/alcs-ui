import type { Meta, StoryObj } from '@storybook/react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut
} from './DropdownMenu';
import { Button } from '../../forms/button';
import { MoreHorizontal, FileText, Download, Trash2, Edit } from 'lucide-react';

const meta: Meta = {
  title: 'Overlays/DropdownMenu',
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Acciones de expediente">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>Acciones Disponibles</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <FileText className="mr-2 h-4 w-4" /> Ver Expediente
          <DropdownMenuShortcut>⌘V</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Edit className="mr-2 h-4 w-4" /> Editar Datos
          <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Download className="mr-2 h-4 w-4" /> Descargar Constancia
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-alcspower-danger focus:bg-alcspower-danger-subtle focus:text-alcspower-danger">
          <Trash2 className="mr-2 h-4 w-4" /> Anular Solicitud
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
};
