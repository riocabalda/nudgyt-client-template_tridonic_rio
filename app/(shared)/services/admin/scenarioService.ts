import {
  ApiResponse,
  GetLearnerPerScenario,
  GetScenarioMetrics,
  ScenarioType,
  ScenarioLearner
} from '../../types'
import apiClient from '../apiClient'

const getScenarios = () =>
  apiClient.get<ApiResponse<ScenarioType[]>>('/admin/scenarios')

const getScenarioById = (id: string) =>
  apiClient.get<ApiResponse<ScenarioType>>(`/admin/scenarios/${id}`)

const getScenarioMetrics = (queryString?: string) =>
  apiClient.get<ApiResponse<GetScenarioMetrics>>(
    `/admin/scenarios/metrics?${queryString}`
  )
const getLearnerPerScenario = () =>
  apiClient.get<ApiResponse<GetLearnerPerScenario[]>>(`/admin/scenarios/stats`)

const getScenarioLearners = (id: string) =>
  apiClient.get<ApiResponse<ScenarioLearner[]>>(
    `/admin/scenarios/${id}/learners`
  )

const scenarioService = {
  getScenarios,
  getScenarioById,
  getScenarioMetrics,
  getLearnerPerScenario,
  getScenarioLearners
}
export default scenarioService
