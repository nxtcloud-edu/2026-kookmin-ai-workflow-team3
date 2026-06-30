export type GamePhase = 'title' | 'chapter' | 'event' | 'feedback' | 'stats' | 'ending'

export type StatEffects = {
  publicSentiment?: number
  teamMorale?: number
}

export type ChoiceSnapshot = {
  currentEventId: string
  publicSentiment: number
  teamMorale: number
  flags: Record<string, boolean>
  tournamentResult: 'round-of-32' | 'eliminated' | null
}

/** 좌우 여백에 띄울 SNS·여론 댓글 (수치 비노출) */
export type PublicReaction = {
  text: string
  /** 콘텐츠 메타. 화면 배치는 런타임 랜덤 */
  side?: 'left' | 'right'
}

export type Choice = {
  id: string
  label: string
  next: string
  effects?: StatEffects
  feedback?: string
  /** 선택 직후·다음 이벤트에서 보여줄 여론 댓글 풀 */
  reactions?: PublicReaction[]
  setFlag?: string
}

export type EndingInfo = {
  code: string
  title: string
  grade: string
  epilogue: string
}

export type ChapterInfo = {
  label: string
  subtitle?: string
}

export type GameEvent = {
  id: string
  title: string
  background?: string
  /** 피드백(현장 반응) 단계에서 표시할 배경. 없으면 background 유지 */
  feedbackBackground?: string
  text: string
  choices?: Choice[]
  autoNext?: string
  autoEffects?: StatEffects
  autoFeedback?: string
  /** autoNext 이벤트의 여론 댓글 풀 */
  autoReactions?: PublicReaction[]
  type?: 'chapter' | 'ending'
  chapter?: ChapterInfo
  ending?: EndingInfo
}

export type GameState = {
  phase: GamePhase
  publicSentiment: number
  teamMorale: number
  currentEventId: string
  feedback: string | null
  feedbackEffects: StatEffects | null
  previousChoiceState: ChoiceSnapshot | null
  pendingNext: string | null
  flags: Record<string, boolean>
  tournamentResult: 'round-of-32' | 'eliminated' | null
}
