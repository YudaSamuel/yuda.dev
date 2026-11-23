import { describe, expect, it } from 'vitest'
import { isPublished, todayInIstanbul } from '~/utils/publishing'

describe('todayInIstanbul', () => {
  it('rolls over to the next day after 21:00 UTC', () => {
    expect(todayInIstanbul(new Date('2026-11-21T21:30:00Z'))).toBe('2026-11-22')
  })
  it('returns the Istanbul date at the 03:00 UTC build', () => {
    expect(todayInIstanbul(new Date('2026-11-22T03:00:00Z'))).toBe('2026-11-22')
  })
})

describe('YUDA_NOW (simulate a future build date)', () => {
  it('overrides the default clock', () => {
    process.env.YUDA_NOW = '2099-06-01T03:00:00Z'
    try {
      expect(todayInIstanbul()).toBe('2099-06-01')
      expect(isPublished({ date: '2099-01-01' })).toBe(true)
    }
    finally {
      delete process.env.YUDA_NOW
    }
  })
})

describe('isPublished', () => {
  const build = new Date('2026-11-22T03:00:00Z')
  it('publishes a post dated today', () => {
    expect(isPublished({ date: '2026-11-22' }, build)).toBe(true)
  })
  it('holds a post dated tomorrow', () => {
    expect(isPublished({ date: '2026-11-23' }, build)).toBe(false)
  })
  it('never publishes drafts', () => {
    expect(isPublished({ date: '2026-11-01', draft: true }, build)).toBe(false)
  })
  it('accepts ISO datetime strings by their date part', () => {
    expect(isPublished({ date: '2026-11-22T00:00:00.000Z' }, build)).toBe(true)
  })
})
