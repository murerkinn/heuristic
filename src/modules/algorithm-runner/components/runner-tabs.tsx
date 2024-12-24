import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import useRunnerStore from '../store'
import RunnerTabPanel from './runner-tab-panel'
import NewRunTab from './new-run-tab'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { AlgorithmRunState } from '../types'
import SummaryRunChart from './summary-run-chart'

const MAX_RUNS = 3

export default function RunnerTabs() {
  const { t } = useTranslation()
  const { runs } = useRunnerStore()

  const shouldShowStartNewTab = runs.length < MAX_RUNS

  return (
    <Tabs defaultValue="new" className="w-full">
      <TabsList className="gap-2">
        {runs.map((run, index) => (
          <TabsTrigger
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            key={index}
            value={index.toString()}
            className="flex gap-1.5 border-r-[1px] border-gray-200"
          >
            {t(`algorithms.${run.algorithm}.name`)}

            <span
              className={cn('w-1.5 h-1.5 rounded-full', {
                'animate-pulse':
                  run.state === AlgorithmRunState.Running ||
                  AlgorithmRunState.Pending,
                'bg-yellow-500': run.state === AlgorithmRunState.Running,
                'bg-green-500': run.state === AlgorithmRunState.Completed,
                'bg-red-500': run.state === AlgorithmRunState.Error,
                'bg-blue-500': run.state === AlgorithmRunState.Pending,
              })}
            />
          </TabsTrigger>
        ))}

        <TabsTrigger value="summary">
          {t('algorithm-runner.tabs.summary')}
        </TabsTrigger>

        {shouldShowStartNewTab ? (
          <TabsTrigger value="new">
            {t('algorithm-runner.tabs.start-new')}
          </TabsTrigger>
        ) : null}
      </TabsList>

      {runs.map((run, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        <TabsContent key={index} value={index.toString()}>
          <RunnerTabPanel run={run} runIndex={index} />
        </TabsContent>
      ))}

      <TabsContent value="summary">
        <SummaryRunChart />
      </TabsContent>

      {shouldShowStartNewTab ? (
        <TabsContent value="new">
          <NewRunTab />
        </TabsContent>
      ) : null}
    </Tabs>
  )
}
