// Runs only via `npm run test:build:filled` (YUDA_TEST_FILLED=1 build with phone, WhatsApp and form key set).
import { describe, expect, it } from 'vitest'
import { nodesOfType, readPage } from './helpers'

describe('filled config: quote form', () => {
  const page = readPage('/hizmetler/web-tasarim')
  const form = page.querySelector('form[action="https://api.web3forms.com/submit"]')
  it('renders a POST form to Web3Forms', () => {
    expect(form).not.toBeNull()
    expect(form!.getAttribute('method')?.toUpperCase()).toBe('POST')
  })
  it('carries access key, honeypot and redirect', () => {
    expect(form!.querySelector('input[name="access_key"]')!.getAttribute('value')).toBe('test-key')
    expect(form!.querySelector('input[name="botcheck"]')).not.toBeNull()
    expect(form!.querySelector('input[name="redirect"]')!.getAttribute('value')).toBe('https://yuda.dev/iletisim/tesekkurler/')
  })
  it('requires name, contact, message and KVKK consent', () => {
    for (const n of ['ad', 'iletisim', 'mesaj', 'kvkk']) {
      expect(form!.querySelector(`[name="${n}"]`)?.hasAttribute('required'), n).toBe(true)
    }
  })
  it('labels every visible field', () => {
    for (const el of form!.querySelectorAll('input:not([type="hidden"]):not([name="botcheck"]), select, textarea')) {
      const id = el.getAttribute('id')
      expect(id && form!.querySelector(`label[for="${id}"]`), el.getAttribute('name')!).toBeTruthy()
    }
  })
  it('preselects the current service', () => {
    expect(form!.querySelector('select[name="hizmet"] option[selected]')?.text).toBe('Web Tasarım')
  })
})

describe('filled config: product pages', () => {
  it('never show the floating WhatsApp button', () => {
    expect(readPage('/urunler/proxy-chain').querySelectorAll('a[href*="wa.me"]')).toHaveLength(0)
  })
})

describe('filled config: phone and WhatsApp', () => {
  const page = readPage('/hizmetler/web-tasarim')
  it('renders WhatsApp and tel links', () => {
    expect(page.querySelector('a[href="https://wa.me/905550000000"]')).not.toBeNull()
    expect(page.querySelector('a[href="tel:+905550000000"]')).not.toBeNull()
  })
  it('adds telephone to the business schema', () => {
    expect(nodesOfType(page, 'ProfessionalService')[0].telephone).toBe('+90 555 000 00 00')
  })
})
