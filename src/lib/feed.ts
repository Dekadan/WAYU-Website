import rss from '@astrojs/rss';
import { getFeed, entryUrl } from './content';
import { ui, type Lang } from '../i18n/ui';

/** Builds the RSS document for one language across statements, articles and news. */
export async function buildFeed(lang: Lang, site: URL | undefined) {
  const items = await getFeed(lang);

  return rss({
    title: `${ui[lang]['site.fullName']} — ${ui[lang]['site.name']}`,
    description: ui[lang]['site.tagline'],
    site: site ?? 'https://wayouthunion.org',
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
