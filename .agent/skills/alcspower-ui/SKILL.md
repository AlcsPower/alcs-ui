# @alcspower/ui — Agent Instructions

## Identity
- **Package:** `@alcspower/ui` v1.6.2
- **Description:** Accessible React component library (64 components) with semantic design tokens
- **Tech Stack:** React 18/19, TypeScript 5.7 (strict), Tailwind CSS v4, Radix UI, CVA
- **Bundled:** Lucide React, Sonner, cmdk, TanStack Table, Recharts, react-day-picker, date-fns
- **Distribution:** Self-contained bundle (zero sub-dependencies, only react + react-dom as peers)
- **npm:** https://www.npmjs.com/package/@alcspower/ui
- **GitHub:** https://github.com/AlcsPower/alcs-ui

## Rules for Consumers
1. ALWAYS import from `'@alcspower/ui'` — never use internal paths
2. ALWAYS import styles: `import '@alcspower/ui/styles.css'` or `@import "@alcspower/ui/styles.css"` in CSS
3. ALWAYS use semantic token classes (`bg-alcspower-primary`, `text-alcspower-foreground`, `border-alcspower-border`) — NEVER hardcode hex colors
4. Use `cn()` from `'@alcspower/ui'` for Tailwind class merging
5. Use compound subcomponents (e.g., `Card` → `CardHeader`, `CardTitle`, `CardContent`, `CardFooter`)
6. Use `asChild` prop for polymorphic rendering (wraps Radix UI `Slot`)
7. Place `<Toaster position="bottom-right" richColors />` once in app root
8. Use `toast.success()`, `.error()`, `.warning()`, `.info()`, `.promise()` for notifications

## Rules for Library Development
1. Component pattern: `React.forwardRef` + `cva()` + `cn()`
2. File structure per component: `ComponentName.tsx`, `ComponentName.test.tsx`, `ComponentName.stories.tsx`, `index.ts`
3. File naming: kebab-case for files, PascalCase for components
4. Testing: Vitest + @testing-library/react + vitest-axe (0 a11y violations required)
5. Validate: `pnpm typecheck && pnpm test && pnpm build`
6. API Preservation: Never remove/rename exports. Deprecate with `@deprecated` JSDoc first.
7. CSS: Use `alcspower-*` token classes exclusively. Styles encapsulated in `@layer alcspower-tokens` and `@layer alcspower-ui`.

## Component Categories
| Category | Key Components |
|---|---|
| Forms | Button, Input, NumberInput, Field (compound), Checkbox, Switch, Select, Combobox, MultiSelect, RadioGroup, Slider, Toggle, ToggleGroup, SearchInput, PasswordInput, OTPInput, TagsInput, FileUpload, Textarea, Label |
| Data Display | Badge, StatusBadge, Card (compound), Avatar, Table, DataTable (TanStack), Pagination, Separator, Timeline, Kbd, Chart (Recharts), MetricCard, StatCard, DeltaIndicator |
| Overlays | Dialog, AlertDialog, ConfirmDialog, Sheet, Drawer, Popover, Tooltip, DropdownMenu, ContextMenu, Command/CommandDialog |
| Feedback | Alert, Toaster/toast (Sonner), Skeleton, Spinner, LoadingOverlay, Progress, EmptyState, ErrorState |
| Navigation | Tabs, Accordion, Breadcrumb, Collapsible, Stepper, TreeView |
| Time | Calendar, DatePicker, DateRangePicker |
| Accessibility | VisuallyHidden |
| Utilities | cn(), customTwMerge |

## Design Tokens (--alcspower-*)
All colors, radii, shadows defined as CSS custom properties in `src/styles/tokens.css`.
Light mode: `:root { ... }` | Dark mode: `.dark, [data-theme="dark"] { ... }`

Key tokens: `--alcspower-primary`, `--alcspower-foreground`, `--alcspower-background`, `--alcspower-surface`, `--alcspower-destructive`, `--alcspower-success`, `--alcspower-warning`, `--alcspower-info`, `--alcspower-border`, `--alcspower-ring`

## Self-Update
If a component is requested but not listed here, read `src/index.ts` and browse `src/components/` to discover the latest components and their APIs.
