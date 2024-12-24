import { Combobox } from '@/components/ui/combobox'
import { useTranslation } from 'react-i18next'
import { GeneticAlgorithmMutationMethod } from 'workers/algorithms/genetic-algorithm/mutation-functions'

interface GeneticAlgorithmMutationFunctionDropdownProps<
  T extends string = string,
> {
  value: T
  onChange: (algorithm: T) => void
}

export default function GeneticAlgorithmMutationFunctionDropdown<
  T extends string,
>({ value, onChange }: GeneticAlgorithmMutationFunctionDropdownProps<T>) {
  const { t } = useTranslation()

  return (
    <Combobox
      id="mutation-function-combobox"
      label={t('algorithms.genetic-algorithm.mutation-function-dropdown.label')}
      placeholder={t(
        'algorithms.genetic-algorithm.Mutation-function-dropdown.placeholder'
      )}
      options={Object.values(GeneticAlgorithmMutationMethod).map(a => ({
        label: t(`algorithms.genetic-algorithm.mutation-functions.${a}.name`),
        description: t(
          `algorithms.genetic-algorithm.mutation-functions.${a}.description`
        ),
        value: a,
      }))}
      value={value}
      onChange={onChange}
    />
  )
}
