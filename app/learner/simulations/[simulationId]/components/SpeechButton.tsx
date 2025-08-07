import { cn } from '@/app/(shared)/utils'
import { Mic } from 'lucide-react'
import React, { useState } from 'react'
import useCharacterSelectionStore from '../hooks/useCharacterSelectionStore'
import useSimulationStore from '../hooks/useSimulationStore'

function SpeechButton({
  micPermission,
  handleStartListening,
  handleStopListening,
  className
}: {
  micPermission: string | null
  handleStartListening: () => void
  handleStopListening: () => void
  className?: string
}) {
  const [isHolding, setIsHolding] = useState(false)

  const { isStarted } = useSimulationStore()
  const selectedCharacterId = useCharacterSelectionStore((store) => store.id)

  const handleListening = () => {
    if (!isHolding) {
      handleStartListening()
    } else {
      handleStopListening()
    }
    setIsHolding(!isHolding)
  }

  const hasSelectedCharacter = selectedCharacterId !== null
  const canListen = isStarted && hasSelectedCharacter

  return (
    <button
      disabled={!canListen}
      className={cn(
        'p-[6px]',
        isHolding &&
          micPermission === 'granted' &&
          'text-white bg-destructive hover:bg-destructive/80 rounded-full',
        !isStarted && 'bg-muted rounded-full text-muted-foreground',
        className
      )}
      onClick={handleListening}
    >
      <Mic size={20} strokeWidth={1.5} />
    </button>
  )
}

export default SpeechButton
