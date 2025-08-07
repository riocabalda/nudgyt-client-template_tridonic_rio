import { create } from 'zustand'
import { combine } from 'zustand/middleware'

type CharacterSelectionState = {
  id: string | null
  isSelectionEnabled: boolean
}

const defaultState: CharacterSelectionState = {
  id: null,
  isSelectionEnabled: true
}

const useCharacterSelectionStore = create(
  combine(defaultState, (set) => ({
    reset: () => set(defaultState),
    selectCharacter: (id: CharacterSelectionState['id']) => set({ id }),
    enableSelection: () => set({ isSelectionEnabled: true }),
    disableSelection: () => set({ isSelectionEnabled: false })
  }))
)

export default useCharacterSelectionStore
