# @alcspower/ui — Agent Guidelines (OpenCode & Generic Agents)

This file is automatically loaded by **OpenCode** and other autonomous coding agents to guide interaction with `@alcspower/ui`.

## Identity
- **Package:** `@alcspower/ui` (v1.6.6+)
- **Description:** Accessible React 18/19 component library (68 components) built on Radix UI and Tailwind CSS v4 tokens.
- **Tech Stack:** React 18/19, TypeScript 5.7 (strict), Tailwind CSS v4, Radix UI, CVA.
- **Self-Contained & SSR-Ready:** Pre-bundled with zero external runtime requirements beyond `react` and `react-dom`. Full SSR compatibility in Node/Next.js/Remix with built-in DOM constructor guards and ESM shims.

---

## Critical Rules for Consumers

1. **Imports:** ALWAYS import from the package root:
   ```tsx
   import { Button, Card, CardHeader, CardTitle, CardContent, Input, Field, Label, toast } from '@alcspower/ui';
   ```
   ❌ NEVER import from internal subpaths like `@alcspower/ui/dist/...` or `@alcspower/ui/src/...`.

2. **Required CSS:** ALWAYS ensure styles are imported in the application entry point (`main.tsx` or `App.tsx`):
   ```tsx
   import '@alcspower/ui/styles.css';
   ```

3. **Semantic Design Tokens:** ALWAYS use `alcspower-*` token utility classes.
   - Backgrounds: `bg-alcspower-background`, `bg-alcspower-surface`, `bg-alcspower-surface-muted`, `bg-alcspower-primary`, `bg-alcspower-destructive`
   - Text: `text-alcspower-foreground`, `text-alcspower-muted-foreground`, `text-alcspower-primary`
   - Borders: `border-alcspower-border`, `border-alcspower-border-strong`
   - Focus: `focus-visible:ring-3 focus-visible:ring-alcspower-primary/20`
   ❌ NEVER hardcode hex colors (`#3b82f6`) or generic Tailwind utility colors (`bg-blue-600`, `text-gray-900`).

4. **Class Merging:** Always use `cn()` from `'@alcspower/ui'` to merge Tailwind classes safely:
   ```tsx
   import { cn } from '@alcspower/ui';
   <div className={cn('p-4 bg-alcspower-surface', isActive && 'border-alcspower-primary')} />
   ```

5. **Compound Subcomponents:** Use compound parts rather than giant monolithic configs (e.g. `Card` → `CardHeader`, `CardTitle`, `CardContent`, `CardFooter`).

6. **DataTable Conventions:** Use `createColumnHelper` and `AlcsColumnDef` directly from `@alcspower/ui`. Note the difference between raw row and cell context:
   ```tsx
   import { DataTable, createColumnHelper, type AlcsColumnDef } from '@alcspower/ui';

   const columnHelper = createColumnHelper<MyData>();
   const columns = [
     // accessorFn receives the raw data item: (item: MyData) => string
     columnHelper.accessor('status', {
       header: 'Estado',
       accessorFn: (item) => item.status,
       // cell receives cell context: ({ row }) => JSX where row.original is MyData
       cell: ({ row }) => <Badge>{row.original.status}</Badge>,
     }),
   ];
   ```

7. **Polymorphic Rendering (`asChild`):** Use `asChild` to wrap custom elements or router links (`<Button asChild><Link to="/home">Inicio</Link></Button>`).

8. **Toaster:** Place `<Toaster position="bottom-right" richColors />` once in the app root. Trigger toasts with:
   ```tsx
   toast.success('Guardado correctamente');
   toast.error('Error al procesar');
   ```

---

## Component Catalog Matrix (68 Components)

| Category | Key Components |
|:---|:---|
| **Forms** (20) | `Button`, `Input`, `NumberInput`, `Field` (Compound), `Checkbox`, `Switch`, `Select`, `Combobox`, `MultiSelect`, `RadioGroup`, `Slider`, `Toggle`, `ToggleGroup`, `SearchInput`, `PasswordInput`, `OTPInput`, `TagsInput`, `FileUpload`, `Textarea`, `Label` |
| **Data Display** (16) | `Badge`, `StatusBadge`, `Card` (Compound), `Avatar`, `Table`, `DataTable` (TanStack), `Pagination`, `Separator`, `Timeline`, `Kbd`, `Chart`, `MetricCard`, `StatCard`, `DeltaIndicator`, `Sparkline`, `Gauge` |
| **Overlays** (10) | `Dialog`, `AlertDialog`, `ConfirmDialog`, `Sheet`, `Drawer`, `Popover`, `Tooltip`, `DropdownMenu`, `ContextMenu`, `Command` / `CommandDialog` |
| **Feedback** (8) | `Alert`, `Toaster` / `toast`, `Skeleton`, `Spinner`, `LoadingOverlay`, `Progress`, `EmptyState`, `ErrorState` |
| **Navigation** (6) | `Tabs`, `Accordion`, `Breadcrumb`, `Collapsible`, `Stepper`, `TreeView` |
| **Time** (3) | `Calendar`, `DatePicker`, `DateRangePicker` |
| **Layout** (4) | `Container`, `Grid`, `Stack`, `ScrollArea` |
| **Accessibility** (1) | `VisuallyHidden` |
| **Utilities** | `cn()`, `customTwMerge`, `isSafeUrl()`, `escapeHtml()`, `stripHtml()`, `createColumnHelper` |

---

## Machine-Readable Reference
- Run `alcspower-ui info <Componente>` in the terminal to inspect exact props and variants.
- Or inspect `registry.json` and `llms-small.txt` directly.
