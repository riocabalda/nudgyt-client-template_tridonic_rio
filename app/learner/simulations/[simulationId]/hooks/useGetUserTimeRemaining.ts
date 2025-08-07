import { getSimulationUsedTime } from '@/app/(shared)/utils'
import useUser from '@/app/(shared)/hooks/useUser'
import useGetUserSimulations from './useGetUserSimulations'

function useGetUserTimeRemaining() {
  const { user, isLoadingUser, errorUser } = useUser()

  const { simulationsData, isLoadingSimulations, errorSimulations } =
    useGetUserSimulations()

  const timeSpentInMs =
    simulationsData?.data.reduce(
      (accumulator, simulation) =>
        accumulator + getSimulationUsedTime(simulation),
      0
    ) ?? 0
  const totalTime = user?.total_time ?? 0

  const userTimeRemaining = Math.max(totalTime - timeSpentInMs, 0)

  return {
    userTimeRemaining,
    isLoading: isLoadingUser || isLoadingSimulations,
    error: errorUser || errorSimulations
  }
}

export default useGetUserTimeRemaining
