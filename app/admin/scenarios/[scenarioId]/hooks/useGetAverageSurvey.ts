import simulationService from '@/app/(shared)/services/admin/simulationService'
import useSWR from 'swr'

function useGetAverageSurvey(scenarioId: string) {
  const averageSurveyFetch = useSWR(
    ['/admin/surveys/average', scenarioId],
    ([, scenario_id]) =>
      simulationService
        .getAverageSurvey({ scenario_id })
        .then((res) => res.data.data)
  )

  return averageSurveyFetch
}

export default useGetAverageSurvey
