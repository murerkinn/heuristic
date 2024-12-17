import { Algorithm } from 'workers/algorithms'

import GeneticAlgorithmSettings from '@/modules/genetic-algorithm/components/genetic-algorithm-settings'
import SimulatedAnnealingSettings from '@/modules/simulated-annealing/components/simulated-annealing-settings'
import ParticleSwarmOptimizationSettings from '@/modules/particle-swarm-optimization/components/particle-swarm-optimization-settings'
import GrayWolfOptimizationSettings from '@/modules/gray-wolf-optimization/components/gray-wolf-optimization-settings'
import HarmonySearchSettings from '@/modules/harmony-search/components/harmony-search-settings'

interface AlgorithmSettingsProps {
  algorithm: Algorithm
  onSubmit: (payload: any) => void
}

export default function AlgorithmSettings({
  algorithm,
  onSubmit,
}: AlgorithmSettingsProps) {
  if (algorithm === Algorithm.GeneticAlgorithm) {
    return <GeneticAlgorithmSettings onSubmit={onSubmit} />
  }

  if (algorithm === Algorithm.SimulatedAnnealing) {
    return <SimulatedAnnealingSettings onSubmit={onSubmit} />
  }

  if (algorithm === Algorithm.ParticleSwarmOptimization) {
    return <ParticleSwarmOptimizationSettings onSubmit={onSubmit} />
  }

  if (algorithm === Algorithm.GrayWolfOptimization) {
    return <GrayWolfOptimizationSettings onSubmit={onSubmit} />
  }

  if (algorithm === Algorithm.HarmonySearch) {
    return <HarmonySearchSettings onSubmit={onSubmit} />
  }
}
