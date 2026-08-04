import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Every collection is stored as `src/content/<collection>/<lang>/<slug>.md`.
 * That layout is what Decap CMS produces with `structure: multiple_folders`,
 * so the CMS and the build agree on where files live without any glue code.
 */
const localised = (collection: string) =>
  glob({ pattern: '**/[^_]*.{md,mdx}', base: `./src/content/${collection}` });

/** Fields every piece of content shares. */
const base = {
  title: z.string(),
  /** Short summary used in listings, cards, social previews and RSS. */
  description: z.string().optional(),
  date: z.coerce.date(),
  updated: z.coerce.date().optional(),
  /** Path under /public, e.g. `/uploads/istanbul-congress.jpg`. */
  image: z.string().optional(),
  imageAlt: z.string().optional(),
  tags: z.array(z.string()).default([]),
  /** Pinned to the top of the homepage. */
  featured: z.boolean().default(false),
  draft: z.boolean().default(false),
  /**
   * Where the text was first published. Member organisations often carry a
   * WAYU statement before we do, and that credit belongs on every section.
   */
  source: z.string().optional(),
  sourceUrl: z.url().optional(),
};

/** Opinion pieces and analysis, written by named authors. */
const articles = defineCollection({
  loader: localised('articles'),
  schema: z.object({
    ...base,
    /** Slug of an entry in the `authors` collection. */
    author: z.string().optional(),
    /** Set when the piece was first published elsewhere. */
    originalSource: z.string().optional(),
    originalSourceUrl: z.url().optional(),
  }),
});

/** Official positions taken by WAYU or its member organisations. */
const statements = defineCollection({
  loader: localised('statements'),
  schema: z.object({
    ...base,
    /** Organisations that put their name to the statement. */
    signatories: z.array(z.string()).default([]),
    /** e.g. "Executive Committee", "3rd Congress". */
    issuedBy: z.string().optional(),
  }),
});

/** Reports on events we consider worth covering. */
const news = defineCollection({
  loader: localised('news'),
  schema: z.object({
    ...base,
    location: z.string().optional(),
  }),
});

/** Founding texts: constitution, congress resolutions, programmes. */
const documents = defineCollection({
  loader: localised('documents'),
  schema: z.object({
    ...base,
    kind: z
      .enum(['constitution', 'declaration', 'resolution', 'programme', 'report'])
      .default('declaration'),
    /** Optional downloadable version, e.g. `/uploads/wayu-constitution.pdf`. */
    file: z.string().optional(),
    /** Lower numbers sort first; documents are ordered, not chronological. */
    order: z.number().default(100),
  }),
});

/**
 * Standing pages (About, Join) that have their own route rather than appearing
 * in a feed. Editors change the text; developers own the routing.
 */
const pages = defineCollection({
  loader: localised('pages'),
  schema: z.object({
    title: z.string(),
    /** Shown under the page title and used as the meta description. */
    description: z.string().optional(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    /** Key figures rendered as a band, e.g. "40 / member organisations". */
    stats: z
      .array(z.object({ value: z.string(), label: z.string() }))
      .default([]),
    /** Short titled blocks rendered as a grid under the main text. */
    highlights: z
      .array(z.object({ title: z.string(), body: z.string() }))
      .default([]),
  }),
});

/** Contributor profiles, shown on article bylines and the authors index. */
const authors = defineCollection({
  loader: localised('authors'),
  schema: z.object({
    name: z.string(),
    role: z.string().optional(),
    organization: z.string().optional(),
    country: z.string().optional(),
    bio: z.string().optional(),
    avatar: z.string().optional(),
    website: z.url().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { articles, statements, news, documents, authors, pages };
