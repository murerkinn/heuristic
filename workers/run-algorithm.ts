import Algorithms, { type Algorithm } from './algorithms'

type Payload = {
  algorithm: Algorithm
  payload: any
}

function runAlgorithm(payload: Payload) {
  console.log('Running algorithm...', payload)

  const algorithm = Algorithms[payload.algorithm]

  algorithm(payload.payload, val => {
    self.postMessage(val)
    console.log('Iteration', val)
  })
}

self.onmessage = e => {
  runAlgorithm(e.data)
}
