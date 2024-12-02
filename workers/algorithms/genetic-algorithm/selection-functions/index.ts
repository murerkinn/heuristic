import rouletteWheelSelection from './roulette-wheel-selection'
import tournamentSelection from './tournament-selection'

const GASelectionFunctions = {
  tournamentSelection,
  rouletteWheelSelection,
}

export enum GeneticAlgorithmSelectionMethod {}

export default GASelectionFunctions
