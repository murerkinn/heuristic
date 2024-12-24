import { Combobox } from '@/components/ui/combobox'
import { useTranslation } from 'react-i18next'
import { FitnessFunction } from 'workers/fitness-functions'

interface FitnessFunctionDropdownProps<T extends string = string> {
  value: T
  onChange: (algorithm: T) => void
}

export default function FitnessFunctionDropdown<T extends string>({
  value,
  onChange,
}: FitnessFunctionDropdownProps<T>) {
  const { t } = useTranslation()

  return (
    <Combobox
      id="fitness-function-combobox"
      label={t('algorithm-runner.fitness-function-dropdown.label')}
      placeholder={t('algorithm-runner.fitness-function-dropdown.placeholder')}
      options={Object.values(FitnessFunction).map(a => ({
        label: t(`fitness-functions.${a}.name`),
        value: a,
      }))}
      value={value}
      onChange={onChange}
    />
  )
}
