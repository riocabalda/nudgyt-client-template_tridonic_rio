import scenarioService from '@/app/(shared)/services/learner/scenarioService'
import useSWR from 'swr'

function useGetScenario(scenarioId?: string) {
  const canFetchScenario = scenarioId !== undefined
  const scenarioFetch = useSWR(
    !canFetchScenario ? null : ['/learner/scenario', scenarioId],
    ([, scenarioId]) =>
      scenarioService.getScenarioById(scenarioId).then((res) => res.data.data)
  )

  return scenarioFetch
}

export default useGetScenario
