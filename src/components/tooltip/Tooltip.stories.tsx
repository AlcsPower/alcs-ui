import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from './Tooltip';
import { Button } from '../button';
import { HelpCircle, Download } from 'lucide-react';

const meta: Meta = {
  title: 'Overlays/Tooltip',
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="icon" aria-label="Ayuda del sistema">
            <HelpCircle className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Consulte los requisitos vigentes para este trámite</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
};

export const EnBotonDeAccion: Story = {
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="primary">
            <Download className="h-4 w-4" /> Exportar Registro
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>Descarga el archivo consolidado en formato PDF firmado digitalmente</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
};
