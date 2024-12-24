import { yupResolver } from '@hookform/resolvers/yup'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { Button } from '@/components/ui/button'
import { FormInput } from '@/components/ui/form-input'
import { GeneticAlgorithmCrossoverMethod } from 'workers/algorithms/genetic-algorithm/crossover-functions'
import { GeneticAlgorithmSelectionMethod } from 'workers/algorithms/genetic-algorithm/selection-functions'
import { GeneticAlgorithmMutationMethod } from 'workers/algorithms/genetic-algorithm/mutation-functions'
import GeneticAlgorithmSelectionFunctionDropdown from './selection-function-dropdown'
import GeneticAlgorithmMutationFunctionDropdown from './mutation-function-dropdown'
import GeneticAlgorithmCrossoverFunctionDropdown from './crossover-function-dropdown'
import { useTranslation } from 'react-i18next'
import FitnessFunctionDropdown from '@/modules/algorithm-runner/components/fitness-function-dropdown'
import { FitnessFunction } from 'workers/fitness-functions'

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
  })
  .required()

type GeneticAlgorithmSettingsValues = yup.InferType<typeof schema>

interface GeneticAlgorithmSettingsProps {
  values?: GeneticAlgorithmSettingsValues
  onSubmit?: (
    values: GeneticAlgorithmSettingsValues & {
      crossoverMethod: GeneticAlgorithmCrossoverMethod
      selectionMethod: GeneticAlgorithmSelectionMethod
      mutationMethod: GeneticAlgorithmMutationMethod
      fitnessFunction: FitnessFunction
    }
  ) => void
}

export default function GeneticAlgorithmSettings({
  values,
  onSubmit: onSubmit_,
}: GeneticAlgorithmSettingsProps) {
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

  const [mutationMethod, setMutationMethod] = useState(
    GeneticAlgorithmMutationMethod.Swap
  )
  const [crossoverMethod, setCrossoverMethod] = useState(
    GeneticAlgorithmCrossoverMethod.OnePoint
  )
  const [selectionMethod, setSelectionMethod] = useState(
    GeneticAlgorithmSelectionMethod.Tournament
  )
  const [fitnessFunction, setFitnessFunction] = useState(FitnessFunction.Ackley)

  const onSubmit = useCallback(
    (data: GeneticAlgorithmSettingsValues) => {
      if (!onSubmit_) return

      onSubmit_({
        ...data,
        selectionMethod,
        crossoverMethod,
        mutationMethod,
        fitnessFunction,
      })
    },
    [
      onSubmit_,
      selectionMethod,
      crossoverMethod,
      mutationMethod,
      fitnessFunction,
    ]
  )

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-4 min-w-[800px]"
    >
      <div className="grid md:grid-cols-2 gap-4">
        <FormInput
          {...register('populationSize')}
          id="population-size"
          label={t('algorithms.genetic-algorithm.form.population-size.label')}
          step={1}
          // min={100}
          // max={10000}
          type="number"
          placeholder={t(
            'algorithms.genetic-algorithm.form.population-size.placeholder'
          )}
          error={errors.populationSize?.message as string}
        />

        <FormInput
          {...register('dimension')}
          id="dimensions"
          label={t('algorithms.genetic-algorithm.form.dimension.label')}
          type="number"
          placeholder={t(
            'algorithms.genetic-algorithm.form.dimension.placeholder'
          )}
          // min={5}
          // max={50}
          step={1}
          error={errors.dimension?.message as string}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <GeneticAlgorithmCrossoverFunctionDropdown
          value={crossoverMethod}
          onChange={setCrossoverMethod}
        />

        <FormInput
          {...register('crossoverRate')}
          id="crossover-rate"
          label={t('algorithms.genetic-algorithm.form.crossover-rate.label')}
          type="number"
          // min={0}
          // max={1}
          step={0.1}
          placeholder={t(
            'algorithms.genetic-algorithm.form.dimension.placeholder'
          )}
          error={errors.crossoverRate?.message as string}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <GeneticAlgorithmMutationFunctionDropdown
          value={mutationMethod}
          onChange={setMutationMethod}
        />

        <FormInput
          {...register('mutationRate')}
          id="mutation-rate"
          label={t('algorithms.genetic-algorithm.form.mutation-rate.label')}
          type="number"
          // min={0}
          // max={1}
          step={0.1}
          placeholder={t(
            'algorithms.genetic-algorithm.form.mutation-rate.placeholder'
          )}
          error={errors.mutationRate?.message as string}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <GeneticAlgorithmSelectionFunctionDropdown
          value={selectionMethod}
          onChange={setSelectionMethod}
        />

        <FormInput
          {...register('numberOfGenerations')}
          id="max-iterations"
          label={t(
            'algorithms.genetic-algorithm.form.number-of-generations.label'
          )}
          type="number"
          // min={0}
          // max={1}
          step={0.1}
          placeholder={t(
            'algorithms.genetic-algorithm.form.number-of-generations.placeholder'
          )}
          error={errors.numberOfGenerations?.message as string}
        />
      </div>

      <div>
        <FitnessFunctionDropdown
          value={fitnessFunction}
          onChange={setFitnessFunction}
        />
      </div>

      {onSubmit_ ? (
        <div className="flex flex-row items-center justify-end gap-1">
          <Button type="submit">
            {t('algorithms.genetic-algorithm.form.save')}
          </Button>
        </div>
      ) : null}
    </form>
  )
}
