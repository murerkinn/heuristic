import * as tf from '@tensorflow/tfjs'
import FitnessFunctions, {
  type FitnessFunction,
} from 'workers/fitness-functions'

export type ParticleSwarmOptimizationPayload = {
  dimension: number
  populationSize: number
  maxIterations: number
  fitnessFunction: FitnessFunction
}

export default function particleSwarmOptimization(
  payload: ParticleSwarmOptimizationPayload,
  onIteration: (...args: any) => void
) {
  const {
    dimension,
    populationSize,
    fitnessFunction: fitnessFunctionName,
    maxIterations,
  } = payload
  const fitnessFunction = FitnessFunctions[fitnessFunctionName]

  const vMax = 6
  const wMax = 0.9
  const wMin = 0.2
  const c1 = 2
  const c2 = 2

  const ub = Array(dimension).fill(fitnessFunction.upperBound)
  const lb = Array(dimension).fill(fitnessFunction.lowerBound)

  const vel = Array.from({ length: populationSize }, () =>
    Array(dimension).fill(0)
  )

  const pBestScore = Array(populationSize).fill(Number.POSITIVE_INFINITY)
  const pBest = Array.from({ length: populationSize }, () =>
    Array(dimension).fill(0)
  )

  let gBest = Array(dimension).fill(0)
  let gBestScore = Number.POSITIVE_INFINITY

  const pos = Array.from({ length: populationSize }, () =>
    Array.from(
      { length: dimension },
      (_, i) => Math.random() * (ub[i] - lb[i]) + lb[i]
    )
  )

  const convergenceCurve = []

  for (let l = 0; l < maxIterations; l++) {
    for (let i = 0; i < populationSize; i++) {
      for (let j = 0; j < dimension; j++) {
        pos[i][j] = Math.max(Math.min(pos[i][j], ub[j]), lb[j])
      }

      const currentFitness = fitnessFunction.function(tf.tensor(pos[i]))

      if (currentFitness < pBestScore[i]) {
        pBestScore[i] = currentFitness
        pBest[i] = pos[i].slice()
      }

      if (currentFitness < gBestScore) {
        gBestScore = currentFitness
        gBest = pos[i].slice()
      }
    }

    const w = wMax - l * ((wMax - wMin) / maxIterations)

    for (let i = 0; i < populationSize; i++) {
      for (let j = 0; j < dimension; j++) {
        const r1 = Math.random()
        const r2 = Math.random()

        vel[i][j] =
          w * vel[i][j] +
          c1 * r1 * (pBest[i][j] - pos[i][j]) +
          c2 * r2 * (gBest[j] - pos[i][j])

        if (vel[i][j] > vMax) {
          vel[i][j] = vMax
        }

        if (vel[i][j] < -vMax) {
          vel[i][j] = -vMax
        }

        pos[i][j] = pos[i][j] + vel[i][j]
      }
    }

    convergenceCurve.push(gBestScore)

    onIteration({
      convergenceCurve,
      state: 'running',
    })
  }

  onIteration({
    convergenceCurve,
    state: 'completed',
  })
}
