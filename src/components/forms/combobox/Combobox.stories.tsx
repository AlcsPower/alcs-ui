import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Combobox, type ComboboxOption } from './Combobox';

const departamentOptions: ComboboxOption[] = [
  { value: 'managua', label: 'Managua', group: 'Pacífico' },
  { value: 'leon', label: 'León', group: 'Pacífico' },
  { value: 'chinandega', label: 'Chinandega', group: 'Pacífico' },
  { value: 'masaya', label: 'Masaya', group: 'Pacífico' },
  { value: 'matagalpa', label: 'Matagalpa', group: 'Centro-Norte' },
  { value: 'esteli', label: 'Estelí', group: 'Centro-Norte' },
  { value: 'jinotega', label: 'Jinotega', group: 'Centro-Norte' },
  { value: 'bluefields', label: 'Bluefields (RACCS)', group: 'Caribe' },
  { value: 'bilwi', label: 'Puerto Cabezas (RACCN)', group: 'Caribe' },
];

const meta: Meta<typeof Combobox> = {
  title: 'Comandos y Selección/Combobox',
  component: Combobox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Combobox>;

export const SeleccionSimple: Story = {
  render: () => {
    const [val, setVal] = React.useState<string | undefined>('managua');
    return (
      <div className="w-[360px]">
        <label className="text-xs font-bold uppercase tracking-wider text-alcspower-muted-foreground block mb-2">
          Delegación Departamental
        </label>
        <Combobox
          options={departamentOptions}
          value={val}
          onChange={setVal}
          placeholder="Seleccioná una delegación"
          clearable={true}
        />
        <p className="text-xs text-alcspower-muted-foreground mt-2">
          Seleccioná una delegación departamental
        </p>
      </div>
    );
  },
};

export const SeleccionMultiple: Story = {
  render: () => {
    const [vals, setVals] = React.useState<string[]>(['leon', 'matagalpa']);
    return (
      <div className="w-[380px]">
        <label className="text-xs font-bold uppercase tracking-wider text-alcspower-muted-foreground block mb-2">
          Sedes Asignadas para Auditoría
        </label>
        <Combobox
          multiple={true}
          options={departamentOptions}
          value={vals}
          onChange={setVals}
          placeholder="Seleccionar sedes..."
          searchPlaceholder="Buscar sedes..."
          clearable={true}
        />
        <p className="text-xs text-alcspower-muted-foreground mt-2">
          Seleccioná una o más sedes para la auditoría
        </p>
      </div>
    );
  },
};

export const VariantesTamano: Story = {
  render: () => {
    return (
      <div className="w-[360px] space-y-4">
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-alcspower-muted-foreground block mb-1.5">
            Small (sm)
          </label>
          <Combobox size="sm" options={departamentOptions} value="leon" />
        </div>
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-alcspower-muted-foreground block mb-1.5">
            Medium (md)
          </label>
          <Combobox size="md" options={departamentOptions} value="managua" />
        </div>
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-alcspower-muted-foreground block mb-1.5">
            Large (lg)
          </label>
          <Combobox size="lg" options={departamentOptions} value="matagalpa" />
        </div>
      </div>
    );
  },
};

export const ConError: Story = {
  render: () => (
    <div className="w-[360px]">
      <label className="text-xs font-bold uppercase tracking-wider text-alcspower-destructive block mb-2">
        Departamento *
      </label>
      <Combobox
        options={departamentOptions}
        hasError={true}
        placeholder="Seleccioná un departamento"
      />
      <p className="text-xs text-alcspower-destructive mt-1.5 font-medium">
        Este campo es obligatorio
      </p>
    </div>
  ),
};
