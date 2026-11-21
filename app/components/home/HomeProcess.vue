<script setup lang="ts">
import { processSteps } from '~/data/home'

const active = ref(0)
const hydrated = ref(false)
const stepEls = ref<HTMLElement[]>([])
let io: IntersectionObserver | undefined

onMounted(() => {
  hydrated.value = true
  io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) active.value = Number((e.target as HTMLElement).dataset.index)
    }
  }, { rootMargin: '-45% 0px -45% 0px' })
  stepEls.value.forEach((el) => io!.observe(el))
})
onBeforeUnmount(() => io?.disconnect())

const nodeState = (i: number) => (i === active.value ? 'is-active' : i < active.value ? 'is-done' : '')
const edgeState = (from: number) => (from < active.value ? 'is-done' : '')
const progress = computed(() => (active.value + 1) / processSteps.length)
</script>

<template>
  <section id="surec" class="relative border-y border-border bg-bg-subtle py-24 sm:py-32" aria-labelledby="surec-baslik">
    <UiContainer>
      <HomeSectionHead id="surec-baslik" eyebrow="Çalışma süreci" title="Fikirden canlı sisteme: nasıl teslim ediyoruz?" subtitle="Her adımın sonunda elinizde somut bir çıktı olur. Kaydırdıkça mimarinin nasıl kurulduğunu görün." />

      <div class="mt-16 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
        <!-- Sticky architecture diagram -->
        <div class="lg:sticky lg:top-28 lg:self-start">
          <div class="rounded-3xl border border-border bg-card p-5 sm:p-8" :class="hydrated ? '' : 'no-js-diagram'">
            <svg viewBox="0 0 420 470" class="h-auto w-full" role="img" aria-labelledby="diagram-baslik diagram-aciklama">
              <title id="diagram-baslik">Yazılım teslimat süreci diyagramı</title>
              <desc id="diagram-aciklama">Keşif, tasarım, arayüz-API-veritabanı geliştirme, güvenlik testi ve CDN üzerinden yayın adımlarından oluşan akış.</desc>
              <defs>
                <marker id="ok" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M0 0 10 5 0 10z" fill="var(--brand-bright)" />
                </marker>
              </defs>

              <!-- edges -->
              <g fill="none" stroke="var(--brand-bright)" stroke-width="2" stroke-dasharray="5 5">
                <path class="diagram-edge" :class="edgeState(0)" d="M210 74v32" marker-end="url(#ok)" />
                <path class="diagram-edge" :class="edgeState(1)" d="M210 170v22M210 192H72v22M210 192v22M210 192h138v22" marker-end="url(#ok)" />
                <path class="diagram-edge" :class="edgeState(2)" d="M72 278v24h138M348 278v24H210M210 278v46" marker-end="url(#ok)" />
                <path class="diagram-edge" :class="edgeState(3)" d="M210 388v22" marker-end="url(#ok)" />
              </g>

              <g font-family="Outfit, system-ui, sans-serif" font-size="15" font-weight="600" text-anchor="middle">
                <!-- 0 Keşif -->
                <g class="diagram-node" :class="nodeState(0)">
                  <rect x="120" y="14" width="180" height="60" rx="14" fill="var(--card)" stroke="var(--border)" stroke-width="1.5" />
                  <rect x="120" y="14" width="180" height="60" rx="14" fill="none" stroke="var(--brand-bright)" stroke-width="2" class="node-box" :opacity="active === 0 ? 1 : 0" />
                  <text x="210" y="40" fill="var(--fg)">Keşif ve analiz</text>
                  <text x="210" y="60" fill="var(--fg-muted)" font-size="11" font-weight="500" font-family="ui-monospace, monospace">kapsam.md</text>
                </g>
                <!-- 1 Tasarım -->
                <g class="diagram-node" :class="nodeState(1)">
                  <rect x="120" y="110" width="180" height="60" rx="14" fill="var(--card)" stroke="var(--border)" stroke-width="1.5" />
                  <rect x="120" y="110" width="180" height="60" rx="14" fill="none" stroke="var(--brand-bright)" stroke-width="2" :opacity="active === 1 ? 1 : 0" />
                  <text x="210" y="136" fill="var(--fg)">Tasarım ve prototip</text>
                  <text x="210" y="156" fill="var(--fg-muted)" font-size="11" font-weight="500" font-family="ui-monospace, monospace">figma → onay</text>
                </g>
                <!-- 2 Geliştirme: Arayüz / API / Veritabanı -->
                <g class="diagram-node" :class="nodeState(2)">
                  <g v-for="(n, k) in [{ x: 12, t: 'Arayüz', s: 'Nuxt / Vue' }, { x: 150, t: 'API', s: 'REST / Node' }, { x: 288, t: 'Veritabanı', s: 'SQL' }]" :key="n.t">
                    <rect :x="n.x" y="218" width="120" height="60" rx="14" fill="var(--card)" stroke="var(--border)" stroke-width="1.5" />
                    <rect :x="n.x" y="218" width="120" height="60" rx="14" fill="none" stroke="var(--brand-bright)" stroke-width="2" :opacity="active === 2 ? 1 : 0" :style="{ transitionDelay: `${k * 90}ms` }" />
                    <text :x="n.x + 60" y="244" fill="var(--fg)">{{ n.t }}</text>
                    <text :x="n.x + 60" y="264" fill="var(--fg-muted)" font-size="11" font-weight="500" font-family="ui-monospace, monospace">{{ n.s }}</text>
                  </g>
                </g>
                <!-- 3 Güvenlik -->
                <g class="diagram-node" :class="nodeState(3)">
                  <rect x="110" y="328" width="200" height="60" rx="14" fill="var(--brand-soft)" stroke="var(--border)" stroke-width="1.5" />
                  <rect x="110" y="328" width="200" height="60" rx="14" fill="none" stroke="var(--brand-bright)" stroke-width="2" :opacity="active === 3 ? 1 : 0" />
                  <text x="210" y="354" fill="var(--fg)">Güvenlik testi + QA</text>
                  <text x="210" y="374" fill="var(--brand)" font-size="11" font-weight="600" font-family="ui-monospace, monospace">0 kritik bulgu</text>
                </g>
                <!-- 4 Yayın -->
                <g class="diagram-node" :class="nodeState(4)">
                  <rect x="90" y="414" width="240" height="50" rx="25" fill="var(--fg)" />
                  <text x="210" y="444" fill="var(--bg)">Yayında · CDN + Google</text>
                </g>
              </g>
            </svg>
          </div>
        </div>

        <!-- Steps -->
        <div class="relative">
          <div class="absolute bottom-0 left-[1.15rem] top-0 hidden w-px bg-border sm:block" aria-hidden="true">
            <div class="h-full w-full origin-top bg-brand-bright transition-transform duration-500" :style="{ transform: `scaleY(${hydrated ? progress : 1})` }" />
          </div>
          <ol class="space-y-6 lg:space-y-0">
            <li
              v-for="(step, i) in processSteps"
              :key="step.key"
              :ref="(el) => { if (el) stepEls[i] = el as HTMLElement }"
              :data-index="i"
              data-step
              class="sm:pl-14 lg:flex lg:min-h-[38vh] lg:items-center"
            >
              <div
                class="relative w-full rounded-2xl border bg-card p-6 transition-[opacity,transform] duration-500 sm:p-7"
                :class="!hydrated || i === active ? 'border-brand-bright/50 opacity-100' : 'border-border lg:opacity-55'"
              >
                <span
                  class="absolute -left-14 top-6 hidden size-9 items-center justify-center rounded-full border font-mono text-sm font-semibold transition-colors duration-300 sm:inline-flex"
                  :class="i <= active || !hydrated ? 'border-brand-bright bg-brand-bright text-white' : 'border-border bg-card text-fg-muted'"
                  aria-hidden="true"
                >{{ i + 1 }}</span>
                <p class="font-mono text-xs uppercase tracking-widest text-brand">Adım {{ i + 1 }}</p>
                <h3 class="mt-2 text-xl font-semibold sm:text-2xl">{{ step.title }}</h3>
                <p class="mt-3 leading-relaxed text-fg-muted">{{ step.text }}</p>
                <p class="mt-4 inline-flex items-center gap-2 rounded-lg bg-bg-inset px-3 py-1.5 text-sm text-fg">
                  <Icon name="lucide:package-check" class="size-4 text-brand" aria-hidden="true" />{{ step.out }}
                </p>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </UiContainer>
  </section>
</template>
