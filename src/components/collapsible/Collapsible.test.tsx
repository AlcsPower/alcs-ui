import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { axe } from 'vitest-axe';
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
  CollapsibleGroup
} from './Collapsible';

describe('Collapsible Component', () => {
  it('toggles collapsible content on trigger click', async () => {
    const user = userEvent.setup();
    render(
      <Collapsible defaultOpen={false}>
        <CollapsibleTrigger>Filtros Avanzados</CollapsibleTrigger>
        <CollapsibleContent>
          <div>Contenido de opciones avanzadas</div>
        </CollapsibleContent>
      </Collapsible>
    );

    const trigger = screen.getByRole('button', { name: /Filtros Avanzados/i });
    expect(trigger).toBeInTheDocument();

    await user.click(trigger);

    expect(screen.getByText('Contenido de opciones avanzadas')).toBeInTheDocument();
  });

  it('renders contextual slots: icon, subtitle and toggleText', () => {
    render(
      <Collapsible defaultOpen={false}>
        <CollapsibleTrigger
          icon={<span data-testid="test-icon">🔍</span>}
          subtitle="Personalizá los criterios"
          toggleText="Mostrar"
        >
          Filtros Avanzados
        </CollapsibleTrigger>
        <CollapsibleContent>
          <p>Opciones filtradas</p>
        </CollapsibleContent>
      </Collapsible>
    );

    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    expect(screen.getByText('Filtros Avanzados')).toBeInTheDocument();
    expect(screen.getByText('Personalizá los criterios')).toBeInTheDocument();
    expect(screen.getByText('Mostrar')).toBeInTheDocument();
  });

  it('supports variants and CollapsibleGroup', () => {
    const { container } = render(
      <CollapsibleGroup variant="bordered">
        <Collapsible variant="bordered">
          <CollapsibleTrigger>Item 1</CollapsibleTrigger>
          <CollapsibleContent>Contenido 1</CollapsibleContent>
        </Collapsible>
        <Collapsible variant="bordered">
          <CollapsibleTrigger>Item 2</CollapsibleTrigger>
          <CollapsibleContent>Contenido 2</CollapsibleContent>
        </Collapsible>
      </CollapsibleGroup>
    );

    expect(container.firstChild).toHaveClass('divide-y');
    expect(screen.getByRole('button', { name: /Item 1/i })).toBeInTheDocument();
  });

  it('disables trigger when collapsible is disabled', async () => {
    const user = userEvent.setup();
    render(
      <Collapsible disabled>
        <CollapsibleTrigger>Sección Bloqueada</CollapsibleTrigger>
        <CollapsibleContent>Contenido Privado</CollapsibleContent>
      </Collapsible>
    );

    const trigger = screen.getByRole('button', { name: /Sección Bloqueada/i });
    expect(trigger).toBeDisabled();

    await user.click(trigger);
    expect(screen.queryByText('Contenido Privado')).not.toBeInTheDocument();
  });

  it('has no accessibility violations (axe)', async () => {
    const { container } = render(
      <Collapsible defaultOpen>
        <CollapsibleTrigger subtitle="Guía de usuario" toggleText="Ocultar">
          Instrucciones
        </CollapsibleTrigger>
        <CollapsibleContent>
          <p>Instrucciones de uso accesible según WCAG.</p>
        </CollapsibleContent>
      </Collapsible>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
