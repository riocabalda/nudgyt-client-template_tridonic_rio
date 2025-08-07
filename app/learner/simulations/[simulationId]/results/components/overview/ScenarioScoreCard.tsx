'use client'

import { Card } from '@/app/(shared)/components/ui/card'
import { formatOrdinalNumber } from '@/app/(shared)/utils'
import useGetSimulationResults from '../../hooks/useGetSimulationResults'

function usePercentile(): string {
  const { results } = useGetSimulationResults()

  const percentile = results?.percentile

  if (percentile === undefined) {
    return '...'
  }
  percentile satisfies number

  const roundedDown = Math.floor(percentile)
  const withSuffix = formatOrdinalNumber(roundedDown)

  return withSuffix
}

function Competency() {
  const { results } = useGetSimulationResults()

  const isCompetent = results?.isCompetent ?? false

  return (
    <p className='text-sm font-semibold text-brandcolora'>
      {isCompetent ? <>Competent</> : <>Needs Practice</>}
    </p>
  )
}

function ScenarioScoreCard() {
  const { results } = useGetSimulationResults()
  const percentile = usePercentile()

  const score = results?.score

  if (score === undefined) {
    return null
  }

  return (
    <Card className='grid gap-1 p-4 lg:p-6'>
      <header className='flex justify-between gap-4 lg:gap-6 items-center'>
        <h3 className='text-lg font-semibold'>Scenario Score</h3>

        <p className='text-2xl font-semibold text-brandcolora'>{score}%</p>
      </header>

      <div className='flex justify-between gap-4 lg:gap-6 items-center'>
        <p className='text-sm text-neutral-gray-800'>{percentile} Percentile</p>

        <Competency />
      </div>
    </Card>
  )
}

export default ScenarioScoreCard
