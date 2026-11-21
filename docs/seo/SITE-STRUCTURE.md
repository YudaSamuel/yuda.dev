# Site Yapısı

Mevcut yapı korunur; ajans şablonundaki **sektör** ve **vaka** katmanları eklenir. İlçe sayfası açılmaz (doorway riski; ilçeler hizmet bölgesi olarak schema ve metinde geçer).

```
/                                   Ana sayfa              Organization, ProfessionalService
├── /hizmetler/                     Hizmetler (pillar hub)
│   ├── /web-tasarim/               PILLAR: antalya web tasarım          Service
│   ├── /yazilim-gelistirme/        PILLAR: antalya özel yazılım         Service
│   ├── /mobil-uygulama/            PILLAR: antalya mobil uygulama       Service
│   ├── /e-ticaret/                 PILLAR: antalya e-ticaret sitesi     Service
│   └── /siber-guvenlik/            PILLAR: antalya sızma testi          Service
├── /sektorler/                     YENİ: sektör hub'ı
│   ├── /otel-pansiyon/             otel web sitesi, rezervasyon          Service (+ ilgili vaka)
│   ├── /restoran-kafe/             restoran web sitesi, QR menü
│   ├── /saglik-turizmi-klinik/     klinik web sitesi, randevu
│   ├── /emlak/                     emlak web sitesi, ilan yönetimi
│   ├── /tur-tekne/                 online tur satışı
│   └── /yerel-uretici/             yöresel ürün e-ticaret
├── /referanslar/                   Bug bounty + vaka listesi
│   └── /<vaka-slug>/               YENİ: vaka çalışması (min. 1.000 kelime)   Article
├── /urunler/                       Hazır scriptler                       Product+SoftwareApplication
├── /blog/                          Küme içerikleri                        BlogPosting
│   └── /kategori/{isletmeler-icin, gelistiriciler-icin}/
├── /hakkimizda/                    Yazar/ekip, E-E-A-T                   AboutPage, Person
├── /iletisim/                      Teklif formu                          ContactPage
└── /sartlar/, /gizlilik/
```

## Kalite kapıları (yerel hizmet şablonu)

| Sayfa türü | Min. kelime | Özgünlük |
|---|---|---|
| Hizmet sayfası | 800 | %100 |
| Sektör sayfası | 800 | %100: sektörün kendi sorunları, örnekleri |
| Vaka çalışması | 1.000 | %100: ölçülebilir sonuç |
| Blog yazısı | 600 | %100 |

Lokasyon sayfası açılırsa: 30'da uyarı, 50'de dur. **Plan: 0 lokasyon sayfası.**

## İç linkleme kuralları

1. Her blog yazısı → kendi kümesinin pillar sayfasına en az 1 link (zorunlu, test ile).
2. Pillar sayfa → kümedeki en iyi 3 yazıya "İlgili yazılar" ile link (mevcut).
3. Sektör sayfası → ilgili hizmet pillar'ı + ilgili vaka + 2 yazı.
4. Vaka çalışması → kullanılan hizmet(ler) + sektör sayfası.
5. Aynı kelimeyi hedefleyen iki sayfa yok; çakışma olursa yazı pillar'a yönlendirilir.

## Schema eklemeleri

- `ProfessionalService.hasOfferCatalog`: 5 hizmeti `Offer → Service` olarak listele.
- Sektör sayfaları: `Service` (`audience` = sektör) + `BreadcrumbList`.
- Vaka: `Article` + `about` (Service) + izinliyse müşteri `Organization`.
- Yazar: `Person` + `sameAs` (GitHub, LinkedIn) + `ProfilePage`.
