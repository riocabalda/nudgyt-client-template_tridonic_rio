import { ApiResponse } from '../../types'
import apiClient from '../apiClient'

const createRequest = () =>
  apiClient.post<ApiResponse<any>>('/learner/requests')

const requestsService = {
  createRequest
}

export default requestsService
