// Crawls the generated site (served locally) and fails on any broken internal link.
// Usage: npm run generate && npm run check:links
import { spawn } from 'node:child_process'
import { LinkChecker } from 'linkinator'

const port = 4300 + Math.floor(Math.random() * 500)
const server = spawn(process.execPath, ['scripts/serve.mjs', String(port)], { stdio: 'ignore', env: { ...process.env, PORT: String(port) } })
await new Promise((r) => setTimeout(r, 800))

const base = `http://localhost:${port}`
const checker = new LinkChecker()
const result = await checker.check({
  path: `${base}/`,
  recurse: true,
  // Only internal links: external sites are checked separately and may rate-limit.
  linksToSkip: async (link) => !link.startsWith(base),
})
server.kill()

const broken = result.links.filter((l) => l.state === 'BROKEN')
console.log(`checked ${result.links.length} links, broken: ${broken.length}`)
for (const b of broken) console.log(`  ${b.status} ${b.url}  <- ${b.parent}`)
process.exit(broken.length ? 1 : 0)
