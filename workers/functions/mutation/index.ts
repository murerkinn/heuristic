import { MutationMethod } from '../../types'
import swapMutation from './swap-mutation'

type MutationFn = (individual: number[], mutationRate: number) => number[]

const MutationMethods: Record<MutationMethod, MutationFn> = {
  [MutationMethod.Swap]: swapMutation,
}

export default MutationMethods
