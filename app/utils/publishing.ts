const istanbulDate = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Europe/Istanbul',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
})

/** Calendar day in Europe/Istanbul as 'YYYY-MM-DD'. */
export function todayInIstanbul(now: Date = new Date()): string {
  return istanbulDate.format(now)
}

/** A post is live when it is not a draft and its date is today or earlier (Istanbul). */
export function isPublished(post: { date: string | Date; draft?: boolean }, now: Date = new Date()): boolean {
  if (post.draft) return false
  const day = typeof post.date === 'string' ? post.date.slice(0, 10) : post.date.toISOString().slice(0, 10)
  return day <= todayInIstanbul(now)
}
