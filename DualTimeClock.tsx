import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';
import { Clock, Globe } from 'lucide-react';

const DualTimeClock: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(moment());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(moment());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const indiaTime = currentTime.clone().tz('Asia/Kolkata');
  const libyaTime = currentTime.clone().tz('Africa/Tripoli');

  const TimeDisplay: React.FC<{ time: moment.Moment, label: string }> = ({ time, label }) => (
    <div className="flex items-center space-x-2 p-2 bg-gray-100 rounded-lg shadow-sm">
      <Globe className="h-5 w-5 text-blue-600" />
      <div className="flex flex-col">
        <span className="text-xs font-semibold text-gray-600">{label}</span>
        <span className="text-lg font-bold text-gray-800">{time.format('HH:mm:ss')}</span>
        <span className="text-xs text-gray-500">{time.format('ddd, MMM D')}</span>
      </div>
    </div>
  );

  return (
    <div className="p-4 space-y-3 border-b border-gray-200">
      <h3 className="text-sm font-bold uppercase text-blue-700 flex items-center">
        <Clock className="h-4 w-4 mr-2" />
        Global Time
      </h3>
      <div className="space-y-2">
        <TimeDisplay time={indiaTime} label="India (IST)" />
        <TimeDisplay time={libyaTime} label="Libya (LST)" />
      </div>
    </div>
  );
};

export default DualTimeClock;
