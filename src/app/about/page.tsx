"use client";
import React from 'react';
import colorsJson from '../../../colors.json';
import { useI18n } from '../../context/LanguageProvider';

export default function AboutPage() {
  const colors = colorsJson.colors;
  const { t } = useI18n();
  const bg = 'https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1800&q=80';

  return (
    <main>
      {/* Hero */}
      <section
        aria-label="About hero"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '80vh'
        }}
        className="relative flex items-center px-6"
      >
        {/* darker left overlay to improve contrast for left text */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(90deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.55) 35%, rgba(0,0,0,0.18) 100%)'
          }}
        />

        <div className="relative max-w-7xl mx-auto w-full text-white py-20 lg:py-28">
          <h1 className="font-extrabold leading-tight text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
            <span className="block md:whitespace-nowrap">{t('about.hero_line1')} <span style={{ color: colors.orange }}>{t('about.hero_spaces_through')}</span> {t('about.hero_insulation')}</span>
            <span className="block md:whitespace-nowrap">{t('about.hero_and')} <span style={{ color: colors.orange }}>{t('about.hero_fire_protection')}</span> {t('about.hero_excellence')}</span>
          </h1>

          <p className="mt-6 text-zinc-200 max-w-xl text-sm md:text-base">
            {t('about.hero_description')}
          </p>
        </div>
      </section>

      {/* Why Choose Us */}
      <section 
        className="py-16 px-6"
        style={{ backgroundColor: colors.black }}
      >
        <div className="max-w-7xl mx-auto">
          <h2 
            className="text-3xl font-bold mb-12" 
            style={{ color: colors.orange }}
          >
            {t('about.why_choose_us')}
          </h2>
          
          <div className="flex flex-col gap-6">
            {/* First Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Certified Experts - Small Card */}
              <div className="bg-white rounded-lg p-4 md:p-6 min-h-[200px] md:h-48">
                <div className="flex items-center mb-4">
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0"
                    style={{ backgroundColor: colors.orange }}
                  >
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{t('about.certified_experts_title')}</h3>
                </div>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                  {t('about.certified_experts_desc')}
                </p>
              </div>

              {/* Guaranteed Compliance - Large Card */}
              <div className="bg-white rounded-lg p-4 md:p-6 min-h-[200px] md:h-48 md:col-span-2">
                <div className="flex items-center mb-4">
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0"
                    style={{ backgroundColor: colors.orange }}
                  >
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{t('about.guaranteed_compliance_title')}</h3>
                </div>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                  {t('about.guaranteed_compliance_desc')}
                </p>
              </div>
            </div>

            {/* Second Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Fast Delivery - Large Card */}
              <div className="bg-white rounded-lg p-4 md:p-6 min-h-[200px] md:h-48 md:col-span-2">
                <div className="flex items-center mb-4">
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0"
                    style={{ backgroundColor: colors.orange }}
                  >
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{t('about.fast_delivery_title')}</h3>
                </div>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                  {t('about.fast_delivery_desc')}
                </p>
              </div>

              {/* Modern Materials - Small Card */}
              <div className="bg-white rounded-lg p-4 md:p-6 min-h-[200px] md:h-48">
                <div className="flex items-center mb-4">
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0"
                    style={{ backgroundColor: colors.orange }}
                  >
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{t('about.modern_materials_title')}</h3>
                </div>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                  {t('about.modern_materials_desc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
