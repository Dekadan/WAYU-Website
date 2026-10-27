import type { APIContext, GetStaticPaths } from 'astro';
import { buildFeed } from '../../lib/feed';
import { prefixedLangs, type Lang } from '../../i18n/utils';

export const getStaticPaths = (() => prefixedLangs.map((lang) => ({ params: { lang } }))) satisfies GetStaticPaths;

export const GET = (context: APIContext) => buildFeed(context.params.lang as Lang, context.site);
