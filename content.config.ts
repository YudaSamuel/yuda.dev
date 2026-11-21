import { defineCollection, defineContentConfig } from '@nuxt/content'
import { schemas } from './content.schemas'

export default defineContentConfig({
  collections: {
    services: defineCollection({ type: 'page', source: 'hizmetler/*.md', schema: schemas.services }),
    products: defineCollection({ type: 'page', source: 'urunler/*.md', schema: schemas.products }),
    blog: defineCollection({ type: 'page', source: 'blog/*.md', schema: schemas.blog }),
    legal: defineCollection({ type: 'page', source: 'yasal/*.md', schema: schemas.legal }),
  },
})
