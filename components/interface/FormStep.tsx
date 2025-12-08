'use client';
import DatePicker from '@/components/common/DatePicker';
import GrappleHook from '@/components/common/GrappleHook';
import { TarotStar } from '@/components/icons/TarotStar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useAnimations } from '@/context/AnimationContext';
import { useTarot } from '@/context/TarotContext';
import { drawCards } from '@/lib/api';
import { useI18n } from '@/lib/i18n';

import { Calendar, Info, ShieldQuestion, User } from 'lucide-react';
import { toast } from 'sonner';

export default function FormStep() {
  const { t } = useI18n();
  const { animationsEnabled } = useAnimations();
  const { formData, setFormData, setStep, setIsShuffling, setProgress, setProgressText, setDeckCards } = useTarot();

  const handleGetReading = async () => {
    if (!formData.name || !formData.dob || !formData.question) {
      toast.warning(t.form.validation.fillAll);
      return;
    }

    if (formData.question.trim().length < 20) {
      toast.warning(t.form.validation.questionTooShort);
      return;
    }

    setStep('deck');
    setIsShuffling(true);
    setProgress(0);
    setProgressText(t.form.progress.shuffling);

    try {
      const response = await drawCards({
        name: formData.name,
        dob: formData.dob,
        count: 6,
        follow_numerology: false,
      });

      const shuffledCards = [...response.data.cards].sort(() => Math.random() - 0.5);
      setDeckCards(shuffledCards);
    } catch (error) {
      console.error('Error drawing cards:', error);
      toast.warning(t.form.error.drawCards);
      setStep('form');
      setIsShuffling(false);
    }
  };

  const isFormValid = formData.name && formData.dob && formData.question && formData.question.trim().length >= 20;

  return (
    <>
      <style>
        {`
          @keyframes swing {
            0% { transform: rotate(1deg); }
            50% { transform: rotate(-1deg); }
            100% { transform: rotate(1deg); }
          }
          
          @keyframes breathe {
            0%, 100% { 
              box-shadow: 0 0 15px 0 rgba(193,150,112,0.2);
              transform: scale(1);
            }
            50% { 
              box-shadow: 0 0 30px 5px rgba(193,150,112,0.5);
              transform: scale(1.02);
            }
          }
        `}
      </style>
      <GrappleHook />
      <div
        className="relative max-w-2xl mx-auto origin-top"
        tabIndex={-1}
        style={{
          filter: 'blur(0px)',
          animation: animationsEnabled ? 'swing 5s infinite' : 'none',
          transformOrigin: 'top center',
          backfaceVisibility: 'hidden',
          transformStyle: 'preserve-3d',
          WebkitFontSmoothing: 'subpixel-antialiased',
          transform: 'translateZ(0)',
        }}
      >
        <div className="min-h-[600px] md:min-h-[500px] flex items-center justify-center py-2 md:py-12">
          <div className="p-6 sm:p-10 rounded-2xl border border-[#c19670]/30 bg-[#0f0e0f] shadow-[0_0_60px_-10px_rgba(193,150,112,0.3)] backdrop-blur-xl text-[#c3beb6] font-[Caudex] w-full transition-all duration-300">
            <div className="relative z-10">
              <h2 className="flex flex-col items-center justify-center gap-2 mb-6 text-base sm:text-2xl tracking-wide text-[#c19670] text-center uppercase font-bold">
                {t.form.title}
              </h2>

              <div className="space-y-6 transition-all duration-300">
                <div>
                  <label className="block mb-2 text-sm tracking-wide text-[#c19670]">
                    <User className="w-4 h-4 inline-block mr-1" />
                    {t.form.name.label}
                  </label>
                  <Input
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-6 rounded-md border border-[#c19670]/30 bg-[#1a1819] focus-visible:border-[#c19670] text-sm md:text-base text-[#c3beb6] placeholder:text-[#8a8580] focus-visible:ring-0 focus-visible:ring-offset-0 transition-all duration-200"
                    placeholder={t.form.name.placeholder}
                  />
                </div>

                <div>
                  <TooltipProvider>
                    <Tooltip>
                      <label className="flex items-center gap-2 mb-2 text-sm tracking-wide text-[#c19670]">
                        <Calendar className="w-4 h-4" />
                        {t.form.dob.label}
                        <TooltipTrigger asChild>
                          <Info className="w-4 h-4 cursor-help text-[#c19670]/70 hover:text-[#c19670] transition-colors" />
                        </TooltipTrigger>
                      </label>
                      <TooltipContent className="bg-[#2a2729] border-[#c19670]/50 text-[#e8e3dc] shadow-lg">
                        <p className="text-sm">{t.form.dob.format}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <DatePicker
                    value={formData.dob ?? ''}
                    onChange={date => setFormData({ ...formData, dob: date })}
                    placeholder={t.form.dob.placeholder}
                  />
                </div>

                <div>
                  <TooltipProvider>
                    <Tooltip>
                      <label className="flex items-center gap-2 mb-2 text-sm tracking-wide text-[#c19670]">
                        <ShieldQuestion className="w-4 h-4" />
                        {t.form.question.label}
                        <TooltipTrigger asChild>
                          <Info className="w-4 h-4 cursor-help text-[#c19670]/70 hover:text-[#c19670] transition-colors" />
                        </TooltipTrigger>
                      </label>
                      <TooltipContent className="max-w-xs bg-[#2a2729] border-[#c19670]/50 text-[#e8e3dc] shadow-lg">
                        <p className="text-sm">{t.form.question.hint}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <Textarea
                    value={formData.question}
                    onChange={e => setFormData({ ...formData, question: e.target.value })}
                    className="w-full px-4 py-3 rounded-md border border-[#c19670]/30 bg-[#1a1819] focus-visible:border-[#c19670] text-sm md:text-base text-[#c3beb6] placeholder:text-[#8a8580] focus-visible:ring-0 focus-visible:ring-offset-0 resize-none transition-all duration-200"
                    placeholder={t.form.question.placeholder}
                    rows={4}
                  />
                  <div className="mt-2 text-xs text-[#8a8580]">
                    <p className="mb-1 font-medium">{t.form.question.examplesLabel}</p>
                    <ul className="space-y-1 list-none pl-0">
                      {t.form.question.examples.map((example, idx) => (
                        <li key={idx} className="italic">
                          • {example}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Button
                  onClick={handleGetReading}
                  disabled={!isFormValid}
                  className="w-full py-6 mt-4 rounded-md bg-linear-to-br from-[#1a1819] to-[#0f0e0f] text-[#c19670] tracking-wide border border-[#c19670]/30 hover:cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2 group relative overflow-hidden"
                  style={{
                    animation: 'breathe 3s ease-in-out infinite',
                  }}
                >
                  <span className="absolute inset-0 bg-linear-to-br from-[#c19670]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <TarotStar className="w-4 h-4 text-[#c19670] relative z-10" />
                  <span className="relative z-10">{t.form.button}</span>
                  <TarotStar className="w-4 h-4 text-[#c19670] relative z-10" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
