import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { parse } from 'yaml'
import { describe, expect, it } from 'vitest'
import { MIN_WORDS, PILLAR_KEYWORDS, bodyOf, pillarLinks, wordCount } from '~~/content.quality'

describe('quality helpers', () => {
  it('counts link text but not link targets or markup', () => {
    expect(wordCount('## Başlık\n\n**Kalın** metin [web tasarım](/hizmetler/web-tasarim) burada.')).toBe(6)
  })
  it('ignores code fences', () => {
    expect(wordCount('bir iki\n```\nkod kod kod\n```\nüç')).toBe(3)
  })
  it('finds service and product links with or without trailing slash', () => {
    expect(pillarLinks('[a](/hizmetler/web-tasarim) [b](/urunler/lisans-sistemi/) [c](/blog/x)')).toEqual(['/hizmetler/web-tasarim', '/urunler/lisans-sistemi'])
  })
  it('strips frontmatter', () => {
    expect(bodyOf('---\ntitle: "x"\n---\n\nmetin')).toBe('\nmetin')
  })
})

const dir = join('content', 'blog')
const files = readdirSync(dir).filter((f) => f.endsWith('.md'))
const posts = files.map((f) => {
  const raw = readFileSync(join(dir, f), 'utf8')
  const fm = parse(raw.match(/^---\r?\n([\s\S]*?)\r?\n---/)![1])
  return { file: f, fm, body: bodyOf(raw) }
})
// Test fixtures (scheduled 2099 / draft) exist only for build tests; real posts follow every rule.
const real = posts.filter((p) => !p.file.startsWith('test-') && p.fm.draft !== true)
const services = new Set(readdirSync('content/hizmetler').map((f) => f.replace(/\.md$/, '')))
const products = new Set(readdirSync('content/urunler').map((f) => f.replace(/\.md$/, '')))

describe('blog editorial rules', () => {
  it('has real posts to check', () => {
    expect(real.length).toBeGreaterThanOrEqual(3)
  })

  it('uses ASCII lowercase-hyphen file names (they become URLs)', () => {
    for (const p of posts) expect(p.file, p.file).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*\.md$/)
  })

  it('gives every post a unique main keyword (no cannibalization)', () => {
    const seen = new Map<string, string>()
    for (const p of real) {
      const k = String(p.fm.keyword ?? '').trim().toLocaleLowerCase('tr-TR')
      expect(k.length, `${p.file}: keyword missing`).toBeGreaterThanOrEqual(3)
      expect(seen.get(k), `${p.file} and ${seen.get(k)} target "${k}"`).toBeUndefined()
      seen.set(k, p.file)
    }
  })

  it('never targets a service page keyword', () => {
    for (const p of real) {
      expect(PILLAR_KEYWORDS, p.file).not.toContain(String(p.fm.keyword).toLocaleLowerCase('tr-TR'))
    }
  })

  for (const p of real) {
    describe(p.file, () => {
      it(`has at least ${MIN_WORDS} words`, () => {
        expect(wordCount(p.body)).toBeGreaterThanOrEqual(MIN_WORDS)
      })
      it('relates to existing services/products only', () => {
        const rs: string[] = p.fm.relatedServices ?? []
        const rp: string[] = p.fm.relatedProducts ?? []
        expect(rs.length + rp.length, 'relatedServices/relatedProducts empty').toBeGreaterThan(0)
        for (const s of rs) expect(services.has(s), `unknown service ${s}`).toBe(true)
        for (const x of rp) expect(products.has(x), `unknown product ${x}`).toBe(true)
      })
      it('links its pillar page from the body', () => {
        const targets = [...(p.fm.relatedServices ?? []).map((s: string) => `/hizmetler/${s}`), ...(p.fm.relatedProducts ?? []).map((x: string) => `/urunler/${x}`)]
        expect(pillarLinks(p.body).some((l) => targets.includes(l)), `no link to ${targets.join(' or ')}`).toBe(true)
      })
      it('has its cover image file', () => {
        expect(existsSync(join('public', p.fm.cover)), p.fm.cover).toBe(true)
      })
    })
  }
})
