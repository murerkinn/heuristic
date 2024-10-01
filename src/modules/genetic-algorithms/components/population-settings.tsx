import { yupResolver } from '@hookform/resolvers/yup'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as yup from 'yup'

import { Button } from '@/components/ui/button'
import { FormInput } from '@/components/ui/form-input'

import useGeneticAlgorithmsStore from '../store'
import type { PopulationSettings as PopulationSettingsType } from '../types'

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
  })
  .required()

export default function PopulationSettings() {
  const { populationSettings, setPopulationSettings, generatePopulation } =
    useGeneticAlgorithmsStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: populationSettings,
    reValidateMode: 'onChange',
  })

  const onSubmit = useCallback(
    (values: PopulationSettingsType) => {
      setPopulationSettings(values)
      generatePopulation()
      toast.success('Population generated successfully')
    },
    [setPopulationSettings, generatePopulation]
  )

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
        </div>

        <div className="grid">
          <Button className="ml-auto">Generate Population</Button>
        </div>
      </form>
    </div>
  )
}
