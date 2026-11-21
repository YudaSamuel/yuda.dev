<script setup lang="ts">
const { yuda } = useAppConfig()
const route = useRoute()
const href = computed(() => {
  const digits = yuda.business.whatsapp.replace(/\D/g, '')
  return digits ? `https://wa.me/${digits}` : ''
})
const visible = computed(() => !!href.value && route.meta.whatsapp !== false)
</script>

<template>
  <a
    v-if="visible"
    :href="href"
    target="_blank"
    rel="noopener"
    class="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 font-medium text-[#05301a] shadow-lg transition-transform hover:-translate-y-0.5"
  >
    <Icon name="lucide:message-circle" class="size-5" aria-hidden="true" />
    <span>WhatsApp</span>
  </a>
</template>
