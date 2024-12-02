import { Button } from '@/components/ui/button'
import { FormInput } from '@/components/ui/form-input'
import { yupResolver } from '@hookform/resolvers/yup'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

const schema = yup
  .object({
    dimension: yup.number().min(1, 'Dimension must be at least 1').required(),
    numberOfIterations: yup
      .number()
      .min(1, 'Population size must be at least 1')
      .required(),
  })
  .required()

type HarmonySearchSettingsValues = yup.InferType<typeof schema>

interface HarmonySearchSettingsProps {
  values?: HarmonySearchSettingsValues
  onSubmit?: (values: HarmonySearchSettingsValues) => void
}

export default function HarmonySearchSettings({
  values,
  onSubmit: onSubmit_,
}: HarmonySearchSettingsProps) {
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
    async (values: HarmonySearchSettingsValues) => {
      if (!onSubmit_) return

      onSubmit_(values)
    },
    [onSubmit_]
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
      <div className="grid md:grid-cols-2 gap-4">
        <FormInput
          {...register('numberOfIterations')}
          id="number-of-iterations"
          label="Number of Iterations"
          step={1}
          // min={100}
          // max={10000}
          type="number"
          placeholder="e.g. 1000"
          error={errors.numberOfIterations?.message as string}
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

      <div className="flex flex-row items-center justify-end gap-1">
        <Button type="submit">Save</Button>
      </div>
    </form>
  )
}
