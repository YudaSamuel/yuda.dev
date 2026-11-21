export function readingTime(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / 200))
}

export function relatedPosts<T extends { path: string; category: string; tags: string[]; date: string }>(
  current: T,
  all: T[],
  n = 3,
): T[] {
  const tags = new Set(current.tags)
  const shared = (p: T) => p.tags.filter((t) => tags.has(t)).length
  return all
    .filter((p) => p.path !== current.path && p.category === current.category)
    .sort((a, b) => shared(b) - shared(a) || b.date.localeCompare(a.date))
    .slice(0, n)
}

export function paginate<T>(items: T[], page: number, size = 9): { items: T[]; totalPages: number; page: number } {
  const totalPages = Math.max(1, Math.ceil(items.length / size))
  const current = Math.min(Math.max(1, Math.floor(page) || 1), totalPages)
  return { items: items.slice((current - 1) * size, current * size), totalPages, page: current }
}
