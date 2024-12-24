import { Card, CardContent } from '@/components/ui/card'
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts'
import useRunnerStore from '../store'
import { useMemo } from 'react'

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig

export default function SummaryRunChart() {
  const { runs } = useRunnerStore()

  const data = useMemo(() => {
    const maxIterations = Math.max(
      ...runs.map(run => run.convergenceCurve.length)
    )
    const data = []

    for (let i = 0; i < maxIterations; i++) {
      const iterationData: Record<string, number> = {
        index: i,
      }

      runs.forEach((run, index) => {
        iterationData[`bestFitness${index}`] = run.convergenceCurve[i]
      })

      data.push(iterationData)
    }

    return data
  }, [runs])

  return (
    <Card>
      <CardContent className="p-4">
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="index"
              label="Iteration"
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              // dataKey="bestFitness"
              label="Fitness"
              tickLine={false}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="bestFitness0"
              type="natural"
              isAnimationActive={false}
              stroke="red"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="bestFitness1"
              type="natural"
              isAnimationActive={false}
              stroke="green"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="bestFitness2"
              type="natural"
              isAnimationActive={false}
              stroke="blue"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
