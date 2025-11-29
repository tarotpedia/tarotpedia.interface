'use client';
import DatePicker from '@/components/common/DatePicker';
import GrappleHook from '@/components/common/GrappleHook';
import { TarotStar } from '@/components/icons/TarotStar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useAnimations } from '@/context/AnimationContext';
import { useTarot } from '@/context/TarotContext';
import { drawCards } from '@/lib/api';
import { useI18n } from '@/lib/i18n';

import { Calendar, ShieldQuestion, User } from 'lucide-react';
import { toast } from 'sonner';

export default function FormStep() {
  const { t } = useI18n();
  const { animationsEnabled } = useAnimations();
  const {
    formData,
    setFormData,
    showQuestionHint,
    setShowQuestionHint,
    setStep,
    setIsShuffling,
    setProgress,
    setProgressText,
    setDeckCards,
  } = useTarot();

  const handleGetReading = async () => {
    if (!formData.name || !formData.dob || !formData.question) {
      toast.warning(t.form.validation.fillAll);
      return;
    }

    if (formData.question.trim().length < 20) {
      setShowQuestionHint(true);
      return;
    }

    setShowQuestionHint(false);
    setStep('deck');
    setIsShuffling(true);
    setProgress(0);
    setProgressText(t.form.progress.shuffling);

    try {
      const response = await drawCards({
        name: formData.name,
        dob: formData.dob,
        count: 5,
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

  return (
    <>
      <style>
        {`
          @keyframes swing {
            0% { transform: rotate(1deg); }
            50% { transform: rotate(-1deg); }
            100% { transform: rotate(1deg); }
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
        <div className="min-h-[400px] md:min-h-[500px] flex items-center justify-center py-8 md:py-12">
          <div className="p-6 sm:p-10 rounded-2xl border border-[#c19670]/30 bg-[#0f0e0f] shadow-[0_0_60px_-10px_rgba(193,150,112,0.3)] backdrop-blur-xl text-[#c3beb6] font-[Caudex] w-full">
            <div className="relative z-10">
              <h2 className="flex flex-col items-center justify-center gap-2 mb-6 text-lg sm:text-2xl font-bold tracking-wide text-[#c19670] text-center">
                {t.form.title}
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block mb-2 text-sm font-semibold tracking-wide text-[#c19670]">
                    <User className="w-4 h-4 inline-block mr-1" />
                    {t.form.name.label}
                  </label>
                  <Input
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-6 rounded-md border border-[#c19670]/30 bg-[#1a1819] focus-visible:border-[#c19670] text-[#c3beb6] placeholder:text-[#8a8580] focus-visible:ring-0 focus-visible:ring-offset-0 transition-all duration-200"
                    placeholder={t.form.name.placeholder}
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 mb-2 text-sm font-semibold tracking-wide text-[#c19670]">
                    <Calendar className="w-4 h-4" />
                    {t.form.dob.label}
                  </label>
                  <DatePicker
                    value={formData.dob ?? ''}
                    onChange={date => setFormData({ ...formData, dob: date })}
                    placeholder={t.form.dob.placeholder}
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-semibold tracking-wide text-[#c19670]">
                    <ShieldQuestion className="w-4 h-4 inline-block mr-1" />
                    {t.form.question.label}
                  </label>
                  <Textarea
                    value={formData.question}
                    onChange={e => setFormData({ ...formData, question: e.target.value })}
                    className="w-full px-4 py-3 rounded-md border border-[#c19670]/30 bg-[#1a1819] focus-visible:border-[#c19670] text-[#c3beb6] placeholder:text-[#8a8580] focus-visible:ring-0 focus-visible:ring-offset-0 resize-none transition-all duration-200"
                    placeholder={t.form.question.placeholder}
                    rows={4}
                  />
                  {showQuestionHint && (
                    <p className="mt-2 text-[#c19670] text-sm italic justify-center flex items-center gap-2">
                      {t.form.question.hint}
                    </p>
                  )}
                </div>

                <Button
                  onClick={handleGetReading}
                  className="w-full py-6 mt-4 rounded-md bg-[#fffef8] text-[#060506] font-bold tracking-wide shadow-md hover:shadow-lg hover:shadow-[#c19670]/40 hover:bg-[#fffaed] hover:cursor-pointer transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <TarotStar className="w-4 h-4 text-[#c19670]" />
                  {t.form.button}
                  <TarotStar className="w-4 h-4 text-[#c19670]" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
