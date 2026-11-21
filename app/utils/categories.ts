export const BLOG_CATEGORIES = {
  'isletmeler-icin': { label: 'İşletmeler İçin', description: "Antalya'daki işletmeler için web sitesi, yazılım, yerel SEO ve güvenlik rehberleri." },
  'gelistiriciler-icin': { label: 'Geliştiriciler İçin', description: 'Script geliştiricileri ve yazılımcılar için lisanslama, güvenlik ve teknik rehberler.' },
} as const

export type BlogCategory = keyof typeof BLOG_CATEGORIES

export function categoryLabel(c: string): string {
  return BLOG_CATEGORIES[c as BlogCategory]?.label ?? c
}

export function formatDateTr(d: string): string {
  return new Date(`${d.slice(0, 10)}T12:00:00`).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })
}
