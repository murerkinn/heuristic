function rouletteWheelSelectionId(scores: number[], popSize: number) {
  // Reverse scores so that lower values have a higher chance of selection
  const reverse = Math.max(...scores) + Math.min(...scores)
  const reverseScores = scores.map(score => reverse - score)
  const sumScores = reverseScores.reduce((sum, score) => sum + score, 0)

  const pick = Math.random() * sumScores
  let current = 0

  for (let individualId = 0; individualId < popSize; individualId++) {
    current += reverseScores[individualId]
    if (current > pick) {
      return individualId
    }
  }

  return popSize - 1
}

export default function rouletteWheelSelection(
  population: number[][],
  fitnesses: number[],
  selectionCount: number
) {
  // Select the first parent
  const parent1Id = rouletteWheelSelectionId(fitnesses, selectionCount)
  const parent1 = population[parent1Id].slice()

  // Select the second parent
  const parent2Id = rouletteWheelSelectionId(fitnesses, selectionCount)
  const parent2 = population[parent2Id].slice()

  return [parent1, parent2]
}
