export type WithPagination<T> = {
  data: T
  total: number
  last_page: number
  next_page: string | null
  prev_page: string | null
  from: number
  to: number
  current_page: number
}

export type Creator = {
  _id: string
  email: string
  fullname: string
}

export type ScenarioLearner = {
  id: string
  fullname: string
  time_spent: string
}

export type Request = {
  _id: string
  creator: Creator
  scenario_id: string
  is_read: boolean
  approved_at: string | null
  approved_by?: string
  denied_at: string | null
  denied_by?: string
  created_at: string
  updated_at: string
  requested_time: number
}

export type ApiResponse<T> = {
  data: T
  message: string
}

export type ScenarioType = {
  _id: string
  scenario_number: number
  simulation_link: string
  title: string
  summary: string
  thumbnail: string
  is_standalone?: boolean | null
  created_at: Date
  updated_at: Date
}

export type DashboardStatisticsType = {
  trainers: { count: number; percentage: number }
  learners: { count: number; percentage: number }
  simulations: { count: number; percentage: number }
  courses: { count: number; percentage: number }
}

export type MetricValues = {
  value?: string | number
  percentageChange?: string
  changeDirection?: 'increased' | 'decreased' | 'unchanged'
}

export type GetScenarioMetrics = {
  averageTimeData: MetricValues
  totalLearnersData: MetricValues
  totalRequestsData: MetricValues
  totalTimeUsedData: MetricValues
}

export type GetLearnerPerScenario = {
  learners: number
  scenario_number: number
  scenario_title: string
  is_scenario_standalone?: boolean | null
}

export type GetScenarioExperience = {
  tier?: string
  expUntilNextLevel?: number
  nextLevelExp?: number
  percentage?: number
  nextTier?: string
  experience?: number
  isUsedByLearner?: boolean
}

export type SimulationSurveyType = {
  simulation_id: string
  confident: number
  useful: number
  easy: number
  comment: string
}
export type AverageSurvey = Pick<
  SimulationSurveyType,
  'useful' | 'easy' | 'confident'
> | null

export type SoftSkillRatingRubric = {
  name: string
  description: string
  score: {
    level: string
    description: string
  }
}
export type SoftSkillRating = {
  skill: string
  score: number
  total: number
  description: string
  rubrics: SoftSkillRatingRubric[]
}
export type SoftSkillsData = {
  summary: string
  ratings: SoftSkillRating[]
}
