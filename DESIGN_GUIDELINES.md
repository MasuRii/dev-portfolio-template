# Design Guidelines: Developer Portfolio 2026

This document defines the visual identity, color system, and component specifications for the developer portfolio, aligning with 2026 trends and technical requirements.

## 1. Color Palette & Theme Strategy

The color system is designed for high contrast (WCAG 2.2 AA compliance), technical professionalism, and a "Cyber" aesthetic that feels modern and innovative.

### 1.1 Core Colors (Brand)

| Role | Color Name | Hex (Light) | Hex (Dark) | Description |
| :--- | :--- | :--- | :--- | :--- |
| **Primary** | Midnight | `#111827` | `#F9FAFB` | Main brand color for text (Light) and surface (Dark). |
| **Secondary** | Cool Grey | `#4B5563` | `#9CA3AF` | Supporting text and less prominent elements. |
| **Accent** | Electric Indigo | `#4F46E5` | `#6366F1` | Brand highlights, CTAs, and interactive elements. |
| **Accent Alt** | Cyber Cyan | `#06B6D4` | `#22D3EE` | Secondary highlights and gradients. |

### 1.2 Semantic Colors

| Role | Hex (Light) | Hex (Dark) | Usage |
| :--- | :--- | :--- | :--- |
| **Success** | `#10B981` | `#34D399` | Completion states, successful form submission. |
| **Error** | `#EF4444` | `#F87171` | Failure states, validation errors. |
| **Warning** | `#F59E0B` | `#FBBF24` | Important notices, cautious actions. |
| **Info** | `#3B82F6` | `#60A5FA` | Neutral information and updates. |

### 1.3 Neutral & Surface System

| Role | Hex (Light) | Hex (Dark) | Description |
| :--- | :--- | :--- | :--- |
| **Background** | `#FFFFFF` | `#0A0A0B` | Main page background. |
| **Surface** | `#F9FAFB` | `#161618` | Cards, modals, and elevated sections. |
| **Border** | `#E5E7EB` | `#27272A` | Dividers and element outlines (Modular Grid style). |
| **Muted** | `#9CA3AF` | `#52525B` | Placeholder text and disabled states. |

---

## 2. Theme Strategy

### 2.1 Dark Mode First
The portfolio is designed with a **Dark Mode First** mentality. The default experience should be high-contrast dark, with glowing accents and "Cyber" gradients, as per 2026 trends.

### 2.2 Theme Persistence
- **Implementation:** Use a `ThemeContext` (React) or a script in the `<head>` (Astro) to prevent FOUC (Flash of Unstyled Content).
- **Storage:** Persist user preference in `localStorage`.
- **System Sync:** Default to `prefers-color-scheme` if no local preference exists.

### 2.3 Contrast & Accessibility
- **Target:** Maintain a minimum contrast ratio of **4.5:1** for normal text and **3:1** for large text/UI components.
- **Focus States:** Every interactive element must have a high-visibility focus ring using the `Electric Indigo` accent color.

---

## 3. Visual Language (2026 Trends)

### 3.1 Squishy UI (Tactile Feedback)
- **Buttons:** Implement subtle scaling (`scale: 0.95`) and "spring" animations on click.
- **Feedback:** Use soft shadows and inner glows to create a 3D "tactile" feel.

### 3.2 Cyber Gradients
- Use linear gradients for CTAs and Hero headlines:
  - `linear-gradient(to right, #4F46E5, #06B6D4)`
- Background glow effects:
  - Subtle radial gradients in the background to add depth without affecting performance.

### 3.3 Modular Grid
- Consistent border usage (`1px solid`) between sections to create a structured, "blueprint" feel.
- Visible grid lines in the background (subtle) to emphasize the technical nature of the portfolio.

---

## 4. Typography System (2026)

The typography system prioritizes high legibility, technical character, and performance through Variable Fonts.

### 4.1 Font Selections

| Role | Font Family | Variable Axes | Fallback | Rationale |
| :--- | :--- | :--- | :--- | :--- |
| **Headlines** | **Space Grotesk** | `wght` (300-700) | Sans-serif | Distinctive technical character with modern geometric forms. |
| **Body Text** | **Inter** | `wght` (100-900) | Sans-serif | Industry standard for screen legibility and UI clarity. |
| **Monospace** | **JetBrains Mono** | `wght`, `ital` | Monospace | Exceptional readability for code snippets and technical data. |

### 4.2 Fluid Typography Scale

We use a fluid scaling system based on the `clamp()` function to ensure seamless transitions across all screen sizes without media query bloat.

