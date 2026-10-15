# CLAUDE.md — @alcspower/ui

This file provides guidance to Claude Code (claude.ai/code) when working with this repository.

## Project Overview

`@alcspower/ui` is an accessible React component library (68 components) built on Radix UI, Tailwind CSS v4, and CVA. Version 1.6.4. Self-contained bundle with full SSR compatibility — consumers only need `react` and `react-dom`.

## Build & Development Commands

```bash
pnpm dev              # Watch mode (tsup --watch)
pnpm build            # Build JS + CSS bundles
pnpm typecheck        # TypeScript strict check
pnpm test             # Run all tests (Vitest + axe-core)
pnpm test:watch       # Watch mode tests
pnpm test:coverage    # Coverage report
pnpm storybook        # Dev Storybook on :6006
pnpm build-storybook  # Static Storybook
```

## Architecture

- **Source:** `src/components/` organized by category (forms, data-display, time, overlays, feedback, navigation, layout, accessibility)
- **Barrel Export:** `src/index.ts` re-exports all components and utilities
- **Styling:** CSS custom properties `--alcspower-*` in `src/styles/tokens.css`, encapsulated in `@layer alcspower-tokens` and `@layer alcspower-ui`
- **Build:** tsup (ESM + CJS + DTS) + Tailwind CLI (CSS)
- **Bundle:** Self-contained bundle with built-in DOM guards for Node/SSR and ESM shims

## Key Conventions

- Component pattern: `React.forwardRef` + `cva()` + `cn()`
- File naming: kebab-case directories, PascalCase component files
- Testing: Every component has `.test.tsx` with Vitest + @testing-library/react + vitest-axe
- Storybook: Every component has `.stories.tsx` with Storybook 8
- API Preservation: Never remove/rename exports. Use `@deprecated` JSDoc before removal.
- Import from `'@alcspower/ui'` only — never internal paths
- Use `alcspower-*` semantic tokens exclusively — never hardcode colors

## Common Patterns

### Consumer Rules & Best Practices
1. ALWAYS import from `'@alcspower/ui'` — never use internal paths
2. ALWAYS import styles: `import '@alcspower/ui/styles.css'` or `@import "@alcspower/ui/styles.css"` in CSS
3. ALWAYS use semantic token classes (`bg-alcspower-primary`, `text-alcspower-foreground`, `border-alcspower-border`) — NEVER hardcode hex colors
4. Use `cn()` from `'@alcspower/ui'` for Tailwind class merging
5. Use compound subcomponents (e.g., `Card` → `CardHeader`, `CardTitle`, `CardContent`, `CardFooter`)
6. Use `asChild` prop for polymorphic rendering (wraps Radix UI `Slot`)
7. For `DataTable`, use `createColumnHelper` and `AlcsColumnDef` directly from `'@alcspower/ui'`. Differentiate `accessorFn: (item) => ...` from `cell: ({ row }) => row.original...`
8. Place `<Toaster position="bottom-right" richColors />` once in app root
9. Use `toast.success()`, `.error()`, `.warning()`, `.info()`, `.promise()` for notifications

### Design Tokens (`--alcspower-*`)
All colors, radii, shadows defined as CSS custom properties in `src/styles/tokens.css`.
- Light mode: `:root { ... }`
- Dark mode: `.dark, [data-theme="dark"] { ... }`

Key tokens: `--alcspower-primary`, `--alcspower-foreground`, `--alcspower-background`, `--alcspower-surface`, `--alcspower-destructive`, `--alcspower-success`, `--alcspower-warning`, `--alcspower-info`, `--alcspower-border`, `--alcspower-ring`

### Component Categories (68 Components)
| Category | Key Components |
|---|---|
| Forms (20) | Button, Input, NumberInput, Field (compound), Checkbox, Switch, Select, Combobox, MultiSelect, RadioGroup, Slider, Toggle, ToggleGroup, SearchInput, PasswordInput, OTPInput, TagsInput, FileUpload, Textarea, Label |
| Data Display (16) | Badge, StatusBadge, Card (compound), Avatar, Table, DataTable (TanStack), Pagination, Separator, Timeline, Kbd, Chart (Recharts), MetricCard, StatCard, DeltaIndicator, Sparkline, Gauge |
| Overlays (10) | Dialog, AlertDialog, ConfirmDialog, Sheet, Drawer, Popover, Tooltip, DropdownMenu, ContextMenu, Command/CommandDialog |
| Feedback (8) | Alert, Toaster/toast (Sonner), Skeleton, Spinner, LoadingOverlay, Progress, EmptyState, ErrorState |
| Navigation (6) | Tabs, Accordion, Breadcrumb, Collapsible, Stepper, TreeView |
| Time (3) | Calendar, DatePicker, DateRangePicker |
| Layout (4) | Container, Grid, Stack, ScrollArea |
| Accessibility (1) | VisuallyHidden |
| Utilities | cn(), customTwMerge, isSafeUrl(), escapeHtml(), stripHtml(), createColumnHelper |
