'use client'

import FeedbackChart from '@/app/(shared)/components/FeedbackChart'
import { Card } from '@/app/(shared)/components/ui/card'
import { useParams } from 'next/navigation'
import { ComponentProps } from 'react'
import useGetAverageSurvey from '../hooks/useGetAverageSurvey'

function FeedbackChartCard() {
  const { scenarioId } = useParams()
  const surveyFetch = useGetAverageSurvey(String(scenarioId))

  const survey = surveyFetch.data ?? null
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
    </Card>
  )
}

export default FeedbackChartCard
