import { ApiResponse, GetScenarioExperience, ScenarioType } from '../../types'
import apiClient from '../apiClient'

const getScenarios = () =>
  apiClient.get<ApiResponse<ScenarioType[]>>('/learner/scenarios')
const getScenariosCurrentStatus = () =>
  apiClient.get<ApiResponse<ScenarioType[]>>(
    `/learner/scenarios/scenarios-current-status`
  )
const getScenarioById = (id: string) =>
  apiClient.get<ApiResponse<ScenarioType>>(`/learner/scenarios/${id}`)

const getScenarioExperience = () =>
  apiClient.get<ApiResponse<GetScenarioExperience>>(
    `/learner/scenarios/experience`
  )

const scenarioService = {
  getScenarios,
  getScenarioExperience,
  getScenariosCurrentStatus,
  getScenarioById
}

export default scenarioService
