type FeedbackOverlayProps = {
  message: string
  onContinue: () => void
}

export function FeedbackOverlay({ message, onContinue }: FeedbackOverlayProps) {
  return (
    <div className="absolute inset-0 z-20 flex items-end justify-center bg-deep-navy/70 p-6">
      <div className="w-full max-w-2xl animate-pulse rounded-xl border border-turf-green/40 bg-slate-blue/95 p-5 shadow-xl">
        <p className="mb-1 text-xs font-semibold tracking-wide text-turf-green uppercase">
          현장 분위기
        </p>
        <p className="mb-4 text-lg leading-relaxed text-off-white">{message}</p>
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
