# yuda.dev SEO Stratejisi

Hazırlanma: 2026-11-21 · Yöntem: claude-seo `seo-plan` (yerel hizmet + ajans şablonları)

## 1. Keşif özeti

| Konu | Durum |
|---|---|
| İşletme türü | Yerel hizmet işletmesi (Antalya, hizmet bölgesi) + ajans (web, yazılım, mobil, e-ticaret, güvenlik) + dijital ürün (hazır scriptler) |
| Hedef kitle | 1) Antalya'daki KOBİ'ler: otel/pansiyon, restoran, klinik, emlak, tur/tekne, yerel üretici. 2) Türkiye geneli geliştiriciler (script alıcıları) |
| Ana dönüşüm | Teklif formu / WhatsApp / e-posta (özel proje); checkout.yuda.dev (script) |
| Rakip durumu | Yerel aramaları ajans siteleri değil dizinler (Armut, Firmasec, Clutch, DesignRush) tutuyor. Ayrıntı: [COMPETITOR-ANALYSIS.md](COMPETITOR-ANALYSIS.md) |
| En güçlü ayrışma | Doğrulanabilir güvenlik uzmanlığı: Philips Hall of Honors, chess.com stored XSS bulgusu |
| Teknik altyapı | Hazır: statik Nuxt, Lighthouse 96–100, schema, sitemap, RSS, ileri tarihli yayın, içerik doğrulama testleri |
| Eksik | Google İşletme Profili, telefon/WhatsApp, vaka çalışmaları, yorumlar, Search Console verisi |

## 2. Temel ilkeler (spam yememek için)

1. **Her anahtar kelimeye tek sayfa.** Yazılar hizmet sayfalarının hedeflediği kelimeleri hedeflemez; onları destekler ve onlara link verir. Çakışma listesi takvimde tutulur.
2. **İlçe başına kopya sayfa yok.** Muratpaşa/Konyaaltı/Kepez için ayrı "web tasarım" sayfası açmıyoruz (doorway riski). Bunun yerine **sektör sayfaları** (otel, restoran, klinik…) açıyoruz: gerçek, birbirinden farklı sorunlar anlatırlar.
3. **Yapay zekâ taslak yazar, insan deneyim ekler.** Her yazıya en az bir gerçek örnek, müşteri sorusu, ekran görüntüsü ya da yerel ayrıntı eklenir (E-E-A-T).
4. **Tempo: haftada 3 yazı** (Pazartesi, Çarşamba, Cuma). Düzenlilik sayıdan önemli. Günde 3 yazı önerilmez.
5. **Yeni yazı kadar güncelleme.** Ayda bir Search Console'da 2. sayfadaki sorgular bulunur, ilgili yazılar güncellenir (`updated` alanı).
6. **Kanıt uydurulmaz.** Sahte yorum, rozet, müşteri logosu, rakam yok.

## 3. Konu kümeleri (pillar → cluster)

| Küme (pillar sayfa) | Hedef ana kelime | Destekleyen içerik türü |
|---|---|---|
| `/hizmetler/web-tasarim/` | antalya web tasarım | sektöre özel site rehberleri, yerel SEO, hız/mobil |
| `/hizmetler/yazilim-gelistirme/` | antalya yazılım / özel yazılım | süreç, maliyet, entegrasyon, otomasyon |
| `/hizmetler/mobil-uygulama/` | antalya mobil uygulama | uygulama mı web mi, mağaza süreci |
| `/hizmetler/e-ticaret/` | antalya e-ticaret sitesi | pazaryeri, sanal POS, kargo, yasal metinler |
| `/hizmetler/siber-guvenlik/` | antalya sızma testi / siber güvenlik | WordPress güvenliği, KVKK, bug bounty, açık türleri |
| `/urunler/*` | hesap satış scripti, lisans sistemi, reverse proxy, url kısaltma | geliştirici rehberleri |
| (yeni) `/sektorler/*` | otel web sitesi, restoran web sitesi… | sektör sorunları + çözüm + vaka |

## 4. E-E-A-T planı

- **Yazar sayfası:** `/hakkimizda/` gerçek ad, fotoğraf, deneyim yılı, bug bounty geçmişi, GitHub. `Person` schema + `sameAs`.
- **Vaka çalışmaları:** En az 3 adet (`/referanslar/` altında veya `/vaka/`): sorun, çözüm, süre, ölçülebilir sonuç, müşteri izni.
- **Güvenlik kanıtı:** Philips ve chess.com bulgularını anlatan derin bir yazı (takvimde 1. hafta).
- **Gerçek görseller:** Ekip, çalışma ortamı, proje ekranları (`photos/`).

## 5. Teknik temel (mevcut ve eklenecek)

| Alan | Durum | Eklenecek |
|---|---|---|
| Core Web Vitals | Mobil Lighthouse 96–98 | Yayın sonrası CrUX/Search Console takibi |
| Schema | Organization, ProfessionalService, Service, BlogPosting, Product+SoftwareApplication, BreadcrumbList | `hasOfferCatalog` (hizmet listesi), sektör sayfalarında `Service`, vaka sayfalarında `Article` |
| İç linkleme | Yazı → hizmet zorunlu değil | İçerik testine "en az 1 hizmet linki" kuralı |
| Kalite bekçileri | Başlık/açıklama uzunluğu, şema | `keyword` alanı + benzersizlik testi, min. 700 kelime |
| AI arama (GEO) | OAI-SearchBot/PerplexityBot izinli | SSS bölümleri, alıntılanabilir net tanımlar, "best of" listelerine giriş |
| Yerel | Hizmet bölgesi schema | Google İşletme Profili, NAP tutarlılığı, dizin kayıtları |

## 6. KPI hedefleri

Başlangıç değerleri Search Console bağlandıktan sonra doldurulacak (şu an veri yok).

| Metrik | Başlangıç | 3 ay | 6 ay | 12 ay |
|---|---|---|---|---|
| Organik tıklama / ay | GSC bekleniyor | +ilk 100 | 500 | 1.500 |
| İlk 10'da sorgu sayısı | GSC bekleniyor | 15 | 50 | 150 |
| Yerel paket (harita) görünürlüğü, ana 5 kelime | yok | 2/5 | 4/5 | 5/5 |
| İndekslenen sayfa | ~22 | 60 | 100 | 180 |
| Google yorumu | 0 | 5 | 15 | 30 |
| Organik teklif talebi / ay | 0 | 2 | 6 | 15 |
| Core Web Vitals | iyi | iyi | iyi | iyi |

Hedefler tahmindir; anahtar kelime hacmi verisi (Keyword Planner veya DataForSEO) bağlanınca güncellenmelidir.

## 7. Riskler

| Risk | Önlem |
|---|---|
| Hacimli/ince içerikten spam algısı | Haftada 3 yazı, min. 700 kelime, deneyim katkısı, PR ile insan onayı |
| Anahtar kelime yamyamlığı | Takvimde tek kelime = tek sayfa; test ile zorunlu |
| Yerel sinyal eksikliği | GBP + yorum + dizin kayıtları 1. ayda |
| Kanıt eksikliği (vaka yok) | İlk 3 müşteri projesinden izinli vaka çalışması |
| Arama verisi olmadan karar | GSC'yi 1. haftada bağla; plan 4 haftada bir veriyle güncellenir |

İlgili dokümanlar: [SITE-STRUCTURE.md](SITE-STRUCTURE.md) · [CONTENT-CALENDAR.md](CONTENT-CALENDAR.md) · [IMPLEMENTATION-ROADMAP.md](IMPLEMENTATION-ROADMAP.md)
