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
      className="relative py-16 md:py-24 px-6"
      style={{ backgroundColor: colors.black }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Timeline Container */}
        <div className="relative py-12">
          {/* Horizontal Line - centered */}
          <div
            className="absolute top-1/2 left-0 right-0 h-0.5 transform -translate-y-1/2"
            style={{ backgroundColor: 'white' }}
          />

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 relative">
            {steps.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center text-center relative">
                {/* Step Title - Above line */}
                <h3 className="text-sm font-medium text-white leading-tight mb-2 max-w-48 absolute -top-20">
                  {step.title}
                </h3>
                
                {/* Step Label - Below title, above line */}
                <p className="text-xs font-medium text-white absolute -top-8">
                  {step.label}
                </p>

                {/* Circle Indicator - Centered on line */}
                <div
                  className="w-4 h-4 rounded-full flex items-center justify-center relative z-10 border-2"
                  style={{ 
                    backgroundColor: 'white',
                    borderColor: 'white'
                  }}
                >
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: colors.orange }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
