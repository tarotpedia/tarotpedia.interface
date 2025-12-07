'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import * as React from 'react';

import { format } from 'date-fns';
import { Calendar as CalendarIcon, Minus } from 'lucide-react';

interface DatePickerProps {
  value: string;
  onChange: (date: string) => void;
  placeholder?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({ value, onChange, placeholder = 'Select date' }) => {
  const currentYear = new Date().getFullYear();
  const minYear = currentYear - 60;
  const maxYear = currentYear;
  const defaultYear = currentYear - 25;

  const [day, setDay] = React.useState('');
  const [month, setMonth] = React.useState('');
  const [year, setYear] = React.useState('');
  const [isCalendarOpen, setIsCalendarOpen] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);

  const dayRef = React.useRef<HTMLInputElement>(null);
  const monthRef = React.useRef<HTMLInputElement>(null);
  const yearRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    const checkMobile = () => {
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.matchMedia('(max-width: 768px)').matches;
      setIsMobile(isTouchDevice && isSmallScreen);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  React.useEffect(() => {
    if (value) {
      const [y, m, d] = value.split('-');
      setYear(y);
      setMonth(m);
      setDay(d);
    } else {
      setDay('');
      setMonth('');
      setYear('');
    }
  }, [value]);

  const updateDate = (newDay: string, newMonth: string, newYear: string) => {
    const d = parseInt(newDay) || 1;
    const m = parseInt(newMonth) || 1;
    const y = parseInt(newYear) || defaultYear;

    if (y >= minYear && y <= maxYear && m >= 1 && m <= 12 && d >= 1 && d <= 31) {
      const paddedDay = String(d).padStart(2, '0');
      const paddedMonth = String(m).padStart(2, '0');
      const isoDate = `${y}-${paddedMonth}-${paddedDay}`;
      const testDate = new Date(isoDate);

      if (!isNaN(testDate.getTime()) && format(testDate, 'yyyy-MM-dd') === isoDate) {
        onChange(isoDate);
      }
    }
  };

  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 2) val = val.slice(0, 2);

    const num = parseInt(val);
    if (num > 31) val = '31';
    if (num < 1 && val.length === 2) val = '01';

