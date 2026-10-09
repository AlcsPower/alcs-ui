import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent
} from './Tooltip';
import { Button } from '../../forms/button';

describe('Tooltip Component', () => {
  it('renderiza trigger y contenido cuando defaultOpen es true', () => {
    render(
      <TooltipProvider>
        <Tooltip defaultOpen>
          <TooltipTrigger asChild>
            <Button>Ayuda</Button>
          </TooltipTrigger>
          <TooltipContent>Información detallada</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );

    expect(screen.getByRole('button', { name: /ayuda/i })).toBeInTheDocument();
    expect(screen.getByRole('tooltip')).toHaveTextContent(/información detallada/i);
  });

  it('no presenta violaciones de accesibilidad cuando está abierto (axe)', async () => {
    const { container } = render(
      <TooltipProvider>
        <Tooltip defaultOpen>
          <TooltipTrigger asChild>
            <Button>Acción</Button>
          </TooltipTrigger>
          <TooltipContent>Descripción accesible</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
