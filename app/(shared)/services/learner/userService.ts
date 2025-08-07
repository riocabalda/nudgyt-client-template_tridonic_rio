import apiClient from '../apiClient'
import { User } from '../userService'

type GuestUserType = {
  id: number
  user_id: string
  simulation_id: string
  guest_token: string
  user: User
}

const getGuestUser = (token: string) =>
  apiClient.get<GuestUserType>(`/guest/token/${token}`)

const userService = {
  getGuestUser
}

export default userService
