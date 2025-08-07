import apiClient from '../apiClient'

export type TrainerType = {
  id: number
  fullname: string
  email: string
  user_type: string
  is_approved: number
  is_blocked: number
  is_archived: number
  email_verified_at: Date
  verification_token: string
  created_at: Date
  updated_at: Date
}

const getTrainers = (search: string) =>
  apiClient.get<{ data: TrainerType[] }>('/admin/trainers', {
    params: {
      search
    }
  })

const getTrainer = (id: number) =>
  apiClient.get<TrainerType>(`/admin/trainers/${id}`)

const trainerService = {
  getTrainers,
  getTrainer
}

export default trainerService
