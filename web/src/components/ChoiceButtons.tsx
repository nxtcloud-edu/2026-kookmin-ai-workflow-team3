import type { Choice } from '@/game/types'

type ChoiceButtonsProps = {
  choices: Choice[]
  onSelect: (choiceId: string) => void
  disabled?: boolean
}

export function ChoiceButtons({
  choices,
  onSelect,
  disabled = false,
}: ChoiceButtonsProps) {
  return (
    <div className="flex flex-col gap-3">
      {choices.map((choice) => (
        <button
          key={choice.id}
          type="button"
          disabled={disabled}
          onClick={() => onSelect(choice.id)}
          className="rounded-lg border border-white/15 bg-deep-navy/80 px-4 py-3 text-left text-sm leading-relaxed text-off-white transition hover:border-energy-red/60 hover:bg-slate-blue disabled:cursor-not-allowed disabled:opacity-50"
        >
          <span className="mr-2 font-semibold text-energy-red">
            {choice.id}.
          </span>
          {choice.label}
        </button>
      ))}
    </div>
  )
}
