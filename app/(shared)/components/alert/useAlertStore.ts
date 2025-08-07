import { ReactNode } from 'react'
import { create } from 'zustand'

type AlertVariant = 'success' | 'error' | 'info' | ''

type AlerState = {
  isOpen: boolean
  variant: AlertVariant
  message: string | ReactNode
}

type AlertAction = {
  showAlert: ({
    variant,
    message
  }: {
    variant?: AlertVariant
    message: string | ReactNode
  }) => void
  closeAlert: () => void
}

const useAlertStore = create<AlerState & AlertAction>((set) => ({
  isOpen: false,
  variant: '',
  message: '',
  showAlert: ({ variant, message }) =>
    set(() => ({ isOpen: true, variant, message })),
  closeAlert: () => set(() => ({ isOpen: false }))
}))

export default useAlertStore
