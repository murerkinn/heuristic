import type tf from '@tensorflow/tfjs'

export default function sphere(x: tf.Tensor<tf.Rank>) {
  return x.square().sum().dataSync()[0]
}
