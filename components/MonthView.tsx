import React from 'react';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  isSameMonth, 
  getISOWeek, 
  isToday,
  isWeekend
} from 'date-fns';
import { sk } from 'date-fns/locale';

interface MonthViewProps {
  date: Date;
}

export const MonthView: React.FC<MonthViewProps> = ({ date }) => {
  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(monthStart);
  
  // Create grid range (including days from prev/next months to fill rows)
  const startDate = startOfWeek(monthStart, { locale: sk });
  const endDate = endOfWeek(monthEnd, { locale: sk });
  
  const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });

  // Group days into weeks
  const weeks: Date[][] = [];
  let currentWeek: Date[] = [];

  calendarDays.forEach((day) => {
    currentWeek.push(day);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });

  const monthName = format(monthStart, 'MMMM yyyy', { locale: sk });
  const capitalizedMonthName = monthName.charAt(0).toUpperCase() + monthName.slice(1);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden break-inside-avoid">
      {/* Month Header */}
      <div className="bg-gray-50 border-b border-gray-100 px-6 py-4 flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-800 tracking-tight">
          {capitalizedMonthName}
        </h3>
        <span className="text-xs font-semibold uppercase text-gray-400 tracking-wider bg-gray-100 px-2 py-1 rounded">
          Mesiac {format(monthStart, 'M')}
        </span>
      </div>

      <div className="p-4 md:p-6 overflow-x-auto">
        <table className="w-full min-w-[500px] table-fixed border-collapse">
          <thead>
            <tr>
              {/* Week Number Column Header */}
              <th className="w-12 p-2 text-xs font-semibold text-gray-400 text-center uppercase border-b border-gray-100 bg-white">
                Týž.
              </th>
              {['Po', 'Ut', 'St', 'Št', 'Pi', 'So', 'Ne'].map((day, i) => (
                <th 
                  key={day} 
                  className={`p-2 text-sm font-semibold text-center border-b border-gray-100 ${i >= 5 ? 'text-red-400' : 'text-gray-600'}`}
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {weeks.map((week, weekIndex) => {
              // Get ISO week number from the Thursday of the week to handle year boundaries correctly according to ISO standard
              const thursdayOfWeek = week[3]; 
              const weekNumber = getISOWeek(thursdayOfWeek);

              return (
                <tr key={weekIndex} className="group hover:bg-gray-50 transition-colors">
                  {/* Week Number Cell */}
                  <td className="p-2 text-center border-r border-gray-100">
                    <span className="inline-block text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full w-full">
                      {weekNumber}.
                    </span>
                  </td>
                  
                  {/* Days Cells */}
                  {week.map((day) => {
                    const isCurrentMonth = isSameMonth(day, monthStart);
                    const isCurrentDay = isToday(day);
                    const isWeekendDay = isWeekend(day);
                    
                    return (
                      <td key={day.toISOString()} className="p-1 md:p-2 h-16 md:h-20 border-b border-gray-50 align-top">
                        <div 
                          className={`
                            h-full w-full rounded-lg p-1.5 flex flex-col items-start justify-between transition-all
                            ${!isCurrentMonth ? 'opacity-30 bg-gray-50' : ''}
                            ${isCurrentDay ? 'bg-blue-600 shadow-md transform scale-105 z-10' : ''}
                            ${isWeekendDay && isCurrentMonth && !isCurrentDay ? 'bg-red-50/30' : ''}
                          `}
                        >
                          <span 
                            className={`
                              text-sm font-medium leading-none
                              ${isCurrentDay ? 'text-white' : isWeekendDay ? 'text-red-500' : 'text-gray-700'}
                            `}
                          >
                            {format(day, 'd')}
                          </span>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};