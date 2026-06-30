export type StatTier = '붕괴' | '불안' | '중립' | '상승' | '고조'

export function getTier(value: number): StatTier {
  if (value <= -80) return '붕괴'
  if (value <= -30) return '불안'
  if (value <= 29) return '중립'
  if (value <= 79) return '상승'
  return '고조'
}

export function formatStat(value: number): string {
  const sign = value > 0 ? '+' : ''
  return `${sign}${value} (${getTier(value)})`
}
