import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { axe } from 'vitest-axe';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
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

  it('has no accessibility violations (axe)', async () => {
    const { container } = render(
      <Accordion type="single" collapsible defaultValue="a11y">
        <AccordionItem value="a11y">
          <AccordionTrigger>Pregunta Frecuente</AccordionTrigger>
          <AccordionContent>Respuesta accesible según norma WCAG.</AccordionContent>
        </AccordionItem>
      </Accordion>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
