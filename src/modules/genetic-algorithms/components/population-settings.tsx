import { yupResolver } from '@hookform/resolvers/yup'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
// import { toast } from 'sonner'
import * as yup from 'yup'

import { Button } from '@/components/ui/button'
import { FormInput } from '@/components/ui/form-input'

import useGeneticAlgorithmsStore from '../store'
import type { PopulationSettings as PopulationSettingsType } from '../types'
import { useWasmContext } from '@/components/wasm-provider'

const schema = yup
  .object({
    populationSize: yup
      .number()
      .min(100, 'Population size must be between 100 and 1000')
      .max(1000, 'Population size must be between 100 and 1000')
      .required('Population size is required'),
    dimensions: yup
      .number()
      .min(5, 'Dimensions must be between 5 and 50')
      .max(50, 'Dimensions must be between 5 and 50')
      .required('Dimensions is required'),
    upperBound: yup
      .number()
      .max(500, 'Upper bound must be 500 at most')
      .required(),
    lowerBound: yup
      .number()
      .min(-500, 'Lower bound must be -500 at least')
      .required(),
    crossoverRate: yup
      .number()
      .min(0, 'Crossover rate must be between 0 and 1')
      .max(1, 'Crossover rate must be between 0 and 1')
      .required(),
    mutationRate: yup
      .number()
      .min(0, 'Mutation rate must be between 0 and 1')
      .max(1, 'Mutation rate must be between 0 and 1')
      .required(),
    maxIterations: yup
      .number()
      .min(1, 'Max iterations must be at least 1')
      .max(1000000, 'Max iterations must be at most 1000')
      .required('Max iterations is required'),
  })
  .required()

export default function PopulationSettings() {
  const {
    populationSettings,
    mutationMethod,
    selectionMethod,
    crossoverMethod,
    fitnessFunction,
    setPopulationSettings,
    setGenerations,
  } = useGeneticAlgorithmsStore()
  const { ha } = useWasmContext()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: populationSettings,
    reValidateMode: 'onChange',
  })

  const handleWorker = useCallback(() => {
    const worker = new Worker(
      new URL('../../../../workers/run-algorithm.ts', import.meta.url)
    )

    console.time('worker')

    worker.postMessage({
      populationSettings,
      mutationMethod,
      selectionMethod,
      crossoverMethod,
      fitnessFunction,
    })

    worker.onmessage = e => {
      console.timeEnd('worker')
      setGenerations(e.data)
    }

    worker.onerror = e => {
      console.log('e', e)
    }
  }, [
    mutationMethod,
    selectionMethod,
    crossoverMethod,
    fitnessFunction,
    populationSettings,
    setGenerations,
  ])

  const onSubmit = useCallback(
    async (values: PopulationSettingsType) => {
      setPopulationSettings(values)
    },
    [setPopulationSettings]
  )

  const handleWasm = useCallback(() => {
    console.time('runGeneticAlgorithm')

    const val = ha.current.runGeneticAlgorithm(
      populationSettings.populationSize,
      populationSettings.dimensions,
      populationSettings.upperBound,
      populationSettings.lowerBound,
      populationSettings.mutationRate,
      populationSettings.crossoverRate,
      populationSettings.maxIterations
    )

    console.timeEnd('runGeneticAlgorithm')

    console.log('val', val.size())

    const generations = Array.from({ length: val.size() }, (_, i) => val.get(i))

    setGenerations(generations)
  }, [populationSettings, ha, setGenerations])

  return (
    <div>
      <h2 className="font-semibold text-xl mb-6">Population Settings</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
        <div className="grid md:grid-cols-2 gap-4">
          <FormInput
            {...register('populationSize')}
            id="population-size"
            label="Population Size"
            step={1}
            // min={100}
            // max={10000}
            type="number"
            placeholder="e.g. 1000"
            error={errors.populationSize?.message}
          />

          <FormInput
            {...register('dimensions')}
            id="dimensions"
            label="Dimensions"
            type="number"
            placeholder="e.g. 10"
            // min={5}
            // max={50}
            step={1}
            error={errors.dimensions?.message}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <FormInput
            {...register('lowerBound')}
            id="lower-bound"
            label="Lower Bound"
            type="number"
            placeholder="e.g. -500"
            // min={-500}
            step={1}
            error={errors.lowerBound?.message}
          />

          <FormInput
            {...register('upperBound')}
            id="upper-bound"
            label="Upper Bound"
            type="number"
            placeholder="e.g. 500"
            // max={500}
            step={1}
            error={errors.upperBound?.message}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-2">
          <FormInput
            {...register('crossoverRate')}
            id="crossover-rate"
            label="Crossover Rate"
            type="number"
            // min={0}
            // max={1}
            step={0.1}
            placeholder="e.g. 70"
            error={errors.crossoverRate?.message}
          />

          <FormInput
            {...register('mutationRate')}
            id="mutation-rate"
            label="Mutation Rate"
            type="number"
            // min={0}
            // max={1}
            step={0.1}
            placeholder="e.g. 20"
            error={errors.mutationRate?.message}
          />

          <FormInput
            {...register('maxIterations')}
            id="max-iterations"
            label="Max Iterations"
            type="number"
            // min={0}
            // max={1}
            step={0.1}
            placeholder="e.g. 20"
            error={errors.maxIterations?.message}
          />
        </div>

        <div className="flex flex-row items-center justify-end gap-1">
          <Button type="button" onClick={handleWorker}>
            Worker
          </Button>
          <Button type="button" onClick={handleWasm}>
            Wasm
          </Button>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </div>
  )
}
