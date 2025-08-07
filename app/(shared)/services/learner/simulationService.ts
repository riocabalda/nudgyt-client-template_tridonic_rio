import {
  ApiResponse,
  ScenarioType,
  SimulationSurveyType,
  SoftSkillsData,
  WithPagination
} from '../../types'
import apiClient from '../apiClient'
import { TranscriptType } from './transcriptService'

export type SimulationType = {
  _id: string
  learner_id: string
  scenario_id: string
  started_at: string | null
  paused_at: string[]
  resumed_at: string[]
  ended_at: string | null
  cancelled_at?: string | null
  deleted_at: string | null
  created_at: string
  updated_at: string
}

type SimulationTypeSmall = Pick<
  SimulationType,
  '_id' | 'started_at' | 'ended_at'
>

type SimulationResults = {
  simulation: SimulationType
  scenario: ScenarioType
  nextScenario: ScenarioType | null

  allAttempts: SimulationTypeSmall[]
  previousAttempt: SimulationTypeSmall | undefined
  nextAttempt: SimulationTypeSmall | undefined

  score: number
  isCompetent: boolean
  percentile: number

  softSkills: SoftSkillsData | null
  transcripts: TranscriptType[]

  hasPendingRequest: boolean
  tips: string[]
}

const startSimulation = (scenarioId: string) =>
  apiClient.post<ApiResponse<SimulationType>>('/learner/simulations/start', {
    scenarioId
  })

const stopSimulation = (simulationId: string) =>
  apiClient.patch(`/learner/simulations/${simulationId}/stop`)

const cancelSimulation = (simulationId: string) =>
  apiClient.patch(`/learner/simulations/${simulationId}/cancel`)

const getSimulation = (simulationId: string) =>
  apiClient.get<ApiResponse<SimulationType>>(
    `/learner/simulations/${simulationId}`
  )

const createSimulationSurvey = (form: SimulationSurveyType) =>
  apiClient.post<SimulationSurveyType>('/learner/surveys', form)

const getSimulationSurvey = (simulationId: string) =>
  apiClient.get<{ data: SimulationSurveyType[] }>(
    `/learner/surveys?simulation_id=${simulationId}`
  )
const getSimulationsByUser = () =>
  apiClient.get<ApiResponse<SimulationType[]>>(`/learner/simulations/user`)

const getPreviousSimulations = (scenarioId: string, queryString?: string) =>
  apiClient.get<WithPagination<SimulationType[]>>(
    `/learner/simulations/${scenarioId}/previous-attempts?${queryString}`
  )

const getSimulationResults = (simId: string) =>
  apiClient.get<ApiResponse<SimulationResults>>(
    `/learner/simulations/${simId}/results`
  )

const simulationService = {
  startSimulation,
  stopSimulation,
  getSimulation,
  createSimulationSurvey,
  getSimulationSurvey,
  cancelSimulation,
  getSimulationsByUser,
  getPreviousSimulations,
  getSimulationResults
}

export default simulationService
