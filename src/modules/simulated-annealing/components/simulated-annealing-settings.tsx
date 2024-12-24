import { Button } from '@/components/ui/button'
import { FormInput } from '@/components/ui/form-input'
import { yupResolver } from '@hookform/resolvers/yup'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import SimulatedAnnealingDecreaseMethodDropdown from './decrease-method-dropdown'
import { FitnessFunction } from 'workers/fitness-functions'
import FitnessFunctionDropdown from '@/modules/algorithm-runner/components/fitness-function-dropdown'
import { useTranslation } from 'react-i18next'
import { SimulatedAnnealingDecreaseMethod } from 'workers/algorithms/simulated-annealing'

const schema = yup
  .object({
    dimension: yup.number().min(1).required(),
    initialTemperature: yup.number().min(0).required(),
    coolingRate: yup.number().min(0).required(),
    maxIterations: yup.number().min(1).required(),
    // decreaseMethod: yup.string().oneOf(['arithmetic', 'geometric']).required(),
  })
  .required()

type SimulatedAnnealingSettingsValues = yup.InferType<typeof schema>

interface SimulatedAnnealingSettingsProps {
  values?: SimulatedAnnealingSettingsValues
  onSubmit?: (
    values: SimulatedAnnealingSettingsValues & {
      decreaseMethod: SimulatedAnnealingDecreaseMethod
      fitnessFunction: FitnessFunction
    }
  ) => void
}

export default function SimulatedAnnealingSettings({
  values,
  onSubmit: onSubmit_,
}: SimulatedAnnealingSettingsProps) {
  const { t } = useTranslation()

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
  const [decreaseMethod, setDecreaseMethod] = useState(
    SimulatedAnnealingDecreaseMethod.Arithmetic
  )

  const onSubmit = useCallback(
    async (values: SimulatedAnnealingSettingsValues) => {
      if (!onSubmit_) return

      onSubmit_({
        ...values,
        decreaseMethod,
        fitnessFunction,
      })
    },
    [decreaseMethod, fitnessFunction, onSubmit_]
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
      <div className="grid md:grid-cols-2 gap-2">
        <FormInput
          {...register('dimension')}
          id="dimension"
          label={t('algorithms.simulated-annealing.form.dimension.label')}
          type="number"
          // min={0}
          // max={1}
          step={0.1}
          placeholder={t(
            'algorithms.simulated-annealing.form.dimension.placeholder'
          )}
          error={errors.dimension?.message as string}
        />

        <FormInput
          {...register('maxIterations')}
          id="maxIterations"
          label={t('algorithms.simulated-annealing.form.max-iterations.label')}
          type="number"
          // min={0}
          // max={1}
          step={0.1}
          placeholder={t(
            'algorithms.simulated-annealing.form.max-iterations.placeholder'
          )}
          error={errors.maxIterations?.message as string}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-2">
        <FormInput
          {...register('initialTemperature')}
          id="initialTemperature"
          label={t(
            'algorithms.simulated-annealing.form.initial-temperature.label'
          )}
          type="number"
          // min={0}
          // max={1}
          step={0.1}
          placeholder={t(
            'algorithms.simulated-annealing.form.initial-temperature.placeholder'
          )}
          error={errors.initialTemperature?.message as string}
        />

        <FormInput
          {...register('coolingRate')}
          id="coolingRate"
          label={t('algorithms.simulated-annealing.form.cooling-rate.label')}
          type="number"
          // min={0}
          // max={1}
          step={0.1}
          placeholder={t(
            'algorithms.simulated-annealing.form.cooling-rate.placeholder'
          )}
          error={errors.coolingRate?.message as string}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-2">
        <SimulatedAnnealingDecreaseMethodDropdown
          value={decreaseMethod}
          onChange={setDecreaseMethod}
        />

        <FitnessFunctionDropdown
          value={fitnessFunction}
          onChange={setFitnessFunction}
        />
      </div>

      <div className="flex flex-row items-center justify-end gap-1">
        <Button type="submit">
          {t('algorithms.simulated-annealing.form.save')}
        </Button>
      </div>
    </form>
  )
}
