import { Button } from '@/components/ui/button'
import { FormInput } from '@/components/ui/form-input'
import FitnessFunctionDropdown from '@/modules/algorithm-runner/components/fitness-function-dropdown'
import { yupResolver } from '@hookform/resolvers/yup'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { FitnessFunction } from 'workers/fitness-functions'
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
  onSubmit?: (
    values: GrayWolfOptimizationSettingsValues & {
      fitnessFunction: FitnessFunction
    }
  ) => void
}

export default function GrayWolfOptimizationSettings({
  values,
  onSubmit: onSubmit_,
}: GrayWolfOptimizationSettingsProps) {
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

  const onSubmit = useCallback(
    async (values: GrayWolfOptimizationSettingsValues) => {
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
          label={t(
            'algorithms.gray-wolf-optimization.form.population-size.label'
          )}
          step={1}
          // min={100}
          // max={10000}
          type="number"
          placeholder={t(
            'algorithms.gray-wolf-optimization.form.population-size.placeholder'
          )}
          error={errors.populationSize?.message as string}
        />

        <FormInput
          {...register('numberOfGenerations')}
          id="number-of-generations"
          label={t(
            'algorithms.gray-wolf-optimization.form.number-of-generations.label'
          )}
          step={1}
          // min={100}
          // max={10000}
          type="number"
          placeholder={t(
            'algorithms.gray-wolf-optimization.form.number-of-generations.placeholder'
          )}
          error={errors.numberOfGenerations?.message as string}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <FormInput
          {...register('dimension')}
          id="dimension"
          label={t('algorithms.gray-wolf-optimization.form.dimension.label')}
          step={1}
          // min={100}
          // max={10000}
          type="number"
          placeholder={t(
            'algorithms.gray-wolf-optimization.form.dimension.placeholder'
          )}
          error={errors.dimension?.message as string}
        />

        <FormInput
          {...register('a')}
          id="a"
          label={t('algorithms.gray-wolf-optimization.form.alpha.label')}
          step={1}
          // min={100}
          // max={10000}
          type="number"
          placeholder={t(
            'algorithms.gray-wolf-optimization.form.alpha.placeholder'
          )}
          error={errors.a?.message as string}
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
          <Button type="submit">
            {t('algorithms.gray-wolf-optimization.form.save')}
          </Button>
        </div>
      ) : null}
    </form>
  )
}
