import { Combobox } from '@/components/ui/combobox'
import { useTranslation } from 'react-i18next'
import { SimulatedAnnealingDecreaseMethod } from 'workers/algorithms/simulated-annealing'

interface SimulatedAnnealingDecreaseMethodDropdownProps<
  T extends string = string,
> {
  value: T
  onChange: (algorithm: T) => void
}

export default function SimulatedAnnealingDecreaseMethodDropdown<
  T extends string,
>({ value, onChange }: SimulatedAnnealingDecreaseMethodDropdownProps<T>) {
  const { t } = useTranslation()

  return (
    <Combobox
      id="decrease-method-combobox"
      label={t('algorithms.simulated-annealing.decrease-method-dropdown.label')}
      placeholder={t(
        'algorithms.simulated-annealing.decrease-method-dropdown.placeholder'
      )}
      options={Object.values(SimulatedAnnealingDecreaseMethod).map(a => ({
        label: t(`algorithms.simulated-annealing.decrease-methods.${a}.name`),
        description: t(
          `algorithms.simulated-annealing.decrease-methods.${a}.description`
        ),
        value: a,
      }))}
      value={value}
      onChange={onChange}
    />
  )
}
