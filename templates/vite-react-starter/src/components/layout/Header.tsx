import React from 'react';
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  Button,
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@alcspower/ui';
import { Menu, Bell, User, LogOut, Settings } from 'lucide-react';
import { ThemeToggle } from '../ThemeToggle';
import { ViewType } from '../../types';

interface HeaderProps {
  currentView: ViewType;
  onToggleSidebar: () => void;
}

export function Header({ currentView, onToggleSidebar }: HeaderProps) {
  const viewTitles: Record<ViewType, string> = {
    dashboard: 'Panel General',
    records: 'Bandeja de Registros',
    expedientes: 'Bandeja de Registros',
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 px-4 md:px-6 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          className="md:hidden"
          aria-label="Alternar menú lateral"
        >
          <Menu className="h-5 w-5" />
        </Button>

        <Breadcrumb className="hidden sm:flex">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Sistema Corporativo</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{viewTitles[currentView]}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex items-center gap-2 md:gap-3">
        <Button variant="ghost" size="icon" aria-label="Notificaciones" className="relative">
          <Bell className="h-4 w-4 text-slate-600 dark:text-slate-300" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-900" />
        </Button>

        <ThemeToggle />

        <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-1" />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="flex items-center gap-2 rounded-full p-1 text-left hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=faces" alt="Alcides Altamirano" />
                <AvatarFallback>AA</AvatarFallback>
              </Avatar>
              <div className="hidden lg:block text-left text-xs pr-2">
                <p className="font-semibold text-slate-800 dark:text-slate-100 leading-tight">Alcides Altamirano</p>
                <p className="text-slate-500 dark:text-slate-400">Administrador de Sistema</p>
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 cursor-pointer">
              <User className="h-4 w-4 text-slate-500" /> Perfil de Usuario
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2 cursor-pointer">
              <Settings className="h-4 w-4 text-slate-500" /> Configuración
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 text-rose-600 dark:text-rose-400 cursor-pointer">
              <LogOut className="h-4 w-4" /> Cerrar Sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
