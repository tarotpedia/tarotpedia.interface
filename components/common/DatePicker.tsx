'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

import * as React from 'react';

import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

interface DatePickerProps {
  value: string;
  onChange: (date: string) => void;
  placeholder?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({ value, onChange, placeholder = 'Select date' }) => {
  const date = value ? new Date(value) : undefined;

  const handleSelect = (newDate: Date | undefined) => {
    if (newDate) {
      const formatted = format(newDate, 'yyyy-MM-dd');
      onChange(formatted);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-full justify-start text-left font-normal bg-[#1a1819] border-[#c19670]/30 text-[#c3beb6] hover:bg-[#1a1819] hover:text-[#c19670] hover:border-[#c19670]',
            !date && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4 text-[#c19670]" />
          {date ? format(date, 'PPP') : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 bg-[#1a1819] border-[#c19670]/30 text-[#c3beb6]" align="start">
        <Calendar
          autoFocus
          mode="single"
          selected={date}
          onSelect={handleSelect}
          captionLayout="dropdown"
          startMonth={new Date(2000, 0)}
          endMonth={new Date(2100, 0)}
          className="bg-[#1a1819] text-[#c3beb6]"
          classNames={{
            day_selected:
              'bg-[#c19670] text-[#060506] hover:bg-[#c19670] hover:text-[#060506] focus:bg-[#c19670] focus:text-[#060506]',
            day_today: 'bg-[#c19670]/20 text-[#c19670]',
            day: 'h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-[#c19670]/20 hover:text-[#c19670]',
            dropdown: 'bg-[#1a1819] text-[#c3beb6]',
            vhidden: 'hidden',
            caption_dropdowns: 'flex gap-1',
            caption_label: 'hidden',
          }}
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
