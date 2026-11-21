<script setup lang="ts">
// Static landing page for the no-JS form path (Web3Forms redirects here after POST).
usePageSeo({
  title: 'Teşekkürler, mesajınız ulaştı',
  description: 'Teklif talebiniz bize ulaştı. Genellikle aynı gün içinde dönüş yapıyoruz. Bu arada hizmetlerimize ve blog yazılarımıza göz atabilirsiniz.',
})
useSeoMeta({ robots: 'noindex, follow' })
</script>

<template>
  <section class="relative isolate overflow-hidden">
    <div class="bg-grid absolute inset-0 -z-10" aria-hidden="true" />
    <UiContainer>
      <div class="mx-auto max-w-2xl py-24 text-center sm:py-32">
        <span class="inline-flex size-16 items-center justify-center rounded-full bg-brand-soft text-brand">
          <Icon name="lucide:check" class="size-8" aria-hidden="true" />
        </span>
        <h1 class="mt-8 text-4xl font-bold sm:text-5xl">Teşekkürler!</h1>
        <p class="mt-5 text-lg text-fg-muted">Mesajınız bize ulaştı. Genellikle aynı gün içinde dönüş yapıyoruz.</p>
        <div class="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <UiButton to="/" size="lg">Ana sayfaya dön</UiButton>
          <UiButton to="/blog" size="lg" variant="secondary">Blog yazılarını oku</UiButton>
        </div>
      </div>
    </UiContainer>
  </section>
</template>
