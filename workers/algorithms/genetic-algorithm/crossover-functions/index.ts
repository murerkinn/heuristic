import onePointCrossover from './one-point-crossover'
import twoPointCrossover from './two-point-crossover'
import uniformCrossover from './uniform-crossover'

export type CrossoverFunction = (
  dimension: number,
  parent1: number[],
  parent2: number[]
) => [number[], number[]]

export enum GeneticAlgorithmCrossoverMethod {
  Uniform = 'uniform-crossover',
  OnePoint = 'one-point-crossover',
  TwoPoint = 'two-point-crossover',
}

const GACrossoverFunctions: Record<
  GeneticAlgorithmCrossoverMethod,
  CrossoverFunction
> = {
  [GeneticAlgorithmCrossoverMethod.Uniform]: uniformCrossover,
  [GeneticAlgorithmCrossoverMethod.OnePoint]: onePointCrossover,
  [GeneticAlgorithmCrossoverMethod.TwoPoint]: twoPointCrossover,
}

export default GACrossoverFunctions
