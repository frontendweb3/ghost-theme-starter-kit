import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import zipPack from 'vite-plugin-zip-pack'
import fs from 'node:fs'
import path from 'node:path'
import purgeCSSPlugin from '@fullhuman/postcss-purgecss'


export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';

  const purgeCssContent = [
    './**/*.hbs',
    'assets/js/**/*.js',
    'assets/css/**/*.css'
  ];
  
  return {
    plugins: [
      tailwindcss(),
      ViteImageOptimizer({
        test: /\.(jpe?g|png|gif|tiff|webp|svg|avif)$/i,
        includePublic: true,
        logStats: true,
        jpeg: { quality: 80 },
        jpg: { quality: 80 },
        png: { quality: 80 },
        webp: { quality: 80 },
      }),
      isProduction && zipPack({
          inDir: './', // Root of your theme
          outDir: './', // Where to place the zip
          outFileName: `${JSON.parse(fs.readFileSync(path.join('.', 'package.json'), 'utf-8')).name}.zip`,
          // Important: Filter what goes into the final zip
          filter: (fileName, filePath) => {
              // Include compiled assets from dist
              if (filePath.includes('assets/dist')) return true;
              // Include hbs templates
              if (fileName.endsWith('.hbs')) return true;
              // Include partials folder
              if (filePath.includes('partials')) return true;
              // Include package.json
              if (fileName === 'package.json') return true;
              // Include LICENSE
              if (fileName === 'LICENSE') return true;
              
              // Exclude everything else (node_modules, source assets, etc)
              return false;
          }
      })
    ],
    css: {
      postcss: {
        plugins: isProduction
          ? [
              purgeCSSPlugin({
                content: purgeCssContent,
                defaultExtractor: (content) => content.match(/[A-Za-z0-9-_.:/\[\]]+/g) || [],
                safelist: {
                  standard: [':root', '.dark']
                },
                variables: true,
                fontFace: true,
                keyframes: true
                })
            ]
          : []
      }
    },
    build: {
      outDir: 'assets/dist',
      emptyOutDir: true,
      rollupOptions: {
        input: {
          main: 'assets/js/main.js'
        },
        output: {
          entryFileNames: 'js/[name].js',
          chunkFileNames: 'js/[name].js',
          assetFileNames: (assetInfo) => {
            if (assetInfo.name?.endsWith('.css')) {
              return 'css/[name][extname]';
            }
            if (assetInfo.name && /\.(jpe?g|png|gif|svg|webp|avif)$/i.test(assetInfo.name)) {
              const name = assetInfo.name.split('/').pop();
              return `images/${name}`;
            }
            return 'assets/[name][extname]';
          }
        }
      }
    },
  };
})
