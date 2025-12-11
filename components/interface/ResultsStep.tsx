'use client';
import StyledMarkdown from '@/components/common/StyledMarkdown';
import TarotCardComponent from '@/components/common/TarotCard';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useTarot } from '@/context/TarotContext';
import { useI18n } from '@/lib/i18n';

import { useEffect, useState } from 'react';

import { toast } from 'sonner';

export default function ResultsStep() {
  const { t } = useI18n();
  const { reading, selectedCards, resetReading } = useTarot();
  const [showContent, setShowContent] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 100);

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  if (!reading) return null;

  return (
    <div className="min-h-[600px] py-8">
      <div className="space-y-6 mx-auto px-2 sm:px-4">
        <div className="space-y-6">
          {reading.numerology_meaning && (
            <div
              className="max-w-5xl mx-auto backdrop-blur-sm rounded-2xl p-4 sm:p-6 md:p-8 border border-[#c19670]/30 transition-all duration-700 ease-out"
              style={{
                opacity: showContent ? 1 : 0,
                transform: showContent ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: '0.2s',
              }}
            >
              <h2 className="text-xl sm:text-2xl text-center text-[#c19670] mb-4">{t.results.numerologyInsight}</h2>
              <StyledMarkdown content={reading.numerology_meaning} />
            </div>
          )}

          <div className="max-w-7xl mx-auto">
            <h2
              className="text-xl sm:text-2xl text-center text-[#c19670] mb-6 transition-all duration-700 ease-out"
              style={{
                opacity: showContent ? 1 : 0,
                transform: showContent ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: reading.numerology_meaning ? '0.3s' : '0.1s',
              }}
            >
              {t.results.yourDeck}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6">
              {['past', 'present', 'future'].map((position, idx) => (
                <div key={position}>
                  <h3
                    className="text-base sm:text-lg text-center text-[#c3beb6] mb-3 uppercase tracking-wide transition-all duration-700 ease-out"
                    style={{
                      opacity: showContent ? 1 : 0,
                      transform: showContent ? 'translateY(0)' : 'translateY(20px)',
                      transitionDelay: `${reading.numerology_meaning ? 0.4 + idx * 0.15 : 0.2 + idx * 0.15}s`,
                    }}
                  >
                    {t.results.positions[position as keyof typeof t.results.positions]}
                  </h3>
                  {selectedCards[idx] && reading.interpretations[idx] && (
                    <>
                      <div
                        className="transition-all duration-700 ease-out"
                        style={{
                          opacity: showContent ? 1 : 0,
                          transform: showContent ? 'translateY(0)' : 'translateY(20px)',
                          transitionDelay: `${reading.numerology_meaning ? 0.5 + idx * 0.2 : 0.3 + idx * 0.2}s`,
                        }}
                      >
                        <TarotCardComponent card={selectedCards[idx]} />
                      </div>
                      <div
                        className="mt-4 p-3 sm:p-5 transition-all duration-700 ease-out"
                        style={{
                          opacity: showContent ? 1 : 0,
                          transform: showContent ? 'translateY(0)' : 'translateY(20px)',
                          transitionDelay: `${reading.numerology_meaning ? 0.6 + idx * 0.2 : 0.4 + idx * 0.2}s`,
                        }}
                      >
                        <StyledMarkdown content={reading.interpretations[idx].meaning} />
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>

            <div
              className="backdrop-blur-sm rounded-2xl p-4 sm:p-6 md:p-8 border border-[#c19670]/30 transition-all duration-700 ease-out"
              style={{
                opacity: showContent ? 1 : 0,
                transform: showContent ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: reading.numerology_meaning ? '1.2s' : '1.0s',
              }}
            >
              <h3 className="text-lg sm:text-xl text-[#c19670] mb-4 flex items-center justify-center gap-2">
                {t.results.overallReading}
              </h3>
              <StyledMarkdown content={reading.summary} />
            </div>
          </div>

          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 pb-12 transition-all duration-700 ease-out"
            style={{
              opacity: showContent ? 1 : 0,
              transform: showContent ? 'translateY(0)' : 'translateY(20px)',
              transitionDelay: reading.numerology_meaning ? '1.4s' : '1.2s',
            }}
          >
            <SaveReadingButton />
            <Button
              onClick={resetReading}
              disabled={timeLeft > 0}
              className="px-6 sm:px-8 py-6 rounded-md bg-gradient-to-br from-[#1a1819] to-[#0f0e0f] text-[#c19670] tracking-wide border border-[#c19670]/30 shadow-[0_0_15px_0_rgba(193,150,112,0.2)] hover:shadow-[0_0_25px_0_rgba(193,150,112,0.4)] hover:scale-[1.01] hover:cursor-pointer transition-all duration-300 group relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="absolute inset-0 bg-gradient-to-br from-[#c19670]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative z-10">
                {timeLeft > 0 ? `${t.results.newReading} (${timeLeft}s)` : t.results.newReading}
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SaveReadingButton() {
  const { t } = useI18n();
  const { reading, selectedCards, formData } = useTarot();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [readingUrl, setReadingUrl] = useState<string | null>(null);
  const [funnyMessage, setFunnyMessage] = useState('');

  useEffect(() => {
    const messages = t.results.funnyMessages;
    setFunnyMessage(messages[Math.floor(Math.random() * messages.length)]);
  }, [t.results.funnyMessages]);

  const handleSave = async () => {
    if (!reading || !selectedCards.length || saving || saved) return;

    setSaving(true);

    try {
      const response = await fetch('/api/readings/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_name: formData.name,
          user_dob: formData.dob,
          question: formData.question,
          cards: selectedCards,
          interpretations: reading.interpretations,
          summary: reading.summary,
          numerology_meaning: reading.numerology_meaning,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save reading');
      }

      const data = await response.json();
      const url = `${window.location.origin}/reading?read_id=${data.reading_id}`;
      setReadingUrl(url);
      setSaved(true);
      toast.success('Reading saved successfully!');
    } catch (error) {
      console.error('Error saving reading:', error);
      toast.error('Failed to save reading. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleCopyLink = () => {
    if (readingUrl) {
      navigator.clipboard.writeText(readingUrl);
      toast.success('Link copied to clipboard!');
    }
  };

  if (saved && readingUrl) {
    return (
      <Button
        onClick={handleCopyLink}
        className="px-6 sm:px-8 py-6 rounded-md bg-gradient-to-br from-[#c19670] to-[#a17d5a] text-[#1a1819] tracking-wide border border-[#c19670]/30 shadow-[0_0_15px_0_rgba(193,150,112,0.2)] hover:shadow-[0_0_25px_0_rgba(193,150,112,0.4)] hover:scale-[1.01] hover:cursor-pointer transition-all duration-300 group relative overflow-hidden"
      >
        <span className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        <span className="relative z-10">{t.results?.copyLink || 'Copy Link'}</span>
      </Button>
    );
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          onClick={handleSave}
          disabled={saving}
          className="px-6 sm:px-8 py-6 rounded-md bg-gradient-to-br from-[#c19670] to-[#a17d5a] text-[#1a1819] tracking-wide border border-[#c19670]/30 shadow-[0_0_15px_0_rgba(193,150,112,0.2)] hover:shadow-[0_0_25px_0_rgba(193,150,112,0.4)] hover:scale-[1.01] hover:cursor-pointer transition-all duration-300 group relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          <span className="relative z-10">
            {saving ? t.results?.saving || 'Saving...' : t.results?.saveReading || 'Save & Share'}
          </span>
        </Button>
      </TooltipTrigger>
      <TooltipContent className="bg-[#1a1819] text-[#c19670] border border-[#c19670]/30">
        <p>{funnyMessage}</p>
      </TooltipContent>
    </Tooltip>
  );
}
