// Minimal static server for .output/public with GitHub Pages-like resolution:
// /path -> /path/index.html, then /path.html, else 404.html (status 404).
import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { extname, join, normalize } from 'node:path'

const root = join(process.cwd(), '.output', 'public')
const port = Number(process.env.PORT || process.argv[2] || 4173)
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.xml': 'application/xml', '.xsl': 'application/xml', '.txt': 'text/plain; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.jpg': 'image/jpeg' }

async function exists(p) { try { return (await stat(p)).isFile() } catch { return false } }

createServer(async (req, res) => {
  const url = decodeURIComponent(new URL(req.url, 'http://x').pathname)
  const base = join(root, normalize(url))
  if (!base.startsWith(root)) { res.writeHead(403).end(); return }
  for (const candidate of [base, join(base, 'index.html'), `${base}.html`]) {
    if (await exists(candidate)) {
      res.writeHead(200, { 'content-type': types[extname(candidate)] || 'application/octet-stream' })
      res.end(await readFile(candidate))
      return
    }
  }
  res.writeHead(404, { 'content-type': types['.html'] })
  res.end(await readFile(join(root, '404.html')).catch(() => 'Not found'))
}).listen(port, () => console.log(`serving ${root} on http://localhost:${port}`))
