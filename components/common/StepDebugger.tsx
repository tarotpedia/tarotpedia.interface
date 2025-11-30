'use client';
import { useTarot } from '@/context/TarotContext';
import { Step } from '@/types/interface';

import { useState } from 'react';

import { Bug, ChevronDown, ChevronUp } from 'lucide-react';

const STEPS: { value: Step; label: string }[] = [
  { value: 'form', label: 'Form' },
  { value: 'deck', label: 'Deck' },
  { value: 'reading', label: 'Reading' },
  { value: 'confirm', label: 'Confirm' },
  { value: 'results', label: 'Results' },
];

export default function StepDebugger() {
  const { step, setStep } = useTarot();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-[9999]">
      <div
        className={`bg-gradient-to-br from-[#1a1819] to-[#0f0e0f] border border-[#c19670]/50 rounded-lg shadow-[0_0_30px_-5px_rgba(193,150,112,0.5)] backdrop-blur-xl overflow-hidden transition-all duration-300 ${
          isExpanded ? 'w-64' : 'w-auto'
        }`}
      >
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full px-4 py-3 flex items-center justify-between gap-2 text-[#c19670] hover:bg-[#c19670]/10 transition-colors duration-200"
        >
          <div className="flex items-center gap-2">
            <Bug className="w-4 h-4" />
            <span className="text-sm font-semibold tracking-wide">Step Debugger</span>
          </div>
          {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </button>

        {isExpanded && (
          <div className="px-3 pb-3 space-y-1">
            <div className="text-xs text-[#8a8580] mb-2 px-1">
              Current: <span className="text-[#c19670] font-semibold">{step}</span>
            </div>
            {STEPS.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setStep(value)}
                className={`w-full px-3 py-2 text-sm rounded-md transition-all duration-200 text-left ${
                  step === value
                    ? 'bg-[#c19670] text-[#0f0e0f] font-semibold shadow-[0_0_15px_0_rgba(193,150,112,0.3)]'
                    : 'bg-[#1a1819] text-[#c3beb6] hover:bg-[#c19670]/20 hover:text-[#c19670] border border-[#c19670]/20'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
