<script setup lang="ts">
import { sectors } from '~/data/home'
</script>

<template>
  <section id="cozumler" class="py-24 sm:py-32" aria-labelledby="cozumler-baslik">
    <UiContainer>
      <HomeSectionHead id="cozumler-baslik" eyebrow="Antalya'daki işletmeler için" title="Sektörünüzün sorununa göre çözüm" subtitle="Turizmden sağlığa, Antalya ekonomisinin farklı alanlarında en sık karşılaştığımız sorunlar ve kurduğumuz çözümler." />
      <ul class="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <li v-for="(s, i) in sectors" :key="s.title" v-reveal="(i % 3) * 90">
          <NuxtLink :to="s.to" class="card-lift group flex h-full flex-col rounded-2xl border border-border bg-card p-6">
            <div class="flex items-center gap-3">
              <span class="inline-flex size-10 items-center justify-center rounded-lg bg-bg-inset text-fg transition-colors duration-300 group-hover:bg-brand-soft group-hover:text-brand">
                <Icon :name="s.icon" class="size-5" aria-hidden="true" />
              </span>
              <h3 class="text-lg font-semibold">{{ s.title }}</h3>
            </div>
            <dl class="mt-5 space-y-3 text-sm leading-relaxed">
              <div>
                <dt class="font-mono text-xs uppercase tracking-wider text-fg-muted">Sorun</dt>
                <dd class="mt-1 text-fg-muted">{{ s.problem }}</dd>
              </div>
              <div>
                <dt class="font-mono text-xs uppercase tracking-wider text-brand">Çözüm</dt>
                <dd class="mt-1 text-fg">{{ s.solution }}</dd>
              </div>
            </dl>
          </NuxtLink>
        </li>
      </ul>
    </UiContainer>
  </section>
</template>
