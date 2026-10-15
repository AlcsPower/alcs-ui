# `@alcspower/ui` — React Design System & Component Library

<div align="center">

[![npm version](https://img.shields.io/npm/v/@alcspower/ui.svg?color=6366f1&style=flat-square)](https://www.npmjs.com/package/@alcspower/ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)
[![Tests](https://img.shields.io/badge/tests-512%2F512%20passing-10b981.svg?style=flat-square)](https://github.com/AlcsPower/alcs-ui/actions)
[![React](https://img.shields.io/badge/react-18%20%7C%2019-61dafb.svg?style=flat-square)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6.svg?style=flat-square)](https://www.typescriptlang.org)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind-v4%20ready-38bdf8.svg?style=flat-square)](https://tailwindcss.com)
[![a11y](https://img.shields.io/badge/a11y-WCAG%202.1%20AA%20axe--core-success.svg?style=flat-square)](https://www.w3.org/WAI/standards-guidelines/wcag/)

<br />

**🇺🇸 English** &nbsp;|&nbsp; [🇪🇸 Español](./README.es.md)

</div>

---

A modular, accessible, and production-ready React component library and design system for modern web applications.

Engineered with native support for **React 18** and **React 19**, strict **TypeScript** typings, accessible **Radix UI** primitives, iconography by **Lucide React**, fluid notifications with **Sonner**, command palette powered by **cmdk**, enterprise tables with **TanStack Table**, analytical charts via **Recharts**, and an encapsulated semantic design token system distributed as precompiled CSS. Fully compatible with consumer applications running **Tailwind CSS v3**, **Tailwind CSS v4**, or **no CSS framework at all**.

> [!TIP]
> **Natively Optimized for AI-Assisted Workflows and Human Engineers**  
> `@alcspower/ui` is built from the ground up for modern, AI-augmented development cycles. Through ultra-condensed machine-readable manifests (`llms.txt`, `registry.json`), a dependency-free official CLI (`npx @alcspower/ui`), and zero-setup rules for **Cursor**, **Claude Code**, **GitHub Copilot**, and **Antigravity**, it accelerates engineering velocity while dramatically reducing context token overhead.

---

## 📌 Context & Project Identity

* **Package Name:** `@alcspower/ui`
* **Current Version:** `1.6.5`
* **Author / Maintainer:** Alcides Altamirano (`AlcsPower`)
* **Project Nature:** Independent open-source design system and component library for the React ecosystem.
* **Distribution Registries:**
  * **npm:** [`https://www.npmjs.com/package/@alcspower/ui`](https://www.npmjs.com/package/@alcspower/ui) (check version: `npm view @alcspower/ui version`)
  * **GitHub Packages:** `https://npm.pkg.github.com/@alcspower/ui`
* **GitHub Repository:** [https://github.com/AlcsPower/alcs-ui](https://github.com/AlcsPower/alcs-ui)
* **License:** MIT License (Permissive open source; authored and owned by Alcides Altamirano / AlcsPower).
* **Community & Support:** Exclusively via [GitHub Issues](https://github.com/AlcsPower/alcs-ui/issues) and [GitHub Discussions](https://github.com/AlcsPower/alcs-ui/discussions).
* **Architectural Decoupling:** Contains zero business-domain logic. Pure, composable UI building blocks suitable for any enterprise web application.

---

## 🎨 Design Philosophy & Aesthetics

The visual language of `@alcspower/ui` adheres to the industry's highest standards:

### 1. Primary Classification: **Modern SaaS / Craft Minimalist**
*(Also described in digital product design as **Elevated Flat** or **Modern Enterprise UI**)*.

Popularized by modern design leaders such as **Linear**, **Untitled UI**, **Raycast**, **Vercel (Geist)**, and **Stripe**, this aesthetic moves beyond the flat, monochrome layouts of 2015 without the heavy visual noise of skeuomorphism or neo-brutalism. It focuses on **ergonomics, visual hierarchy, clarity, and tactile micro-feedback**.

> [!NOTE]
> **System Design Thesis:**  
> *"A Craft Minimalist / Elevated Flat design system, blending modern SaaS elegance with high-density ergonomic workflows for enterprise applications."*

### 2. Defining Pillars

| Pillar | Implementation in `@alcspower/ui` |
| :--- | :--- |
| **Hairline Borders & Layering** | Razor-sharp 1.5px borders with subtle opacity (`border-alcspower-border/70`), soft tinted backgrounds (`bg-primary/5`, `bg-surface-muted/30`) that cleanly segment sections without visual clutter. |
| **Micro-Elevations (Soft Depth)** | Ultra-delicate resting shadows (`shadow-2xs`, `shadow-xs`) for controls, and clean floating elevations (`shadow-xl`, `shadow-2xl`) for popovers, context menus, and modals. |
| **Generous, Balanced Radii** | Modern, smooth curvature (`rounded-xl`, `rounded-2xl`, and `rounded-3xl` for cards and modals; `rounded-full` for chips and status badges) reducing visual fatigue. |
| **Cool Indigo & Slate Palette** | A tailored primary accent (cool modern indigo) harmonized with crisp neutral slate grays, accompanied by high-contrast semantic tones (emerald, soft crimson, amber). |
| **Tactile Micro-Feedback** | Subtle active press effects (`active:scale-[0.98]`), animated chips, `<kbd>` shortcut badges, and clean focus rings (`ring-2` / `ring-3`). |
| **B2B Density & Ergonomics** | Compact modes for high-density tables and data entry (`size="sm"`, 32–36px), stable bi-monthly pickers preventing layout shifts, and accessible keyboard shortcuts. |

---

## 🏛️ Library Architecture

The library follows a layered, decoupled architecture inspired by the **shadcn/ui** composition philosophy:

```text
React Components (Radix UI + Lucide + CVA + Sonner + Recharts + TanStack Table)
                         ↓
               Semantic Design Tokens
                         ↓
     Implementation CSS Custom Properties (--alcspower-*)
                         ↓
  Encapsulated Precompiled CSS (@layer alcspower-tokens, alcspower-ui)
                         ↓
   Self-Contained Autonomous Bundle (ESM / CJS / DTS / CSS)
       ├── Online Distribution: Public npm & GitHub Packages
       └── Air-Gapped / Offline Distribution: Standalone .tgz tarball
```

### Core Architectural Principles

1. **Composition over Configuration:** Clean declarative subcomponents (e.g. `SheetContent`, `AccordionTrigger`, `CardHeader`) and the `asChild` polymorphic pattern for composable DOM elements.
2. **Zero Global Destructive Resets:** All styles are safely scoped inside `@layer alcspower-tokens` and `@layer alcspower-ui`, preventing side-effects on consumer global selectors like `body`, `html`, or custom typography.
3. **Encapsulated Precompiled CSS:** All required styling is bundled in `@alcspower/ui/styles.css`. Consumers do not need to configure Tailwind build steps or replicate custom CSS rules.
4. **Self-Contained Bundle (Zero Sub-Dependencies):** Internal libraries (Radix UI, Lucide, CVA, cmdk, Sonner, Recharts, TanStack Table) are bundled directly inside the distribution package. Consumers only need to provide peer dependencies: `react` and `react-dom`.
5. **Dual Distribution Modality:**
   * 🌐 **Online:** Official releases on **npm** and **GitHub Packages** for continuous integration.
   * 🔒 **Air-Gapped / Offline:** Standalone `.tgz` archive installable in isolated environments without network access. All third-party licenses are compiled in [`THIRD_PARTY_LICENSES.md`](THIRD_PARTY_LICENSES.md).

---

## 🚀 Installation

Install `@alcspower/ui` directly from the public **npm** registry or via **GitHub Packages**.

### 1. Direct Installation from npm (Recommended)

Verify the latest published version:

```bash
npm view @alcspower/ui version
# Output: 1.6.2
```

Install using your preferred package manager:

```bash
# With pnpm (recommended):
pnpm add @alcspower/ui

# With npm:
npm install @alcspower/ui

# With yarn:
yarn add @alcspower/ui
```

### 2. GitHub Packages Installation

If your organization uses GitHub Packages (`https://npm.pkg.github.com`), configure your project's `.npmrc`:

```ini
@alcspower:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
```

> [!IMPORTANT]
> Always reference an environment variable such as `${NODE_AUTH_TOKEN}` or `${GITHUB_TOKEN}` with at least `read:packages` scope. Never commit plain-text authentication tokens to version control.

### 3. Air-Gapped / Offline Environments (Zero Internet Access)

For secure corporate servers or air-gapped workstations, install the self-contained `.tgz` tarball locally:

```bash
pnpm add ./alcspower-ui-1.6.2.tgz

# Or with npm:
npm install ./alcspower-ui-1.6.2.tgz
```

> [!NOTE]
> Local tarball installation performs zero external network queries. Only `react` and `react-dom` (v18 or v19) are required in the target project.

---

## 🤖 Official CLI & AI Agent Ecosystem

`@alcspower/ui` comes equipped with an integrated developer CLI to supercharge both human productivity and AI-assisted workflows:

```text
npx @alcspower/ui <command>
```

### 1. One-Click AI Agent Initialization (`init-agent`)

Scaffold agent guidelines and editor snippets in 1 second across any project:

```bash
npx @alcspower/ui init-agent
```

* **Cursor:** Generates system instructions at `.cursor/rules/alcspower-ui.mdc`.
* **Claude Code:** Injects architectural guidelines in `CLAUDE.md`.
* **GitHub Copilot:** Injects prompt directives in `.github/copilot-instructions.md`.
* **Google Antigravity:** Injects specifications in `.agent/AGENT.md`.
* **VS Code:** Installs full component snippets in `.vscode/alcspower.code-snippets`.

### 2. Instant Component Inspection (`info` and `list`)

Inspect component props, variants, sizes, and copy-paste JSX examples without wasting context on heavy `.d.ts` declaration files:

```bash
# Inspect a specific component:
npx @alcspower/ui info DataTable
npx @alcspower/ui info MultiSelect
npx @alcspower/ui info Button

# List all 68 components categorized:
npx @alcspower/ui list

# Print semantic CSS tokens cheatsheet:
npx @alcspower/ui tokens

# Install VS Code snippets only:
npx @alcspower/ui snippets
```

### 3. Machine-Readable LLM Manifests (`llms.txt` and `registry.json`)

* **`registry.json` (~16 KB):** Structured JSON catalog containing all 68 components, props, variants, and subcomponents. Allows AI agents to accurately write JSX with minimal token overhead.
* **`llms.txt`:** Open specification standard adhering to [llmstxt.org](https://llmstxt.org/).
* **`llms-small.txt` (~1.5k tokens):** Ultra-condensed ruleset, tokens, and core APIs for direct injection into system prompts.
* **Direct package exports:**
  ```tsx
  import registry from '@alcspower/ui/registry.json';
  ```

---

## 💻 Quick Start & Basic Usage

Import the compiled styles once in your application entry point (`main.tsx` or `App.tsx`), then import components anywhere:

```tsx
import React from 'react';
import '@alcspower/ui/styles.css';
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Toaster,
  toast,
  Sheet,
  SheetTrigger,
  SheetContent
} from '@alcspower/ui';

export function App() {
  return (
    <>
      <Toaster position="bottom-right" richColors />
      <Card className="max-w-md mx-auto my-8">
        <CardHeader>
          <CardTitle>Enterprise Console</CardTitle>
          <CardDescription>Streamlined operations and record management.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="primary" onClick={() => toast.success('Operation recorded successfully')}>
            Create Record
          </Button>
        </CardContent>
      </Card>
    </>
  );
}
```

---

## 📖 Integration Recipes (Cookbook)

Step-by-step guides for adopting `@alcspower/ui` across multiple stacks:

* ⚡ **[React 19 + Vite + Tailwind CSS v4](docs/recipes/react-vite.md):** The modern standard for high-performance SPAs and B2B enterprise dashboards.
* 🚀 **[Astro + React Islands](docs/recipes/astro.md):** Content-driven corporate portals with 0 KB initial client JS and on-demand hydration.
* 🏢 **[.NET Enterprise Modernization (Web Forms, VB.NET, C# & Razor)](docs/recipes/dotnet-aspnet.md):** Visual and interactive modernization for legacy enterprise systems without backend rewrites.
* 🎨 **[Tailwind CSS v4 & Token Customization](docs/recipes/tailwind-v4.md):** Customizing corporate color schemes via `@theme`, semantic variables `--alcspower-*`, and dark mode.

### 🌟 Official Production Starter Kit

Bootstrap a complete enterprise dashboard in under a minute (collapsible sidebar, header with dark/light switcher, KPI summary cards, and data table):

👉 **[`templates/vite-react-starter`](templates/vite-react-starter/README.md)**

---

## 🎓 Beginner's Step-by-Step Guide

New to React or component libraries? The **[`docs/instructivo/`](docs/instructivo/README.md)** guide offers a zero-prerequisite, 10-module interactive curriculum building a real-world **Contact Book Pro** application:

| Language | Guide Link |
| :--- | :--- |
| 🇺🇸 **English** | [`docs/instructivo/en/README.md`](docs/instructivo/en/README.md) |
| 🇪🇸 **Español** | [`docs/instructivo/es/README.md`](docs/instructivo/es/README.md) |

### Curriculum Overview (10 Modules)

| # | Module | Components Covered | Difficulty | Link |
| :-: | :--- | :--- | :-: | :--- |
| **00** | Introduction & Core Concepts | Real-world analogies, React basics | 🟢 Easy | [Read Module 00](docs/instructivo/en/00-introduction.md) |
| **01** | Setup & Environment | Node.js, pnpm, Vite, `@alcspower/ui` | 🟢 Easy | [Read Module 01](docs/instructivo/en/01-installation.md) |
| **02** | Your First Components | `Button`, `Badge`, `Avatar`, `Card` | 🟡 Medium | [Read Module 02](docs/instructivo/en/02-first-component.md) |
| **03** | Interactive Forms & State | `Input`, `Label`, `Field`, `Select`, `Checkbox`, `Switch` | 🟡 Medium | [Read Module 03](docs/instructivo/en/03-forms.md) |
| **04** | Layouts & Cards | `Container`, `Stack`, `Grid`, responsive cards | 🟡 Medium | [Read Module 04](docs/instructivo/en/04-layout-and-cards.md) |
| **05** | Feedback & Notifications | `Alert`, `Toast`, `Spinner`, `Skeleton`, `Progress` | 🟡 Medium | [Read Module 05](docs/instructivo/en/05-feedback.md) |
| **06** | Overlays & Modals | `Dialog`, `AlertDialog`, `Popover`, `Sheet`, `Tooltip` | 🔴 Advanced | [Read Module 06](docs/instructivo/en/06-overlays.md) |
| **07** | Data Visualization & Tables | `Table`, `DataTable`, `Pagination`, `Sparkline`, `Gauge` | 🔴 Advanced | [Read Module 07](docs/instructivo/en/07-data.md) |
| **08** | Navigation & Flow | `Breadcrumb`, `Stepper`, `Tabs`, `Accordion` | 🔴 Advanced | [Read Module 08](docs/instructivo/en/08-navigation.md) |
| **09** | Final Project: Contact Book Pro | Full assembly with local persistence and themes | 🚀 Project | [Read Module 09](docs/instructivo/en/09-final-project.md) |

---

## 📚 Complete Component Catalog (64 Components)

Every component is thoroughly tested (**68 test suites / 497 automated tests passing**), strictly typed with TypeScript, and audited for automated web accessibility using **axe-core** (100% pass rate, **zero accessibility violations**).

### 1. Forms
* **`Button`:** Composable button with 6 semantic variants (`primary`, `secondary`, `outline`, `ghost`, `destructive`, `link`), 4 sizes (`sm`, `md`, `lg`, `icon`), reactive loading state (`isLoading`), and polymorphic delegation via `asChild`.
* **`CopyButton`:** One-click clipboard button featuring 2-layer micro-animations (spin and bounce from `Copy` to emerald `Check` or crimson `AlertCircle` on error), radial luminous glow, 3 variants (`outlined`, `filled`, `inline`), 3 sizes, label support, and integrated tooltip.
* **`MultiSelect`:** WAI-ARIA compliant multi-selector (`role="listbox"`, `aria-multiselectable="true"`), 3 ergonomic display modes (`hybrid` with `+N more` smart collapse, `chips`, `summary`), adaptive trigger actions (right-aligned clear button and chevron anchorable to bottom-right on multi-row wraps), "Select all" toggle, real-time search, and metric sizes.
* **`Field` (Compound Primitive):** Accessible form layout primitive (`Field`, `FieldLabel`, `FieldControl`, `FieldHint`, `FieldError`) managing deterministic IDs and ARIA associations (`aria-describedby`, `aria-invalid`).
* **`Input`:** Text input with proportional size scales (`sm: h-8`, `md: h-10`, `lg: h-12`), slots for `leftElement`/`rightElement`, and validation states.
* **`NumberInput`:** Accessible spinbutton control (`role="spinbutton"`), continuous long-press acceleration, 4 stepper layouts (`stacked`, `split`, `inline-right`, `none`), prefix/suffix support, IEEE 754 safe decimal math, and keyboard navigation (`Shift+Arrows`, `Home`, `End`, `PageUp/Down`).
* **`TagsInput`:** Interactive chip input with keyboard delimiters (`Enter`, `,`), duplicate prevention, max count limit, squircle/rounded shapes, and quick clear broom icon.
* **`OTPInput`:** Verification PIN input with proportional border radii (`sm: 10px`, `md: 12px`, `lg: 14px`), tactile focus elevation, chromatic glow rings (indigo on focus, crimson shake on error, emerald on success), descriptive status text, and configurable separators (`dash`, `dot`, `space`).
* **`FileUpload`:** Accessible drag-and-drop file upload zone, native explorer fallback, image previews, upload progress indicators, and interactive attachment list.
* **`PasswordInput`:** Password field with integrated accessible visibility toggle (show/hide), keyboard shortcuts, and proportional sizing.
* **`SearchInput`:** Ergonomic search input with search icon, visual `<kbd>` shortcut badge, instant clear button, and loading spinner state.
* **`Textarea`:** Multiline text field with height sizing and accessible focus states.
* **`Label`:** Accessible label primitive built on Radix UI with `required` indicator support.
* **`RadioGroup`:** Single-selection accessible radio group based on `@radix-ui/react-radio-group` with arrow-key keyboard navigation and validation states.
* **`Slider`:** Range slider based on `@radix-ui/react-slider` with delegated ARIA labels, incremental steps, and horizontal track.
* **`Toggle`:** Two-state toggle button based on `@radix-ui/react-toggle` with `default`/`outline` variants and size scales.
* **`ToggleGroup`:** Single or multiple selection toggle group based on `@radix-ui/react-toggle-group`.

### 2. Controls & Basic Data
* **`Badge`:** Compact indicator for categorization and status with 7 semantic variants.
* **`StatusBadge`:** Operational health monitoring indicator with colored micro-dot and semantic status states (`online`, `offline`, `warning`, `maintenance`).
* **`Card`:** Modular container with soft depth (`CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`).
* **`Avatar`:** Profile image with size scales (`sm`, `md`, `lg`, `xl`) and automatic initials fallback.
* **`Checkbox`:** Accessible binary control with metric sizing based on `@radix-ui/react-checkbox`.
* **`Switch`:** Accessible sliding boolean toggle based on `@radix-ui/react-switch`.
* **`Select`:** Dropdown select with full keyboard navigation and portal rendering based on `@radix-ui/react-select`.
* **`Timeline`:** Vertical process timeline with continuous connecting lines and semantic icons.
* **`Kbd`:** Visual tactile keyboard shortcut badge with platform variants.

### 3. Overlays & Modals
* **`AlertDialog` & `ConfirmDialog`:** Accessible confirmation dialogs with default focus on the Cancel button, semantic severity (`destructive`, `warning`, `info`), and a high-level `ConfirmDialog` wrapper supporting async promises with auto-loading spinners.
* **`Dialog`:** Modal dialog with focus trap, body scroll locking, and Escape key dismissal.
* **`Sheet`:** Sliding side drawer (`right`, `left`, `top`, `bottom`) with soft backdrop blur.
* **`Drawer`:** Bottom sheet overlay optimized for mobile viewports and rapid gestures, featuring a visual grab handle (`DrawerHandle`).
* **`Popover`:** Accessible floating popover based on `@radix-ui/react-popover`.
* **`DropdownMenu`:** Contextual menu with keyboard shortcuts, submenus, checkboxes, and radio items.
* **`ContextMenu`:** Right-click desktop menu based on `@radix-ui/react-context-menu` with shortcuts, submenus, and destructive items.
* **`Tooltip`:** Contextual hover and focus tooltip.
* **`Alert`:** Notification banner with icons and status variants (`info`, `success`, `warning`, `destructive`).

### 4. Navigation & Layout
* **`TreeView`:** Accessible hierarchical tree (`role="tree"`, `role="treeitem"`, `role="group"`), full keyboard navigation (`Arrow keys`, `Home`, `End`, `*`, `Alt+Arrows`), toolbar for global expand/collapse, tri-state checkboxes, and Craft Minimalist guide lines.
* **`Container`:** Responsive horizontal containment primitive constrained to official breakpoints (`sm`, `md`, `lg`, `xl`, `2xl`, `prose`, `full`).
* **`Stack`:** One-dimensional flexbox primitive for vertical or horizontal stacking with uniform spacing and automated dividers (`divider={<Separator />}`).
* **`Grid` & `GridItem`:** Two-dimensional CSS grid primitive with responsive column configurations (`cols: 1..12`) and `colSpan`/`rowSpan` controls.
* **`Breadcrumb`:** WAI-ARIA breadcrumb navigation with polymorphic `asChild` support for SPA routers (React Router, TanStack Router, Next.js).
* **`Tabs`:** Accessible tabs with keyboard navigation (`TabsList`, `TabsTrigger`, `TabsContent`).
* **`Accordion`:** Expandable collapse container supporting single or multiple panel expansion with animated chevron rotation.
* **`Collapsible`:** Lightweight disclosure primitive based on `@radix-ui/react-collapsible`.
* **`Stepper`:** Interactive step indicator for multi-step wizards.
* **`Pagination`:** Accessible pagination controls with interactive ellipsis.
* **`ScrollArea`:** Accessible custom scroll container based on Radix UI, supporting vertical, horizontal, or bidirectional scrollbars with Craft Minimalist styling and proportional metric sizes.
* **`Separator`:** Semantic horizontal or vertical divider based on `@radix-ui/react-separator`.

### 5. Feedback
* **`Toaster` & `toast`:** Comprehensive stacked toast notification engine based on `sonner`, supporting rich semantic colors, progress bars, promises, and action buttons.
* **`LoadingOverlay`:** Non-intrusive backdrop loader with screen reader announcement.
* **`EmptyState`:** Action-oriented empty state container with customizable icon, title, description, and action button.
* **`ErrorState`:** Accessible error screen with `role="alert"` and retry action triggers.
* **`Progress`:** Progress bar with semantic variants and indeterminate animation support.
* **`Skeleton`:** Smooth pulsing placeholder for asynchronous content loading.
* **`Spinner`:** Accessible rotating loading spinner with proportional size scaling.

### 6. Data
* **`Table`:** Styled accessible HTML table primitives (`TableHeader`, `TableBody`, `TableRow`, `TableHead`, `TableCell`, `TableCaption`).
* **`DataTable`:** High-performance enterprise data table powered by `@tanstack/react-table`, featuring multi-column sorting, pagination, global filtering, row selection, and dynamic column visibility.

### 7. Dates & Time
* **`Calendar`:** Interactive date calendar powered by `react-day-picker` v10 and `date-fns`, supporting single, multiple, and range selection modes with integrated appointment agenda (`CalendarEventList`).
* **`DatePicker`:** Single date picker with popover trigger, format masking (`dd/MM/yyyy`), and direct `Field` integration.
* **`DateRangePicker`:** Bi-monthly dual-calendar range picker with quick preset shortcuts (Today, Yesterday, Last 7 days, Last 30 days, This month, Last month).

### 8. Commands & Advanced Selection
* **`Command` & `CommandDialog`:** Interactive `⌘K` / `Ctrl+K` command palette based on `cmdk`, featuring real-time fuzzy filtering, grouped sections, and keyboard shortcuts.
* **`Combobox`:** Searchable autocomplete dropdown with real-time filtering and removable tag badges.

### 9. Data Visualization
* **`Chart`:** Corporate charting suite powered by Recharts (`BarChart`, `LineChart`, `AreaChart`, `PieChart`), featuring responsive containers (`ChartContainer`), semantic chart palettes (`--color-alcspower-chart-1..5`), and automatic dark mode support.

### 10. Metrics & Dashboards
* **`Sparkline`:** Zero-dependency micro SVG trend sparkline with area, line, and bar modes, smoothing, auto-coloring, and hover tooltips.
* **`Gauge`:** Accessible radial SLA gauge (`role="meter"`) with 3 geometries (`semicircle`, `arc`, `circle`), semantic thresholds, and mechanical needle or center values.
* **`MetricCard`:** KPI card featuring headline metrics, trend deltas, descriptions, and embedded sparkline slots.
* **`StatCard`:** Compact quantitative metric card with semantic iconography.
* **`DeltaIndicator`:** Trend percentage badge with directional arrows and positive/negative/neutral coloring.

### 11. Utilities & Accessibility
* **`VisuallyHidden`:** Hides elements visually while keeping them accessible to screen readers per WCAG guidelines.
* **`Security Helpers`:** Zero-dependency sanitization and URL validation utilities (`isSafeUrl`, `escapeHtml`, `stripHtml`) preventing XSS and open-redirect vulnerabilities.
* **`cn`:** High-performance utility combining `clsx` and `tailwind-merge` respecting semantic classes.

---

## 🎨 Semantic Design Token System

`@alcspower/ui` abstracts design tokens through semantic CSS variables:

### 1. Semantic Color Tokens

| Semantic Variable | Intended Usage |
| :--- | :--- |
| `--alcspower-primary` | Primary brand accent and interactive elements (buttons, active tabs, focus). |
| `--alcspower-surface` | Primary container surface (cards, panels, modals). |
| `--alcspower-surface-muted` | Secondary background for table headers, disabled fields, or subtle bands. |
| `--alcspower-text` | Primary body text ensuring maximum contrast on active surfaces. |
| `--alcspower-text-muted` | Secondary helper text, captions, and placeholders. |
| `--alcspower-border` | Subtle borders for form controls and layout cards. |
| `--alcspower-focus` | High-visibility focus ring for keyboard navigation (`ring-offset-2`). |
| `--alcspower-success` | Positive state indicators, confirmation badges, and valid field boundaries. |
| `--alcspower-warning` | Warning banners, cautionary indicators, and attention states. |
| `--alcspower-error` | Validation errors, alert callouts, and destructive actions. |
| `--alcspower-info` | Informational announcements and contextual help notes. |

### 2. Tailwind CSS v4 Integration

Projects utilizing Tailwind CSS v4 can bind semantic tokens directly into `@theme`:

```css
@import "tailwindcss";
@import "@alcspower/ui/styles.css";

@theme {
  --color-primary: var(--alcspower-primary);
  --color-surface: var(--alcspower-surface);
  --color-border: var(--alcspower-border);
}
```

---

## ♿ Quality, Accessibility (WCAG), and Testing

Every component in `@alcspower/ui` is continuously audited:

1. **Automated Accessibility Testing (`axe-core`):** Every component is rendered in jsdom and audited with `@axe-core/react` against **WCAG 2.1 Level AA** standards.
2. **Keyboard Navigation:** Strict compliance with standard keybindings (`Tab`, `Shift+Tab`, `Escape`, `Enter`, `Space`, `Arrow keys`, `Home`, `End`) across interactive controls and overlays.
3. **Screen Reader Precision:** Verified ARIA attributes (`aria-describedby`, `aria-invalid`, `aria-expanded`, semantic roles) and elimination of duplicate speech announcements.
4. **Motion Safety (`prefers-reduced-motion`):** Animations (spinners, skeleton pulses, transitions) respect user operating system settings.
5. **Test Coverage:** **70 test suites and 512 automated tests** passing at 100%.

---

## 🗺️ Roadmap

Track ongoing developments and future milestones in [`ROADMAP.md`](ROADMAP.md):

* 🌐 **Storybook Showcase on GitHub Pages:** Dedicated milestone featuring interactive component controls, dark/light toggle, and live accessibility reports.
* 📖 **Bilingual Documentation Portal:** Lightweight, search-enabled documentation site powered by Astro Starlight.
* 🧩 **Upcoming Components:** `SearchInput`, `PasswordInput`, `OTPInput`, `RichTextEditor`, `ScrollArea`, and enhanced dashboard navigation.

---

## 🤝 Community & Support

* 💬 **Discussions & Questions:** [GitHub Discussions](https://github.com/AlcsPower/alcs-ui/discussions)
* 🐛 **Bug Reports & Issues:** [GitHub Issues](https://github.com/AlcsPower/alcs-ui/issues)
* 🔒 **Security Advisories:** [SECURITY.md](SECURITY.md) or [GitHub Security Advisories](https://github.com/AlcsPower/alcs-ui/security/advisories/new)
* 🤝 **Contributing Guidelines:** [CONTRIBUTING.md](CONTRIBUTING.md)
* 📜 **Code of Conduct:** [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)

---

## 📄 License

This project is licensed under the terms of the **MIT License**. You are free to use, modify, and distribute it in both personal and commercial projects.

Author: **Alcides Altamirano (`AlcsPower`)**  
See [`LICENSE`](LICENSE) for full details.
