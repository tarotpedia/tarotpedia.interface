'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import * as React from 'react';

import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

interface DatePickerProps {
  value: string;
  onChange: (date: string) => void;
  placeholder?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({ value, onChange, placeholder = 'Select date' }) => {
  const [inputValue, setInputValue] = React.useState(value);
  const [isCalendarOpen, setIsCalendarOpen] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);
  const date = value ? new Date(value) : undefined;

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
    setInputValue(value);
  }, [value]);

  const handleSelect = (newDate: Date | undefined) => {
    if (newDate) {
      const formatted = format(newDate, 'yyyy-MM-dd');
      onChange(formatted);
      setInputValue(formatted);
      setIsCalendarOpen(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, '');
    let formatted = input;
    if (input.length > 4) {
      formatted = `${input.slice(0, 4)}-${input.slice(4)}`;
    }
    if (input.length > 6) {
      formatted = `${formatted.slice(0, 7)}-${formatted.slice(7)}`;
    }

    formatted = formatted.slice(0, 10);

    setInputValue(formatted);

    if (formatted.length === 10) {
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (dateRegex.test(formatted)) {
        const parsedDate = new Date(formatted);
        if (!isNaN(parsedDate.getTime()) && formatted === format(parsedDate, 'yyyy-MM-dd')) {
          onChange(formatted);
        }
      }
    }
  };

  const handleInputBlur = () => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(inputValue)) {
      setInputValue(value);
    } else {
      const parsedDate = new Date(inputValue);
      if (isNaN(parsedDate.getTime()) || inputValue !== format(parsedDate, 'yyyy-MM-dd')) {
        setInputValue(value);
      }
    }
  };

  const handleNativeDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (newValue) {
      onChange(newValue);
      setInputValue(newValue);
    }
  };

  return (
    <div className="relative w-full group">
      {isMobile ? (
        <div className="relative flex items-center w-full">
          <Input
            type="date"
            value={inputValue}
            onChange={handleNativeDateChange}
            placeholder={placeholder}
            className="w-full pl-4 pr-4 h-[56px] rounded-md border border-[#c19670]/30 bg-[#1a1819] focus-visible:border-[#c19670] text-[#c3beb6] placeholder:text-[#8a8580] focus-visible:ring-0 focus-visible:ring-offset-0 transition-all duration-300 group-hover:border-[#c19670]/60 [color-scheme:dark]"
          />
        </div>
      ) : (
        <div className="relative flex items-center w-full">
          <Input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            placeholder="YYYY-MM-DD"
            maxLength={10}
            className="w-full pl-4 pr-12 h-[56px] rounded-md border border-[#c19670]/30 bg-[#1a1819] focus-visible:border-[#c19670] text-[#c3beb6] placeholder:text-[#8a8580] focus-visible:ring-0 focus-visible:ring-offset-0 transition-all duration-300 group-hover:border-[#c19670]/60"
          />

          <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 h-8 w-8 text-[#c19670]/70 hover:text-[#c19670] hover:bg-[#c19670]/10 rounded-full transition-all duration-300"
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
                defaultMonth={date || new Date(2000, 0)}
                captionLayout="dropdown"
                startMonth={new Date(1900, 0)}
                endMonth={new Date(2100, 0)}
                className="bg-[#0f0e0f] text-[#c3beb6] p-2 sm:p-3"
                classNames={{
                  day_selected:
                    'bg-[#c19670] text-[#060506] hover:bg-[#c19670] hover:text-[#060506] focus:bg-[#c19670] focus:text-[#060506] font-bold',
                  day_today: 'bg-[#c19670]/10 text-[#c19670] border border-[#c19670]/30',
                  day: 'h-8 w-8 sm:h-9 sm:w-9 p-0 text-xs sm:text-sm font-normal aria-selected:opacity-100 hover:bg-[#c19670]/20 hover:text-[#c19670] rounded-md transition-all duration-200',
                  dropdown: 'bg-[#1a1819] text-[#c3beb6] border border-[#c19670]/30 rounded-md p-1 text-xs sm:text-sm',
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
      )}
      {!inputValue && !isMobile && <p className="mt-1 text-[#8a8580] text-xs italic">Format: YYYY-MM-DD</p>}
    </div>
  );
};

export default DatePicker;
