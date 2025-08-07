import simulationService from '@/app/(shared)/services/admin/simulationService'
import { useParams } from 'next/navigation'
import useSWR from 'swr'
import { z } from 'zod'

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
    ['/admin/simulations/results', simulationId],
    ([, simId]) =>
      simulationService.getSimulationResults(simId).then((res) => res.data.data)
  )

  const results = resultsFetch?.data

  return { resultsFetch, results }
}

export default useGetSimulationResults
