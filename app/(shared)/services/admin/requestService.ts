import { Request, WithPagination } from '../../types'
import apiClient from '../apiClient'

const getRequests = (queryString?: string) =>
  apiClient.get<WithPagination<Request[]>>(`/admin/requests?${queryString}`)

const markAllAsRead = () => apiClient.patch('/admin/requests/read')

const approveRequest = (requestId: string) =>
  apiClient.patch(`/admin/requests/approve/${requestId}`)

const bulkApproveRequests = (requestIds: string[]) =>
  apiClient.patch('/admin/requests/approve', {
    ids: requestIds
  })

const denyRequest = (requestId: string) =>
  apiClient.patch(`/admin/requests/deny/${requestId}`)

const undoDenyRequest = (requestId: string) =>
  apiClient.patch(`/admin/requests/undo-deny/${requestId}`)

const bulkDenyRequests = (requestIds: string[]) =>
  apiClient.patch('/admin/requests/deny', {
    ids: requestIds
  })

const bulkUndoDenyRequests = (requestIds: string[]) =>
  apiClient.patch('/admin/requests/undo-deny', {
    ids: requestIds
  })

const requestService = {
  getRequests,
  markAllAsRead,
  approveRequest,
  bulkApproveRequests,
  denyRequest,
  undoDenyRequest,
  bulkDenyRequests,
  bulkUndoDenyRequests
}

export default requestService
