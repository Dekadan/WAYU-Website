import rss from '@astrojs/rss';
import { getFeed, entryUrl } from './content';
import { useTranslations } from '../i18n/utils';
import type { Lang } from '../i18n/ui';

/** Builds the RSS document for one language across statements, articles and news. */
export async function buildFeed(lang: Lang, site: URL | undefined) {
  const items = await getFeed(lang);
  const t = useTranslations(lang);

  return rss({
    title: `${t('site.fullName')} — ${t('site.name')}`,
    description: t('site.tagline'),
    site: site ?? 'https://waiyouthunion.com',
    trailingSlash: false,
    items: items.slice(0, 50).map(({ section, entry }) => ({
      title: entry.data.title,
      description: entry.data.description ?? '',
      pubDate: entry.data.date,
      link: entryUrl(section, entry),
      categories: entry.data.tags,
    })),
    customData: `<language>${lang}</language>`,
  });
}
