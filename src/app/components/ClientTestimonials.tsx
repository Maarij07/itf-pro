"use client";
import React, { useState, useEffect } from 'react';
import colorsJson from '../../../colors.json';
import { useI18n } from '../../context/LanguageProvider';

export default function ClientTestimonials() {
  const colors = colorsJson.colors;
  const { t } = useI18n();
  // center the loop by starting at middle repetition
  const baseLen = 3; // number of testimonials
  const initialIndex = baseLen; // start at the middle repetition
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [disableTransition, setDisableTransition] = useState(false);

  const testimonials = [
    {
      id: 1,
      text: t('client_testimonials.testimonial1'),
      name: t('client_testimonials.client1_name'),
      position: t('client_testimonials.client1_position'),
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
    },
    {
      id: 2,
      text: t('client_testimonials.testimonial2'),
      name: t('client_testimonials.client2_name'),
      position: t('client_testimonials.client2_position'),
      // replaced with an alternative working avatar URL
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80'
    },
    {
      id: 3,
      text: t('client_testimonials.testimonial3'),
      name: t('client_testimonials.client3_name'),
      position: t('client_testimonials.client3_position'),
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80'
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => prev - 1);
  };

  const currentTestimonial = testimonials[((currentIndex % testimonials.length) + testimonials.length) % testimonials.length];
  // prepare looped items (repeat testimonials 3x) so we can scroll infinitely
  const looped = [...testimonials, ...testimonials, ...testimonials];

  // keep currentIndex within the middle repetition to avoid unbounded growth
  useEffect(() => {
    const len = testimonials.length;
    // if we've moved past the right repetition, recenter
    if (currentIndex >= len * 2) {
      const logical = ((currentIndex % len) + len) % len;
      const newIndex = len + logical;
      setDisableTransition(true);
      // small timeout to allow DOM update without transition
      setTimeout(() => {
        setCurrentIndex(newIndex);
        setDisableTransition(false);
      }, 20);
    }

    // if we've moved before the left repetition, recenter
    if (currentIndex < len) {
      const logical = ((currentIndex % len) + len) % len;
      const newIndex = len + logical;
      setDisableTransition(true);
      setTimeout(() => {
        setCurrentIndex(newIndex);
        setDisableTransition(false);
      }, 20);
    }
  }, [currentIndex, testimonials.length]);

  return (
    <section
      className="relative py-16 md:py-24 px-6"
      style={{ backgroundColor: colors.black }}
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Heading */}
        <h2 
          className="text-3xl md:text-4xl font-extrabold mb-12"
          style={{ color: colors.orange }}
        >
          {t('client_testimonials.heading')}
        </h2>

        {/* Testimonial Text (clamped to 3 lines) */}
        <p
          className="text-white text-lg md:text-xl leading-relaxed mb-8 max-w-3xl mx-auto"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          } as React.CSSProperties}
        >
          {currentTestimonial.text}
        </p>

        {/* Client Info */}
        <div className="mb-8">
          <h3 className="text-white text-lg font-semibold">
            {currentTestimonial.name}
          </h3>
          <p className="text-gray-400 text-sm">
            {currentTestimonial.position}
          </p>
        </div>

        {/* Navigation */}
          <div className="flex items-center justify-center gap-4">
          {/* Previous Button */}
          <button
            onClick={prevTestimonial}
            className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-700 text-white hover:bg-gray-800 transition"
            aria-label="Previous testimonial"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Avatar Carousel Container (avatars move, frame stays) */}
          <div className="flex items-center justify-center mx-6 relative overflow-hidden w-44 h-12">
            <div 
              className="flex items-center gap-3"
              style={{
                // each step: avatar width (48px) + gap (12px) = 60px
                // center offset for container (w-44 = 176px): 176/2 - 48/2 = 64px
                // add testimonials.length * 60 to center on the middle repetition
                transform: `translateX(${-currentIndex * 60 + 64 + testimonials.length * 60}px)`,
                transition: disableTransition ? 'none' : undefined
              }}
            >
              {looped.map((testimonial, idx) => {
                // determine visual index relative to the logical testimonial index
                const logicalIndex = idx % testimonials.length;
                const isActive = logicalIndex === (((currentIndex % testimonials.length) + testimonials.length) % testimonials.length);
                return (
                  <button
                    key={`${testimonial.id}-${idx}`}
                    onClick={() => setCurrentIndex(testimonials.length + logicalIndex)}
                    className={`relative transition-all duration-300 ${
                      isActive 
                        ? 'scale-110 z-10' 
                        : 'scale-90 opacity-60'
                    }`}
                  >
                    <div 
                      className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center"
                    >
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'https://via.placeholder.com/150?text='; }}
                        className="w-full h-full object-cover block"
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Stationary center frame (always orange) */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <div 
                className="w-12 h-12 rounded-full"
                style={{
                  boxShadow: `0 0 0 2px ${colors.orange}`,
                  backgroundColor: 'transparent'
                } as React.CSSProperties}
              />
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={nextTestimonial}
            className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-700 text-white hover:bg-gray-800 transition"
            aria-label="Next testimonial"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}