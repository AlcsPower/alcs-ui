import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { axe } from 'vitest-axe';
import { Grid, GridItem } from './Grid';

describe('Grid Component', () => {
  it('renderiza elementos hijos en una cuadrícula', () => {
    render(
      <Grid data-testid="grid">
        <div>Col 1</div>
        <div>Col 2</div>
      </Grid>
    );
    expect(screen.getByTestId('grid')).toBeInTheDocument();
    expect(screen.getByText('Col 1')).toBeInTheDocument();
    expect(screen.getByText('Col 2')).toBeInTheDocument();
  });

  it('aplica columnas y espaciados base', () => {
    render(
      <Grid cols={3} gap="lg" data-testid="grid-3">
        <div>A</div>
        <div>B</div>
        <div>C</div>
      </Grid>
    );
    const el = screen.getByTestId('grid-3');
    expect(el).toHaveClass('grid-cols-3');
    expect(el).toHaveClass('gap-6');
  });

  it('soporta columnas responsivas por quiebre (sm, md, lg, xl)', () => {
    render(
      <Grid cols={1} colsSm={2} colsMd={3} colsLg={4} data-testid="grid-resp">
        <div>Elemento</div>
      </Grid>
    );
    const el = screen.getByTestId('grid-resp');
    expect(el).toHaveClass('grid-cols-1');
    expect(el).toHaveClass('sm:grid-cols-2');
    expect(el).toHaveClass('md:grid-cols-3');
    expect(el).toHaveClass('lg:grid-cols-4');
  });

  it('GridItem aplica colSpan y rowSpan correctamente', () => {
    render(
      <Grid cols={4}>
        <GridItem colSpan={2} rowSpan={2} data-testid="item-span">
          Destacado
        </GridItem>
        <GridItem colSpan="full" data-testid="item-full">
          Banner
        </GridItem>
      </Grid>
    );
    expect(screen.getByTestId('item-span')).toHaveClass('col-span-2');
    expect(screen.getByTestId('item-span')).toHaveClass('row-span-2');
    expect(screen.getByTestId('item-full')).toHaveClass('col-span-full');
  });

  it('no presenta violaciones de accesibilidad (axe-core)', async () => {
    const { container } = render(
      <Grid cols={2} role="region" aria-label="Tarjetas informativas">
        <div>Tarjeta 1</div>
        <div>Tarjeta 2</div>
      </Grid>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
