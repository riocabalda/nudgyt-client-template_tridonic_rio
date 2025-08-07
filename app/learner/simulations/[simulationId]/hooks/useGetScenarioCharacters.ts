import characterService from '@/app/(shared)/services/learner/characterService'
import useSWR from 'swr'

function useGetScenarioCharacters(scenarioNum?: number) {
  const canFetchCharacters = scenarioNum !== undefined
  const charactersFetch = useSWR(
    !canFetchCharacters ? null : ['/learner/characters/scenario', scenarioNum],
    ([, scenarioNum]) =>
      characterService
        .getScenarioCharacters({ scenarioNum })
        .then((res) => res.data.data)
  )

  return charactersFetch
}

export default useGetScenarioCharacters
