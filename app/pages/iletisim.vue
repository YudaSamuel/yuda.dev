<script setup lang="ts">
const { yuda } = useAppConfig()
const route = useRoute()
const sent = ref(false)
onMounted(() => { sent.value = route.query.gonderildi === '1' })

usePageSeo({
  title: 'İletişim ve Ücretsiz Teklif',
  description: "Antalya'da web sitesi, yazılım veya güvenlik testi için ücretsiz teklif alın. Formu doldurun ya da e-posta ile bize ulaşın.",
  ogImage: { title: 'Ücretsiz teklif alın', subtitle: 'Antalya · aynı gün dönüş' },
})
useSchemaOrg([defineWebPage({ '@type': 'ContactPage' }), businessSchema(yuda.business)])

const tel = computed(() => yuda.business.phone.replace(/[^\d+]/g, ''))
const wa = computed(() => {
  const d = yuda.business.whatsapp.replace(/\D/g, '')
  return d ? `https://wa.me/${d}` : ''
})
</script>

<template>
  <div>
    <SitePageHero
      eyebrow="İletişim"
      title="Projenizi konuşalım"
      subtitle="Formu doldurun; ücretsiz keşif görüşmesi için size dönelim ve yazılı, net bir teklif hazırlayalım."
      :trail="[{ name: 'Ana Sayfa', path: '/' }, { name: 'İletişim', path: '/iletisim' }]"
    />
    <UiContainer>
      <div class="grid gap-12 py-16 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div>
          <div v-if="sent" role="status" class="mb-6 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-5 text-fg">
            Teşekkürler! Mesajınız ulaştı, en kısa sürede dönüş yapacağız.
          </div>
          <h2 class="sr-only">Teklif formu</h2>
          <ServiceQuoteForm />
        </div>
        <aside class="space-y-4">
          <div class="rounded-2xl border border-border bg-card p-6">
            <h2 class="font-semibold">Doğrudan ulaşın</h2>
            <ul class="mt-4 space-y-3">
              <li>
                <a :href="`mailto:${yuda.business.email}`" class="flex items-center gap-3 text-fg hover:text-brand">
                  <Icon name="lucide:mail" class="size-5 text-brand" aria-hidden="true" />{{ yuda.business.email }}
                </a>
              </li>
              <li v-if="tel">
                <a :href="`tel:${tel}`" class="flex items-center gap-3 text-fg hover:text-brand">
                  <Icon name="lucide:phone" class="size-5 text-brand" aria-hidden="true" />{{ yuda.business.phone }}
                </a>
              </li>
              <li v-if="wa">
                <a :href="wa" target="_blank" rel="noopener" class="flex items-center gap-3 text-fg hover:text-brand">
                  <Icon name="lucide:message-circle" class="size-5 text-brand" aria-hidden="true" />WhatsApp
                </a>
              </li>
            </ul>
          </div>
          <div class="rounded-2xl border border-border bg-bg-subtle p-6">
            <h2 class="font-semibold">Hizmet bölgesi</h2>
            <ul class="mt-4 flex flex-wrap gap-2">
              <li v-for="a in yuda.business.areaServed" :key="a" class="rounded-full border border-border bg-card px-3 py-1 text-sm text-fg-muted">{{ a }}</li>
            </ul>
            <p class="mt-4 text-sm text-fg-muted">Bu bölgelerde yüz yüze görüşebiliyoruz; diğer şehirlerdeki projeleri online yürütüyoruz.</p>
          </div>
          <div class="rounded-2xl border border-border bg-card p-6">
            <h2 class="font-semibold">Ne zaman dönüş yaparız?</h2>
            <p class="mt-2 text-sm text-fg-muted">Hafta içi gelen taleplere genellikle aynı gün dönüş yapıyoruz.</p>
          </div>
        </aside>
      </div>
    </UiContainer>
  </div>
</template>
