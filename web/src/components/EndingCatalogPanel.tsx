import { ENDING_CATALOG } from '@/data/endingCatalog'

type EndingCatalogPanelProps = {
  currentEventId: string
}

export function EndingCatalogPanel({ currentEventId }: EndingCatalogPanelProps) {
  return (
    <div className="max-h-80 overflow-y-auto rounded-xl border border-white/10 bg-deep-navy/90 p-4 text-left shadow-lg">
      <p className="mb-3 text-xs font-semibold tracking-wide text-cool-gray uppercase">
        엔딩 목록
      </p>

      <ul className="flex flex-col gap-3">
        {ENDING_CATALOG.map((entry) => {
          const isCurrent = entry.eventId === currentEventId

          return (
            <li
              key={entry.eventId}
              className={`rounded-lg border p-3 text-sm ${
                isCurrent
                  ? 'border-energy-red/60 bg-energy-red/10'
                  : 'border-white/10 bg-white/5'
              }`}
            >
              <div className="mb-1 flex flex-wrap items-center gap-2">
                <span className="font-semibold text-off-white">
                  {entry.eventLabel}
                </span>
                <span className="text-xs text-cool-gray">{entry.code}</span>
                {isCurrent && (
                  <span className="rounded bg-energy-red/20 px-1.5 py-0.5 text-xs font-medium text-energy-red">
                    현재 엔딩
                  </span>
                )}
              </div>

              <p className="font-semibold text-off-white">{entry.title}</p>
              <p className="mt-1 text-xs text-cool-gray">성적: {entry.grade}</p>
              <p className="mt-1 text-xs text-off-white/80">
                <span className="text-cool-gray">조건: </span>
                {entry.condition}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-cool-gray">
                {entry.summary}
              </p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
