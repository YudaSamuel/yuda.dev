<script setup lang="ts">
/**
 * Quote form. Works without JS (plain POST to Web3Forms, which redirects back to
 * /iletisim?gonderildi=1). With JS it submits via fetch and shows inline status.
 * If no access key is configured, an email fallback is rendered instead.
 */
const props = defineProps<{ service?: string; product?: string }>()
const { yuda } = useAppConfig()
const route = useRoute()

const { data: services } = await useAsyncData('quote-services', () =>
  queryCollection('services').select('navTitle', 'order').order('order', 'ASC').all())

const options = computed(() => [...(services.value ?? []).map((s) => s.navTitle), 'Hazır script', 'Diğer'])
const urun = computed(() => props.product || (typeof route.query.urun === 'string' ? route.query.urun : ''))
const selected = computed(() => props.service || (urun.value ? 'Hazır script' : ''))
const budgets = ['< 10.000 ₺', '10.000–30.000 ₺', '30.000–75.000 ₺', '75.000 ₺ +', 'Bilmiyorum']
const uid = useId()
const f = (name: string) => `${uid}-${name}`

const state = ref<'idle' | 'sending' | 'success' | 'error'>('idle')
const formEl = ref<HTMLFormElement>()

async function onSubmit(e: Event) {
  if (!formEl.value) return
  e.preventDefault()
  state.value = 'sending'
  try {
    const body = Object.fromEntries(new FormData(formEl.value).entries())
    delete (body as Record<string, unknown>).redirect
    const res = await fetch(yuda.form.endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(body),
    })
    const json = await res.json().catch(() => ({}))
    if (!res.ok || json.success === false) throw new Error('send failed')
    state.value = 'success'
    formEl.value.reset()
  }
  catch {
    state.value = 'error'
  }
}

const field = 'mt-2 block w-full rounded-xl border border-border bg-bg px-4 py-3 text-fg placeholder:text-fg-muted/70 focus:border-brand-bright focus:outline-none focus:ring-2 focus:ring-brand-bright/30'
const label = 'block text-sm font-medium text-fg'
</script>

<template>
  <div v-if="!yuda.form.accessKey" class="rounded-2xl border border-border bg-card p-6 sm:p-8">
    <p class="font-semibold text-fg">Teklif formu şu an kullanılamıyor.</p>
    <p class="mt-2 text-fg-muted">
      Projenizi kısaca anlatan bir e-posta gönderin, aynı gün içinde dönüş yapalım:
      <a :href="`mailto:${yuda.business.email}`" class="font-medium text-brand underline underline-offset-4">{{ yuda.business.email }}</a>
    </p>
  </div>

  <form
    v-else
    ref="formEl"
    method="POST"
    :action="yuda.form.endpoint"
    class="rounded-2xl border border-border bg-card p-6 sm:p-8"
    @submit="onSubmit"
  >
    <input type="hidden" name="access_key" :value="yuda.form.accessKey">
    <input type="hidden" name="subject" value="Yeni teklif talebi – yuda.dev">
    <input type="hidden" name="from_name" value="yuda.dev">
    <input type="hidden" name="redirect" value="https://yuda.dev/iletisim?gonderildi=1">
    <input type="checkbox" name="botcheck" class="hidden" tabindex="-1" autocomplete="off" aria-hidden="true">

    <div class="grid gap-5 sm:grid-cols-2">
      <div>
        <label :for="f('ad')" :class="label">Ad soyad *</label>
        <input :id="f('ad')" name="ad" type="text" required autocomplete="name" :class="field">
      </div>
      <div>
        <label :for="f('isletme')" :class="label">İşletme adı</label>
        <input :id="f('isletme')" name="isletme" type="text" autocomplete="organization" :class="field">
      </div>
      <div class="sm:col-span-2">
        <label :for="f('iletisim')" :class="label">Telefon veya e-posta *</label>
        <input :id="f('iletisim')" name="iletisim" type="text" required autocomplete="email" :class="field" aria-describedby="iletisim-yardim">
        <p id="iletisim-yardim" class="mt-1.5 text-xs text-fg-muted">Size nasıl dönüş yapalım?</p>
      </div>
      <div>
        <label :for="f('hizmet')" :class="label">İlgilendiğiniz hizmet</label>
        <select :id="f('hizmet')" name="hizmet" :class="field">
          <option value="">Seçin</option>
          <option v-for="o in options" :key="o" :value="o" :selected="o === selected">{{ o }}</option>
        </select>
      </div>
      <div>
        <label :for="f('butce')" :class="label">Tahmini bütçe</label>
        <select :id="f('butce')" name="butce" :class="field">
          <option value="">Seçin</option>
          <option v-for="b in budgets" :key="b" :value="b">{{ b }}</option>
        </select>
      </div>
      <div class="sm:col-span-2">
        <label :for="f('mesaj')" :class="label">Projenizi kısaca anlatın *</label>
        <textarea :id="f('mesaj')" name="mesaj" rows="5" required :class="field">{{ urun ? `Ürün: ${urun}\n` : '' }}</textarea>
      </div>
      <div class="sm:col-span-2 flex items-start gap-3">
        <input :id="f('kvkk')" name="kvkk" type="checkbox" value="onaylandi" required class="mt-1 size-4 shrink-0 accent-[var(--brand)]">
        <label :for="f('kvkk')" class="text-sm text-fg-muted">
          <NuxtLink to="/gizlilik" class="text-brand underline underline-offset-4">KVKK aydınlatma metnini</NuxtLink> okudum, bilgilerimin teklif için işlenmesini kabul ediyorum. *
        </label>
      </div>
    </div>

    <div class="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
      <button
        type="submit"
        :disabled="state === 'sending'"
        class="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3 font-medium text-brand-fg transition-colors hover:bg-brand-hover disabled:opacity-60"
      >
        <Icon v-if="state === 'sending'" name="lucide:loader-circle" class="size-5 animate-spin" aria-hidden="true" />
        {{ state === 'sending' ? 'Gönderiliyor…' : 'Teklif iste' }}
      </button>
      <p role="status" aria-live="polite" class="text-sm">
        <span v-if="state === 'success'" class="text-emerald-600 dark:text-emerald-400">Teşekkürler! Mesajınız ulaştı, en kısa sürede dönüş yapacağız.</span>
        <span v-else-if="state === 'error'" class="text-brand">Gönderilemedi. Lütfen tekrar deneyin veya {{ yuda.business.email }} adresine yazın.</span>
      </p>
    </div>
  </form>
</template>
