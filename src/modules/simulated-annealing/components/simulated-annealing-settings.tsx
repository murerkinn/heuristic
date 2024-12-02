import { Button } from '@/components/ui/button'
import { FormInput } from '@/components/ui/form-input'
import { yupResolver } from '@hookform/resolvers/yup'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

const schema = yup
  .object({
    dimension: yup.number().min(1).required(),
    initialTemperature: yup.number().min(0).required(),
    coolingRate: yup.number().min(0).required(),
    maxIterations: yup.number().min(1).required(),
    decreaseMethod: yup.string().oneOf(['arithmetic', 'geometric']).required(),
  })
  .required()

type SimulatedAnnealingSettingsValues = yup.InferType<typeof schema>

interface SimulatedAnnealingSettingsProps {
  values?: SimulatedAnnealingSettingsValues
  onSubmit?: (values: SimulatedAnnealingSettingsValues) => void
}

export default function SimulatedAnnealingSettings({
  values,
  onSubmit: onSubmit_,
}: SimulatedAnnealingSettingsProps) {
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
    async (values: SimulatedAnnealingSettingsValues) => {
      if (!onSubmit_) return

      onSubmit_(values)
    },
    []
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
      <div className="grid md:grid-cols-2 gap-2">
        <FormInput
          {...register('dimension')}
          id="dimension"
          label="Dimension"
          type="number"
          // min={0}
          // max={1}
          step={0.1}
          placeholder="e.g. 70"
          error={errors.dimension?.message as string}
        />

        <FormInput
          {...register('maxIterations')}
          id="maxIterations"
          label="Max Iterations"
          type="number"
          // min={0}
          // max={1}
          step={0.1}
          placeholder="e.g. 70"
          error={errors.maxIterations?.message as string}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-2">
        <FormInput
          {...register('initialTemperature')}
          id="initialTemperature"
          label="Initial Temperature"
          type="number"
          // min={0}
          // max={1}
          step={0.1}
          placeholder="e.g. 70"
          error={errors.initialTemperature?.message as string}
        />

        <FormInput
          {...register('coolingRate')}
          id="coolingRate"
          label="Cooling Rate"
          type="number"
          // min={0}
          // max={1}
          step={0.1}
          placeholder="e.g. 70"
          error={errors.coolingRate?.message as string}
        />
      </div>

      <div>{/* TODO: decrease method dropdown */}</div>

      <div className="flex flex-row items-center justify-end gap-1">
        <Button type="submit">Save</Button>
      </div>
    </form>
  )
}
