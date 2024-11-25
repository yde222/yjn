// CustomDatePicker.tsx
import React, { useState, useEffect } from 'react'
import { Calendar } from '@pims-frontend/ui/components/ui/calendar'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@pims-frontend/ui/components/ui/popover'
import { Button } from '@pims-frontend/ui/components/ui/button'
import { ParameterizedIcon } from '@pims-frontend/ui/components/ui/parameterized-icon'
import { cn } from '@pims-frontend/ui/lib/utils'
import { format } from 'date-fns'

interface CustomDatePickerProps {
  value: Date | null
  onChange: (date: Date | null) => void
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  value,
  onChange,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    value ?? undefined,
  )

  // Synchronize local state with external value prop
  useEffect(() => {
    setSelectedDate(value ?? undefined)
  }, [value])

  const handleSelect = (date: Date | undefined) => {
    setSelectedDate(date ?? undefined)
    onChange(date ?? null)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'justify-start text-left font-normal',
            !selectedDate && 'text-muted-foreground',
          )}
        >
          <ParameterizedIcon name="Calendar" className="mr-2 h-4 w-4" />
          {selectedDate ? (
            format(selectedDate, 'yyyy.MM.dd')
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={selectedDate} // Now Date | undefined
          onSelect={handleSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}

export default CustomDatePicker
