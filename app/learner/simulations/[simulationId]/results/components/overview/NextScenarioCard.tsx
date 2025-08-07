'use client'

import StyledTooltip from '@/app/(shared)/components/StyledTooltip'
import { Button } from '@/app/(shared)/components/ui/button'
import { Card } from '@/app/(shared)/components/ui/card'
import simulationService from '@/app/(shared)/services/learner/simulationService'
import { cn } from '@/app/(shared)/utils'
import { Play } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import useGetSimulationResults from '../../hooks/useGetSimulationResults'
import ExtensionRequestPrompt from '../extension-request/ExtensionRequestPrompt'

function StartScenarioButton() {
  const router = useRouter()
  const { results, userTimeRemaining } = useGetSimulationResults()

  const [isSubmitting, setIsSubmitting] = useState(false)

  async function startNextScenario() {
    if (nextScenario === null) {
      console.warn('Cannot start non-existent next scenario; ignoring...')

      return
    }

    const nextScenarioId = nextScenario._id

    setIsSubmitting(true)
    try {
      const { data: apiResp } =
        await simulationService.startSimulation(nextScenarioId)

      const simId = apiResp.data._id
      router.push(`/learner/simulations/${simId}`)
    } catch (error) {
      console.error(error)

      setIsSubmitting(false)
    }
  }

  const nextScenario = results?.nextScenario ?? null
  const hasPendingRequest = results?.hasPendingRequest ?? false

  const hasNextScenario = nextScenario !== null
  const hasRemainingTime = userTimeRemaining > 0
  const canStartNextScenario = hasNextScenario && hasRemainingTime

  const button = (
    <Button
      disabled={!canStartNextScenario || isSubmitting}
      onClick={startNextScenario}
      className={cn(
        'disabled:pointer-events-auto', // Enable hover events (e.g. showing tooltip) on disabled state
        'disabled:cursor-not-allowed',
        'lg:py-3 lg:px-4 flex gap-3'
      )}
    >
      <Play className='size-5' />
      <span>Start Scenario</span>
    </Button>
  )

  if (!canStartNextScenario) {
    return (
      <StyledTooltip
        trigger={button}
        content={
          hasPendingRequest ? (
            <p>Please wait for your extension request to be approved.</p>
          ) : !hasRemainingTime ? (
            <ExtensionRequestPrompt />
          ) : null
        }
      />
    )
  }

  return button
}

function NextScenarioCard() {
  const { results } = useGetSimulationResults()

  const nextScenario = results?.nextScenario ?? undefined

  if (nextScenario === undefined) {
    return null
  }

  return (
    <Card className='grid lg:flex lg:items-center lg:justify-between gap-4 lg:gap-6 p-4 lg:p-6 bg-primary-frost-500'>
      <header>
        <h3 className='uppercase font-medium text-xs tracking-[0.04rem] text-brandcolora'>
          Next Scenario:
        </h3>

        <p className='text-brandcolora font-semibold'>{nextScenario.title}</p>
      </header>

      <StartScenarioButton />
    </Card>
  )
}

export default NextScenarioCard
