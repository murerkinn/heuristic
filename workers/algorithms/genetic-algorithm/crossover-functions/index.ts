import onePointCrossover from './one-point-crossover'
import twoPointCrossover from './two-point-crossover'
import uniformCrossover from './uniform-crossover'

const GACrossoverFunctions = {
  uniformCrossover,
  onePointCrossover,
  twoPointCrossover,
}

export enum GeneticAlgorithmCrossoverMethod {}

export default GACrossoverFunctions
