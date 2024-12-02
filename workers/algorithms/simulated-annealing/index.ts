export type SimulatedAnnealingPayload = {
  dimension: number
  initialTemperature: number
  coolingRate: number
  maxIterations: number
  decreaseMethod: 'arithmetic' | 'geometric'
}