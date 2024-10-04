import Layout from '@/components/layout'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import Curve from '@/modules/genetic-algorithms/components/curve'
import GeneticAlgorithmFlow from '@/modules/genetic-algorithms/components/genetic-algorithm-flow'
import PopulationSettings from '@/modules/genetic-algorithms/components/population-settings'

export default function HomePage() {
  return (
    <>
      <Layout>
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={30} minSize={20}>
            <GeneticAlgorithmFlow />
          </ResizablePanel>

          <ResizableHandle withHandle />

          <ResizablePanel defaultSize={70} className="p-4">
            <div className="flex flex-col gap-8 max-h-full overflow-y-auto">
              <Curve />

              <PopulationSettings />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </Layout>
    </>
  )
}
