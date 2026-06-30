import type { StatEffects } from '@/game/types'

type FeedbackOverlayProps = {
  message: string
  effects?: StatEffects
  onContinue: () => void
}

export function FeedbackOverlay({
  message,
  effects,
  onContinue,
}: FeedbackOverlayProps) {
  const trends = [
    { label: '선수단 분위기', value: effects?.teamMorale },
    { label: '국민 민심', value: effects?.publicSentiment },
  ].filter(
    (trend): trend is { label: string; value: number } =>
      trend.value !== undefined && trend.value !== 0,
  )

  return (
    <div className="absolute inset-0 z-20 flex items-end justify-center bg-deep-navy/70 p-6">
      <div className="w-full max-w-2xl animate-pulse rounded-xl border border-turf-green/40 bg-slate-blue/95 p-5 shadow-xl">
        <p className="mb-1 text-xs font-semibold tracking-wide text-turf-green uppercase">
          현장 분위기
        </p>
        <p className="mb-4 text-lg leading-relaxed text-off-white">{message}</p>
        {trends.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
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
        )}
        <button
          type="button"
          onClick={onContinue}
          className="rounded-lg bg-energy-red px-4 py-2 text-sm font-semibold text-white transition hover:bg-energy-red/90"
        >
          계속
        </button>
      </div>
    </div>
  )
}
