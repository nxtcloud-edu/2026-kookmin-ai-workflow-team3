export type TournamentResult = 'round-of-32' | 'eliminated'

export function resolve6_4Branch(teamMorale: number): {
  eventId: string
  tournamentResult: TournamentResult
} {
  if (teamMorale >= 60) {
    return { eventId: 'event-6-4-3', tournamentResult: 'round-of-32' }
  }
  if (teamMorale >= 0) {
    return { eventId: 'event-6-4-2', tournamentResult: 'round-of-32' }
  }
  return { eventId: 'event-6-4-1', tournamentResult: 'eliminated' }
}

export function resolveEndingId(
  publicSentiment: number,
  teamMorale: number,
  flags: Record<string, boolean>,
  tournamentResult: TournamentResult,
): string {
  if (tournamentResult === 'eliminated') {
    if (teamMorale <= -80 && flags['event-6-1-C']) {
      return 'event-7-6'
    }
    if (publicSentiment >= -140 && teamMorale <= -30) {
      return 'event-7-7'
    }
    return 'event-7-8'
  }

  if (teamMorale >= 140 && publicSentiment >= -55) {
    return 'event-7-2'
  }
  if (publicSentiment >= -120 && teamMorale >= 40) {
    return 'event-7-3'
  }
  if (publicSentiment <= -150 && teamMorale >= 50) {
    return 'event-7-5'
  }
  return 'event-7-4'
}
