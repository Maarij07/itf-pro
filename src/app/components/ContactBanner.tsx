"use client";
import React from 'react';
import colorsJson from '../../../colors.json';
import { useI18n } from '../../context/LanguageProvider';

export default function ContactBanner() {
  const colors = colorsJson.colors;
  const { t } = useI18n();

  const features = [
    t('contact.feature_staff'),
    t('contact.feature_satisfaction'),
    t('contact.feature_testing'),
    t('contact.feature_pricing'),
  ];

  return (
    <section
      className="relative py-12 md:py-16 px-6"
      style={{ backgroundColor: colors.black }}
    >
      <div className="max-w-5xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-8">
          {t('contact.subtitle')}
        </h2>

        {/* Features with tick icons */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-10">
          {features.map((feature, idx) => (
            <div key={idx} className="flex items-center gap-2">
              {/* Tick icon - white circle with orange checkmark */}
              <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-3 h-3" fill={colors.orange} viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-white text-sm md:text-base font-medium">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
