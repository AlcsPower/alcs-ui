import type { Meta, StoryObj } from '@storybook/react';
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from './Drawer';
import { Button } from '../../forms/button';
import { FileText, Share2, Download, Trash2 } from 'lucide-react';

const meta: Meta<typeof Drawer> = {
  title: 'Overlay/Drawer',
  component: Drawer,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Drawer>;

export const Default: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="primary">Abrir Drawer Inferior</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Gestión de Registro</DrawerTitle>
          <DrawerDescription>
            Acciones disponibles para la solicitud REQ-2026-N09
          </DrawerDescription>
        </DrawerHeader>
        <div className="py-2 space-y-2 max-w-sm mx-auto">
          <Button variant="outline" className="w-full justify-start gap-3">
            <FileText className="h-4 w-4 text-alcspower-primary" />
            <span>Ver Documentación Adjunta</span>
          </Button>
          <Button variant="outline" className="w-full justify-start gap-3">
            <Share2 className="h-4 w-4 text-alcspower-secondary" />
            <span>Compartir con Operaciones</span>
          </Button>
          <Button variant="outline" className="w-full justify-start gap-3">
            <Download className="h-4 w-4 text-alcspower-info" />
            <span>Descargar Constancia en PDF</span>
          </Button>
          <Button variant="destructive" className="w-full justify-start gap-3">
            <Trash2 className="h-4 w-4" />
            <span>Archivar Registro</span>
          </Button>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="ghost">Cerrar</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};
