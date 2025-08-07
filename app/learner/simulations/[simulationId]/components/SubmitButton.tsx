import { Button } from '@/app/(shared)/components/ui/button'
import { cn } from '@/app/(shared)/utils'
import { ArrowUp } from 'lucide-react'
import React from 'react'
import useCharacterSelectionStore from '../hooks/useCharacterSelectionStore'

function SubmitButton({
  onSubmit,
  className
}: {
  onSubmit: () => void
  className?: string
}) {
  const selectedCharacterId = useCharacterSelectionStore((store) => store.id)

  const hasSelectedCharacter = selectedCharacterId !== null
  const canSubmit = hasSelectedCharacter

  return (
    <Button
      disabled={!canSubmit}
      className={cn('flex rounded-full text-white h-8 min-w-8 !p-0', className)}
      onClick={onSubmit}
    >
      <ArrowUp size={20} strokeWidth={1.5} />
    </Button>
  )
}

export default SubmitButton
