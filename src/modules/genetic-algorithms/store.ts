import { create } from 'zustand'

import { randomFloat } from '@/lib/utils'

import type { PopulationSettings } from './types'

interface GeneticAlgorithmsStore {
  population: number[][]
  populationSettings: PopulationSettings
  setPopulationSettings: (
    populationSettings: Partial<PopulationSettings>
  ) => void
  generatePopulation: () => void
}

const useGeneticAlgorithmsStore = create<GeneticAlgorithmsStore>(
  (set, get) => ({
    population: [],
    populationSettings: {
      populationSize: 100,
      dimensions: 5,
      upperBound: 500,
      lowerBound: -500,
      mutationRate: 0.2,
      crossoverRate: 0.7,
    },
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
  })
)

export default useGeneticAlgorithmsStore
