# GitHub Copilot Instructions — @alcspower/ui

## Project Context
This is the source repository for `@alcspower/ui`, an accessible React component library (v1.6.2, 64 components) built with React 18/19, TypeScript strict, Radix UI, Tailwind CSS v4, and CVA.

## Code Generation Rules
- Import components from `'@alcspower/ui'` (consumer code) or relative paths (library code)
- Use `React.forwardRef` + `cva()` + `cn()` pattern for new components
- Use semantic token classes: `bg-alcspower-primary`, `text-alcspower-foreground`, `border-alcspower-border`
- Never use raw hex colors or static Tailwind colors (bg-blue-600, text-gray-900)
- File naming: kebab-case for files, PascalCase for components
- Every component must have `.test.tsx` (Vitest + vitest-axe) and `.stories.tsx` (Storybook 8)
- Compound components use subcomponent pattern (Card → CardHeader, CardTitle, CardContent, CardFooter)
- Use `asChild` with Radix `Slot` for polymorphic rendering
- Use `cn()` from `../../lib/utils` for class merging (never raw clsx/tailwind-merge)
- Interactive elements: `active:scale-[0.98]`, `focus-visible:ring-3 focus-visible:ring-alcspower-primary/20`
- Disabled: `disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-45`
- Respect `motion-reduce:transition-none motion-reduce:transform-none`

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

## Validation
Always run: `pnpm typecheck && pnpm test && pnpm build`
