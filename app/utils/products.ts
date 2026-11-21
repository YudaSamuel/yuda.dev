export type ProductCta = { kind: 'buy'; href: string } | { kind: 'contact'; href: string }

export function productCta(p: { slug: string; status: 'in_stock' | 'out_of_stock'; checkoutUrl: string }): ProductCta {
  if (p.status === 'in_stock' && p.checkoutUrl) return { kind: 'buy', href: p.checkoutUrl }
  return { kind: 'contact', href: `/iletisim?urun=${p.slug}` }
}
