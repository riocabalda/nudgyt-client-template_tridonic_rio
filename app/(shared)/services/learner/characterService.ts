import { ApiResponse } from '../../types'
import { stringifyRecordValues } from '../../utils'
import apiClient from '../apiClient'

export type Character = {
  character_id: string
  name: string
  scenario_numbers: number[]
  avatar?: string
}

const getCharacters = () =>
  apiClient.get<ApiResponse<Character[]>>('/learner/characters')

const getScenarioCharacters = (params: { scenarioNum: number }) =>
  apiClient.get<ApiResponse<Character[]>>(
    `/learner/characters/scenario?${new URLSearchParams(stringifyRecordValues(params))}`
  )

const characterService = {
  getCharacters,
  getScenarioCharacters
}

export default characterService
