import type { Lang } from '../i18n/utils';

/**
 * WAYU Executive Committee, as listed in the introduction booklet.
 *
 * Not every member is named publicly (some in the United States, for one);
 * ask before adding a name from Europe or the US, and leave unnamed members out
 * of this list entirely rather than hiding them in the page. The European
 * members listed here were confirmed to stay.
 *
 * `role` is split into display lines on purpose: the organisation name starts
 * its own line ("International Coordinator of" / "the Communist Party of
 * Nepal"), and no line ends on "of", "for" or "and".
 */
interface Member {
  name: string;
  /** English and Turkish live here; other languages in `committee/<lang>.ts`, keyed by name. */
  country: { en: string } & Partial<Record<Lang, string>>;
  role: { en: string[] } & Partial<Record<Lang, string[]>>;
  secretaryGeneral?: boolean;
}

/** Shape of `src/data/committee/<lang>.ts`: translations keyed by the member's name. */
export type CommitteeTranslation = Record<string, { country: string; role: string[] }>;

export const committee: Member[] = [
  {
    name: 'Yakup Büray Yılmaz',
    country: { en: 'Türkiye', tr: 'Türkiye' },
    role: {
      en: ['International Coordinator of', 'the Youth Union of Türkiye (TGB)'],
      tr: ['Türkiye Gençlik Birliği (TGB)', 'Uluslararası Koordinatörü'],
    },
    secretaryGeneral: true,
  },
  {
    name: 'Davide Rossi',
    country: { en: 'Italy', tr: 'İtalya' },
    role: {
      en: ['President of the Independent School', 'and Environment Union (SISA)'],
      tr: ['Bağımsız Okul ve Çevre Sendikası', '(SISA) Başkanı'],
    },
  },
  {
    name: 'Syed Ali Owais',
    country: { en: 'Pakistan', tr: 'Pakistan' },
    role: {
      en: ['International Coordinator of', 'the Imamia Students Organization'],
      tr: ['İmamiye Öğrenci Örgütü', 'Uluslararası Koordinatörü'],
    },
  },
  {
    name: 'Ghazi Abdul Al',
    country: { en: 'Palestine', tr: 'Filistin' },
    role: {
      en: ['International Coordinator of', 'the Popular Front', 'for the Liberation of Palestine (PFLP)'],
      tr: ['Filistin Halk Kurtuluş Cephesi (FHKC)', 'Uluslararası Koordinatörü'],
    },
  },
  {
    name: 'Samuel Iembo',
    country: { en: 'Switzerland', tr: 'İsviçre' },
    role: {
      en: ['International Coordinator of', 'the Communist Party of Switzerland'],
      tr: ['İsviçre Komünist Partisi', 'Uluslararası Koordinatörü'],
    },
  },
  {
    name: 'Prakash Shrestha',
    country: { en: 'Nepal', tr: 'Nepal' },
    role: {
      en: ['International Coordinator of', 'the Communist Party of Nepal'],
      tr: ['Nepal Komünist Partisi', 'Uluslararası Koordinatörü'],
    },
  },
  {
    name: 'Ramis Sohail',
    country: { en: 'Pakistan', tr: 'Pakistan' },
    role: {
      en: ['International Coordinator of', 'the Mazdoor Kisan Party Youth', '(Workers and Peasants Party)'],
      tr: ['Mazdoor Kisan Partisi Gençliği', '(İşçi ve Köylü Partisi)', 'Uluslararası Koordinatörü'],
    },
  },
];
