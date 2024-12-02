import GACrossoverFunctions, {
  GeneticAlgorithmCrossoverMethod,
} from './crossover-functions'
import GAMutationFunctions from './mutation-functions'
import GASelectionFunctions, {
  GeneticAlgorithmSelectionMethod,
} from './selection-functions'

export type GeneticAlgorithmPayload = {
  dimension: number
  populationSize: number
  numberOfGenerations: number
  mutationRate: number
  crossoverRate: number
  selectionMethod: GeneticAlgorithmSelectionMethod
  crossoverMethod: GeneticAlgorithmCrossoverMethod
}

export default function geneticAlgorithm(payload: GeneticAlgorithmPayload) {
  console.log('Genetic Algorithm', payload)
}
