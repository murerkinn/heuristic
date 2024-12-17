import geneticAlgorithm from './genetic-algorithm'
import grayWolfOptimization from './gray-wolf-optimization'

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
  [Algorithm.ParticleSwarmOptimization]: () => null,
}

export default Algorithms
