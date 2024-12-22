import { Button } from '@/components/ui/button'
import { FormInput } from '@/components/ui/form-input'
import FitnessFunctionDropdown from '@/modules/algorithm-runner/components/fitness-function-dropdown'
import { yupResolver } from '@hookform/resolvers/yup'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FitnessFunction } from 'workers/fitness-functions'
import * as yup from 'yup'

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
    maxIterations: yup
      .number()
      .min(1, 'Max iterations must be at least 1')
      .max(1000000, 'Max iterations must be at most 1000')
      .required('Max iterations is required'),
  })
  .required()

type ParticleSwarmOptimizationSettingsValues = yup.InferType<typeof schema>

interface ParticleSwarmOptimizationSettingsProps {
  values?: ParticleSwarmOptimizationSettingsValues
  onSubmit?: (
    values: ParticleSwarmOptimizationSettingsValues & {
      fitnessFunction: FitnessFunction
    }
  ) => void
}

export default function ParticleSwarmOptimizationSettings({
  values,
  onSubmit: onSubmit_,
}: ParticleSwarmOptimizationSettingsProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: values,
    reValidateMode: 'onChange',
  })
  const [fitnessFunction, setFitnessFunction] = useState(FitnessFunction.Ackley)

  const onSubmit = useCallback(
    async (values: ParticleSwarmOptimizationSettingsValues) => {
      if (!onSubmit_) return

      onSubmit_({
        ...values,
        fitnessFunction,
      })
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

      <div>
        <FormInput
          {...register('maxIterations')}
          id="maxIterations"
          label="Max Iterations"
          type="number"
          placeholder="e.g. 10"
          // min={5}
          // max={50}
          step={1}
          error={errors.maxIterations?.message as string}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <FitnessFunctionDropdown
          value={fitnessFunction}
          onChange={setFitnessFunction}
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
