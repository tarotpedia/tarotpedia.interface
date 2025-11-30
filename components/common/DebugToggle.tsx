'use client';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Switch } from '@/components/ui/switch';
import { useAnimations } from '@/context/AnimationContext';
import { TarotContext } from '@/context/TarotContext';
import { Step } from '@/types/interface';

import { useContext } from 'react';

import { Settings } from 'lucide-react';

const STEPS: { value: Step; label: string }[] = [
  { value: 'form', label: 'Form' },
  { value: 'deck', label: 'Shuffle/Pick' },
  { value: 'reading', label: 'Reading' },
  { value: 'confirm', label: 'Confirm' },
  { value: 'results', label: 'Results' },
];

export function DebugToggle() {
  const { animationsEnabled, toggleAnimations } = useAnimations();

  const tarotContext = useContext(TarotContext);
  const step = tarotContext?.step;
  const setStep = tarotContext?.setStep;
  const isShuffling = tarotContext?.isShuffling;
  const setIsShuffling = tarotContext?.setIsShuffling;
  const isDev = process.env.NEXT_PUBLIC_APP_ENV === 'development';

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-[#c19670] hover:text-[#d4a574] hover:bg-[#c19670]/10 transition-colors"
          aria-label="Settings"
        >
          <Settings className="w-5 h-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 bg-[#0f0e0f] border-[#c19670]/30">
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-[#c19670]">Settings</h4>

          <div className="flex items-center justify-between">
            <Label htmlFor="animations-toggle" className="text-[#c3beb6] cursor-pointer">
              Form Animations
            </Label>
            <Switch
              id="animations-toggle"
              checked={animationsEnabled}
              onCheckedChange={toggleAnimations}
              className="data-[state=checked]:bg-[#c19670] data-[state=unchecked]:bg-[#3d3a2a] data-[state=unchecked]:border-[#8a8580]"
            />
          </div>

          {isDev && tarotContext && step && setStep && (
            <div className="pt-3 border-t border-[#c19670]/20">
              <h4 className="text-xs font-semibold text-[#c19670] mb-2">Debug Steps</h4>
              <div className="text-xs text-[#8a8580] mb-2">
                Current: <span className="text-[#c19670] font-semibold">{step}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {STEPS.map(({ value, label }) => (
                  <button
                    key={value}
                    onClick={() => setStep(value)}
                    className={`px-2 py-1.5 text-xs rounded-md transition-all duration-200 ${
                      step === value
                        ? 'bg-[#c19670] text-[#0f0e0f] font-semibold'
                        : 'bg-[#1a1819] text-[#c3beb6] hover:bg-[#c19670]/20 hover:text-[#c19670] border border-[#c19670]/20'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {step === 'deck' && setIsShuffling && (
                <div className="mt-3 pt-3 border-t border-[#c19670]/20">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="shuffle-toggle" className="text-[#c3beb6] cursor-pointer text-xs">
                      Show Shuffle Animation
                    </Label>
                    <Switch
                      id="shuffle-toggle"
                      checked={isShuffling ?? false}
                      onCheckedChange={setIsShuffling}
                      className="data-[state=checked]:bg-[#c19670] data-[state=unchecked]:bg-[#3d3a2a] data-[state=unchecked]:border-[#8a8580]"
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
