import tf from '@tensorflow/tfjs'

export default function rastrigin(x: tf.Tensor<tf.Rank>) {
  const A = 10
  const n = x.shape[0]

  return tf
    .tidy(() => {
      const sum = x
        .square()
        .sub(
          x
            .mul(2 * Math.PI)
            .cos()
            .mul(A)
        )
        .sum()

      return tf.scalar(A * n + sum.dataSync()[0])
    })
    .dataSync()[0]
}
