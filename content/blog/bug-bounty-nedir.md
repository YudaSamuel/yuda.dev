---
title: "Bug Bounty Nedir? Philips ve chess.com Deneyimimiz"
description: "Bug bounty programları nasıl işler, nasıl başlanır, nelere dikkat edilir? Philips ve chess.com'da raporladığımız açıklar üzerinden anlatıyoruz."
date: "2026-11-23"
keyword: "bug bounty nedir"
category: "gelistiriciler-icin"
tags: ["bug bounty", "siber güvenlik", "xss"]
cover: "/images/blog/bug-bounty-nedir.webp"
coverAlt: "Bug bounty nedir yazısı kapak görseli"
author: "Yuda"
relatedServices: ["siber-guvenlik"]
---

**Bug bounty**, bir şirketin belirlediği kapsam ve kurallar içinde güvenlik açığı bulup bildiren araştırmacılara para ödülü verdiği ya da onları bir teşekkür listesinde (Hall of Fame / Hall of Honors) andığı programdır. Para ödülü olmayan türüne **açık bildirim politikası** (Vulnerability Disclosure Policy, VDP) denir.

Philips'in koordineli açıklama programında Hall of Honors listesine girdik, chess.com'a da kalıcı bir XSS açığı raporladık. Aşağıda programların nasıl işlediğini ve bu iki deneyimden çıkardıklarımızı paylaşıyoruz.

## Bug bounty ile VDP arasındaki fark

| | Bug bounty | VDP (açık bildirim politikası) |
|---|---|---|
| Ödül | Önem derecesine göre para ödülü | Genellikle yok; teşekkür listesi olabilir |
| Nerede yürür? | Çoğunlukla HackerOne, Bugcrowd, Intigriti, YesWeHack gibi platformlarda | Şirketin kendi sayfasında veya bir platformda |
| Kapsam | Açıkça listelenmiş alan adları ve uygulamalar | Genellikle daha geniş, "tüm sistemlerimiz" olabilir |

Philips'in programı ikinci türdendir: şirket, güvenlik bildirimlerini nasıl kabul ettiğini açıklar ve geçerli bulgu raporlayan araştırmacıları Hall of Honors listesinde anar.

## Süreç adım adım

1. **Kapsamı okumak:** Programın hangi sistemlere izin verdiğini, hangi test türlerini (ör. hizmet aksatma, sosyal mühendislik) yasakladığını okursunuz.
2. **Keşif:** Uygulamanın nasıl çalıştığını, hangi alt alan adlarının yayında olduğunu, kullanıcı girdisinin nerelerden alındığını çıkarırsınız.
3. **Kontrollü test:** XSS, IDOR, yetkilendirme hataları ve hatalı yapılandırmalar gibi yaygın açık türlerini, başka kullanıcıların verisine dokunmadan denersiniz.
4. **Rapor:** Adım adım tekrar talimatı, etkisi, ekran görüntüsü ya da video ve önerilen çözümle bildirirsiniz.
5. **Değerlendirme:** Güvenlik ekibi bulguyu doğrular ve önem derecesini genellikle **CVSS** puanlamasıyla belirler. Açık kapatılana kadar herkese açık paylaşılmaz.

Her rapor kabul edilmez. Sık karşılaşılan sonuçlar şunlardır: **duplicate** (açığı başkası daha önce bildirmiş), **N/A** (kapsam dışı ya da açık sayılmıyor), **informative** (bilgi olarak not edildi ama ödül yok). Yeni başlayanların çoğu ilk raporlarında bunlarla karşılaşır; bu normaldir.

## Philips ve chess.com'dan çıkardıklarımız

**Philips:** Bazı alt alan adlarında güvenlik açıkları bulduk ve programın koordineli açıklama süreciyle raporladık; bulgular kabul edildi ve [Philips Hall of Honors](https://www.philips.com/a-w/security/coordinated-vulnerability-disclosure/hall-of-honors.html) listesinde yer aldık. Büyük kurumlarda ana site çoğu zaman iyi korunur. Açıklar daha az ilgi gören, eski kampanya ya da test için açılıp unutulmuş alt alan adlarında çıkar.

**chess.com:** Kalıcı (stored) XSS açığı bulduk. Stored XSS'te saldırganın girdiği zararlı kod sunucuda saklanır ve o içeriği görüntüleyen kullanıcıların tarayıcısında çalışır. Bu açık üzerinden hesaplara erişilebildiğini gösteren bir bulgu raporladık ve süreci bir [rapor videosuyla](https://www.youtube.com/watch?v=ikSVujJ8fp0) belgeledik.

İki deneyimin ortak dersleri:

- **Unutulan sistemler en büyük risktir.** Envanterinizde olmayan bir alt alan adını koruyamazsınız.
- **Kullanıcı girdisi asla güvenilir değildir.** Yorum, profil adı, mesaj gibi her alan doğru temizlenmezse XSS'e kapı açar.
- **Rapor anlaşılmazsa açık "tekrarlanamadı" diye kapanır.** Kısa, adım adım ve kanıtlı yazmak, açığı bulmak kadar önemlidir.

## Nasıl başlanır?

1. **Web temellerini öğrenin:** HTTP, çerezler, oturum yönetimi, tarayıcıda JavaScript'in nasıl çalıştığı.
2. **OWASP Top 10'u çalışın:** XSS, SQL enjeksiyonu, IDOR ve erişim kontrolü hatalarını gerçekten anlayın.
3. **Yasal ortamlarda pratik yapın:** Bilerek açık bırakılmış eğitim uygulamaları ve CTF yarışmaları bunun için var.
4. **Yalnızca izin verilen kapsamda test edin.** Türkiye'de izinsiz test, iyi niyetle yapılsa ve açık bildirilse bile **TCK 243** (bilişim sistemine girme) ve **TCK 244** (sistemi engelleme, verileri bozma) kapsamına girebilir. Bir programın "güvenli liman" ifadesi yalnızca kendi kapsamı için geçerlidir.
5. **Platformlarda profil oluşturun:** Kamuya açık programlarla başlayıp itibar kazandıkça özel programlara davet alırsınız.
6. **Not tutun:** Hangi hedefte neyi denediğinizi, hangi isteği gönderdiğinizi kaydedin. Hem raporu yazarken hem de aylar sonra benzer bir sistemle karşılaştığınızda en değerli kaynağınız bu notlar olur.

## İşletmeler için bir öneri: security.txt

Her işletmenin bug bounty programı açmasına gerek yok. Ama bir araştırmacı sitenizde açık bulduğunda size nasıl ulaşacağını bilmeli. Bunun standart yolu, sitenizin `/.well-known/security.txt` adresine konan kısa bir dosyadır (RFC 9116). İçinde güvenlik bildirimleri için bir iletişim adresi ve dosyanın geçerlilik tarihi yer alır. Bizim dosyamız [yuda.dev/.well-known/security.txt](https://yuda.dev/.well-known/security.txt) adresinde.

Sistemlerinizin düzenli olarak saldırgan gözüyle test edilmesi ise bu dosyadan daha önemli. Web sitesi, yönetim paneli ve API'leriniz için [siber güvenlik ve sızma testi](/hizmetler/siber-guvenlik) sayfamızda nasıl çalıştığımızı anlattık.
