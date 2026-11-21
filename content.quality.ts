// Editorial quality rules for blog posts (see docs/seo/SEO-STRATEGY.md §2).
// Enforced by tests/unit/blog-quality.test.ts, which runs in CI before every deploy.

/** Minimum words of body text. Turkish is agglutinative: 600 TR ≈ 750 EN words. */
export const MIN_WORDS = 600

/** Keywords owned by the service (pillar) pages. Blog posts must not target them. */
export const PILLAR_KEYWORDS = [
  'antalya web tasarım',
  'antalya yazılım',
  'antalya özel yazılım',
  'antalya yazılım geliştirme',
  'antalya mobil uygulama',
  'antalya e-ticaret sitesi',
  'antalya sızma testi',
  'antalya siber güvenlik',
]

/** Markdown body without frontmatter. */
export function bodyOf(markdown: string): string {
  return markdown.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '')
}

/** Counts words of readable text: link targets, markup and code fences are ignored. */
export function wordCount(body: string): number {
  const text = body
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[#>*_`|]/g, ' ')
  return text.split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length
}

/** Internal links to service or product pages found in the body, e.g. "/hizmetler/web-tasarim". */
export function pillarLinks(body: string): string[] {
  return [...body.matchAll(/\]\((\/(?:hizmetler|urunler)\/[a-z0-9-]+)\/?\)/g)].map((m) => m[1])
}
