'use client'
import LearnerXPCard from '@/app/(shared)/components/LearnerXPCard'
import scenarioService from '@/app/(shared)/services/learner/scenarioService'
import useSWR from 'swr'

function LearnerXPCardContainer() {
  const { data: scenarios } = useSWR(`/learner/scenarios/experience`, () =>
    scenarioService.getScenarioExperience().then((res) => res.data)
  )

  return <LearnerXPCard {...scenarios?.data} />
}

export default LearnerXPCardContainer
