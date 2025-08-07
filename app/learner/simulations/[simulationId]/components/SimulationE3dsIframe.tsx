import FetchError from '@/app/(shared)/components/FetchError'
import scenarioService from '@/app/(shared)/services/learner/scenarioService'
import { SimulationType } from '@/app/(shared)/services/learner/simulationService'
import transcriptService, {
  TranscriptPayload
} from '@/app/(shared)/services/learner/transcriptService'
import {
  replaceLongSpacesWithNewline,
  sendToEagle3d
} from '@/app/(shared)/utils'
import { Loader } from 'lucide-react'
import React, { useEffect } from 'react'
import useSWR from 'swr'
import { z } from 'zod'
import useCharacterSelectionStore from '../hooks/useCharacterSelectionStore'
import { useGetTranscripts } from '../hooks/useGetTranscripts'
import useGetUserTimeRemaining from '../hooks/useGetUserTimeRemaining'
import useSimulationStore from '../hooks/useSimulationStore'
import SimulationModal, { ModalTitle } from './SimulationModal'
import TimerValue from './TimerValue'

const ConvaiResponseSchema = z.object({
  From: z.string(),
  Name: z.string(),
  CharacterID: z.string(),
  DialogueValue: z.string()
})

function SimulationE3dsIframe({ simulation }: { simulation: SimulationType }) {
  const { userTimeRemaining, isLoading, error } = useGetUserTimeRemaining()

  const { startSimulation } = useSimulationStore()

  const {
    data: scenarioData,
    isLoading: isLoadingScenarioData,
    error: errorScenarioData
  } = useSWR(`/learner/scenarios/${simulation?.scenario_id}`, () =>
    scenarioService
      .getScenarioById(simulation?.scenario_id)
      .then((res) => res.data)
  )

  const { mutate } = useGetTranscripts(simulation?._id)

  const saveTranscript = async (transcriptData: TranscriptPayload) => {
    await transcriptService.saveTranscript(transcriptData)
    mutate()
  }

  const selectedCharacterId = useCharacterSelectionStore((store) => store.id)
  const enableCharacterSelection = useCharacterSelectionStore(
    (store) => store.enableSelection
  )

  const initializeSimulation = (simulationId: string) => {
    sendToEagle3d({
      simulationId
    })
  }

  useEffect(() => {
    const eventHandler = (event: MessageEvent) => {
      const isResponseFromE3dServer = event.data.type
      const isResponseFromConvai =
        typeof event.data === 'string' && event.data.includes('DialogueValue')

      if (isResponseFromE3dServer) {
        if (event.data.type === 'stage5_playBtnPressed') {
          initializeSimulation(simulation._id)
          startSimulation()
        }
      }

      if (isResponseFromConvai) {
        const data = replaceLongSpacesWithNewline(event.data)
        const parsedData = JSON.parse(data)
        const parsedDataTrimmedKeys = Object.fromEntries(
          Object.entries(parsedData).map(([key, value]) => [key.trim(), value])
        )

        const { data: convaiResponse } = ConvaiResponseSchema.safeParse(
          parsedDataTrimmedKeys
        )
        if (convaiResponse === undefined) {
          console.warn('Unexpected Convai response shape; will not be saved...')

          return
        }

        const isAiDialog = convaiResponse.From.toLowerCase() !== 'user'
        if (isAiDialog) {
          saveTranscript({
            fromType: 'character',
            simulationId: simulation._id,
            dialogueValue: convaiResponse.DialogueValue,
            characterId: convaiResponse.CharacterID.trim(),
            characterName: convaiResponse.Name.trim()
          })

          return
        }

        if (selectedCharacterId === null) {
          console.warn(
            'No selected character for user transcript; will not be saved...'
          )

          return
        }

        saveTranscript({
          fromType: 'user',
          simulationId: simulation._id,
          dialogueValue: convaiResponse.DialogueValue,
          characterId: selectedCharacterId,
          characterName: '' // Should not be relevant
        })
        enableCharacterSelection()
      }
    }

    window.addEventListener('message', eventHandler)
    return () => {
      window.removeEventListener('message', eventHandler)
    }
  }, [scenarioData, selectedCharacterId])

  if (errorScenarioData)
    return <FetchError errorMessage={error?.response?.data?.message} />

  return (
    <div className='relative aspect-[100/61] flex items-center justify-center h-[270px] w-full lg:h-full bg-black lg:rounded-[8px] lg:overflow-hidden'>
      {isLoadingScenarioData ? (
        <div className='flex items-center gap-2 m-4 lg:m-[40px]'>
          <Loader className='w-4 h-4 mr-2 animate-spin' />
          <p>Loading...</p>
        </div>
      ) : (
        <iframe
          allow='camera'
          id='iframe_1'
          src={scenarioData?.data.simulation_link}
          width='100%'
          height='100%'
          allowFullScreen
          className='absolute top-0 left-0 w-full'
        />
      )}
      <div className='absolute bottom-0 lg:bottom-0 w-full flex items-end lg:items-center justify-between p-3 lg:px-6 lg:pb-6'>
        <TimerValue
          userTimeRemaining={userTimeRemaining}
          isLoading={isLoading}
          error={error}
        />
        <SimulationModal title={ModalTitle.END_SIMULATION} />
      </div>
    </div>
  )
}

export default SimulationE3dsIframe
