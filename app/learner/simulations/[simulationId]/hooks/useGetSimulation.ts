import useSWR from 'swr'
import simulationService from '@/app/(shared)/services/learner/simulationService'

export function useGetSimulation(simulationId: string) {
  const { data, isLoading, error, mutate } = useSWR(
    `/simulations/${simulationId}`,
    () =>
      simulationService
        .getSimulation(String(simulationId))
        .then((res) => res.data)
  )

  return { data, isLoading, error, mutate }
}
