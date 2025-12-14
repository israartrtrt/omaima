import { useState, useEffect } from 'react';
import { Calendar, Clock, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  date: Date;
  time: string;
  type: 'meeting' | 'deadline' | 'training';
}

const upcomingEvents: Event[] = [
  {
    id: '1',
    title: 'Project Kickoff - Lamoda',
    date: new Date(2024, 11, 16, 10, 0),
    time: '10:00 AM',
    type: 'meeting',
  },
  {
    id: '2',
    title: 'UAT Review Session',
    date: new Date(2024, 11, 17, 14, 30),
    time: '2:30 PM',
    type: 'meeting',
  },
  {
    id: '3',
    title: 'Document Submission Deadline',
    date: new Date(2024, 11, 18, 17, 0),
    time: '5:00 PM',
    type: 'deadline',
  },
  {
    id: '4',
    title: 'User Training Session',
    date: new Date(2024, 11, 19, 11, 0),
    time: '11:00 AM',
    type: 'training',
  },
];

export function CalendarWidget() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format time for different timezones
  const getTimeInTimezone = (timezone: string) => {
    return currentTime.toLocaleTimeString('en-US', {
      timeZone: timezone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
  };

  const getDateInTimezone = (timezone: string) => {
    return currentTime.toLocaleDateString('en-US', {
      timeZone: timezone,
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  // Calendar logic
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (number | null)[] = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add the days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    
    return days;
  };

  const days = getDaysInMonth(currentMonth);
  const monthName = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const selectDate = (day: number) => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    setSelectedDate(newDate);
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'meeting':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'deadline':
        return 'bg-red-100 text-red-700 border-red-300';
      case 'training':
        return 'bg-green-100 text-green-700 border-green-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const isSelectedDate = (day: number | null) => {
    if (!day) return false;
    return (
      day === selectedDate.getDate() &&
      currentMonth.getMonth() === selectedDate.getMonth() &&
      currentMonth.getFullYear() === selectedDate.getFullYear()
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Timezone Clocks */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Clock size={20} className="text-[#0078D4]" />
          World Clock
        </h3>
        <div className="grid grid-cols-1 gap-4">
          {/* India Standard Time */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200 cursor-pointer hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-blue-600" />
                <div className="text-xs font-medium text-gray-700">India (IST)</div>
              </div>
            </div>
            <div className="text-2xl font-semibold text-gray-900 mb-1 font-mono">
              {getTimeInTimezone('Asia/Kolkata')}
            </div>
            <div className="text-xs text-gray-600">{getDateInTimezone('Asia/Kolkata')}</div>
          </div>
          
          {/* Libya Standard Time */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200 cursor-pointer hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-green-600" />
                <div className="text-xs font-medium text-gray-700">Libya (LST)</div>
              </div>
            </div>
            <div className="text-2xl font-semibold text-gray-900 mb-1 font-mono">
              {getTimeInTimezone('Africa/Tripoli')}
            </div>
            <div className="text-xs text-gray-600">{getDateInTimezone('Africa/Tripoli')}</div>
          </div>
        </div>
      </div>

      {/* Calendar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Calendar size={20} className="text-[#0078D4]" />
            {monthName}
          </h3>
          <div className="flex items-center gap-2">
            <button
              onClick={previousMonth}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
              aria-label="Previous month"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextMonth}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
              aria-label="Next month"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
        
        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {/* Day headers */}
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
              {day}
            </div>
          ))}
          
          {/* Calendar days */}
          {days.map((day, index) => {
            const isToday =
              day === currentTime.getDate() &&
              currentMonth.getMonth() === currentTime.getMonth() &&
              currentMonth.getFullYear() === currentTime.getFullYear();
            
            const isSelected = isSelectedDate(day);
            
            return (
              <div
                key={index}
                onClick={() => day && selectDate(day)}
                className={`aspect-square flex items-center justify-center text-sm cursor-pointer rounded transition-colors ${
                  day === null
                    ? 'bg-transparent cursor-default'
                    : isToday
                    ? 'bg-[#0078D4] text-white font-semibold hover:bg-[#106EBE]'
                    : isSelected
                    ? 'bg-blue-100 text-blue-700 font-medium hover:bg-blue-200'
                    : 'hover:bg-gray-100'
                }`}
              >
                {day}
              </div>
            );
          })}
        </div>
      </div>

      {/* Upcoming Events */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Upcoming Events</h3>
        <div className="space-y-2">
          {upcomingEvents.map((event) => (
            <div
              key={event.id}
              className={`p-3 rounded-lg border cursor-pointer hover:shadow-md transition-all ${getEventTypeColor(event.type)}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="font-medium text-sm">{event.title}</div>
                  <div className="text-xs opacity-75 mt-1">
                    {event.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} at {event.time}
                  </div>
                </div>
                <div className="text-xs uppercase tracking-wider px-2 py-1 bg-white/50 rounded">
                  {event.type}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}