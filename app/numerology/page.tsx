'use client';
import Footer from '@/app/footer';
import Header from '@/app/header';

import { useState } from 'react';

import { BookOpen, Briefcase, Calculator, Calendar, Heart, User } from 'lucide-react';

export default function NumerologyGuide() {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
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

  // Reduce to single digit (except master numbers 11, 22, 33)
  const reduceToSingleDigit = (num: number): number => {
    while (num > 9 && num !== 11 && num !== 22 && num !== 33) {
      num = num
        .toString()
        .split('')
        .reduce((sum, digit) => sum + parseInt(digit), 0);
    }
    return num;
  };

  // Calculate Life Path Number from date of birth
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

  // Calculate Expression Number (full name)
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
    <div className="relative bg-[#fdfdf8]">
      <div className="relative min-h-screen z-10 container mx-auto px-4 sm:py-16 py-8 max-w-7xl">
        <Header />
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Discover the ancient science of numbers and their mystical meanings. Calculate your personal numbers and
          understand their significance in your life journey.
        </p>
        {/* Calculator Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
            <Calculator className="w-8 h-8 text-amber-600 mr-3" />
            Calculate Your Numbers
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name (as on birth certificate)
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="John Michael Smith"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Date of Birth</label>
              <input
                type="date"
                value={dob}
                onChange={e => setDob(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-amber-500 focus:outline-none"
              />
            </div>
          </div>

          <button
            onClick={calculateAll}
            className="w-full bg-linear-to-r from-amber-500 to-orange-500 text-white font-bold py-3 px-6 rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg"
          >
            Calculate All Numbers
          </button>

          {/* Results */}
          {(lifePathNumber || expressionNumber) && (
            <div className="grid md:grid-cols-3 gap-4 mt-8 justify-center">
              {lifePathNumber && (
                <div className="bg-linear-to-br from-blue-50 to-blue-100 p-6 rounded-xl border-2 border-blue-200">
                  <div className="flex items-center mb-2">
                    <Calendar className="w-5 h-5 text-blue-600 mr-2" />
                    <h3 className="font-bold text-gray-800">Life Path</h3>
                  </div>
                  <div className="text-4xl font-bold text-blue-600">{lifePathNumber}</div>
                </div>
              )}

              {expressionNumber && (
                <div className="bg-linear-to-br from-purple-50 to-purple-100 p-6 rounded-xl border-2 border-purple-200">
                  <div className="flex items-center mb-2">
                    <User className="w-5 h-5 text-purple-600 mr-2" />
                    <h3 className="font-bold text-gray-800">Expression</h3>
                  </div>
                  <div className="text-4xl font-bold text-purple-600">{expressionNumber}</div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Theory Sections */}
        <div className="space-y-8">
          {/* What is Numerology */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">What is Numerology?</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Numerology is an ancient metaphysical science that studies the mystical relationship between numbers and
              events in our lives. Dating back to ancient civilizations including Babylon, Egypt, and Greece, numerology
              teaches that numbers carry vibrational frequencies that influence our personality, life path, and destiny.
            </p>
            <p className="text-gray-700 leading-relaxed">
              The most widely used system today is the Pythagorean system, named after the Greek mathematician
              Pythagoras, who believed that the universe is mathematically precise and that numbers are the building
              blocks of reality.
            </p>
          </div>

          {/* Life Path Number */}
          <div className="bg-linear-to-r from-blue-50 to-cyan-50 rounded-2xl shadow-lg p-8">
            <div className="flex items-center mb-4">
              <Calendar className="w-8 h-8 text-blue-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-800">Life Path Number</h2>
            </div>

            <p className="text-gray-700 leading-relaxed mb-4">
              Your Life Path Number is the most important number in numerology. It represents your life's purpose,
              natural talents, and the path you're meant to walk.
            </p>

            <div className="bg-white rounded-xl p-6 mb-4">
              <h3 className="font-bold text-gray-800 mb-3">How to Calculate:</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Reduce each part of your birth date (day, month, year) to a single digit</li>
                <li>Add these three numbers together</li>
                <li>Reduce the sum to a single digit (except for 11, 22, 33 - these are Master Numbers)</li>
              </ol>

              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="font-semibold text-gray-800 mb-2">Example: July 16, 1990</p>
                <p className="text-gray-700">Month: 7 → 7</p>
                <p className="text-gray-700">Day: 16 → 1 + 6 = 7</p>
                <p className="text-gray-700">Year: 1990 → 1 + 9 + 9 + 0 = 19 → 1 + 9 = 10 → 1 + 0 = 1</p>
                <p className="text-gray-700 font-bold mt-2">Life Path: 7 + 7 + 1 = 15 → 1 + 5 = 6</p>
              </div>
            </div>
          </div>

          {/* Expression Number */}
          <div className="bg-linear-to-r from-purple-50 to-pink-50 rounded-2xl shadow-lg p-8">
            <div className="flex items-center mb-4">
              <User className="w-8 h-8 text-purple-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-800">Expression Number (Destiny Number)</h2>
            </div>

            <p className="text-gray-700 leading-relaxed mb-4">
              Your Expression Number reveals your natural abilities, talents, and potential. It's calculated from your
              full birth name and shows what you're meant to express in this lifetime.
            </p>

            <div className="bg-white rounded-xl p-6 mb-4">
              <h3 className="font-bold text-gray-800 mb-3">How to Calculate:</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-4">
                <li>Use your full name as written on your birth certificate</li>
                <li>Convert each letter to its corresponding number (A=1, B=2, C=3... I=9, J=1, etc.)</li>
                <li>Add all numbers together and reduce to a single digit</li>
              </ol>

              <div className="bg-purple-50 rounded-lg p-4 mb-4">
                <h4 className="font-semibold text-gray-800 mb-2">Letter-Number Chart (Pythagorean):</h4>
                <div className="grid grid-cols-9 gap-2 text-sm text-center">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                    <div key={num} className="bg-white rounded p-2">
                      <div className="font-bold text-purple-600">{num}</div>
                      <div className="text-xs text-gray-600">
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

              <div className="p-4 bg-purple-50 rounded-lg">
                <p className="font-semibold text-gray-800 mb-2">Example: JOHN</p>
                <p className="text-gray-700">J=1, O=6, H=8, N=5</p>
                <p className="text-gray-700 font-bold mt-2">1 + 6 + 8 + 5 = 20 → 2 + 0 = 2</p>
              </div>
            </div>
          </div>

          {/* Master Numbers */}
          <div className="bg-linear-to-r from-yellow-50 to-amber-50 rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Master Numbers: 11, 22, 33</h2>

            <p className="text-gray-700 leading-relaxed mb-4">
              Master Numbers are double-digit numbers that are not reduced to a single digit. They carry powerful
              vibrations and indicate individuals with heightened potential and spiritual significance.
            </p>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-6 border-2 border-amber-200">
                <h3 className="text-2xl font-bold text-amber-600 mb-2">11</h3>
                <p className="text-sm text-gray-700">The Illuminator - Spiritual insight and enlightenment</p>
              </div>

              <div className="bg-white rounded-xl p-6 border-2 border-amber-200">
                <h3 className="text-2xl font-bold text-amber-600 mb-2">22</h3>
                <p className="text-sm text-gray-700">The Master Builder - Turning dreams into reality</p>
              </div>

              <div className="bg-white rounded-xl p-6 border-2 border-amber-200">
                <h3 className="text-2xl font-bold text-amber-600 mb-2">33</h3>
                <p className="text-sm text-gray-700">The Master Teacher - Compassion and spiritual guidance</p>
              </div>
            </div>
          </div>

          {/* Resources Section */}
          <div className="bg-linear-to-r from-indigo-50 to-purple-50 rounded-2xl shadow-lg p-8">
            <div className="flex items-center mb-4">
              <BookOpen className="w-8 h-8 text-indigo-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-800">Learn More</h2>
            </div>

            <p className="text-gray-700 leading-relaxed mb-6">
              Now that you've calculated your core numbers, explore their detailed meanings and how they interact with
              each other. Each number carries unique energies and lessons for your life journey.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <a
                href="https://www.worldnumerology.com/numerology-single-digit-numbers/"
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white rounded-xl p-6 hover:shadow-xl transition-shadow border-2 border-indigo-100 hover:border-indigo-300"
              >
                <h3 className="font-bold text-gray-800 mb-2">Number Meanings (1-9)</h3>
                <p className="text-sm text-gray-600">
                  Discover the detailed interpretations of each single-digit number
                </p>
              </a>

              <a
                href="https://www.numerology.com/articles/about-numerology/master-numbers/"
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white rounded-xl p-6 hover:shadow-xl transition-shadow border-2 border-indigo-100 hover:border-indigo-300"
              >
                <h3 className="font-bold text-gray-800 mb-2">Master Numbers Guide</h3>
                <p className="text-sm text-gray-600">Deep dive into the powerful vibrations of 11, 22, and 33</p>
              </a>

              <a
                href="https://astrologyfutureeye.com/fortune-tellers/personal-year-numerology-calculator"
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white rounded-xl p-6 hover:shadow-xl transition-shadow border-2 border-indigo-100 hover:border-indigo-300"
              >
                <h3 className="font-bold text-gray-800 mb-2">Personal Year Cycles</h3>
                <p className="text-sm text-gray-600">Understand the 9-year numerology cycle and where you are now</p>
              </a>

              <a
                href="https://www.numerology.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white rounded-xl p-6 hover:shadow-xl transition-shadow border-2 border-indigo-100 hover:border-indigo-300"
              >
                <h3 className="font-bold text-gray-800 mb-2">Numerology.com</h3>
                <p className="text-sm text-gray-600">
                  Comprehensive resources and tools for deeper numerology insights
                </p>
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
