import { forwardRef } from 'react'

import { Input, type InputProps } from './input'
import { Label } from './label'

interface FormInputProps extends InputProps {
  label: string
  helperText?: string
  error?: string
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, helperText, error, id, ...rest }: FormInputProps, ref) => {
    return (
      <div className="grid gap-1">
        <div className="grid gap-2">
          <Label htmlFor={id}>{label}</Label>

          <Input id={id} ref={ref} {...rest} />
        </div>

        {helperText && <p className="text-sm text-muted">{helperText}</p>}
        <p className="text-xs text-destructive">{error}</p>
      </div>
    )
  }
)
