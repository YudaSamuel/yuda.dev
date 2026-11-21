<template>
  <section class="relative overflow-hidden">
    <div class="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60rem_30rem_at_80%_-10%,var(--brand-soft),transparent_70%)] opacity-70 dark:opacity-40" aria-hidden="true" />
    <UiContainer>
      <div class="grid items-center gap-12 py-20 sm:py-28 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <p class="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-sm text-fg-muted">
            <Icon name="lucide:map-pin" class="size-4 text-brand" aria-hidden="true" />
            Antalya merkezli yazılım ekibi
          </p>
          <h1 class="mt-6 text-4xl font-semibold leading-[1.1] sm:text-5xl lg:text-6xl">
            Antalya Yazılım ve <span class="text-brand">Web Tasarım</span>
          </h1>
          <p class="mt-6 max-w-xl text-lg leading-relaxed text-fg-muted">
            İşletmenize müşteri getiren web siteleri, iş yükünüzü azaltan özel yazılımlar ve
            güvenlik testinden geçmiş sistemler kuruyoruz. Muratpaşa'dan Konyaaltı'na, Antalya'nın her yerinden işletmelerle çalışıyoruz.
          </p>
          <div class="mt-8 flex flex-col gap-3 sm:flex-row">
            <UiButton to="/iletisim" size="lg">
              Ücretsiz Teklif Al
              <Icon name="lucide:arrow-right" class="size-5" aria-hidden="true" />
            </UiButton>
            <UiButton to="/hizmetler" size="lg" variant="secondary">Hizmetleri İncele</UiButton>
          </div>
        </div>

        <ul class="grid gap-3 text-sm" aria-label="Neden Yuda">
          <li class="flex items-start gap-3 rounded-2xl border border-border bg-card p-5">
            <Icon name="lucide:shield-check" class="mt-0.5 size-5 shrink-0 text-brand" aria-hidden="true" />
            <span><strong class="block text-base font-semibold text-fg">Güvenlik önce gelir</strong><span class="text-fg-muted">Philips ve chess.com'da açık bulmuş bir ekipten, güvenlik testinden geçmiş kod.</span></span>
          </li>
          <li class="flex items-start gap-3 rounded-2xl border border-border bg-card p-5">
            <Icon name="lucide:gauge" class="mt-0.5 size-5 shrink-0 text-brand" aria-hidden="true" />
            <span><strong class="block text-base font-semibold text-fg">Hızlı ve aramada görünür</strong><span class="text-fg-muted">Mobil öncelikli, hızlı açılan, yerel SEO altyapısı hazır siteler.</span></span>
          </li>
          <li class="flex items-start gap-3 rounded-2xl border border-border bg-card p-5">
            <Icon name="lucide:handshake" class="mt-0.5 size-5 shrink-0 text-brand" aria-hidden="true" />
            <span><strong class="block text-base font-semibold text-fg">Şeffaf süreç</strong><span class="text-fg-muted">Her aşamada çalışan bir sürüm görür, net teklif ve tarihle ilerlersiniz.</span></span>
          </li>
        </ul>
      </div>
    </UiContainer>
  </section>
</template>
