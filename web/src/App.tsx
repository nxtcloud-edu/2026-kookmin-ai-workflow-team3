import { useGameStore } from '@/store/gameStore'
import { EndingScreen } from '@/screens/EndingScreen'
import { EventScreen } from '@/screens/EventScreen'
import { TitleScreen } from '@/screens/TitleScreen'

function App() {
  const phase = useGameStore((state) => state.phase)

  if (phase === 'title') {
    return <TitleScreen />
  }

  if (phase === 'ending') {
    return <EndingScreen />
  }

  return <EventScreen />
}

export default App
