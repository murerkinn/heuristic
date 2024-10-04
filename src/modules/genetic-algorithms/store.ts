import { create } from 'zustand'

import { randomFloat } from '@/lib/utils'

import {
  CrossoverMethod,
  FitnessFunction,
  type Generation,
  MutationMethod,
  type PopulationSettings,
  SelectionMethod,
} from './types'

interface GeneticAlgorithmsStore {
  isRunning: boolean
  population: number[][]
  populationSettings: PopulationSettings
  setPopulationSettings: (
    populationSettings: Partial<PopulationSettings>
  ) => void
  generatePopulation: () => void
  generations: Generation[]
  fitnessFunction: FitnessFunction
  mutationMethod: MutationMethod
  crossoverMethod: CrossoverMethod
  selectionMethod: SelectionMethod
  setGenerations: (generations: Generation[]) => void
}

const useGeneticAlgorithmsStore = create<GeneticAlgorithmsStore>(
  (set, get) => ({
    isRunning: false,
    population: [],
    populationSettings: {
      populationSize: 1000,
      dimensions: 10,
      upperBound: 500,
      lowerBound: -500,
      mutationRate: 0.2,
      crossoverRate: 1,
      maxIterations: 1000,
    },
    generations: [],
    fitnessFunction: FitnessFunction.Schewfel,
    mutationMethod: MutationMethod.Swap,
    crossoverMethod: CrossoverMethod.OnePoint,
    selectionMethod: SelectionMethod.RouletteWheel,
    setPopulationSettings: populationSettings =>
      set(prev => ({
        populationSettings: {
          ...prev.populationSettings,
          ...populationSettings,
        },
      })),
    generatePopulation: () => {
      const { populationSize, dimensions, upperBound, lowerBound } =
        get().populationSettings

      const population = Array.from({ length: populationSize }, () =>
        Array.from({ length: dimensions }, () =>
          randomFloat(lowerBound, upperBound)
        )
      )

      set({ population })
    },
    setGenerations: generations => set({ generations }),
  })
)

export default useGeneticAlgorithmsStore
