// Dev helper: converts legacy product PNGs to WebP and renders simple branded
// 1200x630 blog covers. Usage: node scripts/make-images.mjs
import sharp from 'sharp'
import { mkdirSync } from 'node:fs'

const products = { 'proxy-chain': 'proxy', 'lisans-sistemi': 'lisans', 'url-kisaltma': 'shortener', yudastore: 'epin' }
mkdirSync('public/images/urunler', { recursive: true })
for (const [slug, src] of Object.entries(products)) {
  await sharp(`public/img/${src}.png`).resize({ width: 1200, withoutEnlargement: true }).webp({ quality: 80 }).toFile(`public/images/urunler/${slug}.webp`)
}

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;')
export async function cover(slug, title, eyebrow) {
  const lines = []
  let line = ''
  for (const w of title.split(' ')) {
    if ((line + ' ' + w).trim().length > 26) { lines.push(line.trim()); line = w } else line += ' ' + w
  }
  lines.push(line.trim())
  const text = lines.map((l, i) => `<text x="80" y="${300 + i * 78}" font-family="Segoe UI, Arial, sans-serif" font-size="64" font-weight="600" fill="#f8fafc">${esc(l)}</text>`).join('')
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#042f2e"/><stop offset="1" stop-color="#0f172a"/></linearGradient></defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="1050" cy="120" r="220" fill="#14b8a6" opacity="0.18"/>
  <text x="80" y="200" font-family="Segoe UI, Arial, sans-serif" font-size="30" fill="#5eead4" letter-spacing="2">${esc(eyebrow.toUpperCase())}</text>
  ${text}
  <text x="80" y="570" font-family="Segoe UI, Arial, sans-serif" font-size="32" font-weight="700" fill="#f8fafc">yuda.dev</text>
</svg>`
  await sharp(Buffer.from(svg)).webp({ quality: 85 }).toFile(`public/images/blog/${slug}.webp`)
}

mkdirSync('public/images/blog', { recursive: true })
await cover('antalya-web-sitesi-yaptirmak', "Antalya'da Web Sitesi Yaptırmak: 2026 Rehberi", 'İşletmeler İçin')
await cover('lisans-sistemi-nedir', 'Yazılım Lisans Sistemi Nedir, Neden Gerekir?', 'Geliştiriciler İçin')
await cover('test-planlanmis', 'Planlanmış Test Yazısı', 'Test')
console.log('images done')
