'use client';
import { AnimationToggle } from '@/components/common/AnimationToggle';
import { TarotStar } from '@/components/icons/TarotStar';
import { LanguageSwitcher } from '@/components/language-switcher';
import { Button } from '@/components/ui/button';
import { useI18n } from '@/lib/i18n';

import { useState } from 'react';

import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const { t } = useI18n();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-[#060506]/80 border-b border-[#c19670]/20">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center gap-2">
            <TarotStar className="w-6 h-6 text-[#c19670]" />
            <a href="/" className="flex items-center gap-2">
              <span className="text-xl font-bold text-white tracking-wide">{t.header.title}</span>
            </a>
            <TarotStar className="w-6 h-6 text-[#c19670]" />
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            <a
              href="/"
              className="text-[#c3beb6] hover:text-[#c19670] transition-colors text-sm font-medium tracking-wide"
            >
              {t.footer.resources.reading}
            </a>
            <a
              href="/tarot-guide"
              className="text-[#c3beb6] hover:text-[#c19670] transition-colors text-sm font-medium tracking-wide"
            >
              {t.footer.resources.tarotGuide}
            </a>
            <a
              href="/numerology"
              className="text-[#c3beb6] hover:text-[#c19670] transition-colors text-sm font-medium tracking-wide"
            >
              {t.footer.resources.numerology}
            </a>
          </div>

          {/* Right Side: Animation Toggle, Language Switcher & Mobile Menu Button */}
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2">
              <AnimationToggle />
              <LanguageSwitcher />
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-[#c19670] hover:text-[#d4a574] hover:bg-transparent transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#c19670]/20 animate-fade-in">
            <div className="flex flex-col gap-4">
              <a
                href="/"
                className="text-[#c3beb6] hover:text-[#c19670] transition-colors text-sm font-medium tracking-wide py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t.footer.resources.reading}
              </a>
              <a
                href="/tarot-guide"
                className="text-[#c3beb6] hover:text-[#c19670] transition-colors text-sm font-medium tracking-wide py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t.footer.resources.tarotGuide}
              </a>
              <a
                href="/numerology"
                className="text-[#c3beb6] hover:text-[#c19670] transition-colors text-sm font-medium tracking-wide py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t.footer.resources.numerology}
              </a>
              <div className="pt-2 border-t border-[#c19670]/20 flex items-center gap-2">
                <AnimationToggle />
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
