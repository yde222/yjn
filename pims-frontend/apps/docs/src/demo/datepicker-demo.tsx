'use client';

import { Button } from '@pims-frontend/ui/components/ui/button';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@pims-frontend/ui/components/ui/popover';
import { cn } from '@pims-frontend/ui/lib/utils';

import useDate from './useData';
import { Calendar } from '@pims-frontend/ui/components/ui/calendar';
import { getFormatDate } from '@pims-frontend/ui/lib/get-format-date';
import { CalendarIcon } from 'lucide-react';

export function DatePickerDemo() {
  const { date, setDate } = useDate();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-[280px] justify-start text-left font-normal',
            !date && 'text-muted-foreground',
          )}
        >
          <CalendarIcon className="w-4 h-4 mr-2" />
          {date ? (
            getFormatDate({ date: date, type: 'PPP' })
          ) : (
            <span>Escolha a data</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
