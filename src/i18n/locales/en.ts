/** English interface strings. Every other locale falls back to these key by key. */
const en = {
    'site.name': 'WAYU',
    'site.fullName': 'World Anti-Imperialist Youth Union',
    'site.tagline': 'Youth of the world, united against imperialism',

    'nav.home': 'Home',
    'nav.about': 'About WAYU',
    'nav.history': 'History',
    'nav.statements': 'Statements',
    'nav.articles': 'Articles',
    'nav.authors': 'Authors',
    'nav.news': 'News',
    'nav.documents': 'Documents',
    'nav.join': 'Join Us',
    'nav.menu': 'Menu',
    'nav.close': 'Close',
    'nav.skip': 'Skip to content',
    'nav.theme': 'Switch between light and dark theme',

    'home.latest': 'Latest',
    'home.statements': 'Statements',
    'home.articles': 'Articles',
    'home.news': 'News',
    'home.documents': 'Founding Documents',
    'home.authors': 'Our Authors',
    'home.about.title': 'What is WAYU?',
    'home.about.cta': 'Read more about WAYU',
    'home.join.title': 'Take your place in the anti-imperialist front',
    'home.join.body':
      'WAYU brings together anti-imperialist youth organisations from every continent. If your organisation shares this struggle, get in touch with us.',
    'home.join.cta': 'Get in touch',
    'home.hero.kicker': 'Since 29 October 2014',
    'home.hero.title': 'Uniting the youth of the world against imperialism',
    'home.hero.body':
      'WAYU is a roof organisation of national anti-imperialist youth organisations from every continent.',
    'home.hero.cta': 'Who we are',
    'home.dossier': 'Introduction dossier (PDF)',
    'home.dossier.title': 'WAYU at a glance',
    'home.dossier.body':
      'Our story from the founding congress in Istanbul to today: congresses, delegations, webinars and the Executive Committee, in one booklet.',
    'home.dossier.cta': 'Download the PDF',
    'home.stand.title': 'Where we stand',
    'home.stand.lead': 'Against American imperialism, in every context',
    'home.history.title': 'Twelve years of struggle',
    'home.history.lead': 'Congresses, delegations and actions since the founding congress in Istanbul in 2014.',
    'home.history.cta': 'See the full history',

    'history.title': 'History',
    'history.description':
      'Congresses, delegations, webinars and actions: the record of WAYU since its founding congress in Istanbul in 2014.',

    'committee.title': 'Executive Committee',
    'committee.secretaryGeneral': 'Secretary General',

    'list.all': 'All',
    'list.empty': 'Nothing published here yet.',
    'list.readMore': 'Read more',
    'list.viewAll': 'View all',

    'post.by': 'By',
    'post.published': 'Published',
    'post.updated': 'Updated',
    'post.share': 'Share',
    'post.copyLink': 'Copy link',
    'post.copied': 'Link copied',
    'post.back': 'Back to all',
    'post.related': 'Related',
    'post.signatories': 'Signatories',
    'post.issuedBy': 'Issued by',
    'post.source': 'Source',
    'post.originalSource': 'Originally published at',
    'post.download': 'Download document',
    'post.tags': 'Tags',

    'author.articles': 'Articles by this author',
    'author.noArticles': 'No articles published yet.',
    'author.profile': 'Author profile',

    'lang.switch': 'Language',
    'lang.notAvailable': 'This page is not available in Türkçe.',

    'footer.follow': 'Follow WAYU',
    'footer.sections': 'Sections',
    'footer.about': 'About',
    'footer.rights': 'Content may be freely reproduced with attribution.',
    'footer.rss': 'RSS feed',
    'footer.slogan': 'The people united will never be defeated.',

    'error.404.title': 'Page not found',
    'error.404.body': 'The page you are looking for does not exist or has been moved.',
    'error.404.cta': 'Return to the homepage',
    'home.hero.imageAlt': 'Young delegates raising their fists, 2018',

    'section.statements.description': 'Official positions of the World Anti-Imperialist Youth Union and its member organisations.',
    'section.articles.description': 'Analysis and opinion from anti-imperialist youth across the world.',
    'section.authors.description': 'The comrades who write for WAYU, from member organisations on six continents.',
    'section.documents.description': 'The constitution, declarations and congress resolutions that WAYU is built on.',
    'section.news.description': 'Reports on the struggles we consider worth following.',

    'lang.fallback': 'This text is not yet available in your language. The English original is shown.',
} as const;

export type UIStrings = Partial<Record<keyof typeof en, string>>;

export default en;
