'use client';

import { Calendar } from '@pims-frontend/ui/components/ui/calendar';
import useDate from './useData';

export function CalendarDemo() {
  const { date, setDate } = useDate();

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="border rounded-md"
    />
  );
}
