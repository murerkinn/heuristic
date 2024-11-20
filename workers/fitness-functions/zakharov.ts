import tf from '@tensorflow/tfjs'

export default function zakharov(x: tf.Tensor<tf.Rank>) {
  return tf.tidy(() => {
    const n = x.shape[0]
    const j = tf.range(1, n + 1)
    const sum1 = x.square().sum()
    const sum2 = x.mul(j).sum().div(2)

    return sum1.add(sum2.pow(2)).add(sum2.pow(4)).dataSync()[0]
  })
}
