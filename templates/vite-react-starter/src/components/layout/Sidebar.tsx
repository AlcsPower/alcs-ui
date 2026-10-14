import React from 'react';
import { Badge } from '@alcspower/ui';
import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  BarChart3,
  ShieldCheck,
  LifeBuoy,
  X,
  Layers,
} from 'lucide-react';
import { ViewType } from '../../types';

interface SidebarProps {
  currentView: ViewType;
  onSelectView: (view: ViewType) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ currentView, onSelectView, isOpen, onClose }: SidebarProps) {
  const navItems = [
    {
      id: 'dashboard' as ViewType,
      label: 'Panel General',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: 'records' as ViewType,
      label: 'Registros',
      icon: FolderKanban,
      badge: '12',
    },
  ];

  const secondaryItems = [
    { label: 'Informes y Métricas', icon: BarChart3 },
    { label: 'Documentos Normativos', icon: FileText },
    { label: 'Seguridad y Auditoría', icon: ShieldCheck },
  ];

  return (
    <>
      {/* Backdrop para pantallas móviles */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-transform duration-200 ease-in-out md:static md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Cabecera del Sidebar / Logo */}
        <div className="flex h-16 items-center justify-between border-b border-slate-200 dark:border-slate-800 px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white shadow-xs">
              <Layers className="h-5 w-5" />
            </div>
            <div>
              <span className="font-bold tracking-tight text-slate-900 dark:text-white text-base">
                @alcspower<span className="text-primary">/ui</span>
              </span>
              <p className="text-[10px] uppercase font-medium tracking-wider text-slate-500">
                Starter Kit B2B
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="md:hidden p-1 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Cerrar navegación lateral"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Enlaces Principales */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          <div>
            <p className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
              Gestión Principal
            </p>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      onSelectView(item.id);
                      onClose();
                    }}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-indigo-300 font-semibold shadow-2xs'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/60 dark:hover:text-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`h-4 w-4 ${isActive ? 'text-primary dark:text-indigo-300' : 'text-slate-400'}`} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <Badge variant={isActive ? 'primary' : 'secondary'} size="sm">
                        {item.badge}
                      </Badge>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          <div>
            <p className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
              Módulos del Sistema
            </p>
            <nav className="space-y-1">
              {secondaryItems.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-not-allowed opacity-80"
                  >
                    <Icon className="h-4 w-4 text-slate-400" />
                    <span>{item.label}</span>
                  </div>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Pie de Sidebar / Soporte */}
        <div className="border-t border-slate-200 dark:border-slate-800 p-4">
          <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
            <LifeBuoy className="h-4 w-4 text-primary" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-slate-800 dark:text-slate-200 truncate">
                Mesa de Ayuda
              </p>
              <p className="text-[11px] text-slate-500 truncate">soporte@empresa.com</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
