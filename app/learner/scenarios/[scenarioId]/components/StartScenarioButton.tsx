'use client'

import React, { useState } from 'react'
import { Button } from '@/app/(shared)/components/ui/button'
import { useParams, useRouter } from 'next/navigation'
import { ArrowRight, Loader } from 'lucide-react'
import simulationService from '@/app/(shared)/services/learner/simulationService'
import useGetUserTimeRemaining from '@/app/learner/simulations/[simulationId]/hooks/useGetUserTimeRemaining'

function StartScenarioButton() {
  const { scenarioId } = useParams()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const { userTimeRemaining, isLoading } = useGetUserTimeRemaining()

  const isDisableBtn = userTimeRemaining === 0 || isLoading || isSubmitting

  const handleStartSimulationClick = async () => {
    setIsSubmitting(true)

    try {
      const { data } = await simulationService.startSimulation(
        String(scenarioId)
      )
      router.push(`/learner/simulations/${data.data._id}`)
    } catch (error: any) {
      console.log(error)
      setIsSubmitting(false)
    }
  }

  return (
    <Button
      onClick={handleStartSimulationClick}
      disabled={isDisableBtn}
      className='flex items-center gap-[10px]'
    >
      {isSubmitting ? (
        <>
          <span>Starting Scenario</span>
          <Loader className='size-[20px] animate-spin' />
        </>
      ) : (
        <>
          <span>Start Scenario</span>
          <ArrowRight className='size-[20px]' />
        </>
      )}
    </Button>
  )
}

export default StartScenarioButton
