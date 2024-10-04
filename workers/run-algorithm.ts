import CrossoverMethods from './functions/crossover'
import FitnessFunctions from './functions/fitness'
import MutationMethods from './functions/mutation'
import SelectionMethods from './functions/selection'
import type {
  CrossoverMethod,
  FitnessFunction,
  MutationMethod,
  SelectionMethod,
} from './types'

function randomFloat(min: number, max: number) {
  return Math.random() * (max - min) + min
}

function generatePopulation({
  populationSize,
  dimensions,
  lowerBound,
  upperBound,
}: {
  populationSize: number
  dimensions: number
  lowerBound: number
  upperBound: number
}) {
  return Array.from({ length: populationSize }, () =>
    Array.from({ length: dimensions }, () =>
      randomFloat(lowerBound, upperBound)
    )
  )
}

function runAlgorithm({
  fitnessFunction,
  crossoverMethod,
  selectionMethod,
  mutationMethod,
  populationSettings,
}: {
  fitnessFunction: FitnessFunction
  crossoverMethod: CrossoverMethod
  selectionMethod: SelectionMethod
  mutationMethod: MutationMethod
  populationSettings: {
    crossoverRate: number
    mutationRate: number
    maxIterations: number
    upperBound: number
    lowerBound: number
    dimensions: number
    populationSize: number
  }
}) {
  const {
    crossoverRate,
    mutationRate,
    maxIterations,
    upperBound,
    lowerBound,
    dimensions,
    populationSize,
  } = populationSettings

  const fitnessFn = FitnessFunctions[fitnessFunction]
  const crossoverFn = CrossoverMethods[crossoverMethod]
  const selectionFn = SelectionMethods[selectionMethod]
  const mutationFn = MutationMethods[mutationMethod]

  let population = generatePopulation({
    populationSize,
    dimensions,
    lowerBound,
    upperBound,
  })
  const generations = []

  console.log('maxIterations', maxIterations)

  for (let i = 0; i < maxIterations; i++) {
    console.log('Running iteration', i)

    const fitness = population.map(individual => fitnessFn(individual))

    const newPopulation = selectionFn(population, fitness)

    population = newPopulation

    const crossoverPopulation = newPopulation.map((individual, i) => {
      if (Math.random() < crossoverRate) {
        const partner = newPopulation[i + 1] || newPopulation[0]

        const { child1, child2 } = crossoverFn(individual, partner)

        const bestChild =
          fitnessFn(child1) > fitnessFn(child2) ? child1 : child2

        return bestChild
      }

      return individual
    })

    population = crossoverPopulation

    const mutatedPopulation = newPopulation.map(individual =>
      mutationFn(individual, mutationRate)
    )

    population = mutatedPopulation

    const generation = {
      bestIndividual: mutatedPopulation[0],
      bestFitness: fitnessFn(mutatedPopulation[0]),
      index: i,
    }

    for (const individual of mutatedPopulation) {
      const fitness = fitnessFn(individual)

      if (fitness > generation.bestFitness) {
        generation.bestFitness = fitness
        generation.bestIndividual = individual
      }
    }

    generations.push(generation)
  }

  return generations
}

self.onmessage = e => {
  const generations = runAlgorithm(e.data)

  self.postMessage(generations)
}
