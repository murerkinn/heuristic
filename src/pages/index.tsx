import Layout from '@/components/layout'
import RunnerTabs from '@/modules/algorithm-runner/components/runner-tabs'

export default function HomePage() {
  return (
    <>
      <Layout>
        <div className="p-4">
          <RunnerTabs />
        </div>
      </Layout>
    </>
  )
}
