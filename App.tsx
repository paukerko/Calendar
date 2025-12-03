import React from 'react';
import { DateCalculator } from './components/DateCalculator';
import { CalendarList } from './components/CalendarList';
import { Calendar as CalendarIcon } from 'lucide-react';

const App: React.FC = () => {
  return (
    <div className="min-h-screen p-4 md:p-8 max-w-5xl mx-auto">
      <header className="mb-8 text-center md:text-left flex items-center justify-center md:justify-start gap-3">
        <div className="p-3 bg-blue-600 rounded-lg shadow-lg">
            <CalendarIcon className="w-8 h-8 text-white" />
        </div>
        <div>
            <h1 className="text-3xl font-bold text-gray-900">Plánovač 2025 - 2026</h1>
            <p className="text-gray-500 mt-1">Kalendár a 10-týždňová kalkulačka</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sticky Sidebar / Top Section for Calculator */}
        <div className="lg:col-span-4 lg:sticky lg:top-8 h-fit space-y-6">
          <DateCalculator />
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hidden lg:block">
            <h3 className="font-semibold text-gray-800 mb-2">O aplikácii</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Tento kalendár zobrazuje prehľad od decembra 2025 do decembra 2026.
              Každý riadok začína číslom týždňa pre lepšiu orientáciu.
            </p>
          </div>
        </div>

        {/* Main Calendar Feed */}
        <div className="lg:col-span-8">
          <CalendarList />
        </div>
      </div>
    </div>
  );
};

export default App;