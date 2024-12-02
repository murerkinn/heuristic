import { yupResolver } from '@hookform/resolvers/yup'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { Button } from '@/components/ui/button'
import { FormInput } from '@/components/ui/form-input'
import { GeneticAlgorithmSelectionMethod } from 'workers/algorithms/genetic-algorithm/selection-functions'
import { GeneticAlgorithmCrossoverMethod } from 'workers/algorithms/genetic-algorithm/crossover-functions'

const schema = yup
  .object({
    populationSize: yup
      .number()
      .min(100, 'Population size must be between 100 and 1000')
      .max(1000, 'Population size must be between 100 and 1000')
      .required('Population size is required'),
    dimension: yup
      .number()
      .min(5, 'Dimensions must be between 5 and 50')
      .max(50, 'Dimensions must be between 5 and 50')
      .required('Dimensions is required'),
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
    numberOfGenerations: yup
      .number()
      .min(1, 'Max iterations must be at least 1')
      .max(1000000, 'Max iterations must be at most 1000')
      .required('Max iterations is required'),
    // selectionMethod: yup
    //   .string()
    //   .oneOf(Object.values(GeneticAlgorithmSelectionMethod))
    //   .required(),
    // crossoverMethod: yup
    //   .string()
    //   .oneOf(Object.values(GeneticAlgorithmCrossoverMethod))
    //   .required(),
  })
  .required()

type GeneticAlgorithmSettingsValues = yup.InferType<typeof schema>

interface GeneticAlgorithmSettingsProps {
  values?: GeneticAlgorithmSettingsValues
  onSubmit?: (values: GeneticAlgorithmSettingsValues) => void
}

export default function GeneticAlgorithmSettings({
  values,
  onSubmit: onSubmit_,
}: GeneticAlgorithmSettingsProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: values,
    reValidateMode: 'onChange',
  })

  const onSubmit = useCallback(
    (data: GeneticAlgorithmSettingsValues) => {
      if (!onSubmit_) return

      onSubmit_(data)
    },
    [onSubmit_]
  )

  return (
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
          error={errors.populationSize?.message as string}
        />

        <FormInput
          {...register('dimension')}
          id="dimensions"
          label="Dimensions"
          type="number"
          placeholder="e.g. 10"
          // min={5}
          // max={50}
          step={1}
          error={errors.dimension?.message as string}
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
          error={errors.crossoverRate?.message as string}
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
          error={errors.mutationRate?.message as string}
        />

        <FormInput
          {...register('numberOfGenerations')}
          id="max-iterations"
          label="Max Iterations"
          type="number"
          // min={0}
          // max={1}
          step={0.1}
          placeholder="e.g. 20"
          error={errors.numberOfGenerations?.message as string}
        />
      </div>

      {onSubmit_ ? (
        <div className="flex flex-row items-center justify-end gap-1">
          <Button type="submit">Save</Button>
        </div>
      ) : null}
    </form>
  )
}
