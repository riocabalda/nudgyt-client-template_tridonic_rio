import { ApiResponse } from '../../types'
import apiClient from '../apiClient'

type Setting = {
  total_time: number
  time_adjustments: {
    time_change: number
    type: string
    created_at: Date
    updated_at: Date
  }[]
  created_at: Date
  updated_at: Date
  formatted_total_time: string
}

const getSetting = () => apiClient.get<ApiResponse<Setting>>(`/admin/settings`)

const settingService = {
  getSetting
}

export default settingService
