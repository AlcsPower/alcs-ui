import { build } from 'vite';
import { JSDOM } from 'jsdom';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const smokeDir = path.join(rootDir, 'node_modules', '.smoke-consumer');
if (!fs.existsSync(smokeDir)) fs.mkdirSync(smokeDir, { recursive: true });

const entryCode = `
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Button, Badge, Switch, DataTable, createColumnHelper } from '../../dist/index.js';

const columnHelper = createColumnHelper();
const columns = [
  columnHelper.accessor('name', {
    header: 'Nombre',
    cell: (info) => info.getValue(),
  }),
];

export function renderApp(container) {
  const root = createRoot(container);
  root.render(
    React.createElement('div', { id: 'app' },
      React.createElement(Button, { variant: 'primary' }, 'Boton Prueba'),
      React.createElement(Badge, { variant: 'default' }, 'Activo'),
      React.createElement(Switch, { checked: true, 'aria-label': 'Interruptor' }),
      React.createElement(DataTable, { columns, data: [{ name: 'Item 1' }] })
    )
  );
}
`;

const entryFile = path.join(smokeDir, 'entry.jsx');
fs.writeFileSync(entryFile, entryCode, 'utf8');

console.log('[smoke-test] 1. Compilando aplicación consumidora con Vite (modo producción ESM)...');

const outDir = path.join(smokeDir, 'dist');
await build({
  root: smokeDir,
  build: {
    outDir,
    emptyOutDir: true,
    target: 'esnext',
    lib: {
      entry: entryFile,
      formats: ['es'],
      fileName: () => 'bundle.js',
    },
    rollupOptions: {
      external: [],
    },
  },
  logLevel: 'warn',
});

console.log('[smoke-test] 2. Verificando ejecución en DOM simulando navegador (JSDOM)...');

const dom = new JSDOM('<!DOCTYPE html><html><body><div id="root"></div></body></html>', {
  runScripts: 'outside-only',
  pretendToBeVisual: true,
  url: 'http://localhost:3000',
});

// Polyfill window & document en global para la ejecución de React en jsdom
globalThis.window = dom.window;
globalThis.document = dom.window.document;
globalThis.HTMLElement = dom.window.HTMLElement;
globalThis.HTMLFormElement = dom.window.HTMLFormElement;
globalThis.HTMLInputElement = dom.window.HTMLInputElement;

const bundleUrl = 'file:///' + path.join(outDir, 'bundle.js').replace(/\\/g, '/');
const { renderApp } = await import(bundleUrl);

const rootContainer = dom.window.document.getElementById('root');
renderApp(rootContainer);

// Esperar al ciclo de render de React 19
await new Promise((resolve) => setTimeout(resolve, 300));

const renderedHtml = rootContainer.innerHTML;

if (!renderedHtml || renderedHtml.length < 20) {
  console.error('[smoke-test] ❌ FALLÓ: El contenedor #root quedó vacío tras el render.');
  process.exit(1);
}

console.log(`[smoke-test] ✅ ÉXITO ROTUNDO: Bundle de Vite ejecutado sin errores.`);
console.log(`[smoke-test] Contenido renderizado en #root (${renderedHtml.length} caracteres):`);
console.log(renderedHtml.slice(0, 250) + '...');

// Limpieza
fs.rmSync(smokeDir, { recursive: true, force: true });
