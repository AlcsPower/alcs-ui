import type { Meta, StoryObj } from '@storybook/react';
import {
  FileText,
  Calendar,
  MessageSquare,
  User,
  ShieldCheck,
  FileSpreadsheet,
  Paperclip,
  HelpCircle,
  Sliders,
  Lock,
  Layers
} from 'lucide-react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  AccordionActions,
  AccordionActionButton
} from './Accordion';

const meta: Meta<typeof Accordion> = {
  title: 'Data Display/Accordion',
  component: Accordion,
  parameters: {
    layout: 'padded'
  }
};

export default meta;
type Story = StoryObj<typeof Accordion>;

/**
 * Modo Simple (Single): Solo una sección abierta a la vez.
 * Con iconos contextuales, subtítulos, badges y botones de acción en el contenido.
 */
export const Default: Story = {
  render: () => (
    <div className="w-[640px] max-w-full mx-auto">
      <Accordion type="single" collapsible defaultValue="item-1">
        <AccordionItem value="item-1">
          <AccordionTrigger
            icon={<FileText className="h-4 w-4" />}
            subtitle="Trámites · 3 min de lectura"
            badge="FAQ"
          >
            ¿Cómo solicitar certificación de origen?
          </AccordionTrigger>
          <AccordionContent>
            <p className="mb-3">
              Para solicitar la certificación de origen debés completar el formulario{' '}
              <strong className="text-alcspower-foreground font-semibold">F-CO-001</strong> disponible en el portal de trámites. El proceso incluye:
            </p>
            <ul className="list-disc pl-5 mb-3 space-y-1 text-alcspower-muted-foreground">
              <li>Presentar la declaración jurada de origen</li>
              <li>Adjuntar facturas comerciales</li>
              <li>Pagar el arancel correspondiente</li>
            </ul>
            <p className="mb-3">
              El plazo de resolución es de{' '}
              <strong className="text-alcspower-foreground font-semibold">5 días hábiles</strong>. Podés consultar el estado en{' '}
              <a href="#" className="text-alcspower-primary underline font-medium">Mis Trámites</a>.
            </p>
            <AccordionActions>
              <AccordionActionButton>Iniciar trámite</AccordionActionButton>
              <AccordionActionButton>Descargar formulario</AccordionActionButton>
            </AccordionActions>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger
            icon={<Calendar className="h-4 w-4" />}
            subtitle="Licencias · Actualizado hace 2 días"
            badge="Info"
          >
            ¿Cuál es la vigencia de la licencia corporativa?
          </AccordionTrigger>
          <AccordionContent>
            <p className="mb-3">
              La licencia corporativa tiene una vigencia de{' '}
              <strong className="text-alcspower-foreground font-semibold">2 años</strong> a partir de la fecha de emisión. Debés renovarla 30 días antes del vencimiento.
            </p>
            <p>
              La renovación requiere presentar documentación actualizada y pagar el arancel correspondiente. Si dejás vencer la licencia, deberás iniciar una nueva solicitud.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger
            icon={<MessageSquare className="h-4 w-4" />}
            subtitle="Soporte · Respuesta inmediata"
            badge="Ayuda"
          >
            ¿Dónde puedo hacer consultas sobre mi solicitud?
          </AccordionTrigger>
          <AccordionContent>
            <p className="mb-3">
              Podés hacer consultas sobre tu solicitud a través de los siguientes canales:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-alcspower-muted-foreground">
              <li><strong className="text-alcspower-foreground font-semibold">Mesa de ayuda:</strong> soporte@empresa.com</li>
              <li><strong className="text-alcspower-foreground font-semibold">Teléfono:</strong> +1 (555) 019-2834 (lun-vie 8am-5pm)</li>
              <li><strong className="text-alcspower-foreground font-semibold">Chat en vivo:</strong> disponible en el portal</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
};

/**
 * Modo Múltiple: Permite mantener múltiples secciones expandidas simultáneamente.
 */
export const Multiple: Story = {
  render: () => (
    <div className="w-[640px] max-w-full mx-auto">
      <Accordion type="multiple" defaultValue={['sec-1']}>
        <AccordionItem value="sec-1">
          <AccordionTrigger
            icon={<User className="h-4 w-4" />}
            subtitle="Información básica del solicitante"
          >
            Sección 1: Datos Generales
          </AccordionTrigger>
          <AccordionContent>
            <p className="mb-3">Completá los datos personales del solicitante:</p>
            <ul className="list-disc pl-5 mb-3 space-y-1 text-alcspower-muted-foreground">
              <li><strong className="text-alcspower-foreground font-semibold">Nombre completo:</strong> según documento de identidad</li>
              <li><strong className="text-alcspower-foreground font-semibold">Número de cédula:</strong> sin espacios ni guiones</li>
              <li><strong className="text-alcspower-foreground font-semibold">Domicilio legal:</strong> dirección completa con código postal</li>
              <li><strong className="text-alcspower-foreground font-semibold">Teléfono de contacto:</strong> número válido con código de área</li>
            </ul>
            <p className="text-xs text-alcspower-muted-foreground">
              Todos los campos marcados con <strong className="text-red-500">*</strong> son obligatorios.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="sec-2">
          <AccordionTrigger
            icon={<FileSpreadsheet className="h-4 w-4" />}
            subtitle="Códigos y categorías de productos"
          >
            Sección 2: Clasificación Arancelaria
          </AccordionTrigger>
          <AccordionContent>
            <p className="mb-3">
              La clasificación arancelaria se realiza según el{' '}
              <strong className="text-alcspower-foreground font-semibold">Sistema Armonizado (SA)</strong>. Debés identificar:
            </p>
            <ul className="list-disc pl-5 mb-3 space-y-1 text-alcspower-muted-foreground">
              <li>Capítulo (2 dígitos)</li>
              <li>Partida (4 dígitos)</li>
              <li>Subpartida (6 dígitos)</li>
              <li>Fracción arancelaria (8-10 dígitos)</li>
            </ul>
            <p>
              Podés usar el <a href="#" className="text-alcspower-primary underline font-medium">buscador de clasificación</a> para encontrar el código correcto.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="sec-3">
          <AccordionTrigger
            icon={<Paperclip className="h-4 w-4" />}
            subtitle="Archivos y respaldos requeridos"
          >
            Sección 3: Documentación Adjunta
          </AccordionTrigger>
          <AccordionContent>
            <p className="mb-3">Adjuntá la siguiente documentación en formato PDF (máx. 10MB por archivo):</p>
            <ul className="list-disc pl-5 space-y-1 text-alcspower-muted-foreground">
              <li>Copia de cédula de identidad</li>
              <li>Factura comercial</li>
              <li>Certificado de origen</li>
              <li>Lista de empaque</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
};

/**
 * Variante Bordered: Agrupado apilado sin espacio entre items en un solo contenedor con borde.
 */
export const Bordered: Story = {
  render: () => (
    <div className="w-[640px] max-w-full mx-auto">
      <Accordion type="single" collapsible variant="bordered" defaultValue="b-1">
        <AccordionItem value="b-1">
          <AccordionTrigger
            icon={<HelpCircle className="h-4 w-4" />}
          >
            Términos y condiciones
          </AccordionTrigger>
          <AccordionContent>
            Al utilizar este servicio aceptás los términos y condiciones establecidos por la institución. El incumplimiento puede resultar en la suspensión del acceso.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="b-2">
          <AccordionTrigger
            icon={<ShieldCheck className="h-4 w-4" />}
          >
            Política de privacidad
          </AccordionTrigger>
          <AccordionContent>
            Tus datos personales son tratados conforme a la Ley de Protección de Datos. No compartimos información con terceros sin tu consentimiento expreso.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="b-3">
          <AccordionTrigger
            icon={<Sliders className="h-4 w-4" />}
          >
            Configuración avanzada
          </AccordionTrigger>
          <AccordionContent>
            Opciones avanzadas para usuarios técnicos. Modificá estos parámetros solo si sabés lo que estás haciendo.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
};

/**
 * Variante Ghost: Minimalista sin borde de tarjeta exterior, con bordes divisorios sutiles.
 */
export const Ghost: Story = {
  render: () => (
    <div className="w-[640px] max-w-full mx-auto">
      <Accordion type="single" collapsible variant="ghost" defaultValue="g-1">
        <AccordionItem value="g-1">
          <AccordionTrigger
            icon={<MessageSquare className="h-4 w-4" />}
          >
            Preguntas frecuentes
          </AccordionTrigger>
          <AccordionContent>
            Encontrá respuestas a las preguntas más comunes sobre nuestros servicios y trámites.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="g-2">
          <AccordionTrigger
            icon={<HelpCircle className="h-4 w-4" />}
          >
            Centro de ayuda
          </AccordionTrigger>
          <AccordionContent>
            Contactá con nuestro equipo de soporte para obtener ayuda personalizada.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
};

/**
 * Tamaños: sm, md (por defecto), lg.
 */
export const Sizes: Story = {
  render: () => (
    <div className="w-[640px] max-w-full mx-auto space-y-6">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-alcspower-muted-foreground block mb-2">
          Small (sm)
        </span>
        <Accordion type="single" collapsible size="sm">
          <AccordionItem value="sm-1">
            <AccordionTrigger
              icon={<FileText className="h-3.5 w-3.5" />}
            >
              Requisitos mínimos
            </AccordionTrigger>
            <AccordionContent>
              Documento de identidad vigente, comprobante de domicilio y pago de aranceles.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-alcspower-muted-foreground block mb-2">
          Medium (md - por defecto)
        </span>
        <Accordion type="single" collapsible size="md">
          <AccordionItem value="md-1">
            <AccordionTrigger
              icon={<Calendar className="h-4 w-4" />}
              subtitle="Formulario regular"
            >
              Vigencia y plazos
            </AccordionTrigger>
            <AccordionContent>
              Los plazos oficiales se computan en días hábiles a partir de la fecha de recepción.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-alcspower-muted-foreground block mb-2">
          Large (lg)
        </span>
        <Accordion type="single" collapsible size="lg">
          <AccordionItem value="lg-1">
            <AccordionTrigger
              icon={<Layers className="h-4.5 w-4.5" />}
              subtitle="Documento oficial · Versión 2026"
            >
              Guía completa de trámites aduaneros
            </AccordionTrigger>
            <AccordionContent>
              Esta guía contiene toda la información necesaria para realizar trámites aduaneros de manera correcta y eficiente. Incluye formularios, códigos arancelarios y procedimientos paso a paso.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
};

/**
 * Estado deshabilitado.
 */
export const Disabled: Story = {
  render: () => (
    <div className="w-[640px] max-w-full mx-auto">
      <Accordion type="single" collapsible>
        <AccordionItem value="dis-1" disabled>
          <AccordionTrigger
            icon={<Lock className="h-4 w-4" />}
            subtitle="Requiere permisos especiales"
          >
            Sección bloqueada
          </AccordionTrigger>
          <AccordionContent>
            Este contenido está restringido.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
};
