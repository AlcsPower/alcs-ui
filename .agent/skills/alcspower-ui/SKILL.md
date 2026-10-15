# @alcspower/ui — Agent Instructions

## Identity
- **Package:** `@alcspower/ui` v1.6.4
- **Description:** Accessible React component library (68 components) with semantic design tokens
- **Tech Stack:** React 18/19, TypeScript 5.7 (strict), Tailwind CSS v4, Radix UI, CVA
- **Bundled:** Lucide React, Sonner, cmdk, TanStack Table, Recharts, react-day-picker, date-fns
- **Distribution:** Self-contained bundle with full SSR & Node compatibility, zero manual sub-dependencies, only react + react-dom as host peers
- **npm:** https://www.npmjs.com/package/@alcspower/ui
- **GitHub:** https://github.com/AlcsPower/alcs-ui

## Rules for Consumers
1. ALWAYS import from `'@alcspower/ui'` — never use internal paths
2. ALWAYS import styles: `import '@alcspower/ui/styles.css'` or `@import "@alcspower/ui/styles.css"` in CSS
3. ALWAYS use semantic token classes (`bg-alcspower-primary`, `text-alcspower-foreground`, `border-alcspower-border`) — NEVER hardcode hex colors
4. Use `cn()` from `'@alcspower/ui'` for Tailwind class merging
5. Use compound subcomponents (e.g., `Card` → `CardHeader`, `CardTitle`, `CardContent`, `CardFooter`)
6. Use `asChild` prop for polymorphic rendering (wraps Radix UI `Slot`)
7. For `DataTable`, use `createColumnHelper` and `AlcsColumnDef` directly from `'@alcspower/ui'`. Differentiate `accessorFn: (item) => ...` from `cell: ({ row }) => row.original...`
8. Place `<Toaster position="bottom-right" richColors />` once in app root
9. Use `toast.success()`, `.error()`, `.warning()`, `.info()`, `.promise()` for notifications

## Rules for Library Development
1. Component pattern: `React.forwardRef` + `cva()` + `cn()`
2. File structure per component: `ComponentName.tsx`, `ComponentName.test.tsx`, `ComponentName.stories.tsx`, `index.ts`
3. File naming: kebab-case for files, PascalCase for components
4. Testing: Vitest + @testing-library/react + vitest-axe (0 a11y violations required)
5. Validate: `pnpm typecheck && pnpm test && pnpm build`
6. API Preservation: Never remove/rename exports. Deprecate with `@deprecated` JSDoc first.
7. CSS: Use `alcspower-*` token classes exclusively. Styles encapsulated in `@layer alcspower-tokens` and `@layer alcspower-ui`.

## Component Categories (68 Components)
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