    setDay(val);
    if (val.length === 2) {
      monthRef.current?.focus();
      monthRef.current?.select();
    }
    if (val.length === 2 && month.length === 2 && year.length === 4) {
      updateDate(val, month, year);
    }
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 2) val = val.slice(0, 2);

    const num = parseInt(val);
    if (num > 12) val = '12';
    if (num < 1 && val.length === 2) val = '01';

    setMonth(val);
    if (val.length === 2) {
      yearRef.current?.focus();
      yearRef.current?.select();
    }
    if (day.length === 2 && val.length === 2 && year.length === 4) {
      updateDate(day, val, year);
    }
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 4) val = val.slice(0, 4);

    const num = parseInt(val);
    if (val.length === 4) {
      if (num > maxYear) val = String(maxYear);
      if (num < minYear) val = String(minYear);
    }

    setYear(val);
    if (day.length === 2 && month.length === 2 && val.length === 4) {
      updateDate(day, month, val);
    }
  };

  const handleDayKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowRight' || (e.key === 'Tab' && !e.shiftKey)) {
      e.preventDefault();
      monthRef.current?.focus();
      monthRef.current?.select();
    }
  };

  const handleMonthKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowRight' || (e.key === 'Tab' && !e.shiftKey)) {
      e.preventDefault();
      yearRef.current?.focus();
      yearRef.current?.select();
    } else if (e.key === 'ArrowLeft' || (e.key === 'Tab' && e.shiftKey)) {
      e.preventDefault();
      dayRef.current?.focus();
      dayRef.current?.select();
    }
  };

  const handleYearKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowLeft' || (e.key === 'Tab' && e.shiftKey)) {
      e.preventDefault();
      monthRef.current?.focus();
      monthRef.current?.select();
    }
  };

  const handleSelect = (newDate: Date | undefined) => {
    if (newDate) {
      const formatted = format(newDate, 'yyyy-MM-dd');
      onChange(formatted);
      setIsCalendarOpen(false);
    }
  };

  const handleNativeDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (newValue) {
      onChange(newValue);
    }
  };

  const date = value ? new Date(value) : undefined;

  return (
    <div className="relative w-full group">
      {isMobile ? (
        <div className="relative flex items-center w-full">
          <Input
            type="date"
            value={value}
            onChange={handleNativeDateChange}
            placeholder={placeholder}
            className="w-full pl-4 pr-4 h-[56px] rounded-md border border-[#c19670]/30 bg-[#1a1819] focus-visible:border-[#c19670] text-[#c3beb6] placeholder:text-[#8a8580] focus-visible:ring-0 focus-visible:ring-offset-0 transition-all duration-300 group-hover:border-[#c19670]/60 [color-scheme:dark]"
          />
        </div>
      ) : (
        <div className="relative flex items-center w-full">
          <div className="flex items-center justify-between flex-1 px-4 h-[56px] rounded-md border border-[#c19670]/30 bg-[#1a1819] focus-within:border-[#c19670] transition-all duration-300 group-hover:border-[#c19670]/60">
            <div className="flex items-center gap-1">
              <Input
                ref={dayRef}
                type="text"
                inputMode="numeric"
                value={day}
                onChange={handleDayChange}
                onKeyDown={handleDayKeyDown}
                onFocus={e => e.target.select()}
                placeholder="DD"
                maxLength={2}
                className="w-8 h-8 px-0.5 py-0 text-center border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-[#c3beb6] placeholder:text-[#8a8580]"
              />
              <Minus className="w-3 h-3 text-[#8a8580]" />
              <Input
                ref={monthRef}
                type="text"
                inputMode="numeric"
                value={month}
                onChange={handleMonthChange}
                onKeyDown={handleMonthKeyDown}
                onFocus={e => e.target.select()}
                placeholder="MM"
                maxLength={2}
                className="w-8 h-8 px-0.5 py-0 text-center border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-[#c3beb6] placeholder:text-[#8a8580]"
              />
              <Minus className="w-3 h-3 text-[#8a8580]" />
              <Input
                ref={yearRef}
                type="text"
                inputMode="numeric"
                value={year}
                onChange={handleYearChange}
                onKeyDown={handleYearKeyDown}
                onFocus={e => e.target.select()}
                placeholder="YYYY"
                maxLength={4}
                className="w-12 h-8 px-0.5 py-0 text-center border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-[#c3beb6] placeholder:text-[#8a8580]"
              />
            </div>

            <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-[#c19670]/70 hover:text-[#c19670] hover:bg-[#c19670]/10 rounded-full transition-all duration-300"
                >
                  <CalendarIcon className="h-5 w-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto max-w-[calc(100vw-2rem)] p-0 bg-[#0f0e0f] border border-[#c19670]/30 text-[#c3beb6] shadow-[0_0_30px_-5px_rgba(193,150,112,0.3)]"
                align="center"
                sideOffset={5}
              >
                <Calendar
                  autoFocus
                  mode="single"
                  selected={date}
                  onSelect={handleSelect}
                  defaultMonth={date || new Date(defaultYear, 0)}
                  captionLayout="dropdown"
                  startMonth={new Date(minYear, 0)}
                  endMonth={new Date(maxYear, 11)}
                  className="bg-[#0f0e0f] text-[#c3beb6] p-2 sm:p-3"
                  classNames={{
                    day_selected:
                      'bg-[#c19670] text-[#060506] hover:bg-[#c19670] hover:text-[#060506] focus:bg-[#c19670] focus:text-[#060506] font-bold',
                    day_today: 'bg-[#c19670]/10 text-[#c19670] border border-[#c19670]/30',
                    day: 'h-8 w-8 sm:h-9 sm:w-9 p-0 text-xs sm:text-sm font-normal aria-selected:opacity-100 hover:bg-[#c19670]/20 hover:text-[#c19670] rounded-md transition-all duration-200',
                    dropdown:
                      'bg-[#1a1819] text-[#c3beb6] border border-[#c19670]/30 rounded-md p-1 text-xs sm:text-sm',
                    dropdown_month: 'bg-[#1a1819] text-[#c3beb6]',
                    dropdown_year: 'bg-[#1a1819] text-[#c3beb6]',
                    head_cell: 'text-[#8a8580] font-normal text-[0.7rem] sm:text-[0.8rem]',
                    cell: 'text-center text-xs sm:text-sm p-0 relative [&:has([aria-selected])]:bg-[#c19670]/10 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
                    nav_button:
                      'border border-[#c19670]/30 hover:bg-[#c19670]/10 hover:text-[#c19670] transition-colors h-7 w-7',
                    caption: 'flex justify-center pt-1 relative items-center mb-2',
                    caption_label: 'hidden',
                    caption_dropdowns: 'flex gap-1 sm:gap-2',
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
