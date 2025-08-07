import { create } from 'zustand'

type OpenTranscriptCommentsStore = {
  id: string | null
  setId: (id: string | null) => void
}

const useOpenTranscriptCommentsStore = create<OpenTranscriptCommentsStore>()(
  (set) => ({
    id: null,
    setId: (id) => set({ id })
  })
)

export default useOpenTranscriptCommentsStore
