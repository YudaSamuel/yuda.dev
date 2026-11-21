import type { Directive } from 'vue'

/**
 * v-reveal: fades/slides an element in when it scrolls into view.
 * SSR renders data-reveal; CSS only hides it under html.js, so content is
 * visible without JS. Value = delay in ms (for staggering).
 */
export default defineNuxtPlugin((nuxtApp) => {
  let observer: IntersectionObserver | undefined

  function getObserver() {
    if (!observer) {
      observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed')
            observer!.unobserve(entry.target)
          }
        }
      // threshold 0: tall blocks (long articles) must reveal as soon as their top edge enters.
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0 })
    }
    return observer
  }

  const reveal: Directive<HTMLElement, number | undefined> = {
    getSSRProps(binding) {
      return { 'data-reveal': '', style: binding.value ? `--reveal-delay:${binding.value}ms` : undefined }
    },
    mounted(el, binding) {
      el.setAttribute('data-reveal', '')
      if (binding.value) el.style.setProperty('--reveal-delay', `${binding.value}ms`)
      if (!('IntersectionObserver' in window)) {
        el.classList.add('is-revealed')
        return
      }
      getObserver().observe(el)
    },
    unmounted(el) {
      observer?.unobserve(el)
    },
  }

  nuxtApp.vueApp.directive('reveal', reveal)

  // Only now is it safe to let CSS hide [data-reveal] elements: the observer exists.
  if (import.meta.client) {
    nuxtApp.hook('app:mounted', () => document.documentElement.classList.add('js'))
  }
})
