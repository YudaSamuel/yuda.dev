<script setup lang="ts">
const { data: services } = await useAsyncData('home-services', () =>
  queryCollection('services').select('path', 'navTitle', 'summary', 'icon', 'order').order('order', 'ASC').all())
</script>

<template>
  <section id="hizmetler" class="py-24 sm:py-32" aria-labelledby="hizmetler-baslik">
    <UiContainer>
      <div class="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <HomeSectionHead id="hizmetler-baslik" eyebrow="Hizmetler" title="İşletmeniz için uçtan uca dijital çözümler" subtitle="Tasarımdan güvenlik testine kadar tek ekip. Antalya'daki işletmelerin ihtiyacına göre kurgulanır." />
        <UiButton v-reveal to="/hizmetler" variant="secondary">Tüm hizmetler</UiButton>
      </div>
      <ul class="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
        <li
          v-for="(s, i) in services" :key="s.path" v-reveal="i * 80"
          :class="i < 2 ? 'lg:col-span-3' : 'lg:col-span-2'"
        >
          <ServiceCard :service="s" :featured="i < 2" />
        </li>
      </ul>
    </UiContainer>
  </section>
</template>
