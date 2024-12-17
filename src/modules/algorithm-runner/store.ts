import { create } from 'zustand'
import { type AlgorithmRunnerStore } from './types'

const useRunnerStore = create<AlgorithmRunnerStore>(set => ({
  runs: [],
  startRun: runPayload => {
    const worker = new Worker(
      new URL('../../../workers/run-algorithm.ts', import.meta.url)
    )

    worker.postMessage(runPayload)

    worker.onmessage = e => {
      // console.log('message', e)

      set(state => {
        return {
          ...state,
          runs: [
            {
              ...state.runs[0],
              convergenceCurve: e.data.convergenceCurve,
              state: e.data.state,
            },
          ],
        }
      })
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
