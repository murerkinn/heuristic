import type { Generation } from '@/modules/genetic-algorithms/types'
import { createContext, useContext, useEffect, useRef } from 'react'

type CustomWindow = typeof window & {
  HA: () => Promise<HeuristicAlgorithms>
}

interface VectorClassHandler<T = number> {
  size(): number
  get(index: number): T
}

interface HeuristicAlgorithms {
  runGeneticAlgorithm: (
    populationSize: number,
    dimensions: number,
    upperBound: number,
    lowerBound: number,
    mutationRate: number,
    crossoverRate: number,
    maxIterations: number
  ) => VectorClassHandler<Generation>
}

interface IWasmContext {
  ha: React.MutableRefObject<HeuristicAlgorithms>
}

const WasmContext = createContext<IWasmContext | null>(null)

const WasmProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const ha = useRef<HeuristicAlgorithms>()

  useEffect(() => {
    const loadWasm = async () => {
      if (
        typeof (window as CustomWindow).HA === 'function' &&
        ha.current === undefined
      ) {
        console.log('loading WASM!')
        const wasm = await (window as CustomWindow).HA()

        ha.current = wasm

        console.log('WASM loaded!', wasm)
      }
    }

    loadWasm()
  }, [])

  return (
    <WasmContext.Provider
      value={{ ha: ha as React.MutableRefObject<HeuristicAlgorithms> }}>
      {children}
    </WasmContext.Provider>
  )
}

export const useWasmContext = () => {
  const context = useContext(WasmContext)

  if (!context) {
    throw new Error('useWasmContext must be used within a WasmProvider')
  }

  return context as IWasmContext
}

export default WasmProvider
