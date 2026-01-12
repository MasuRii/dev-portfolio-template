# Deployment Guide

This project is optimized for deployment on **Vercel**.

## Prerequisites

- A Vercel account.
- The project pushed to a GitHub, GitLab, or Bitbucket repository.

## Vercel Setup

1. **Import Project:** Select your repository in the Vercel dashboard.
2. **Framework Preset:** Vercel should automatically detect **Astro**.
3. **Build Command:** `bun run build`
4. **Output Directory:** `dist` (standard Astro output)
5. **Install Command:** `bun install`

## Environment Variables

Configure the following environment variables in the Vercel dashboard:

| Variable               | Description                                      | Example                           |
| :--------------------- | :----------------------------------------------- | :-------------------------------- |
| `SITE`                 | The full URL of your site (for SEO and sitemap). | `https://yourname.dev`            |
| `PUBLIC_EMAIL`         | The contact email displayed on the site.         | `hello@yourname.dev`              |
| `PUBLIC_FORM_ENDPOINT` | (Optional) API endpoint for form submissions.    | `https://api.formcarry.com/s/xyz` |

## CI/CD Pipeline

The project includes a GitHub Actions workflow (`.github/workflows/ci.yml`) that runs on every push and pull request to `main` and `develop` branches.

The workflow performs:

- **Linting:** `bun run lint`
- **Type Checking:** `bun run typecheck`
- **Unit Tests:** `bun run test run`
- **Production Build:** `bun run build`
- **E2E Tests:** `bun run test:e2e` (using Playwright)

Vercel will also create **Preview Deployments** for every pull request, allowing you to test changes before merging.

## Custom Domain

To add a custom domain:

1. Go to the **Settings > Domains** tab in your Vercel project.
2. Enter your domain name and follow the instructions to update your DNS records.
3. Vercel will automatically provision an SSL certificate.

## Analytics

The project is configured to use **Vercel Web Analytics**.

- **Automatic Collection:** Page views and visitors are automatically tracked.
- **Custom Events:** Key interactions like CTA clicks, form submissions, and social shares are tracked using `@vercel/analytics`.
- **Viewing Data:** You can view analytics data in the **Analytics** tab of your Vercel project dashboard.
