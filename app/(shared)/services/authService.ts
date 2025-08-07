import axios from 'axios'
import apiClient from './apiClient'
import { User } from './userService'
import serverConfig from '../config/serverConfig'

type SignInFormData = {
  email: string
  password: string
}
type SignInData = {
  token: string
  user: User
}
type SignUpFormData = {
  email: string
  fullName: string
  userType: string
  password: string
  confirmPassword: string
  invitationToken: string
  isTermsAndConditionsAccepted: boolean
}
type SignInResponse = {
  data: SignInData
  message: string
}
type GetUserResponse = {
  data: User
  message: string
}

const getAuthUser = () => apiClient.get<GetUserResponse>('/auth/me')

const signIn = (formData: SignInFormData) =>
  apiClient.post<SignInResponse>('/auth/login', {
    email: formData.email,
    password: formData.password
  })

const signUp = async (formData: SignUpFormData) =>
  apiClient.post('/auth/register', {
    email: formData.email,
    fullname: formData.fullName,
    user_type: formData.userType,
    password: formData.password,
    confirm_password: formData.confirmPassword,
    invitation_token: formData.invitationToken,
    isTermsAndConditionsAccepted: formData.isTermsAndConditionsAccepted
  })

const signout = () => apiClient.post('/auth/sign-out', {})

const authBroadcastingGuest = (guestToken: string) =>
  axios.post(
    `${serverConfig.url}/broadcasting/guest/auth`,
    {},
    {
      headers: {
        Authorization: 'Bearer ' + guestToken,
        Accept: 'application/json'
      }
    }
  )

const authService = {
  getAuthUser,
  signIn,
  signUp,
  signout,
  authBroadcastingGuest
}
export default authService
