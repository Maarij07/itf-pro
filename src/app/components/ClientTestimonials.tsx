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
          className="text-3xl md:text-4xl font-extrabold mb-8 text-center"
          style={{ color: colors.orange }}
        >
          {t('client_testimonials.heading')}
        </h2>

        {/* Testimonial Text */}
        <p 
          className="text-white text-lg md:text-xl leading-relaxed mb-8 max-w-4xl mx-auto text-center"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          } as React.CSSProperties}
        >
          {currentTestimonial.text}
        </p>

        {/* Client Info */}
        <div className="mb-8 text-center">
          <h3 className="text-white text-xl font-semibold mb-1">
            {currentTestimonial.name}
          </h3>
          <p className="text-gray-400 text-base">
            {currentTestimonial.position}
          </p>
        </div>

        {/* Navigation - Sliding avatars with center highlight */}
        <div className="flex items-center justify-center gap-6">
          {/* Previous Button */}
          <button
            onClick={prevTestimonial}
            className="flex items-center gap-1 text-gray-400 hover:text-white transition text-sm"
            aria-label="Previous testimonial"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Prev
          </button>

          {/* Avatar Navigation - 3 visible avatars, center one highlighted */}
          <div className="flex items-center gap-3">
            {/* Previous avatar (small) */}
            <div className="w-10 h-10 rounded-full overflow-hidden opacity-70">
              <img
                src={testimonials[(((currentIndex - 1) % testimonials.length) + testimonials.length) % testimonials.length].avatar}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Center avatar (large with ring) */}
            <div 
              className="w-14 h-14 rounded-full overflow-hidden border-2 p-0.5"
              style={{ borderColor: colors.orange }}
            >
              <img
                src={currentTestimonial.avatar}
                alt={currentTestimonial.name}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            
            {/* Next avatar (small) */}
            <div className="w-10 h-10 rounded-full overflow-hidden opacity-70">
              <img
                src={testimonials[(((currentIndex + 1) % testimonials.length) + testimonials.length) % testimonials.length].avatar}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={nextTestimonial}
            className="flex items-center gap-1 text-gray-400 hover:text-white transition text-sm"
            aria-label="Next testimonial"
          >
            Next
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}