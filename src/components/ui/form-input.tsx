import { Input, type InputProps } from './input'
import { Label } from './label'

interface FormInputProps extends InputProps {
  label: string
  helperText?: string
  error?: string
}

export function FormInput({
  label,
  helperText,
  error,
  id,
  ...rest
}: FormInputProps) {
  return (
    <div className="grid gap-1">
      <div className="grid gap-2">
        <Label htmlFor={id}>{label}</Label>

        <Input id={id} {...rest} />
      </div>

      {helperText && <p className="text-sm text-muted">{helperText}</p>}
      {error && <p className="text-sm text-error">{error}</p>}
    </div>
  )
}
