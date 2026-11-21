<script setup lang="ts">
const { yuda } = useAppConfig()
usePageSeo({
  title: 'Referanslar ve Güvenlik Bulguları',
  description: 'Philips ve chess.com bug bounty programlarında raporladığımız güvenlik açıkları ve tamamlanan projelerimiz.',
  ogImage: { title: 'Referanslar', subtitle: 'Bug bounty bulguları ve projeler' },
})
const proofs = [
  { target: 'philips.com', title: 'Philips Hall of Honors', text: 'Bazı alt alan adlarında bulunan güvenlik açıkları koordineli açıklama programı kapsamında raporlandı ve kabul edildi.', href: 'https://www.philips.com/a-w/security/coordinated-vulnerability-disclosure/hall-of-honors.html', cta: 'Hall of Honors listesi', icon: 'lucide:award' },
  { target: 'chess.com', title: 'Stored XSS ile hesap erişimi', text: 'Kalıcı (stored) XSS zafiyeti üzerinden hesaplara erişilebildiğini gösteren bulgu raporlandı.', href: 'https://www.youtube.com/watch?v=ikSVujJ8fp0', cta: 'Rapor videosu', icon: 'lucide:bug' },
]
</script>

<template>
  <div>
    <SitePageHero
      eyebrow="Referanslar"
      title="Güvenlik bulgularımız ve projelerimiz"
      subtitle="Uluslararası bug bounty programlarında bulduğumuz açıklar, güvenliği neden en baştan ele aldığımızı anlatıyor."
      :trail="[{ name: 'Ana Sayfa', path: '/' }, { name: 'Referanslar', path: '/referanslar' }]"
    />
    <UiContainer>
      <section class="py-16" aria-labelledby="bug-bounty">
        <h2 id="bug-bounty" class="text-3xl font-bold">Bug bounty referansları</h2>
        <ul class="mt-8 grid gap-6 md:grid-cols-2">
          <li v-for="(p, i) in proofs" :key="p.target" v-reveal="i * 80">
            <a :href="p.href" target="_blank" rel="noopener" class="card-lift group flex h-full flex-col rounded-2xl border border-border bg-card p-7">
              <div class="flex items-center justify-between">
                <span class="inline-flex size-12 items-center justify-center rounded-xl bg-brand-soft text-brand"><Icon :name="p.icon" class="size-6" aria-hidden="true" /></span>
                <span class="font-mono text-xs uppercase tracking-widest text-fg-muted">Hedef · {{ p.target }}</span>
              </div>
              <h3 class="mt-6 text-xl font-semibold">{{ p.title }}</h3>
              <p class="mt-2 flex-1 leading-relaxed text-fg-muted">{{ p.text }}</p>
              <span class="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-brand">{{ p.cta }} <Icon name="lucide:arrow-up-right" class="size-4" aria-hidden="true" /></span>
            </a>
          </li>
        </ul>
      </section>

      <section v-if="yuda.projects.length" id="projeler" class="border-t border-border py-16" aria-labelledby="projeler-baslik">
        <h2 id="projeler-baslik" class="text-3xl font-bold">Tamamlanan projeler</h2>
        <ul class="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <li v-for="pr in yuda.projects" :key="pr.title" class="rounded-2xl border border-border bg-card p-6">
            <h3 class="text-lg font-semibold">{{ pr.title }}</h3>
            <p class="mt-2 text-fg-muted">{{ pr.summary }}</p>
            <a v-if="pr.url" :href="pr.url" target="_blank" rel="noopener" class="mt-4 inline-flex text-sm font-medium text-brand">Siteyi gör</a>
          </li>
        </ul>
      </section>

      <div v-reveal class="mb-24 flex flex-col items-start justify-between gap-6 rounded-2xl border border-border bg-bg-subtle p-8 sm:flex-row sm:items-center">
        <div>
          <h2 class="text-2xl font-bold">Sisteminizi saldırgan gözüyle test edelim</h2>
          <p class="mt-2 text-fg-muted">Web sitesi, panel ve API'leriniz için sızma testi ve güvenlik denetimi.</p>
        </div>
        <UiButton to="/hizmetler/siber-guvenlik" size="lg">Siber güvenlik hizmeti</UiButton>
      </div>
    </UiContainer>
  </div>
</template>
