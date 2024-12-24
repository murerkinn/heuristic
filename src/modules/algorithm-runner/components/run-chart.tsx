import { Card, CardContent } from '@/components/ui/card'
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts'
import type { AlgorithmRun } from '../types'
import { useMemo } from 'react'

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig

interface RunChartProps {
  run: AlgorithmRun
}

export default function RunChart({ run }: RunChartProps) {
  const data = useMemo(() => {
    return run.convergenceCurve.map((point, index) => ({
      index,
      bestFitness: point,
    }))
  }, [run])

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
              dataKey="bestFitness"
              label="Fitness"
              tickLine={false}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="bestFitness"
              type="natural"
              isAnimationActive={false}
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
