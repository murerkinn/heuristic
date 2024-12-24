import * as tf from '@tensorflow/tfjs'
import FitnessFunctions, {
  type FitnessFunction,
} from 'workers/fitness-functions'

export type GrayWolfOptimizationPayload = {
  dimension: number
  populationSize: number
  numberOfGenerations: number
  a: number
  fitnessFunction: FitnessFunction
}

export default function grayWolfOptimization(
  payload: GrayWolfOptimizationPayload,
  onIteration: (...args: any) => void
) {
  console.log('Gray Wolf Optimization', payload)

  const {
    dimension,
    populationSize,
    numberOfGenerations,
    a: initialAlpha,
    fitnessFunction: fitnessFunctionName,
  } = payload
  const fitnessFunction = FitnessFunctions[fitnessFunctionName]

  let alphaPos = Array(dimension).fill(0)
  let alphaScore = Number.POSITIVE_INFINITY

  let betaPos = Array(dimension).fill(0)
  let betaScore = Number.POSITIVE_INFINITY

  let deltaPos = Array(dimension).fill(0)
  let deltaScore = Number.POSITIVE_INFINITY

  const lb = Array(dimension).fill(fitnessFunction.lowerBound)
  const ub = Array(dimension).fill(fitnessFunction.upperBound)

  const positions = Array.from({ length: populationSize }, () =>
    Array.from(
      { length: dimension },
      (_, i) => Math.random() * (ub[i] - lb[i]) + lb[i]
    )
  )

  const convergenceCurve = []

  for (let l = 0; l < numberOfGenerations; l++) {
    for (let i = 0; i < populationSize; i++) {
      for (let j = 0; j < dimension; j++) {
        positions[i][j] = Math.max(Math.min(positions[i][j], ub[j]), lb[j])
      }

      const fitness = fitnessFunction.function(tf.tensor(positions[i]))

      if (fitness < alphaScore) {
        deltaScore = betaScore
        deltaPos = betaPos.slice()
        betaScore = alphaScore
        betaPos = alphaPos.slice()
        alphaScore = fitness
        alphaPos = positions[i]
      }

      if (fitness > alphaScore && fitness < betaScore) {
        deltaScore = betaScore
        deltaPos = betaPos.slice()
        betaScore = fitness
        betaPos = positions[i]
      }

      if (fitness > alphaScore && fitness > betaScore && fitness < deltaScore) {
        deltaScore = fitness
        deltaPos = positions[i]
      }
    }

    const a = initialAlpha - l * (2 / numberOfGenerations)

    for (let i = 0; i < populationSize; i++) {
      for (let j = 0; j < dimension; j++) {
        let r1 = Math.random()
        let r2 = Math.random()

        const A1 = 2 * a * r1 - a
        const C1 = 2 * r2
        const D_alpha = Math.abs(C1 * alphaPos[j] - positions[i][j])
        const X1 = alphaPos[j] - A1 * D_alpha

        r1 = Math.random()
        r2 = Math.random()

        const A2 = 2 * a * r1 - a
        const C2 = 2 * r2
        const D_beta = Math.abs(C2 * betaPos[j] - positions[i][j])
        const X2 = betaPos[j] - A2 * D_beta

        r1 = Math.random()
        r2 = Math.random()

        const A3 = 2 * a * r1 - a
        const C3 = 2 * r2
        const D_delta = Math.abs(C3 * deltaPos[j] - positions[i][j])
        const X3 = deltaPos[j] - A3 * D_delta

        positions[i][j] = (X1 + X2 + X3) / 3
      }
    }

    convergenceCurve.push(alphaScore)

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
