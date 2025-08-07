import simulationService from '@/app/(shared)/services/learner/simulationService'
import useSWR from 'swr'

function useGetPreviousSimulations(
  scenarioId: string | undefined,
  queryString?: string
) {
  const { data, isLoading, error } = useSWR(
    `/learner/simulations/${scenarioId}/previous-attempts?${queryString}`,
    () =>
      simulationService
        .getPreviousSimulations(String(scenarioId), queryString)
        .then((res) => res.data)
  )
  return { data, error, isLoading }
}

export default useGetPreviousSimulations
