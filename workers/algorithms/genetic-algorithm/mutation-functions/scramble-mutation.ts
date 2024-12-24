export default function scrambleMutation(chromosome: number[]): number[] {
  const index1 = Math.floor(Math.random() * chromosome.length)

  let index2: number

  do {
    index2 = Math.floor(Math.random() * chromosome.length)
  } while (index1 === index2)

  const start = Math.min(index1, index2)
  const end = Math.max(index1, index2)

  const scrambledPart = chromosome.slice(start, end + 1)
  for (let i = scrambledPart.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[scrambledPart[i], scrambledPart[j]] = [scrambledPart[j], scrambledPart[i]]
  }

  return [
    ...chromosome.slice(0, start),
    ...scrambledPart,
    ...chromosome.slice(end + 1),
  ]
}
