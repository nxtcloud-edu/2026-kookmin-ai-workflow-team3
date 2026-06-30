type NarrativeBoxProps = {
  title: string
  text: string
}

export function NarrativeBox({ title, text }: NarrativeBoxProps) {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-blue/90 p-5 shadow-lg backdrop-blur-sm">
      <p className="mb-2 text-sm font-semibold tracking-wide text-energy-red uppercase">
        {title}
      </p>
      <p className="text-base leading-relaxed text-off-white">{text}</p>
    </div>
  )
}
