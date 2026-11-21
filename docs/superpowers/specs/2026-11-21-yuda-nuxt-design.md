# yuda.dev — Nuxt ile Sıfırdan Yeniden Tasarım

Tarih: 2026-11-21 · Durum: Taslak (onay bekliyor)

## 1. Amaç ve neden

yuda.dev şu an GitHub Pages + Cloudflare üzerinde tek sayfalık statik bir HTML. Hizmet sayfası, blog, yerel sinyal (adres/telefon/ilçe), sitemap, canonical, OG etiketi yok. "Antalya yazılım hizmeti" gibi yerel aramalarda görünmüyor.

Site iki ayrı kitleye hizmet edecek:

1. **Özel proje isteyenler (yerel, ana hedef):** Antalya ve çevresindeki işletmeler. "antalya yazılım", "antalya web tasarım" gibi yerel aramalardan gelir. Hedef eylem: **teklif istemek** (WhatsApp veya form).
2. **Script alıcıları (ulusal):** Hazır ürün arayan geliştiriciler ve site sahipleri. "hesap satış scripti", "php lisans sistemi" gibi ürün aramalarından gelir. Hedef eylem: **satın almak** (mevcut `checkout.yuda.dev`).

Seçilen yapı (**Yaklaşım A**): tek alan adı, iki bölüm, ortak blog. Böylece backlink ve blog gücü tek domainde birikir.

## 2. Hedefler

