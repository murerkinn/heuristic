import geneticAlgorithm from './genetic-algorithm'
import grayWolfOptimization from './gray-wolf-optimization'
import particleSwarmOptimization from './particle-swarm-optimization'

export enum Algorithm {
  GeneticAlgorithm = 'genetic-algorithm',
  SimulatedAnnealing = 'simulated-annealing',
  GrayWolfOptimization = 'gray-wolf-optimization',
  HarmonySearch = 'harmony-search',
  ParticleSwarmOptimization = 'particle-swarm-optimization',
}

const Algorithms = {
  [Algorithm.GeneticAlgorithm]: geneticAlgorithm,
  [Algorithm.SimulatedAnnealing]: () => null,
  [Algorithm.GrayWolfOptimization]: grayWolfOptimization,
  [Algorithm.HarmonySearch]: () => null,
  [Algorithm.ParticleSwarmOptimization]: particleSwarmOptimization,
}

export default Algorithms
