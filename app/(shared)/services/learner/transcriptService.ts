import { ApiResponse } from '../../types'
import apiClient from '../apiClient'
import { User } from '../userService'
import { Character } from './characterService'

export type TranscriptComment = {
  _id: string
  from_type: string
  from: Pick<User, '_id' | 'fullname' | 'email'> | null
  text: string
}

type FromType = 'character' | 'user'
type ToType = 'character' | 'user'

export type TranscriptType = {
  _id: string
  from: Pick<User, 'fullname'> | Pick<Character, 'name'> | null
  from_type: FromType
  to?: Pick<User, 'fullname'> | Pick<Character, 'name'> | null
  to_type?: ToType
  simulation_id: string
  dialogue_value: string
  comments: TranscriptComment[]
}

export type TranscriptPayload = {
  fromType: FromType
  simulationId: string
  dialogueValue: string
  characterId: string
  characterName: string
}

const saveTranscript = (payload: TranscriptPayload) =>
  apiClient.post('/learner/transcripts', payload)

const getTranscripts = (simulationId: string) =>
  apiClient.get<ApiResponse<TranscriptType[]>>(
    `/learner/transcripts/${simulationId}`
  )

const transcriptService = {
  saveTranscript,
  getTranscripts
}

export default transcriptService
