import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '..', 'dist');

const filesToPatch = ['index.js', 'index.cjs'];

for (const file of filesToPatch) {
  const filePath = path.join(distDir, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    if (!content.startsWith("'use client';") && !content.startsWith('"use client";')) {
      content = `'use client';\n${content}`;
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`[ensure-use-client] Prepended 'use client'; to dist/${file}`);
    } else {
      console.log(`[ensure-use-client] 'use client' already present in dist/${file}`);
    }
  } else {
    console.warn(`[ensure-use-client] Target not found: dist/${file}`);
  }
}
