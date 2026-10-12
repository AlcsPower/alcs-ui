# 🟢 Módulo 01: Instalación y Configuración del Entorno

> **"Un buen carpintero primero prepara su mesa de trabajo y afila sus herramientas. Hoy prepararemos la tuya."**

¡Bienvenido al Módulo 01! En el capítulo anterior comprendiste los conceptos fundamentales: React, componentes, TypeScript y la biblioteca `@alcspower/ui`. Ahora ha llegado el momento de pasar a la acción práctica.

En este módulo vamos a configurar todo lo necesario en tu computadora para que puedas escribir código y ver tus creaciones cobrando vida en el navegador en tiempo real. Aunque nunca hayas instalado un programa para desarrollo, no te preocupes: te guiaremos paso a paso, con comandos claros y explicaciones de cada botón que debes presionar.

---

## 📚 Lo que aprenderás en este capítulo

1. **Herramientas necesarias**: ¿Qué es Node.js, pnpm y VS Code?
2. **Paso 1: Instalación de Node.js (versión 20 o superior)**.
3. **Paso 2: Instalación de pnpm** (el gestor de paquetes más rápido).
4. **Paso 3: Creación de tu proyecto con Vite y TypeScript**.
5. **Paso 4: Configuración de GitHub Packages y `.npmrc`** para acceder a `@alcspower/ui`.
6. **Paso 5: Instalación de `@alcspower/ui` y los iconos de Lucide**.
7. **Paso 6: Inyección de la hoja de estilos global**.
8. **Paso 7: Tu primera prueba de fuego**: Mostrar un botón funcional en `App.tsx`.
9. **¿Qué puede salir mal?**: Guía de resolución de los 5 errores más comunes en Windows y Mac.
10. **Mini-ejercicio guiado** para consolidar lo aprendido.

---

## 🧰 Las Herramientas del Carpintero Digital

Para construir nuestra aplicación web necesitamos tres herramientas esenciales en nuestro sistema operativo:

