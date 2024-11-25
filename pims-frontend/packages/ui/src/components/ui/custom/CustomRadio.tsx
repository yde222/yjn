// CustomRadio.tsx
import React, { forwardRef } from 'react'
import { Label } from '../label'
import { RadioGroup, RadioGroupItem } from '../radio-group'

interface CustomRadioProps {
  value: string
  onChange: (value: string) => void
}

const CustomRadio: React.FC<CustomRadioProps> = ({ value, onChange }) => {
  return (
    <RadioGroup value={value} onValueChange={onChange}>
      <div className="flex space-x-3">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="same" id="r1" />
          <Label htmlFor="r1">같음</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="not" id="r2" />
          <Label htmlFor="r2">같지 않음</Label>
        </div>
      </div>
    </RadioGroup>
  )
}

export default CustomRadio
