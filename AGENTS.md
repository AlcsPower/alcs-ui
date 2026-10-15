# @alcspower/ui — Agent Guidelines (OpenCode & Generic Agents)

This file is automatically loaded by **OpenCode** and other autonomous coding agents to guide interaction with `@alcspower/ui`.

## Identity
- **Package:** `@alcspower/ui`
- **Description:** Accessible React 18/19 component library (64 components) built on Radix UI and Tailwind CSS v4 tokens.
- **Tech Stack:** React 18/19, TypeScript 5.7 (strict), Tailwind CSS v4, Radix UI, CVA.
- **Self-Contained Bundle:** All dependencies (Radix UI, Lucide, Sonner, cmdk, TanStack Table, Recharts, date-fns) are pre-bundled internally. Only `react` and `react-dom` are peer dependencies.

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

6. **Polymorphic Rendering (`asChild`):** Use `asChild` to wrap custom elements or router links (`<Button asChild><Link to="/home">Inicio</Link></Button>`).

7. **Toaster:** Place `<Toaster position="bottom-right" richColors />` once in the app root. Trigger toasts with:
   ```tsx
   toast.success('Guardado correctamente');
   toast.error('Error al procesar');
   ```

---

## Component Catalog Matrix

| Category | Key Components |
|:---|:---|
| **Forms** | `Button`, `Input`, `NumberInput`, `Field` (Compound), `Checkbox`, `Switch`, `Select`, `Combobox`, `MultiSelect`, `RadioGroup`, `Slider`, `Toggle`, `ToggleGroup`, `SearchInput`, `PasswordInput`, `OTPInput`, `TagsInput`, `FileUpload`, `Textarea`, `Label` |
| **Data Display** | `Badge`, `StatusBadge`, `Card` (Compound), `Avatar`, `Table`, `DataTable` (TanStack), `Pagination`, `Separator`, `Timeline`, `Kbd`, `Chart`, `MetricCard`, `StatCard`, `DeltaIndicator` |
| **Overlays** | `Dialog`, `AlertDialog`, `ConfirmDialog`, `Sheet`, `Drawer`, `Popover`, `Tooltip`, `DropdownMenu`, `ContextMenu`, `Command` / `CommandDialog` |
| **Feedback** | `Alert`, `Toaster` / `toast`, `Skeleton`, `Spinner`, `LoadingOverlay`, `Progress`, `EmptyState`, `ErrorState` |
| **Navigation** | `Tabs`, `Accordion`, `Breadcrumb`, `Collapsible`, `Stepper`, `TreeView` |
| **Time** | `Calendar`, `DatePicker`, `DateRangePicker` |
| **Accessibility** | `VisuallyHidden` |
| **Utilities** | `cn()`, `customTwMerge` |

---

## Machine-Readable Reference
- Run `alcspower-ui info <Componente>` in the terminal to inspect exact props and variants.
- Or inspect `registry.json` and `llms-small.txt` directly.
