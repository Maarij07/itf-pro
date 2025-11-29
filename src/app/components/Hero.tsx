"use client";
import React from 'react';
import colorsJson from '../../../colors.json';
import { useI18n } from '../../context/LanguageProvider';

export default function Hero() {
  const colors = colorsJson.colors;
  const { t } = useI18n();

  // Use the same background as the About page for visual consistency
  const bg = 'https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1800&q=80';

  return (
    <section
      className="relative h-[80vh] bg-cover bg-center flex items-center w-full px-6"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-black/60" />

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
          className="rounded-md p-8 w-96 h-40 shadow-lg"
          style={{ backgroundColor: colors.orange }}
        >
          <div className="grid grid-cols-2 gap-6 text-white h-full items-center">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 bg-white rounded-full flex-shrink-0"></div>
              <span className="text-base font-medium leading-tight">Fire Resistant Flocking</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 bg-white rounded-full flex-shrink-0"></div>
              <span className="text-base font-medium leading-tight">Intumescent Paint</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 bg-white rounded-full flex-shrink-0"></div>
              <span className="text-base font-medium leading-tight">Thermal Insulation</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 bg-white rounded-full flex-shrink-0"></div>
              <span className="text-base font-medium leading-tight">Duct Enclosure</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
