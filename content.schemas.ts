import { z } from 'zod'

// Shared by content.config.ts and tests/unit/content.test.ts.
// @nuxt/content v3 does not fail the build on schema violations, so the unit
// test is what actually enforces these rules.
const isoDay = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Tarih "YYYY-MM-DD" biçiminde ve tırnak içinde olmalı')
const faq = z.object({ q: z.string().min(1), a: z.string().min(1) })
const image = z.object({ src: z.string().min(1), alt: z.string().min(3) })
// Raw title; the " | Yuda" template suffix (7 chars) keeps the rendered title ≤ 60.
const title = z.string().min(1).max(53)
const description = z.string().min(50).max(155)

export const schemas = {
  services: z.object({
    title,
    description,
    h1: z.string().min(1),
    navTitle: z.string().min(1),
    icon: z.string().min(1),
    order: z.number(),
    summary: z.string().min(1),
    priceNote: z.string().optional(),
    faqs: z.array(faq).min(3),
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
  }),
  products: z.object({
    name: z.string().min(1),
    title,
    description,
    summary: z.string().min(1),
    price: z.number().positive(),
    currency: z.literal('USD'),
    status: z.enum(['in_stock', 'out_of_stock']),
    checkoutUrl: z.union([z.url(), z.literal('')]),
    images: z.array(image).min(1),
    features: z.array(z.string()).min(1),
    requirements: z.array(z.string()).default([]),
    demoUrl: z.url().optional(),
    faqs: z.array(faq).default([]),
    order: z.number(),
  }),
  blog: z.object({
    title,
    description,
    date: isoDay,
    updated: isoDay.optional(),
    // Main search query this post targets; unique across posts (tests/unit/blog-quality.test.ts).
    keyword: z.string().min(3),
    category: z.enum(['isletmeler-icin', 'gelistiriciler-icin']),
    tags: z.array(z.string()).default([]),
    cover: z.string().min(1),
    coverAlt: z.string().min(3),
    author: z.string().min(1),
    relatedServices: z.array(z.string()).default([]),
    relatedProducts: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    // Filled by @nuxt/content with the raw markdown (used for reading time).
    rawbody: z.string().optional(),
  }),
  legal: z.object({
    title,
    description,
    updated: isoDay,
  }),
}
