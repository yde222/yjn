'use client';

import { safeParseMultiFormatAndFormat } from '@pims-frontend/ui/lib/date-fns-additional-utils';
import { DateRange } from 'react-day-picker';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';
import { Calendar } from '../ui/calendar';
import { ParameterizedIcon } from '../ui/parameterized-icon';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

export type CommonCalendarRangeSelectorProps = {
  range: {
    from: Date;
    to: Date;
  };
  onChangeFrom?: (date?: Date | null) => void;
  onChangeTo?: (date?: Date | null) => void;
  placeholder?: string;
};

export function CommonCalendarRangeSelector({
  range,
  onChangeFrom,
  onChangeTo,
  placeholder = '날짜 선택',
}: CommonCalendarRangeSelectorProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id="date"
          variant={'outline'}
          className={cn(
            'w-full justify-start !mt-0 max-w-full',
            !range && 'text-muted-foreground',
          )}
        >
          <ParameterizedIcon name="Calendar" className="h-4 w-4" />
          {(!range?.from || !range?.to) && placeholder}
          {range?.from && safeParseMultiFormatAndFormat(range?.from)}
          {range?.from && ' - '}
          {range?.to && safeParseMultiFormatAndFormat(range.to)}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          initialFocus
          mode="range"
          numberOfMonths={2}
          selected={{
            from: range?.from || undefined,
            to: range?.to || undefined,
          }}
          onSelect={(range: DateRange | undefined) => {
            if (range?.from) {
              onChangeFrom?.(range.from);
            }

            if (range?.to) {
              onChangeTo?.(range.to);
            }
          }}
        />
      </PopoverContent>
    </Popover>
  );
}

export type CommonSingleCalendarSelectorProps = {
  date?: Date;
  placeholder?: string;
  onChange?: (date?: Date | string | null) => void;
};

export function CommonSingleCalendarSelector({
  date,
  placeholder = '날짜 선택',
  onChange,
}: CommonSingleCalendarSelectorProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id="date"
          variant={'outline'}
          className={cn('w-full justify-start !mt-0 max-w-full')}
        >
          <ParameterizedIcon name="Calendar" className="h-4 w-4" />
          {date ? safeParseMultiFormatAndFormat(date) : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          initialFocus
          mode="single"
          numberOfMonths={1}
          selected={date}
          onSelect={(date: Date | undefined) => {
            if (date) {
              onChange?.(date);
            }
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
