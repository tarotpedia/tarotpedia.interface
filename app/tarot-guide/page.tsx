'use client';
import Footer from '@/app/footer';
import Header from '@/app/header';
import { getCardInfo } from '@/lib/api';
import { BASE_API_URL } from '@/lib/variables';

import { useEffect, useState } from 'react';

import { HelpCircle, Moon, Sun, User, X } from 'lucide-react';

interface CardMeanings {
  light: string[];
  shadow: string[];
}

interface CardInfo {
  name: string;
  number: string;
  arcana: string;
  suit: string;
  image_url: string;
  fortune_telling: string[];
  keywords: string[];
  meanings: CardMeanings;
  archetype: string;
  hebrew_alphabet: string;
  numerology: string;
  elemental: string;
  mythical_spiritual: string;
  questions_to_ask: string[];
}

export default function TarotGuidePage() {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [cardInfo, setCardInfo] = useState<CardInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '0px';
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [open]);

  const handleCardClick = async (cardNumber: number): Promise<void> => {
    setError(null);
    setSelectedCard(cardNumber);
    setCardInfo(null);
    try {
      const response = await getCardInfo(cardNumber);
      setCardInfo(response.data);
      setOpen(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Error fetching card info:', err);
      setError('Failed to load card information. Please try again.');
    }
  };

  const closeModal = (): void => {
    setOpen(false);
    setSelectedCard(null);
    setCardInfo(null);
    setError(null);
  };

  return (
    <div className="relative bg-[#fdfdf8]">
      <div className="relative min-h-screen z-10 container mx-auto px-4 sm:py-16 py-8 max-w-7xl">
        <Header />

        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#3d3a2a] mb-4">Tarot Card Deck Guide</h1>
          <p className="text-[#3d3a2a] max-w-2xl mx-auto">
            Explore the meanings and symbolism of each tarot card in the deck. Click on any card below to learn more
            about its significance, fortune telling aspects, and deeper insights.
          </p>
        </section>
        <section className="mb-12">
          {/* Major Arcana */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-[#3d3a2a] mb-4 justify-center flex">Major Arcana</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
              {Array.from({ length: 22 }, (_, i) => i + 1).map(cardNumber => (
                <div
                  key={cardNumber}
                  onClick={() => handleCardClick(cardNumber)}
                  className="group relative rounded-lg overflow-hidden shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:z-10 bg-gray-200"
                >
                  <img
                    src={`${BASE_API_URL}/tarot-cards/images/${cardNumber}.jpg`}
                    alt={`Tarot Card ${cardNumber}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Minor Arcana */}
          <div>
            <h2 className="text-2xl font-semibold text-[#3d3a2a] mb-4 justify-center flex">Minor Arcana</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
              {Array.from({ length: 56 }, (_, i) => i + 23).map(cardNumber => (
                <div
                  key={cardNumber}
                  onClick={() => handleCardClick(cardNumber)}
                  className="group relative rounded-lg overflow-hidden shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:z-10 bg-gray-200"
                >
                  <img
                    src={`${BASE_API_URL}/tarot-cards/images/${cardNumber}.jpg`}
                    alt={`Tarot Card ${cardNumber}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Modal - Rendered at root level */}
      {open && cardInfo && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9999,
            overflow: 'auto',
          }}
        >
          {/* Backdrop */}
          <div
            onClick={closeModal}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
            }}
          />

          {/* Modal Content Container */}
          <div
            style={{
              position: 'relative',
              minHeight: '100vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1rem',
            }}
          >
            {/* Modal Panel */}
            <div
              onClick={e => e.stopPropagation()}
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '56rem',
                maxHeight: '90vh',
                backgroundColor: '#fdfdf8',
                borderRadius: '1rem',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
              }}
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                style={{
                  position: 'absolute',
                  top: '0.75rem',
                  right: '0.75rem',
                  zIndex: 10,
                  padding: '0.5rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: '9999px',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 1)';
                  e.currentTarget.style.transform = 'scale(1.1)';
                  e.currentTarget.style.boxShadow = '0 6px 12px -2px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                }}
              >
                <X size={20} />
              </button>

              {/* Scrollable Content */}
              <div style={{ overflowY: 'auto', maxHeight: '90vh' }}>
                {/* Header Section */}
                <div style={{ padding: '2rem', borderBottom: '1px solid #e5e7eb' }}>
                  <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                    {/* Card Image */}
                    <div
                      style={{
                        width: window.innerWidth <= 768 ? '8rem' : '12rem',
                        flexShrink: 0,
                      }}
                    >
                      <div
                        style={{
                          borderRadius: '0.5rem',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                          backgroundColor: '#e5e7eb',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          overflow: 'hidden',
                        }}
                      >
                        <img
                          src={`${BASE_API_URL}/tarot-cards/images/${selectedCard?.toString()}.jpg`}
                          alt={cardInfo.name}
                          style={{
                            width: window.innerWidth <= 768 ? '100%' : '50%',
                            objectFit: 'cover',
                          }}
                        />
                      </div>
                    </div>

                    {/* Card Info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: '0.75rem',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          color: '#6b7280',
                          marginBottom: '0.5rem',
                        }}
                      >
                        {cardInfo.arcana}
                      </div>
                      <h3
                        style={{
                          fontSize: '2.25rem',
                          fontWeight: 'bold',
                          marginBottom: '0.5rem',
                          color: '#111827',
                        }}
                      >
                        {cardInfo.name}
                      </h3>
                      <div
                        style={{
                          fontSize: '1.125rem',
                          color: '#374151',
                          marginBottom: '1rem',
                        }}
                      >
                        Card Number: {selectedCard?.toString()}
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {cardInfo.keywords.map((keyword, idx) => (
                          <span
                            key={idx}
                            style={{
                              padding: '0.25rem 0.75rem',
                              backgroundColor: '#e5e7eb',
                              borderRadius: '9999px',
                              fontSize: '0.875rem',
                              color: '#1f2937',
                            }}
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Sections */}
                <div style={{ padding: '2rem' }}>
                  {/* Fortune Telling */}
                  {cardInfo.fortune_telling.length > 0 && (
                    <div style={{ marginBottom: '1.5rem' }}>
                      <h4
                        style={{
                          fontSize: '1.5rem',
                          fontWeight: '600',
                          marginBottom: '0.75rem',
                          color: '#111827',
                        }}
                      >
                        Fortune Telling
                      </h4>
                      <ul style={{ listStyle: 'none', padding: 0 }}>
                        {cardInfo.fortune_telling.map((fortune, idx) => (
                          <li key={idx} style={{ display: 'flex', marginBottom: '0.5rem' }}>
                            <span style={{ color: '#9333ea', marginRight: '0.5rem' }}>•</span>
                            <span style={{ color: '#374151' }}>{fortune}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Meanings */}
                  {cardInfo.meanings && (
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: '1.5rem',
                        marginBottom: '1.5rem',
                      }}
                    >
                      <div
                        style={{
                          backgroundColor: '#fef3c7',
                          padding: '1.5rem',
                          borderRadius: '0.5rem',
                        }}
                      >
                        <h4
                          style={{
                            fontSize: '1.25rem',
                            fontWeight: '600',
                            marginBottom: '0.75rem',
                            color: '#111827',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                          }}
                        >
                          <Sun size={20} /> Light Meanings
                        </h4>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                          {cardInfo.meanings.light.map((meaning, idx) => (
                            <li key={idx} style={{ display: 'flex', marginBottom: '0.5rem' }}>
                              <span style={{ color: '#d97706', marginRight: '0.5rem' }}>•</span>
                              <span style={{ color: '#374151', fontSize: '0.875rem' }}>{meaning}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div
                        style={{
                          backgroundColor: '#f3f4f6',
                          padding: '1.5rem',
                          borderRadius: '0.5rem',
                        }}
                      >
                        <h4
                          style={{
                            fontSize: '1.25rem',
                            fontWeight: '600',
                            marginBottom: '0.75rem',
                            color: '#111827',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                          }}
                        >
                          <Moon size={20} /> Shadow Meanings
                        </h4>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                          {cardInfo.meanings.shadow.map((meaning, idx) => (
                            <li key={idx} style={{ display: 'flex', marginBottom: '0.5rem' }}>
                              <span style={{ color: '#6b7280', marginRight: '0.5rem' }}>•</span>
                              <span style={{ color: '#374151', fontSize: '0.875rem' }}>{meaning}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Archetype */}
                  {cardInfo.archetype && (
                    <div
                      style={{
                        backgroundColor: '#f3e8ff',
                        padding: '1.5rem',
                        borderRadius: '0.5rem',
                        marginBottom: '1.5rem',
                      }}
                    >
                      <h4
                        style={{
                          fontSize: '1.25rem',
                          fontWeight: '600',
                          marginBottom: '0.5rem',
                          color: '#111827',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                        }}
                      >
                        <User size={20} />
                        Archetype
                      </h4>
                      <p style={{ color: '#374151' }}>{cardInfo.archetype}</p>
                    </div>
                  )}

                  {/* Questions to Ask */}
                  {cardInfo.questions_to_ask.length > 0 && (
                    <div style={{ marginBottom: '1.5rem' }}>
                      <h4
                        style={{
                          fontSize: '1.5rem',
                          fontWeight: '600',
                          marginBottom: '0.75rem',
                          color: '#111827',
                        }}
                      >
                        Questions to Ask
                      </h4>
                      <ul style={{ listStyle: 'none', padding: 0 }}>
                        {cardInfo.questions_to_ask.map((q, idx) => (
                          <li
                            key={idx}
                            style={{
                              display: 'flex',
                              marginBottom: '0.5rem',
                              alignItems: 'flex-start',
                            }}
                          >
                            <HelpCircle
                              size={16}
                              style={{
                                color: '#4f46e5',
                                marginRight: '0.5rem',
                                marginTop: '0.125rem',
                                flexShrink: 0,
                              }}
                            />
                            <span style={{ color: '#374151', fontStyle: 'italic' }}>{q}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Symbolism */}
                  {(cardInfo.hebrew_alphabet || cardInfo.numerology || cardInfo.elemental) && (
                    <div
                      style={{
                        backgroundColor: '#e0e7ff',
                        padding: '1.5rem',
                        borderRadius: '0.5rem',
                        marginBottom: '1.5rem',
                      }}
                    >
                      <h4
                        style={{
                          fontSize: '1.25rem',
                          fontWeight: '600',
                          marginBottom: '0.75rem',
                          color: '#111827',
                        }}
                      >
                        Symbolism & Correspondences
                      </h4>
                      <div style={{ color: '#374151' }}>
                        {cardInfo.hebrew_alphabet && (
                          <p style={{ marginBottom: '0.5rem' }}>
                            <strong>Hebrew Alphabet:</strong> {cardInfo.hebrew_alphabet}
                          </p>
                        )}
                        {cardInfo.numerology && (
                          <p style={{ marginBottom: '0.5rem' }}>
                            <strong>Numerology:</strong> {cardInfo.numerology}
                          </p>
                        )}
                        {cardInfo.elemental && (
                          <p style={{ marginBottom: '0.5rem' }}>
                            <strong>Element:</strong> {cardInfo.elemental}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Mythical & Spiritual */}
                  {cardInfo.mythical_spiritual && (
                    <div>
                      <h4
                        style={{
                          fontSize: '1.25rem',
                          fontWeight: '600',
                          marginBottom: '0.5rem',
                          color: '#111827',
                        }}
                      >
                        Mythical & Spiritual Connections
                      </h4>
                      <p style={{ color: '#374151' }}>{cardInfo.mythical_spiritual}</p>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div
                  style={{
                    backgroundColor: '#f9fafb',
                    padding: '1rem 1.5rem',
                    borderTop: '1px solid #e5e7eb',
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}
                >
                  <button
                    onClick={closeModal}
                    style={{
                      padding: '0.5rem 1rem',
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      color: '#111827',
                      backgroundColor: 'white',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.375rem',
                      cursor: 'pointer',
                      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 1)';
                      e.currentTarget.style.transform = 'scale(1.1)';
                      e.currentTarget.style.boxShadow = '0 6px 12px -2px rgba(0, 0, 0, 0.15)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
