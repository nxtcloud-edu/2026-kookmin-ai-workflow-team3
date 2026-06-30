import { useGameStore } from '@/store/gameStore'

export function TitleScreen() {
  const startGame = useGameStore((state) => state.startGame)

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center px-6">
      <div className="absolute inset-0 bg-linear-to-b from-slate-blue to-deep-navy" />
      <div className="relative z-10 max-w-xl text-center">
        <p className="mb-3 text-sm tracking-[0.2em] text-cool-gray uppercase">
          Visual Novel
        </p>
        <h1 className="mb-4 text-4xl font-bold text-off-white md:text-5xl">
          내가 홍명보라면
        </h1>
        <p className="mb-8 text-base leading-relaxed text-cool-gray">
          2026 북중미 월드컵까지, 감독 홍명보의 선택을 직접 경험해 보세요.
        </p>
        <button
          type="button"
          onClick={startGame}
          className="rounded-lg bg-energy-red px-8 py-3 text-base font-semibold text-white transition hover:bg-energy-red/90"
        >
          게임 시작
        </button>
      </div>
    </main>
  )
}
