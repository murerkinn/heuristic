import * as tf from '@tensorflow/tfjs'

import FitnessFunctions from '.'

describe('fitness function tests', () => {
  const dimensions = 10

  it('tests that ackley works correctly', () => {
    const x = tf.randomUniform(
      [dimensions],
      FitnessFunctions.ackley.lowerBound,
      FitnessFunctions.ackley.lowerBound
    )
    const result = FitnessFunctions.ackley.function(x)

    expect(result).toBeCloseTo(21.5703)
  })

  it('tests that dixonprice works correctly', () => {
    const x = tf.randomUniform(
      [dimensions],
      FitnessFunctions.dixonprice.lowerBound,
      FitnessFunctions.dixonprice.lowerBound
    )
    const result = FitnessFunctions.dixonprice.function(x)

    expect(result).toBeCloseTo(2381521)
  })

  it('tests that griewank works correctly', () => {
    const x = tf.randomUniform(
      [dimensions],
      FitnessFunctions.griewank.lowerBound,
      FitnessFunctions.griewank.lowerBound
    )
    const result = FitnessFunctions.griewank.function(x)

    expect(result).toBeCloseTo(900.9999607771135)
  })

  it('tests that rastrigin works correctly', () => {
    const x = tf.randomUniform(
      [dimensions],
      FitnessFunctions.rastrigin.lowerBound,
      FitnessFunctions.rastrigin.lowerBound
    )

    const result = FitnessFunctions.rastrigin.function(x)

    expect(result).toBeCloseTo(289.2471)
  })

  it('tests that rosenbrock works correctly', () => {
    const x = tf.randomUniform(
      [dimensions],
      FitnessFunctions.rosenbrock.lowerBound,
      FitnessFunctions.rosenbrock.lowerBound
    )

    const result = FitnessFunctions.rosenbrock.function(x)

    expect(result.toString().slice(0, 7)).toEqual(
      '15848433134899208'.slice(0, 7)
    )
  })

  it('tests that schwefel works correctly', () => {
    const x = tf.randomUniform(
      [dimensions],
      FitnessFunctions.schwefel.lowerBound,
      FitnessFunctions.schwefel.lowerBound
    )
    const result = FitnessFunctions.schwefel.function(x)

    expect(result).toBeCloseTo(2383.937414686082)
  })

  it('tests that sphere works correctly', () => {
    const x = tf.randomUniform(
      [dimensions],
      FitnessFunctions.sphere.lowerBound,
      FitnessFunctions.sphere.lowerBound
    )
    const result = FitnessFunctions.sphere.function(x)

    expect(result).toBeCloseTo(262.144)
  })

  it('tests that zakharov works correctly', () => {
    const x = tf.randomUniform(
      [dimensions],
      FitnessFunctions.zakharov.lowerBound,
      FitnessFunctions.zakharov.lowerBound
    )
    const result = FitnessFunctions.zakharov.function(x)

    expect(result.toString().slice(0, 7)).toEqual('357465445.3125'.slice(0, 7))
  })
})
