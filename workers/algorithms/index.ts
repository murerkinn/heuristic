import geneticAlgorithm from './genetic-algorithm'

export enum Algorithm {
  GeneticAlgorithm = 'genetic-algorithm',
  SimulatedAnnealing = 'simulated-annealing',
  GrayWolfOptimization = 'gray-wolf-optimization',
  HarmonySearch = 'harmony-search',
  ParticleSwarmOptimization = 'particle-swarm-optimization',
}

const Algorithms = {
  geneticAlgorithm,
}

export default Algorithms
