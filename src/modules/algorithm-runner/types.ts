import type { Algorithm } from 'workers/algorithms'
import type { GeneticAlgorithmPayload } from 'workers/algorithms/genetic-algorithm'
import type { GrayWolfOptimizationPayload } from 'workers/algorithms/gray-wolf-optimization'
import type { HarmonySearchPayload } from 'workers/algorithms/harmony-search'
import type { ParticleSwarmOptimizationPayload } from 'workers/algorithms/particle-swarm-optimization'
import type { SimulatedAnnealingPayload } from 'workers/algorithms/simulated-annealing'

export enum AlgorithmRunState {
  Pending = 'pending',
  Running = 'running',
  Completed = 'completed',
  Error = 'error',
}

interface AlgorithmRunBase {
  bestFitness: number
  state: AlgorithmRunState
  convergenceCurve: number[]
}

interface AlgorithmRunGeneticAlgorithm extends AlgorithmRunBase {
  algorithm: Algorithm.GeneticAlgorithm
  payload: GeneticAlgorithmPayload
}

interface AlgorithmRunSimulatedAnnealing extends AlgorithmRunBase {
  algorithm: Algorithm.SimulatedAnnealing
  payload: SimulatedAnnealingPayload
}

interface AlgorithmRunGrayWolfOptimization extends AlgorithmRunBase {
  algorithm: Algorithm.GrayWolfOptimization
  payload: GrayWolfOptimizationPayload
}

interface AlgorithmRunHarmonySearch extends AlgorithmRunBase {
  algorithm: Algorithm.HarmonySearch
  payload: HarmonySearchPayload
}

interface AlgorithmRunParticleSwarmOptimization extends AlgorithmRunBase {
  algorithm: Algorithm.ParticleSwarmOptimization
  payload: ParticleSwarmOptimizationPayload
}

export type AlgorithmRun =
  | AlgorithmRunGeneticAlgorithm
  | AlgorithmRunSimulatedAnnealing
  | AlgorithmRunGrayWolfOptimization
  | AlgorithmRunHarmonySearch
  | AlgorithmRunParticleSwarmOptimization

export interface AlgorithmRunnerStore {
  runs: AlgorithmRun[]
  startRun: (run: AlgorithmRun) => void
}
