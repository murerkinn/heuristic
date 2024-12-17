import * as tf from '@tensorflow/tfjs'

export default function schwefel(x: tf.Tensor<tf.Rank>) {
  return tf.tidy(() => {
    const n = x.shape[0]
    const sum = x.abs().sqrt().sin().mul(x).sum()

    const result = sum.neg().add(418.9829 * n)

    return result.dataSync()[0]
  })
}
