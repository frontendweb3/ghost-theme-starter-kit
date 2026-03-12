# Ghost Theme Starter Kit

<div align="center">
   <img src="https://mintcdn.com/ghost/5_xpDDjqLTzEezAK/images/3715a5ca-ghost-logo-light.png?w=1100&fit=max&auto=format&n=5_xpDDjqLTzEezAK&q=85&s=02cd3d095e93413aef1f203afb1faaea" alt="Ghost CMS" height="64" />
   <img src="https://vitejs.dev/logo.svg" alt="Vite" height="64" style="margin: 0 16px;" />
   <img src="https://tailwindcss.com/_next/static/media/tailwindcss-logotype-white.541819ec.svg" alt="Tailwind CSS" height="64" />
</div>

A minimal Ghost CMS theme starter that combines Ghost templates with modern tools (Vite + Tailwind CSS 4) to help you build and deploy themes quickly. Clone it, customize it, and use it for commercial or client projects.

## Features

- Vite-powered development and build pipeline for quick reloads and optimized bundles
- Tailwind CSS 4 with the Typography plugin for efficient styling
- Ready-to-ship structure with assets  and basic pagination/navigation components
- Automatic image optimization using Sharp for enhanced performance
- Theme packaging that allows export as a zip file for easy distribution and deployment

## Prerequisites

- Node.js 22+ and pnpm installed globally
- A local or remote Ghost instance (v6+) to test the theme

## Quick Start

1. Clone the repo:

   ```bash
   git clone https://github.com/frontendweb3/ghost-theme-starter-kit.git
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
- Components: `partials/components` (button and icon). These are reusable UI partials, and the icon partial is built with Lucide.
- Assets: `assets/` (CSS, JS, images) compiled by Vite into `public/`
- Build config: `vite.config.ts`
- Images: source under `assets/images/` and optimized into `assets/dist/image/`

## Styling

- Tailwind CSS 4 is included via `tailwindcss` and `@tailwindcss/typography`.
- Add utility classes in `assets/css/styles.css` and extend via Tailwind config if desired.

## Lucide Icon Guide

This starter uses `lucide` with a reusable Handlebars partial.

1. Add the icon import in `assets/js/icons.js`.

   ```js
   import { createIcons, Sun, Moon, Search, UserRound, SendHorizontal, Heart } from 'lucide';
   ```

2. Register it in the `icons` object inside `createIcons`.

   ```js
   createIcons({
     icons: {
       Sun,
       Moon,
       Search,
       UserRound,
       SendHorizontal,
       Heart
     }
   });
   ```

3. Use the icon partial in any `.hbs` file.

   ```hbs
   {{> "components/icon" name="heart" class="w-4 h-4" ariaLabel="Heart icon"}}
   ```

Simple rule: import icon as `Heart` in JS, then use `name="heart"` in Handlebars. For two-word icons (example `UserRound`), use kebab-case in templates (`name="user-round"`).

## Shadcn UI CSS Variable Support

This starter supports shadcn-style design tokens (CSS variables), even though this is a Ghost theme and not a React app.

- Variables are defined in `assets/css/shadcn-variables.css`.
- The variables file is imported in `assets/css/styles.css`.
- Includes `:root` variables for light mode.
- Includes `.dark` variables for dark mode.
- Includes `@theme inline` mappings for Tailwind CSS 4 tokens.

In simple terms: these variables are your theme colors, spacing, radius, and shadows. Tailwind utility classes read from them, so you can change the theme from one place.

## Vite Plugin List (Simple)

The following plugins are configured in `vite.config.ts`:

- `@tailwindcss/vite`
  - Why: compiles Tailwind CSS 4 during build/watch.
- `vite-plugin-image-optimizer`
  - Why: optimizes image assets (jpg/png/webp/svg/avif) for better performance.
- `vite-plugin-zip-pack` (production only)
  - Why: creates a final theme `.zip` file for Ghost upload/deployment.
- `@fullhuman/postcss-purgecss` (production only)
  - Why: removes unused CSS based on `.hbs`, JS, and CSS content paths to reduce final CSS size.

## Scripts

- `pnpm dev` — Build in watch mode for development
- `pnpm build` — Production build and it genrate the theme zip file.
- `pnpm test` — testing ghost cms v6 theme using gscan cli

## Licensing

This starter is released under the MIT License (see LICENSE.md). You are free to use it for personal, client, or commercial projects and to sell derived themes.
