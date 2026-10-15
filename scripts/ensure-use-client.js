import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '..', 'dist');

const filesToPatch = ['index.js', 'index.cjs'];

// Bloque de compatibilidad SSR para constructores de DOM en Node.js / pruebas headless
const domPolyfills = `
if (typeof globalThis !== 'undefined') {
  if (typeof globalThis.HTMLElement === 'undefined') globalThis.HTMLElement = class HTMLElement {};
  if (typeof globalThis.HTMLFormElement === 'undefined') globalThis.HTMLFormElement = class HTMLFormElement {};
  if (typeof globalThis.HTMLInputElement === 'undefined') globalThis.HTMLInputElement = class HTMLInputElement {};
}
`;

for (const file of filesToPatch) {
  const filePath = path.join(distDir, file);
  if (!fs.existsSync(filePath)) {
    console.warn(`[ensure-use-client] Target not found: dist/${file}`);
    continue;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Asegurar 'use client';
  if (!content.startsWith("'use client';") && !content.startsWith('"use client";')) {
    content = `'use client';\n${content}`;
    console.log(`[ensure-use-client] Prepended 'use client'; to dist/${file}`);
  } else {
    console.log(`[ensure-use-client] 'use client' already present in dist/${file}`);
  }

  // 2. Inyectar polyfills defensivos de DOM para SSR si no están presentes
  if (!content.includes('globalThis.HTMLFormElement = class HTMLFormElement')) {
    const useClientRegex = /^('use client';|"use client";)\r?\n/;
    if (useClientRegex.test(content)) {
      content = content.replace(useClientRegex, `$1\n${domPolyfills}\n`);
    } else {
      content = `${domPolyfills}\n${content}`;
    }
    console.log(`[ensure-use-client] Injected DOM SSR defensive guards into dist/${file}`);
  }

  // 3. Resolver 'Dynamic require of "react" is not supported' en el bundle ESM para navegador y Node
  if (file === 'index.js') {
    // Detectar variables importadas de React y ReactDOM en dist/index.js
    const reactMatch = content.match(/import\s+([a-zA-Z0-9_$]+)__default,\s*\{[^}]*\}\s+from\s+['"]react['"]/);
    const reactNamespaceMatch = content.match(/import\s+\*\s+as\s+([a-zA-Z0-9_$]+)\s+from\s+['"]react['"]/);
    const reactDomMatch = content.match(/import\s+([a-zA-Z0-9_$]+)__default,\s*\{[^}]*\}\s+from\s+['"]react-dom['"]/);
    const reactDomNamespaceMatch = content.match(/import\s+\*\s+as\s+([a-zA-Z0-9_$]+)\s+from\s+['"]react-dom['"]/);

    const reactDefaultVar = reactMatch ? reactMatch[1] + '__default' : 'undefined';
    const reactNamespaceVar = reactNamespaceMatch ? reactNamespaceMatch[1] : 'undefined';
    const reactDomDefaultVar = reactDomMatch ? reactDomMatch[1] + '__default' : 'undefined';
    const reactDomNamespaceVar = reactDomNamespaceMatch ? reactDomNamespaceMatch[1] : 'undefined';

    // Reemplazar la función __require de esbuild para que resuelva "react", "react-dom", "react/jsx-runtime"
    // sin fallar con Uncaught Error en navegadores (Chrome, Firefox, Safari) ni en SSR
    const dynamicRequireRegex = /if\s*\(typeof require !== "undefined"\)\s*return require\.apply\(this,\s*arguments\);[\s\S]*?throw Error\('Dynamic require of "' \+ ([a-zA-Z0-9_$]+) \+ '" is not supported'\);/;

    if (dynamicRequireRegex.test(content)) {
      content = content.replace(dynamicRequireRegex, (match, argName) => {
        return `if (typeof require !== "undefined") {
    try { return require.apply(this, arguments); } catch (_) {}
  }
  if (${argName} === "react") {
    var __r = typeof ${reactNamespaceVar} !== "undefined" ? ${reactNamespaceVar} : (typeof ${reactDefaultVar} !== "undefined" ? ${reactDefaultVar} : {});
    var __rDef = typeof ${reactDefaultVar} !== "undefined" ? ${reactDefaultVar} : {};
    return Object.assign({}, __rDef, __r, { default: __rDef || __r });
  }
  if (${argName} === "react-dom") {
    var __rd = typeof ${reactDomNamespaceVar} !== "undefined" ? ${reactDomNamespaceVar} : (typeof ${reactDomDefaultVar} !== "undefined" ? ${reactDomDefaultVar} : {});
    var __rdDef = typeof ${reactDomDefaultVar} !== "undefined" ? ${reactDomDefaultVar} : {};
    return Object.assign({}, __rdDef, __rd, { default: __rdDef || __rd });
  }
  if (${argName} === "react/jsx-runtime") {
    return { jsx: typeof jsx !== "undefined" ? jsx : undefined, jsxs: typeof jsxs !== "undefined" ? jsxs : undefined, Fragment: typeof Fragment !== "undefined" ? Fragment : undefined, default: { jsx: typeof jsx !== "undefined" ? jsx : undefined, jsxs: typeof jsxs !== "undefined" ? jsxs : undefined, Fragment: typeof Fragment !== "undefined" ? Fragment : undefined } };
  }
  if (${argName} === "react/jsx-dev-runtime") {
    return { jsxDEV: typeof jsx !== "undefined" ? jsx : undefined, jsx: typeof jsx !== "undefined" ? jsx : undefined, jsxs: typeof jsxs !== "undefined" ? jsxs : undefined, Fragment: typeof Fragment !== "undefined" ? Fragment : undefined, default: { jsxDEV: typeof jsx !== "undefined" ? jsx : undefined, jsx: typeof jsx !== "undefined" ? jsx : undefined, jsxs: typeof jsxs !== "undefined" ? jsxs : undefined, Fragment: typeof Fragment !== "undefined" ? Fragment : undefined } };
  }
  if (typeof console !== "undefined" && console.warn) {
    console.warn("[@alcspower/ui] Unresolved dynamic require:", ${argName});
  }
  return {};`;
      });
      console.log(`[ensure-use-client] Patched bulletproof __require handler in dist/${file}`);
    }
  }

  fs.writeFileSync(filePath, content, 'utf8');
}
