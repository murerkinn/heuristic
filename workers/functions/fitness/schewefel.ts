export default function schwefel(x: number[]): number {
  const n = x.length

  return (
    418.9829 * n -
    x.reduce((sum, xi) => sum + xi * Math.sin(Math.sqrt(Math.abs(xi))), 0)
  )
}
