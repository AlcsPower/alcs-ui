# Security Policy for @alcspower/ui

## 📋 Tabla de Contenidos

1. [Reportar Vulnerabilidades](#reportar-vulnerabilidades)
2. [Versiones Soportadas](#versiones-soportadas)
3. [Seguridad en Dependencias](#seguridad-en-dependencias)
4. [Checklist de Seguridad para Consumidores](#checklist-de-seguridad-para-consumidores)
5. [Guías de Seguridad por Caso de Uso](#guías-de-seguridad-por-caso-de-uso)
6. [Best Practices de Desarrollo](#best-practices-de-desarrollo)
7. [Respuesta a Incidentes](#respuesta-a-incidentes)

---

## 🚨 Reportar Vulnerabilidades

### Procedimiento

Si descubres una vulnerabilidad de seguridad en `@alcspower/ui`, **no la publiques en issues públicas**.

**Por favor reporta a:** [alcides.altamirano@gmail.com](mailto:alci.altamirano@gmail.com)

**Incluye:**
- Descripción detallada de la vulnerabilidad
- Versión(es) afectada(s)
- Pasos para reproducir
- Impacto potencial
- Tu sugerencia de fix (opcional)

**Tiempo de Respuesta:**
- Reconocimiento inicial: 48 horas
- Evaluación inicial: 5 días
- Fix / Parche: según severidad (Critical: 7 días, High: 14 días, Medium: 30 días)

### CVSS Severity Levels

| CVSS Score | Severity | Tiempo Esperado | Acción |
|-----------|----------|-----------------|--------|
| 9.0-10.0 | **Critical** | 24-48 horas | Patch inmediato + notificación urgente |
| 7.0-8.9 | **High** | 5-7 días | Patch + release en versión minor |
| 4.0-6.9 | **Medium** | 14-30 días | Fix en próxima release |
| 0.1-3.9 | **Low** | 30-90 días | Fix en backlog |

---

## 📦 Versiones Soportadas

| Versión | Estado | Fecha Soporte |
|---------|--------|---------------|
| 1.1.x | ✅ LTS (Long Term Support) | Hasta 2026-10 |
| 1.0.x | ⚠️ Mantenimiento limitado | Hasta 2026-04 |
| < 1.0 | ❌ No soportada | - |

**Recomendación:** Mantente siempre en la versión más reciente de la serie que uses. Para actualizaciones:

```bash
# Dentro del mismo minor/patch (seguro)
pnpm update @alcspower/ui@1.1

# Revisar cambios antes de updater a nuevo minor
pnpm update @alcspower/ui@1.2
```

---

## 🔐 Seguridad en Dependencias

### Auditoría Regular

La biblioteca ejecuta auditoría de seguridad en:
- ✅ Cada commit (CI/CD)
- ✅ Antes de cada release (manual)
- ✅ Semanalmente en `main` (automatizado)

### Ejecutar Auditoría Localmente

```bash
# Revisar vulnerabilidades
pnpm audit

# Mostrar solo moderate y critical
pnpm audit --audit-level=moderate

# Aplicar fixes automáticos
pnpm audit --fix

# Generar reporte detallado
pnpm audit --json > audit-report.json
```

### Dependencias Críticas

Estas dependencias son auditadas regularmente por su impacto en seguridad:

| Dependencia | Propósito | Auditoría |
|-------------|----------|----------|
| `@radix-ui/*` | Primitivas accesibles | Semanal |
| `react`, `react-dom` | Runtime | Semanal |
| `recharts` | Gráficos (puede procesar datos) | Quincenal |
| `date-fns` | Parsing de fechas | Quincenal |
| `cmdk`, `lucide-react` | UI minor | Mensual |

### Política de Actualización

```bash
# Vulnerabilidades Critical/High: Update inmediato
pnpm update @package-name@latest

# Vulnerabilidades Medium: Update en próximo sprint
# Low: Actualizar en ciclo normal de dependencias
```

---

## ✅ Checklist de Seguridad para Consumidores

### 1. 🛡️ XSS (Cross-Site Scripting) Prevention

#### ✓ Sanitización de Entrada de Usuario

```typescript
// ❌ MALO: Pasar directamente input del usuario
import { Tooltip } from '@alcspower/ui';

export function UserProfile({ userName }: { userName: string }) {
  return <Tooltip content={userName}>Profile</Tooltip>;
}
// Si userName = "<img src=x onerror='alert(1)'>", ejecutaría JS

// ✅ BUENO: Escapar o sanitizar HTML
import DOMPurify from 'dompurify';
import { Tooltip } from '@alcspower/ui';

export function UserProfile({ userName }: { userName: string }) {
  const safeName = DOMPurify.sanitize(userName, { ALLOWED_TAGS: [] });
  return <Tooltip content={safeName}>Profile</Tooltip>;
}
```

#### ✓ Usando `dangerouslySetInnerHTML` (evitar cuando sea posible)

Si **absolutamente necesitas** renderizar HTML (markdown, rich text):

```typescript
import DOMPurify from 'dompurify';

interface RichContentProps {
  html: string;
  allowedTags?: string[];
}

export function RichContent({ html, allowedTags = ['p', 'strong', 'em', 'u'] }: RichContentProps) {
  const cleanHtml = DOMPurify.sanitize(html, {
    ALLOWED_TAGS: allowedTags,
    ALLOWED_ATTR: [], // Never allow attributes unless explicitly needed
    KEEP_CONTENT: true,
  });

  return (
    <div 
      dangerouslySetInnerHTML={{ __html: cleanHtml }}
      role="article"
    />
  );
}
```

#### ✓ En Componentes de Formulario

```typescript
import { Field, FieldLabel, FieldError, Input } from '@alcspower/ui';
import DOMPurify from 'dompurify';

export function SafeForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // El input HTML5 ya escapará entities, pero aplica lógica adicional
    const value = e.target.value;
    
    // Validar formato antes de procesar
    if (!isValidEmail(value)) {
      setError('Email inválido');
    } else {
      setError('');
    }
    
    setEmail(value);
  };

  return (
    <Field>
      <FieldLabel>Email</FieldLabel>
      <Input 
        type="email"
        value={email}
        onChange={handleChange}
      />
      {error && <FieldError>{error}</FieldError>}
    </Field>
  );
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
```

### 2. 🔑 CSRF (Cross-Site Request Forgery) Protection

#### ✓ En Formularios POST/PUT/DELETE

```typescript
import { Card, CardHeader, CardTitle, CardContent, CardFooter, Button, Input, Field, FieldLabel } from '@alcspower/ui';

interface SecureFormProps {
  csrfToken: string;
  onSubmit: (data: FormData) => Promise<void>;
}

export function SecureForm({ csrfToken, onSubmit }: SecureFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const formData = new FormData(e.currentTarget);
      await onSubmit(formData);
    } catch (err) {
      setError('Error al procesar el formulario');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>Datos Sensibles</CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* ✓ Token CSRF incluido como hidden input */}
          <input type="hidden" name="csrf_token" value={csrfToken} />
          
          <Field>
            <FieldLabel htmlFor="name">Nombre</FieldLabel>
            <Input 
              id="name"
              name="name"
              type="text"
              required
            />
          </Field>

          {error && (
            <div role="alert" className="text-destructive text-sm">
              {error}
            </div>
          )}
        </CardContent>

        <CardFooter>
          <Button 
            type="submit" 
            loading={isLoading}
          >
            Enviar
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
```

#### ✓ Configuración en Backend

```typescript
// Node.js + Express ejemplo
import cookieParser from 'cookie-parser';
import csrf from 'csurf';

const app = express();
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// ✓ Protección CSRF con SameSite cookies
const csrfProtection = csrf({
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict', // ← Critical
    maxAge: 3600,
  }
});

app.post('/api/form', csrfProtection, (req, res) => {
  // req.csrfToken() validará automáticamente
  res.json({ success: true });
});

// SameSite=Strict: cookie SOLO se envía con requests same-origin
// SameSite=Lax: se envía en top-level navigations (links) pero no en cross-origin requests
```

### 3. 🔐 Authentication & Authorization

#### ✓ Almacenamiento Seguro de Tokens

```typescript
// ❌ MALO: Guardar en localStorage (vulnerable a XSS)
localStorage.setItem('auth_token', token);

// ✅ BUENO: HTTPOnly Cookies (backend genera)
// Backend:
res.cookie('auth_token', token, {
  httpOnly: true,        // JS no puede acceder
  secure: true,          // Solo HTTPS
  sameSite: 'strict',    // Anti-CSRF
  maxAge: 3600000,       // 1 hora
  path: '/',
});

// Frontend: auto-send by browser, no se accede directamente
```

#### ✓ Refresh Token Rotation

```typescript
interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export async function refreshAccessToken(): Promise<string> {
  const response = await fetch('/api/auth/refresh', {
    method: 'POST',
    credentials: 'include', // Envía cookies automáticamente
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Token refresh failed');
  }

  const data: TokenResponse = await response.json();
  
  // ✓ Backend debe haber rotado el refresh token también
  return data.accessToken;
}

// Hook reutilizable
export function useSecureAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Validar sesión activa
    fetch('/api/auth/validate', { 
      credentials: 'include',
      method: 'GET',
    })
      .then(res => {
        if (res.ok) setIsAuthenticated(true);
      })
      .catch(() => setIsAuthenticated(false))
      .finally(() => setIsLoading(false));
  }, []);

  return { isAuthenticated, isLoading };
}
```

### 4. 📤 File Upload Security

#### ✓ Validación en Cliente

```typescript
interface FileUploadProps {
  maxSize?: number;           // bytes
  acceptedTypes?: string[];   // MIME types
  onFile: (file: File) => Promise<void>;
  onError: (error: string) => void;
}

export function SecureFileUpload({
  maxSize = 5 * 1024 * 1024,  // 5MB default
  acceptedTypes = ['image/png', 'image/jpeg', 'application/pdf'],
  onFile,
  onError,
}: FileUploadProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // ✓ Validar tamaño
    if (file.size > maxSize) {
      onError(`Archivo muy grande. Máximo: ${maxSize / 1024 / 1024}MB`);
      return;
    }

    // ✓ Validar MIME type
    if (!acceptedTypes.includes(file.type)) {
      onError(`Tipo no permitido. Aceptados: ${acceptedTypes.join(', ')}`);
      return;
    }

    // ✓ Validar extensión (defensa extra)
    const extension = file.name.split('.').pop()?.toLowerCase();
    const validExtensions = acceptedTypes.map(type => {
      const parts = type.split('/');
      return parts[1];
    });

    if (!extension || !validExtensions.includes(extension)) {
      onError('Extensión de archivo no válida');
      return;
    }

    onFile(file);
  };

  return (
    <input
      type="file"
      onChange={handleChange}
      accept={acceptedTypes.join(',')}
      aria-label="Subir archivo"
    />
  );
}
```

#### ✓ Validación en Servidor

```typescript
// Node.js + Express ejemplo
import multer from 'multer';
import fileType from 'file-type';
import path from 'path';
import fs from 'fs';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const UPLOAD_DIR = path.join(process.cwd(), 'uploads');
const ALLOWED_MIME_TYPES = ['image/png', 'image/jpeg', 'application/pdf'];

// ✓ Configurar multer con límites
const upload = multer({
  dest: UPLOAD_DIR,
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter: (req, file, cb) => {
    if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      cb(new Error('MIME type not allowed'));
    } else {
      cb(null, true);
    }
  },
});

app.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // ✓ Re-validar MIME type (evita spoofing)
    const detectedType = await fileType.fromFile(req.file.path);
    if (!detectedType || !ALLOWED_MIME_TYPES.includes(detectedType.mime)) {
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ error: 'Invalid file type' });
    }

    // ✓ Generar nombre único (evita path traversal)
    const uniqueName = `${Date.now()}-${crypto.randomUUID()}${path.extname(req.file.originalname)}`;
    const finalPath = path.join(UPLOAD_DIR, uniqueName);

    fs.renameSync(req.file.path, finalPath);

    // ✓ Nunca expongas path local, usa URL segura
    res.json({
      url: `/api/files/${uniqueName}`,
      size: req.file.size,
      type: detectedType.mime,
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Upload failed' });
  }
});

// ✓ Servir con headers seguros
app.get('/api/files/:filename', (req, res) => {
  const filename = path.basename(req.params.filename);
  const filepath = path.join(UPLOAD_DIR, filename);

  // Prevenir path traversal
  if (!filepath.startsWith(UPLOAD_DIR)) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.sendFile(filepath);
});
```

### 5. 🔍 Input Validation & Sanitization

#### ✓ Validación de Datos Sensibles

```typescript
import { z } from 'zod'; // o Valibot, etc.

// ✓ Schema de validación tipado
const UserInputSchema = z.object({
  email: z.string().email('Email inválido').max(255),
  username: z.string()
    .min(3, 'Mínimo 3 caracteres')
    .max(50, 'Máximo 50 caracteres')
    .regex(/^[a-zA-Z0-9_-]+$/, 'Solo alfanuméricos, _ y -'),
  password: z.string()
    .min(12, 'Mínimo 12 caracteres')
    .regex(/[A-Z]/, 'Debe incluir mayúscula')
    .regex(/[0-9]/, 'Debe incluir número')
    .regex(/[!@#$%^&*]/, 'Debe incluir carácter especial'),
  bio: z.string()
    .max(500, 'Máximo 500 caracteres')
    .optional(),
});

type UserInput = z.infer<typeof UserInputSchema>;

export function UserForm() {
  const [formData, setFormData] = useState<Partial<UserInput>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // ✓ Validar antes de enviar
    try {
      const validated = UserInputSchema.parse(formData);
      await submitToServer(validated);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach(err => {
          const path = err.path.join('.');
          fieldErrors[path] = err.message;
        });
        setErrors(fieldErrors);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Field>
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <Input
          id="email"
          type="email"
          value={formData.email ?? ''}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        {errors.email && <FieldError>{errors.email}</FieldError>}
      </Field>

      {/* ... más campos */}

      <Button type="submit">Registrar</Button>
    </form>
  );
}
```

### 6. 📊 DataTable & Sensitive Data

#### ✓ Nunca Renderizar Datos Sensibles Innecesarios

```typescript
import { DataTable } from '@alcspower/ui';

// ❌ MALO: Exponiendo SSN completo
export function UserList({ users }) {
  return (
    <DataTable
      columns={[
        { accessorKey: 'name', header: 'Name' },
        { accessorKey: 'ssn', header: 'SSN' },  // ← NUNCA
      ]}
      data={users}
    />
  );
}

// ✅ BUENO: Mascarar datos sensibles
function maskSSN(ssn: string): string {
  return `***-**-${ssn.slice(-4)}`;
}

export function UserList({ users }) {
  return (
    <DataTable
      columns={[
        { accessorKey: 'name', header: 'Name' },
        {
          accessorKey: 'ssn',
          header: 'SSN',
          cell: ({ row }) => maskSSN(row.original.ssn),
        },
      ]}
      data={users}
    />
  );
}
```

#### ✓ Backend Filtering (No confíes en Frontend)

```typescript
// ❌ MALO: Frontend decide qué mostrar
const visibleData = allData.filter(item => 
  currentUser.role === 'admin' ? true : item.isPublic
);

// ✅ BUENO: Backend respeta permisos
app.get('/api/users', authenticateRequest, (req, res) => {
  const user = req.user;
  
  let query = db.table('users');
  
  // Backend decide qué mostrar basado en permisos
  if (user.role !== 'admin') {
    query = query.where('isPublic', true);
  }
  
  const data = query.select(['id', 'name', 'email']); // Select específico
  res.json(data);
});
```

---

## 📚 Guías de Seguridad por Caso de Uso

### Caso: App Ministerial (Datos Sensibles)

```typescript
// Ejemplo: Gestión de expedientes con datos PII (Personally Identifiable Information)

import { Card, DataTable, Button, Dialog, DialogContent, Field, FieldLabel, Input } from '@alcspower/ui';
import { useState } from 'react';
import DOMPurify from 'dompurify';

interface Expediente {
  id: string;
  numero: string;
  solicitante: string;
  // ... otros campos
}

export function ExpedienteManagement() {
  const [expedientes, setExpedientes] = useState<Expediente[]>([]);
  const [selectedExpediente, setSelectedExpediente] = useState<Expediente | null>(null);

  // ✓ Cargar datos desde servidor (backend filtra por permisos)
  useEffect(() => {
    fetch('/api/expedientes', {
      credentials: 'include', // Envía auth token
      headers: {
        'Authorization': `Bearer ${authToken}`,
      },
    })
      .then(res => res.json())
      .then(data => setExpedientes(data));
  }, []);

  return (
    <>
      <DataTable
        columns={[
          { accessorKey: 'numero', header: 'Número' },
          {
            accessorKey: 'solicitante',
            header: 'Solicitante',
            // ✓ Escapar HTML en nombres
            cell: ({ row }) => DOMPurify.sanitize(row.original.solicitante, { ALLOWED_TAGS: [] }),
          },
          {
            id: 'actions',
            cell: ({ row }) => (
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setSelectedExpediente(row.original)}
              >
                Ver
              </Button>
            ),
          },
        ]}
        data={expedientes}
      />

      {/* ✓ Modal con datos sensibles */}
      <Dialog open={!!selectedExpediente} onOpenChange={() => setSelectedExpediente(null)}>
        <DialogContent>
          <div className="space-y-4">
            <h2>Detalles del Expediente</h2>
            {selectedExpediente && (
              <>
                <div>
                  <strong>Número:</strong>{' '}
                  {DOMPurify.sanitize(selectedExpediente.numero, { ALLOWED_TAGS: [] })}
                </div>
                <div>
                  <strong>Solicitante:</strong>{' '}
                  {DOMPurify.sanitize(selectedExpediente.solicitante, { ALLOWED_TAGS: [] })}
                </div>
                {/* Más campos... */}
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
```

### Caso: E-commerce (Payment Processing)

```typescript
// ❌ NUNCA proceses tarjetas directamente en frontend
// Usa Stripe, Adyen, o similar (PCI DSS compliant)

import Stripe from '@stripe/stripe-js';
import { CardElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = Stripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY!);

export function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);
    setError(null);

    // ✓ Stripe monta el elemento de forma segura
    const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement)!,
    });

    if (stripeError) {
      setError(stripeError.message ?? 'Payment failed');
      setProcessing(false);
      return;
    }

    // ✓ Envía solo el paymentMethodId, NO el número de tarjeta
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          paymentMethodId: paymentMethod.id,
          amount: total,
          currency: 'usd',
        }),
      });

      if (!response.ok) {
        throw new Error('Payment failed');
      }

      // ✓ Procesar resultado
      const result = await response.json();
      // Redirigir o mostrar confirmación...
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Payment failed');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      {error && <div className="text-destructive">{error}</div>}
      <Button type="submit" disabled={!stripe || processing}>
        Pagar
      </Button>
    </form>
  );
}

export function CheckoutPage() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}
```

---

## 🛠️ Best Practices de Desarrollo

### 1. Environment Variables

```bash
# .env.example (PUSH TO REPO)
VITE_API_URL=https://api.example.com
VITE_STRIPE_PUBLIC_KEY=pk_test_...

# .env.local (NEVER PUSH)
GITHUB_TOKEN=ghp_xxxxxxxxxxxx
DATABASE_URL=postgresql://...
```

**En `package.json`:**
```json
{
  "scripts": {
    "validate:env": "node scripts/validate-env.js"
  }
}
```

**`scripts/validate-env.js`:**
```javascript
const requiredEnvVars = ['VITE_API_URL'];
const missing = requiredEnvVars.filter(v => !process.env[v]);

if (missing.length > 0) {
  console.error(`Missing required env vars: ${missing.join(', ')}`);
  process.exit(1);
}
```

### 2. Logging & Error Handling

```typescript
// ✓ NUNCA logs sensible data
console.log(token); // ❌
console.log(password); // ❌
console.log(creditCard); // ❌

// ✓ BUENO: Log solo lo necesario
console.log('Auth attempt:', { timestamp, ip, method }); // ✓

// ✓ Error handling sin exponer detalles internos
try {
  // ...
} catch (error) {
  console.error('Internal error:', error); // Backend log
  res.status(500).json({ 
    error: 'Something went wrong' // Frontend message
  });
}
```

### 3. HTTPS & Headers Seguros

```typescript
// Express middleware seguro
app.use((req, res, next) => {
  // ✓ Force HTTPS en producción
  if (process.env.NODE_ENV === 'production' && !req.secure) {
    return res.redirect(301, `https://${req.host}${req.url}`);
  }

  // ✓ Prevent clickjacking
  res.setHeader('X-Frame-Options', 'DENY');

  // ✓ Prevent MIME sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');

  // ✓ Enable XSS protection (legacy browsers)
  res.setHeader('X-XSS-Protection', '1; mode=block');

  // ✓ Content Security Policy
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'wasm-unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:;"
  );

  // ✓ Referrer Policy
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

  next();
});
```

### 4. Rate Limiting

```typescript
import rateLimit from 'express-rate-limit';

// ✓ Limitar intentos de login
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // 5 intentos
  message: 'Demasiados intentos de login, intenta más tarde',
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => req.ip || req.connection.remoteAddress || '', // Usar IP real
});

app.post('/api/auth/login', loginLimiter, (req, res) => {
  // Handler...
});

// ✓ Limitar API general
const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minuto
  max: 100, // 100 requests
});

