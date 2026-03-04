# Ghost Theme Starter Kit

<p align="center">
   <img src="https://static.ghost.org/v4.0.0/images/ghost-logo.svg" alt="Ghost CMS" height="64" />
   <img src="https://vitejs.dev/logo.svg" alt="Vite" height="64" style="margin: 0 16px;" />
   <img src="https://tailwindcss.com/_next/static/media/tailwindcss-logotype.128b6e12.svg" alt="Tailwind CSS" height="64" />
  
</p>

A minimal Ghost CMS theme starter that pairs Ghost templates with modern tooling (Vite + Tailwind CSS 4) so you can prototype, build, and ship themes quickly. Clone it, customize it, and use it for commercial or client projects.

## Features

- Vite-powered dev/build pipeline for fast reloads and optimized bundles
- Tailwind CSS 4 with Typography plugin for rapid styling
- Ghost theme scaffolding with Handlebars templates and partials
- Ready-to-ship structure: assets pipeline, public folder, and basic pagination/navigation components
- Automatic image optimization with sharp for performant delivery
- Theme packaging: export as a zip file for easy distribution and deployment

## Prerequisites

- Node.js 22+ and pnpm installed globally
- A local or remote Ghost instance (v6+) to test the theme

## Quick Start

1. Clone the repo:

   ```bash
   git clone <your-fork-or-clone-url>
   cd ghost-theme-starter
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Develop (build in watch mode):

   ```bash
   pnpm dev
   ```

   This runs `vite build --watch` so assets rebuild on change.

4. Production build:

   ```bash
   pnpm build
   ```

## Using with Ghost

- Copy the built theme output into your Ghost installation’s `content/themes/<your-theme>/` directory (or symlink during development).
- Restart Ghost so it picks up the new theme, then activate it in the Ghost admin UI.
- Adjust `package.json` `config` values (e.g., `posts_per_page`, `card_assets`) to match your design needs.

## Project Structure

- Templates: `author.hbs`, `default.hbs`, `index.hbs`, `post.hbs`, `page.hbs`, `tag.hbs`, `error-404.hbs`
- Partials: `partials/` (header, footer, navigation, pagination, cards)
- Assets: `assets/` (CSS, JS, images) compiled by Vite into `public/`
- Build config: `vite.config.ts`
- Images: source under `assets/images/` and optimized into `assets/dist/image/`

## Styling

- Tailwind CSS 4 is included via `tailwindcss` and `@tailwindcss/typography`.
- Add utility classes in `assets/css/styles.css` and extend via Tailwind config if desired.

## Scripts

- `pnpm dev` — Build in watch mode for development
- `pnpm build` — Production build
- `pnpm preview` — Preview the production build locally

## Licensing

This starter is released under the MIT License (see LICENSE.md). You are free to use it for personal, client, or commercial projects and to sell derived themes.
