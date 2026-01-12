# Astro Starter Kit: Minimal

```sh
bun create astro@latest -- --template minimal
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 📖 Documentation

Detailed project documentation can be found in the `docs/` directory:

- [Architecture](./docs/ARCHITECTURE.md) - Tech stack and design patterns.
- [Deployment](./docs/DEPLOYMENT.md) - How to deploy to Vercel.
- [Content Guide](./docs/CONTENT_GUIDE.md) - How to update your portfolio content.

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                 | Action                                           |
| :---------------------- | :----------------------------------------------- |
| `bun install`           | Installs dependencies                            |
| `bun run typecheck`     | Runs type checking using `astro check`           |
| `bun run lint`          | Runs ESLint for code quality                     |
| `bun run format`        | Runs Prettier for code formatting                |
| `bun run test`          | Runs unit tests using Vitest                     |
| `bun run test:e2e`      | Runs E2E tests using Playwright                  |
| `bun run test:coverage` | Runs test coverage reporting                     |
| `bun dev`               | Starts local dev server at `localhost:4321`      |
| `bun build`             | Build your production site to `./dist/`          |
| `bun preview`           | Preview your build locally, before deploying     |
| `bun astro ...`         | Run CLI commands like `astro add`, `astro check` |
| `bun astro -- --help`   | Get help using the Astro CLI                     |

## 🚀 Deployment & Environment Variables

This project is optimized for deployment on **Vercel**. To configure your production environment, set the following environment variables:

| Variable               | Description                                       | Example                           |
| :--------------------- | :------------------------------------------------ | :-------------------------------- |
| `SITE`                 | The full URL of your site (for SEO and sitemap).  | `https://masurii.dev`             |
| `PUBLIC_EMAIL`         | The public contact email displayed on the site.   | `hello@masurii.dev`               |
| `PUBLIC_FORM_ENDPOINT` | (Optional) The API endpoint for form submissions. | `https://api.formcarry.com/s/xyz` |

You can use the `.env.example` file as a template for your local `.env` file.

## 👀 Want to learn more?

For information on how to contribute to this project, please see [CONTRIBUTING.md](./CONTRIBUTING.md).

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
