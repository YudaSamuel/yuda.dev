<script setup lang="ts">
const { yuda } = useAppConfig()
usePageSeo({
  title: 'Hakkımızda',
  description: 'Yuda, Antalya merkezli bir yazılım ve güvenlik ekibi. Web, özel yazılım ve sızma testi hizmetlerini tek çatı altında sunuyoruz.',
  ogImage: { title: 'Hakkımızda', subtitle: 'Antalya merkezli yazılım ve güvenlik ekibi' },
})
useSchemaOrg([
  defineWebPage({ '@type': 'AboutPage' }),
  { '@type': 'Person', '@id': 'https://yuda.dev/#author', name: yuda.author.name, url: 'https://yuda.dev/hakkimizda', worksFor: { '@id': 'https://yuda.dev/#identity' }, ...(yuda.author.image ? { image: `https://yuda.dev${yuda.author.image}` } : {}) },
])
// "Yuda ne demek?" — meaning of the name only (no brand-origin story; the owner chose not to add one).
const nameFaqs = [
  {
    q: 'Yuda ne demek?',
    a: 'Yuda, İbranice kökenli Yehuda (Yahuda) isminin bir yazılışıdır. En yaygın kabul gören anlamı "övülen, övgüye değer" ve "şükran"dır.',
  },
  {
    q: 'Yuda isminin kökeni nedir?',
    a: 'İsim İbranice יְהוּדָה (Yehudah) kelimesinden gelir ve "şükretmek, övmek" anlamındaki Y-D-H kökünden türer. Tevrat\'ta Yakup ile Lea\'nın dördüncü oğlunun adıdır; Lea\'nın onun doğumunda "Bu kez Rab\'be şükredeceğim" dediği aktarılır (Yaratılış 29:35); İslami kaynaklarda Hz. Yakub\'un oğullarından ve Hz. Yusuf\'un kardeşlerinden biri olarak anılır.',
  },
  {
    q: 'Yüda ile Yuda aynı isim mi?',
    a: 'Evet. Türkçede aynı isim Yuda, Yüda veya Yahuda biçimlerinde yazılabilir. Japonya\'da ayrıca, seçilen karakterlere göre farklı anlamlar taşıyan bir erkek adı olarak da kullanılır.',
  },
  {
    q: 'yuda.dev\'deki Yuda nedir?',
    a: 'yuda.dev\'deki Yuda, Antalya merkezli bir web tasarım, özel yazılım, mobil uygulama ve siber güvenlik markasının adıdır.',
  },
]
useSchemaOrg([
  {
    '@type': 'FAQPage',
    '@id': 'https://yuda.dev/hakkimizda/#yuda-ne-demek',
    mainEntity: nameFaqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  },
])

const values = [
  { icon: 'lucide:shield-check', title: 'Güvenlik önce', text: 'Her sistemi yayına almadan önce saldırgan gözüyle test ederiz.' },
  { icon: 'lucide:gauge', title: 'Hız ve sadelik', text: 'Gereksiz ağırlık yok; hızlı açılan, kolay kullanılan ürünler.' },
  { icon: 'lucide:eye', title: 'Şeffaflık', text: 'Net teklif, net takvim, her aşamada çalışan bir sürüm.' },
  { icon: 'lucide:map-pin', title: 'Yerel ve ulaşılabilir', text: 'Antalya\'dayız; yüz yüze görüşebilir, aynı gün dönebiliriz.' },
]
</script>

