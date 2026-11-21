// Mobile Lighthouse on key pages; fails if any category scores below 0.95.
// Usage: npm run generate && npm run check:lighthouse  (needs Chrome/Edge installed; set CHROME_PATH to override)
import { spawn } from 'node:child_process'
import * as chromeLauncher from 'chrome-launcher'
import lighthouse from 'lighthouse'

const PAGES = ['/', '/hizmetler/web-tasarim', '/urunler/proxy-chain', '/blog/antalya-web-sitesi-yaptirmak']
const MIN = 0.95
const port = 4800 + Math.floor(Math.random() * 500)
const server = spawn(process.execPath, ['scripts/serve.mjs', String(port)], { stdio: 'ignore', env: { ...process.env, PORT: String(port) } })
await new Promise((r) => setTimeout(r, 800))

// With TLS_KEY/TLS_CERT set, the local server speaks HTTP/2 over TLS like production (Cloudflare).
const scheme = process.env.TLS_KEY && process.env.TLS_CERT ? 'https' : 'http'
const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless=new', '--no-sandbox', ...(scheme === 'https' ? ['--ignore-certificate-errors'] : [])] })
let failed = false
try {
  for (const path of PAGES) {
    const { lhr } = await lighthouse(`${scheme}://localhost:${port}${path}`, {
      port: chrome.port,
      output: 'json',
      onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
      formFactor: 'mobile',
      screenEmulation: { mobile: true, width: 412, height: 823, deviceScaleFactor: 1.75, disabled: false },
    })
    const scores = Object.fromEntries(Object.entries(lhr.categories).map(([k, v]) => [k, v.score]))
    const bad = Object.entries(scores).filter(([, s]) => s < MIN)
    console.log(`${bad.length ? 'FAIL' : 'OK  '} ${path} ${JSON.stringify(scores)}`)
    for (const [cat] of bad) {
      const refs = lhr.categories[cat].auditRefs.filter((r) => r.weight > 0 && lhr.audits[r.id].score !== null && lhr.audits[r.id].score < 0.9)
      for (const r of refs.slice(0, 6)) console.log(`       ${cat}: ${r.id} (${lhr.audits[r.id].displayValue ?? lhr.audits[r.id].score})`)
    }
    if (bad.length) failed = true
  }
}
finally {
  await chrome.kill()
  server.kill()
}
process.exit(failed ? 1 : 0)
