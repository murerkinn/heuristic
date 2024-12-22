import { useState } from 'react'
import AlgorithmDropdown from './algorithm-dropdown'
import AlgorithmSettings from './algorithm-settings'
import { Algorithm } from 'workers/algorithms'
import useRunnerStore from '../store'
import { AlgorithmRunState } from '../types'

export default function NewRunTab() {
  const { startRun } = useRunnerStore()
  const [algorithm, setAlgorithm] = useState<Algorithm>(
    Algorithm.GeneticAlgorithm
  )

  const onSubmit = (payload: any) => {
    startRun({
      algorithm,
      payload,
      state: AlgorithmRunState.Pending,
      bestFitness: 0,
      convergenceCurve: [],
    })
  }

  return (
    <div className="grid gap-8">
      <AlgorithmDropdown value={algorithm} onChange={setAlgorithm} />

      <AlgorithmSettings algorithm={algorithm} onSubmit={onSubmit} />
    </div>
  )
}
