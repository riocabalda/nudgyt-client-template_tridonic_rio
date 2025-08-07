import simulationService from '@/app/(shared)/services/learner/simulationService'
import useSWR from 'swr'

function useGetUserSimulations() {
  const {
    data: simulationsData,
    isLoading: isLoadingSimulations,
    error: errorSimulations,
    mutate: mutateSimulations
  } = useSWR('/learner/simulations/user', () =>
    simulationService.getSimulationsByUser().then((res) => res.data)
  )

  return {
    simulationsData,
    isLoadingSimulations,
    errorSimulations,
    mutateSimulations
  }
}

export default useGetUserSimulations
