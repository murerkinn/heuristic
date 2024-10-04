import { CrossoverMethod } from '../../types'
import onePointCrossover from './one-point-crossover'

type CrossoverFn = (
  parent1: number[],
  parent2: number[]
) => {
  child1: number[]
  child2: number[]
}

const CrossoverMethods: Record<CrossoverMethod, CrossoverFn> = {
  [CrossoverMethod.OnePoint]: onePointCrossover,
}

export default CrossoverMethods
