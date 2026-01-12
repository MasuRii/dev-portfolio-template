# Planned Sections: Developer Portfolio 2026

This document outlines the essential and optional sections for the developer portfolio, based on 2026 web development trends and best practices.

## 1. Core (Obligatory) Sections

### 1.1 Hero / Landing Section
*   **Purpose:** Immediate impact and value proposition.
*   **Key Elements:**
    *   High-contrast, impactful headline (Name + Role/Specialty).
    *   Brief (1-2 sentence) technical bio.
    *   Primary CTA (e.g., "View Projects" or "Hire Me").
    *   Animated micro-interactions or 3D elements (per TECH_STACK).
*   **2026 Trend:** "Main Character" narrative layouts and kinetic typography.

### 1.2 Projects / Portfolio Section
*   **Purpose:** Demonstrating technical capability through evidence.
*   **Key Elements:**
    *   Filterable grid (by tech stack, category).
    *   Detailed case studies (Challenge -> Solution -> Result).
    *   Live demo links and GitHub repository links.
    *   High-quality mockups and screenshots.
*   **2026 Trend:** Interactive prototypes and narrative storytelling.

### 1.3 Skills / Technical Expertise Section
*   **Purpose:** Quick overview of technical proficiency.
*   **Key Elements:**
    *   Categorized skills (Frontend, Backend, DevOps, Tools).
    *   Visual proficiency indicators (optional, but icons are mandatory).
    *   "Currently Learning" or "Future Interests" subsection.
*   **2026 Trend:** Modular grid design with visible borders.

### 1.4 Experience / Work History Section
*   **Purpose:** Professional credibility and career progression.
*   **Key Elements:**
    *   Chronological timeline or card-based layout.
    *   Role, Company, Dates, and key achievements/metrics.
    *   Company logos (for social proof).
*   **2026 Trend:** Collapsible details for a cleaner timeline.

### 1.5 About Me Section
*   **Purpose:** Building personal brand and connection.
*   **Key Elements:**
    *   Professional narrative (not just a resume).
    *   Personal interests or "fun facts" to show personality.
    *   High-quality profile photo or stylized avatar.
*   **2026 Trend:** Authentic, "anti-design" brutalist accents or playful UI.

### 1.6 Contact Section
*   **Purpose:** Conversion and lead generation.
*   **Key Elements:**
    *   Frictionless contact form.
    *   Direct email link (mailto).
    *   Links to LinkedIn, GitHub, and other relevant socials.
*   **2026 Trend:** Magnetic buttons and instant visual feedback loops.

---

## 2. Secondary (Optional / Recommended) Sections

### 2.1 Blog / Articles
*   **Purpose:** Establishing authority and sharing knowledge.
*   **Key Elements:**
    *   Post cards with title, date, and read time.
    *   Search/Filter by topic.
*   **2026 Trend:** AEO-optimized snippets (TL;DR summaries).

### 2.2 Testimonials / Social Proof
*   **Purpose:** Building trust through third-party validation.
*   **Key Elements:**
    *   Quotes from colleagues, clients, or mentors.
    *   Avatars and LinkedIn links for verification.

### 2.3 Experiments / Lab
*   **Purpose:** Showcasing curiosity and "bleeding edge" skills.
*   **Key Elements:**
    *   Small, interactive demos, shaders, or 3D experiments.
    *   "Playground" feel.

### 2.4 FAQ
*   **Purpose:** Addressing common hurdles and SEO.
*   **Key Elements:**
    *   Availability, tech stack preferences, preferred process.
*   **2026 Trend:** Structured FAQ Schema for rich search results.

---

## 3. Content Hierarchy & User Flow

### 3.1 Primary Conversion Goals
1.  **Recruiters & Hiring Managers:** Secure job interviews by demonstrating technical competence and professionalism. (High Priority)
2.  **Potential Clients:** Generate freelance leads by showcasing problem-solving abilities and successful project delivery. (Medium Priority)
3.  **Peer Developers:** Foster networking and open-source collaboration by sharing knowledge and technical depth. (Low Priority)

### 3.2 Information Architecture & Navigation
*   **Primary Navigation (Sticky Header):**
    *   `Work` (Jump to Projects)
    *   `Skills` (Jump to Technical Expertise)
    *   `Experience` (Jump to Timeline)
    *   `About` (Jump to Narrative)
    *   `Contact` (Jump to Action)
*   **Secondary Navigation (Footer):**
    *   Quick links to all sections.
    *   Social links (LinkedIn, GitHub, Twitter).
    *   Resume download.

