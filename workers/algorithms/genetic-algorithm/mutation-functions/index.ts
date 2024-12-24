import scrambleMutation from './scramble-mutation'
import swapMutation from './swap-mutation'

export type MutationFunction = (individual: number[]) => number[]

export enum GeneticAlgorithmMutationMethod {
  Swap = 'swap-mutation',
  Scramble = 'scramble-mutation',
}

const GAMutationFunctions: Record<
  GeneticAlgorithmMutationMethod,
  MutationFunction
> = {
  [GeneticAlgorithmMutationMethod.Swap]: swapMutation,
  [GeneticAlgorithmMutationMethod.Scramble]: scrambleMutation,
}

export default GAMutationFunctions
