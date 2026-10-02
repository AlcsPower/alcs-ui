import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from './Card';
import { Button } from '../button';

describe('Card Component', () => {
  it('renderiza la estructura compuesta de Card', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Expediente #1024</CardTitle>
          <CardDescription>Trámite de registro de marca</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Estado actual: En revisión técnica.</p>
        </CardContent>
        <CardFooter>
          <Button size="sm">Ver Detalles</Button>
        </CardFooter>
      </Card>
    );

    expect(screen.getByText(/expediente #1024/i)).toBeInTheDocument();
    expect(screen.getByText(/trámite de registro de marca/i)).toBeInTheDocument();
    expect(screen.getByText(/estado actual: en revisión técnica\./i)).toBeInTheDocument();
  });

  it('no presenta violaciones de accesibilidad (axe)', async () => {
    const { container } = render(
      <Card>
        <CardHeader>
          <CardTitle>Título</CardTitle>
        </CardHeader>
        <CardContent>Contenido de prueba</CardContent>
      </Card>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
