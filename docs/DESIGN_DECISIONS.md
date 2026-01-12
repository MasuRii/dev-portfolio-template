# Design Decisions

This document outlines the design rationale, visual identity, and component usage guidelines for the developer portfolio.

## 1. Design Rationale

### 1.1 Cyber & Tech Aesthetic

The portfolio adopts a "Cyber" aesthetic, characterized by high-contrast dark backgrounds paired with vibrant, glowing accents (Electric Indigo and Cyber Cyan). This choice reflects a modern, forward-thinking developer brand focused on cutting-edge technologies.

### 1.2 Modular Grid Layout

A consistent 8px modular grid system is used to ensure structured, precise, and professional layout alignment. Visible borders and subtle background grid lines emphasize the "blueprint" or "architectural" nature of software development.

### 1.3 Tactile Feedback (Squishy UI)

Interactive elements use subtle scaling and spring-based animations to provide high tactile feedback, making the interface feel responsive and alive.

## 2. Visual Identity

### 2.1 Color Palette

The color system is optimized for WCAG 2.2 AA compliance while maintaining the brand's technical character.

| Role           | Color Name      | Hex (Dark)     | Hex (Light)    |
| :------------- | :-------------- | :------------- | :------------- |
| **Primary**    | Midnight        | `#0A0A0B` (BG) | `#FFFFFF` (BG) |
| **Text**       | High Contrast   | `#F9FAFB`      | `#111827`      |
| **Accent**     | Electric Indigo | `#6366F1`      | `#4F46E5`      |
| **Accent Alt** | Cyber Cyan      | `#22D3EE`      | `#06B6D4`      |
| **Border**     | Muted Zinc      | `#27272A`      | `#E5E7EB`      |

### 2.2 Typography

We use a variable font system for performance and design flexibility.

- **Headlines:** `Space Grotesk` (300-700) - Chosen for its distinctive geometric forms and technical feel.
- **Body:** `Inter` (100-900) - The industry standard for readability and clarity.
- **Monospace:** `JetBrains Mono` - Used for technical data, code snippets, and metrics.

Fluid typography is implemented using CSS `clamp()` to ensure seamless scaling across all device sizes.

## 3. Component Guidelines

### 3.1 Sections

- **Default:** Transparent background with standard vertical padding.
- **Surface:** Uses the `Surface` background token to provide visual hierarchy and separation between content blocks.

### 3.2 Buttons

- **Primary:** Gradient background (Electric Indigo to Cyber Cyan) with white text. Used for main conversion points (e.g., "View My Work").
- **Secondary:** Transparent background with a thin border. Used for supporting actions (e.g., "Contact Me").
- **Interaction:** All buttons implement a `scale: 0.95` active state for tactile feedback.

### 3.3 Cards

- Cards follow the modular grid style with a `1px` border.
- Hover states include a border color shift to `Electric Indigo` and a subtle vertical lift.

## 4. Accessibility & Performance

- **Contrast:** Minimum 4.5:1 ratio maintained for all text.
- **Motion:** All animations respect the `prefers-reduced-motion` system preference.
- **Loading:** Images use AVIF format and lazy loading; critical Hero assets use eager loading and high fetch priority.
