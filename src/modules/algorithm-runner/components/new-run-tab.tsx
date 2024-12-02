import { useState } from 'react'
import AlgorithmDropdown from './algorithm-dropdown'
import AlgorithmSettings from './algorithm-settings'
import { Algorithm } from 'workers/algorithms'

export default function NewRunTab() {
  const [algorithm, setAlgorithm] = useState<Algorithm>(
    Algorithm.GeneticAlgorithm
  )

  return (
    <div className="grid gap-8">
      <AlgorithmDropdown value={algorithm} onChange={setAlgorithm} />

      <AlgorithmSettings
        algorithm={algorithm}
        onSubmit={val => console.log('val', val)}
      />
    </div>
  )
}
