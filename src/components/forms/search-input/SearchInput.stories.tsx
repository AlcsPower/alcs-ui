import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { SearchInput } from './SearchInput';

const meta: Meta<typeof SearchInput> = {
  title: 'Formularios/SearchInput',
  component: SearchInput,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SearchInput>;

export const Default: Story = {
  args: {
    placeholder: 'Buscar expedientes, personas...',
  },
};

export const ConAtajo: Story = {
  args: {
    placeholder: 'Buscar en el catálogo institucional...',
    shortcut: '⌘K',
  },
};

export const Cargando: Story = {
  args: {
    defaultValue: 'Trámites de importación',
    isLoading: true,
  },
};

export const Showcase: Story = {
  render: () => {
    const [searchTerm, setSearchTerm] = React.useState('');
    const [isSearching, setIsSearching] = React.useState(false);
    const [results, setResults] = React.useState<string[]>([]);

    const handleSearch = (term: string) => {
      setSearchTerm(term);
      if (!term.trim()) {
        setResults([]);
        setIsSearching(false);
        return;
      }

      setIsSearching(true);
      setTimeout(() => {
        setIsSearching(false);
        setResults([
          `Registro N° ${Math.floor(1000 + Math.random() * 9000)} para "${term}"`,
          `Expediente Mercantil - Coincidencia con "${term}"`,
          `Licencia Sanitaria - Relacionada a "${term}"`,
        ]);
      }, 500);
    };

    return (
      <div className="max-w-4xl mx-auto space-y-10 py-6 font-sans">
        {/* Header */}
        <div className="space-y-2 border-b pb-6">
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              SearchInput — Búsqueda Reactiva
            </h2>
            <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-blue-100 text-blue-700">
              v1.5.0
            </span>
          </div>
          <p className="text-sm text-slate-500 max-w-2xl">
            Entrada de búsqueda especializada con debounce automático, botón para limpiar, spinner
            asíncrono y soporte para visualización y escucha de atajos de teclado.
          </p>
        </div>

        {/* 01. VARIANTES Y CONFIGURACIONES */}
        <section className="space-y-4">
          <div className="flex items-baseline gap-3">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
              01. VARIANTES Y CONFIGURACIONES
            </span>
            <span className="text-sm text-slate-500">Estándar, atajo de teclado, spinner y solo lectura</span>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <span className="text-xs font-semibold text-slate-600">Básico con limpiar</span>
                <SearchInput placeholder="Buscar por palabra clave..." />
              </div>
              <div className="space-y-1.5">
                <span className="text-xs font-semibold text-slate-600">Con atajo rápido (⌘K)</span>
                <SearchInput placeholder="Presiona ⌘K para buscar..." shortcut="⌘K" />
              </div>
              <div className="space-y-1.5">
                <span className="text-xs font-semibold text-slate-600">Estado de carga (isLoading)</span>
                <SearchInput defaultValue="Consultando padrón..." isLoading />
              </div>
              <div className="space-y-1.5">
                <span className="text-xs font-semibold text-slate-600">Deshabilitado</span>
                <SearchInput disabled defaultValue="Búsqueda no permitida" />
              </div>
            </div>
          </div>
        </section>

        {/* 02. ESCALAS DE TAMAÑO */}
        <section className="space-y-4">
          <div className="flex items-baseline gap-3">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
              02. ESCALAS DE TAMAÑO
            </span>
            <span className="text-sm text-slate-500">sm (32px), md (40px, default), lg (48px)</span>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm divide-y divide-slate-100">
            <div className="flex items-center py-3.5 first:pt-0 last:pb-0 gap-6">
              <span className="w-28 text-xs font-semibold text-slate-400 font-mono">sm (32px)</span>
              <div className="flex-1 max-w-md">
                <SearchInput size="sm" placeholder="Buscar compacto..." shortcut="/" />
              </div>
            </div>
            <div className="flex items-center py-3.5 first:pt-0 last:pb-0 gap-6">
              <span className="w-28 text-xs font-semibold text-slate-400 font-mono">md (40px)</span>
              <div className="flex-1 max-w-md">
                <SearchInput size="md" placeholder="Buscar normal (por defecto)..." shortcut="⌘K" />
              </div>
            </div>
            <div className="flex items-center py-3.5 first:pt-0 last:pb-0 gap-6">
              <span className="w-28 text-xs font-semibold text-slate-400 font-mono">lg (48px)</span>
              <div className="flex-1 max-w-md">
                <SearchInput size="lg" placeholder="Buscar prominente en catálogo..." shortcut="Ctrl+K" />
              </div>
            </div>
          </div>
        </section>

        {/* 03. ESTADOS DEL MUNDO REAL Y DEMO REACTIVA */}
        <section className="space-y-4">
          <div className="flex items-baseline gap-3">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
              03. BÚSQUEDA REACTIVA EN VIVO CON DEBOUNCE (300MS)
            </span>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
            <SearchInput
              placeholder="Escribe para buscar (ej: 'expediente', 'arancel')..."
              onSearch={handleSearch}
              isLoading={isSearching}
              shortcut="/"
              enableShortcutListener
            />

            {searchTerm && (
              <div className="pt-2 border-t text-sm">
                <div className="text-xs text-slate-400 mb-2">
                  Término emitido:{' '}
                  <span className="font-semibold text-slate-700">"{searchTerm}"</span>
                </div>
                {isSearching ? (
                  <p className="text-slate-500 italic">Buscando resultados...</p>
                ) : results.length > 0 ? (
                  <ul className="space-y-1.5">
                    {results.map((res, i) => (
                      <li
                        key={i}
                        className="p-2.5 rounded-lg bg-slate-50 text-slate-800 text-xs font-medium border border-slate-100 flex items-center justify-between"
                      >
                        <span>{res}</span>
                        <span className="text-[10px] text-blue-600 font-mono">Encontrado</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-slate-400 text-xs">Sin resultados encontrados.</p>
                )}
              </div>
            )}
          </div>
        </section>
      </div>
    );
  },
};
