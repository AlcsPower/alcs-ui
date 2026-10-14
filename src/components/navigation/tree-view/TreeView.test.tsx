import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { TreeView, type TreeNode } from './TreeView';

const mockTreeData: TreeNode[] = [
  {
    id: 'exp-2026',
    label: 'Registros 2026',
    children: [
      {
        id: 'exp-dga',
        label: 'Aduanas y Aranceles',
        badge: 'Operaciones',
        children: [
          { id: 'doc-resolucion-01', label: 'Resolución Corporativa 01-2026.pdf' },
          { id: 'doc-arancel-maiz', label: 'Aranceles Maíz y Granos Básicos.xlsx' },
        ],
      },
      {
        id: 'exp-corp',
        label: 'Comercio Exterior',
        badge: 'Corp',
        children: [
          { id: 'doc-cuota-azucar', label: 'Distribución Cuota Azúcar OMC.pdf' },
        ],
      },
      {
        id: 'exp-archivado',
        label: 'Registros Archivados',
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
    label: 'Manual de Identidad Visual.pdf',
  },
];

describe('TreeView Component', () => {
  it('renderiza la estructura raíz del árbol correctamente', () => {
    render(<TreeView data={mockTreeData} aria-label="Árbol Documental" />);

    expect(screen.getByRole('tree', { name: 'Árbol Documental' })).toBeInTheDocument();
    expect(screen.getByText('Registros 2026')).toBeInTheDocument();
    expect(screen.getByText('Normativas y Directivas Vigentes')).toBeInTheDocument();
    expect(screen.getByText('Manual de Identidad Visual.pdf')).toBeInTheDocument();

    // Los hijos colapsados no deben estar en el documento
    expect(screen.queryByText('Aduanas y Aranceles')).not.toBeInTheDocument();
  });

  it('expande y colapsa nodos al hacer clic en el botón chevron', async () => {
    const user = userEvent.setup();
    render(<TreeView data={mockTreeData} />);

    // Nodo inicialmente cerrado
    expect(screen.queryByText('Aduanas y Aranceles')).not.toBeInTheDocument();

    // Clic en el botón chevron de "Registros 2026"
    const expandBtn = screen.getByRole('button', { name: /expandir registros 2026/i });
    await user.click(expandBtn);

    // Ahora los hijos deben estar visibles
    expect(screen.getByText('Aduanas y Aranceles')).toBeInTheDocument();
    expect(screen.getByText('Comercio Exterior')).toBeInTheDocument();

    // Colapsar de nuevo
    const collapseBtn = screen.getByRole('button', { name: /colapsar registros 2026/i });
    await user.click(collapseBtn);

    expect(screen.queryByText('Aduanas y Aranceles')).not.toBeInTheDocument();
  });

  it('respeta defaultExpandedIds de forma no controlada', () => {
    render(<TreeView data={mockTreeData} defaultExpandedIds={['exp-2026', 'exp-dga']} />);

    expect(screen.getByText('Registros 2026')).toBeInTheDocument();
    expect(screen.getByText('Aduanas y Aranceles')).toBeInTheDocument();
    expect(screen.getByText('Resolución Corporativa 01-2026.pdf')).toBeInTheDocument();
    expect(screen.getByText('Aranceles Maíz y Granos Básicos.xlsx')).toBeInTheDocument();
  });

  it('permite selección de nodos e invoca onSelect', async () => {
    const user = userEvent.setup();
    const handleSelect = vi.fn();

    render(<TreeView data={mockTreeData} onSelect={handleSelect} />);

    const leafNode = screen.getByText('Manual de Identidad Visual.pdf');
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

    // Seleccionar el nodo hoja 'Resolución Corporativa 01-2026.pdf'
    const docCheckbox = screen.getByRole('checkbox', {
      name: /seleccionar resolución corporativa 01-2026\.pdf/i,
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

    const disabledNode = screen.getByText('Registros Archivados');
    await user.click(disabledNode);

    expect(handleSelect).not.toHaveBeenCalled();
  });

  it('soporta navegación accesible por teclado (ArrowDown, ArrowUp, ArrowRight, ArrowLeft)', async () => {
    const user = userEvent.setup();
    render(<TreeView data={mockTreeData} aria-label="Explorador Documental" />);

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

  it('permite expandir y contraer todo el árbol con el botón toggle en la barra de herramientas', async () => {
    const user = userEvent.setup();
    const handleExpandAll = vi.fn();
    const handleCollapseAll = vi.fn();

    render(
      <TreeView
        data={mockTreeData}
        showToolbar
        toolbarTitle="Explorador Documental"
        onExpandAll={handleExpandAll}
        onCollapseAll={handleCollapseAll}
      />
    );

    expect(screen.getByText('Explorador Documental')).toBeInTheDocument();

    // Botón inicial: "Expandir todo"
    const toggleBtn = screen.getByRole('button', { name: /expandir todo/i });
    expect(toggleBtn).toBeInTheDocument();
    expect(screen.queryByText('Aduanas y Aranceles')).not.toBeInTheDocument();
    expect(screen.queryByText('Resolución Corporativa 01-2026.pdf')).not.toBeInTheDocument();

    // Clic en "Expandir todo"
    await user.click(toggleBtn);
    expect(handleExpandAll).toHaveBeenCalled();

    // Todo el árbol debe estar expandido en todos los niveles
    expect(screen.getByText('Aduanas y Aranceles')).toBeInTheDocument();
    expect(screen.getByText('Resolución Corporativa 01-2026.pdf')).toBeInTheDocument();
    expect(screen.getByText('Comercio Exterior')).toBeInTheDocument();
    expect(screen.getByText('Distribución Cuota Azúcar OMC.pdf')).toBeInTheDocument();
    expect(screen.getByText('Directiva General de Firma Digital.pdf')).toBeInTheDocument();

    // El botón debe haber cambiado a "Contraer todo"
    const collapseBtn = screen.getByRole('button', { name: /contraer todo/i });
    expect(collapseBtn).toBeInTheDocument();

    // Clic en "Contraer todo"
    await user.click(collapseBtn);
    expect(handleCollapseAll).toHaveBeenCalled();

    // Todo debe colapsarse
    expect(screen.queryByText('Aduanas y Aranceles')).not.toBeInTheDocument();
    expect(screen.queryByText('Directiva General de Firma Digital.pdf')).not.toBeInTheDocument();
  });

  it('soporta toolbarLayout="pair" con botones separados y estados deshabilitados contextuales', async () => {
    const user = userEvent.setup();

    render(<TreeView data={mockTreeData} showToolbar toolbarLayout="pair" />);

    const expandBtn = screen.getByRole('button', { name: /expandir todo/i });
    const collapseBtn = screen.getByRole('button', { name: /contraer todo/i });

    expect(expandBtn).toBeEnabled();
    expect(collapseBtn).toBeDisabled(); // Inicialmente colapsado

    // Expandir todo
    await user.click(expandBtn);
    expect(screen.getByText('Resolución Corporativa 01-2026.pdf')).toBeInTheDocument();
    expect(expandBtn).toBeDisabled();
    expect(collapseBtn).toBeEnabled();

    // Contraer todo
    await user.click(collapseBtn);
    expect(screen.queryByText('Resolución Corporativa 01-2026.pdf')).not.toBeInTheDocument();
    expect(expandBtn).toBeEnabled();
    expect(collapseBtn).toBeDisabled();
  });

  it('soporta atajos de teclado Alt+ArrowRight y Alt+ArrowLeft para expandir y contraer todo', async () => {
    const user = userEvent.setup();
    render(<TreeView data={mockTreeData} />);

    const tree = screen.getByRole('tree');
    tree.focus();

    // Alt + Flecha Derecha expande todo
    await user.keyboard('{Alt>}{ArrowRight}{/Alt}');
    expect(screen.getByText('Resolución Corporativa 01-2026.pdf')).toBeInTheDocument();
    expect(screen.getByText('Distribución Cuota Azúcar OMC.pdf')).toBeInTheDocument();

    // Alt + Flecha Izquierda contrae todo
    await user.keyboard('{Alt>}{ArrowLeft}{/Alt}');
    expect(screen.queryByText('Resolución Corporativa 01-2026.pdf')).not.toBeInTheDocument();
    expect(screen.queryByText('Distribución Cuota Azúcar OMC.pdf')).not.toBeInTheDocument();
  });

  it('no presenta violaciones de accesibilidad (axe-core)', async () => {
    const { container } = render(
      <TreeView
        data={mockTreeData}
        defaultExpandedIds={['exp-2026']}
        showToolbar
        toolbarTitle="Explorador Documental"
        aria-label="Estructura Jerárquica Documental"
      />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