| Level | CSS Fluid Formula | Desktop (Approx) | Mobile (Approx) |
| :--- | :--- | :--- | :--- |
| **Display** | `clamp(2.5rem, 8vw, 6rem)` | 96px | 40px |
| **H1** | `clamp(2rem, 6vw, 4rem)` | 64px | 32px |
| **H2** | `clamp(1.5rem, 4vw, 2.5rem)` | 40px | 24px |
| **H3** | `clamp(1.25rem, 3vw, 1.75rem)` | 28px | 20px |
| **Body** | `clamp(1rem, 1vw + 0.5rem, 1.125rem)` | 18px | 16px |
| **Small** | `clamp(0.875rem, 0.5vw + 0.75rem, 1rem)` | 16px | 14px |

### 4.3 Typographic Tokens

- **Line Height:** 
  - Headlines: `1.1` to `1.2`
  - Body: `1.5` to `1.6`
- **Letter Spacing:**
  - Headlines: `-0.02em` (Tightened for impact)
  - Body: `normal`
- **Font Weight Tokens:**
  - Light: `300`
  - Regular: `400`
  - Medium: `500`
  - SemiBold: `600`
  - Bold: `700`

### 4.4 Kinetic Typography (Motion)

- **Hover States:** Headlines should support subtle "stretch" or "weight" transitions using `font-variation-settings`.
- **Scroll Reveals:** Text elements should use "staggered fade-in" or "word-by-word" reveal animations using Motion One.

---

## 5. Spacing System & Layout Grid

### 5.1 Base Unit
We use an **8px base unit** (0.5rem) for all spacing, ensuring consistent alignment and a clean "Modular Grid" feel.

| Token | Size (px) | Size (rem) | Usage |
| :--- | :--- | :--- | :--- |
| `space-1` | 4px | 0.25rem | Micro-spacing, tight element grouping. |
| `space-2` | 8px | 0.5rem | Small gaps, internal padding. |
| `space-4` | 16px | 1rem | Standard gaps, component margins. |
| `space-8` | 32px | 2rem | Section sub-grouping, large component spacing. |
| `space-12` | 48px | 3rem | Large gaps, section padding (Mobile). |
| `space-24` | 96px | 6rem | Section padding (Desktop). |

### 5.2 Layout Grid
- **Columns:** 12-column grid for Desktop, 6-column for Tablet, 4-column for Mobile.
- **Max Width:** `1280px` for main content container.
- **Gutter:** `32px` (space-8) for desktop, `16px` (space-4) for mobile.
- **Container Queries:** Favor container queries over media queries for modular components.

---

## 6. Component Specifications

### 6.1 Buttons & Interactive Elements (Squishy UI)
- **Primary CTA:**
  - **Background:** `Electric Indigo` gradient.
  - **Text:** `Midnight` (Dark) or `White` (Light).
  - **Animation:** `Motion One` scale animation (0.95 on active).
  - **Corner Radius:** `8px` (soft but defined).
- **Secondary CTA:**
  - **Border:** `1px solid` with `Cool Grey`.
  - **Background:** Transparent.
  - **Hover:** Subtle background fill using `Primary` color with 5% opacity.

### 6.2 Form Inputs
- **Design:** Minimalist with `1px solid` bottom border by default.
- **Focus State:** 2px solid `Electric Indigo` border with a subtle glow effect.
- **Labels:** Floating labels or high-contrast labels above the input.
- **Validation:** Use `Success` and `Error` semantic colors for real-time feedback.

### 6.3 Card Designs (Modular Grid Style)
- **Border:** `1px solid` using the `Border` token.
- **Shadow:** None by default (Brutalist style) or very soft 2026-style "glass" shadow.
- **Hover:** Border color shifts to `Electric Indigo` or `Cyber Cyan`.
- **Content Padding:** `space-6` (24px) to `space-8` (32px).

### 6.4 Navigation Patterns
- **Desktop:** Sticky header with `16px` padding and blurred background (`backdrop-filter: blur(8px)`).
- **Mobile:** Bottom-fixed navigation or a fullscreen "Cyber" menu with high-performance staggered reveals.

---

## 7. Accessibility Requirements per Component

| Component | Keyboard Nav | ARIA Requirement | Contrast Target |
| :--- | :--- | :--- | :--- |
| **Theme Toggle** | Space/Enter to toggle | `aria-label`, `aria-pressed` | 4.5:1 |
| **Navigation** | Tab to navigate links | `role="navigation"`, `aria-current` | 4.5:1 |
| **Buttons** | Tab + Space/Enter | `role="button"`, `aria-label` | 4.5:1 |
| **Forms** | Tab through inputs | `aria-required`, `aria-invalid` | 4.5:1 |
| **Modals** | Focus trap required | `role="dialog"`, `aria-modal="true"` | 4.5:1 |
| **Images** | N/A | `alt` text mandatory | N/A |

### 7.1 Reduced Motion
All animations must be wrapped in `prefers-reduced-motion` checks. Motion One and Framer Motion should default to static or simplified transitions if the user has this preference enabled.
