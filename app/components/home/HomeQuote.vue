<script setup lang="ts">
const { yuda } = useAppConfig()
const wa = computed(() => {
  const d = yuda.business.whatsapp.replace(/\D/g, '')
  return d ? `https://wa.me/${d}` : ''
})
</script>

<template>
  <section id="teklif" class="pb-24 sm:pb-32" aria-labelledby="teklif-baslik">
    <UiContainer>
      <div v-reveal class="relative isolate overflow-hidden rounded-[2rem] border border-border bg-card px-6 py-14 sm:px-14 sm:py-16">
        <div class="bg-grid absolute inset-0 -z-10" aria-hidden="true" />
        <div class="absolute -right-24 -top-24 -z-10 size-80 rounded-full bg-brand-bright/15 blur-3xl" aria-hidden="true" />
        <div class="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <div>
            <p class="mb-4 inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.18em] text-brand">
              <span class="text-brand-bright" aria-hidden="true">&lt;/&gt;</span>Teklif ve iletişim
            </p>
            <h2 id="teklif-baslik" class="text-3xl font-bold leading-tight sm:text-5xl">Projenizi konuşalım</h2>
            <p class="mt-5 max-w-xl text-lg leading-relaxed text-fg-muted">
              Ücretsiz keşif görüşmesinde ihtiyacınızı dinliyor, size yazılı ve net bir teklif hazırlıyoruz.
            </p>
            <p class="mt-6 text-sm text-fg-muted">
              <span class="font-medium text-fg">Hizmet bölgesi:</span>
              {{ yuda.business.areaServed.join(' · ') }}
            </p>
          </div>
          <div class="flex flex-col gap-3">
            <UiButton to="/iletisim" size="lg">
              Teklif formunu doldur
              <Icon name="lucide:arrow-right" class="size-5" aria-hidden="true" />
            </UiButton>
            <UiButton v-if="wa" :to="wa" size="lg" variant="secondary">
              <Icon name="lucide:message-circle" class="size-5" aria-hidden="true" />WhatsApp'tan yaz
            </UiButton>
            <a :href="`mailto:${yuda.business.email}`" class="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 text-fg-muted transition-colors hover:text-fg">
              <Icon name="lucide:mail" class="size-5" aria-hidden="true" />{{ yuda.business.email }}
            </a>
          </div>
        </div>
      </div>
    </UiContainer>
  </section>
</template>
