import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

type UserReminder = {
  isTwentyMinutes: boolean
  isFiveMinutesRemaining: boolean
  userId: string
}

type TimeReminderState = {
  users: UserReminder[]
  userId: string | null
  setUserId: (userId: string) => void
  setIsTwentyMinutes: (status: boolean) => void
  setIsFiveMinutesRemaining: (status: boolean) => void
}

// Define a key for local storage
const timeReminderKey = 'time-reminder'

const useTimeReminderStore = create<TimeReminderState>()(
  persist(
    (set, get) => ({
      users: [],
      userId: null,
      setUserId: (userId) => {
        set({ userId })
        // Add new user if not already present
        const userExists = get().users.some((user) => user.userId === userId)
        if (!userExists) {
          set((state) => ({
            users: [
              ...state.users,
              { isTwentyMinutes: false, isFiveMinutesRemaining: false, userId }
            ]
          }))
        }
      },
      setIsTwentyMinutes: (status: boolean) => {
        const { userId, users } = get()
        if (userId) {
          const updatedUsers = users.map((user) =>
            user.userId === userId ? { ...user, isTwentyMinutes: status } : user
          )
          set({ users: updatedUsers })
        }
      },
      setIsFiveMinutesRemaining: (status: boolean) => {
        const { userId, users } = get()
        if (userId) {
          const updatedUsers = users.map((user) =>
            user.userId === userId
              ? { ...user, isFiveMinutesRemaining: status }
              : user
          )
          set({ users: updatedUsers })
        }
      }
    }),
    {
      name: timeReminderKey,
      storage: createJSONStorage(() => localStorage)
    }
  )
)

export default useTimeReminderStore
