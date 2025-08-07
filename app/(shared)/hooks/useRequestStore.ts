import { create } from 'zustand'
import { Request } from '../types'

type RequestStore = {
  selectedRequests: Request[]
  allRequests: Request[]
  addRequest: (request: Request) => void
  removeRequest: (id: string) => void
  toggleRequest: (request: Request) => void
  clearRequests: () => void
  setAllRequests: (requests: Request[]) => void
}

export const useRequestStore = create<RequestStore>((set) => ({
  selectedRequests: [],
  allRequests: [],
  addRequest: (request) =>
    set((state) => ({
      selectedRequests: [...state.selectedRequests, request]
    })),
  removeRequest: (id) =>
    set((state) => ({
      selectedRequests: state.selectedRequests.filter(
        (request) => request._id !== id
      )
    })),
  toggleRequest: (request) =>
    set((state) => {
      const exists = state.selectedRequests.some((r) => r._id === request._id)
      if (exists) {
        return {
          selectedRequests: state.selectedRequests.filter(
            (r) => r._id !== request._id
          )
        }
      } else {
        return {
          selectedRequests: [...state.selectedRequests, request]
        }
      }
    }),
  clearRequests: () =>
    set(() => ({
      selectedRequests: []
    })),
  setAllRequests: (requests) =>
    set(() => ({
      allRequests: requests
    }))
}))
