import * as tf from '@tensorflow/tfjs'

export default function rosenbrock(x: tf.Tensor<tf.Rank>) {
  return tf.tidy(() => {
    const x0 = x.slice(0, x.shape[0] - 1)
    const x1 = x.slice(1, x.shape[0] - 1)

    const sum1 = x0.sub(1).square().sum()
    const sum2 = x1.sub(x0.square()).square().sum()

    const result = sum1.add(sum2.mul(100))

    return result.dataSync()[0]
  })
}
