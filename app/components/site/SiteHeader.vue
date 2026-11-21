<script setup lang="ts">
const nav = [
  { to: '/hizmetler', label: 'Hizmetler' },
  { to: '/referanslar', label: 'Referanslar' },
  { to: '/blog', label: 'Blog' },
  { to: '/hakkimizda', label: 'Hakkımızda' },
  { to: '/iletisim', label: 'İletişim' },
]
const mobileNav = [...nav, { to: '/urunler', label: 'Hazır Scriptler' }]
const menu = ref<HTMLDetailsElement>()
const route = useRoute()
watch(() => route.path, () => {
  if (menu.value) menu.value.open = false
})
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-border bg-bg/85 backdrop-blur supports-[backdrop-filter]:bg-bg/70">
    <UiContainer>
      <div class="flex h-16 items-center justify-between gap-4">
        <NuxtLink to="/" class="flex items-center text-fg" aria-label="Yuda ana sayfa">
          <SiteLogo />
        </NuxtLink>

        <nav aria-label="Ana menü" class="hidden items-center gap-1 lg:flex">
          <NuxtLink
            v-for="item in nav" :key="item.to" :to="item.to"
            class="rounded-lg px-3 py-2 text-sm text-fg-muted transition-colors hover:text-fg"
            active-class="!text-fg font-medium"
          >
            {{ item.label }}
          </NuxtLink>
          <span class="mx-2 h-5 w-px bg-border" aria-hidden="true" />
          <NuxtLink to="/urunler" class="rounded-lg px-3 py-2 text-sm text-fg-muted transition-colors hover:text-fg" active-class="!text-fg font-medium">
            Ürünler
          </NuxtLink>
        </nav>

        <div class="flex items-center gap-1">
          <SiteThemeToggle />
          <UiButton to="/iletisim" class="hidden sm:inline-flex">Teklif Al</UiButton>
          <details ref="menu" class="group lg:hidden">
            <summary class="flex size-11 list-none items-center justify-center rounded-xl text-fg hover:bg-bg-subtle [&::-webkit-details-marker]:hidden" aria-label="Menü">
              <Icon name="lucide:menu" class="size-5 group-open:hidden" aria-hidden="true" />
              <Icon name="lucide:x" class="hidden size-5 group-open:block" aria-hidden="true" />
            </summary>
            <nav aria-label="Mobil menü" class="absolute inset-x-0 top-16 border-b border-border bg-bg px-4 pb-6 pt-2 shadow-lg">
              <NuxtLink v-for="item in mobileNav" :key="item.to" :to="item.to" class="block rounded-lg px-3 py-3 text-base text-fg hover:bg-bg-subtle">
                {{ item.label }}
              </NuxtLink>
              <UiButton to="/iletisim" size="lg" class="mt-3 w-full">Teklif Al</UiButton>
            </nav>
          </details>
        </div>
      </div>
    </UiContainer>
  </header>
</template>
