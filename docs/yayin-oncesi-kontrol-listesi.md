# Yayın Öncesi Kontrol Listesi

Siteyi yayına almadan önce doldurman gereken gerçek bilgiler ve eklenmesi önerilen görseller.
Bilgilerin çoğu tek dosyada: `app/data/site.ts`.

## 1. İletişim ve işletme bilgileri (`app/data/site.ts`)

| Alan | Şu anki değer | Ne yapılmalı |
|---|---|---|
| `business.name` | `Yuda` | Google İşletme Profili'ndeki adla **birebir** aynı olmalı (resmi unvan farklıysa söyle). |
| `business.phone` | boş | Telefon numarası (`+90 5XX XXX XX XX`). Boşken telefon linkleri ve schema `telephone` hiç görünmez. |
| `business.whatsapp` | boş | WhatsApp numarası. Boşken WhatsApp butonları gizlidir. |
| `business.email` | `contact@yuda.dev` | Doğru mu kontrol et. |
| `business.areaServed` | Antalya, Muratpaşa, Konyaaltı, Kepez, Aksu, Döşemealtı | Gerçekten hizmet verdiğin bölgeler. Google İşletme Profili'ndeki hizmet bölgesiyle aynı olmalı. |
| `business.sameAs` | GitHub | Google İşletme Profili linki, LinkedIn, Instagram vb. ekle. |
| `form.accessKey` | boş | Web3Forms anahtarı (ücretsiz, web3forms.com). Boşken form yerine e-posta uyarısı görünür. |
| `author.name` / `author.image` | `Yuda` / boş | Blog yazar kutusu için gerçek ad ve fotoğraf (E-E-A-T). |
| `projects` | boş | Tamamlanan projeler (müşteri izniyle). Boşken bölüm gizlenir. |

## 2. Schema (yapılandırılmış veri)

- **ProfessionalService (LocalBusiness):** Telefon, hizmet bölgesi ve `sameAs` yukarıdaki alanlardan otomatik dolar. Sokak adresi bilinçli olarak yok (hizmet bölgesi işletmesi).
- **Organization:** Logo `https://yuda.dev/img/logo.png`. Logo değişirse güncelle.
- **Product + SoftwareApplication (ürün sayfaları):** Her ürünün gerçek teknik gereksinimleri (`requirements`), özellik listesi ve varsa demo linki `content/urunler/*.md` içinde doldurulmalı. Şu an yalnızca eski sitedeki kısa açıklamalar var.

## 3. İçerik doğrulaması

- [ ] `/hakkimizda` metni: kim olduğun, deneyim yılı, ekip (Task 9'da yer tutucuyla gelecek).
- [ ] Eski sitedeki "100+ mutlu müşteri", "5+ yıl", "7/24 destek" gibi iddialar **kullanılmadı**. Doğruysa söyle, eklenir.
- [ ] Hizmet sayfalarındaki süre ve süreç bilgileri (örn. "kurumsal site 2–4 hafta") gerçek çalışma şeklinle uyumlu mu?
- [ ] KVKK metni (`content/yasal/gizlilik.md`) hukuki danışmanlık değildir. Bir uzmana kontrol ettir.
- [ ] Test yazıları (`content/blog/test-planlanmis.md`, `test-taslak.md`) yayında görünmez. Testler için duruyorlar.

## 4. Eklenmesi önerilen gerçek görseller (`./photos` klasörü yoktu)

Şu an tüm görseller SVG diyagram veya üretilmiş kapak. Güven ve dönüşüm için önerilenler:

1. **Senin/ekibin fotoğrafı:** Hakkımızda sayfası ve blog yazar kutusu için (kare, en az 600×600).
2. **Çalışma ortamı fotoğrafı:** Antalya'da çekilmiş, doğal (yatay, en az 1600×1000). Ana sayfa "Neden Yuda" bölümüne eklenebilir.
3. **Proje ekran görüntüleri:** Tamamlanan müşteri projeleri (izinli), masaüstü + mobil (16:10).
4. **Ürün ekran görüntüleri:** Her script için 2–3 gerçek arayüz görüntüsü (16:9, en az 1280 genişlik). Şu an eski sitedeki tanıtım görselleri kullanılıyor.
5. **Logo dosyası:** Logonun vektör (SVG) aslı varsa ver. Şu an sitede `</ YUDA >` Outfit fontuyla yeniden çizildi.

Görselleri `photos/` klasörüne koyman yeterli. WebP'ye çevirip yerleştiririm.

## 5. Yayın ayarları (Task 11 README'de ayrıntılı)

- [ ] Cloudflare: "Always Use HTTPS" açık, `www` → `https://yuda.dev` 301, `/terms.html` → `/sartlar` 301.
- [ ] GitHub Pages: Source = GitHub Actions, custom domain `yuda.dev`, Enforce HTTPS.
- [ ] Google Search Console: domain doğrula, `https://yuda.dev/sitemap.xml` gönder.
- [ ] Google İşletme Profili: "hizmet bölgesi işletmesi" olarak aç, linkini `sameAs`'a ekle.
