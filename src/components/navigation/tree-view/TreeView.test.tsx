import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { TreeView, type TreeNode } from './TreeView';

const mockTreeData: TreeNode[] = [
  {
    id: 'exp-2026',
    label: 'Expedientes 2026',
    children: [
      {
        id: 'exp-dga',
        label: 'Aduanas y Aranceles',
        badge: 'DGA',
        children: [
          { id: 'doc-resolucion-01', label: 'Resolución Ministerial 01-2026.pdf' },
          { id: 'doc-arancel-maiz', label: 'Aranceles Maíz y Granos Básicos.xlsx' },
        ],
      },
      {
        id: 'exp-mific',
        label: 'Comercio Exterior',
        badge: 'MIFIC',
        children: [
          { id: 'doc-cuota-azucar', label: 'Distribución Cuota Azúcar OMC.pdf' },
        ],
      },
      {
        id: 'exp-archivado',
        label: 'Expedientes Archivados',
        disabled: true,
        children: [
          { id: 'doc-antiguo', label: 'Histórico 2020.pdf' },
        ],
      },
    ],
  },
  {
    id: 'directivas',
    label: 'Normativas y Directivas Vigentes',
    children: [
      { id: 'dir-general', label: 'Directiva General de Firma Digital.pdf' },
    ],
  },
  {
    id: 'archivo-suelto',
    label: 'Manual de Identidad Visual MIFIC.pdf',
  },
];

describe('TreeView Component', () => {
  it('renderiza la estructura raíz del árbol correctamente', () => {
    render(<TreeView data={mockTreeData} aria-label="Árbol Documental" />);

    expect(screen.getByRole('tree', { name: 'Árbol Documental' })).toBeInTheDocument();
    expect(screen.getByText('Expedientes 2026')).toBeInTheDocument();
    expect(screen.getByText('Normativas y Directivas Vigentes')).toBeInTheDocument();
    expect(screen.getByText('Manual de Identidad Visual MIFIC.pdf')).toBeInTheDocument();

    // Los hijos colapsados no deben estar en el documento
    expect(screen.queryByText('Aduanas y Aranceles')).not.toBeInTheDocument();
  });

  it('expande y colapsa nodos al hacer clic en el botón chevron', async () => {
    const user = userEvent.setup();
    render(<TreeView data={mockTreeData} />);

    // Nodo inicialmente cerrado
    expect(screen.queryByText('Aduanas y Aranceles')).not.toBeInTheDocument();

    // Clic en el botón chevron de "Expedientes 2026"
    const expandBtn = screen.getByRole('button', { name: /expandir expedientes 2026/i });
    await user.click(expandBtn);

    // Ahora los hijos deben estar visibles
    expect(screen.getByText('Aduanas y Aranceles')).toBeInTheDocument();
    expect(screen.getByText('Comercio Exterior')).toBeInTheDocument();

    // Colapsar de nuevo
    const collapseBtn = screen.getByRole('button', { name: /colapsar expedientes 2026/i });
    await user.click(collapseBtn);

    expect(screen.queryByText('Aduanas y Aranceles')).not.toBeInTheDocument();
  });

  it('respeta defaultExpandedIds de forma no controlada', () => {
    render(<TreeView data={mockTreeData} defaultExpandedIds={['exp-2026', 'exp-dga']} />);

    expect(screen.getByText('Expedientes 2026')).toBeInTheDocument();
    expect(screen.getByText('Aduanas y Aranceles')).toBeInTheDocument();
    expect(screen.getByText('Resolución Ministerial 01-2026.pdf')).toBeInTheDocument();
    expect(screen.getByText('Aranceles Maíz y Granos Básicos.xlsx')).toBeInTheDocument();
  });

  it('permite selección de nodos e invoca onSelect', async () => {
    const user = userEvent.setup();
    const handleSelect = vi.fn();

    render(<TreeView data={mockTreeData} onSelect={handleSelect} />);

    const leafNode = screen.getByText('Manual de Identidad Visual MIFIC.pdf');
    await user.click(leafNode);

    expect(handleSelect).toHaveBeenCalledWith(
      'archivo-suelto',
      expect.objectContaining({ id: 'archivo-suelto' })
    );
  });

  it('maneja el modo checkboxes con selección en cascada e indeterminate', async () => {
    const user = userEvent.setup();
    const handleMultiSelect = vi.fn();

    render(
      <TreeView
        data={mockTreeData}
        showCheckboxes
        defaultExpandedIds={['exp-2026', 'exp-dga']}
        onMultiSelectChange={handleMultiSelect}
      />
    );

    // Seleccionar el nodo hoja 'Resolución Ministerial 01-2026.pdf'
    const docCheckbox = screen.getByRole('checkbox', {
      name: /seleccionar resolución ministerial 01-2026\.pdf/i,
    });
    await user.click(docCheckbox);

    expect(handleMultiSelect).toHaveBeenCalledWith(
      expect.arrayContaining(['doc-resolucion-01']),
      expect.any(Array)
    );
  });

  it('no permite interacción en nodos deshabilitados', async () => {
    const user = userEvent.setup();
    const handleSelect = vi.fn();

    render(
      <TreeView
        data={mockTreeData}
        defaultExpandedIds={['exp-2026']}
        onSelect={handleSelect}
      />
    );

    const disabledNode = screen.getByText('Expedientes Archivados');
    await user.click(disabledNode);

    expect(handleSelect).not.toHaveBeenCalled();
  });

  it('soporta navegación accesible por teclado (ArrowDown, ArrowUp, ArrowRight, ArrowLeft)', async () => {
    const user = userEvent.setup();
    render(<TreeView data={mockTreeData} aria-label="Explorador Ministerial" />);

    const tree = screen.getByRole('tree');
    tree.focus();

    // Navegar con flecha abajo
    await user.keyboard('{ArrowDown}');
    // Flecha derecha para expandir el primer nodo
    await user.keyboard('{ArrowRight}');

    expect(screen.getByText('Aduanas y Aranceles')).toBeInTheDocument();

    // Flecha izquierda para colapsar
    await user.keyboard('{ArrowLeft}');
    expect(screen.queryByText('Aduanas y Aranceles')).not.toBeInTheDocument();
  });

  it('no presenta violaciones de accesibilidad (axe-core)', async () => {
    const { container } = render(
      <TreeView
        data={mockTreeData}
        defaultExpandedIds={['exp-2026']}
        aria-label="Estructura Jerárquica Ministerial"
      />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
