<script setup lang="ts">
const bar = ref<HTMLElement>()
let frame = 0

function update() {
  frame = 0
  const max = document.documentElement.scrollHeight - window.innerHeight
  const p = max > 0 ? Math.min(1, window.scrollY / max) : 0
  if (bar.value) bar.value.style.transform = `scaleX(${p})`
}
function onScroll() {
  if (!frame) frame = requestAnimationFrame(update)
}

onMounted(() => {
  update()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
  if (frame) cancelAnimationFrame(frame)
})
</script>

<template>
  <div class="pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5" aria-hidden="true" data-scroll-progress>
    <div ref="bar" class="h-full origin-left bg-brand-bright will-change-transform" style="transform: scaleX(0)" />
  </div>
</template>
