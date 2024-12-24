import { Combobox } from '@/components/ui/combobox'
import { useTranslation } from 'react-i18next'
import { GeneticAlgorithmSelectionMethod } from 'workers/algorithms/genetic-algorithm/selection-functions'

interface GeneticAlgorithmSelectionFunctionDropdownProps<
  T extends string = string,
> {
  value: T
  onChange: (algorithm: T) => void
}

export default function GeneticAlgorithmSelectionFunctionDropdown<
  T extends string,
>({ value, onChange }: GeneticAlgorithmSelectionFunctionDropdownProps<T>) {
  const { t } = useTranslation()

  return (
    <Combobox
      id="selection-function-combobox"
      label={t(
        'algorithms.genetic-algorithm.selection-function-dropdown.label'
      )}
      placeholder={t(
        'algorithms.genetic-algorithm.selection-function-dropdown.placeholder'
      )}
      options={Object.values(GeneticAlgorithmSelectionMethod).map(a => ({
        label: t(`algorithms.genetic-algorithm.selection-functions.${a}.name`),
        description: t(
          `algorithms.genetic-algorithm.selection-functions.${a}.description`
        ),
        value: a,
      }))}
      value={value}
      onChange={onChange}
    />
  )
}
