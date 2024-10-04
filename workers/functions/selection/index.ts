import { SelectionMethod } from '../../types'
import rouletteWheelSelection from './roulette-wheel'

type SelectionFn = (population: number[][], fitness: number[]) => number[][]

const SelectionMethods: Record<SelectionMethod, SelectionFn> = {
  [SelectionMethod.RouletteWheel]: rouletteWheelSelection,
}

export default SelectionMethods
