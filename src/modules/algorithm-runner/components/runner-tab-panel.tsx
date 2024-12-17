import { AlgorithmRunState, type AlgorithmRun } from '../types'
import RunChart from './run-chart'

interface RunnerTabPanelProps {
  run: AlgorithmRun
  runIndex: number
}

export default function RunnerTabPanel({ run }: RunnerTabPanelProps) {
  return (
    <div>
      <RunChart run={run} />

      <div></div>
    </div>
  )
}
