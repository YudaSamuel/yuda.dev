<script setup lang="ts">
const { data: services } = await useAsyncData('home-services', () =>
  queryCollection('services').select('path', 'navTitle', 'summary', 'icon', 'order').order('order', 'ASC').all())
</script>

<template>
  <section class="py-20" aria-labelledby="hizmetler-baslik">
    <UiContainer>
      <div class="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <div class="max-w-2xl">
          <p class="mb-3 text-sm font-semibold uppercase tracking-wider text-brand">Hizmetler</p>
          <h2 id="hizmetler-baslik" class="text-3xl font-semibold leading-tight sm:text-4xl">İşletmeniz için uçtan uca dijital çözümler</h2>
        </div>
        <UiButton to="/hizmetler" variant="ghost">Tüm hizmetler <Icon name="lucide:arrow-right" class="size-4" aria-hidden="true" /></UiButton>
      </div>
      <ul class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <li v-for="s in services" :key="s.path">
          <ServiceCard :service="s" />
        </li>
      </ul>
    </UiContainer>
  </section>
</template>
