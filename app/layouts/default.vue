<template>
  <div class="flex min-h-dvh flex-col">
    <a
      href="#icerik"
      class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-brand focus:px-4 focus:py-2 focus:text-brand-fg"
    >İçeriğe geç</a>
    <SiteHeader />
    <main id="icerik" class="flex-1">
      <slot />
    </main>
    <SiteFooter />
    <SiteWhatsAppButton />
  </div>
</template>