### 1. Visual Studio Code (VS Code) — Tu Editor de Código
Es el programa donde escribirás tus archivos de código. Es gratuito, desarrollado por Microsoft, y cuenta con resaltado de sintaxis, autocompletado inteligente y una terminal integrada.
- 🔗 **Descarga oficial**: [https://code.visualstudio.com/](https://code.visualstudio.com/)
- *Consejo*: Al instalarlo en Windows, marca las casillas que dicen *"Agregar 'Abrir con Code' al menú contextual del Explorador de Windows"*. Te facilitará la vida enormemente.

### 2. Node.js — El Motor de Ejecución
Tu navegador web entiende JavaScript de forma nativa, pero tu computadora en su sistema operativo no sabe cómo ejecutar herramientas modernas de desarrollo sin un motor. **Node.js** es un programa que le enseña a tu computadora a ejecutar JavaScript fuera del navegador.
- Necesitaremos la versión **Node.js 20 LTS** o superior.

### 3. pnpm — El Gestor de Paquetes Eficiente
En el Módulo 00 aprendimos que los gestores de paquetes son como tiendas de aplicaciones para programadores. **pnpm** es una alternativa moderna a `npm` que ahorra gigabytes de espacio en tu disco duro y descarga librerías a una velocidad increíble mediante enlaces duros.

---

## 📥 Paso 1: Instalación de Node.js

1. Abre tu navegador web favorito y dirígete al sitio oficial de Node.js:
   👉 **[https://nodejs.org/](https://nodejs.org/)**
2. Verás dos botones grandes de descarga:
   - **LTS (Long Term Support)**: Es la versión recomendada para la gran mayoría de usuarios porque es la más estable y probada.
   - **Current**: La versión con las funciones más experimentales.
3. Haz clic en el botón verde de la versión **LTS** (asegúrate de que sea la versión 20.x o superior).
4. Se descargará un archivo instalador (`.msi` en Windows o `.pkg` en Mac).
5. Abre el instalador descargado y sigue el asistente:
   - Haz clic en **Next** (Siguiente).
   - Acepta los términos de licencia y haz clic en **Next**.
   - Deja la carpeta de instalación por defecto y haz clic en **Next**.
   - En la pantalla de opciones de herramientas adicionales, puedes dejar todo por defecto y hacer clic en **Install**.
   - Espera a que la barra de progreso termine y presiona **Finish**.

### 🔍 ¿Cómo comprobamos que quedó bien instalado?
Abre una terminal. En Windows, puedes presionar la tecla `Windows`, escribir `PowerShell` o `cmd` y presionar `Enter`.
Escribe el siguiente comando y presiona `Enter`:

```bash
node -v
```

Deberías ver una respuesta similar a:
```text
v20.18.0   (o un número superior como v22.x.x)
```
Si ves ese número de versión con una "v" al inicio, **¡felicidades, Node.js ya está funcionando en tu equipo!**

---

## ⚡ Paso 2: Instalación de pnpm

Node.js incluye por defecto una herramienta llamada `npm`. Con ella podemos instalar `pnpm` de forma global en tu máquina ejecutando una sola línea de comando.

En tu misma ventana de terminal, escribe:

```bash
npm install -g pnpm
```

> **Explicación del comando:**
> - `npm`: Le hablamos al gestor de Node.
> - `install`: Le pedimos que descargue e instale un paquete.
> - `-g`: Significa "global", lo que permite que el comando `pnpm` esté disponible en cualquier carpeta de tu computadora.
> - `pnpm`: Es el nombre de la herramienta.

Una vez que termine la instalación (toma unos segundos), verifica que funcione escribiendo:

```bash
pnpm -v
```

Deberías ver un número como `9.12.0` o superior.

---

## 🏗️ Paso 3: Crear tu Proyecto con Vite y TypeScript

Ahora que tenemos nuestras herramientas listas, vamos a crear la carpeta de nuestra aplicación llamada `mi-agenda`.

Utilizaremos **Vite** (se pronuncia *"vit"*, palabra francesa que significa "rápido"), que es la herramienta estándar actual de la industria para generar proyectos de React modernos sin configuraciones engorrosas.

### 1. Elige una carpeta de trabajo
Por ejemplo, tu carpeta de Documentos o Proyectos. En la terminal puedes navegar o simplemente escribir:

```bash
pnpm create vite mi-agenda --template react-ts
```

> **¿Qué hace este comando?**
> - `pnpm create vite`: Descarga la plantilla oficial del generador Vite.
> - `mi-agenda`: Es el nombre de la carpeta que se creará para tu proyecto.
> - `--template react-ts`: Le indica a Vite que queremos React configurado con **TypeScript** listo desde el primer segundo.

### 2. Entra a la carpeta de tu nuevo proyecto
Escribe:

```bash
cd mi-agenda
```

> `cd` significa *"change directory"* (cambiar de directorio). Ahora tu terminal se encuentra dentro de la carpeta `mi-agenda`.

### 3. Instala las dependencias base
Escribe:

```bash
pnpm install
```

Vite descargará en un par de segundos todas las piezas fundamentales de React 19 y TypeScript.

---

## 🔑 Paso 4: Configuración de GitHub Packages y `.npmrc`

La biblioteca `@alcspower/ui` es un paquete empresarial publicado en el registro privado de **GitHub Packages** (`npm.pkg.github.com`). Por cuestiones de seguridad y control, npm necesita saber:
1. Dónde buscar paquetes que comiencen con el prefijo `@alcspower`.
2. Un token de autenticación (clave de acceso personal de GitHub) para permitir la descarga.

Para configurar esto, creamos un archivo especial llamado `.npmrc` justo en la raíz de tu proyecto `mi-agenda`.

### Opción A: Desde la terminal (rápido)

En tu terminal (asegúrate de seguir dentro de `mi-agenda`), ejecuta los siguientes dos comandos:

```bash
echo @alcspower:registry=https://npm.pkg.github.com >> .npmrc
echo //npm.pkg.github.com/:_authToken=TU_TOKEN_DE_GITHUB_AQUI >> .npmrc
```

*(Reemplaza `TU_TOKEN_DE_GITHUB_AQUI` por tu Personal Access Token de GitHub con permisos de `read:packages`).*

### Opción B: Creando el archivo manualmente en VS Code
1. Abre tu proyecto en VS Code escribiendo en la terminal:
   ```bash
   code .
   ```
2. En la barra lateral izquierda, crea un nuevo archivo llamado exactamente:
   `.npmrc` *(con un punto al inicio y sin extensión .txt ni nada más)*.
3. Pega el siguiente contenido dentro de `.npmrc`:

```ini
# Configuración del registro de paquetes de @alcspower
@alcspower:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=TU_TOKEN_DE_GITHUB_AQUI
```

Guarda el archivo presionando `Ctrl + S` (o `Cmd + S` en Mac).

---

## 📦 Paso 5: Instalación de `@alcspower/ui` y Lucide Icons

Ahora que tu archivo `.npmrc` está listo y autenticado, podemos instalar la biblioteca oficial de componentes junto con la colección de iconos que utilizaremos a lo largo del instructivo:

Ejecuta en tu terminal:

```bash
pnpm add @alcspower/ui lucide-react
```

> **¿Qué hace este comando?**
> - `pnpm add`: Agrega nuevas librerías a tu proyecto y las registra en el archivo `package.json`.
> - `@alcspower/ui`: Nuestra biblioteca de botones, tarjetas, campos de formulario, etc.
> - `lucide-react`: Una hermosa colección de más de 1,000 iconos ligeros vectoriales (como teléfonos, correos, estrellas, lupas) diseñados para React.

Si todo sale bien, verás un mensaje de éxito en verde indicando que los paquetes fueron agregados correctamente.

---

## 🎨 Paso 6: Importar la Hoja de Estilos Global

Para que los componentes de `@alcspower/ui` se vean con sus colores, bordes suaves, sombras y animaciones, debemos importar su archivo de estilos CSS en el punto de entrada principal de tu aplicación.

1. En tu editor VS Code, busca la carpeta `src/`.
2. Abre el archivo `src/main.tsx`.
3. Al principio del archivo, agrega la siguiente línea de importación:

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// 🎨 Importamos los estilos oficiales de @alcspower/ui
import '@alcspower/ui/styles.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

> [!IMPORTANT]
> **No olvides este paso.** Si olvidas la línea `import '@alcspower/ui/styles.css'`, tus componentes funcionarán lógicamente pero se verán sin estilos, planos y sin colores.

---

## 🚀 Paso 7: Tu Primera Prueba de Fuego (Mostrando un Botón)

Vamos a comprobar que todo quedó configurado a la perfección.

1. Abre el archivo `src/App.tsx`.
2. Borra todo lo que tiene adentro y reemplázalo por este código limpio y sencillo:

```tsx
// Importamos el componente Button desde nuestra biblioteca
import { Button } from '@alcspower/ui';

// Definimos nuestro componente principal de la aplicación
export default function App() {
  // Función que se ejecutará cuando el usuario haga clic en el botón
  const manejarClic = () => {
    alert('¡Felicidades! Tu entorno de @alcspower/ui está configurado y funcionando al 100%.');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', fontFamily: 'sans-serif', gap: '1rem' }}>
      <h1>🎉 Mi Primer Proyecto con @alcspower/ui</h1>
      <p>Si puedes ver este botón azul y hacer clic en él, ¡todo está perfecto!</p>

      {/* Aquí usamos nuestro primer componente oficial de @alcspower/ui */}
      <Button variant="primary" size="lg" onClick={manejarClic}>
        ¡Haz clic para probarme!
      </Button>
    </div>
  );
}
```

3. Guarda los cambios (`Ctrl + S`).
4. En tu terminal, arranca el servidor de desarrollo de Vite escribiendo:

```bash
pnpm dev
```

5. Verás en la terminal un mensaje similar a este:

```text
  VITE v5.x.x  ready in 240 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

6. Mantén presionada la tecla `Ctrl` en tu teclado y haz clic en el enlace `http://localhost:5173/`, o abre tu navegador y escribe esa dirección en la barra de URL.

**¡Verás en pantalla tu título y un hermoso botón azul con bordes redondeados y efectos interactivos!** Al hacer clic, aparecerá el mensaje de alerta.

---

## ⚠️ ¿Qué puede salir mal? (Guía de Errores Comunes)

La programación está llena de pequeños tropiezos normales. Si algo no funcionó a la primera, no te desesperes: el 99% de las veces se debe a uno de los siguientes 5 casos:

### 1. Error 401 Unauthorized al ejecutar `pnpm add @alcspower/ui`
- **Síntoma**: La terminal muestra `ERR_PNPM_FETCH_401` o `HttpError: 401 Unauthorized`.
- **Causa**: El archivo `.npmrc` no existe en la raíz de tu proyecto, o el token de GitHub expiró, o tiene un espacio extra, o no tiene permiso de lectura de paquetes (`read:packages`).
- **Solución**: Revisa el archivo `.npmrc` con mucho cuidado. Asegúrate de que no haya comillas dobles innecesarias y que tu token comience típicamente con `ghp_`.

### 2. "node" o "pnpm" no se reconoce como un comando interno o externo
- **Síntoma**: Escribes `node -v` o `pnpm -v` y la terminal te dice que no reconoce la palabra.
- **Causa**: Instalaste Node.js pero tu terminal estaba abierta desde antes y no ha actualizado las variables de entorno de tu sistema.
- **Solución**: Cierra por completo la ventana de PowerShell/CMD o VS Code y vuélvela a abrir. Si el error persiste, reinicia tu computadora.

### 3. La ejecución de scripts está deshabilitada en este sistema (PowerShell)
- **Síntoma**: En Windows PowerShell aparece un texto rojo enorme que dice `PSSecurityException` o que no se puede cargar el archivo `pnpm.ps1` porque la ejecución de scripts está deshabilitada.
- **Causa**: Windows viene de fábrica con una política de seguridad estricta para scripts de PowerShell.
- **Solución**: 
  1. Presiona la tecla Windows, escribe `PowerShell`, haz clic derecho y selecciona **"Ejecutar como administrador"**.
  2. Escribe el comando:
     ```powershell
     Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
     ```
  3. Escribe `S` (Sí) y presiona Enter. Cierra esa ventana y vuelve a tu terminal habitual.

### 4. El botón aparece plano, feo y sin bordes redondos ni color azul
- **Síntoma**: El botón funciona al hacer clic pero parece un botón gris de los años 90.
- **Causa**: No importaste el archivo de estilos CSS en `src/main.tsx`.
- **Solución**: Abre `src/main.tsx` y verifica que exista la línea:
  ```tsx
  import '@alcspower/ui/styles.css';
  ```

### 5. Port 5173 is in use, trying another one...
- **Síntoma**: Vite te dice que el puerto 5173 está ocupado y abre el 5174.
- **Causa**: Tenías otra pestaña de terminal corriendo el servidor anteriormente.
- **Solución**: No hay ningún problema grave; simplemente visita la nueva dirección que Vite te indique (por ejemplo `http://localhost:5174`).

---

## 🧪 Mini-Ejercicio de Práctica

Para asegurarte de que tienes el control total de tu nuevo proyecto:

1. Modifica el archivo `src/App.tsx`.
2. Agrega un segundo botón debajo del primero con la variante `variant="destructive"` (que lo pintará de color rojo para acciones peligrosas) y con la propiedad `size="sm"` (tamaño pequeño).
3. Agrega un tercer botón con la propiedad `isLoading={true}` y `loadingText="Conectando..."` para ver cómo se muestra la animación de carga automática.
4. Guarda el archivo y observa cómo el navegador se actualiza instantáneamente en milisegundos sin que tengas que refrescar la página manualmente. ¡Eso es la magia de Vite!

---

## ✅ Resumen del Módulo 01

En este módulo lograste:
- Instalar **Node.js** y **pnpm** en tu sistema operativo.
- Crear tu primer proyecto web profesional utilizando **Vite** con la plantilla de **React + TypeScript**.
- Configurar el archivo de autenticación `.npmrc` para acceder a los paquetes de **GitHub Packages**.
- Instalar con éxito **`@alcspower/ui`** y **`lucide-react`**.
- Conectar la hoja de estilos global en `src/main.tsx`.
- Mostrar y probar con éxito tu primer componente interactivo en la pantalla.

¡Tu taller de carpintería digital está 100% equipado y listo! En el próximo capítulo comenzaremos a construir la interfaz visual de nuestra Agenda de Contactos conociendo a fondo los primeros tres bloques esenciales: `Button`, `Badge` y `Avatar`.

---

| [← Módulo 00: Introducción](00-introduccion.md) | [Módulo 02: Tu Primer Componente →](02-primer-componente.md) |
| :--- | ---: |
