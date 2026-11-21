import { describe, expect, it } from 'vitest'
import { paginate, readingTime, relatedPosts } from '~/utils/blog'

describe('readingTime', () => {
  it('rounds up at 200 words per minute', () => {
    expect(readingTime('kelime '.repeat(450))).toBe(3)
  })
  it('is at least one minute', () => {
    expect(readingTime('')).toBe(1)
  })
})

describe('relatedPosts', () => {
  const p = (path: string, category: string, tags: string[], date: string) => ({ path, category, tags, date })
  const current = p('/blog/a', 'x', ['web', 'seo'], '2026-01-01')
  const all = [
    current,
    p('/blog/b', 'x', ['web'], '2026-03-01'),
    p('/blog/c', 'x', ['web', 'seo'], '2026-02-01'),
    p('/blog/d', 'y', ['web', 'seo'], '2026-05-01'),
    p('/blog/e', 'x', [], '2026-04-01'),
    p('/blog/f', 'x', [], '2026-06-01'),
  ]
  it('excludes current and other categories', () => {
    const r = relatedPosts(current, all, 10).map((x) => x.path)
    expect(r).not.toContain('/blog/a')
    expect(r).not.toContain('/blog/d')
  })
  it('orders by shared tags then newest date', () => {
    expect(relatedPosts(current, all, 10).map((x) => x.path)).toEqual(['/blog/c', '/blog/b', '/blog/f', '/blog/e'])
  })
  it('returns at most n posts', () => {
    expect(relatedPosts(current, all, 2)).toHaveLength(2)
  })
})

describe('paginate', () => {
  const range = (n: number) => Array.from({ length: n }, (_, i) => i)
  it('slices the requested page', () => {
    const r = paginate(range(20), 3, 9)
    expect(r.items).toEqual([18, 19])
    expect(r.totalPages).toBe(3)
    expect(r.page).toBe(3)
  })
  it('has one page when empty', () => {
    expect(paginate([], 1).totalPages).toBe(1)
  })
  it('clamps out-of-range pages', () => {
    expect(paginate(range(20), 99, 9).page).toBe(3)
    expect(paginate(range(20), 0, 9).page).toBe(1)
  })
})
