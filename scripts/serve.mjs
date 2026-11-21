// Minimal static server for .output/public with GitHub Pages-like behaviour:
// /path -> /path/index.html, then /path.html, else 404.html (status 404).
// Text assets are gzip-compressed like on GitHub Pages / Cloudflare, so local
// Lighthouse numbers reflect production transfer sizes.
import { createServer } from 'node:http'
import { createSecureServer } from 'node:http2'
import { readFile, stat } from 'node:fs/promises'
import { extname, join, normalize } from 'node:path'
import { gzipSync } from 'node:zlib'

const root = join(process.cwd(), '.output', 'public')
const port = Number(process.env.PORT || process.argv[2] || 4173)
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.xml': 'application/xml', '.xsl': 'application/xml', '.txt': 'text/plain; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.jpg': 'image/jpeg', '.wasm': 'application/wasm' }
const compressible = new Set(['.html', '.css', '.js', '.json', '.xml', '.xsl', '.txt', '.svg'])

async function exists(p) {
  try { return (await stat(p)).isFile() }
  catch { return false }
}

function send(req, res, status, file, body) {
  const ext = extname(file)
  const headers = { 'content-type': types[ext] || 'application/octet-stream' }
  if (file.includes('/_nuxt/') || file.includes('\\_nuxt\\')) headers['cache-control'] = 'public, max-age=31536000, immutable'
  if (compressible.has(ext) && /\bgzip\b/.test(req.headers['accept-encoding'] || '')) {
    headers['content-encoding'] = 'gzip'
    body = gzipSync(body)
  }
  res.writeHead(status, headers)
  res.end(body)
}

// Optional HTTP/2 + TLS (like Cloudflare in production): set TLS_KEY and TLS_CERT to PEM file paths.
const tls = process.env.TLS_KEY && process.env.TLS_CERT
  ? { key: await readFile(process.env.TLS_KEY), cert: await readFile(process.env.TLS_CERT), allowHTTP1: true }
  : null
const make = tls ? (handler) => createSecureServer(tls, handler) : createServer

make(async (req, res) => {
  const url = decodeURIComponent(new URL(req.url, 'http://x').pathname)
  const base = join(root, normalize(url))
  if (!base.startsWith(root)) {
    res.writeHead(403).end()
    return
  }
  // Like GitHub Pages: a directory requested without a trailing slash gets a 301.
  if (!url.endsWith('/') && await exists(join(base, 'index.html'))) {
    res.writeHead(301, { location: `${url}/` })
    res.end()
    return
  }
  for (const candidate of [base, join(base, 'index.html'), `${base}.html`]) {
    if (await exists(candidate)) {
      send(req, res, 200, candidate, await readFile(candidate))
      return
    }
  }
  const notFound = join(root, '404.html')
  send(req, res, 404, notFound, await readFile(notFound).catch(() => Buffer.from('Not found')))
}).listen(port, () => console.log(`serving ${root} on ${tls ? 'https' : 'http'}://localhost:${port}`))
