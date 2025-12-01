"use client";
import React from 'react';
import colorsJson from '../../../colors.json';
import { useI18n } from '../../context/LanguageProvider';

export default function Hero() {
  const colors = colorsJson.colors;
  const { t } = useI18n();

  // Use local hero background image
  const bg = '/images/hero-bg.svg';

  return (
    <section
      className="relative h-[85vh] bg-cover bg-center flex items-center w-full px-6"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Gradient overlay - dark on left, transparent on right */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/60 to-black/15" />

      <div className="relative max-w-7xl mx-auto w-full text-white py-12">
        <h1 className="font-extrabold leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-5xl">
          <span className="block md:whitespace-nowrap">{t('hero.heading_line1')} <span style={{ color: colors.orange }}>{t('hero.heading_thermal')}</span></span>
          <span className="block md:whitespace-nowrap">{t('hero.heading_line2_prefix')} <span style={{ color: colors.orange }}>{t('hero.heading_line2_orange')}</span> {t('hero.heading_line2_suffix')}</span>
        </h1>

        <p className="mt-6 max-w-xl text-base text-zinc-200">{t('hero.sub')}</p>

        <div className="mt-8 flex items-center gap-4">
          <a
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold"
            style={{ backgroundColor: colors.orange, color: '#ffffff' }}
            href="#services"
          >
            {t('hero.cta_primary')}
          </a>

          <a
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold"
            style={{ backgroundColor: '#ffffff', color: '#111827', boxShadow: '0 2px 6px rgba(17,24,39,0.12)' }}
            href="#projects"
          >
            {t('hero.cta_secondary')}
          </a>
        </div>

      </div>

      {/* Orange Services Box - positioned to align with navbar */}
      <div 
        className="absolute bottom-0 right-6 md:right-12 lg:right-[max(1.5rem,calc((100vw-80rem)/2))] transform translate-y-1/2 z-10 hidden md:block"
      >
        {/* Orange box with services */}
        <div 
          className="rounded-md px-8 w-96 h-40 shadow-lg flex items-center justify-center"
          style={{ backgroundColor: colors.orange }}
        >
          <div className="grid grid-cols-2 gap-6 text-white w-full">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-3 h-3 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-base font-medium leading-tight">{t('hero.feature_1')}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-3 h-3 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-base font-medium leading-tight">{t('hero.feature_2')}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-3 h-3 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-base font-medium leading-tight">{t('hero.feature_3')}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-3 h-3 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-base font-medium leading-tight">{t('hero.feature_4')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
