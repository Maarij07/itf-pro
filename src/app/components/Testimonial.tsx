"use client";
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import colorsJson from '../../../colors.json';
import { useI18n } from '../../context/LanguageProvider';
import CountUp from './CountUp';

export default function Testimonial() {
  const colors = colorsJson.colors;
  const { t } = useI18n();

  const img = '/images/home-exp.png';

  const testimonialRef = useRef(null);
  const testimonialInView = useInView(testimonialRef, { once: true, margin: '-100px' });

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
          <motion.div
            ref={testimonialRef}
            initial={{ opacity: 0, x: -50 }}
            animate={testimonialInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="flex justify-start order-1 md:order-1"
          >
            <img
              src={img}
              alt="Testimonial"
              className="rounded-lg w-full max-w-sm h-[26rem] md:h-[31rem] object-cover"
              loading="lazy"
            />
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={testimonialInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white order-2 md:order-2 md:col-span-2"
          >
            <motion.h2
              initial={{ opacity: 0 }}
              animate={testimonialInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-8"
            >
              <span style={{ color: colors.orange }}>{t('testimonial.years')}</span>
              <br />
              {t('testimonial.heading')}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={testimonialInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg text-zinc-300 mb-6 leading-relaxed text-justify"
            >
              {t('testimonial.para1')}
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={testimonialInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-lg text-zinc-300 mb-10 leading-relaxed text-justify"
            >
              {t('testimonial.para2')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={testimonialInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <p className="text-2xl font-semibold italic" style={{ color: colors.orange }}>
                {t('testimonial.signature')}
              </p>
              <p className="text-base text-zinc-400 mt-3">{t('testimonial.title')}</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
