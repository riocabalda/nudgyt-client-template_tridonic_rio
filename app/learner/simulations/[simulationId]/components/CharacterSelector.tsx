'use client'

import StyledTooltip from '@/app/(shared)/components/StyledTooltip'
import { Avatar, AvatarFallback } from '@/app/(shared)/components/ui/avatar'
import serverConfig from '@/app/(shared)/config/serverConfig'
import { Character } from '@/app/(shared)/services/learner/characterService'
import { cn, generateAvatarInitials, getFirstName } from '@/app/(shared)/utils'
import { AvatarImage } from '@radix-ui/react-avatar'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'
import useCharacterSelectionStore from '../hooks/useCharacterSelectionStore'
import useGetScenario from '../hooks/useGetScenario'
import useGetScenarioCharacters from '../hooks/useGetScenarioCharacters'
import { useGetSimulation } from '../hooks/useGetSimulation'

function CharacterButton(props: { character: Character }) {
  const selectedCharacterId = useCharacterSelectionStore((store) => store.id)
  const selectCharacter = useCharacterSelectionStore(
    (store) => store.selectCharacter
  )
  const isSelectionEnabled = useCharacterSelectionStore(
    (store) => store.isSelectionEnabled
  )
  const { character } = props

  const button = (
    <button
      disabled={!isSelectionEnabled}
      onClick={() => selectCharacter(character.character_id)}
      className='disabled:opacity-50'
    >
      <Avatar
        className={cn(
          'size-7 lg:size-8',
          selectedCharacterId === character.character_id &&
            'border-2 border-white outline outline-2 outline-success'
        )}
      >
        <AvatarImage
          src={serverConfig.assetUrl + character.avatar}
          alt={character.name}
          className='w-full h-full object-cover'
        />
        <AvatarFallback
          className={cn(
            'select-none',
            'text-white text-sm font-medium lg:font-semibold',
            'bg-brandcolora'
          )}
        >
          {generateAvatarInitials(getFirstName(character.name))}
        </AvatarFallback>
      </Avatar>
    </button>
  )

  return (
    <StyledTooltip
      contentSide='top'
      withArrow={false}
      trigger={button}
      content={character.name}
    />
  )
}

function CharacterSelector() {
  const { simulationId } = useParams()

  const simulationFetch = useGetSimulation(String(simulationId))
  const simulation = simulationFetch.data?.data

  const { data: scenario } = useGetScenario(simulation?.scenario_id)

  const { data: characters } = useGetScenarioCharacters(
    scenario?.scenario_number
  )

  const selectedCharacterId = useCharacterSelectionStore((store) => store.id)
  const selectCharacter = useCharacterSelectionStore(
    (store) => store.selectCharacter
  )
  const resetCharacterSelection = useCharacterSelectionStore(
    (store) => store.reset
  )

  useEffect(() => {
    if (selectedCharacterId !== null) return
    if (characters === undefined) return
    if (characters.length < 1) return

    const firstChar = characters[0]
    selectCharacter(firstChar.character_id)
  }, [characters, selectedCharacterId])

  useEffect(() => {
    return () => {
      resetCharacterSelection()
    }
  }, [])

  return (
    <ol className='flex gap-3 lg:gap-4'>
      {characters?.map((character) => (
        <li key={character.character_id}>
          <CharacterButton character={character} />
        </li>
      ))}
    </ol>
  )
}

export default CharacterSelector
