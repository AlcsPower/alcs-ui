import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './Tabs';

describe('Tabs Component', () => {
  it('permite cambiar entre pestañas', async () => {
    const user = userEvent.setup();
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Pestaña 1</TabsTrigger>
          <TabsTrigger value="tab2">Pestaña 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Contenido de la primera pestaña</TabsContent>
        <TabsContent value="tab2">Contenido de la segunda pestaña</TabsContent>
      </Tabs>
    );

    expect(screen.getByText(/contenido de la primera pestaña/i)).toBeInTheDocument();
    expect(screen.queryByText(/contenido de la segunda pestaña/i)).not.toBeInTheDocument();

    await user.click(screen.getByRole('tab', { name: /pestaña 2/i }));
    expect(screen.queryByText(/contenido de la primera pestaña/i)).not.toBeInTheDocument();
    expect(screen.getByText(/contenido de la segunda pestaña/i)).toBeInTheDocument();
  });

  it('no presenta violaciones de accesibilidad (axe)', async () => {
    const { container } = render(
      <Tabs defaultValue="t1">
        <TabsList aria-label="Navegación de secciones">
          <TabsTrigger value="t1">General</TabsTrigger>
          <TabsTrigger value="t2">Documentos</TabsTrigger>
        </TabsList>
        <TabsContent value="t1">Info general</TabsContent>
        <TabsContent value="t2">Docs</TabsContent>
      </Tabs>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
