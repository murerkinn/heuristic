import { FitnessFunction } from '../../types'
import schwefel from './schewefel'

type FitnessFn = (individual: number[]) => number

const FitnessFunctions: Record<FitnessFunction, FitnessFn> = {
  [FitnessFunction.Schewfel]: schwefel,
}

export default FitnessFunctions
