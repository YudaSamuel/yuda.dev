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

// Logos (2x for h-8 = 32px) and favicons.
await sharp('public/img/logo.png').resize({ height: 64 }).webp({ quality: 90 }).toFile('public/images/logo.webp')
await sharp('public/img/logo_white.png').resize({ height: 64 }).webp({ quality: 90 }).toFile('public/images/logo-white.webp')
const mark = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#09090b"/><path d="M24 20 12 32l12 12M40 20l12 12-12 12" stroke="#ff3131" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M35 16 29 48" stroke="#fff" stroke-width="5" stroke-linecap="round"/></svg>`
const { writeFileSync } = await import('node:fs')
writeFileSync('public/favicon.svg', mark)
await sharp(Buffer.from(mark)).resize(180, 180).png().toFile('public/apple-touch-icon.png')
const png32 = await sharp(Buffer.from(mark)).resize(32, 32).png().toBuffer()
// ICO container holding one 32x32 PNG.
const header = Buffer.alloc(22)
header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(1, 4)
header.writeUInt8(32, 6); header.writeUInt8(32, 7); header.writeUInt8(0, 8); header.writeUInt8(0, 9)
header.writeUInt16LE(1, 10); header.writeUInt16LE(32, 12)
header.writeUInt32LE(png32.length, 14); header.writeUInt32LE(22, 18)
writeFileSync('public/favicon.ico', Buffer.concat([header, png32]))
console.log('logos + favicons done')
