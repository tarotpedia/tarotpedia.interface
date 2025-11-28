import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

interface DatePickerProps {
  value: string;
  onChange: (date: string) => void;
  placeholder?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({ value, onChange, placeholder = 'Select date' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(() => {
    if (value) {
      const date = new Date(value);
      return !isNaN(date.getTime()) ? date : new Date(2000, 0, 1);
    }
    return new Date(2000, 0, 1);
  });
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);
  const firstDateButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (value) {
      const date = new Date(value);
      if (!isNaN(date.getTime())) {
        setCurrentMonth(date);
      }
    } else {
      setCurrentMonth(new Date(2000, 0, 1));
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
        // Return focus to input when closing with Escape
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX + rect.width / 2,
      });
    }
  }, [isOpen]);

  // Focus management when calendar opens
  useEffect(() => {
    if (isOpen && containerRef.current) {
      // Small delay to ensure the calendar is rendered
      const timer = setTimeout(() => {
        if (firstDateButtonRef.current) {
          firstDateButtonRef.current.focus();
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const formatDisplayDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek, year, month };
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const handleYearChange = (direction: 'up' | 'down') => {
    const newYear = currentMonth.getFullYear() + (direction === 'up' ? 1 : -1);
    setCurrentMonth(new Date(newYear, currentMonth.getMonth()));
  };

  const handleDateSelect = (day: number) => {
    const { year, month } = getDaysInMonth(currentMonth);
    const selected = new Date(year, month, day);
    const formattedDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    onChange(formattedDate);
    setIsOpen(false);
    // Return focus to input after selection
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentMonth);
  const selectedDate = value ? new Date(value + 'T00:00:00') : null;
  const monthName = currentMonth.toLocaleDateString('en-US', { month: 'long' });

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: startingDayOfWeek }, (_, i) => i);

  const isSelectedDate = (day: number) => {
    if (!selectedDate) return false;
    return selectedDate.getDate() === day && selectedDate.getMonth() === month && selectedDate.getFullYear() === year;
  };

  const isToday = (day: number) => {
    const today = new Date();
    return today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;
  };

  const calendarPopup = isOpen
    ? createPortal(
        <>
          <div className="fixed inset-0" style={{ zIndex: 9998 }} onClick={() => setIsOpen(false)} />
          <div
            ref={containerRef}
            className="fixed top-1/2 left-1/2 w-[340px] bg-linear-to-br from-[#0f0e0f] via-[#1a1819] to-[#0f0e0f] border-2 border-[#c19670]/40 rounded-xl shadow-[0_0_80px_-20px_rgba(193,150,112,0.4)] p-6 backdrop-blur-md animate-fade-in"
            style={{
              transform: 'translate(-50%, -50%)',
              zIndex: 9999,
            }}
          >
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-xl pointer-events-none">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#c19670]/10 rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#c19670]/10 rounded-full blur-2xl"></div>
            </div>

            <div className="relative"></div>
            {/* Header with year controls */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={handlePrevMonth}
                className="p-2 hover:bg-[#c19670]/20 rounded-lg transition-all hover:shadow-md active:scale-95 hover:cursor-pointer"
                type="button"
                title="Previous month"
              >
                <ChevronLeft className="w-5 h-5 text-[#c19670]" />
              </button>

              <div className="flex items-center gap-3">
                <span className="text-lg font-bold text-[#c19670] tracking-wide">{monthName}</span>
                <div className="flex flex-col gap-0.5 items-center">
                  <button
                    onClick={() => handleYearChange('up')}
                    className="p-0.5 hover:bg-[#c19670]/20 rounded transition-all active:scale-95 flex items-center justify-center hover:cursor-pointer"
                    type="button"
                    title="Next year"
                  >
                    <ChevronLeft className="w-5 h-5 text-[#c3beb6] rotate-90" />
                  </button>
                  <span className="text-sm font-semibold text-[#c3beb6] px-1">{year}</span>
                  <button
                    onClick={() => handleYearChange('down')}
                    className="p-0.5 hover:bg-[#c19670]/20 rounded transition-all active:scale-95 flex items-center justify-center hover:cursor-pointer"
                    type="button"
                    title="Previous year"
                  >
                    <ChevronLeft className="w-5 h-5 text-[#c3beb6] -rotate-90" />
                  </button>
                </div>
              </div>

              <button
                onClick={handleNextMonth}
                className="p-2 hover:bg-[#c19670]/20 rounded-lg transition-all hover:shadow-md active:scale-95 hover:cursor-pointer"
                type="button"
                title="Next month"
              >
                <ChevronRight className="w-5 h-5 text-[#c19670]" />
              </button>
            </div>
            <div>
              {/* Weekday headers */}
              <div className="grid grid-cols-7 gap-2 mb-3">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-center text-xs font-bold text-[#c19670]/70 py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar days */}
              <div className="grid grid-cols-7 grid-rows-6 gap-2">
                {blanks.map(i => (
                  <div key={`blank-${i}`} />
                ))}
                {days.map((day, index) => {
                  const selected = isSelectedDate(day);
                  const today = isToday(day);
                  const isFirst = index === 0;

                  return (
                    <button
                      key={day}
                      ref={isFirst ? firstDateButtonRef : undefined}
                      onClick={() => handleDateSelect(day)}
                      type="button"
                      className={`
                    aspect-square flex items-center justify-center text-sm rounded-lg transition-all font-medium hover:cursor-pointer
                    ${
                      selected
                        ? 'bg-linear-to-br from-[#c19670] to-[#d4a574] text-[#060506] shadow-lg scale-105 ring-2 ring-[#c19670]/50'
                        : today
                          ? 'bg-[#c19670]/20 text-[#c19670] font-bold ring-2 ring-[#c19670]/50'
                          : 'hover:bg-[#c19670]/10 text-[#c3beb6] hover:scale-105 hover:shadow-md'
                    }
                    active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#c19670] focus:ring-offset-1
                  `}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>

              {/* Footer hint */}
              <div className="mt-4 pt-4 border-t border-[#c19670]/20 text-center">
                <p className="text-xs text-[#c3beb6]/70">Click a date to select • Press Esc to close</p>
              </div>
            </div>
          </div>
        </>,
        document.body
      )
    : null;

  return (
    <>
      <div ref={inputRef} className="relative">
        <div
          onClick={() => setIsOpen(!isOpen)}
          tabIndex={0}
          role="button"
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setIsOpen(!isOpen);
            }
          }}
          className="w-full px-4 py-3 rounded-md border border-[#c19670]/30 bg-[#1a1819] hover:border-[#c19670] hover:bg-[#1a1819] text-[#c3beb6] cursor-pointer transition-all duration-200 flex items-center justify-between group focus:outline-none focus:ring-2 focus:ring-[#c19670] focus:ring-offset-1"
        >
          <span className={value ? 'text-[#c3beb6]' : 'text-[#8a8580]'}>
            {value ? formatDisplayDate(value) : placeholder}
          </span>
          <Calendar className="w-4 h-4 text-[#c19670] group-hover:text-[#d4a574] transition-colors" />
        </div>
      </div>
      {calendarPopup}
    </>
  );
};

export default DatePicker;
