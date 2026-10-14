# Política de Seguridad para @alcspower/ui

<div align="center">

[🇺🇸 English](./SECURITY.md) &nbsp;|&nbsp; **🇪🇸 Español**

</div>

---

## 📋 Tabla de Contenidos

1. [Reportar Vulnerabilidades](#reportar-vulnerabilidades)
2. [Versiones Soportadas](#versiones-soportadas)
3. [Seguridad en Dependencias](#seguridad-en-dependencias)
4. [Checklist de Seguridad para Consumidores](#checklist-de-seguridad-para-consumidores)
5. [Guías de Seguridad por Caso de Uso](#guías-de-seguridad-por-caso-de-uso)
6. [Buenas Prácticas de Desarrollo](#buenas-prácticas-de-desarrollo)
7. [Respuesta a Incidentes](#respuesta-a-incidentes)

---

## 🚨 Reportar Vulnerabilidades

### Procedimiento

Si descubres una vulnerabilidad de seguridad en `@alcspower/ui`, **no la publiques en issues públicas ni foros de discusión abiertos**.

**Por favor repórtala de forma privada a través de GitHub Security Advisories:**
👉 [Reportar vulnerabilidad de forma privada](https://github.com/AlcsPower/alcs-ui/security/advisories/new)

**Incluye la siguiente información:**
- Descripción detallada de la vulnerabilidad y vector de ataque
- Versión(es) afectada(s) de `@alcspower/ui`
- Pasos mínimos para reproducir el fallo
- Impacto potencial estimado
- Prueba de concepto (PoC) o sugerencia de corrección (opcional)

**Tiempos de Respuesta Estimados:**
- Reconocimiento inicial: 48 horas
- Evaluación técnica inicial: 5 días
- Fix / Parche de seguridad: según severidad (Crítica: 24-48 horas, Alta: 7 días, Media: 14-30 días)

### Niveles de Severidad CVSS

| Puntaje CVSS | Severidad | Tiempo Esperado | Acción |
| :---: | :---: | :---: | :--- |
| **9.0 - 10.0** | **Crítica** | 24 - 48 horas | Parche inmediato + release de emergencia |
| **7.0 - 8.9** | **Alta** | 5 - 7 días | Parche + release en versión patch/minor |
| **4.0 - 6.9** | **Media** | 14 - 30 días | Corrección en el siguiente ciclo planificado |
| **0.1 - 3.9** | **Baja** | 30 - 90 días | Corrección en backlog general |

---

## 📦 Versiones Soportadas

| Versión | Estado | Soporte |
| :---: | :---: | :--- |
| **1.6.x** | ✅ Activa / Actual | Soporte completo y parches de seguridad prioritarios |
| **1.5.x** | ⚠️ Mantenimiento | Parches críticos de seguridad |
| **< 1.5** | ❌ No soportada | Sin soporte oficial; se recomienda actualizar a 1.6.x |

**Recomendación:** Mantente siempre en la versión más reciente:

```bash
# Actualizar a la última versión disponible de la serie 1.6:
pnpm update @alcspower/ui@latest
```

---

## 🔐 Seguridad en Dependencias

### Auditoría Regular Automatizada

La biblioteca ejecuta auditorías de seguridad automatizadas en su pipeline de CI/CD (`.github/workflows/ci.yml`):
- `pnpm audit --prod`: Cero vulnerabilidades toleradas en dependencias de producción.
- `pnpm audit --audit-level=critical`: Cero vulnerabilidades críticas toleradas en el tooling de desarrollo.
- Auditorías automáticas previas a cada release.

### Ejecutar Auditoría Localmente

```bash
# Revisar vulnerabilidades en todo el árbol de dependencias:
pnpm audit

# Revisar vulnerabilidades exclusivas del runtime de producción:
pnpm audit --prod

# Filtrar únicamente vulnerabilidades críticas:
pnpm audit --audit-level=critical
```

### Dependencias Principales Auditadas

| Dependencia | Rol en la Biblioteca | Frecuencia de Auditoría |
| :--- | :--- | :---: |
| `@radix-ui/*` | Primitivas accesibles WAI-ARIA | Semanal |
| `react`, `react-dom` | Runtime peer dependency (v18, v19) | Semanal |
| `recharts` | Visualización de gráficos SVG | Quincenal |
| `date-fns` | Parsing y manipulación de fechas | Quincenal |
| `cmdk`, `lucide-react` | Interfaz, búsqueda e iconos | Mensual |

---

## ✅ Checklist de Seguridad para Consumidores

### 1. 🛡️ Prevención de XSS (Cross-Site Scripting)

#### ✓ Sanitización de Entrada de Usuario

```typescript
// ❌ RIESGOSO: Renderizar texto no sanitizado dentro de tooltips o modales
import { Tooltip } from '@alcspower/ui';

export function UserProfile({ userName }: { userName: string }) {
  return <Tooltip content={userName}>Perfil</Tooltip>;
}

// ✅ SEGURO: Sanitizar cadenas suministradas por el usuario
import DOMPurify from 'dompurify';
import { Tooltip } from '@alcspower/ui';

export function UserProfile({ userName }: { userName: string }) {
  const safeName = DOMPurify.sanitize(userName, { ALLOWED_TAGS: [] });
  return <Tooltip content={safeName}>Perfil</Tooltip>;
}
```

#### ✓ Sanitización de Enlaces y Atributos `href`

Al pasar URLs dinámicas a primitivas de navegación como `BreadcrumbLink`, `Button asChild` o componentes con elementos `<a>`:

```typescript
// ❌ RIESGOSO: Pasar una URL no validada (riesgo de esquema javascript:...)
<a href={userProvidedUrl}>Visitar sitio</a>

// ✅ SEGURO: Validar esquema permitido (http, https, mailto, tel o rutas relativas)
function isSafeUrl(url: string): boolean {
  if (!url) return false;
  if (url.startsWith('/') || url.startsWith('#')) return true;
  try {
    const parsed = new URL(url);
    return ['http:', 'https:', 'mailto:', 'tel:'].includes(parsed.protocol);
  } catch {
    return false;
  }
}

const safeHref = isSafeUrl(userProvidedUrl) ? userProvidedUrl : '#';
```

### 2. 🔑 Protección contra CSRF (Cross-Site Request Forgery)

* Utiliza tokens anti-CSRF en formularios interactivos que modifiquen el estado en el servidor.
* Configura cookies de sesión con el atributo `SameSite=Strict` o `SameSite=Lax` y `Secure=true`.

### 3. 🔐 Autenticación y Autorización

* **Almacenamiento seguro:** Nunca almacenes tokens JWT o credenciales sensibles en `localStorage` o `sessionStorage` accesibles por JavaScript si la aplicación procesa contenido dinámico. Prefiere cookies `HttpOnly; Secure; SameSite=Strict`.
* **Control en el Servidor:** Nunca confíes exclusivamente en el frontend para ocultar columnas de `DataTable` o botones de acción. Toda verificación de permisos (RBAC) debe validarse estrictamente en la API de backend.

### 4. 📤 Seguridad en Carga de Archivos (`FileUpload`)

* Valida tamaño máximo (`maxSize`), tipo MIME real mediante inspección binaria (magic numbers) en servidor y extensión de archivo.
* Renombra los archivos en el servidor con identificadores criptográficamente seguros (e.g. UUID v4) para evitar ataques de *Path Traversal*.

---

## 📞 Contacto y Divulgación Coordinada

Para dudas o notificaciones de seguridad, utiliza:
* **Asesorías Privadas:** [GitHub Security Advisories](https://github.com/AlcsPower/alcs-ui/security/advisories/new)
* **Mantenedor Principal:** Alcides Altamirano (`AlcsPower`)
