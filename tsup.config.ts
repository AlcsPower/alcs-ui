import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: {
    compilerOptions: {
      composite: false,
      incremental: false
    }
  },
  shims: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  splitting: false,
  banner: {
    js: "'use client';"
  },
  external: ['react', 'react-dom', 'react/jsx-runtime'],
  noExternal: [/^(?!react($|\/)|react-dom($|\/)).*$/],
  esbuildOptions(options) {
    options.banner = {
      js: "'use client';"
    };
  }
});