<template>
  <div>
    <SitePageHero
      eyebrow="Hakkımızda"
      title="Antalya merkezli yazılım ve güvenlik ekibi"
      subtitle="İşletmelere müşteri getiren dijital ürünler kuruyor, bunları güvenlik araştırmacısı gözüyle test ediyoruz."
      :trail="[{ name: 'Ana Sayfa', path: '/' }, { name: 'Hakkımızda', path: '/hakkimizda' }]"
    />
    <UiContainer>
      <div class="grid gap-14 py-16 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div v-reveal class="prose-yuda max-w-none">
          <h2>Biz kimiz?</h2>
          <!-- TODO(kullanıcı): Bu bölümü gerçek hikâyeniz, deneyim yılınız ve ekibinizle güncelleyin. -->
          <p>
            Yuda; web tasarım, özel yazılım, mobil uygulama ve siber güvenlik alanlarında çalışan, Antalya merkezli bir ekip.
            Uluslararası bug bounty programlarında bulduğumuz açıklar Philips ve chess.com gibi şirketler tarafından kabul edildi.
          </p>
          <p>
            Bu deneyimi Antalya'daki işletmelerin dijital ürünlerine taşıyoruz: turizmden sağlığa, emlaktan perakendeye kadar
            farklı sektörlerde hızlı, güvenli ve müşteri getiren sistemler kuruyoruz.
          </p>
          <h2>Nasıl çalışıyoruz?</h2>
          <p>
            Her projeye ücretsiz bir keşif görüşmesiyle başlıyor, kapsamı ve teklifi yazılı olarak netleştiriyoruz.
            İki haftalık döngülerle ilerliyor, her aşamada çalışan bir sürüm gösteriyoruz. Teslimden önce güvenlik testi yapıyor,
            teslimden sonra da destek veriyoruz.
          </p>
        </div>
        <aside class="space-y-4">
          <div class="rounded-2xl border border-border bg-card p-6">
            <p class="font-mono text-xs uppercase tracking-widest text-brand">Hizmet bölgesi</p>
            <p class="mt-3 text-fg">{{ yuda.business.areaServed.join(', ') }}</p>
            <p class="mt-2 text-sm text-fg-muted">Türkiye'nin her yerinden projeleri online yürütüyoruz.</p>
          </div>
          <UiButton to="/iletisim" size="lg" class="w-full">Bizimle tanışın</UiButton>
        </aside>
      </div>

      <section class="border-t border-border py-16" aria-labelledby="degerler">
        <h2 id="degerler" class="text-3xl font-bold">İlkelerimiz</h2>
        <ul class="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <li v-for="(v, i) in values" :key="v.title" v-reveal="i * 70" class="rounded-2xl border border-border bg-card p-6">
            <Icon :name="v.icon" class="size-6 text-brand" aria-hidden="true" />
            <h3 class="mt-4 font-semibold">{{ v.title }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-fg-muted">{{ v.text }}</p>
          </li>
        </ul>
      </section>

      <section id="yuda-ne-demek" class="border-t border-border py-16" aria-labelledby="yuda-ne-demek-baslik">
        <div class="max-w-3xl">
          <h2 id="yuda-ne-demek-baslik" class="text-3xl font-bold">Yuda ne demek?</h2>
          <p class="mt-4 text-lg leading-relaxed text-fg-muted">
            <strong class="text-fg">Yuda</strong> (Türkçede <strong class="text-fg">Yüda</strong> veya <strong class="text-fg">Yahuda</strong> olarak da yazılır),
            İbranice kökenli Yehuda isminin bir yazılışıdır ve en yaygın anlamı <strong class="text-fg">"övülen, övgüye değer"</strong> ve <strong class="text-fg">"şükran"</strong>dır.
          </p>
          <div class="mt-8 divide-y divide-border rounded-2xl border border-border bg-card">
            <div v-for="f in nameFaqs" :key="f.q" class="px-6 py-5">
              <h3 class="font-semibold">{{ f.q }}</h3>
              <p class="mt-2 leading-relaxed text-fg-muted">{{ f.a }}</p>
            </div>
          </div>
          <p class="mt-6 text-sm text-fg-muted">
            Kaynaklar:
            <a href="https://en.wiktionary.org/wiki/Yehuda" target="_blank" rel="noopener" class="text-brand underline underline-offset-4">Wiktionary – Yehuda</a>,
            <a href="https://www.behindthename.com/name/yehuda" target="_blank" rel="noopener" class="text-brand underline underline-offset-4">Behind the Name – Yehuda</a>,
            <a href="https://en.wikipedia.org/wiki/Judah_(given_name)" target="_blank" rel="noopener" class="text-brand underline underline-offset-4">Wikipedia – Judah (isim)</a>.
          </p>
        </div>
      </section>
    </UiContainer>
  </div>
</template>
