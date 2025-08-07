import {
  ApiResponse,
  AverageSurvey,
  ScenarioType,
  SimulationSurveyType,
  SoftSkillsData
} from '../../types'
import apiClient from '../apiClient'
import { User } from '../userService'
import { TranscriptType } from './transcriptService'

export type SimulationType = {
  _id: string
  learner_id: string
  scenario_id: string
  started_at: string | null
  paused_at: string[]
  resumed_at: string[]
  ended_at: string | null
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
  learner: Pick<User, '_id' | 'fullname' | 'email' | 'user_type'>

  allAttempts: SimulationTypeSmall[]
  previousAttempt: SimulationTypeSmall | undefined
  nextAttempt: SimulationTypeSmall | undefined

  score: number
  isCompetent: boolean
  percentile: number

  softSkills: SoftSkillsData | null
  transcripts: TranscriptType[]

  survey: SimulationSurveyType | null
}

const getAverageSurvey = (params: { scenario_id: string }) =>
  apiClient.get<ApiResponse<AverageSurvey>>(
    `/admin/surveys/average?${new URLSearchParams(params)}`
  )

const getSimulationResults = (simId: string) =>
  apiClient.get<ApiResponse<SimulationResults>>(
    `/admin/simulations/${simId}/results`
  )

const simulationService = {
  getAverageSurvey,
  getSimulationResults
}

export default simulationService
