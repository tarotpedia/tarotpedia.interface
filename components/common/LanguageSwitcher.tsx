'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useI18n } from '@/lib/i18n';

import { Check, Globe } from 'lucide-react';

export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();

  const languages = {
    en: 'English',
    vi: 'Tiếng Việt',
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="bg-[#1a1819] border-[#c19670]/30 text-[#c3beb6] hover:bg-[#c19670]/10 hover:text-[#c19670] hover:border-[#c19670] transition-all duration-300"
        >
          <Globe className="w-4 h-4 mr-2" />
          {languages[locale]}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-[#1a1819] border-[#c19670]/30 text-[#c3beb6]">
        <DropdownMenuItem
          onClick={() => setLocale('en')}
          className="focus:bg-[#c19670]/20 focus:text-[#c19670] cursor-pointer"
        >
          <span className="flex-1">English</span>
          {locale === 'en' && <Check className="w-4 h-4 ml-2 text-[#c19670]" />}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setLocale('vi')}
          className="focus:bg-[#c19670]/20 focus:text-[#c19670] cursor-pointer"
        >
          <span className="flex-1">Tiếng Việt</span>
          {locale === 'vi' && <Check className="w-4 h-4 ml-2 text-[#c19670]" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
