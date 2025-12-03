import React, { useState } from 'react';
import { addWeeks, format, parseISO, isValid } from 'date-fns';
import { sk } from 'date-fns/locale';
import { Calculator, ArrowRight, CalendarClock } from 'lucide-react';

export const DateCalculator: React.FC = () => {
  const [inputDate, setInputDate] = useState<string>('');

  // Calculate result date
  const resultDate = inputDate ? addWeeks(parseISO(inputDate), 10) : null;
  const isDateValid = resultDate && isValid(resultDate);

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden">
      <div className="bg-blue-600 p-4 flex items-center gap-2">
        <Calculator className="w-5 h-5 text-blue-100" />
        <h2 className="text-white font-semibold text-lg">Kalkulačka +10 týždňov</h2>
      </div>
      
      <div className="p-6 space-y-6">
        <div>
          <label htmlFor="start-date" className="block text-sm font-medium text-gray-700 mb-2">
            Vyberte počiatočný dátum
          </label>
          <input
            id="start-date"
            type="date"
            value={inputDate}
            onChange={(e) => setInputDate(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-gray-800"
          />
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-gray-200 border-dashed" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-2 text-gray-400">
              <ArrowRight className="w-5 h-5" />
            </span>
          </div>
        </div>

        <div className={`rounded-xl p-4 transition-colors ${isDateValid ? 'bg-blue-50 border border-blue-100' : 'bg-gray-50 border border-gray-100'}`}>
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-lg ${isDateValid ? 'bg-blue-200 text-blue-700' : 'bg-gray-200 text-gray-500'}`}>
                <CalendarClock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Výsledný dátum</p>
              <div className="mt-1">
                {isDateValid ? (
                  <>
                    <p className="text-xl font-bold text-gray-900">
                      {format(resultDate, 'd. MMMM yyyy', { locale: sk })}
                    </p>
                    <p className="text-sm text-blue-600 mt-1">
                      (Týždeň {format(resultDate, 'w', { locale: sk })})
                    </p>
                  </>
                ) : (
                  <p className="text-gray-400 italic">Zadajte dátum...</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};