<template>
  <section id="neden-yuda" class="relative isolate overflow-hidden bg-[#09090b] py-24 text-white sm:py-32" aria-labelledby="neden-baslik">
    <div class="absolute inset-0 -z-10 opacity-60 [background:radial-gradient(36rem_20rem_at_10%_10%,rgba(255,49,49,.22),transparent_70%)]" aria-hidden="true" />
    <UiContainer>
      <div class="grid gap-14 lg:grid-cols-2 lg:items-center">
        <div v-reveal>
          <p class="mb-4 inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.18em] text-[#ff7878]">
            <span class="text-[#ff3131]" aria-hidden="true">&lt;/&gt;</span>Neden Yuda
          </p>
          <h2 id="neden-baslik" class="text-3xl font-bold leading-tight sm:text-[2.6rem]">Güvenliği sonradan eklemiyoruz, en baştan tasarlıyoruz</h2>
          <p class="mt-5 text-lg leading-relaxed text-zinc-300">
            Uluslararası bug bounty programlarında bulduğumuz açıklar büyük şirketler tarafından kabul edildi.
            Aynı saldırgan bakış açısıyla, Antalya'daki işletmeler için geliştirdiğimiz her sistemi yayına almadan önce test ediyoruz.
          </p>
          <ul class="mt-8 space-y-3 text-zinc-200">
            <li class="flex gap-3"><Icon name="lucide:check" class="mt-1 size-5 shrink-0 text-[#ff5a5a]" aria-hidden="true" />Her projede manuel güvenlik testi ve rapor</li>
            <li class="flex gap-3"><Icon name="lucide:check" class="mt-1 size-5 shrink-0 text-[#ff5a5a]" aria-hidden="true" />Kaynak kod ve erişimler sizde kalır</li>
            <li class="flex gap-3"><Icon name="lucide:check" class="mt-1 size-5 shrink-0 text-[#ff5a5a]" aria-hidden="true" />Teslimden sonra hata düzeltme garantisi</li>
          </ul>
        </div>

        <ul class="grid gap-5">
          <li v-reveal="80">
            <a href="https://www.philips.com/a-w/security/coordinated-vulnerability-disclosure/hall-of-honors.html" target="_blank" rel="noopener" class="card-lift group block rounded-2xl border border-white/10 bg-white/[0.04] p-7">
              <div class="flex items-center justify-between">
                <p class="font-mono text-xs uppercase tracking-widest text-zinc-400">Hedef · philips.com</p>
                <Icon name="lucide:arrow-up-right" class="size-5 text-zinc-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
              </div>
              <h3 class="mt-3 text-xl font-semibold">Philips Hall of Honors</h3>
              <p class="mt-2 text-zinc-300">Bazı alt alan adlarında bulunan güvenlik açıkları raporlandı ve kabul edildi.</p>
            </a>
          </li>
          <li v-reveal="160">
            <a href="https://www.youtube.com/watch?v=ikSVujJ8fp0" target="_blank" rel="noopener" class="card-lift group block rounded-2xl border border-white/10 bg-white/[0.04] p-7">
              <div class="flex items-center justify-between">
                <p class="font-mono text-xs uppercase tracking-widest text-zinc-400">Hedef · chess.com</p>
                <Icon name="lucide:arrow-up-right" class="size-5 text-zinc-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
              </div>
              <h3 class="mt-3 text-xl font-semibold">Stored XSS ile hesap erişimi</h3>
              <p class="mt-2 text-zinc-300">Kalıcı XSS zafiyeti üzerinden hesaplara erişilebildiğini gösteren bulgu raporlandı.</p>
            </a>
          </li>
        </ul>
      </div>
    </UiContainer>
  </section>
</template>
