<script setup lang="ts">
const lines = [
  { t: '$ yuda deploy ornek-isletme.com', c: 'text-fg' },
  { t: '✓ Tasarım onaylandı', c: 'text-emerald-500' },
  { t: '✓ Mobil hız ve SEO kontrolü geçti', c: 'text-emerald-500' },
  { t: '✓ Güvenlik testi: kritik bulgu yok', c: 'text-emerald-500' },
  { t: '✓ Google İşletme Profili bağlandı', c: 'text-emerald-500' },
  { t: '→ Yayında. İlk teklif talebi bekleniyor', c: 'text-brand' },
]
</script>

<template>
  <section id="hero" class="relative isolate overflow-hidden border-b border-border" aria-labelledby="hero-baslik">
    <div class="bg-grid absolute inset-0 -z-10" aria-hidden="true" />
    <div class="bg-glow absolute inset-0 -z-10" aria-hidden="true" />
    <UiContainer>
      <div class="grid items-center gap-14 pb-20 pt-16 sm:pt-24 lg:grid-cols-[1.15fr_1fr] lg:pb-28">
        <div>
          <p class="inline-flex items-center gap-2.5 rounded-full border border-border bg-card/80 px-3.5 py-1.5 text-sm text-fg-muted backdrop-blur">
            <span class="relative flex size-2">
              <span class="pulse-dot absolute inline-flex size-full rounded-full bg-brand-bright" />
              <span class="relative inline-flex size-2 rounded-full bg-brand-bright" />
            </span>
            Antalya merkezli yazılım ekibi · yeni projelere açık
          </p>

          <h1 id="hero-baslik" class="mt-7 text-[2.6rem] font-bold leading-[1.05] sm:text-6xl lg:text-7xl">
            Antalya Yazılım ve
            <span class="relative whitespace-nowrap text-brand">
              Web Tasarım
              <svg class="absolute -bottom-2 left-0 h-3 w-full text-brand-bright/60" viewBox="0 0 300 12" preserveAspectRatio="none" aria-hidden="true"><path d="M2 9c60-6 160-8 296-4" stroke="currentColor" stroke-width="4" fill="none" stroke-linecap="round" /></svg>
            </span>
          </h1>

          <p class="mt-7 max-w-xl text-lg leading-relaxed text-fg-muted sm:text-xl">
            İşletmenize <strong class="font-semibold text-fg">müşteri getiren</strong> web siteleri,
            iş yükünüzü azaltan özel yazılımlar ve <strong class="font-semibold text-fg">güvenliği test edilmiş</strong> sistemler kuruyoruz.
          </p>

          <div class="mt-9 flex flex-col gap-3 sm:flex-row">
            <UiButton to="/iletisim" size="lg">
              Ücretsiz Teklif Al
              <Icon name="lucide:arrow-right" class="size-5" aria-hidden="true" />
            </UiButton>
            <UiButton to="/hizmetler" size="lg" variant="secondary">Hizmetleri İncele</UiButton>
          </div>

          <ul class="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-fg-muted">
            <li class="flex items-center gap-2"><Icon name="lucide:shield-check" class="size-4 text-brand" aria-hidden="true" />Philips Hall of Honors</li>
            <li class="flex items-center gap-2"><Icon name="lucide:bug" class="size-4 text-brand" aria-hidden="true" />chess.com güvenlik bulgusu</li>
            <li class="flex items-center gap-2"><Icon name="lucide:messages-square" class="size-4 text-brand" aria-hidden="true" />Ücretsiz keşif görüşmesi</li>
          </ul>
        </div>

        <!-- Decorative delivery terminal (aria-hidden; same info is in the process section) -->
        <div class="relative" aria-hidden="true">
          <div class="absolute -inset-6 -z-10 rounded-[2rem] bg-brand-bright/10 blur-3xl" />
          <div class="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-black/5 dark:shadow-black/40">
            <div class="flex items-center gap-2 border-b border-border bg-bg-inset px-4 py-3">
              <span class="size-3 rounded-full bg-[#ff5f57]" /><span class="size-3 rounded-full bg-[#febc2e]" /><span class="size-3 rounded-full bg-[#28c840]" />
              <span class="ml-3 font-mono text-xs text-fg-muted">yuda — teslimat</span>
            </div>
            <div class="space-y-2.5 p-5 font-mono text-[13px] leading-relaxed sm:p-6 sm:text-sm">
              <p v-for="(l, i) in lines" :key="i" class="term-line" :class="l.c" :style="{ '--d': `${300 + i * 380}ms` }">{{ l.t }}</p>
              <p class="term-line text-fg" :style="{ '--d': `${300 + lines.length * 380}ms` }">$ <span class="caret inline-block h-4 w-2 translate-y-0.5 bg-brand-bright" /></p>
            </div>
            <div class="grid grid-cols-3 divide-x divide-border border-t border-border text-center">
              <div class="px-3 py-4"><p class="font-display text-xl font-semibold text-fg">2–4 hf</p><p class="text-xs text-fg-muted">kurumsal site</p></div>
              <div class="px-3 py-4"><p class="font-display text-xl font-semibold text-fg">Mobil</p><p class="text-xs text-fg-muted">öncelikli tasarım</p></div>
              <div class="px-3 py-4"><p class="font-display text-xl font-semibold text-fg">SEO</p><p class="text-xs text-fg-muted">altyapı hazır</p></div>
            </div>
          </div>
        </div>
      </div>
    </UiContainer>
  </section>
</template>
