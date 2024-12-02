import { AlgorithmRunState, type AlgorithmRun } from '../types'
import RunChart from './run-chart'

interface RunnerTabPanelProps {
  run: AlgorithmRun
}

export default function RunnerTabPanel({ run }: RunnerTabPanelProps) {
  return (
    <div>
      {run.state === AlgorithmRunState.Completed ? <RunChart /> : null}

      <div></div>
    </div>
  )
}
