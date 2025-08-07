import { DashboardStatisticsType } from '../../types'
import apiClient from '../apiClient'

const getDashboardStatistics = () =>
  apiClient.get<DashboardStatisticsType>(`/admin/dashboard/statistics`)

const dashboardService = {
  getDashboardStatistics
}

export default dashboardService
