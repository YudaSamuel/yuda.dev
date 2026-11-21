import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { parse, type HTMLElement } from 'node-html-parser'

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
