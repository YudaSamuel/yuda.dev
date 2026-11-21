---
title: "WordPress Siteniz Hacklendi mi? 7 Belirti ve Çözüm"
description: "WordPress sitenizin hacklendiğini gösteren 7 belirti, ilk 24 saatte yapılması gerekenler ve sitenizi tekrar hacklenmekten korumanın yolları."
date: "2026-11-25"
keyword: "wordpress hacklendi"
category: "isletmeler-icin"
tags: ["wordpress", "siber güvenlik", "web sitesi güvenliği"]
cover: "/images/blog/wordpress-hacklendi-mi.webp"
coverAlt: "WordPress siteniz hacklendi mi yazısı kapak görseli"
author: "Yuda"
relatedServices: ["siber-guvenlik", "web-tasarim"]
---

WordPress sitenizin hacklendiğini en hızlı üç yerden anlarsınız: Google Search Console'daki **Güvenlik sorunları** raporu, Google'da `site:alanadiniz.com` aramasında tanımadığınız sayfalar ve WordPress **Kullanıcılar** listesinde sizin açmadığınız bir yönetici hesabı.

Saldırıların çoğu sessizdir. Site açılmaya devam eder; ama arka planda spam sayfaları yayınlanır, Google'dan gelen ziyaretçiler başka sitelere yönlendirilir ya da sunucunuz spam göndermek için kullanılır.

## 7 belirti

**1. Google uyarı gösteriyor.** Arama sonuçlarında "Bu site saldırıya uğramış olabilir" yazısı ya da Chrome'da kırmızı uyarı ekranı, Google'ın sitenizde zararlı içerik tespit ettiğini gösterir.

**2. Ziyaretçiler başka sitelere yönleniyor, siz fark etmiyorsunuz.** Yönlendirme kodları çoğu zaman **giriş yapmış yöneticileri atlar** ve yalnızca mobilden ya da Google aramasından gelenleri yönlendirir. Bu yüzden site sahibine normal görünür. Sitenizi çıkış yapmış halde, telefondan ve Google'da arayıp tıklayarak açın.

**3. Google'da oluşturmadığınız sayfalar var.** `site:` aramasında Japonca ürün sayfaları, ilaç reklamları ya da yüzlerce tanımadığınız sayfa görüyorsanız sitenize spam içerik eklenmiştir.

**4. Tanımadığınız yönetici hesapları var.** Saldırganlar kalıcı arka kapı için yönetici açar. Bazıları panelde görünmez; doğrudan veritabanındaki `wp_users` ve `wp_usermeta` tablolarında durur.

**5. Site yavaşladı veya barındırma firması uyardı.** Ani işlemci kullanımı ya da "hesabınız spam gönderiyor" uyarısı, sunucunuzun kötüye kullanıldığını gösterebilir.

**6. E-postalarınız spama düşüyor.** Sunucunuzdan izinsiz toplu e-posta gönderildiyse sunucu IP'niz veya alan adınız kara listelere girebilir; özellikle paylaşımlı barındırmada normal e-postalarınız da müşteriye ulaşmaz.

**7. Dosyalarda tuhaf değişiklikler var.** Tema dosyalarına eklenmiş anlamsız kod blokları, `uploads` klasöründe PHP dosyaları, `mu-plugins` klasöründe tanımadığınız dosyalar ciddi uyarı işaretleridir.

## WordPress siteniz hacklendiyse ilk 24 saatte yapılacaklar

1. **Siteyi bakım moduna alın ve barındırma firmanıza haber verin.** Çoğu firma, sunucu tarafında tarama ve kayıt desteği verir.
2. **Mevcut durumun kopyasını alın.** Hacklenmiş dosyaları ve veritabanını silmeden önce yedekleyin; saldırının nasıl gerçekleştiğini anlamak için gerekir.
3. **Tüm parolaları değiştirin:** WordPress yöneticileri, barındırma paneli, FTP/SFTP, veritabanı ve e-posta. Mümkünse iki aşamalı doğrulamayı açın.
4. **Oturumları sonlandırın.** `wp-config.php` dosyasındaki güvenlik anahtarlarını (salt) yenileyin; böylece saldırganınki dahil açık tüm oturumlar kapanır.
5. **Çekirdeği doğrulayın ve yeniden kurun.** WP-CLI kullanıyorsanız `wp core verify-checksums` değiştirilmiş çekirdek dosyalarını gösterir. Çekirdeği temiz kopyayla yeniden yükleyin.
6. **Saklanma yerlerini kontrol edin:** `.htaccess`, `wp-config.php`, `mu-plugins`, zamanlanmış görevler (cron), `uploads` içindeki PHP dosyaları ve veritabanındaki kullanıcı tabloları.
7. **Eklenti ve temaları güncelleyin, kullanılmayanları silin.** En sık giriş kapıları: güncellenmemiş eklentiler, "nulled" (korsan) temalar ve zayıf parolalar.
8. **Kişisel veri sızdıysa KVKK bildirimini unutmayın.** Müşteri verisi (ad, telefon, e-posta, sipariş bilgisi) ele geçirilmiş olabilirse, Kişisel Verileri Koruma Kurulu'na gecikmeksizin ve en geç **72 saat** içinde bildirim yapılması gerekir; etkilenen kişilere de bilgi verilmelidir.
9. **Google'dan inceleme isteyin.** Temizledikten sonra Search Console'daki Güvenlik sorunları bölümünden inceleme talep edin.

Temiz bir yedekten geri dönmek hızlıdır; ama açık kapatılmadan geri yüklenen site çoğu zaman kısa sürede tekrar hacklenir.

## Saldırgan içeri nasıl girdi?

Barındırma panelinizdeki **erişim kayıtları** (access log), şüpheli dosyaların oluştuğu saatlerde hangi adreslere istek yapıldığını gösterir. Belirli bir eklenti dosyasına yoğun istekler, `xmlrpc.php` ya da giriş sayfasına binlerce deneme gibi kalıplar açığın kaynağını işaret eder. Kaynağı bulmadan yapılan temizlik geçicidir.

## Tekrar yaşamamak için

- Güncellemeleri ertelemeyin; eklenti güncellemelerinin önemli bir kısmı güvenlik açıklarını kapatır.
- Az eklenti kullanın, korsan tema ve eklentiden uzak durun.
- Yöneticilerde güçlü parola ve iki aşamalı doğrulama kullanın.
- Herkese yönetici yetkisi vermeyin; içerik ekleyen çalışanlar için Editör veya Yazar rolü yeterlidir.
- Yedekleri başka bir yerde saklayın ve geri yüklenebildiğini düzenli test edin.
- Cloudflare gibi bir güvenlik duvarıyla bilinen saldırı kalıplarını sitenize ulaşmadan engelleyin.
- Form, üyelik veya ödeme alan sitelerde yılda en az bir kez güvenlik testi yaptırın.

Philips Hall of Honors listesinde yer alan ve chess.com'a stored XSS raporlamış biri olarak, hacklenmiş sitelerde açığın kaynağını bulma ve kapatma konusunda destek veriyoruz; ayrıntılar [siber güvenlik ve sızma testi](/hizmetler/siber-guvenlik) sayfamızda. Sitenizin güncellemelerini düzenli olarak bizim yapmamızı isterseniz [web tasarım hizmetimizdeki](/hizmetler/web-tasarim) bakım seçeneğine bakabilirsiniz.
