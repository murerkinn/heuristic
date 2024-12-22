import ackley from './ackley'
import dixonprice from './dixonprice'
import griewank from './griewank'
import rastrigin from './rastrigin'
import rosenbrock from './rosenbrock'
import schwefel from './schwefel'
import sphere from './sphere'
import zakharov from './zakharov'

export enum FitnessFunction {
  Ackley = 'ackley',
  DixonPrice = 'dixonprice',
  Griewank = 'griewank',
  Rastrigin = 'rastrigin',
  // Rosenbrock = 'rosenbrock',
  Schwefel = 'schwefel',
  Sphere = 'sphere',
  // Zakharov = 'zakharov',
}

export type FitnessFunctionObj = {
  name: string
  function: (...args: any) => number
  lowerBound: number
  upperBound: number
}

const FitnessFunctions: Record<FitnessFunction, FitnessFunctionObj> = {
  [FitnessFunction.Ackley]: {
    name: 'Ackley',
    function: ackley,
    lowerBound: -32.768,
    upperBound: 32.768,
  },
  [FitnessFunction.DixonPrice]: {
    name: 'Dixon Price',
    function: dixonprice,
    lowerBound: -10,
    upperBound: 10,
  },
  [FitnessFunction.Griewank]: {
    name: 'Griewank',
    function: griewank,
    lowerBound: -600,
    upperBound: 600,
  },
  [FitnessFunction.Rastrigin]: {
    name: 'Rastrigin',
    function: rastrigin,
    lowerBound: -5.12,
    upperBound: 5.12,
  },
  // [FitnessFunction.Rosenbrock]: {
  //   name: 'Rosenbrock',
  //   function: rosenbrock,
  //   lowerBound: -2048,
  //   upperBound: 2048,
  // },
  [FitnessFunction.Schwefel]: {
    name: 'Schwefel',
    function: schwefel,
    lowerBound: -500,
    upperBound: 500,
  },
  [FitnessFunction.Sphere]: {
    name: 'Sphere',
    function: sphere,
    lowerBound: -5.12,
    upperBound: 5.12,
  },
  // [FitnessFunction.Zakharov]: {
  //   name: 'Zakharov',
  //   function: zakharov,
  //   lowerBound: -5,
  //   upperBound: 10,
  // },
}

export default FitnessFunctions
