## 📝 Pull Request Description

### Overview of Changes
A brief summary of what this PR does and why it was created.

### Related Issue(s)
Fixes #(issue number) or Closes #(issue number)

---

## 🔍 Type of Change

- [ ] 🐛 Bug fix (non-breaking change fixing an issue)
- [ ] ✨ New feature or component (non-breaking addition to the design system)
- [ ] 💥 Breaking change (fix or feature causing existing functionality not to work as expected)
- [ ] 📚 Documentation update or translation
- [ ] 🎨 Design tokens, styling, or aesthetic refinement
- [ ] ⚙️ Tooling, CLI, or CI/CD workflow update

---

## 🧪 Verification & Quality Checklist

Before submitting your pull request, please verify that your changes pass all quality checks:

- [ ] Strict type checking passes without errors (`pnpm typecheck`)
- [ ] All automated unit and accessibility tests pass (`pnpm test --run`)
- [ ] Automated accessibility audit with `axe-core` has zero violations
- [ ] Production bundle compiles successfully (`pnpm build`)
- [ ] Visual inspection in Storybook or dev environment verified in both **Light** and **Dark** modes
- [ ] Consumes semantic design tokens (`--alcspower-*`) instead of hardcoded hex colors
- [ ] Follows existing component composition patterns (Radix UI, CVA variants, polymorphic `asChild`)
- [ ] Documentation updated if public API was modified

---

## 📸 Screenshots or GIFs (if visual changes were made)
| Before | After |
| :---: | :---: |
| *(Image)* | *(Image)* |
