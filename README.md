# Ghost Theme Starter Kit

<div align="center">
   <img src="https://mintcdn.com/ghost/5_xpDDjqLTzEezAK/images/3715a5ca-ghost-logo-light.png?w=1100&fit=max&auto=format&n=5_xpDDjqLTzEezAK&q=85&s=02cd3d095e93413aef1f203afb1faaea" alt="Ghost CMS" height="64" />
   <img src="https://vitejs.dev/logo.svg" alt="Vite" height="64" style="margin: 0 16px;" />
   <img src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg" alt="Tailwind CSS" height="64" />
</div>

A minimal Ghost CMS theme starter that combines Ghost templates with modern tools (Vite + Tailwind CSS 4) to help you build and deploy themes quickly. Clone it, customize it, and use it for personal, client, or commercial projects.

## Features

- **Vite & HMR**: Hot Module Replacement for Handlebars (`.hbs`), CSS/Tailwind, and JavaScript assets
- **Tailwind CSS 4**: Next-gen utility-first styling with `@tailwindcss/typography` and CSS variable design tokens
- **Code Syntax Highlighting**: Automatic code block highlighting via `highlight.js` with a built-in copy button (`highlightjs-copy`)
- **Ready-to-ship Structure**: Complete layout templates, responsive header/footer, pagination, and Lucide icons
- **Automatic Image Optimization**: Integrated `Sharp` image optimization pipeline via `vite-plugin-image-optimizer`
- **One-command Packaging**: Production build exports an optimized ZIP file ready for Ghost upload

## Prerequisites

- Node.js 22+ and `pnpm` installed globally
- A local or remote Ghost instance (v6+) to test the theme

## Quick Start

1. Clone the repository:

   ```bash
   git clone https://github.com/frontendweb3/ghost-theme-starter-kit.git
   cd ghost-theme-starter
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Develop with Hot Module Replacement (HMR):

   ```bash
   pnpm dev
   ```

   This starts the Vite dev server on `http://localhost:5173`. Open your local Ghost site at `http://localhost:2368` to see live updates.

4. Production build:

   ```bash
   pnpm build
   ```

   This compiles assets into `assets/dist/` and generates the theme `.zip` file for deployment.

## How Hot Module Replacement (HMR) Works with Ghost CMS

Ghost CMS runs on `http://localhost:2368` and Vite dev server runs on `http://localhost:5173`.

- **Client Injection**: [partials/hmr.hbs](file:///home/officialrajdeepsingh/frontendweb/ghost-theme/ghost-theme-starter/partials/hmr.hbs) automatically detects `localhost` / `127.0.0.1` and injects Vite's client script (`@vite/client`) and `assets/js/main.js`.
- **Template Reloads (`.hbs`)**: When you edit any `.hbs` Handlebars template, the custom `ghostHmrPlugin` in [vite.config.ts](file:///home/officialrajdeepsingh/frontendweb/ghost-theme/ghost-theme-starter/vite.config.ts) invalidates Vite's module graph (allowing Tailwind CSS v4 to scan for new classes) and sends a `full-reload` signal to refresh the page in your browser.
- **Instant CSS & JS Updates (`.css` / `.js`)**: Styling changes (Tailwind classes) and JS changes update instantly in the browser via Vite's native HMR without refreshing the page.

## Code Syntax Highlighting (Highlight.js)

Code syntax highlighting is pre-configured for code blocks inside posts and pages.

- **Implementation**: Located in `assets/js/highlight.js` and loaded dynamically via `assets/js/post.js` on post/page templates (`{{#is "post, page"}}`).
- **Features**:
  - Theme: GitHub Dark (`highlight.js/styles/github-dark.css`)
  - Copy Button: Uses `highlightjs-copy` to display a one-click copy button on hover for `<pre><code>` blocks.
- **Supported Languages**: `bash`, `css`, `javascript`, `typescript`, `json`, `xml/html`.
- **Adding Languages**: Import and register new languages in `assets/js/highlight.js`:

  ```js
  import python from 'highlight.js/lib/languages/python';
  hljs.registerLanguage('python', python);
  ```

## Using with Ghost

- Copy the built theme output into your Ghost installation's `content/themes/<your-theme>/` directory (or symlink it during development).
- Restart Ghost so it picks up the new theme, then activate it in the Ghost admin UI.
- Adjust the `config` values in `package.json` (for example, `posts_per_page` and `card_assets`) to match your design needs.

## Project Structure

- Templates: `author.hbs`, `default.hbs`, `index.hbs`, `post.hbs`, `page.hbs`, `tag.hbs`, `error-404.hbs`
- Partials: `partials/` (header, footer, navigation, pagination, cards, hmr)
- Components: `partials/components` (button and icon). These are reusable UI partials built with Lucide icons.
- Assets: `assets/` (CSS, JS, images) compiled by Vite into `assets/dist/`
- Build config: `vite.config.ts`

## Styling

- Tailwind CSS 4 is included via `@tailwindcss/vite` and `@tailwindcss/typography`.
- Add utility classes in `assets/css/styles.css` and extend via Tailwind config or CSS variables.

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

## Shadcn UI CSS Variable Support

This starter supports shadcn-style design tokens (CSS variables):

- Variables defined in `assets/css/shadcn-variables.css`.
- Imported in `assets/css/styles.css`.
- Includes `:root` variables for light mode and `.dark` variables for dark mode.
- `@theme inline` mappings for Tailwind CSS 4 tokens.

## Vite Plugin List

The following plugins are configured in `vite.config.ts`:

- `ghostHmrPlugin`: watches Handlebars (`.hbs`) templates, invalidates module graph for Tailwind CSS v4, and triggers full browser reloads for Ghost CMS.
- `@tailwindcss/vite`: compiles Tailwind CSS 4 during build and development.
- `vite-plugin-image-optimizer`: optimizes image assets (jpg/png/webp/svg/avif) for maximum performance.
- `vite-plugin-zip-pack` (production mode): creates a theme `.zip` archive ready for upload.

## Scripts

- `pnpm dev` — Starts Vite HMR dev server on port 5173 for live reloading inside Ghost templates.
- `pnpm build` — Creates a production build and generates the theme ZIP file.
- `pnpm test` — Tests the Ghost CMS v6 theme using the `gscan` CLI.
- `pnpm screenshot` — Captures full-page screenshots of theme routes across desktop, tablet, and mobile viewports using Playwright and generates an HTML gallery (`screenshots/index.html`).

## Licensing

This starter is released under the MIT License (see LICENSE.md). You are free to use it for personal, client, or commercial projects.
