import { create } from 'zustand'

type DialogState = {
  isOpen: boolean
  setIsOpen: (isOpen: DialogState['isOpen']) => void
}

const useExtensionRequestDialogStore = create<DialogState>()((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen })
}))

export default useExtensionRequestDialogStore
