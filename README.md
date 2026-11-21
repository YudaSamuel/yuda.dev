# yuda.dev

Antalya odaklı yazılım hizmetleri + hazır script ürünleri + blog. Nuxt 4 ile statik olarak üretilir, GitHub Pages ve Cloudflare üzerinden yayınlanır.

- Tasarım ve kararlar: [docs/superpowers/specs/2026-11-21-yuda-nuxt-design.md](docs/superpowers/specs/2026-11-21-yuda-nuxt-design.md)
- Yayın öncesi doldurulacaklar: [docs/yayin-oncesi-kontrol-listesi.md](docs/yayin-oncesi-kontrol-listesi.md)

## 1. Geliştirme

```bash
npm install
npm run dev          # http://localhost:3000
npm test             # birim + içerik şema testleri
npm run generate     # statik site → .output/public
npm run test:build   # üretilen HTML'i doğrular (önce generate)
npm run preview      # .output/public'i yerelde sunar (http://localhost:4173)
npm run check:links  # iç linkleri tarar (önce generate)
npm run check:lighthouse  # mobil Lighthouse ≥ 0.95 (Chrome gerekir)
```

`check:lighthouse` yerelde HTTP/1.1 ile çalışırsa performansı olduğundan düşük gösterir. Üretime (Cloudflare, HTTP/2) yakın ölçüm için:

```bash
TLS_KEY=key.pem TLS_CERT=cert.pem npm run check:lighthouse
```

## 2. Yeni blog yazısı ekleme

`content/blog/<slug>.md` dosyası oluştur. Dosya adı URL olur (`/blog/<slug>`), Türkçe karakter kullanma.

```markdown
---
title: "En fazla 53 karakter başlık"
description: "50–155 karakter arası açıklama. Google sonuçlarında bu görünür."
date: "2026-12-01"            # tırnak içinde! Bu tarih gelene kadar yayınlanmaz
category: "isletmeler-icin"   # veya "gelistiriciler-icin"
tags: ["web tasarım", "antalya"]
cover: "/images/blog/<slug>.webp"   # 1200×630 WebP
coverAlt: "Görseli anlatan Türkçe metin"
author: "Yuda"
relatedServices: ["web-tasarim"]    # en az bir hizmet veya ürüne bağla
relatedProducts: []
draft: false
---

Yazı içeriği (Markdown)...
```

- **İleri tarihli yayın:** `date` gelecekteyse yazı listelenmez, sitemap'e ve RSS'e girmez. Site her sabah 06:00'da (TR) otomatik yeniden derlenir ve tarihi gelen yazı yayına girer. Yazıları toplu yazıp tarihlerini dağıtabilirsin.
- **Taslak:** `draft: true` olan yazı hiç yayınlanmaz.
- **Kontrol:** `npm test` hatalı frontmatter'ı (eksik alan, uzun başlık, tırnaksız tarih) yakalar.
- **Kapak görseli:** `scripts/make-images.mjs` içindeki `cover()` fonksiyonuna bir satır ekleyip `node scripts/make-images.mjs` çalıştırarak markalı kapak üretebilirsin.
- `content/blog/test-planlanmis.md` ve `test-taslak.md` dosyaları testler içindir, yayında görünmez. Silersen `tests/build/blog.test.ts` ve `home.test.ts` içindeki ilgili kontrolleri de kaldır.

Kalite kuralı: Her gün yazı zorunlu değil. Haftada 2–3 gerçek soruya cevap veren yazı, günlük ince içerikten daha iyi sıralanır.

## 3. İletişim bilgilerini doldurma

Tek dosya: `app/data/site.ts`

- `business.phone`, `business.whatsapp`: boşken ilgili butonlar ve schema alanı hiç görünmez.
- `business.sameAs`: Google İşletme Profili, LinkedIn, Instagram linkleri.
- `form.accessKey`: [web3forms.com](https://web3forms.com) üzerinden ücretsiz alınır (e-posta adresini girmen yeterli). Boşken form yerine e-posta uyarısı gösterilir.
- `author`, `projects`: Blog yazar kutusu ve referanslar sayfası.
- `YUDA_TEST_FILLED` bloğu yalnızca testler içindir, dokunma.

## 4. Geçiş (mevcut siteden bu projeye)

1. Mevcut GitHub Pages reposunu klonla. İçinde `google*.html`, `BingSiteAuth.xml` gibi doğrulama dosyaları varsa bu projenin `public/` klasörüne kopyala.
2. Eski repodaki dosyaları sil, bu projeyi oraya kopyala (`node_modules`, `.output`, `.nuxt` hariç), `main` dalına push'la.
3. GitHub → repo **Settings → Pages → Source: GitHub Actions**.
4. Aynı sayfada **Custom domain: `yuda.dev`** ve **Enforce HTTPS** işaretli olsun (`public/CNAME` zaten var).
5. Actions sekmesinde "Deploy to GitHub Pages" iş akışının yeşil bittiğini kontrol et.

Eski görsel yolları (`/img/*.png`) korunur, `/terms.html` yeni `/sartlar` adresine yönlenir.

## 5. Cloudflare ayarları

- **SSL/TLS → Edge Certificates → Always Use HTTPS:** açık.
- **Rules → Redirect Rules:**
  - `www.yuda.dev/*` → `https://yuda.dev/${1}` (301)
  - `yuda.dev/terms.html` → `https://yuda.dev/sartlar` (301). Sitede yedek yönlendirme sayfası da var.
- **Managed robots.txt (AI eğitim botlarını engelleme):** açık kalabilir. Sitenin kendi robots.txt'si arama botlarına ve OAI-SearchBot/PerplexityBot'a izin verir.
- **Web Analytics:** etkinleştir (çerezsiz, KVKK banner'ı gerektirmez).
- **Speed → Brotli:** açık.

## 6. Yayın sonrası

1. [Google Search Console](https://search.google.com/search-console)'da `yuda.dev` alan adı mülkünü doğrula, `https://yuda.dev/sitemap.xml` gönder.
2. Google İşletme Profili'ni "hizmet bölgesi işletmesi" olarak aç (adres gizli). Ad, telefon ve bölge sitedekiyle birebir aynı olsun. Profil linkini `app/data/site.ts` → `sameAs`'a ekle.
3. [Rich Results Test](https://search.google.com/test/rich-results) ile bir ürün ve bir blog yazısını kontrol et.

## 7. Notlar

- `content/yasal/gizlilik.md` (KVKK) ve `sartlar.md` hukuki danışmanlık değildir; bir uzmana kontrol ettir.
- Ürün sayfalarındaki özellik ve gereksinim listeleri yalnızca eski sitedeki bilgileri içerir; gerçek teknik detayları `content/urunler/*.md` içine ekle.
- Windows'ta "Smart App Control" bazı imzasız native npm modüllerini engelleyebilir (`@nuxtjs/seo` meta paketi bu yüzden kullanılmadı, modüller tek tek kurulu).
