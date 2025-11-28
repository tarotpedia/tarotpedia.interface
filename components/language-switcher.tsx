'use client';

import { useI18n } from '@/lib/i18n';

import { Globe } from 'lucide-react';

export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();

  return (
    <div className="flex items-center gap-2">
      <Globe className="w-5 h-5 text-[#c19670]" />
      <select
        value={locale}
        onChange={e => setLocale(e.target.value as 'en' | 'vi')}
        className="px-3 py-2 border-2 border-[#c19670]/30 rounded-lg focus:border-[#c19670] focus:outline-none bg-[#1a1819] text-[#c3beb6] cursor-pointer"
      >
        <option value="en">English</option>
        <option value="vi">Tiếng Việt</option>
      </select>
    </div>
  );
}
