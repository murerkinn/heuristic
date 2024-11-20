import tf from '@tensorflow/tfjs'

export default function griewank(x: tf.Tensor<tf.Rank>, from = 4000) {
  // n = len(x)
  // j = np.arange( 1., n+1 )
  // s = sum( x**2 )
  // p = prod( cos( x / sqrt(j) ))
  // return s/fr - p + 1

  const n = x.shape[0]
  const j = tf.range(1, n + 1)
  const s = x.square().sum().arraySync() as number
  const p = x.div(j.sqrt()).cos().prod().arraySync() as number

  return s / from - p + 1
}
