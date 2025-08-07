'use client'

import { Loader } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useGetSimulationSurvey } from '../hooks/useGetSimulationSurvey'
import FeedbackForm from './FeedbackForm'

function SimulationRating() {
  const router = useRouter()
  const { simulationId } = useParams()

  const { surveyData, isLoadingSurvey } = useGetSimulationSurvey(
    String(simulationId)
  )

  useEffect(() => {
    if (
      surveyData &&
      Array.isArray(surveyData.data) &&
      surveyData.data.length !== 0
    ) {
      router.push('/learner/scenarios')
    }
  }, [])

  if (isLoadingSurvey) return <Loader className='w-4 h-4 animate-spin' />

  return (
    <section className='px-4 lg:px-0 mt-6 lg:mt-[88px] max-w-[556px] mx-auto'>
      <FeedbackForm />
    </section>
  )
}

export default SimulationRating
