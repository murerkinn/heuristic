export default function twoPointCrossover(
  dimension: number,
  individual1: number[],
  individual2: number[]
): [number[], number[]] {
  let crossoverPoint1 = Math.floor(Math.random() * dimension)
  let crossoverPoint2 = Math.floor(Math.random() * dimension)

  // Ensure the two crossover points are different
  while (crossoverPoint1 === crossoverPoint2) {
    crossoverPoint2 = Math.floor(Math.random() * dimension)
  }

  // Swap points if needed to ensure crossoverPoint1 is less than crossoverPoint2
  if (crossoverPoint1 > crossoverPoint2) {
    ;[crossoverPoint1, crossoverPoint2] = [crossoverPoint2, crossoverPoint1]
  }

  // Create offspring by slicing and concatenating the arrays
  const offspring1 = [
    ...individual1.slice(0, crossoverPoint1),
    ...individual2.slice(crossoverPoint1, crossoverPoint2),
    ...individual1.slice(crossoverPoint2),
  ]

  const offspring2 = [
    ...individual2.slice(0, crossoverPoint1),
    ...individual1.slice(crossoverPoint1, crossoverPoint2),
    ...individual2.slice(crossoverPoint2),
  ]

  return [offspring1, offspring2]
}
