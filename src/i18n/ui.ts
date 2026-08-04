export const languages = {
  en: 'English',
  tr: 'Türkçe',
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'en';

export const ui = {
  en: {
    'site.name': 'WAYU',
    'site.fullName': 'World Anti-Imperialist Youth Union',
    'site.tagline': 'Youth of the world, united against imperialism',

    'nav.home': 'Home',
    'nav.about': 'About WAYU',
    'nav.statements': 'Statements',
    'nav.articles': 'Articles',
    'nav.authors': 'Authors',
    'nav.news': 'News',
    'nav.documents': 'Documents',
    'nav.join': 'Join Us',
    'nav.menu': 'Menu',
    'nav.close': 'Close',
    'nav.skip': 'Skip to content',

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

    'error.404.title': 'Page not found',
    'error.404.body': 'The page you are looking for does not exist or has been moved.',
    'error.404.cta': 'Return to the homepage',
  },

  tr: {
    'site.name': 'WAYU',
    'site.fullName': 'Dünya Anti-Emperyalist Gençlik Birliği',
    'site.tagline': 'Dünya gençliği, emperyalizme karşı birleşiyor',

    'nav.home': 'Anasayfa',
    'nav.about': 'WAYU Nedir?',
    'nav.statements': 'Açıklamalar',
    'nav.articles': 'Yazılar',
    'nav.authors': 'Yazarlar',
    'nav.news': 'Haberler',
    'nav.documents': 'Ana Belgeler',
    'nav.join': 'Bize Katıl',
    'nav.menu': 'Menü',
    'nav.close': 'Kapat',
    'nav.skip': 'İçeriğe geç',

    'home.latest': 'Öne Çıkanlar',
    'home.statements': 'Açıklamalar',
    'home.articles': 'Yazılar',
    'home.news': 'Haberler',
    'home.documents': 'Ana Belgeler',
    'home.authors': 'Yazarlarımız',
    'home.about.title': 'WAYU Nedir?',
    'home.about.cta': 'WAYU hakkında daha fazlası',
    'home.join.title': 'Anti-emperyalist cephede yerini al',
    'home.join.body':
      'WAYU, her kıtadan anti-emperyalist gençlik örgütlerini bir araya getiriyor. Örgütünüz bu mücadeleyi paylaşıyorsa bizimle iletişime geçin.',
    'home.join.cta': 'İletişime geç',

    'list.all': 'Tümü',
    'list.empty': 'Burada henüz bir yayın yok.',
    'list.readMore': 'Devamını oku',
    'list.viewAll': 'Tümünü gör',

    'post.by': 'Yazan',
    'post.published': 'Yayın tarihi',
    'post.updated': 'Güncellendi',
    'post.share': 'Paylaş',
    'post.copyLink': 'Bağlantıyı kopyala',
    'post.copied': 'Bağlantı kopyalandı',
    'post.back': 'Tümüne dön',
    'post.related': 'İlgili içerikler',
    'post.signatories': 'İmzacılar',
    'post.issuedBy': 'Yayınlayan',
    'post.source': 'Kaynak',
    'post.originalSource': 'İlk yayın yeri',
    'post.download': 'Belgeyi indir',
    'post.tags': 'Etiketler',

    'author.articles': 'Bu yazarın yazıları',
    'author.noArticles': 'Henüz yayınlanmış yazı yok.',
    'author.profile': 'Yazar profili',

    'lang.switch': 'Dil',
    'lang.notAvailable': 'Bu sayfa English dilinde mevcut değil.',

    'footer.follow': "WAYU'yu takip et",
    'footer.sections': 'Bölümler',
    'footer.about': 'Hakkında',
    'footer.rights': 'İçerikler kaynak gösterilerek serbestçe çoğaltılabilir.',
    'footer.rss': 'RSS akışı',

    'error.404.title': 'Sayfa bulunamadı',
    'error.404.body': 'Aradığınız sayfa mevcut değil ya da taşınmış.',
    'error.404.cta': 'Anasayfaya dön',
  },
} as const;

export type UIKey = keyof (typeof ui)['en'];
