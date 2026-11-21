import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { parse } from 'yaml'
import { describe, expect, it } from 'vitest'
import { schemas } from '~~/content.schemas'

const dirs = { services: 'hizmetler', products: 'urunler', blog: 'blog', legal: 'yasal' } as const

function frontmatter(file: string): unknown {
  const m = readFileSync(file, 'utf8').match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!m) throw new Error(`no frontmatter: ${file}`)
  return parse(m[1])
}

describe('content frontmatter matches collection schemas', () => {
  for (const [collection, dir] of Object.entries(dirs)) {
    const base = join('content', dir)
    for (const f of readdirSync(base).filter((n) => n.endsWith('.md'))) {
      it(`${dir}/${f}`, () => {
        const r = schemas[collection as keyof typeof schemas].safeParse(frontmatter(join(base, f)))
        expect(r.success, r.success ? '' : JSON.stringify(r.error.issues, null, 1)).toBe(true)
      })
    }
  }
})

describe('schemas reject bad content', () => {
  it('rejects a service without description', () => {
    expect(schemas.services.safeParse({ title: 'X', h1: 'X', navTitle: 'X', icon: 'x', order: 1, summary: 'x', faqs: [] }).success).toBe(false)
  })
  it('rejects an unquoted (Date) blog date', () => {
    const r = schemas.blog.shape.date.safeParse(new Date('2026-01-01'))
    expect(r.success).toBe(false)
  })
  it('rejects an image without alt', () => {
    expect(schemas.products.shape.images.safeParse([{ src: '/a.webp' }]).success).toBe(false)
  })
})
