import type { Meta, StoryObj } from '@storybook/react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectGroup,
  SelectSeparator
} from './Select';
import { Label } from '../label';

const meta: Meta = {
  title: 'Controles/Select',
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <div className="w-72">
      <Select defaultValue="exportacion">
        <SelectTrigger aria-label="Tipo de trámite">
          <SelectValue placeholder="Seleccione un trámite..." />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Comercio Exterior</SelectLabel>
            <SelectItem value="exportacion">Licencia de Exportación</SelectItem>
            <SelectItem value="importacion">Permiso de Importación</SelectItem>
            <SelectItem value="contingente">Contingente Arancelario</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Propiedad Intelectual</SelectLabel>
            <SelectItem value="marca">Registro de Marca</SelectItem>
            <SelectItem value="patente">Solicitud de Patente</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
};

export const ConEtiquetaYError: Story = {
  render: () => (
    <div className="grid w-72 gap-1.5">
      <Label htmlFor="dep" required>Departamento Destino</Label>
      <Select>
        <SelectTrigger id="dep" hasError aria-label="Departamento destino">
          <SelectValue placeholder="Seleccione un departamento..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="managua">Managua</SelectItem>
          <SelectItem value="leon">León</SelectItem>
          <SelectItem value="matagalpa">Matagalpa</SelectItem>
          <SelectItem value="esteli">Estelí</SelectItem>
        </SelectContent>
      </Select>
      <span className="text-xs text-alcspower-danger">Debe seleccionar un departamento válido.</span>
    </div>
  )
};

export const Deshabilitado: Story = {
  render: () => (
    <div className="w-72">
      <Select disabled defaultValue="fijo">
        <SelectTrigger aria-label="Trámite bloqueado">
          <SelectValue placeholder="Trámite no disponible" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="fijo">Trámite Bloqueado</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
};
