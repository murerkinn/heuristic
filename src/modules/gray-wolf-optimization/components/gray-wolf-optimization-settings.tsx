import { Button } from '@/components/ui/button'
import { FormInput } from '@/components/ui/form-input'
import { yupResolver } from '@hookform/resolvers/yup'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

const schema = yup
  .object({
    dimension: yup
      .number()
      .min(5, 'Dimensions must be between 5 and 50')
      .max(50, 'Dimensions must be between 5 and 50')
      .required('Dimensions is required'),
    populationSize: yup.number().min(1).required(),
    numberOfGenerations: yup.number().min(1).required(),
    a: yup.number().required(),
  })
  .required()

type GrayWolfOptimizationSettingsValues = yup.InferType<typeof schema>

interface GrayWolfOptimizationSettingsProps {
  values?: GrayWolfOptimizationSettingsValues
  onSubmit?: (values: GrayWolfOptimizationSettingsValues) => void
}

export default function GrayWolfOptimizationSettings({
  values,
  onSubmit: onSubmit_,
}: GrayWolfOptimizationSettingsProps) {
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
    async (values: GrayWolfOptimizationSettingsValues) => {
      if (!onSubmit_) return

      onSubmit_(values)
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
          {...register('numberOfGenerations')}
          id="number-of-generations"
          label="Number of Generations"
          step={1}
          // min={100}
          // max={10000}
          type="number"
          placeholder="e.g. 1000"
          error={errors.numberOfGenerations?.message as string}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <FormInput
          {...register('dimension')}
          id="dimension"
          label="Dimension"
          step={1}
          // min={100}
          // max={10000}
          type="number"
          placeholder="e.g. 1000"
          error={errors.dimension?.message as string}
        />

        <FormInput
          {...register('a')}
          id="a"
          label="A (Alpha)"
          step={1}
          // min={100}
          // max={10000}
          type="number"
          placeholder="e.g. 1000"
          error={errors.a?.message as string}
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
