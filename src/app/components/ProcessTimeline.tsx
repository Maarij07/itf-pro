"use client";
import React from 'react';
import colorsJson from '../../../colors.json';
import { useI18n } from '../../context/LanguageProvider';

export default function ProcessTimeline() {
  const colors = colorsJson.colors;
  const { t } = useI18n();

  const steps = [
    { label: t('process.step1_label'), title: t('process.step1_title') },
    { label: t('process.step2_label'), title: t('process.step2_title') },
    { label: t('process.step3_label'), title: t('process.step3_title') },
    { label: t('process.step4_label'), title: t('process.step4_title') },
  ];

  return (
    <section
      className="relative py-12 md:py-16 px-6"
      style={{ backgroundColor: colors.black }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Timeline Container */}
        <div className="relative py-12">
          {/* Horizontal Line - centered on desktop, hidden on mobile */}
          <div
            className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 transform -translate-y-1/2"
            style={{ backgroundColor: 'white' }}
          />
          
          {/* Vertical Line - visible on mobile only, centered */}
          <div
            className="md:hidden absolute left-1/2 top-0 bottom-0 w-0.5 transform -translate-x-1/2"
            style={{ backgroundColor: 'white' }}
          />

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 relative">
            {steps.map((step, idx) => (
              <div key={idx} className="flex md:flex-col items-start md:items-center text-left md:text-center relative">
                {/* Mobile Layout */}
                <div className="md:hidden w-full relative">
                  {/* Circle Indicator - Always centered */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 z-10" style={{ top: '0.5rem' }}>
                    {/* Background circle ring */}
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                    >
                      {/* Inner circle */}
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: 'white' }}
                      />
                    </div>
                  </div>
                  
                  {/* Content - Alternating left/right */}
                  <div className={`w-5/12 ${idx % 2 === 0 ? 'mr-auto pr-4' : 'ml-auto pl-4'}`}>
                    <div className="bg-white rounded-lg p-4 shadow-md">
                      <p className="text-xs font-medium mb-1" style={{ color: colors.orange }}>
                        {step.label}
                      </p>
                      <h3 className="text-sm font-medium text-gray-800 leading-tight">
                        {step.title}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden md:flex md:flex-col md:items-center md:text-center">
                  {/* Step Title - Above line */}
                  <h3 className="text-base font-medium text-white leading-tight mb-2 max-w-48 absolute -top-20 text-center">
                    {step.title}
                  </h3>
                  
                  {/* Step Label - Below title, above line */}
                  <p className="text-xs font-medium text-white absolute -top-8 text-center">
                    {step.label}
                  </p>

                  {/* Circle Indicator - Centered on line */}
                  <div className="relative z-10">
                    {/* Background circle ring */}
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                    >
                      {/* Inner circle */}
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: 'white' }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
