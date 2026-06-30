import type { StatEffects } from '@/game/types'

type StatTrendBadgesProps = {
  effects?: StatEffects | null
}

export function StatTrendBadges({ effects }: StatTrendBadgesProps) {
  const trends = [
    { label: '선수단 분위기', value: effects?.teamMorale },
    { label: '국민 민심', value: effects?.publicSentiment },
  ].filter(
    (trend): trend is { label: string; value: number } =>
      trend.value !== undefined && trend.value !== 0,
  )

  if (trends.length === 0) return null

  return (
    <div className="flex flex-wrap gap-2">
      {trends.map((trend) => {
        const isUp = trend.value > 0

        return (
          <span
            key={trend.label}
            className={`rounded-full border px-3 py-1 text-sm font-semibold ${
              isUp
                ? 'border-turf-green/50 bg-turf-green/10 text-turf-green'
                : 'border-energy-red/50 bg-energy-red/10 text-energy-red'
            }`}
          >
            {trend.label} {isUp ? '↑' : '↓'}
          </span>
        )
      })}
    </div>
  )
}
