import { create } from 'zustand'
import { produce } from 'immer'
import type { AlgorithmRunnerStore } from './types'

const useRunnerStore = create<AlgorithmRunnerStore>((set, get) => ({
  runs: [],
  startRun: runPayload => {
    const runs = get().runs

    if (runs.length === 3) {
      throw new Error('Cannot run more than 3 algorithms at the same time')
    }

    const runIndex = runs.length

    const worker = new Worker(
      new URL('../../../workers/run-algorithm.ts', import.meta.url)
    )

    worker.postMessage(runPayload)

    worker.onmessage = e => {
      set(
        produce(state => {
          state.runs[runIndex].convergenceCurve = e.data.convergenceCurve
          state.runs[runIndex].state = e.data.state
        })
      )
    }

    worker.onerror = e => {
      console.log('error', e)
    }

    set(state => {
      return {
        ...state,
        runs: [...state.runs, runPayload],
      }
    })
  },
}))

export default useRunnerStore
