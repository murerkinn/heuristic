import * as tf from '@tensorflow/tfjs'

import FitnessFunctions, {
  type FitnessFunction,
} from 'workers/fitness-functions'
import type {
  CrossoverFunction,
  GeneticAlgorithmCrossoverMethod,
} from './crossover-functions'
import type {
  GeneticAlgorithmSelectionMethod,
  SelectionFunction,
} from './selection-functions'
import type {
  GeneticAlgorithmMutationMethod,
  MutationFunction,
} from './mutation-functions'
import GAMutationFunctions from './mutation-functions'
import GACrossoverFunctions from './crossover-functions'
import GASelectionFunctions from './selection-functions'

export type GeneticAlgorithmPayload = {
  dimension: number
  populationSize: number
  numberOfGenerations: number
  mutationRate: number
  crossoverRate: number
  selectionMethod: GeneticAlgorithmSelectionMethod
  crossoverMethod: GeneticAlgorithmCrossoverMethod
  mutationMethod: GeneticAlgorithmMutationMethod
  fitnessFunction: FitnessFunction
}

function crossoverPopulation(
  population: number[][],
  fitnesses: number[],
  populationSize: number,
  crossoverRate: number,
  selectionFn: SelectionFunction,
  crossoverFn: CrossoverFunction
) {
  const newPopulation = []

  for (let i = 0; i < populationSize; i += 2) {
    const [parent1, parent2] = selectionFn(
      population,
      fitnesses,
      populationSize
    )

    let offspring1 = parent1.slice()
    let offspring2 = parent2.slice()

    if (Math.random() < crossoverRate) {
      ;[offspring1, offspring2] = crossoverFn(
        Math.min(parent1.length, parent2.length),
        parent1,
        parent2
      )
    }

    newPopulation.push(offspring1)
    newPopulation.push(offspring2)
  }

  return newPopulation
}

function mutatePopulation(
  population: number[][],
  mutationRate: number,
  mutationFn: MutationFunction
): number[][] {
  const newPopulation = []

  for (const individual of population) {
    if (Math.random() < mutationRate) {
      newPopulation.push(mutationFn(individual))
    } else {
      newPopulation.push(individual)
    }
  }

  return newPopulation
}

export default function geneticAlgorithm(
  payload: GeneticAlgorithmPayload,
  onIteration: (...args: any) => void
) {
  const {
    crossoverMethod,
    selectionMethod,
    mutationMethod,
    crossoverRate,
    mutationRate,
    populationSize,
    numberOfGenerations,
    dimension,
    fitnessFunction: fitnessFunctionName,
  } = payload
  const fitnessFunction = FitnessFunctions[fitnessFunctionName]

  const lb: number[] = Array(dimension).fill(fitnessFunction.lowerBound)
  const ub: number[] = Array(dimension).fill(fitnessFunction.upperBound)

  const mutationFn = GAMutationFunctions[mutationMethod]
  const crossoverFn = GACrossoverFunctions[crossoverMethod]
  const selectionFn = GASelectionFunctions[selectionMethod]

  let scores = Array.from({ length: populationSize }, () => Math.random())
  let bestScore = Number.POSITIVE_INFINITY

  let ga = Array.from({ length: populationSize }, () =>
    Array.from(
      { length: dimension },
      () => Math.random() * (ub[0] - lb[0]) + lb[0]
    )
  )

  const convergenceCurve = []

  for (let l = 0; l < numberOfGenerations; l++) {
    ga = crossoverPopulation(
      ga,
      scores,
      populationSize,
      crossoverRate,
      selectionFn,
      crossoverFn
    )

    ga = mutatePopulation(ga, mutationRate, mutationFn)

    scores = ga.map(individual =>
      fitnessFunction.function(tf.tensor(individual))
    )
    bestScore = Math.min(...scores)

    scores.sort((a, b) => a - b)
    ga = ga.map((_, i) => ga[scores.indexOf(scores[i])])

    convergenceCurve.push(bestScore)

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
