import { create } from 'zustand'
import type { AlgorithmRunnerStore } from './types'

const useRunnerStore = create<AlgorithmRunnerStore>(() => ({
  runs: [],
}))

export default useRunnerStore
