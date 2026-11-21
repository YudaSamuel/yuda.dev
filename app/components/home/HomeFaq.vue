<script setup lang="ts">
import { homeFaqs } from '~/data/home'
</script>

<template>
  <section id="sss" class="py-24 sm:py-32" aria-labelledby="sss-baslik">
    <UiContainer>
      <div class="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <HomeSectionHead id="sss-baslik" eyebrow="SSS" title="Sıkça sorulan sorular" subtitle="Aradığınız cevap burada yoksa bize yazın; genellikle aynı gün dönüyoruz." />
          <UiButton v-reveal to="/iletisim" variant="secondary" class="mt-8">Soru sor</UiButton>
        </div>
        <div class="divide-y divide-border rounded-2xl border border-border bg-card">
          <details v-for="(f, i) in homeFaqs" :key="f.q" v-reveal="i * 60" class="group px-6 py-1">
            <summary class="flex list-none items-center justify-between gap-6 py-5 text-left font-medium text-fg [&::-webkit-details-marker]:hidden">
              <h3 class="text-base font-semibold">{{ f.q }}</h3>
              <span class="inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-border transition-transform duration-300 group-open:rotate-45" aria-hidden="true">
                <Icon name="lucide:plus" class="size-4" />
              </span>
            </summary>
            <p class="pb-6 pr-12 leading-relaxed text-fg-muted">{{ f.a }}</p>
          </details>
        </div>
      </div>
    </UiContainer>
  </section>
</template>
