import type { Meta, StoryObj } from '@storybook/react';
import { Field, FieldLabel, FieldControl, FieldHint, FieldError } from './index';
import { Input } from '../input';
import { Textarea } from '../textarea';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from '../select';

const meta: Meta<typeof Field> = {
  title: 'Formularios/Field',
  component: Field,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof Field>;

export const ConInput: Story = {
  render: () => (
    <div className="w-80">
      <Field required>
        <FieldLabel>Cédula de Identidad</FieldLabel>
        <FieldControl asChild>
          <Input placeholder="001-000000-0000A" />
        </FieldControl>
        <FieldHint>Formato oficial de 14 caracteres</FieldHint>
      </Field>
    </div>
  )
};

export const ConError: Story = {
  render: () => (
    <div className="w-80">
      <Field hasError required>
        <FieldLabel>Correo Electrónico</FieldLabel>
        <FieldControl asChild>
          <Input type="email" defaultValue="invalido@dominio" />
        </FieldControl>
        <FieldError>Ingrese una dirección de correo institucional válida</FieldError>
      </Field>
    </div>
  )
};

export const ConTextarea: Story = {
  render: () => (
    <div className="w-80">
      <Field>
        <FieldLabel>Descripción del Trámite</FieldLabel>
        <FieldControl asChild>
          <Textarea placeholder="Describa brevemente el propósito de su solicitud..." />
        </FieldControl>
        <FieldHint>Máximo 500 caracteres permitidos</FieldHint>
      </Field>
    </div>
  )
};

export const ConSelect: Story = {
  render: () => (
    <div className="w-80">
      <Field required>
        <FieldLabel>Departamento</FieldLabel>
        <Select>
          <FieldControl asChild>
            <SelectTrigger>
              <SelectValue placeholder="Seleccione un departamento" />
            </SelectTrigger>
          </FieldControl>
          <SelectContent>
            <SelectItem value="managua">Managua</SelectItem>
            <SelectItem value="leon">León</SelectItem>
            <SelectItem value="matagalpa">Matagalpa</SelectItem>
            <SelectItem value="esteli">Estelí</SelectItem>
          </SelectContent>
        </Select>
        <FieldHint>Delegación territorial correspondiente</FieldHint>
      </Field>
    </div>
  )
};

export const Tamanios: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <Field size="sm">
        <FieldLabel>Tamaño Pequeño (sm)</FieldLabel>
        <FieldControl asChild>
          <Input placeholder="Input sm (h-8)" />
        </FieldControl>
      </Field>

      <Field size="md">
        <FieldLabel>Tamaño Mediano (md - default)</FieldLabel>
        <FieldControl asChild>
          <Input placeholder="Input md (h-10)" />
        </FieldControl>
      </Field>

      <Field size="lg">
        <FieldLabel>Tamaño Grande (lg)</FieldLabel>
        <FieldControl asChild>
          <Input placeholder="Input lg (h-12)" />
        </FieldControl>
      </Field>
    </div>
  )
};

export const Deshabilitado: Story = {
  render: () => (
    <div className="w-80">
      <Field disabled>
        <FieldLabel>Código de Expediente</FieldLabel>
        <FieldControl asChild>
          <Input defaultValue="EXP-2026-9999" />
        </FieldControl>
        <FieldHint>Este expediente está bloqueado para edición</FieldHint>
      </Field>
    </div>
  )
};
