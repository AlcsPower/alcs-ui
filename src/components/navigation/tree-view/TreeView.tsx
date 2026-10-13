import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import {
  ChevronRight,
  Folder,
  FolderOpen,
  FileText,
} from 'lucide-react';
import { cn } from '../../../lib/utils';
import { Checkbox } from '../../forms/checkbox';
import { Spinner } from '../../feedback/spinner';

export interface TreeNode {
  /** Identificador único del nodo */
  id: string;
  /** Texto o contenido visible del nodo */
  label: React.ReactNode;
  /** Icono personalizado o render prop según el estado */
  icon?: React.ReactNode | ((state: { isOpen: boolean; isSelected: boolean }) => React.ReactNode);
  /** Nodos secundarios jerárquicos */
  children?: TreeNode[];
  /** Deshabilita la interacción con el nodo */
  disabled?: boolean;
  /** Distintivo o badge contextual a la derecha */
  badge?: React.ReactNode;
  /** Acciones secundarias a la derecha (ej. botones, menús) */
  actions?: React.ReactNode;
  /** Estado de carga asíncrona de hijos */
  isLoading?: boolean;
  /** Datos o metadatos arbitrarios asociados al nodo */
  data?: unknown;
}

export const treeViewVariants = cva('w-full select-none font-sans text-alcspower-foreground', {
  variants: {
    size: {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export interface TreeViewProps
  extends Omit<React.HTMLAttributes<HTMLUListElement>, 'onSelect' | 'defaultValue'>,
    VariantProps<typeof treeViewVariants> {
  /** Estructura de datos jerárquica del árbol */
  data: TreeNode[];
  /** Identificadores de nodos expandidos (controlado) */
  expandedIds?: string[];
  /** Identificadores de nodos expandidos por defecto (no controlado) */
  defaultExpandedIds?: string[];
  /** Callback invocado cuando cambia el conjunto de nodos expandidos */
  onExpandedChange?: (expandedIds: string[]) => void;
  /** Identificador del nodo seleccionado (modo selección única, controlado) */
  selectedId?: string;
  /** Identificador del nodo seleccionado por defecto (no controlado) */
  defaultSelectedId?: string;
  /** Identificadores seleccionados (modo multi-selección, controlado) */
  selectedIds?: string[];
  /** Identificadores seleccionados por defecto (modo multi-selección, no controlado) */
  defaultSelectedIds?: string[];
  /** Callback invocado al seleccionar un nodo individual */
  onSelect?: (id: string, node: TreeNode) => void;
  /** Callback invocado cuando cambian los nodos seleccionados en multi-selección */
  onMultiSelectChange?: (selectedIds: string[], nodes: TreeNode[]) => void;
  /** Habilita multi-selección mediante checkboxes */
  showCheckboxes?: boolean;
  /** Cascada automática de selección en checkboxes (padre selecciona hijos) */
  cascadeCheckboxes?: boolean;
  /** Muestra líneas guía sutiles conectando niveles de la jerarquía */
  showGuideLines?: boolean;
  /** Muestra iconos predeterminados de carpeta/archivo si no se especifica icono */
  showDefaultIcons?: boolean;
  /** Permite expandir nodos haciendo clic en todo el elemento, no solo en el chevron */
  expandOnClick?: boolean;
  /** Render prop personalizado para el contenido de cada nodo */
  renderNodeContent?: (node: TreeNode, state: { isOpen: boolean; isSelected: boolean; isFocused: boolean }) => React.ReactNode;
}

export const TreeView = React.forwardRef<HTMLUListElement, TreeViewProps>(
  (
    {
      data = [],
      expandedIds: controlledExpandedIds,
      defaultExpandedIds = [],
      onExpandedChange,
      selectedId: controlledSelectedId,
      defaultSelectedId,
      selectedIds: controlledSelectedIds,
      defaultSelectedIds = [],
      onSelect,
      onMultiSelectChange,
      showCheckboxes = false,
      cascadeCheckboxes = true,
      showGuideLines = true,
      showDefaultIcons = true,
      expandOnClick = false,
      renderNodeContent,
      size = 'md',
      className,
      ...restProps
    },
    ref
  ) => {
    // Estado de expansión
    const isExpandedControlled = controlledExpandedIds !== undefined;
    const [internalExpandedIds, setInternalExpandedIds] = React.useState<string[]>(
      defaultExpandedIds
    );
    const expandedIds = isExpandedControlled
      ? controlledExpandedIds || []
      : internalExpandedIds;

    const updateExpandedIds = React.useCallback(
      (newExpanded: string[]) => {
        if (!isExpandedControlled) {
          setInternalExpandedIds(newExpanded);
        }
        onExpandedChange?.(newExpanded);
      },
      [isExpandedControlled, onExpandedChange]
    );

    // Estado de selección única
    const isSingleControlled = controlledSelectedId !== undefined;
    const [internalSelectedId, setInternalSelectedId] = React.useState<string | undefined>(
      defaultSelectedId
    );
    const selectedId = isSingleControlled ? controlledSelectedId : internalSelectedId;

    // Estado de selección múltiple (checkboxes)
    const isMultiControlled = controlledSelectedIds !== undefined;
    const [internalSelectedIds, setInternalSelectedIds] = React.useState<string[]>(
      defaultSelectedIds
    );
    const selectedIds = isMultiControlled
      ? controlledSelectedIds || []
      : internalSelectedIds;

    // Foco activo para navegación por teclado WAI-ARIA
    const [focusedId, setFocusedId] = React.useState<string | null>(null);

    // Mapeo plano de todos los nodos para búsqueda y navegación
    const nodeMap = React.useMemo(() => {
      const map = new Map<string, { node: TreeNode; parentId: string | null }>();
      const traverse = (nodes: TreeNode[], parentId: string | null) => {
        nodes.forEach((n) => {
          map.set(n.id, { node: n, parentId });
          if (n.children && n.children.length > 0) {
            traverse(n.children, n.id);
          }
        });
      };
      traverse(data, null);
      return map;
    }, [data]);

    // Lista plana de nodos visibles actualmente (según estado de expansión)
    const visibleNodes = React.useMemo(() => {
      const visible: TreeNode[] = [];
      const traverse = (nodes: TreeNode[]) => {
        nodes.forEach((node) => {
          visible.push(node);
          if (node.children && node.children.length > 0 && expandedIds.includes(node.id)) {
            traverse(node.children);
          }
        });
      };
      traverse(data);
      return visible;
    }, [data, expandedIds]);

    // Alternar expansión de un nodo
    const toggleExpand = React.useCallback(
      (nodeId: string) => {
        const next = expandedIds.includes(nodeId)
          ? expandedIds.filter((id) => id !== nodeId)
          : [...expandedIds, nodeId];
        updateExpandedIds(next);
      },
      [expandedIds, updateExpandedIds]
    );

    // Obtener todos los descendientes de un nodo
    const getAllDescendantIds = React.useCallback((node: TreeNode): string[] => {
      const ids: string[] = [];
      const traverse = (curr: TreeNode) => {
        if (curr.children) {
          curr.children.forEach((child) => {
            ids.push(child.id);
            traverse(child);
          });
        }
      };
      traverse(node);
      return ids;
    }, []);

    // Calcular estado del checkbox de un nodo (true, false, o indeterminate)
    const getCheckboxState = React.useCallback(
      (node: TreeNode): boolean | 'indeterminate' => {
        if (!cascadeCheckboxes || !node.children || node.children.length === 0) {
          return selectedIds.includes(node.id);
        }

        const descendantIds = getAllDescendantIds(node);
        const selectedDescendants = descendantIds.filter((id) => selectedIds.includes(id));

        if (selectedDescendants.length === 0) {
          return selectedIds.includes(node.id);
        }

        if (selectedDescendants.length === descendantIds.length && selectedIds.includes(node.id)) {
          return true;
        }

        return 'indeterminate';
      },
      [cascadeCheckboxes, getAllDescendantIds, selectedIds]
    );

    // Manejar selección por checkbox
    const handleCheckboxToggle = React.useCallback(
      (node: TreeNode, e: React.MouseEvent) => {
        e.stopPropagation();
        if (node.disabled) return;

        const currentState = getCheckboxState(node);
        const shouldSelect = currentState !== true;

        let nextSelected: string[];
        if (cascadeCheckboxes && node.children && node.children.length > 0) {
          const descendantIds = getAllDescendantIds(node);
          const targets = [node.id, ...descendantIds];

          if (shouldSelect) {
            nextSelected = Array.from(new Set([...selectedIds, ...targets]));
          } else {
            const targetSet = new Set(targets);
            nextSelected = selectedIds.filter((id) => !targetSet.has(id));
          }
        } else {
          if (shouldSelect) {
            nextSelected = [...selectedIds, node.id];
          } else {
            nextSelected = selectedIds.filter((id) => id !== node.id);
          }
        }

        if (!isMultiControlled) {
          setInternalSelectedIds(nextSelected);
        }

        const selectedNodesList = nextSelected
          .map((id) => nodeMap.get(id)?.node)
          .filter((n): n is TreeNode => Boolean(n));

        onMultiSelectChange?.(nextSelected, selectedNodesList);
      },
      [
        cascadeCheckboxes,
        getAllDescendantIds,
        getCheckboxState,
        isMultiControlled,
        nodeMap,
        onMultiSelectChange,
        selectedIds,
      ]
    );

    // Manejar selección de nodo
    const handleNodeClick = React.useCallback(
      (node: TreeNode, e: React.MouseEvent) => {
        e.stopPropagation();
        if (node.disabled) return;

        setFocusedId(node.id);

        const hasChildren = Boolean(node.children && node.children.length > 0);

        if (hasChildren && expandOnClick) {
          toggleExpand(node.id);
        }

        if (!showCheckboxes) {
          if (!isSingleControlled) {
            setInternalSelectedId(node.id);
          }
          onSelect?.(node.id, node);
        } else {
          // En modo checkboxes, hacer clic en la fila puede disparar la selección
          handleCheckboxToggle(node, e);
        }
      },
      [
        expandOnClick,
        handleCheckboxToggle,
        isSingleControlled,
        onSelect,
        showCheckboxes,
        toggleExpand,
      ]
    );

    // Navegación por teclado accesible WAI-ARIA
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (visibleNodes.length === 0) return;

      const currentIndex = visibleNodes.findIndex((n) => n.id === focusedId);
      const currentNode = currentIndex >= 0 ? visibleNodes[currentIndex] : null;

      switch (e.key) {
        case 'ArrowDown': {
          e.preventDefault();
          const nextIndex = currentIndex < visibleNodes.length - 1 ? currentIndex + 1 : 0;
          const nextNode = visibleNodes[nextIndex];
          if (nextNode) setFocusedId(nextNode.id);
          break;
        }

        case 'ArrowUp': {
          e.preventDefault();
          const prevIndex = currentIndex > 0 ? currentIndex - 1 : visibleNodes.length - 1;
          const prevNode = visibleNodes[prevIndex];
          if (prevNode) setFocusedId(prevNode.id);
          break;
        }

        case 'ArrowRight': {
          e.preventDefault();
          if (currentNode && currentNode.children && currentNode.children.length > 0) {
            if (!expandedIds.includes(currentNode.id)) {
              toggleExpand(currentNode.id);
            } else if (currentIndex < visibleNodes.length - 1) {
              const childNode = visibleNodes[currentIndex + 1];
              if (childNode) setFocusedId(childNode.id);
            }
          }
          break;
        }

        case 'ArrowLeft': {
          e.preventDefault();
          if (currentNode) {
            if (currentNode.children && currentNode.children.length > 0 && expandedIds.includes(currentNode.id)) {
              toggleExpand(currentNode.id);
            } else {
              const parentInfo = nodeMap.get(currentNode.id);
              if (parentInfo?.parentId) {
                setFocusedId(parentInfo.parentId);
              }
            }
          }
          break;
        }

        case 'Home': {
          e.preventDefault();
          const firstNode = visibleNodes[0];
          if (firstNode) setFocusedId(firstNode.id);
          break;
        }

        case 'End': {
          e.preventDefault();
          const lastNode = visibleNodes[visibleNodes.length - 1];
          if (lastNode) setFocusedId(lastNode.id);
          break;
        }

        case 'Enter':
        case ' ': {
          e.preventDefault();
          if (currentNode && !currentNode.disabled) {
            if (showCheckboxes) {
              const fakeEvent = { stopPropagation: () => {} } as React.MouseEvent;
              handleCheckboxToggle(currentNode, fakeEvent);
            } else {
              if (currentNode.children && currentNode.children.length > 0 && expandOnClick) {
                toggleExpand(currentNode.id);
              }
              if (!isSingleControlled) {
                setInternalSelectedId(currentNode.id);
              }
              onSelect?.(currentNode.id, currentNode);
            }
          }
          break;
        }

        case '*': {
          // Expandir todos los hermanos en el nivel actual
          e.preventDefault();
          if (currentNode) {
            const parentInfo = nodeMap.get(currentNode.id);
            const parentId = parentInfo?.parentId;
            const siblings = parentId
              ? nodeMap.get(parentId)?.node.children || []
              : data;
            const branchSiblingIds = siblings
              .filter((s) => s.children && s.children.length > 0)
              .map((s) => s.id);
            updateExpandedIds(Array.from(new Set([...expandedIds, ...branchSiblingIds])));
          }
          break;
        }

        default:
          break;
      }
    };

    // Renderizado recursivo de un nodo y sus hijos
    const renderNode = (node: TreeNode, depth: number = 0) => {
      const hasChildren = Boolean(node.children && node.children.length > 0);
      const isOpen = expandedIds.includes(node.id);
      const isSelected = showCheckboxes
        ? selectedIds.includes(node.id)
        : selectedId === node.id;
      const isFocused = focusedId === node.id;
      const checkboxState = showCheckboxes ? getCheckboxState(node) : false;

      // Iconografía por defecto o personalizada
      const renderIcon = () => {
        if (node.isLoading) {
          return <Spinner size={size === 'sm' ? 'xs' : 'sm'} className="shrink-0 text-alcspower-primary" />;
        }

        if (typeof node.icon === 'function') {
          return node.icon({ isOpen, isSelected });
        }

        if (node.icon) {
          return node.icon;
        }

        if (!showDefaultIcons) return null;

        if (hasChildren) {
          return isOpen ? (
            <FolderOpen className={cn('shrink-0 text-amber-500/90', size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4')} />
          ) : (
            <Folder className={cn('shrink-0 text-amber-500/80', size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4')} />
          );
        }

        return <FileText className={cn('shrink-0 text-alcspower-muted-foreground/80', size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4')} />;
      };

      const rowHeightClasses =
        size === 'sm' ? 'min-h-[28px] py-1 px-1.5' : size === 'lg' ? 'min-h-[40px] py-2 px-2.5' : 'min-h-[34px] py-1.5 px-2';

      return (
        <li
          key={node.id}
          role="treeitem"
          aria-expanded={hasChildren ? isOpen : undefined}
          aria-selected={isSelected}
          aria-disabled={node.disabled}
          className="list-none relative"
        >
          {/* Fila interactiva del nodo */}
          <div
            tabIndex={isFocused || (focusedId === null && depth === 0 && node === data[0]) ? 0 : -1}
            onClick={(e) => handleNodeClick(node, e)}
            className={cn(
              'group/item flex items-center gap-1.5 rounded-xl cursor-pointer transition-all outline-none select-none',
              rowHeightClasses,
              node.disabled && 'opacity-40 cursor-not-allowed pointer-events-none',
              !node.disabled && isSelected && !showCheckboxes && 'bg-alcspower-primary/10 text-alcspower-primary font-medium',
              !node.disabled && (!isSelected || showCheckboxes) && 'hover:bg-alcspower-surface-muted text-alcspower-foreground',
              isFocused && 'ring-2 ring-alcspower-primary/30'
            )}
          >
            {/* Chevron de expansión (solo si tiene hijos) */}
            <div className="w-5 h-5 shrink-0 flex items-center justify-center">
              {hasChildren ? (
                <button
                  type="button"
                  tabIndex={-1}
                  aria-label={isOpen ? `Colapsar ${node.label}` : `Expandir ${node.label}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleExpand(node.id);
                  }}
                  className="w-4 h-4 rounded flex items-center justify-center text-alcspower-muted-foreground hover:text-alcspower-foreground hover:bg-black/5 dark:hover:bg-white/10 transition-colors p-0 border-0 bg-transparent cursor-pointer"
                >
                  <ChevronRight
                    className={cn(
                      'transition-transform duration-200',
                      isOpen && 'rotate-90',
                      size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-4 h-4' : 'w-3.5 h-3.5'
                    )}
                  />
                </button>
              ) : null}
            </div>

            {/* Checkbox para multi-selección */}
            {showCheckboxes && (
              <div
                className="shrink-0 flex items-center justify-center mr-0.5"
                onClick={(e) => handleCheckboxToggle(node, e)}
              >
                <Checkbox
                  checked={checkboxState}
                  disabled={node.disabled}
                  tabIndex={-1}
                  aria-label={`Seleccionar ${node.label}`}
                />
              </div>
            )}

            {/* Icono del nodo */}
            <div className="shrink-0 flex items-center justify-center">
              {renderIcon()}
            </div>

            {/* Contenido / Label del nodo */}
            <div className="flex-1 min-w-0 truncate text-left">
              {renderNodeContent ? (
                renderNodeContent(node, { isOpen, isSelected, isFocused })
              ) : (
                <span className="truncate">{node.label}</span>
              )}
            </div>

            {/* Badge contextual */}
            {node.badge && (
              <div className="shrink-0 ml-1">
                {typeof node.badge === 'string' ? (
                  <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-alcspower-surface-muted border border-alcspower-border text-alcspower-muted-foreground">
                    {node.badge}
                  </span>
                ) : (
                  node.badge
                )}
              </div>
            )}

            {/* Acciones secundarias en hover o fijas */}
            {node.actions && (
              <div
                className="shrink-0 ml-auto opacity-0 group-hover/item:opacity-100 focus-within:opacity-100 transition-opacity"
                onClick={(e) => e.stopPropagation()}
              >
                {node.actions}
              </div>
            )}
          </div>

          {/* Grupo de hijos con guías visuales jerárquicas */}
          {hasChildren && isOpen && (
            <ul
              role="group"
              className={cn(
                'pl-5 ml-2.5 space-y-0.5 mt-0.5',
                showGuideLines && 'border-l border-alcspower-border/60'
              )}
            >
              {node.children!.map((child) => renderNode(child, depth + 1))}
            </ul>
          )}
        </li>
      );
    };

    return (
      <ul
        ref={ref}
        role="tree"
        tabIndex={0}
        aria-multiselectable={showCheckboxes}
        onKeyDown={handleKeyDown}
        className={cn(
          treeViewVariants({ size }),
          'space-y-0.5 p-0 m-0 list-none outline-none focus-visible:ring-1 focus-visible:ring-alcspower-primary/20 rounded-xl',
          className
        )}
        {...restProps}
      >
        {data.map((rootNode) => renderNode(rootNode, 0))}
      </ul>
    );
  }
);

TreeView.displayName = 'TreeView';
