import { describe, expect, it } from 'vitest'
import { fileExists, readFile, readPage } from './helpers'

describe('generated output', () => {
  it('renders html with lang="tr"', () => {
    expect(readPage('/').querySelector('html')?.getAttribute('lang')).toBe('tr')
  })
  it('ships CNAME for yuda.dev', () => {
    expect(fileExists('CNAME')).toBe(true)
    expect(readFile('CNAME').trim()).toBe('yuda.dev')
  })
  it('ships .nojekyll', () => {
    expect(fileExists('.nojekyll')).toBe(true)
  })
  it('keeps legacy image paths', () => {
    for (const f of ['logo.png', 'logo_white.png', 'epin.png', 'proxy.png', 'lisans.png', 'shortener.png']) {
      expect(fileExists(`img/${f}`), f).toBe(true)
    }
  })
})
