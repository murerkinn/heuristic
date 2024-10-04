import { randomInt } from '@/lib/utils'

export default function swapMutation(
  individual: number[],
  mutationRate: number
) {
  const mutatedIndividual = individual.slice()

  for (let i = 0; i < individual.length; i++) {
    if (Math.random() < mutationRate) {
      const randomIndex = randomInt(0, individual.length - 1)
      const temp = mutatedIndividual[i]
      mutatedIndividual[i] = mutatedIndividual[randomIndex]
      mutatedIndividual[randomIndex] = temp
    }
  }

  return mutatedIndividual
}
