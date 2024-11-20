import ackley from './ackley'
import dixonprice from './dixonprice'
import griewank from './griewank'
import rastrigin from './rastrigin'
import rosenbrock from './rosenbrock'
import schwefel from './schwefel'
import sphere from './sphere'
import zakharov from './zakharov'

const FitnessFunctions = {
  ackley: {
    name: 'Ackley',
    function: ackley,
    lowerBound: -32.768,
    upperBound: 32.768,
  },
  dixonprice: {
    name: 'Dixon Price',
    function: dixonprice,
    lowerBound: -10,
    upperBound: 10,
  },
  griewank: {
    name: 'Griewank',
    function: griewank,
    lowerBound: -600,
    upperBound: 600,
  },
  rastrigin: {
    name: 'Rastrigin',
    function: rastrigin,
    lowerBound: -5.12,
    upperBound: 5.12,
  },
  rosenbrock: {
    name: 'Rosenbrock',
    function: rosenbrock,
    lowerBound: -2048,
    upperBound: 2048,
  },
  schwefel: {
    name: 'Schwefel',
    function: schwefel,
    lowerBound: -500,
    upperBound: 500,
  },
  sphere: {
    name: 'Sphere',
    function: sphere,
    lowerBound: -5.12,
    upperBound: 5.12,
  },
  zakharov: {
    name: 'Zakharov',
    function: zakharov,
    lowerBound: -5,
    upperBound: 10,
  },
}

export type FitnessFunction = keyof typeof FitnessFunctions

export default FitnessFunctions
