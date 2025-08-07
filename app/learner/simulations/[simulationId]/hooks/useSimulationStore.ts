import { create } from 'zustand'

type SimulationState = {
  isStarted: boolean
  startSimulation: () => void
  stopSimulation: () => void
}

const useSimulationStore = create<SimulationState>((set) => ({
  isStarted: false,
  startSimulation: () => set({ isStarted: true }),
  stopSimulation: () => set({ isStarted: false })
}))

export default useSimulationStore
