# Content Update Guide

This project is designed to be easily updated by modifying JSON and Markdown files.

## Personal Information

Edit `src/data/personal.json` to update your name, title, bio, and social links.

```json
{
  "name": "Your Name",
  "title": "Your Role",
  "bio": ["Paragraph 1", "Paragraph 2"],
  "socials": {
    "github": "...",
    "linkedin": "..."
  }
}
```

## Projects

Add or update projects in `src/data/projects.json`.

```json
{
  "id": "my-cool-project",
  "title": "My Cool Project",
  "category": "Web",
  "tags": ["React", "TypeScript"],
  "summary": "Short description.",
  "links": {
    "live": "...",
    "github": "..."
  }
}
```

## Skills

Update your technical stack in `src/data/skills.json`. Skills are categorized by name and proficiency level (0-100).

## Experience

Manage your career timeline in `src/data/experience.json`.

## Blog Posts

Blog metadata is stored in `src/data/blog.json`.
(Future: Full Markdown content can be added to `src/content/blog/` if content collections are fully implemented).

## Images

Place new images in the `public/` folder or a CDN. Reference them by path in the JSON files. It is recommended to use high-quality images; the build process will automatically optimize them to AVIF format.
