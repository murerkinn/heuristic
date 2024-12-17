import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import useRunnerStore from '../store'
import RunnerTabPanel from './runner-tab-panel'
import NewRunTab from './new-run-tab'
import { useTranslation } from 'react-i18next'

const MAX_RUNS = 3

export default function RunnerTabs() {
  const { t } = useTranslation()
  const { runs } = useRunnerStore()

  const shouldShowStartNewTab = runs.length < MAX_RUNS

  return (
    <Tabs defaultValue="summary" className="w-full">
      <TabsList>
        {runs.map((run, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          <TabsTrigger key={index} value={index.toString()}>
            {t(`algorithms.${run.algorithm}.name`)}
          </TabsTrigger>
        ))}
        <TabsTrigger value="summary">{t('summary')}</TabsTrigger>

        {shouldShowStartNewTab ? (
          <TabsTrigger value="new">Start New</TabsTrigger>
        ) : null}
      </TabsList>

      {runs.map((run, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        <TabsContent key={index} value={index.toString()}>
          <RunnerTabPanel run={run} runIndex={index} />
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
