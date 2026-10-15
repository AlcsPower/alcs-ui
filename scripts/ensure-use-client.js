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

  // 3. Resolver 'Dynamic require of "react" is not supported' en el bundle ESM
  if (file === 'index.js') {
    // Detectar variables importadas de React y ReactDOM en dist/index.js
    const reactMatch = content.match(/import\s+([a-zA-Z0-9_$]+)__default,\s*\{[^}]*\}\s+from\s+['"]react['"]/);
    const reactNamespaceMatch = content.match(/import\s+\*\s+as\s+([a-zA-Z0-9_$]+)\s+from\s+['"]react['"]/);
    const reactDomMatch = content.match(/import\s+([a-zA-Z0-9_$]+)__default,\s*\{[^}]*\}\s+from\s+['"]react-dom['"]/);
    const reactDomNamespaceMatch = content.match(/import\s+\*\s+as\s+([a-zA-Z0-9_$]+)\s+from\s+['"]react-dom['"]/);

    const reactVar = reactMatch ? reactMatch[1] + '__default' : (reactNamespaceMatch ? reactNamespaceMatch[1] : null);
    const reactDomVar = reactDomMatch ? reactDomMatch[1] + '__default' : (reactDomNamespaceMatch ? reactDomNamespaceMatch[1] : null);

    // Reemplazar la función __require de esbuild para que resuelva "react" y "react-dom"
    const dynamicRequireRegex = /if\s*\(typeof require !== "undefined"\)\s*return require\.apply\(this,\s*arguments\);\s*throw Error\('Dynamic require of "' \+ ([a-zA-Z0-9_$]+) \+ '" is not supported'\);/;

    if (dynamicRequireRegex.test(content)) {
      content = content.replace(dynamicRequireRegex, (match, argName) => {
        let safeResolution = '';
        if (reactVar) {
          safeResolution += `if (${argName} === "react") return typeof ${reactVar} !== "undefined" ? ${reactVar} : (typeof require !== "undefined" ? require(${argName}) : undefined);\n  `;
        }
        if (reactDomVar) {
          safeResolution += `if (${argName} === "react-dom") return typeof ${reactDomVar} !== "undefined" ? ${reactDomVar} : (typeof require !== "undefined" ? require(${argName}) : undefined);\n  `;
        }
        return `if (typeof require !== "undefined") return require.apply(this, arguments);\n  ${safeResolution}throw Error('Dynamic require of "' + ${argName} + '" is not supported');`;
      });
      console.log(`[ensure-use-client] Patched dynamic __require("react") handler in dist/${file}`);
    }
  }

  fs.writeFileSync(filePath, content, 'utf8');
}
