import { Rabbit } from 'lucide-react'

import { Label } from './label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './select'

type ComboboxOption = {
  value: string
  label: string
  description?: string
}

interface ComboboxProps<T extends string> {
  id: string
  label: string
  placeholder: string
  value: T
  onChange: (value: T) => void
  options: ComboboxOption[]
}

export function Combobox<T extends string>({
  id,
  label,
  placeholder,
  options,
  value,
  onChange,
}: ComboboxProps<T>) {
  return (
    <div className="grid gap-3">
      <Label htmlFor={id}>{label}</Label>

      <Select value={value} onValueChange={onChange}>
        <SelectTrigger
          id={id}
          className="items-start [&_[data-description]]:hidden"
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent>
          {options.map(option => (
            <SelectItem key={option.value} value={option.value}>
              <div className="flex items-start gap-3 text-muted-foreground">
                {/* <Rabbit className="size-5" /> */}

                <div className="grid gap-0.5">
                  <p>
                    {/* Neural{' '} */}
                    <span className="font-medium text-foreground">
                      {option.label}
                    </span>
                  </p>

                  {option.description ? (
                    <p className="text-xs" data-description>
                      {option.description}
                    </p>
                  ) : null}
                </div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
