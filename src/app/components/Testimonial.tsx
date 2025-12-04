"use client";
import React from 'react';
import colorsJson from '../../../colors.json';
import { useI18n } from '../../context/LanguageProvider';
import CountUp from './CountUp';

export default function Testimonial() {
  const colors = colorsJson.colors;
  const { t } = useI18n();

  const img = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80';

  return (
    <section
      className="relative py-16 md:py-24 px-6"
      style={{ backgroundColor: colors.black }}
    >
      {/* Statistics positioned to align with navbar */}
      <div className="absolute top-4 left-6 md:left-12 lg:left-[max(1.5rem,calc((100vw-80rem)/2))] z-10 hidden md:block">
        <div className="flex gap-12 text-white">
          <div className="flex items-center gap-3">
            <CountUp 
              end={15} 
              suffix="+" 
              duration={3500}
              className="text-4xl font-bold"
              style={{ color: colors.orange }}
            />
            <div className="text-sm font-medium text-white">{t('hero.stat_1_label')}</div>
          </div>
          <div className="flex items-center gap-3">
            <CountUp 
              end={499} 
              suffix="+" 
              duration={3500}
              className="text-4xl font-bold"
              style={{ color: colors.orange }}
            />
            <div className="text-sm font-medium text-white">{t('hero.stat_2_label')}</div>
          </div>
          <div className="flex items-center gap-3">
            <CountUp 
              end={199} 
              suffix="+" 
              duration={3500}
              className="text-4xl font-bold"
              style={{ color: colors.orange }}
            />
            <div className="text-sm font-medium text-white">{t('hero.stat_3_label')}</div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto pt-12 md:pt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-center">
          {/* Left: Image */}
          <div className="flex justify-start order-1 md:order-1">
            <img
              src={img}
              alt="Testimonial"
              className="rounded-lg w-full max-w-sm h-[26rem] md:h-[31rem] object-cover"
              loading="lazy"
            />
          </div>

          {/* Right: Content */}
          <div className="text-white order-2 md:order-2 md:col-span-2">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-8">
              <span style={{ color: colors.orange }}>{t('testimonial.years')}</span>
              <br />
              {t('testimonial.heading')}
            </h2>

            <p className="text-lg text-zinc-300 mb-6 leading-relaxed text-justify">
              {t('testimonial.para1')}
            </p>

            <p className="text-lg text-zinc-300 mb-10 leading-relaxed text-justify">
              {t('testimonial.para2')}
            </p>

            <div>
              <p className="text-2xl font-semibold italic" style={{ color: colors.orange }}>
                {t('testimonial.signature')}
              </p>
              <p className="text-base text-zinc-400 mt-3">{t('testimonial.title')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
