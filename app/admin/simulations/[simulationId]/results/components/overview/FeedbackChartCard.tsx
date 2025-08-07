'use client'

import FeedbackChart from '@/app/(shared)/components/FeedbackChart'
import { Card } from '@/app/(shared)/components/ui/card'
import { ComponentProps } from 'react'
import useGetSimulationResults from '../../hooks/useGetSimulationResults'

function FeedbackChartCard() {
  const { results } = useGetSimulationResults()

  const survey = results?.survey ?? null

  if (survey === null) {
    return null
  }

  /** Database property names might change? */
  const chartData: ComponentProps<typeof FeedbackChart>['data'] = [
    {
      label: 'Platform usefulness',
      value: survey.useful ?? 1
    },
    {
      label: 'Ease of use',
      value: survey.easy ?? 1
    },
    {
      label: 'Learner confidence',
      value: survey.confident ?? 1
    }
  ]

  return (
    <Card className='grid gap-4 lg:gap-6 p-4 lg:p-6 pt-0 lg:pt-2'>
      <FeedbackChart data={chartData} />

      <hr className='border-neutral-gray-400' />

      <p className='text-sm'>{survey.comment}</p>
    </Card>
  )
}

export default FeedbackChartCard
