import type { Meta, StoryObj } from '@storybook/react';
import { MultiSelect, type MultiSelectOption } from './MultiSelect';
import { Shield, Users, Database, Cloud, FileText } from 'lucide-react';

const frameworksOptions: MultiSelectOption[] = [
  { value: 'react', label: 'React', description: 'Biblioteca de interfaces de usuario' },
  { value: 'vue', label: 'Vue.js', description: 'Framework progresivo' },
  { value: 'angular', label: 'Angular', description: 'Plataforma empresarial' },
  { value: 'svelte', label: 'Svelte', description: 'Compilador reactivo' },
  { value: 'nextjs', label: 'Next.js', description: 'Framework React fullstack', group: 'Meta-Frameworks' },
  { value: 'nuxt', label: 'Nuxt', description: 'Framework Vue fullstack', group: 'Meta-Frameworks' },
  { value: 'astro', label: 'Astro', description: 'Framework orientado a contenido', group: 'Meta-Frameworks' },
];

const ministerialPermissions: MultiSelectOption[] = [
  { value: 'exp_read', label: 'Lectura de Expedientes', icon: <FileText className="w-4 h-4 text-sky-500" />, badge: 'Básico', group: 'Expedientes' },
  { value: 'exp_write', label: 'Edición y Archivo', icon: <FileText className="w-4 h-4 text-emerald-500" />, badge: 'Operativo', group: 'Expedientes' },
  { value: 'user_admin', label: 'Gestión de Funcionarios', icon: <Users className="w-4 h-4 text-indigo-500" />, badge: 'Admin', group: 'Seguridad' },
  { value: 'sec_audit', label: 'Auditoría Forense', icon: <Shield className="w-4 h-4 text-amber-500" />, badge: 'Seguridad', group: 'Seguridad' },
  { value: 'sys_deploy', label: 'Despliegues en Producción', icon: <Cloud className="w-4 h-4 text-purple-500" />, badge: 'DevOps', group: 'Infraestructura' },
  { value: 'db_backup', label: 'Respaldos de Base de Datos', icon: <Database className="w-4 h-4 text-teal-500" />, badge: 'DBA', group: 'Infraestructura' },
];

const meta: Meta<typeof MultiSelect> = {
  title: 'Formularios/MultiSelect',
  component: MultiSelect,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MultiSelect>;

export const Default: Story = {
  args: {
    placeholder: 'Seleccionar tecnologías...',
    options: frameworksOptions,
    defaultValue: ['react', 'nextjs'],
  },
};

export const ConGruposEIconos: Story = {
  args: {
    placeholder: 'Asignar permisos ministeriales...',
    options: ministerialPermissions,
    defaultValue: ['exp_read', 'exp_write', 'sec_audit'],
    displayMode: 'hybrid',
    maxCount: 2,
  },
};

export const ModoResumenCompacto: Story = {
  args: {
    placeholder: 'Seleccionar roles...',
    options: ministerialPermissions,
    defaultValue: ['exp_read', 'exp_write', 'user_admin', 'sec_audit'],
    displayMode: 'summary',
  },
};

export const ConError: Story = {
  args: {
    placeholder: 'Seleccionar al menos un rol...',
    options: ministerialPermissions,
    hasError: true,
  },
};

export const CargandoAsincrono: Story = {
  args: {
    placeholder: 'Consultando directorio institucional...',
    options: [],
    isLoading: true,
  },
};

export const Deshabilitado: Story = {
  args: {
    placeholder: 'Campo bloqueado por políticas...',
    options: frameworksOptions,
    defaultValue: ['react', 'astro'],
    disabled: true,
  },
};
