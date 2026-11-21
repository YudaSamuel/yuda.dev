# Uygulama Yol Haritası

**Sahip sütunu:** 👤 = senin yapman gereken, 🤖 = benim yapacağım, 👤🤖 = birlikte.

## Faz 1: Temel (1–4. hafta)

| # | İş | Sahip | Not |
|---|---|---|---|
| 1 | Telefon, WhatsApp, Web3Forms anahtarını `app/data/site.ts`'e gir | 👤 | Form ve schema `telephone` bunu bekliyor |
| 2 | Cloudflare: Always Use HTTPS + `www` → `https://yuda.dev` 301 | 👤 | |
| 3 | Google Search Console: alan adını doğrula, sitemap gönder | 👤 | `https://yuda.dev/sitemap.xml` |
| 4 | Google İşletme Profili: hizmet bölgesi işletmesi (Antalya + ilçeler, il/ülke değil), video doğrulama | 👤 | Ad/telefon sitedekiyle birebir |
| 5 | Bing Webmaster + IndexNow | 👤🤖 | claude-seo `seo-bing` ile |
| 6 | İçerik kalite bekçileri: `keyword` alanı + benzersizlik, min. 600 kelime, zorunlu pillar linki | 🤖 | Test ile zorunlu |
| 7 | `ProfessionalService.hasOfferCatalog` ve yazar `Person`+`sameAs` schema | 🤖 | |
| 8 | Hakkımızda: gerçek ad, fotoğraf, deneyim, GitHub/LinkedIn | 👤🤖 | E-E-A-T |
| 9 | Takvimin 1–12. yazıları | 🤖 + 👤 deneyim notu | Haftalık PR |
| 10 | Dizin profilleri: Armut, Clutch, DesignRush, Firmasec, Yandex, Apple Business Connect | 👤 | Aynı ad, bölge, telefon, yuda.dev linki |

## Faz 2: Genişleme (5–12. hafta)

| # | İş | Sahip |
|---|---|---|
| 11 | `/sektorler/` hub + 6 sektör sayfası (min. 800 kelime, özgün) | 🤖 + 👤 sektör bilgisi |
| 12 | İlk 3 vaka çalışması (izinli, ölçülebilir sonuçlu) | 👤 veri, 🤖 yazım |
| 13 | Takvimin 13–36. yazıları | 🤖 + 👤 |
| 14 | İlk Google yorumları (her teslimattan sonra istek) | 👤 |
| 15 | 4. hafta: Search Console verisiyle takvim güncellemesi | 🤖 |
| 16 | claude-seo `seo-local` ile yerel SEO denetimi | 🤖 |

## Faz 3: Ölçek (13–24. hafta)

- Haftalık bulut görevi: konu planından taslak, PR ile onay (GitHub bağlantısı gerekir).
- 2. sayfadaki sorgular için mevcut yazıların güncellenmesi (ayda bir).
- "Best of" ve yerel listelere girme (AI aramada görünürlüğün 1 numaralı etkeni).
- Karşılaştırma sayfaları: "Ideasoft/Ticimax mı özel e-ticaret mi" vb. (`seo-competitor-pages`).
- GEO: SSS ve alıntılanabilir tanımların gözden geçirilmesi (`seo-geo`).

## Faz 4: Otorite (7–12. ay)

- Özgün araştırma: "Antalya'daki işletme sitelerinin güvenlik durumu" (anonim, toplu tarama).
- Yerel etkinlik/meetup sunumları, yerel basın.
- İngilizce ürün sayfaları (script alıcıları için, `hreflang`).
- Sürekli optimizasyon: `seo-drift` ile her yayından sonra SEO regresyon kontrolü.

## Ölçüm ritmi

| Sıklık | Kontrol |
|---|---|
| Her yayın | Testler + `check:links` (otomatik, CI) |
| Haftalık | Yeni yazıların indekslenmesi (Search Console) |
| Aylık | Sorgu/tıklama trendi, 2. sayfa fırsatları, yorum sayısı, harita görünürlüğü |
| Çeyreklik | Strateji ve KPI güncellemesi |
