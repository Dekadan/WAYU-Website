import en from './locales/en';
import tr from './locales/tr';
import ar from './locales/ar';
import es from './locales/es';
import ru from './locales/ru';
import it from './locales/it';
import fr from './locales/fr';
import pt from './locales/pt';
import fa from './locales/fa';
import zh from './locales/zh';
import type { UIStrings } from './locales/en';

/** Native names, in the order the language menu lists them. */
export const languages = {
  en: 'English',
  tr: 'Türkçe',
  ar: 'العربية',
  es: 'Español',
  ru: 'Русский',
  it: 'Italiano',
  fr: 'Français',
  pt: 'Português',
  fa: 'فارسی',
  zh: '中文',
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'en';

/** Languages written right to left; their pages get `dir="rtl"`. */
export const rtlLangs: readonly Lang[] = ['ar', 'fa'];

/** Every locale except English is partial: a missing key shows the English text. */
export const ui: { en: typeof en } & Record<Exclude<Lang, 'en'>, UIStrings> = {
  en,
  tr,
  ar,
  es,
  ru,
  it,
  fr,
  pt,
  fa,
  zh,
};

export type UIKey = keyof typeof en;
