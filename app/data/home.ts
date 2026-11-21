/** Home page copy that is not a content collection (sectors, process, FAQ). */

export const processSteps = [
  {
    key: 'kesif',
    title: 'Keşif ve analiz',
    text: 'İşletmenizi, rakiplerinizi ve müşterilerinizin sizi nasıl aradığını konuşuruz. Hedefi tek cümleye indirir, ilk sürümün kapsamını netleştiririz.',
    out: 'Kapsam dokümanı ve yazılı teklif',
  },
  {
    key: 'tasarim',
    title: 'Tasarım ve prototip',
    text: 'Ana ekranları tıklanabilir bir prototip olarak hazırlarız. Kod yazmadan önce telefonunuzda dener, onaylarsınız.',
    out: 'Onaylı arayüz tasarımı',
  },
  {
    key: 'gelistirme',
    title: 'Geliştirme',
    text: 'Arayüz, API ve veritabanını iki haftalık döngülerle geliştiririz. Her döngünün sonunda çalışan bir sürüm görürsünüz.',
    out: 'Her sprintte test sürümü',
  },
  {
    key: 'guvenlik',
    title: 'Güvenlik testi ve kalite',
    text: 'Bug bounty deneyimimizle sistemi saldırgan gözüyle test ederiz. Farklı cihazlarda hız ve erişilebilirlik kontrolü yaparız.',
    out: 'Güvenlik ve kalite raporu',
  },
  {
    key: 'yayin',
    title: 'Yayın ve takip',
    text: 'Siteyi hızlı bir altyapıda yayına alır, Google\'a tanıtır, ilk haftalarda gerçek kullanım verisine göre iyileştiririz.',
    out: 'Canlı sistem ve bakım planı',
  },
] as const

export const sectors = [
  { icon: 'lucide:bed-double', title: 'Otel ve pansiyonlar', problem: 'Rezervasyonların büyük kısmı komisyonlu kanallardan geliyor.', solution: 'Doğrudan rezervasyon alan, çok dilli ve hızlı otel siteleri.', to: '/hizmetler/web-tasarim' },
  { icon: 'lucide:utensils-crossed', title: 'Restoran ve kafeler', problem: 'Menü güncel değil, rezervasyon telefonla yürüyor.', solution: 'QR menü, online rezervasyon ve sipariş sistemleri.', to: '/hizmetler/yazilim-gelistirme' },
  { icon: 'lucide:stethoscope', title: 'Sağlık turizmi ve klinikler', problem: 'Yurt dışı hastalarla iletişim dağınık, randevular karışıyor.', solution: 'Çok dilli tanıtım, randevu ve hasta takip panelleri.', to: '/hizmetler/yazilim-gelistirme' },
  { icon: 'lucide:building-2', title: 'Emlak ofisleri', problem: 'İlanlar portallarda kayboluyor, müşteri verisi Excel\'de.', solution: 'İlan yönetimi olan site ve basit bir müşteri takip sistemi.', to: '/hizmetler/web-tasarim' },
  { icon: 'lucide:sailboat', title: 'Tur ve tekne şirketleri', problem: 'Sezonda talepleri yetiştirmek zor, ödeme takibi elle.', solution: 'Online tur satışı, kontenjan ve ödeme entegrasyonu.', to: '/hizmetler/e-ticaret' },
  { icon: 'lucide:store', title: 'Yerel üretici ve mağazalar', problem: 'Pazaryeri komisyonları kârı eritiyor.', solution: 'Kendi e-ticaret siteniz, kargo ve stok entegrasyonu.', to: '/hizmetler/e-ticaret' },
] as const

export const homeFaqs = [
  { q: 'Antalya dışındaki işletmelerle de çalışıyor musunuz?', a: 'Evet. Antalya merkezliyiz ve Muratpaşa, Konyaaltı, Kepez, Aksu ve Döşemealtı\'ndaki işletmelerle yüz yüze görüşebiliyoruz; Türkiye\'nin her yerinden projeleri online olarak yürütüyoruz.' },
  { q: 'Bir web sitesi veya yazılım ne kadar sürede hazır olur?', a: 'Tanıtım odaklı bir kurumsal site genellikle 2–4 hafta, özel yazılım ve mobil uygulamalar ise kapsamına göre 1–3 ay sürer. Keşif görüşmesinden sonra net bir takvim veririz.' },
  { q: 'Fiyatları nasıl belirliyorsunuz?', a: 'Hazır paket satmıyoruz; fiyat sayfa sayısı, özellikler ve entegrasyonlara göre belirlenir. Ücretsiz ön görüşmeden sonra yazılı ve sabit bir teklif sunarız.' },
  { q: 'Teslimden sonra destek veriyor musunuz?', a: 'Evet. Teslimden sonra hata düzeltme garantisi veriyoruz; isterseniz aylık bakım ve güvenlik güncellemeleri için destek anlaşması yapabiliriz.' },
  { q: 'Sitem Google\'da üst sıralara çıkacak mı?', a: 'Hiçbir ajans sıralama garantisi veremez. Biz sitenizi teknik SEO, yerel SEO ve hız açısından doğru kurarız; Google İşletme Profili ve düzenli içerikle birlikte görünürlüğünüz artar.' },
  { q: 'Hazır scriptleriniz ile özel yazılım arasındaki fark ne?', a: 'Hazır scriptler belirli bir işi hemen çözen, tek seferlik ödemeli ürünlerdir. Özel yazılım ise tamamen sizin iş akışınıza göre geliştirilir. İsterseniz hazır bir scripti ihtiyacınıza göre özelleştirebiliriz.' },
] as const