- Ana sayfa ve hizmet sayfaları "Antalya + hizmet" aramalarını hedefler.
- Her script ürünü kendi indekslenebilir sayfasına sahip olur (`Product` schema'sı ile).
- Blog, iki kategoride düzenli içerik yayınlamayı kolaylaştırır ve ilgili hizmet veya ürün sayfalarına iç link verir.
- Teknik SEO eksiksiz olur: sitemap, robots, canonical, OG/Twitter, structured data, breadcrumb.
- Hızlı olur: mobil Lighthouse performans/SEO/erişilebilirlik ≥ 95.
- Ücretsiz statik barındırma korunur (GitHub Pages + Cloudflare).

## 3. Hedef dışı (bu sürümde yok)

- Yönetim paneli veya CMS (yazılar Markdown olarak repoda tutulur).
- Ödeme sistemi: ödeme `checkout.yuda.dev` üzerinde kalır, bu proje sadece oraya link verir.
- Çoklu dil: şimdilik yalnızca Türkçe. İleride ürünler için İngilizce eklenebilecek şekilde yapı kurulur.
- Kullanıcı hesabı, giriş, müşteri paneli.
- Sunucu tarafı kod (SSR sunucusu, API).

## 4. Kaçınılacaklar (çalışsa bile başarısızlık sayılır)

- **İlçe başına neredeyse aynı sayfalar** ("muratpaşa web tasarım", "kepez web tasarım"...). Google bunları doorway page olarak cezalandırır. İlçeler, hizmet sayfalarının içeriğinde ve schema'daki `areaServed` alanında geçer.
- **İnce veya otomatik üretilmiş blog içeriği.** Yapı kaliteyi teşvik etmeli: her yazıda yazar, tarih, kategori ve en az bir iç link alanı bulunur.
- **Script ürünlerinin ajans kimliğini gölgelemesi.** Ana sayfa önce hizmetleri anlatır, ürünler ikinci planda kalır.
- **Yavaş site.** Ağır animasyon kütüphaneleri, büyük PNG'ler ve CDN'den Tailwind yüklemek yasak.
- **Eski URL'lerin kırılması.** `/terms.html` yeni adrese yönlendirilmeli.

## 5. Kısıtlar

- Barındırma: GitHub Pages (statik) + önünde Cloudflare. Sunucu yok, çıktı `nuxt generate` ile üretilir.
- Ödeme linkleri: `https://checkout.yuda.dev/buy_script/<slug>` (mevcut: `proxy-chain`, `lisans-system`, `url-shortener`; YudaStore stokta yok).
- Mevcut görseller: `img/logo.png`, `img/logo_white.png`, ürün görselleri (`epin.png`, `proxy.png`, `lisans.png`, `shortener.png`) canlı siteden alınıp WebP'ye çevrilir.
- Dil: Türkçe (`lang="tr"`, `og:locale=tr_TR`).
- Lokal klasör (`C:\Users\yudad\Desktop\yudadev`) boş ve git reposu değil. Yeni proje burada oluşturulur, git init yapılır. GitHub repo bağlantısı ve deploy kullanıcıyla birlikte ayarlanır.

## 6. Değerlendirilen yaklaşımlar

| Yaklaşım | Artı | Eksi | Karar |
|---|---|---|---|
| **A. Tek site, iki bölüm** (`/hizmetler`, `/urunler`, ortak `/blog`) | Otorite tek domainde birikir, tek proje, kolay bakım | Ürünler yerel müşteriye "karışık" görünebilir (menüde ikinci plana alınarak çözülür) | **Seçildi** (kullanıcı onayladı) |
| B. İki site (`yuda.dev` + `store.yuda.dev`) | Marka tamamen ayrılır | Subdomain otoriteyi böler, iki blog gerekir, iki kat iş | Elendi |
| C. Ana sayfada "Script mi / Proje mi" seçim kapısı | Basit | Ana sayfanın yerel SEO gücünü harcar | Elendi |

## 7. Kararlar

Kullanıcının verdiği kararlar: Nuxt.js ile sıfırdan yazılacak, Yaklaşım A uygulanacak, scriptler ve özel projeler ayrı bölümlerde olacak.
Diğerleri **[benim kararım]** olarak işaretli, kullanıcı itiraz edebilir.

### 7.1 Teknoloji [benim kararım]

- **Nuxt** (güncel kararlı sürüm, 4.x), statik üretim (`nuxt generate`), TypeScript.
- **@nuxt/content** (v3): blog yazıları, ürünler ve hizmetler için içerik koleksiyonları (Markdown + YAML frontmatter, Zod şemalarıyla doğrulanır).
- **Tailwind CSS v4**: derleme zamanında. CDN kullanılmaz.
- **@nuxtjs/seo** paketi (sitemap, robots, schema-org, og-image, seo-utils) veya bunların tekil modülleri.
- **@nuxt/image** (WebP/AVIF, lazy, boyutlandırma), **@nuxt/fonts** (font self-host), **@nuxt/icon** (Lucide seti).
- Analitik: **Cloudflare Web Analytics** (çerezsiz, KVKK çerez banner'ı gerektirmez) + **Google Search Console** doğrulaması.

### 7.2 Site haritası ve URL'ler [benim kararım]

```
/                                   Ana sayfa (hedef: "Antalya yazılım ve web tasarım")
/hizmetler                          Hizmetler listesi
/hizmetler/web-tasarim              Antalya web tasarım
/hizmetler/yazilim-gelistirme       Antalya özel yazılım geliştirme
/hizmetler/mobil-uygulama           Antalya mobil uygulama geliştirme
/hizmetler/e-ticaret                Antalya e-ticaret sitesi
/hizmetler/siber-guvenlik           Sızma testi / güvenlik denetimi (bug bounty geçmişi burada)
/urunler                            Hazır scriptler listesi
/urunler/[slug]                     Ürün detay (proxy-chain, lisans-sistemi, url-shortener, yudastore)
/referanslar                        Bug bounty referansları + tamamlanan projeler
/blog                               Tüm yazılar (sayfalı)
/blog/kategori/[kategori]           "isletmeler-icin" | "gelistiriciler-icin"
/blog/[slug]                        Yazı detay
/hakkimizda                         Kim olduğun, deneyim, yazar profili (E-E-A-T)
/iletisim                           Teklif formu, WhatsApp, e-posta, hizmet bölgesi
/sartlar                            Mevcut terms.html içeriği
/gizlilik                           KVKK aydınlatma metni
/404                                Özel 404 sayfası
```

- "Antalya" kelimesi URL'de değil, title, H1 ve içerikte geçer. URL kısa kalır ve ileride başka şehirler eklenirse yapı bozulmaz.
- `/terms.html` → `/sartlar` yönlendirmesi Cloudflare Redirect Rule ile yapılır, yedek olarak meta-refresh sayfası eklenir.
- Sonda eğik çizgi (trailing slash) politikası tek tip olur, canonical buna göre üretilir.

### 7.3 Navigasyon ve dönüşüm [benim kararım]

- Üst menü: **Hizmetler · Referanslar · Blog · Hakkımızda · İletişim**, sağda "Teklif Al" butonu. **Ürünler** menüde daha sade bir link olarak yer alır.
- Sabit (mobilde) **WhatsApp butonu**: hizmet sayfalarında görünür, ürün sayfalarında görünmez.
- Her hizmet sayfasının sonunda teklif formu bloğu, her ürün sayfasında "Satın Al" (checkout) ve "Özel geliştirme ister misin?" çapraz linki.
- **Teklif formu:** statik site olduğu için üçüncü parti form servisi kullanılır (Web3Forms veya Formspree; servis seçimi builder'a bırakılmıştır, ücretsiz katman yeterli olmalı). Alanlar: ad, işletme, telefon/e-posta, hizmet türü, bütçe aralığı, mesaj, KVKK onayı. Spam koruması için honeypot alanı (+ servisin desteklediği captcha).

### 7.4 Sayfa içerik iskeletleri

**Ana sayfa:** Hero (H1: Antalya yazılım ve web tasarım; alt metin; "Teklif Al" + "Hizmetleri Gör") → Hizmet kartları (5) → Neden Yuda (güvenlik uzmanlığı vurgusu, bug bounty) → Süreç (4 adım, mevcut sitedeki içerik) → Referans/vaka özeti → Hazır ürünler şeridi (küçük, en fazla 3 kart) → Son blog yazıları (3) → Hizmet bölgesi (Antalya ilçeleri metin olarak) → İletişim CTA.

**Hizmet sayfası** (`content/hizmetler/*.md`): H1 (hizmet + Antalya) → kime uygun → neler dahil → süreç → fiyatlandırma yaklaşımı ("başlangıç fiyatı" veya "teklife göre": içerik alanı opsiyonel) → ilgili referanslar → SSS (4–6 soru) → ilgili blog yazıları (etikete göre otomatik) → teklif formu.

**Ürün sayfası** (`content/urunler/*.yml|md`): ad, kısa açıklama, fiyat (USD), durum (`in_stock` | `out_of_stock`), checkout URL, görseller, özellik listesi, teknik gereksinimler, demo linki (opsiyonel), sürüm notları (opsiyonel), SSS → "Satın Al" butonu. Stokta yoksa buton pasif olur ve "Haber ver / iletişim" gösterilir.

**Blog yazısı** frontmatter alanları:
`title, description, date, updated?, category, tags[], cover, coverAlt, author, relatedServices[]?, relatedProducts[]?, draft?`
Yazının altında yazar kutusu, okuma süresi, ilgili hizmet veya ürün kartı ve aynı kategoriden 3 yazı yer alır.

### 7.5 İleri tarihli yayınlama [benim kararım]

Kullanıcı düzenli (günlük hedefli) yazı paylaşmak istiyor. Bunu yükü azaltacak şekilde kuruyoruz:
- `date` alanı gelecekte olan yazılar build sırasında listelenmez, sitemap'e girmez, sayfası üretilmez.
- GitHub Actions **her gün sabah (örn. 06:00 TR saati) zamanlanmış build** alır. Böylece toplu yazılan yazılar kendi tarihinde otomatik yayına girer.
- `draft: true` olan yazılar hiçbir zaman yayınlanmaz.

### 7.6 SEO ayrıntıları [benim kararım]

- Her sayfada benzersiz `title` (≤ 60 karakter) ve `description` (≤ 155 karakter) olur. İçerik dosyasından gelir, eksikse build uyarı verir.
- Canonical (`https://yuda.dev/...`), `og:*`, `twitter:card=summary_large_image`. Blog ve ürünler için otomatik OG görseli üretilir (og-image modülü, statik).
- **Structured data:**
  - Tüm site: `Organization` + `WebSite` (SearchAction yok).
  - Ana sayfa, iletişim ve hizmet sayfaları: `ProfessionalService` (LocalBusiness alt tipi) ile ad, telefon, e-posta, `areaServed` (Antalya + ilçeler: Muratpaşa, Konyaaltı, Kepez, Lara/Aksu, Döşemealtı vb.), `sameAs` (GitHub, Google İşletme Profili linki). **Açık sokak adresi yok** (kullanıcı kararı: yalnızca hizmet bölgesi). `address` alanında yalnızca `addressLocality: Antalya`, `addressRegion: Antalya`, `addressCountry: TR` bulunur. `geo` ve harita kullanılmaz.
  - Hizmet sayfaları: `Service` (provider → organization).
  - Ürünler: `Product` + `Offer` (price, priceCurrency USD, availability).
  - Blog: `BlogPosting` (author → `Person`, datePublished/Modified, image).
  - Tüm alt sayfalar: `BreadcrumbList` (Türkçe isimler).
  - SSS bölümleri içerik olarak kalır. `FAQPage` rich result Google'da artık sınırlı olduğu için zorunlu değildir.
- `sitemap.xml` (blog, ürün, hizmet otomatik), `robots.txt`: AI eğitim botlarını engelleme mevcut haliyle korunur, arama amaçlı AI botlarına (OAI-SearchBot, PerplexityBot) izin verilir.
- Görsellerde Türkçe ve açıklayıcı `alt` zorunludur (içerik şemasında zorunlu alan).
- RSS beslemesi `/blog/rss.xml`.

### 7.7 Görsel tasarım yönü [benim kararım, uygulama başında onaylanacak]

- Mevcut sitenin minimal, nötr (neutral/gri) ve ferah çizgisi korunur ve rafine edilir. Tek bir marka vurgu rengi eklenir (öneri: derin mavi veya teal; Antalya / deniz çağrışımı).
- Açık ve koyu tema (sistem tercihini izler, elle değiştirilebilir). Tema tercihi flaş olmadan uygulanır.
- Tipografi: başlıklarda karakterli bir sans-serif, metinde okunabilir sans-serif. Fontlar self-host edilir (@nuxt/fonts).
- Animasyonlar hafif: CSS ve `prefers-reduced-motion` desteğiyle.
- **Uygulamanın ilk adımı:** ana sayfa ve bir hizmet sayfası için görsel mockup hazırlanıp kullanıcıya gösterilir, onay alınmadan tüm sayfalara yayılmaz.

### 7.8 Deploy [benim kararım]

- GitHub Actions: push to `main` + günlük zamanlanmış build → `nuxt generate` → GitHub Pages'e deploy (`actions/deploy-pages`). Özel alan adı `yuda.dev` (CNAME).
- Cloudflare'de "Always Use HTTPS" açılır ve `www` → `https://yuda.dev` 301 kuralı eklenir (kullanıcının yapacağı ayarlar; adımlar README'de yazılır).

## 8. Kullanıcıdan gelecek içerik (yer tutucu ile başlanır)

Proje bunlar olmadan da kurulur. Değerler tek bir yapılandırma dosyasında (`app.config.ts` / `site` ayarları) toplanır, sonradan doldurulur:

- İşletme adı (resmi), telefon / WhatsApp numarası, e-posta.
- Hizmet bölgesi listesi (kullanıcı kararı: açık adres yok, yalnızca hizmet bölgesi). Google İşletme Profili "hizmet bölgesi işletmesi" olarak açılır. Ad, telefon ve bölge sitedekiyle birebir aynı olmalı (NAP tutarlılığı).
- Hakkımızda metni, yazar adı ve fotoğrafı (E-E-A-T için gerçek kişi).
- Tamamlanan proje referansları (varsa, müşteri izniyle).
- Ana sayfadaki "100+ mutlu müşteri", "5+ yıl" gibi rakamların doğruluğu.

Başlangıç içeriği olarak: 5 hizmet sayfası taslağı, 4 ürün sayfası (mevcut sitedeki bilgilerle), 2 örnek blog yazısı (her kategoriden bir).

## 8.1 Geçiş ve eski siteyle uyumluluk [benim kararım]

- Yeni site **mevcut GitHub Pages reposunun yerine geçer** (aynı repo, aynı CNAME ve Pages ayarları, yeni içerik). Bu klasörde geliştirilir, hazır olunca o repoya taşınır. Ayrı yeni bir repo açılmaz, böylece alan adı ve Pages ayarları bozulmaz.
- Eski görseller **eski yollarında aynen kalır** (`/img/logo.png`, `/img/logo_white.png`, `/img/epin.png`, `/img/proxy.png`, `/img/lisans.png`, `/img/shortener.png`). Sitede kullanılan optimize WebP kopyaları ayrı yoldadır. Böylece `checkout.yuda.dev` veya dış siteler kırılmaz.
- Eski repodaki doğrulama dosyaları (`google*.html`, `BingSiteAuth.xml` vb.) ve `CNAME` dosyası korunur.
- Eski tek sayfadaki çapalar (`/#portfolio`, `/#footer`) önemsizdir, yönlendirme gerekmez. Tek kalıcı yönlendirme `/terms.html` → `/sartlar`.

## 8.2 Ürün slug'ları ve ödeme eşlemesi [benim kararım]

Site URL'si Türkçe ve kalıcıdır. Ödeme linki ayrı bir alan (`checkoutUrl`) olarak tutulur, slug'ların eşleşmesi gerekmez.

| Ürün | Site URL | checkoutUrl | Durum | Görsel |
|---|---|---|---|---|
| ProxyChain – Reverse Proxy | `/urunler/proxy-chain` | `https://checkout.yuda.dev/buy_script/proxy-chain` | stokta, 89$ | proxy.png |
| Lisans Sistemi | `/urunler/lisans-sistemi` | `https://checkout.yuda.dev/buy_script/lisans-system` | stokta, 129$ | lisans.png |
| URL Shortener | `/urunler/url-kisaltma` | `https://checkout.yuda.dev/buy_script/url-shortener` | stokta, 50$ | shortener.png |
| YudaStore – Hesap Satış | `/urunler/yudastore` | yok (alan boş) | stokta yok, 499$ | epin.png |

`checkoutUrl` boşsa veya durum `out_of_stock` ise "Satın Al" yerine "Stokta yok, iletişime geç" gösterilir.

## 9. Builder'a bırakılanlar

- Bileşen yapısı, klasör düzeni, isimlendirme.
- Form servisinin seçimi (Web3Forms / Formspree), ücretsiz katman ve KVKK uyumuna göre.
- Kesin renk kodları, font seçimi (7.7 çerçevesinde, mockup ile onaylanır).
- Sayfalama boyutu, okuma süresi hesabı, ilgili yazı algoritması.
- Test kapsamı (en azından: build başarılı, sitemap ve schema doğrulaması, kırık link kontrolü, Lighthouse CI).

## 10. Başarı ölçütleri

- Build hatasız, tüm sayfalar statik üretiliyor, kırık iç link yok.
- Google Rich Results Test'te bir ürün (Product) ve bir yazı (BlogPosting) hatasız geçiyor. Ana sayfa `ProfessionalService` işaretlemesi Schema.org Validator'da hatasız. (Açık adres olmadığı için LocalBusiness rich result beklenmez. Yerel görünürlüğü asıl Google İşletme Profili sağlar.)
- Mobil Lighthouse: performans, SEO, erişilebilirlik ve best practices ≥ 95.
- İleri tarihli bir yazı, tarihi gelince günlük build ile otomatik yayına giriyor.
- Search Console'a sitemap gönderilmiş ve indeksleme başlamış.
