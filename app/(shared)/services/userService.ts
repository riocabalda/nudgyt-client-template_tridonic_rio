import apiClient from './apiClient'

type TimeAdjustmentsType = {
  time_change: number
  type: string
}

export type User = {
  _id: string
  fullname: string
  email: string
  user_type: string
  created_at: string
  approved_at: string
  blocked_at: string
  archived_at: string
  email_verified_at: string
  deleted_at: string
  trainings_count: number
  time_adjustments: TimeAdjustmentsType[]
  total_time: number
}

export const roles = {
  superadmin: 'Super Admin',
  admin: 'Admin',
  trainer: 'Trainer',
  learner: 'Learner'
}

const resendVerificationEmail = (formData: { email: string }) =>
  apiClient.post('/auth/resend-email-verification', formData)

const forgotPassword = (formData: { email: string }) =>
  apiClient.post('/auth/forgot-password', formData)

const verifyEmail = (formData: { verificationToken: string }) =>
  apiClient.post('/auth/verify-email', {
    verification_token: formData.verificationToken
  })

const resetPassword = (formData: {
  token: string
  email: string
  password: string
  confirmPassword: string
}) =>
  apiClient.patch('/auth/reset-password', {
    token: formData.token,
    email: formData.email,
    password: formData.password,
    confirm_password: formData.confirmPassword
  })

const userService = {
  resendVerificationEmail,
  forgotPassword,
  verifyEmail,
  resetPassword
}

export default userService
