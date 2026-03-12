
import React from 'react';
import { Clock } from 'lucide-react';

const PrayerWidget: React.FC = () => {
  // Simulated dynamic prayer times for Kota Bharu
  const prayerTimes = [
    { name: 'Fajr', time: '06:04 AM' },
    { name: 'Dhuhr', time: '01:21 PM' },
    { name: 'Asr', time: '04:42 PM' },
    { name: 'Maghrib', time: '07:23 PM' },
    { name: 'Isha', time: '08:35 PM' },
  ];

  return (
    <div className="flex items-center gap-4 text-xs lg:text-sm font-medium">
      <div className="flex items-center gap-1.5 opacity-80">
        <Clock className="w-4 h-4" />
        <span className="hidden sm:inline">Kota Bharu:</span>
      </div>
      <div className="flex gap-3 overflow-x-auto no-scrollbar py-1">
        {prayerTimes.map((p) => (
          <div key={p.name} className="flex flex-col sm:flex-row sm:gap-1.5 whitespace-nowrap">
            <span className="font-bold">{p.name}</span>
            <span className="opacity-90">{p.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrayerWidget;
