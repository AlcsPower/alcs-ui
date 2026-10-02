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
  sourcemap: true,
  clean: false, // will keep dist/styles.css when building
  treeshake: true,
  splitting: false,
  banner: {
    js: "'use client';"
  },
  external: ['react', 'react-dom'],
  esbuildOptions(options) {
    options.banner = {
      js: "'use client';"
    };
  }
});
