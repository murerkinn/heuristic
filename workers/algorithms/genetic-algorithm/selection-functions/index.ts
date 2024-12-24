import rouletteWheelSelection from './roulette-wheel-selection'
import tournamentSelection from './tournament-selection'

type SelectionFunction = (
  population: number[][],
  fitnesses: number[],
  selectionCount: number
) => number[][]

export enum GeneticAlgorithmSelectionMethod {
  Tournament = 'tournament-selection',
  RouletteWheel = 'roulette-wheel-selection',
}

const GASelectionFunctions: Record<
  GeneticAlgorithmSelectionMethod,
  SelectionFunction
> = {
  [GeneticAlgorithmSelectionMethod.Tournament]: tournamentSelection,
  [GeneticAlgorithmSelectionMethod.RouletteWheel]: rouletteWheelSelection,
}

export default GASelectionFunctions
