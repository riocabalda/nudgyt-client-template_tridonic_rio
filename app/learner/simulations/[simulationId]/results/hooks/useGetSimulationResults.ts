import simulationService from '@/app/(shared)/services/learner/simulationService'
import { useParams } from 'next/navigation'
import useSWR from 'swr'
import { z } from 'zod'
import useGetUserTimeRemaining from '../../hooks/useGetUserTimeRemaining'

const RouteParamsSchema = z.object({
  simulationId: z.string()
})
function useRouteParams() {
  const rawParams = useParams()
  const params = RouteParamsSchema.parse(rawParams)

  return params
}

function useGetSimulationResults() {
  const { simulationId } = useRouteParams()

  const resultsFetch = useSWR(
    ['/learner/simulations/results', simulationId],
    ([, simId]) =>
      simulationService.getSimulationResults(simId).then((res) => res.data.data)
  )

  const { userTimeRemaining } = useGetUserTimeRemaining()

  const results = resultsFetch?.data

  return {
    ...{ resultsFetch, results },
    ...{ userTimeRemaining }
  }
}

export default useGetSimulationResults
