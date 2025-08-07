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

const createComment = (params: { transcriptId: string; text: string }) =>
  apiClient.post(`/admin/transcripts/comments?${new URLSearchParams(params)}`)

const deleteComment = (params: { transcriptId: string; commentId: string }) =>
  apiClient.delete(`/admin/transcripts/comments?${new URLSearchParams(params)}`)

const transcriptService = {
  createComment,
  deleteComment
}

export default transcriptService
