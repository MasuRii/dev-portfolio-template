# Project Architecture

This document describes the technical architecture of the developer portfolio.

## Tech Stack

- **Framework:** [Astro 5](https://astro.build/) (Static Output)
- **UI Library:** [React 19](https://react.dev/) (for interactive islands)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations:** [Motion One](https://motion.dev/) (Global) & [Framer Motion](https://www.framer.com/motion/) (React Islands)
- **Icons:** [Astro Icon](https://github.com/natemoo-re/astro-icon) (Iconify)
- **Type Safety:** [TypeScript](https://www.typescriptlang.org/)
- **Package Manager:** [Bun](https://bun.sh/)

## Directory Structure

- `src/assets/`: Static assets like images and global styles.
- `src/components/`: Reusable Astro and React components.
  - `common/`: Global components like Header, Footer, Section.
  - `sections/`: Main page sections (Hero, About, Projects, etc.).
  - `ui/`: Small, reusable UI elements (Buttons, Inputs).
- `src/data/`: JSON files containing site content (Personal info, Projects, Skills, etc.).
- `src/layouts/`: Base HTML layouts.
- `src/lib/`: Utility functions and data loaders.
- `src/pages/`: Astro pages (file-based routing).
- `src/types/`: TypeScript interfaces and types.
- `src/test/`: Unit and E2E tests.

## Data Flow

The project follows a **data-driven** approach. Content is managed in JSON files in `src/data/`.
A central data loader in `src/lib/data.ts` provides typed access to this data, which is then consumed by Astro components during build time.

Interactive features (filtering, modals, forms) are implemented as React islands, hydrated only when needed using Astro's `client:*` directives.

## Performance & Optimization

- **Islands Architecture:** Ships zero JS by default.
- **Image Optimization:** Uses `astro:assets` with Sharp for AVIF conversion and responsive resizing.
- **Font Optimization:** Google Fonts are preloaded and use `font-display: swap`.
- **Minification:** HTML, CSS, and JS are minified during the build process.
- **Caching:** Aggressive caching headers are configured for Vercel.

## Accessibility

The site aims for **WCAG 2.2 AA** compliance.

- Semantic HTML5 structure.
- ARIA labels and roles for interactive elements.
- Keyboard navigability and visible focus indicators.
- Respects `prefers-reduced-motion`.
