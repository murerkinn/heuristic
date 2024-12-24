import * as tf from '@tensorflow/tfjs'
import type { FitnessFunction } from 'workers/fitness-functions'
import fitnessFunctions from 'workers/fitness-functions'

export type SimulatedAnnealingPayload = {
  dimension: number
  initialTemperature: number
  coolingRate: number
  maxIterations: number
  decreaseMethod: SimulatedAnnealingDecreaseMethod
  fitnessFunction: FitnessFunction
}

export enum SimulatedAnnealingDecreaseMethod {
  Arithmetic = 'arithmetic',
  Geometric = 'geometric',
}

function getRandomNumber(min: number, max: number) {
  return Math.random() * (max - min) + min
}

function initialGuess(lb: number[], ub: number[], fitnessFunction: any) {
  const n = lb.length + 1
  const guess = [
    Array.from({ length: n }, (_, i) => {
      return getRandomNumber(lb[i], ub[i])
    }),
  ]

  guess[0][n - 1] = fitnessFunction(tf.tensor(guess[0].slice(0, n - 1)))

  return guess
}

function normalRandom() {
  let u = 0
  let v = 1
  while (u === 0) u = Math.random() // Converting [0,1) to (0,1)
  while (v === 0) v = Math.random()
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v)
}

function epsonVector(guess: number[][]) {
  const epson = [
    Array.from({ length: guess[0].length - 1 }, () => {
      return normalRandom()
    }),
  ]

  return epson
}

function updateGuess(
  guess: number[][],
  epson: number[][],
  lb: number[],
  ub: number[],
  fitnessFunction: any
) {
  const newGuess = guess.slice()

  for (let j = 0; j < guess[0].length - 1; j++) {
    if (guess[0][j] + epson[0][j] > ub[j]) {
      newGuess[0][j] = getRandomNumber(lb[j], ub[j])
    } else if (guess[0][j] + epson[0][j] < lb[j]) {
      newGuess[0][j] = getRandomNumber(lb[j], ub[j])
    } else {
      newGuess[0][j] = guess[0][j] + epson[0][j]
    }
  }

  newGuess[0][guess[0].length - 1] = fitnessFunction(
    tf.tensor(newGuess[0].slice(0, newGuess[0].length - 1))
  )

  return newGuess
}

function getRandomFraction() {
  const randomBytes = crypto.getRandomValues(new Uint8Array(8))
  let randomInt = 0

  for (let i = 0; i < randomBytes.length; i++) {
    randomInt = (randomInt << 8) | randomBytes[i]
  }

  // biome-ignore lint/style/useExponentiationOperator: <explanation>
  return randomInt / (Math.pow(2, 64) - 1)
}

export default function simulatedAnnealing(
  payload: SimulatedAnnealingPayload,
  onIteration: (...args: any) => void
) {
  const {
    initialTemperature,
    maxIterations,
    fitnessFunction: fitnessFunctionName,
    dimension,
    decreaseMethod,
    coolingRate,
  } = payload
  const fitnessFunction = fitnessFunctions[fitnessFunctionName]
  const lb = Array(dimension).fill(fitnessFunction.lowerBound)
  const ub = Array(dimension).fill(fitnessFunction.upperBound)

  let guess = initialGuess(lb, ub, fitnessFunction.function)
  let epson = epsonVector(guess)
  let best = guess.slice()
  let fxBest = guess[0][dimension - 1]

  let temperature = initialTemperature

  const convergenceCurve = []

  while (temperature > 0) {
    for (let repeat = 0; repeat < maxIterations; repeat++) {
      const fxOld = guess[0][dimension - 1]
      epson = epsonVector(guess)
      const newGuess = updateGuess(
        guess,
        epson,
        lb,
        ub,
        fitnessFunction.function
      )
      const fxNew = newGuess[0][dimension]
      const delta = fxNew - fxOld
      const r = getRandomFraction()
      const p = Math.exp(-delta / temperature)

      if (delta < 0 || r <= p) {
        guess = newGuess.slice()
      }

      if (fxNew < fxBest) {
        fxBest = fxNew
        best = guess.slice()
      }
    }

    if (decreaseMethod === SimulatedAnnealingDecreaseMethod.Arithmetic) {
      temperature -= coolingRate
    } else if (decreaseMethod === SimulatedAnnealingDecreaseMethod.Geometric) {
      temperature *= coolingRate
    }

    convergenceCurve.push(best[0][dimension])

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
