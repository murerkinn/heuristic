export default function uniformCrossover(
  dimension: number,
  individual1: number[],
  individual2: number[]
): [number[], number[]] {
  const offspring1 = new Array(dimension).fill(0)
  const offspring2 = new Array(dimension).fill(0)

  for (let i = 0; i < dimension; i++) {
    if (Math.random() > 0.5) {
      offspring1[i] = individual1[i]
      offspring2[i] = individual2[i]
    } else {
      offspring1[i] = individual2[i]
      offspring2[i] = individual1[i]
    }
  }

  return [offspring1, offspring2]
}
