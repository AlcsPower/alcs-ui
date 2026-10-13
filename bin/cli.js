#!/usr/bin/env node

/**
 * @alcspower/ui — Official Developer & AI Agent CLI
 * Fast, zero-dependency CLI to scaffold agent rules, inspect component APIs, and manage snippets.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const packageRoot = path.resolve(__dirname, '..');
const targetRoot = process.cwd();

// Leer registry.json
const registryPath = path.join(packageRoot, 'registry.json');
let registry = null;
if (fs.existsSync(registryPath)) {
  try {
    registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
  } catch (e) {
    // ignore
  }
}

// Colores ANSI
const c = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  red: '\x1b[31m',
  dim: '\x1b[90m',
};

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function copyFileSafe(src, dest, label) {
  try {
    if (fs.existsSync(src)) {
      ensureDir(path.dirname(dest));
      fs.copyFileSync(src, dest);
      console.log(` ${c.green}✔${c.reset} ${label} ${c.dim}-> ${path.relative(targetRoot, dest)}${c.reset}`);
      return true;
    } else {
      console.log(` ${c.yellow}!${c.reset} ${label} ${c.dim}(origen no encontrado: ${src})${c.reset}`);
      return false;
    }
  } catch (err) {
    console.error(` ${c.red}✖${c.reset} Error al copiar ${label}:`, err.message);
    return false;
  }
}

// Comandos
function runInitAgent() {
  console.log(`\n${c.cyan}${c.bold}⚡ Configurando @alcspower/ui para Agentes de IA y Desarrolladores...${c.reset}\n`);

  // 1. VS Code Snippets
  copyFileSafe(
    path.join(packageRoot, 'snippets', 'alcspower.code-snippets'),
    path.join(targetRoot, '.vscode', 'alcspower.code-snippets'),
    'VS Code Snippets'
  );

  // 2. Cursor Rules
  copyFileSafe(
    path.join(packageRoot, 'skill', 'alcspower-ui.mdc'),
    path.join(targetRoot, '.cursor', 'rules', 'alcspower-ui.mdc'),
    'Cursor Rules'
  );

  // 3. Claude Code
  copyFileSafe(
    path.join(packageRoot, 'skill', 'CLAUDE.md'),
    path.join(targetRoot, 'CLAUDE.md'),
    'Claude Code Instructions'
  );

  // 4. GitHub Copilot
  copyFileSafe(
    path.join(packageRoot, 'skill', 'copilot-instructions.md'),
    path.join(targetRoot, '.github', 'copilot-instructions.md'),
    'GitHub Copilot Instructions'
  );

  // 5. Agent Skill (Antigravity)
  copyFileSafe(
    path.join(packageRoot, 'skill', 'AGENT.md'),
    path.join(targetRoot, '.agent', 'skills', 'alcspower-ui', 'SKILL.md'),
    'Agent Skill Specification'
  );

  // 6. llms-small.txt
  copyFileSafe(
    path.join(packageRoot, 'llms-small.txt'),
    path.join(targetRoot, 'llms-small.txt'),
    'LLMs Context Reference (llms-small.txt)'
  );

  console.log(`\n${c.green}${c.bold}✅ ¡Configuración completada con éxito!${c.reset}`);
  console.log(`${c.dim}Recuerda importar los estilos globales en tu aplicación raíz:${c.reset}`);
  console.log(`${c.yellow}import '@alcspower/ui/styles.css';${c.reset}\n`);
}

function runSnippets() {
  console.log(`\n${c.cyan}${c.bold}📦 Instalando Snippets de VS Code...${c.reset}\n`);
  copyFileSafe(
    path.join(packageRoot, 'snippets', 'alcspower.code-snippets'),
    path.join(targetRoot, '.vscode', 'alcspower.code-snippets'),
    'VS Code Snippets'
  );
  console.log(`\n${c.green}Listo. Puedes usar los prefijos 'alcs-*' (ej. alcs-button, alcs-card) en tus archivos .tsx/.jsx.${c.reset}\n`);
}

function runList() {
  if (!registry || !registry.components) {
    console.error(`${c.red}Error: No se encontró el registro de componentes.${c.reset}`);
    return;
  }

  console.log(`\n${c.cyan}${c.bold}📚 Catálogo de Componentes @alcspower/ui (${Object.keys(registry.components).length} componentes)${c.reset}\n`);

  const categories = {};
  for (const [name, meta] of Object.entries(registry.components)) {
    const cat = meta.category || 'otros';
    if (!categories[cat]) categories[cat] = [];
    categories[cat].push(name);
  }

  for (const [cat, comps] of Object.entries(categories)) {
    console.log(`${c.bold}${c.magenta}[${cat.toUpperCase()}]${c.reset} (${comps.length})`);
    console.log(`  ${comps.join(', ')}\n`);
  }

  console.log(`${c.dim}Para inspeccionar un componente específico usa:${c.reset} ${c.yellow}alcspower-ui info <Componente>${c.reset}\n`);
}

function runInfo(componentName) {
  if (!componentName) {
    console.log(`${c.yellow}Por favor especifica un componente. Ejemplo:${c.reset} alcspower-ui info Button`);
    return;
  }

  if (!registry || !registry.components) {
    console.error(`${c.red}Error: No se encontró el registro de componentes.${c.reset}`);
    return;
  }

  // Búsqueda case-insensitive
  const targetKey = Object.keys(registry.components).find(
    (k) => k.toLowerCase() === componentName.toLowerCase()
  );

  if (!targetKey) {
    console.log(`\n${c.red}✖ Componente '${componentName}' no encontrado en @alcspower/ui.${c.reset}`);
    console.log(`${c.dim}Ejecuta '${c.yellow}alcspower-ui list${c.dim}' para ver los componentes disponibles.${c.reset}\n`);
    return;
  }

  const comp = registry.components[targetKey];
  console.log(`\n${c.cyan}${c.bold}Componente: <${targetKey} />${c.reset} ${c.dim}(Categoría: ${comp.category})${c.reset}`);
  console.log(`${c.dim}Import:${c.reset} import { ${targetKey} } from '@alcspower/ui';\n`);

  if (comp.subcomponents && comp.subcomponents.length > 0) {
    console.log(`${c.bold}Subcomponentes:${c.reset} ${comp.subcomponents.join(', ')}`);
  }
  if (comp.variants && comp.variants.length > 0) {
    console.log(`${c.bold}Variantes:${c.reset} ${comp.variants.join(' | ')}`);
  }
  if (comp.sizes && comp.sizes.length > 0) {
    console.log(`${c.bold}Tamaños:${c.reset} ${comp.sizes.join(' | ')}`);
  }
  if (comp.props && comp.props.length > 0) {
    console.log(`${c.bold}Props Clave:${c.reset} ${comp.props.join(', ')}`);
  }

  if (comp.example) {
    console.log(`\n${c.bold}Ejemplo de uso:${c.reset}`);
    console.log(`${c.green}${comp.example}${c.reset}\n`);
  }
}

function runTokens() {
  console.log(`\n${c.cyan}${c.bold}🎨 Tokens Semánticos Principales (--alcspower-*)${c.reset}\n`);
  console.log(`  ${c.bold}Fondos:${c.reset}       bg-alcspower-background, bg-alcspower-surface, bg-alcspower-surface-muted, bg-alcspower-primary`);
  console.log(`  ${c.bold}Textos:${c.reset}       text-alcspower-foreground, text-alcspower-muted-foreground, text-alcspower-primary`);
  console.log(`  ${c.bold}Bordes:${c.reset}       border-alcspower-border, border-alcspower-border-strong`);
  console.log(`  ${c.bold}Estados:${c.reset}      bg-alcspower-destructive, bg-alcspower-success, bg-alcspower-warning, bg-alcspower-info`);
  console.log(`  ${c.bold}Foco/Anillo:${c.reset}  focus-visible:ring-3 focus-visible:ring-alcspower-primary/20`);
  console.log(`\n${c.dim}Todos los tokens soportan Modo Oscuro automáticamente mediante la clase '.dark' o 'data-theme=\"dark\"'.${c.reset}\n`);
}

function runHelp() {
  console.log(`
${c.cyan}${c.bold}@alcspower/ui CLI${c.reset} — Herramienta de productividad para Desarrolladores y Agentes de IA

${c.bold}USO:${c.reset}
  npx @alcspower/ui <comando> [opciones]
  o localmente: alcspower-ui <comando>

${c.bold}COMANDOS DISPONIBLES:${c.reset}
  ${c.yellow}init-agent${c.reset}       Configura reglas para Cursor, Claude Code, Copilot, Antigravity y VS Code
  ${c.yellow}snippets${c.reset}         Instala únicamente los snippets de VS Code (.vscode/alcspower.code-snippets)
  ${c.yellow}list${c.reset}             Lista todos los componentes agrupados por categoría
  ${c.yellow}info <componente>${c.reset} Muestra variantes, tamaños, subcomponentes y ejemplos de un componente
  ${c.yellow}tokens${c.reset}           Muestra los tokens de diseño CSS semánticos principales
  ${c.yellow}help${c.reset}             Muestra esta ayuda

${c.bold}EJEMPLOS:${c.reset}
  npx @alcspower/ui init-agent
  npx @alcspower/ui info Button
  npx @alcspower/ui info DataTable
  npx @alcspower/ui list
`);
}

// Router de comandos CLI
const args = process.argv.slice(2);
const command = args[0] ? args[0].toLowerCase() : 'help';

switch (command) {
  case 'init':
  case 'init-agent':
  case 'setup':
  case 'setup-agent':
    runInitAgent();
    break;
  case 'snippets':
    runSnippets();
    break;
  case 'list':
  case 'ls':
  case 'catalog':
    runList();
    break;
  case 'info':
  case 'inspect':
  case 'show':
  case 'doc':
  case 'docs':
    runInfo(args[1]);
    break;
  case 'tokens':
    runTokens();
    break;
  case 'help':
  case '--help':
  case '-h':
  default:
    runHelp();
    break;
}
