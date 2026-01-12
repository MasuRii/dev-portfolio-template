# Chosen Tech Stack: Developer Portfolio 2026

This document evaluates modern frontend frameworks, styling solutions, animation libraries, and hosting platforms for the development of a high-performance developer portfolio in 2026.

## 1. Frontend Framework Evaluation

| Framework | Performance | Developer Experience (DX) | Ecosystem | Use Case Suitability |
| :--- | :--- | :--- | :--- | :--- |
| **Next.js 15** | Good (SSR/SSG) | Excellent (App Router, Server Actions) | Massive | Complex, feature-rich sites |
| **Astro 5** | **Best** (Zero JS by default, Islands) | Great (Content Collections, Vite) | Growing | **High-performance portfolios/blogs** |
| **Remix** | Good (Progressive Enhancement) | Good (Web Standards) | Moderate | Highly interactive SaaS/Dashboards |
| **SvelteKit** | Excellent (Compiler-based) | Best (Minimal boilerplate) | Small | Performance-critical apps |
| **SolidStart**| Excellent (Fine-grained reactivity) | Great (React-like but faster) | Very Small | Bleeding-edge performance |

### Decision: Astro 5
**Rationale:** For a developer portfolio, Largest Contentful Paint (LCP) and Interaction to Next Paint (INP) are critical for both UX and SEO (AI-driven search visibility). Astro's "Islands Architecture" allows us to ship zero JavaScript for static content while selectively hydrating interactive components (e.g., project filters, contact forms). Its multi-framework support also allows us to use React components where needed.

---

## 2. Styling Solutions

| Solution | Performance | Maintainability | Key Features |
| :--- | :--- | :--- | :--- |
| **Tailwind CSS 4.x**| Excellent (Zero runtime) | High (Utility-first) | Built-in design tokens, JIT engine |
| **CSS Modules** | Excellent (Zero runtime) | Moderate (Scoped CSS) | Standard CSS, no extra libraries |
| **Styled Components**| Moderate (Runtime cost) | High (Component-driven) | Dynamic props, React-integrated |
| **vanilla-extract** | Excellent (Build-time) | High (Type-safe) | Zero-runtime CSS-in-JS |

### Decision: Tailwind CSS 4.x
**Rationale:** Tailwind 4 provides the fastest development workflow while maintaining a tiny CSS bundle. Its integration with modern CSS features (layers, variables) aligns with 2026 best practices.

---

## 3. Animation Libraries

| Library | Bundle Size | Ease of Use | Capability |
| :--- | :--- | :--- | :--- |
| **Framer Motion** | ~30KB | High (React-only) | Intuitive, declarative animations |
| **GSAP 4** | ~30KB+ | Moderate | Industry standard for complex timelines |
| **Motion One** | **<8KB** | High | High-performance (Web Animations API) |
| **CSS-only** | **0KB** | Low | Best performance for simple reveals |

### Decision: Motion One + Framer Motion
**Rationale:** We will use **Motion One** for simple, high-performance scroll-triggered reveals to keep the main thread light. For complex interactive components within React islands, **Framer Motion** will be used for its superior DX and declarative API.

---

## 4. Hosting and Deployment

| Platform | DX | Edge Features | Cost (Free Tier) |
| :--- | :--- | :--- | :--- |
| **Vercel** | **Best** | Excellent (Edge Functions) | Generous, optimized for Next/Astro |
| **Netlify** | Great | Strong (Edge Functions) | Competitive |
| **Cloudflare Pages** | Good | **Best** (Global CDN) | Very Generous |
| **Railway / Fly.io** | Moderate | N/A | Usage-based |

### Decision: Vercel
**Rationale:** Vercel offers the most seamless integration with Astro and modern frontend workflows, providing excellent build previews, automated CI/CD, and robust edge capabilities.

---

## Summary Recommendation

*   **Framework:** Astro 5 (using React components for interactivity)
*   **Styling:** Tailwind CSS 4.x
*   **Animations:** Motion One (Global) + Framer Motion (Islands)
*   **Hosting:** Vercel
*   **Language:** TypeScript (Strict Mode)
