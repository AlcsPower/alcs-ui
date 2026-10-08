import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { axe } from 'vitest-axe';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  AccordionActions,
  AccordionActionButton
} from './Accordion';

describe('Accordion Component', () => {
  it('renders accordion items and expands on trigger click', async () => {
    const user = userEvent.setup();
    render(
      <Accordion type="single" collapsible defaultValue="item-1">
        <AccordionItem value="item-1">
          <AccordionTrigger>Sección 1: Información</AccordionTrigger>
          <AccordionContent>Detalles de la sección 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Sección 2: Requisitos</AccordionTrigger>
          <AccordionContent>Detalles de la sección 2</AccordionContent>
        </AccordionItem>
      </Accordion>
    );

    const trigger1 = screen.getByRole('button', { name: 'Sección 1: Información' });
    const trigger2 = screen.getByRole('button', { name: 'Sección 2: Requisitos' });

    expect(trigger1).toBeInTheDocument();
    expect(screen.getByText('Detalles de la sección 1')).toBeInTheDocument();

    await user.click(trigger2);

    expect(await screen.findByText('Detalles de la sección 2')).toBeInTheDocument();
  });

  it('renders contextual slots: icon, subtitle, badge and actions', async () => {
    render(
      <Accordion type="single" collapsible defaultValue="item-1">
        <AccordionItem value="item-1">
          <AccordionTrigger
            icon={<span data-testid="test-icon">📁</span>}
            subtitle="Trámites · 3 min de lectura"
            badge="FAQ"
          >
            ¿Cómo solicitar certificación de origen?
          </AccordionTrigger>
          <AccordionContent>
            <p>Contenido del trámite</p>
            <AccordionActions>
              <AccordionActionButton>Iniciar trámite</AccordionActionButton>
            </AccordionActions>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );

    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    expect(screen.getByText('¿Cómo solicitar certificación de origen?')).toBeInTheDocument();
    expect(screen.getByText('Trámites · 3 min de lectura')).toBeInTheDocument();
    expect(screen.getByText('FAQ')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Iniciar trámite' })).toBeInTheDocument();
  });

  it('supports multiple expanded items simultaneously', async () => {
    const user = userEvent.setup();
    render(
      <Accordion type="multiple">
        <AccordionItem value="item-1">
          <AccordionTrigger>Item A</AccordionTrigger>
          <AccordionContent>Contenido A</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Item B</AccordionTrigger>
          <AccordionContent>Contenido B</AccordionContent>
        </AccordionItem>
      </Accordion>
    );

    await user.click(screen.getByRole('button', { name: 'Item A' }));
    await user.click(screen.getByRole('button', { name: 'Item B' }));

    expect(screen.getByText('Contenido A')).toBeInTheDocument();
    expect(screen.getByText('Contenido B')).toBeInTheDocument();
  });

  it('supports bordered and ghost variants and sizes', () => {
    const { rerender, container } = render(
      <Accordion type="single" variant="bordered" size="sm">
        <AccordionItem value="item-1">
          <AccordionTrigger>Variante Bordered</AccordionTrigger>
          <AccordionContent>Contenido</AccordionContent>
        </AccordionItem>
      </Accordion>
    );

    expect(container.firstChild).toHaveClass('divide-y');

    rerender(
      <Accordion type="single" variant="ghost" size="lg">
        <AccordionItem value="item-1">
          <AccordionTrigger>Variante Ghost</AccordionTrigger>
          <AccordionContent>Contenido</AccordionContent>
        </AccordionItem>
      </Accordion>
    );

    expect(screen.getByRole('button', { name: 'Variante Ghost' })).toBeInTheDocument();
  });

  it('handles disabled items appropriately', async () => {
    const user = userEvent.setup();
    render(
      <Accordion type="single">
        <AccordionItem value="item-1" disabled>
          <AccordionTrigger>Sección Bloqueada</AccordionTrigger>
          <AccordionContent>Contenido Oculto</AccordionContent>
        </AccordionItem>
      </Accordion>
    );

    const trigger = screen.getByRole('button', { name: 'Sección Bloqueada' });
    expect(trigger).toBeDisabled();

    await user.click(trigger);
    expect(screen.queryByText('Contenido Oculto')).not.toBeInTheDocument();
  });

  it('has no accessibility violations (axe)', async () => {
    const { container } = render(
      <Accordion type="single" collapsible defaultValue="a11y">
        <AccordionItem value="a11y">
          <AccordionTrigger
            subtitle="Guía institucional"
            badge="Info"
          >
            Pregunta Frecuente
          </AccordionTrigger>
          <AccordionContent>
            Respuesta accesible según norma WCAG.
            <AccordionActions>
              <AccordionActionButton>Ver más</AccordionActionButton>
            </AccordionActions>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
