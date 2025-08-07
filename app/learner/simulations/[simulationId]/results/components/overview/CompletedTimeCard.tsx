import StyledTooltip from '@/app/(shared)/components/StyledTooltip'
import { Button } from '@/app/(shared)/components/ui/button'
import { Card } from '@/app/(shared)/components/ui/card'
import simulationService from '@/app/(shared)/services/learner/simulationService'
import { cn, formatDateTime, getSimulationUsedTime } from '@/app/(shared)/utils'
import { RefreshCw } from 'lucide-react'
import moment from 'moment-timezone'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import useGetSimulationResults from '../../hooks/useGetSimulationResults'
import ExtensionRequestPrompt from '../extension-request/ExtensionRequestPrompt'

function formatDiff(diffMs: number) {
  const diffStr = moment.utc(diffMs).format('HH:mm:ss')

  return diffStr
}

function RetryScenarioButton() {
  const router = useRouter()
  const { results, userTimeRemaining } = useGetSimulationResults()
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function retryScenario() {
    const scenario = results?.scenario
    if (scenario === undefined) {
      console.warn('Cannot retry non-existent scenario; ignoring...')

      return
    }

    const scenarioId = scenario._id

    setIsSubmitting(true)
    try {
      const { data: apiResp } =
        await simulationService.startSimulation(scenarioId)

      const simId = apiResp.data._id
      router.push(`/learner/simulations/${simId}`)
    } catch (error) {
      console.error(error)

      setIsSubmitting(false)
    }
  }

  const hasPendingRequest = results?.hasPendingRequest ?? false

  const hasRemainingTime = userTimeRemaining > 0
  const canRetryScenario = hasRemainingTime

  const button = (
    <Button
      variant='outline'
      size='sm'
      disabled={!canRetryScenario || isSubmitting}
      onClick={retryScenario}
      className={cn(
        'w-full flex gap-3',
        'disabled:bg-neutral-gray-100 disabled:text-neutral-gray-400',
        'disabled:pointer-events-auto disabled:cursor-not-allowed'
      )}
    >
      <RefreshCw className='size-4' />
      <span>Retry Scenario</span>
    </Button>
  )

  if (!canRetryScenario) {
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

function CompletedTimeCard() {
  const { results } = useGetSimulationResults()

  const simulation = results?.simulation ?? null
  const simStart = results?.simulation.started_at ?? null
  const simEnd = results?.simulation.ended_at ?? null

  if (simulation === null || simStart === null || simEnd === null) {
    return null
  }

  const durationMs = getSimulationUsedTime(simulation)
  const durationStr = formatDiff(durationMs)
  const startStr = formatDateTime(simStart)
  const endStr = formatDateTime(simEnd)

  return (
    <Card className='grid gap-4 lg:gap-6 p-4 lg:p-6'>
      <header className='grid gap-4 lg:gap-6'>
        <h3 className='text-lg font-semibold'>Completed Time</h3>
        <p className='text-neutral-gray-600 text-2xl font-medium'>
          {durationStr}
        </p>
      </header>

      <hr className='border-neutral-gray-400' />

      <section className='grid gap-3'>
        <p className='flex justify-between gap-3 text-sm text-neutral-gray-600'>
          <span className='font-semibold'>Start time</span>
          <span>{startStr}</span>
        </p>
        <p className='flex justify-between gap-3 text-sm text-neutral-gray-600'>
          <span className='font-semibold'>End time</span>
          <span>{endStr}</span>
        </p>
      </section>

      <footer>
        <RetryScenarioButton />
      </footer>
    </Card>
  )
}

export default CompletedTimeCard
