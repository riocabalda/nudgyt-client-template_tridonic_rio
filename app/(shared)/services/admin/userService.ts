import { WithPagination } from '../../types'
import apiClient from '../apiClient'
import { User } from '../userService'

const getUsers = (queryString?: string) =>
  apiClient.get<WithPagination<User[]>>(`/admin/users?${queryString}`)

// TODO Create dedicated backend endpoint?
const getUserById = async (id: string) => {
  const res = await getUsers()
  const users = res?.data?.data

  const user = users.find((user) => user._id === id)
  if (!user) {
    throw new Error('User does not exist...?')
  }

  return user
}

const sendRegistrationLink = (formData: any) =>
  apiClient.post('/admin/users/invite', formData)

const blockUser = (userId: string) =>
  apiClient.patch(`/admin/users/${userId}/block`)

const unblockUser = (userId: string) =>
  apiClient.patch(`/admin/users/${userId}/unblock`)

const archiveUser = (
  userId: string,
  formData?: { transfer_to_user_id: string }
) => apiClient.patch(`/admin/users/${userId}/archive`, formData)

const approveUser = (userId: string) =>
  apiClient.patch(`/admin/users/${userId}/approve`)

const userService = {
  getUsers,
  getUserById,
  sendRegistrationLink,
  blockUser,
  unblockUser,
  archiveUser,
  approveUser
}

export default userService
