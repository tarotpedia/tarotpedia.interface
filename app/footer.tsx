'use client';
import { useI18n } from '@/lib/i18n';

import { Github, Heart } from 'lucide-react';

export default function Footer() {
  const { t } = useI18n();

  return (
    <footer className="relative z-10 border-t border-[#2a2729] bg-[#060506] mt-auto">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          <div>
            <h3 className="font-semibold text-[#c19670] mb-3">{t.footer.about.title}</h3>
            <p className="text-sm text-[#c3beb6] leading-relaxed">{t.footer.about.description}</p>
          </div>
          <div>
            <h3 className="font-semibold text-[#c19670] mb-3">{t.footer.resources.title}</h3>
            <ul className="space-y-2 text-sm text-[#c3beb6]">
              <li>
                <a href="/tarot-guide" className="hover:text-[#c19670] transition-colors">
                  {t.footer.resources.tarotGuide}
                </a>
              </li>
              <li>
                <a href="/numerology" className="hover:text-[#c19670] transition-colors">
                  {t.footer.resources.numerology}
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-[#c19670] transition-colors">
                  {t.footer.resources.reading}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-[#c19670] mb-3">{t.footer.connect.title}</h3>
            <div className="flex gap-4 mb-4">
              <a
                href="https://github.com/tarotpedia"
                className="text-[#c3beb6] hover:text-[#c19670] transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
            <p className="text-sm text-[#c3beb6]">{t.footer.connect.feedback}</p>
          </div>
        </div>
        <div className="pt-6 border-t border-[#2a2729] flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#c3beb6]">
          <p>{t.footer.copyright}</p>
          <div className="flex items-center gap-1">
            <span>{t.footer.madeWith}</span>
            <Heart className="w-4 h-4 text-[#c19670]" />
            <span>{t.footer.forSeekers}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
