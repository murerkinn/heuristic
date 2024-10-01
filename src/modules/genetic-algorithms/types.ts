export enum SelectionMethod {
  RouletteWheel = 'RouletteWheel',
  Rank = 'Rank',
  SteadyState = 'SteadyState',
  Tournament = 'Tournament',
  Boltzmann = 'Boltzmann',
  Truncation = 'Truncation',
  RewardBased = 'RewardBased',
  StochasticUniversal = 'StochasticUniversal',
}

export enum CrossoverMethod {
  OnePoint = 'OnePoint',
  TwoPoints = 'TwoPoints',
  Uniform = 'Uniform',
  Arithmetic = 'Arithmetic',
  DavisOrder = 'DavisOrder',
  Cycle = 'Cycle',
  PartiallyMapped = 'PartiallyMapped',
  PositionBased = 'PositionBased',
  SequentialConstructive = 'SequentialConstructive',
}

export enum MutationMethod {
  BitString = 'BitString',
  Arithmetic = 'Arithmetic',
  Swap = 'Swap',
  Scramble = 'Scramble',
  Inversion = 'Inversion',
  Reversing = 'Reversing',
}

export type PopulationSettings = {
  populationSize: number
  upperBound: number
  lowerBound: number
  dimensions: number
  mutationRate: number
  crossoverRate: number
}
