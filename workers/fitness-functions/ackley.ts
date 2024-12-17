import * as tf from '@tensorflow/tfjs'

export default function ackley(
  x: tf.Tensor<tf.Rank>,
  a = 20,
  b = 0.2,
  c = 2 * Math.PI
) {
  const n = x.shape[0]
  const sum1 = x.square().sum()
  const sum2 = x.mul(c).cos().sum()

  // -a*exp( -b*sqrt( s1 / n )) - exp( s2 / n ) + a + exp(1)

  const exp1 = tf.exp(tf.scalar(-b).mul(sum1.div(n).sqrt()))
  const exp2 = tf.exp(sum2.div(n))

  return tf.scalar(-a).mul(exp1).sub(exp2).add(a).add(tf.exp(1)).dataSync()[0]
}
