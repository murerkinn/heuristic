import { Combobox } from '@/components/ui/combobox'
import { useTranslation } from 'react-i18next'
import { GeneticAlgorithmCrossoverMethod } from 'workers/algorithms/genetic-algorithm/crossover-functions'

interface GeneticAlgorithmCrossoverFunctionDropdownProps<
  T extends string = string,
> {
  value: T
  onChange: (algorithm: T) => void
}

export default function GeneticAlgorithmCrossoverFunctionDropdown<
  T extends string,
>({ value, onChange }: GeneticAlgorithmCrossoverFunctionDropdownProps<T>) {
  const { t } = useTranslation()

  return (
    <Combobox
      id="crossover-function-combobox"
      label={t(
        'algorithms.genetic-algorithm.crossover-function-dropdown.label'
      )}
      placeholder={t(
        'algorithms.genetic-algorithm.crossover-function-dropdown.placeholder'
      )}
      options={Object.values(GeneticAlgorithmCrossoverMethod).map(a => ({
        label: t(`algorithms.genetic-algorithm.crossover-functions.${a}.name`),
        description: t(
          `algorithms.genetic-algorithm.crossover-functions.${a}.description`
        ),
        value: a,
      }))}
      value={value}
      onChange={onChange}
    />
  )
}
