export default function onePointCrossover(
  dimension: number,
  individual1: number[],
  individual2: number[]
): [number[], number[]] {
  const crossoverPoint = Math.floor(Math.random() * dimension)

  // The new offspring will have its first half of its genes taken from the first parent and the second half from the second parent.
  const offspring1 = [
    ...individual1.slice(0, crossoverPoint),
    ...individual2.slice(crossoverPoint),
  ]

  // The new offspring will have its first half of its genes taken from the second parent and the second half from the first parent.
  const offspring2 = [
    ...individual2.slice(0, crossoverPoint),
    ...individual1.slice(crossoverPoint),
  ]

  return [offspring1, offspring2]
}
