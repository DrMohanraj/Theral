import { defineCollection, z } from 'astro:content';

const interviews = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    authorName: z.string(),
    authorRole: z.string().nullish(),
    authorPhoto: z.string().nullish(),
    coverImage: z.string().nullish(),
    interviewerName: z.string().nullish(),
    category: z.string().default('இலக்கியம்'),
    issueNumber: z.string().nullish(),
    tags: z.array(z.string()).nullish(),
    date: z.coerce.date(),
    excerpt: z.string().nullish(),
    featured: z.boolean().default(false),
    qa: z
      .array(z.object({ question: z.string(), answer: z.string() }))
      .nullish()
      .transform((v) => v ?? []),
    pullQuotes: z
      .array(z.string())
      .nullish()
      .transform((v) => v ?? []),
  }),
});

export const collections = { interviews };
