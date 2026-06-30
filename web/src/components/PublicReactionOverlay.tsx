import { useEffect, useMemo } from 'react'
import type { PublicReaction } from '@/game/types'

type PublicReactionOverlayProps = {
  reactions: PublicReaction[]
  onComplete: () => void
}

type PlacedReaction = PublicReaction & {
  top: number
  side: 'left' | 'right'
  delay: number
  duration: number
  tilt: number
}

const MAX_VISIBLE = 7
/** 오버레이 전체 노출 시간 — 루프 애니메이션이 이 동안 반복됨 */
const OVERLAY_DURATION_MS = 16_000

function shuffle<T>(items: T[]): T[] {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

function assignBalancedSides(count: number): Array<'left' | 'right'> {
  const leftCount =
    Math.floor(count / 2) + (count % 2 === 1 && Math.random() > 0.5 ? 1 : 0)
  return shuffle([
    ...Array.from({ length: leftCount }, () => 'left' as const),
    ...Array.from({ length: count - leftCount }, () => 'right' as const),
  ])
}

function placeReactions(reactions: PublicReaction[]): PlacedReaction[] {
  const picked = shuffle(reactions).slice(0, MAX_VISIBLE)
  const tops: number[] = []
  const sides = assignBalancedSides(picked.length)

  return picked.map((reaction, index) => {
    let top = 14
    let attempts = 0
    do {
      top = 10 + Math.random() * 62
      attempts += 1
    } while (tops.some((value) => Math.abs(value - top) < 10) && attempts < 24)
    tops.push(top)

    return {
      ...reaction,
      top,
      side: sides[index],
      delay: index * (0.5 + Math.random() * 0.55),
      duration: 5.5 + Math.random() * 1.2,
      tilt: (Math.random() - 0.5) * 3,
    }
  })
}

export function PublicReactionOverlay({
  reactions,
  onComplete,
}: PublicReactionOverlayProps) {
  const placed = useMemo(() => placeReactions(reactions), [reactions])

  useEffect(() => {
    if (placed.length === 0) {
      onComplete()
      return
    }

    const timer = window.setTimeout(onComplete, OVERLAY_DURATION_MS)
    return () => window.clearTimeout(timer)
  }, [placed, onComplete])

  if (placed.length === 0) return null

  return (
    <div
      className="pointer-events-none absolute inset-0 z-20 overflow-hidden"
      aria-hidden
    >
      {placed.map((reaction, index) => (
        <div
          key={`${reaction.text}-${index}`}
          className={`absolute ${reaction.side === 'left' ? 'left-[6%] md:left-[10%]' : 'right-[6%] md:right-[10%]'}`}
          style={{
            top: `${reaction.top}%`,
            transform: `rotate(${reaction.tilt}deg)`,
          }}
        >
          <div
            className="reaction-bubble max-w-[min(15rem,42vw)] rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm leading-relaxed text-deep-navy shadow-xl md:max-w-[17rem] md:px-5 md:py-3.5 md:text-base"
            style={{
              ['--reaction-delay' as string]: `${reaction.delay}s`,
              ['--reaction-duration' as string]: `${reaction.duration}s`,
            }}
          >
            <span className="text-xs font-medium text-cool-gray md:text-sm">
              @익명
            </span>
            <p className="mt-1 font-medium">{reaction.text}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