app.use('/api/', apiLimiter);
```

### 5. Dependency Updates

```bash
# Script: scripts/security-check.sh
#!/bin/bash

set -e

echo "🔍 Running security audit..."
pnpm audit --audit-level=moderate

echo "✅ Audit passed!"
```

**En `package.json`:**
```json
{
  "scripts": {
    "precommit": "pnpm security-check",
    "security-check": "bash scripts/security-check.sh"
  }
}
```

---

## 🚨 Respuesta a Incidentes

### Proceso de Escalada

1. **Reporte Recibido** → Confirmación dentro de 24h
2. **Investigación** → Reproducir y evaluar impacto
3. **Notificación Preliminar** → Informar severidad a usuarios clave
4. **Desarrollo del Fix** → Patch en rama privada
5. **Testing Interno** → Vitest + Storybook + manual
6. **Release Coordinado** → Publicar versión con CVE (si aplica)
7. **Comunicación Post-Mortem** → Análisis y medidas preventivas

### Changelog Entry (Vulnerabilidad Identificada)

```markdown
## [1.1.1] - 2026-10-15

### 🔒 Security

- **CRITICAL:** Fixed XSS vulnerability in Tooltip component when rendering user input
  - Updated to use DOMPurify sanitization by default
  - All components now escape HTML by default unless explicitly opted-in
  - See [CVE-2026-XXXX](https://nvd.nist.gov/vuln/detail/CVE-2026-XXXX) for details
  - **Upgrade immediately** if using Tooltip/Popover with untrusted input
  
- **HIGH:** File upload size validation now enforced on client + server

### 📚 Documentation

- Added comprehensive SECURITY.md guide
- New examples for safe input handling in README
```

---

## 📖 Referencias

### OWASP

- [OWASP Top 10 2023](https://owasp.org/Top10/)
- [XSS Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)
- [Authorization Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html)

### Standards & Best Practices

- [OWASP Dependency Check](https://owasp.org/www-project-dependency-check/)
- [CWE Top 25](https://cwe.mitre.org/top25/)
- [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework/)

### React Security

- [React Documentation: Security](https://react.dev/learn/security)
- [npm audit & npm ci](https://docs.npmjs.com/cli/v8/commands/npm-audit)

### Librerías Recomendadas

```json
{
  "dependencies": {
    "dompurify": "^3.x",
    "zod": "^3.x",
    "valibot": "^0.x"
  },
  "devDependencies": {
    "@types/dompurify": "^3.x"
  }
}
```

---

## 📞 Contacto y Soporte

**Para reportar vulnerabilidades:**
📧 [alcides.altamirano@gmail.com](mailto:alcides.altamirano@gmail.com)

**Para preguntas generales de seguridad:**
💬 [GitHub Discussions](https://github.com/AlcsPower/alcs-ui/discussions)

**Para issues públicas:**
🐛 [GitHub Issues](https://github.com/AlcsPower/alcs-ui/issues)

---

**Última actualización:** 2026-10-08
**Versión:** 1.0
**Autor:** Alcides Altamirano / AlcsPower
