import tf from '@tensorflow/tfjs'

export default function dixonprice(x: tf.Tensor<tf.Rank>) {
  const n = x.shape[0]
  const j = tf.range(2, n + 1)
  const x2 = x.square().mul(2)

  return j
    .mul(
      x2
        .slice([1], [n - 1])
        .sub(x.slice([0], [n - 1]))
        .square()
    )
    .sum()
    .add(x.slice([0], [1]).sub(1).square())
    .dataSync()[0]
}
