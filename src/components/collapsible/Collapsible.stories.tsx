import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from './Collapsible';
import { Button } from '../button';
import { ChevronsUpDown, Filter } from 'lucide-react';
import { Badge } from '../badge';

const meta: Meta<typeof Collapsible> = {
  title: 'Data Display/Collapsible',
  component: Collapsible,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Collapsible>;

export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="w-[380px] space-y-2 border border-alcspower-border rounded-alcspower-lg p-4 bg-alcspower-surface shadow-alcspower-sm"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-alcspower-primary" />
            <h4 className="text-sm font-semibold text-alcspower-text-primary">
              Filtros Avanzados
            </h4>
          </div>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <ChevronsUpDown className="h-4 w-4" />
              <span className="sr-only">Alternar filtros</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline">2026</Badge>
          <Badge variant="secondary">MIFIC Central</Badge>
        </div>
        <CollapsibleContent className="space-y-2 pt-2">
          <div className="rounded-alcspower-md border border-alcspower-border px-3 py-2 text-xs text-alcspower-text-secondary bg-alcspower-surface-muted">
            Filtrar por tipo de industria: Manufactura y Agroexportación
          </div>
          <div className="rounded-alcspower-md border border-alcspower-border px-3 py-2 text-xs text-alcspower-text-secondary bg-alcspower-surface-muted">
            Estado de resolución: Concedido con observaciones
          </div>
        </CollapsibleContent>
      </Collapsible>
    );
  },
};
