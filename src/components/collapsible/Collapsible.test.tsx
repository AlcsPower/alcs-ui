import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { axe } from 'vitest-axe';
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from './Collapsible';

describe('Collapsible Component', () => {
  it('toggles collapsible content on trigger click', async () => {
    const user = userEvent.setup();
    render(
      <Collapsible defaultOpen={false}>
        <CollapsibleTrigger asChild>
          <button type="button">Alternar Opciones Avanzadas</button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div>Contenido de opciones avanzadas</div>
        </CollapsibleContent>
      </Collapsible>
    );

    const trigger = screen.getByRole('button', { name: 'Alternar Opciones Avanzadas' });
    expect(trigger).toBeInTheDocument();

    await user.click(trigger);

    expect(screen.getByText('Contenido de opciones avanzadas')).toBeInTheDocument();
  });

  it('has no accessibility violations (axe)', async () => {
    const { container } = render(
      <Collapsible defaultOpen>
        <CollapsibleTrigger asChild>
          <button type="button">Mostrar Filtros</button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <p>Filtros aplicados al expediente</p>
        </CollapsibleContent>
      </Collapsible>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
