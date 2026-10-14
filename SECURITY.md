# Security Policy for @alcspower/ui

<div align="center">

**🇺🇸 English** &nbsp;|&nbsp; [🇪🇸 Español](./SECURITY.es.md)

</div>

---

## 📋 Table of Contents

1. [Reporting Vulnerabilities](#reporting-vulnerabilities)
2. [Supported Versions](#supported-versions)
3. [Dependency Security](#dependency-security)
4. [Security Checklist for Consumers](#security-checklist-for-consumers)
5. [Coordinated Vulnerability Disclosure](#coordinated-vulnerability-disclosure)

---

## 🚨 Reporting Vulnerabilities

### Procedure

If you discover a security vulnerability within `@alcspower/ui`, **do not disclose it publicly via GitHub Issues, Discussions, or social media**.

**Please report it privately through GitHub Security Advisories:**  
👉 [Report a security vulnerability privately](https://github.com/AlcsPower/alcs-ui/security/advisories/new)

**Please include the following details:**
- Detailed description of the vulnerability and attack vector
- Affected version(s) of `@alcspower/ui`
- Minimal reproducible steps or sample code
- Potential security and privacy impact
- Proof of Concept (PoC) or suggested remediation (optional)

**Estimated Response Times:**
- Initial acknowledgment: Within 48 hours
- Initial technical assessment: Within 5 business days
- Patch release: Based on severity (Critical: 24–48 hours, High: 7 days, Medium: 14–30 days)

### CVSS Severity Levels

| CVSS Score | Severity | Expected Patch Window | Action |
| :---: | :---: | :---: | :--- |
| **9.0 – 10.0** | **Critical** | 24 – 48 hours | Immediate hotfix + emergency patch release |
| **7.0 – 8.9** | **High** | 5 – 7 days | Patch + release in patch or minor version |
| **4.0 – 6.9** | **Medium** | 14 – 30 days | Resolved in upcoming scheduled release |
| **0.1 – 3.9** | **Low** | 30 – 90 days | Backlogged and prioritized accordingly |

---

## 📦 Supported Versions

| Version | Status | Security Support |
| :---: | :---: | :--- |
| **1.6.x** | ✅ Active / Current | Full security support and highest-priority fixes |
| **1.5.x** | ⚠️ Maintenance | Critical security fixes only |
| **< 1.5** | ❌ End of Life | Unsupported; upgrade to 1.6.x recommended |

**Recommendation:** Always stay up to date with the latest release:

```bash
pnpm update @alcspower/ui@latest
```

---

## 🔐 Dependency Security

### Automated Audits in CI/CD

The library enforces automated dependency security scanning via GitHub Actions (`.github/workflows/ci.yml`):
- `pnpm audit --prod`: Zero known vulnerabilities tolerated in production dependencies.
- `pnpm audit --audit-level=critical`: Zero critical vulnerabilities tolerated in development tooling.
- Automated vulnerability scanning prior to every public release.

### Running Audits Locally

```bash
# Check for vulnerabilities across all dependencies:
pnpm audit

# Check production runtime dependencies only:
pnpm audit --prod

# Filter by critical severity:
pnpm audit --audit-level=critical
```

### Critical Audited Dependencies

| Dependency | Purpose | Audit Cadence |
| :--- | :--- | :---: |
| `@radix-ui/*` | Accessible WAI-ARIA primitives | Weekly |
| `react`, `react-dom` | Runtime peer dependencies (v18, v19) | Weekly |
| `recharts` | SVG chart rendering | Bi-weekly |
| `date-fns` | Date parsing and manipulation | Bi-weekly |
| `cmdk`, `lucide-react` | Command palette and icons | Monthly |

---

## ✅ Security Checklist for Consumers

### 1. 🛡️ Cross-Site Scripting (XSS) Prevention

#### ✓ User Input Sanitization

```typescript
// ❌ RISKY: Passing unsanitized user content into tooltips or modals
import { Tooltip } from '@alcspower/ui';

export function UserProfile({ userName }: { userName: string }) {
  return <Tooltip content={userName}>Profile</Tooltip>;
}

// ✅ SECURE: Sanitize untrusted user strings
import DOMPurify from 'dompurify';
import { Tooltip } from '@alcspower/ui';

export function UserProfile({ userName }: { userName: string }) {
  const safeName = DOMPurify.sanitize(userName, { ALLOWED_TAGS: [] });
  return <Tooltip content={safeName}>Profile</Tooltip>;
}
```

#### ✓ Link and `href` Sanitization

When passing dynamic URLs to navigation primitives (`BreadcrumbLink`, `Button asChild`, or custom anchor elements):

```typescript
// ❌ RISKY: Passing arbitrary user-supplied URLs (potential javascript: payload)
<a href={userProvidedUrl}>Visit link</a>

// ✅ SECURE: Validate allowed protocols (http, https, mailto, tel or relative paths)
function isSafeUrl(url: string): boolean {
  if (!url) return false;
  if (url.startsWith('/') || url.startsWith('#')) return true;
  try {
    const parsed = new URL(url);
    return ['http:', 'https:', 'mailto:', 'tel:'].includes(parsed.protocol);
  } catch {
    return false;
  }
}

const safeHref = isSafeUrl(userProvidedUrl) ? userProvidedUrl : '#';
```

### 2. 🔑 Cross-Site Request Forgery (CSRF) Protection

* Implement anti-CSRF tokens in interactive forms that mutate state on the server.
* Ensure session cookies use `SameSite=Strict` or `SameSite=Lax` along with `Secure=true`.

### 3. 🔐 Authentication & Authorization

* **Secure Storage:** Never store JWTs or credentials in `localStorage` or `sessionStorage` if the application handles dynamic content. Prefer `HttpOnly; Secure; SameSite=Strict` cookies.
* **Server-Side Enforcement:** Never rely solely on client-side state to hide `DataTable` columns or action buttons. All permission checks (RBAC) must be validated strictly on the backend API.

### 4. 📤 File Upload Security (`FileUpload`)

* Validate maximum file sizes (`maxSize`), verified MIME types (via magic number inspection on the server), and allowed file extensions.
* Rename files on disk with cryptographically secure identifiers (e.g. UUID v4) to prevent path traversal attacks.

---

## 📞 Coordinated Vulnerability Disclosure

For all security-related questions or reports:
* **Private Advisories:** [GitHub Security Advisories](https://github.com/AlcsPower/alcs-ui/security/advisories/new)
* **Project Maintainer:** Alcides Altamirano (`AlcsPower`)
