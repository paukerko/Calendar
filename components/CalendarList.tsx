import React, { useMemo } from 'react';
import { addMonths, parseISO } from 'date-fns';
import { MonthView } from './MonthView';

export const CalendarList: React.FC = () => {
  // Define the range: December 2025 to December 2026
  const months = useMemo(() => {
    const startDate = parseISO('2025-12-01');
    const monthList: Date[] = [];
    
    // We want Dec 2025 through Dec 2026.
    // Dec 2025 is month 0. Dec 2026 is month 12. Total 13 months.
    for (let i = 0; i <= 12; i++) {
      monthList.push(addMonths(startDate, i));
    }
    return monthList;
  }, []);

  return (
    <div className="flex flex-col gap-8 pb-12">
      {months.map((date) => (
        <MonthView key={date.toISOString()} date={date} />
      ))}
    </div>
  );
};