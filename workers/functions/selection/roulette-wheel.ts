export default function rouletteWheelSelection(
  population: number[][],
  fitness: number[]
): number[][] {
  const totalFitness = fitness.reduce((acc, val) => acc + val, 0)
  const probabilities = fitness.map(f => f / totalFitness)

  const cumulativeProbabilities = probabilities.reduce((acc, val, i) => {
    const val_ = val + (acc[i - 1] || 0)

    acc.push(val_)

    return acc
  }, [] as number[])

  const newPopulation = Array.from({ length: population.length }, () => {
    const random = Math.random()
    const selectedIndividual = population.find((_, i) => {
      const probability = cumulativeProbabilities[i]
      const nextProbability = cumulativeProbabilities[i + 1] || 1
      return random >= probability && random < nextProbability
    })
    return selectedIndividual || population[0]
  })

  return newPopulation
}
