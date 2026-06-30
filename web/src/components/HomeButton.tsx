import { useEffect, useState } from 'react'
import { useGameStore } from '@/store/gameStore'

export function HomeButton() {
  const [isOpen, setIsOpen] = useState(false)
  const resetGame = useGameStore((state) => state.resetGame)

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  const goHome = () => {
    setIsOpen(false)
    resetGame()
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 z-30 rounded-lg border border-white/20 bg-deep-navy/85 px-4 py-2 text-sm font-semibold text-off-white shadow-lg backdrop-blur-sm transition hover:border-white/40 hover:bg-slate-blue"
      >
        ⌂ 처음으로
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-deep-navy/80 p-6"
          onClick={() => setIsOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="home-confirm-title"
            className="w-full max-w-sm rounded-xl border border-white/15 bg-slate-blue p-6 text-center shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <h2
              id="home-confirm-title"
              className="mb-3 text-xl font-bold text-off-white"
            >
              처음으로 돌아갈까요?
            </h2>
            <p className="mb-6 text-sm leading-relaxed text-cool-gray">
              현재 진행 상황이 모두 초기화됩니다.
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                autoFocus
                onClick={() => setIsOpen(false)}
                className="rounded-lg border border-white/20 px-4 py-2 text-sm font-semibold text-off-white transition hover:border-white/40"
              >
                취소
              </button>
              <button
                type="button"
                onClick={goHome}
                className="rounded-lg bg-energy-red px-4 py-2 text-sm font-semibold text-white transition hover:bg-energy-red/90"
              >
                처음으로
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
