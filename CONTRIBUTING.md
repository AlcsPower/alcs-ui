# Contributing to `@alcspower/ui`

First off, thank you for considering contributing to `@alcspower/ui`! Independent open-source projects thrive when developers and community members share ideas, report bugs, improve documentation, and submit pull requests.

---

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
  - [Reporting Bugs](#reporting-bugs)
  - [Suggesting Enhancements](#suggesting-enhancements)
  - [Improving Documentation](#improving-documentation)
  - [Contributing Code](#contributing-code)
- [Development Setup](#development-setup)
- [Coding Guidelines & Architectural Standards](#coding-guidelines--architectural-standards)
- [Quality Assurance & Testing Checklist](#quality-assurance--testing-checklist)
- [Submitting a Pull Request](#submitting-a-pull-request)

---

## 📜 Code of Conduct

This project adheres to the [Contributor Covenant](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior via [private GitHub reporting](https://github.com/AlcsPower/alcs-ui/security/advisories/new).

---

## 💡 How Can I Contribute?

### Reporting Bugs

Before creating an issue, please check existing [GitHub Issues](https://github.com/AlcsPower/alcs-ui/issues) to ensure the bug hasn't already been reported.

When creating a bug report, please provide:
1. A clear, descriptive title.
2. Exact steps to reproduce the issue.
3. Your environment: React version (`18.x` or `19.x`), bundler (Vite, Next.js, Astro), Node.js version, and OS.
4. Expected behavior vs. actual behavior.
5. Code snippets or a minimal reproduction repository.

### Suggesting Enhancements

Feature requests are warmly welcomed! Please open an issue using the [Feature Request](.github/ISSUE_TEMPLATE/feature_request.md) template or start a thread in [GitHub Discussions](https://github.com/AlcsPower/alcs-ui/discussions).

When proposing an enhancement:
- Explain why the component or prop is useful for enterprise web applications.
- Check that the proposed component conforms to the *Modern SaaS / Craft Minimalist* design philosophy.
- Consider accessibility (WAI-ARIA patterns) from the beginning.

### Improving Documentation

Documentation improvements are always appreciated:
- Clarifying guides in `docs/instructivo/` or recipes in `docs/recipes/`.
- Fixing typos, outdated examples, or broken links.
- Enhancing bilingual parity between English (`docs/**/en/`) and Spanish (`docs/**/es/`).

---

## 🛠️ Development Setup

### Prerequisites

- **Node.js:** v18.0.0 or higher (v20+ recommended).
- **pnpm:** v8.0.0 or higher (`corepack enable && corepack prepare pnpm@latest --activate`).

### Getting Started

```bash
# 1. Fork the repository on GitHub, then clone your fork:
git clone https://github.com/<your-username>/alcs-ui.git
cd alcs-ui

# 2. Install dependencies:
pnpm install

# 3. Verify tests and typing:
pnpm typecheck
pnpm test

# 4. Build package assets:
pnpm build
```

---

## 📐 Coding Guidelines & Architectural Standards

When developing or modifying components in `@alcspower/ui`, keep these core principles in mind:

1. **Composition over Configuration:**  
   Favor compound components (e.g. `SheetContent`, `CardHeader`) and the Radix UI `asChild` pattern over single monolithic components with hundreds of configuration props.

2. **Zero Global Resets:**  
   Styles must be scoped inside `@layer alcspower-tokens` and `@layer alcspower-ui`. Never pollute global selectors like `body`, `html`, or root font hierarchies.

3. **Semantic CSS Tokens:**  
   Always consume `--alcspower-*` semantic CSS custom properties for colors, borders, and shadows. Do not hardcode arbitrary hex colors like `#6366f1` or raw Tailwind utilities like `bg-blue-600` directly into component primitives.

4. **Class Variance Authority (CVA):**  
   Export variant helpers (e.g., `buttonVariants`, `badgeVariants`) so consumers can reuse them when building custom styled elements.

5. **Accessibility (WCAG 2.1 Level AA):**  
   - Every interactive control must be fully navigable and operable via standard keyboard bindings (`Tab`, `Enter`, `Space`, `Escape`, `Arrow keys`).
   - Use standard ARIA roles (`role="spinbutton"`, `role="listbox"`, `role="dialog"`).
   - Coordinate error and helper descriptions with `aria-describedby` and `aria-invalid`.
   - Ensure color contrast ratios meet or exceed 4.5:1 for standard text.

---

## 🧪 Quality Assurance & Testing Checklist

Before opening a pull request, run the test and verification suite:

```bash
# Typecheck with TypeScript
pnpm typecheck

# Run unit tests and automated accessibility audits with axe-core
pnpm test --run

# Verify production bundle build
pnpm build
```

Every new component must include:
- A unit test file in `src/components/<ComponentName>/<ComponentName>.test.tsx`.
- Automated accessibility test via `@axe-core/react` / `axe(container)`.
- Keyboard interaction coverage.

---

## 🚀 Submitting a Pull Request

1. Create a feature branch from `main`:
   ```bash
   git checkout -b feat/my-new-feature
   ```
2. Commit your changes with clear, concise commit messages adhering to Conventional Commits:
   - `feat: add SearchInput component with instant clear button`
   - `fix: resolve colSpan calculation in DataTable empty state`
   - `docs: update beginner tutorial module 04`
3. Push to your fork and submit a Pull Request to the `main` branch of `AlcsPower/alcs-ui`.
4. Fill out the Pull Request template completely.

Thank you for helping build a better, more accessible React component library!
