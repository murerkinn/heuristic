import { Combobox } from '@/components/ui/combobox'
import { Algorithm } from 'workers/algorithms'

interface AlgorithmDropdownProps<T extends string = string> {
  value: T
  onChange: (algorithm: T) => void
}

export default function AlgorithmDropdown<T extends string>({
  value,
  onChange,
}: AlgorithmDropdownProps<T>) {
  return (
    <Combobox
      id="algorithm-combobox"
      label="Algorithm"
      placeholder="Select an algorithm"
      options={Object.values(Algorithm).map(a => ({
        label: a,
        value: a,
      }))}
      value={value}
      onChange={onChange}
    />
  )
}
