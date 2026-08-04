// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Canonical public URL of the site. Override per-deployment with the SITE_URL
// environment variable (Netlify/Vercel/Cloudflare all let you set this).
const site = process.env.SITE_URL ?? 'https://wayouthunion.org';

export default defineConfig({
  site,
  // 'ignore' rather than 'never': Decap CMS is served from /admin/ and its
  // auth redirects rely on the trailing slash resolving.
  trailingSlash: 'ignore',
  build: {
    // Emit `about.html` rather than `about/index.html`. Static hosts serve
    // that at `/about` directly, so internal links and the canonical URLs —
    // which are written without a trailing slash — resolve without a 301 hop.
    format: 'file',
  },
  i18n: {
    locales: ['en', 'tr'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en', tr: 'tr' },
      },
      filter: (page) => !page.includes('/admin'),
    }),
  ],
  vite: {
    plugins: [
      tailwindcss(),
      /*
       * Static hosts resolve `/admin/` to `public/admin/index.html` on their
       * own; the dev server does not, and falls through to the 404 page. This
       * makes `npm run dev` behave like production for the CMS.
       */
      {
        name: 'wayu:serve-admin-in-dev',
        apply: 'serve',
        configureServer(server) {
          server.middlewares.use((req, _res, next) => {
            if (req.url === '/admin' || req.url === '/admin/') {
              req.url = '/admin/index.html';
            }
            next();
          });
        },
      },
    ],
  },
});
