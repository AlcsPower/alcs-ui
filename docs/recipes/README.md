# 📖 Recetario de Integración (`@alcspower/ui` Cookbook)

Guías paso a paso y mejores prácticas para integrar `@alcspower/ui` y su sistema de diseño *Craft Minimalist* en diversos stacks tecnológicos del ecosistema moderno y empresarial.

---

## 🗂️ Índice de Recetas

| Stack / Tecnología | Descripción | Nivel de Adopción | Enlace |
| :--- | :--- | :--- | :--- |
| **React 19 + Vite + Tailwind v4** | Configuración recomendada para nuevas aplicaciones SPA modernas B2B. | Completo (Componentes + Tokens) | [Ver Receta](react-vite.md) |
| **Astro (React Islands)** | Sitios de alto rendimiento, portales informativos y documentación con componentes interactivos hidratados. | Híbrido (Islas React + SSR) | [Ver Receta](astro.md) |
| **ASP.NET (Web Forms, VB.NET, C# y Razor)** | Modernización de sistemas existentes en .NET sin reescribir lógica de negocio ni código de servidor. | Progresivo (CSS Tokens o Islas) | [Ver Receta](dotnet-aspnet.md) |
| **Tailwind CSS v4 & Tokens de Diseño** | Configuración avanzada de temas `@theme`, variables semánticas `--alcspower-*` y modo oscuro. | Estilos / Tokens | [Ver Receta](tailwind-v4.md) |

---

## 💡 Principios de Interoperabilidad

1. **Zero Vendor Lock-in:** `@alcspower/ui` empaqueta tanto componentes de React como hojas de estilo independientes (`dist/styles.css`).
2. **Adopción Progresiva:** Puedes empezar usando únicamente los tokens y estilos CSS en vistas HTML existentes (como `.aspx` o `.cshtml`), y gradualmente incorporar componentes interactivos de React donde se requiera alta interactividad (como `DataTable`, `DatePicker` o `CommandMenu`).
3. **Estándar de Accesibilidad:** Todos los componentes cumplen con **WCAG 2.1 AA/AAA**, navegación completa por teclado y anuncios ARIA accesibles.
