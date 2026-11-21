<script setup lang="ts">
const dark = ref(false)
onMounted(() => { dark.value = document.documentElement.classList.contains('dark') })
function toggle() {
  dark.value = !dark.value
  document.documentElement.classList.toggle('dark', dark.value)
  try { localStorage.setItem('theme', dark.value ? 'dark' : 'light') }
  catch {}
}
</script>

<template>
  <button
    type="button"
    class="inline-flex size-11 items-center justify-center rounded-xl text-fg-muted hover:bg-bg-subtle hover:text-fg transition-colors"
    :aria-label="dark ? 'Açık temaya geç' : 'Koyu temaya geç'"
    @click="toggle"
  >
    <Icon name="lucide:moon" class="size-5 dark:hidden" aria-hidden="true" />
    <Icon name="lucide:sun" class="hidden size-5 dark:block" aria-hidden="true" />
  </button>
</template>
