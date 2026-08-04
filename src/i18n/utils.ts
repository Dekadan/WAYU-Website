import { defaultLang, ui, type Lang, type UIKey } from './ui';

export { defaultLang, languages, type Lang } from './ui';

/** Reads the active language out of the current URL. `/tr/articles` -> `tr`. */
export function getLangFromUrl(url: URL): Lang {
  const [, first] = url.pathname.split('/');
  return first in ui ? (first as Lang) : defaultLang;
}

/** Returns a `t('nav.home')` helper bound to one language. */
export function useTranslations(lang: Lang) {
  return function t(key: UIKey): string {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}

/**
 * Builds an absolute path for a route in a given language.
 * English is unprefixed (`/articles`), every other locale is (`/tr/articles`).
 */
export function localisePath(path: string, lang: Lang): string {
  const clean = `/${path.replace(/^\/+|\/+$/g, '')}`;
  if (lang === defaultLang) return clean === '/' ? '/' : clean;
  return clean === '/' ? `/${lang}` : `/${lang}${clean}`;
}

/**
 * Normalises a built path back to the URL visitors actually use.
 *
 * With `build.format: 'file'` Astro reports `/about.html` (and `/index.html`
 * for the homepage) during the build, while the host serves those at `/about`
 * and `/`. Canonical tags, hreflang alternates and nav active-state all compare
 * against the served form, so everything runs through here first.
 */
export function cleanPath(pathname: string): string {
  let path = pathname;
  if (path.endsWith('/index.html')) path = path.slice(0, -'index.html'.length);
  else if (path.endsWith('.html')) path = path.slice(0, -'.html'.length);
  if (path.length > 1 && path.endsWith('/')) path = path.slice(0, -1);
  return path === '' ? '/' : path;
}

/** Strips the locale prefix so a path can be re-localised into another language. */
export function stripLang(pathname: string): string {
  const parts = cleanPath(pathname).split('/').filter(Boolean);
  if (parts[0] && parts[0] in ui) parts.shift();
  return `/${parts.join('/')}`;
}

const dateLocales: Record<Lang, string> = { en: 'en-GB', tr: 'tr-TR' };

export function formatDate(date: Date, lang: Lang): string {
  return new Intl.DateTimeFormat(dateLocales[lang], {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}
