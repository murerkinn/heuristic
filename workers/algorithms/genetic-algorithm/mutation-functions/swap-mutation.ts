export default function swapMutation(individual: number[]): number[] {
  const index1 = Math.floor(Math.random() * individual.length)
  let index2: number
  do {
    index2 = Math.floor(Math.random() * individual.length)
  } while (index1 === index2)

  const tmp = individual[index1]
  individual[index1] = individual[index2]
  individual[index2] = tmp

  return individual
}
