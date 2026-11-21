---
title: "Yazılım Lisans Sistemi Nedir, Neden Gerekir?"
description: "Sattığınız script ve temaların izinsiz dağıtılmasını nasıl önlersiniz? Lisans sistemlerinin çalışma mantığı, sık yapılan hatalar ve dikkat edilecekler."
date: "2026-11-20"
keyword: "yazılım lisans sistemi"
category: "gelistiriciler-icin"
tags: ["lisans", "script", "güvenlik"]
cover: "/images/blog/lisans-sistemi-nedir.webp"
coverAlt: "Yazılım lisans sistemi nedir yazısı kapak görseli"
author: "Yuda"
relatedProducts: ["lisans-sistemi"]
relatedServices: ["yazilim-gelistirme"]
---

Bir script, tema ya da eklenti satıyorsanız, büyük ihtimalle şu durumla karşılaşmışsınızdır: Ürününüzü bir kişi satın alıyor, birkaç hafta sonra aynı ürün forumlarda ücretsiz dağıtılıyor ya da başka bir isimle satılıyor. Lisans sistemleri tam olarak bu sorunu azaltmak için var.

## Lisans sistemi nedir?

Lisans sistemi, yazılımınızın yalnızca hak sahibi kişiler tarafından kullanılmasını sağlayan bir doğrulama mekanizmasıdır. Temel mantık basittir:

1. Müşteri ürünü satın aldığında ona özel bir **lisans anahtarı** üretilir.
2. Yazılım kurulduğunda veya belirli aralıklarla, bu anahtarı sizin **lisans sunucunuza** gönderir.
3. Sunucu anahtarın geçerli olup olmadığını, hangi alan adı veya sunucu için verildiğini kontrol eder.
4. Doğrulama başarısızsa yazılım çalışmaz ya da sınırlı modda çalışır.

## Neden gerekir?

- **Gelir kaybını azaltır:** İzinsiz kopyalar, potansiyel müşterilerinizin ürünü ücretsiz bulmasına yol açar.
- **Kimin neyi kullandığını görürsünüz:** Hangi lisansın hangi alan adında aktif olduğunu bilmek, destek taleplerini yönetmeyi kolaylaştırır.
- **Güncellemeleri kontrol edersiniz:** Güncellemeleri yalnızca geçerli lisans sahiplerine sunabilirsiniz.
- **İş modelinizi esnetir:** Tek seferlik, yıllık ya da alan adı başına lisans gibi farklı modelleri uygulayabilirsiniz.

## Sık yapılan hatalar

**1. Kontrolü tek bir yere koymak.** Lisans kontrolü kodda tek bir fonksiyonda yapılıyorsa, o satırı silmek korumayı devre dışı bırakır. Kontrolleri ürünün akışına dağıtmak işi zorlaştırır.

**2. Sunucuya körü körüne güvenmek.** Sunucudan gelen "geçerli" cevabı doğrulamadan kabul etmek, sahte bir lisans sunucusuyla korumanın atlatılmasına yol açar. Cevapların imzalanması bu riski ciddi ölçüde azaltır.

**3. Lisans sunucusunu ihmal etmek.** Lisans sunucunuz çökerse, ödeme yapmış müşterileriniz de etkilenebilir. Kısa süreli bağlantı sorunlarında yazılımın hemen kilitlenmemesi için makul bir tolerans süresi tanımlanmalıdır.

**4. Kullanıcıyı cezalandırmak.** Hiçbir lisans sistemi yüzde yüz koruma sağlamaz. Amaç, kopyalamayı zahmetli hale getirirken dürüst müşteriye sorunsuz bir deneyim sunmaktır.

## Hangi lisans modelini seçmelisiniz?

Lisans sistemi yalnızca bir koruma aracı değil, aynı zamanda nasıl para kazanacağınızı belirleyen bir araçtır. En yaygın modeller şunlardır:

| Model | Nasıl çalışır? | Kime uygun? |
|---|---|---|
| **Tek seferlik, tek alan adı** | Müşteri bir kez öder, ürünü tek bir sitede kullanır. | Tema ve script satanlar; sade ve anlaşılır bir model. |
| **Tek seferlik, sınırlı güncelleme** | Ödeme kalıcıdır ama güncellemeler 6–12 ay için geçerlidir; sonrası yenileme ister. | Sürekli geliştirilen ürünler. |
| **Yıllık abonelik** | Lisans her yıl yenilenmezse ürün sınırlı modda çalışır. | Destek ve barındırma maliyeti olan ürünler. |
| **Geliştirici / ajans lisansı** | Birden fazla alan adında kullanım hakkı verir. | Müşterileri için kurulum yapan ajanslar. |

Hangi modeli seçerseniz seçin, lisans koşullarını satış sayfasında açıkça yazın. Müşterinin "bu lisans neyi kapsıyor?" sorusuna net cevap bulamaması, destek taleplerinin ve iade isteklerinin en sık sebebidir.

## Lisans sistemi kurarken kontrol listesi

Kendi sisteminizi yazsanız da hazır bir çözüm kullansanız da şu maddeleri kontrol edin:

- **Anahtar formatı:** Tahmin edilemeyen, rastgele üretilmiş anahtarlar kullanın; sıra numarası gibi tahmin edilebilir değerlerden kaçının.
- **Alan adı bağlama:** Lisansı alan adına bağlayın ama müşterinin taşınma veya test ortamı ihtiyacı için alan adı değiştirme imkânı bırakın.
- **İmzalı cevaplar:** Sunucu cevaplarını dijital olarak imzalayın; yazılım yalnızca imzası doğru cevaplara güvensin.
- **Tolerans süresi:** Sunucunuza ulaşılamadığında yazılım hemen kilitlenmesin; birkaç günlük bir tolerans tanıyın.
- **Kayıt ve izleme:** Aynı anahtarın kaç farklı yerde kullanıldığını izleyin; olağandışı kullanımı fark edebilin.
- **İptal ve iade:** İade edilen bir satışın lisansını panelden tek tıkla iptal edebilin.
- **Kişisel veri:** Lisans sunucusuna gereğinden fazla veri göndermeyin; alan adı ve sürüm bilgisi çoğu zaman yeterlidir. Toplanan veriyi gizlilik metninizde belirtin.

## Lisans sistemi dürüst müşteriyi rahatsız eder mi?

Doğru kurulursa etmez. Aktivasyon tek seferlik ve birkaç saniyelik olmalı, hata mesajları ne yapılacağını açıkça söylemeli ("Bu lisans başka bir alan adında aktif, panelden taşıyabilirsiniz" gibi). Müşteriniz lisans ekranıyla değil, ürününüzle uğraşmalı. Destek taleplerinde lisans sorunları sık görülüyorsa, sorun korsanlar değil kullanıcı deneyimidir.

## Kendiniz mi yazmalısınız?

Basit bir lisans kontrolü yazmak kolaydır; güvenli ve yönetilebilir bir sistem kurmak ise zaman alır. Anahtar üretimi, alan adı bağlama, lisans iptali, yönetim paneli ve imzalı cevaplar gibi parçaları tek tek geliştirmek yerine hazır bir altyapı kullanmak çoğu zaman daha mantıklıdır.

Ürünlerinizi korumak için hazırladığımız [Lisans Sistemi](/urunler/lisans-sistemi) scriptine göz atabilir, ürününüze özel bir entegrasyon gerekiyorsa [özel yazılım geliştirme](/hizmetler/yazilim-gelistirme) hizmetimiz için bizimle iletişime geçebilirsiniz.
