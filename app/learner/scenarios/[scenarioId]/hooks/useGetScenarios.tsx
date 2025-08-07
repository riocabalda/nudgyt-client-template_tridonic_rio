import scenarioService from '@/app/(shared)/services/learner/scenarioService'
import useSWR from 'swr'

function useGetScenario(scenarioId: string | undefined) {
  const { data, isLoading, error } = useSWR(
    `/learner/scenarios/${scenarioId}`,
    () =>
      scenarioService
        .getScenarioById(String(scenarioId))
        .then((res) => res.data)
  )
  return { data, error, isLoading }
}

export default useGetScenario
