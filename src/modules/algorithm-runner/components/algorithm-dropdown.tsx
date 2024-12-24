import { Combobox } from '@/components/ui/combobox'
import { useTranslation } from 'react-i18next'
import { Algorithm } from 'workers/algorithms'

interface AlgorithmDropdownProps<T extends string = string> {
  value: T
  onChange: (algorithm: T) => void
}

export default function AlgorithmDropdown<T extends string>({
  value,
  onChange,
}: AlgorithmDropdownProps<T>) {
  const { t } = useTranslation()

  return (
    <Combobox
      id="algorithm-combobox"
      label={t('algorithm-runner.algorithm-dropdown.label')}
      placeholder={t('algorithm-runner.algorithm-dropdown.placeholder')}
      options={Object.values(Algorithm).map(a => ({
        label: t(`algorithms.${a}.name`),
        description: t(`algorithms.${a}.description`),
        value: a,
      }))}
      value={value}
      onChange={onChange}
    />
  )
}
