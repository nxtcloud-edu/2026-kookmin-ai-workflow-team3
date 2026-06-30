import { useGameStore } from '@/store/gameStore'

const TIERS = [
  { label: '고조', min: 80 },
  { label: '상승', min: 30 },
  { label: '중립', min: -29 },
  { label: '불안', min: -79 },
  { label: '붕괴', min: -Infinity },
] as const

function getTier(value: number) {
  return TIERS.find((t) => value >= t.min)?.label ?? '붕괴'
}

function StatBar({ label, value }: { label: string; value: number }) {
  const tier = getTier(value)
  const color =
    value >= 30
      ? 'bg-green-500'
      : value >= -29
        ? 'bg-yellow-400'
        : 'bg-red-500'

  return (
    <div className="mb-6">
      <div className="mb-1 flex items-center justify-between text-sm text-cool-gray">
        <span>{label}</span>
        <span className="font-semibold text-off-white">
          {value >= 0 ? '+' : ''}
          {value} <span className="text-xs text-cool-gray">({tier})</span>
        </span>
      </div>
      <div className="h-3 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className={`h-full rounded-full transition-all ${color}`}
          style={{ width: `${Math.min(100, Math.max(0, (value + 100) / 2))}%` }}
        />
      </div>
    </div>
  )
}

export function StatsScreen() {
  const publicSentiment = useGameStore((state) => state.publicSentiment)
  const teamMorale = useGameStore((state) => state.teamMorale)
  const dismissFeedback = useGameStore((state) => state.dismissFeedback)

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center px-6">
      <div className="absolute inset-0 bg-linear-to-b from-slate-blue to-deep-navy" />
      <div className="relative z-10 w-full max-w-md">
        <p className="mb-2 text-center text-xs tracking-[0.2em] text-cool-gray uppercase">
          월드컵 본선 진출 확정
        </p>
        <h2 className="mb-8 text-center text-2xl font-bold text-off-white">
          현재 상태
        </h2>

        <div className="rounded-xl bg-white/5 p-6 backdrop-blur">
          <StatBar label="국민 민심" value={publicSentiment} />
          <StatBar label="선수단 분위기" value={teamMorale} />
        </div>

        <p className="mt-6 text-center text-sm text-cool-gray">
          이 수치는 이후 이벤트 분기와 최종 엔딩에 영향을 줍니다.
        </p>

        <button
          type="button"
          onClick={dismissFeedback}
          className="mt-8 w-full rounded-lg bg-energy-red px-8 py-3 text-base font-semibold text-white transition hover:bg-energy-red/90"
        >
          월드컵 본선으로 →
        </button>
      </div>
    </main>
  )
}
