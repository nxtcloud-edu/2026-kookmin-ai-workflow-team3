export type GamePhase = 'title' | 'event' | 'feedback' | 'ending'

export type StatEffects = {
  publicSentiment?: number
  teamMorale?: number
}

export type Choice = {
  id: string
  label: string
  next: string
  effects?: StatEffects
  feedback?: string
  setFlag?: string
}

export type EndingInfo = {
  code: string
  title: string
  grade: string
  epilogue: string
}

export type GameEvent = {
  id: string
  title: string
  background?: string
  text: string
  choices?: Choice[]
  autoNext?: string
  autoEffects?: StatEffects
  autoFeedback?: string
  type?: 'ending'
  ending?: EndingInfo
}

export type GameState = {
  phase: GamePhase
  publicSentiment: number
  teamMorale: number
  currentEventId: string
  feedback: string | null
  pendingNext: string | null
  flags: Record<string, boolean>
  tournamentResult: 'round-of-32' | 'eliminated' | null
}
