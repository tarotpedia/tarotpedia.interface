'use client';
import Footer from '@/app/footer';
import DatePicker from '@/components/common/DatePicker';
import Navbar from '@/components/common/Navbar';
import { useI18n } from '@/lib/i18n';

import { useState } from 'react';

import { Calculator, Calendar, User } from 'lucide-react';

export default function NumerologyGuide() {
  const { t } = useI18n();
  const [name, setName] = useState('');
  const [dob, setDob] = useState('2000-01-01');
  const [lifePathNumber, setLifePathNumber] = useState<number | null>(null);
  const [expressionNumber, setExpressionNumber] = useState<number | null>(null);

  const letterValues: { [key: string]: number } = {
    A: 1,
    B: 2,
    C: 3,
    D: 4,
    E: 5,
    F: 6,
    G: 7,
    H: 8,
    I: 9,
    J: 1,
    K: 2,
    L: 3,
    M: 4,
    N: 5,
    O: 6,
    P: 7,
    Q: 8,
    R: 9,
    S: 1,
    T: 2,
    U: 3,
    V: 4,
    W: 5,
    X: 6,
    Y: 7,
    Z: 8,
  };

  const reduceToSingleDigit = (num: number): number => {
    while (num > 9 && num !== 11 && num !== 22 && num !== 33) {
      num = num
        .toString()
        .split('')
        .reduce((sum, digit) => sum + parseInt(digit), 0);
    }
    return num;
  };

  const calculateLifePath = () => {
    if (!dob) return;

    const date = new Date(dob);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const reducedDay = reduceToSingleDigit(day);
    const reducedMonth = reduceToSingleDigit(month);
    const reducedYear = reduceToSingleDigit(year);

    const total = reducedDay + reducedMonth + reducedYear;
    setLifePathNumber(reduceToSingleDigit(total));
  };

  const calculateExpression = () => {
    if (!name) return;

    const cleanName = name.toUpperCase().replace(/[^A-Z]/g, '');
    const sum = cleanName.split('').reduce((total, letter) => {
      return total + (letterValues[letter] || 0);
    }, 0);

    setExpressionNumber(reduceToSingleDigit(sum));
  };

  const calculateAll = () => {
    calculateLifePath();
    calculateExpression();
  };

  return (
    <div className="relative bg-[#060506] min-h-screen flex flex-col">
      <Navbar />
      <div className="relative flex-1 z-10 container mx-auto px-4 sm:py-16 py-8 max-w-7xl">
        <p className="text-xl text-[#c3beb6] max-w-3xl mx-auto">{t.numerology.subtitle}</p>

        <div className="bg-[#0f0e0f] rounded-2xl shadow-xl p-8 mb-12 mt-12 border border-[#c19670]/30">
          <h2 className="text-3xl font-bold text-[#c19670] mb-6 flex items-center">
            <Calculator className="w-8 h-8 text-[#c19670] mr-3" />
            {t.numerology.calculator.title}
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-[#c19670] mb-2">
                {t.numerology.calculator.fullName}
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder={t.numerology.calculator.fullNamePlaceholder}
                className="w-full px-4 h-[56px] border border-[#c19670]/30 bg-[#1a1819] text-[#c3beb6] rounded-md focus:border-[#c19670] focus:outline-none placeholder:text-[#8a8580]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#c19670] mb-2">
                {t.numerology.calculator.dateOfBirth}
              </label>
              <DatePicker value={dob} onChange={setDob} placeholder={t.numerology.calculator.dateOfBirth} />
            </div>
          </div>

          <button
            onClick={calculateAll}
            className="w-full bg-[#c19670] text-[#060506] font-bold py-3 px-6 rounded-md hover:bg-[#d4a574] transition-all shadow-lg"
          >
            {t.numerology.calculator.calculateButton}
          </button>

          {(lifePathNumber || expressionNumber) && (
            <div className="grid md:grid-cols-3 gap-4 mt-8 justify-center">
              {lifePathNumber && (
                <div className="bg-[#1a1819] p-6 rounded-xl border border-[#c19670]/50 shadow-[0_0_15px_rgba(193,150,112,0.2)]">
                  <div className="flex items-center mb-2">
                    <Calendar className="w-5 h-5 text-[#c19670] mr-2" />
                    <h3 className="font-bold text-[#c19670]">{t.numerology.calculator.lifePath}</h3>
                  </div>
                  <div className="text-4xl font-bold text-[#d4a574]">{lifePathNumber}</div>
                </div>
              )}

              {expressionNumber && (
                <div className="bg-[#1a1819] p-6 rounded-xl border border-[#c19670]/50 shadow-[0_0_15px_rgba(193,150,112,0.2)]">
                  <div className="flex items-center mb-2">
                    <User className="w-5 h-5 text-[#c19670] mr-2" />
                    <h3 className="font-bold text-[#c19670]">{t.numerology.calculator.expression}</h3>
                  </div>
                  <div className="text-4xl font-bold text-[#d4a574]">{expressionNumber}</div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="space-y-8">
          <div className="bg-[#0f0e0f] rounded-2xl shadow-lg p-8 border border-[#c19670]/20">
            <h2 className="text-3xl font-bold text-[#c19670] mb-4">{t.numerology.whatIs.title}</h2>
            <p className="text-[#c3beb6] leading-relaxed mb-4">{t.numerology.whatIs.paragraph1}</p>
            <p className="text-[#c3beb6] leading-relaxed">{t.numerology.whatIs.paragraph2}</p>
          </div>

          <div className="bg-[#0f0e0f] rounded-2xl shadow-lg p-8 border border-[#c19670]/20">
            <div className="flex items-center mb-4">
              <Calendar className="w-8 h-8 text-[#c19670] mr-3" />
              <h2 className="text-3xl font-bold text-[#c19670]">{t.numerology.lifePath.title}</h2>
            </div>

            <p className="text-[#c3beb6] leading-relaxed mb-4">{t.numerology.lifePath.description}</p>

            <div className="bg-[#1a1819]/50 rounded-xl p-6 mb-4 border border-[#c19670]/20">
              <h3 className="font-bold text-[#c19670] mb-3">{t.numerology.lifePath.howToCalculate}</h3>
              <ol className="list-decimal list-inside space-y-2 text-[#c3beb6]">
                <li>{t.numerology.lifePath.step1}</li>
                <li>{t.numerology.lifePath.step2}</li>
                <li>{t.numerology.lifePath.step3}</li>
              </ol>

              <div className="mt-4 p-4 bg-[#0f0e0f] rounded-md border border-[#c19670]/10">
                <p className="font-semibold text-[#c19670] mb-2">{t.numerology.lifePath.exampleTitle}</p>
                <p className="text-[#c3beb6]">{t.numerology.lifePath.exampleMonth}</p>
                <p className="text-[#c3beb6]">{t.numerology.lifePath.exampleDay}</p>
                <p className="text-[#c3beb6]">{t.numerology.lifePath.exampleYear}</p>
                <p className="text-[#d4a574] font-bold mt-2">{t.numerology.lifePath.exampleResult}</p>
              </div>
            </div>
          </div>

          <div className="bg-[#0f0e0f] rounded-2xl shadow-lg p-8 border border-[#c19670]/20">
            <div className="flex items-center mb-4">
              <User className="w-8 h-8 text-[#c19670] mr-3" />
              <h2 className="text-3xl font-bold text-[#c19670]">{t.numerology.expression.title}</h2>
            </div>

            <p className="text-[#c3beb6] leading-relaxed mb-4">{t.numerology.expression.description}</p>

            <div className="bg-[#1a1819]/50 rounded-xl p-6 mb-4 border border-[#c19670]/20">
              <h3 className="font-bold text-[#c19670] mb-3">{t.numerology.expression.howToCalculate}</h3>
              <ol className="list-decimal list-inside space-y-2 text-[#c3beb6] mb-4">
                <li>{t.numerology.expression.step1}</li>
                <li>{t.numerology.expression.step2}</li>
                <li>{t.numerology.expression.step3}</li>
              </ol>

              <div className="bg-[#0f0e0f] rounded-md p-4 mb-4 border border-[#c19670]/10">
                <h4 className="font-semibold text-[#c19670] mb-2">{t.numerology.expression.chartTitle}</h4>
                <div className="grid grid-cols-9 gap-2 text-sm text-center">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                    <div key={num} className="bg-[#1a1819] rounded p-2 border border-[#c19670]/20">
                      <div className="font-bold text-[#d4a574]">{num}</div>
                      <div className="text-xs text-[#8a8580]">
                        {num === 1 && 'A J S'}
                        {num === 2 && 'B K T'}
                        {num === 3 && 'C L U'}
                        {num === 4 && 'D M V'}
                        {num === 5 && 'E N W'}
                        {num === 6 && 'F O X'}
                        {num === 7 && 'G P Y'}
                        {num === 8 && 'H Q Z'}
                        {num === 9 && 'I R'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-[#0f0e0f] rounded-md border border-[#c19670]/10">
                <p className="font-semibold text-[#c19670] mb-2">{t.numerology.expression.exampleTitle}</p>
                <p className="text-[#c3beb6]">{t.numerology.expression.exampleCalculation}</p>
                <p className="text-[#d4a574] font-bold mt-2">{t.numerology.expression.exampleResult}</p>
              </div>
            </div>
          </div>

          <div className="bg-[#0f0e0f] rounded-2xl shadow-lg p-8 border border-[#c19670]/20">
            <h2 className="text-3xl font-bold text-[#c19670] mb-4">{t.numerology.masterNumbers.title}</h2>

            <p className="text-[#c3beb6] leading-relaxed mb-4">{t.numerology.masterNumbers.description}</p>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-[#1a1819] rounded-xl p-6 border border-[#c19670]/30 hover:border-[#c19670]/60 transition-colors">
                <h3 className="text-2xl font-bold text-[#d4a574] mb-2">11</h3>
                <p className="text-sm text-[#c3beb6]">{t.numerology.masterNumbers.number11}</p>
              </div>

              <div className="bg-[#1a1819] rounded-xl p-6 border border-[#c19670]/30 hover:border-[#c19670]/60 transition-colors">
                <h3 className="text-2xl font-bold text-[#d4a574] mb-2">22</h3>
                <p className="text-sm text-[#c3beb6]">{t.numerology.masterNumbers.number22}</p>
              </div>

              <div className="bg-[#1a1819] rounded-xl p-6 border border-[#c19670]/30 hover:border-[#c19670]/60 transition-colors">
                <h3 className="text-2xl font-bold text-[#d4a574] mb-2">33</h3>
                <p className="text-sm text-[#c3beb6]">{t.numerology.masterNumbers.number33}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
