import { create } from 'zustand'

type PopulationSettings = {
  populationSize: number
  upperBound: number
  lowerBound: number
  dimensions: number
  mutationRate: number
  crossoverRate: number
}

interface GeneticAlgorithmsStore {
  populationSettings: PopulationSettings
  setPopulationSettings: (
    populationSettings: Partial<PopulationSettings>
  ) => void
}

const useGeneticAlgorithmsStore = create<GeneticAlgorithmsStore>(set => ({
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
}))

export default useGeneticAlgorithmsStore
