import type { Meta, StoryObj } from '@storybook/react';
import {
  Home,
  FileText,
  Clock,
  Paperclip,
  LayoutGrid,
  Users,
  Settings,
  Calendar,
  BarChart,
  Shield,
  Bell,
  Circle
} from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './Tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Data Display/Tabs',
  component: Tabs,
  parameters: {
    layout: 'padded'
  }
};

export default meta;
type Story = StoryObj<typeof Tabs>;

/**
 * Tabs Underline: Estilo clásico con indicador deslizante recto.
 */
export const Default: Story = {
  render: () => (
    <div className="w-[680px] max-w-full mx-auto">
      <Tabs defaultValue="resumen" variant="underline">
        <TabsList>
          <TabsTrigger value="resumen" icon={<Home className="h-4 w-4" />}>
            Resumen
          </TabsTrigger>
          <TabsTrigger value="detalle" icon={<FileText className="h-4 w-4" />}>
            Detalle
          </TabsTrigger>
          <TabsTrigger
            value="historial"
            icon={<Clock className="h-4 w-4" />}
            badge="3"
            badgeVariant="error"
          >
            Historial
          </TabsTrigger>
          <TabsTrigger
            value="adjuntos"
            icon={<Paperclip className="h-4 w-4" />}
            disabled
          >
            Adjuntos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="resumen">
          <div className="rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 p-5">
            <h3 className="text-base font-bold text-alcspower-foreground mb-2">
              Resumen del registro
            </h3>
            <p className="text-sm text-alcspower-muted-foreground mb-4">
              El registro tiene 3 lecturas registradas este mes. Estado actual:{' '}
              <strong className="text-alcspower-foreground font-semibold">En revisión</strong>.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-alcspower-surface p-4 rounded-lg border border-alcspower-border shadow-2xs">
                <div className="text-2xl font-extrabold text-alcspower-foreground">12</div>
                <div className="text-xs text-alcspower-muted-foreground mt-1">Documentos</div>
              </div>
              <div className="bg-alcspower-surface p-4 rounded-lg border border-alcspower-border shadow-2xs">
                <div className="text-2xl font-extrabold text-alcspower-foreground">3</div>
                <div className="text-xs text-alcspower-muted-foreground mt-1">Pendientes</div>
              </div>
              <div className="bg-alcspower-surface p-4 rounded-lg border border-alcspower-border shadow-2xs">
                <div className="text-2xl font-extrabold text-alcspower-foreground">85%</div>
                <div className="text-xs text-alcspower-muted-foreground mt-1">Completado</div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="detalle">
          <div className="rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 p-5">
            <h3 className="text-base font-bold text-alcspower-foreground mb-2">Detalles completos</h3>
            <p className="text-sm text-alcspower-muted-foreground">
              Información detallada de la solicitud incluyendo datos del solicitante, fechas clave y observaciones del revisor.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="historial">
          <div className="rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 p-5">
            <h3 className="text-base font-bold text-alcspower-foreground mb-2">Historial de cambios</h3>
            <p className="text-sm text-alcspower-muted-foreground">
              Se han registrado 3 cambios recientes en el registro.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
};

/**
 * Tabs Pill: Estilo cápsula con fondo contenedor. La pestaña activa se destaca con color primario.
 */
export const Pill: Story = {
  render: () => (
    <div className="w-[680px] max-w-full mx-auto">
      <Tabs defaultValue="general" variant="pill">
        <TabsList>
          <TabsTrigger value="general" icon={<LayoutGrid className="h-4 w-4" />}>
            General
          </TabsTrigger>
          <TabsTrigger
            value="usuarios"
            icon={<Users className="h-4 w-4" />}
            badge="12"
            badgeVariant="info"
          >
            Usuarios
          </TabsTrigger>
          <TabsTrigger value="configuracion" icon={<Settings className="h-4 w-4" />}>
            Configuración
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <div className="rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 p-5">
            <h3 className="text-base font-bold text-alcspower-foreground mb-2">Configuración general</h3>
            <p className="text-sm text-alcspower-muted-foreground">
              Ajustes generales del sistema incluyendo nombre, descripción y preferencias básicas.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="usuarios">
          <div className="rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 p-5">
            <h3 className="text-base font-bold text-alcspower-foreground mb-2">Gestión de usuarios</h3>
            <p className="text-sm text-alcspower-muted-foreground">
              12 usuarios activos en el sistema. Podés gestionar permisos y roles desde aquí.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="configuracion">
          <div className="rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 p-5">
            <h3 className="text-base font-bold text-alcspower-foreground mb-2">Configuración avanzada</h3>
            <p className="text-sm text-alcspower-muted-foreground">
              Opciones técnicas para usuarios avanzados. Modificá estos parámetros con precaución.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
};

/**
 * Tabs Segmented: Estilo segmentado con fondo contenedor y botón blanco elevado cuando está activo.
 */
export const Segmented: Story = {
  render: () => (
    <div className="w-[680px] max-w-full mx-auto">
      <Tabs defaultValue="dia" variant="segmented">
        <TabsList>
          <TabsTrigger value="dia" icon={<Calendar className="h-4 w-4" />}>
            Día
          </TabsTrigger>
          <TabsTrigger value="semana" icon={<Calendar className="h-4 w-4" />}>
            Semana
          </TabsTrigger>
          <TabsTrigger value="mes" icon={<Calendar className="h-4 w-4" />}>
            Mes
          </TabsTrigger>
          <TabsTrigger value="ano" icon={<BarChart className="h-4 w-4" />}>
            Año
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dia">
          <div className="rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 p-5">
            <h3 className="text-base font-bold text-alcspower-foreground mb-2">Vista diaria</h3>
            <p className="text-sm text-alcspower-muted-foreground">
              Actividad del día: 24 eventos registrados. Último evento hace 15 minutos.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="semana">
          <div className="rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 p-5">
            <h3 className="text-base font-bold text-alcspower-foreground mb-2">Vista semanal</h3>
            <p className="text-sm text-alcspower-muted-foreground">
              Resumen de la semana: 156 eventos, 23 usuarios activos, 4 incidentes reportados.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
};

/**
 * Tabs Verticales: Con orientación vertical y panel tipo sidebar integrado.
 */
export const Vertical: Story = {
  render: () => (
    <div className="w-[680px] max-w-full mx-auto">
      <Tabs defaultValue="perfil" orientation="vertical">
        <TabsList>
          <TabsTrigger value="perfil" icon={<Users className="h-4 w-4" />}>
            Perfil
          </TabsTrigger>
          <TabsTrigger value="seguridad" icon={<Shield className="h-4 w-4" />} dot>
            Seguridad
          </TabsTrigger>
          <TabsTrigger
            value="notificaciones"
            icon={<Bell className="h-4 w-4" />}
            badge="5"
            badgeVariant="warning"
          >
            Notificaciones
          </TabsTrigger>
          <TabsTrigger value="avanzado" icon={<Settings className="h-4 w-4" />}>
            Avanzado
          </TabsTrigger>
        </TabsList>

        <TabsContent value="perfil">
          <h3 className="text-lg font-bold text-alcspower-foreground mb-2">Perfil de usuario</h3>
          <p className="text-sm text-alcspower-muted-foreground leading-relaxed">
            Gestioná tu información personal, foto de perfil y datos de contacto. Los cambios se guardan automáticamente.
          </p>
        </TabsContent>

        <TabsContent value="seguridad">
          <h3 className="text-lg font-bold text-alcspower-foreground mb-2">Seguridad de la cuenta</h3>
          <p className="text-sm text-alcspower-muted-foreground leading-relaxed">
            Cambiar contraseña, activar autenticación de dos factores y revisar sesiones activas.
          </p>
        </TabsContent>

        <TabsContent value="notificaciones">
          <h3 className="text-lg font-bold text-alcspower-foreground mb-2">Preferencias de notificación</h3>
          <p className="text-sm text-alcspower-muted-foreground leading-relaxed">
            Tenés 5 notificaciones pendientes. Configurá cómo y cuándo recibir alertas.
          </p>
        </TabsContent>

        <TabsContent value="avanzado">
          <h3 className="text-lg font-bold text-alcspower-foreground mb-2">Configuración avanzada</h3>
          <p className="text-sm text-alcspower-muted-foreground leading-relaxed">
            Opciones técnicas para usuarios avanzados. API keys, webhooks y configuraciones de desarrollo.
          </p>
        </TabsContent>
      </Tabs>
    </div>
  )
};

/**
 * Tamaños: sm, md (por defecto), lg.
 */
export const Sizes: Story = {
  render: () => (
    <div className="w-[680px] max-w-full mx-auto space-y-8">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-alcspower-muted-foreground block mb-2">
          Small (sm)
        </span>
        <Tabs defaultValue="t1" size="sm">
          <TabsList>
            <TabsTrigger value="t1">Primero</TabsTrigger>
            <TabsTrigger value="t2">Segundo</TabsTrigger>
            <TabsTrigger value="t3">Tercero</TabsTrigger>
          </TabsList>
          <TabsContent value="t1">
            <p className="text-xs text-alcspower-muted-foreground">Contenido small.</p>
          </TabsContent>
        </Tabs>
      </div>

      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-alcspower-muted-foreground block mb-2">
          Medium (md - por defecto)
        </span>
        <Tabs defaultValue="t1" size="md">
          <TabsList>
            <TabsTrigger value="t1" icon={<Home className="h-4 w-4" />}>
              Primero
            </TabsTrigger>
            <TabsTrigger value="t2" icon={<FileText className="h-4 w-4" />}>
              Segundo
            </TabsTrigger>
            <TabsTrigger value="t3" icon={<Circle className="h-4 w-4" />}>
              Tercero
            </TabsTrigger>
          </TabsList>
          <TabsContent value="t1">
            <p className="text-sm text-alcspower-muted-foreground">Contenido medium.</p>
          </TabsContent>
        </Tabs>
      </div>

      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-alcspower-muted-foreground block mb-2">
          Large (lg)
        </span>
        <Tabs defaultValue="t1" size="lg">
          <TabsList>
            <TabsTrigger value="t1" icon={<Home className="h-4.5 w-4.5" />}>
              Primero
            </TabsTrigger>
            <TabsTrigger value="t2" icon={<FileText className="h-4.5 w-4.5" />}>
              Segundo
            </TabsTrigger>
            <TabsTrigger value="t3" icon={<Circle className="h-4.5 w-4.5" />}>
              Tercero
            </TabsTrigger>
          </TabsList>
          <TabsContent value="t1">
            <p className="text-sm text-alcspower-muted-foreground">Contenido large.</p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
};
