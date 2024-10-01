import Layout from '@/components/layout'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import GeneticAlgorithmFlow from '@/modules/genetic-algorithms/components/genetic-algorithm-flow'
import PopulationSettings from '@/modules/genetic-algorithms/components/population-settings'

export default function HomePage() {
  return (
    <>
      <Layout>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={80} minSize={40}>
            <ResizablePanelGroup direction="horizontal">
              <ResizablePanel defaultSize={30} minSize={20}>
                <GeneticAlgorithmFlow />
              </ResizablePanel>

              <ResizableHandle withHandle />

              <ResizablePanel defaultSize={70} className="p-4">
                <PopulationSettings />
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>

          <ResizableHandle withHandle />

          <ResizablePanel defaultSize={20}>Three</ResizablePanel>
        </ResizablePanelGroup>
      </Layout>
    </>
  )
}
