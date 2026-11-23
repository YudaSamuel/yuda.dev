import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { parse, type HTMLElement } from 'node-html-parser'
import { parse as parseYaml } from 'yaml'
import { isPublished } from '../../app/utils/publishing'

export const OUT = join(process.cwd(), '.output', 'public')

export function readFile(rel: string): string {
  return readFileSync(join(OUT, rel), 'utf8')
}

export function fileExists(rel: string): boolean {
  return existsSync(join(OUT, rel))
}

export function routeToFile(route: string): string {
  const clean = route.replace(/^\/+|\/+$/g, '')
  return clean === '' ? 'index.html' : `${clean}/index.html`
}

export function readPage(route: string): HTMLElement {
  return parse(readFile(routeToFile(route)), { comment: false })
}

/** Parses every JSON-LD block and flattens @graph arrays into one list of nodes. */
export function jsonLd(page: HTMLElement): any[] {
  const nodes: any[] = []
  for (const el of page.querySelectorAll('script[type="application/ld+json"]')) {
    const data = JSON.parse(el.textContent)
    const list = Array.isArray(data) ? data : [data]
    for (const item of list) {
      if (Array.isArray(item['@graph'])) nodes.push(...item['@graph'])
      else nodes.push(item)
    }
  }
  return nodes
}

export function nodesOfType(page: HTMLElement, type: string): any[] {
  return jsonLd(page).filter((n) => {
    const t = n['@type']
    return Array.isArray(t) ? t.includes(type) : t === type
  })
}

/**
 * Blog posts that should be live today, newest first, computed from content/
 * (not hard-coded), so publishing a new post never breaks a test.
 */
export interface LivePost { slug: string; date: string; category: string; relatedServices: string[] }

export function livePosts(now?: Date): LivePost[] {
  const dir = join(process.cwd(), 'content', 'blog')
  return readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const fm = parseYaml(readFileSync(join(dir, f), 'utf8').match(/^---\r?\n([\s\S]*?)\r?\n---/)![1])
      return {
        slug: f.replace(/\.md$/, ''),
        date: String(fm.date),
        draft: fm.draft === true,
        category: String(fm.category),
        relatedServices: (fm.relatedServices ?? []) as string[],
      }
    })
    .filter((p) => isPublished(p, now))
    .sort((a, b) => b.date.localeCompare(a.date))
    .map(({ slug, date, category, relatedServices }) => ({ slug, date, category, relatedServices }))
}

/** Hrefs of /blog/<slug>/ links inside an element, in document order, de-duplicated. */
export function postLinks(el: HTMLElement): string[] {
  const hrefs = el.querySelectorAll('a[href^="/blog/"]')
    .map((a) => a.getAttribute('href')!)
    .filter((h) => /^\/blog\/[a-z0-9-]+\/$/.test(h) && !h.startsWith('/blog/kategori') && !h.startsWith('/blog/sayfa'))
  return [...new Set(hrefs)]
}

/** All generated index.html files as routes, e.g. '/', '/hizmetler'. */
export function listRoutes(dir = OUT, base = ''): string[] {
  const routes: string[] = []
  for (const name of readdirSync(dir)) {
    const full = join(dir, name)
    if (statSync(full).isDirectory()) {
      if (name.startsWith('_') || name === 'img' || name === 'images') continue
      routes.push(...listRoutes(full, `${base}/${name}`))
    } else if (name === 'index.html') {
      routes.push(base === '' ? '/' : base)
    }
  }
  return routes
}
