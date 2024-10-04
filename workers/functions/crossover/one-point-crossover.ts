import { randomInt } from '@/lib/utils'

export default function onePointCrossover(
  parent1: number[],
  parent2: number[]
) {
  const crossoverPoint = randomInt(0, parent1.length - 1)

  const child1 = [
    ...parent1.slice(0, crossoverPoint),
    ...parent2.slice(crossoverPoint),
  ]

  const child2 = [
    ...parent2.slice(0, crossoverPoint),
    ...parent1.slice(crossoverPoint),
  ]

  return {
    child1,
    child2,
  }
}
