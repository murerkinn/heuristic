export enum GeneticAlgorithmMutationMethod {
  Swap = 'swap-mutation',
  Scramble = 'scramble-mutation',
}

const GAMutationFunctions = {
  [GeneticAlgorithmMutationMethod.Swap]: () => [],
  [GeneticAlgorithmMutationMethod.Scramble]: () => [],
}

export default GAMutationFunctions
