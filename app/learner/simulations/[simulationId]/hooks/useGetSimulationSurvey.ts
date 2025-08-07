import simulationService from '@/app/(shared)/services/learner/simulationService'
import useSWR from 'swr'

export function useGetSimulationSurvey(simulationId: string) {
  const {
    data: surveyData,
    isLoading: isLoadingSurvey,
    error: errorSurvey,
    mutate: mutateSurvey
  } = useSWR(`/survey?simulation_id=${simulationId}`, () =>
    simulationService
      .getSimulationSurvey(String(simulationId))
      .then((res) => res.data)
  )

  return { surveyData, isLoadingSurvey, errorSurvey, mutateSurvey }
}