### 3.3 Section Order & Conversion Funnel
1.  **Hero (Hook):** Immediate identification. "I am [Name], a [Role] building [Value]."
2.  **Projects (Evidence):** The "Why". Proof of technical excellence.
3.  **Skills (Toolbox):** The "How". Categorized technical stack.
4.  **Experience (Credibility):** The "Where". Professional history and trajectory.
5.  **About (Personality):** The "Who". Personal brand and cultural fit.
6.  **Contact (Action):** The "Next Step". Frictionless conversion point.

---

## 4. Technical Requirements & SEO Strategy per Section

| Section | Tech Priority | Data Source | Title Tag Strategy | Meta Description Strategy |
| :--- | :--- | :--- | :--- | :--- |
| **Hero** | Motion One / Framer Motion | Static / CMS | [Name] \| [Role] - Building High-Performance Web Experiences | [Role] specialized in React, Astro, and high-performance animations. View my work and technical case studies. |
| **Projects** | React / Filter Logic | JSON / CMS | Portfolio & Case Studies \| [Name] | Explore a curated list of technical projects and in-depth case studies by [Name], focusing on performance and accessibility. |
| **Skills** | CSS Grid / Icons | JSON | Technical Expertise & Skills \| [Name] | Deep dive into the technical toolbox of [Name]. Expertise in React, TypeScript, Astro, Tailwind CSS, and WebGL. |
| **Experience** | Timeline Component | JSON | Work History & Professional Trajectory \| [Name] | Professional journey of [Name]. Timeline of roles highlighting key technical achievements and growth. |
| **About** | Narrative Text | Static | About [Name] \| [Role] & Problem Solver | The story behind the code. Learn about [Name]'s professional philosophy and approach to building the modern web. |
| **Contact** | Form Validation / API | Serverless Action | Get in Touch \| [Name] | Looking for a [Role]? Contact [Name] for collaborations, job opportunities, or technical consulting. |
| **Blog** | Markdown / Content Collections | .md files | [Post Title] \| Blog \| [Name] | Technical insights and tutorials by [Name] on [Topic]. Focused on modern web development trends. |
| **Personal Info** | JSON | personal.json | [Name] - Software Developer Portfolio | Core biographical data and social links for [Name]. |

---

## 5. Data Structures & Content Requirements

To ensure easy updates and consistent rendering, the portfolio will consume data from JSON files and Markdown collections.

### 5.1 Personal Information (`src/data/personal.json`)
```json
{
  "name": "MasuRii",
  "title": "Full Stack Developer & Creative Technologist",
  "bio": "Compelling story-driven biography focusing on professional philosophy...",
  "shortBio": "Punchy 1-2 sentence value proposition for the Hero section.",
  "avatar": "/assets/images/profile.avif",
  "location": "Global / Remote",
  "socials": {
    "github": "https://github.com/MasuRii",
    "linkedin": "https://linkedin.com/in/MasuRii",
    "twitter": "https://twitter.com/MasuRii"
  },
  "contact": {
    "email": "hello@masurii.dev"
  }
}
```

### 5.2 Projects (`src/data/projects.json`)
```json
[
  {
    "id": "project-slug",
    "title": "Project Name",
    "category": "Web / Mobile / Experiment",
    "thumbnail": "/assets/images/projects/thumb.avif",
    "tags": ["Astro", "Tailwind", "Motion"],
    "summary": "Brief 1-sentence hook for the card view.",
    "links": {
      "live": "https://demo.com",
      "github": "https://github.com/repo"
    },
    "featured": true
  }
]
```
*Note: Detailed case studies will use Markdown files in `src/content/projects/`.*

### 5.3 Skills (`src/data/skills.json`)
```json
[
  {
    "category": "Frontend",
    "skills": [
      { "name": "Astro", "icon": "astro", "level": 95 },
      { "name": "React", "icon": "react", "level": 90 }
    ]
  }
]
```

### 5.4 Experience (`src/data/experience.json`)
```json
[
  {
    "company": "Tech Corp",
    "role": "Senior Developer",
    "period": "2024 - Present",
    "description": [
      "Led migration to Astro 5, improving LCP by 40%.",
      "Implemented a 'Squishy UI' design system."
    ],
    "skills": ["Astro", "Tailwind", "TypeScript"]
  }
]
```

### 5.5 Content Requirements
*   **Images:** All images must be in `.avif` format. Thumbnails: 800x600px. Profile: 400x400px.
*   **Typography:** Headlines must use `Space Grotesk`. Body must use `Inter`.
*   **Accessibility:** Every data entry with an image must include a descriptive `alt` field (not shown in JSON for brevity but required in implementation).
