import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import useRunnerStore from '../store'
import RunnerTabPanel from './runner-tab-panel'
import NewRunTab from './new-run-tab'

const MAX_RUNS = 3

export default function RunnerTabs() {
  const { runs } = useRunnerStore()

  const shouldShowStartNewTab = runs.length < MAX_RUNS

  return (
    <Tabs defaultValue="summary" className="w-[400px]">
      <TabsList>
        {runs.map((run, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          <TabsTrigger key={index} value={index.toString()}>
            {run.algorithm}
          </TabsTrigger>
        ))}
        <TabsTrigger value="summary">Summary</TabsTrigger>

        {shouldShowStartNewTab ? (
          <TabsTrigger value="new">Start New</TabsTrigger>
        ) : null}
      </TabsList>

      {runs.map((run, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        <TabsContent key={index} value={index.toString()}>
          <RunnerTabPanel run={run} />
        </TabsContent>
      ))}

      <TabsContent value="summary">Summary of runs</TabsContent>

      {shouldShowStartNewTab ? (
        <TabsContent value="new">
          <NewRunTab />
        </TabsContent>
      ) : null}
    </Tabs>
  )
}
