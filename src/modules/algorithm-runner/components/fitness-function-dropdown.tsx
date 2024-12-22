import { Combobox } from '@/components/ui/combobox'
import { FitnessFunction } from 'workers/fitness-functions'

interface FitnessFunctionDropdownProps<T extends string = string> {
  value: T
  onChange: (algorithm: T) => void
}

export default function FitnessFunctionDropdown<T extends string>({
  value,
  onChange,
}: FitnessFunctionDropdownProps<T>) {
  return (
    <Combobox
      id="fitness-function-combobox"
      label="Fitness Function"
      placeholder="Select a fitness function"
      options={Object.values(FitnessFunction).map(a => ({
        label: a,
        value: a,
      }))}
      value={value}
      onChange={onChange}
    />
  )
}
