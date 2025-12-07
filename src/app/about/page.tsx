"use client";
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import colorsJson from '../../../colors.json';
import { useI18n } from '../../context/LanguageProvider';

export default function AboutPage() {
  const colors = colorsJson.colors;
  const { t } = useI18n();
  
  // Use local about background image
  const bg = '/images/about-bg.svg';

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  // Ref for About Values Section
  const valuesRef = useRef(null);
  const valuesInView = useInView(valuesRef, { once: true, margin: '-100px' });

  // Ref for Why Choose Us Section
  const whyChooseRef = useRef(null);
  const whyChooseInView = useInView(whyChooseRef, { once: true, margin: '-100px' });

  return (
    <main>
      {/* Hero */}
      <section
        aria-label="About hero"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '90vh'
        }}
        className="relative flex items-center px-6"
      >
        {/* Gradient overlay - dark on left, transparent on right (same as home page) */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/60 to-black/15" />

        <div className="relative max-w-7xl mx-auto w-full text-white py-20 lg:py-28">
          <motion.h1 
            className="font-extrabold leading-tight text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="block md:whitespace-nowrap">{t('about.hero_line1')} <span style={{ color: colors.orange }}>{t('about.hero_spaces_through')}</span> {t('about.hero_insulation')}</span>
            <span className="block md:whitespace-nowrap">{t('about.hero_and')} <span style={{ color: colors.orange }}>{t('about.hero_fire_protection')}</span> {t('about.hero_excellence')}</span>
          </motion.h1>

          <motion.p 
            className="mt-6 text-zinc-200 max-w-xl text-sm md:text-base"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {t('about.hero_description')}
          </motion.p>
        </div>
      </section>

      {/* About Us Values Section */}
      <section 
        className="py-16 px-6"
        style={{ backgroundColor: colors.black }}
        ref={valuesRef}
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-white mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
          >
            {t('nav.about')}
          </motion.h2>
          
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={valuesInView ? "visible" : "hidden"}
          >
            {/* Safety */}
            <motion.div className="text-left" variants={itemVariants}>
              <div className="flex items-center gap-3 mb-4">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke={colors.orange} strokeWidth="2">
                  <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <h3 className="text-xl font-semibold text-white">Safety</h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                We prioritize the safety of people and properties in every project
              </p>
            </motion.div>

            {/* Reliability */}
            <motion.div className="text-left" variants={itemVariants}>
              <div className="flex items-center gap-3 mb-4">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke={colors.orange} strokeWidth="1.5">
                  <circle cx="12" cy="9" r="5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 4v2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 14l-2 8 4-2 2 2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 14l2 8-4-2-2 2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <h3 className="text-xl font-semibold text-white">Reliability</h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                We deliver dependable solutions, that must client standard's
              </p>
            </motion.div>

            {/* Innovation */}
            <motion.div className="text-left" variants={itemVariants}>
              <div className="flex items-center gap-3 mb-4">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke={colors.orange} strokeWidth="2">
                  <path d="M9 18h6" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10 22h4" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <h3 className="text-xl font-semibold text-white">Innovation</h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                We utilize the latest technologies and materials for optimal results
              </p>
            </motion.div>

            {/* Sustainability */}
            <motion.div className="text-left" variants={itemVariants}>
              <div className="flex items-center gap-3 mb-4">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke={colors.orange} strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <h3 className="text-xl font-semibold text-white">Sustainability</h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                We are committed to sustainable practices and eco-friendly solutions
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section 
        className="py-16 px-6"
        style={{ backgroundColor: colors.black }}
        ref={whyChooseRef}
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-3xl font-bold mb-12" 
            style={{ color: colors.orange }}
            initial={{ opacity: 0, y: -20 }}
            animate={whyChooseInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
          >
            {t('about.why_choose_us')}
          </motion.h2>
          
          <div className="flex flex-col gap-6">
            {/* First Row */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate={whyChooseInView ? "visible" : "hidden"}
            >
              {/* Certified Experts - Small Card */}
              <motion.div className="bg-white rounded-lg p-4 md:p-6 min-h-[200px] md:h-48" variants={itemVariants}>
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
              </motion.div>

              {/* Guaranteed Compliance - Large Card */}
              <motion.div className="bg-white rounded-lg p-4 md:p-6 min-h-[200px] md:h-48 md:col-span-2" variants={itemVariants}>
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
              </motion.div>
            </motion.div>

            {/* Second Row */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate={whyChooseInView ? "visible" : "hidden"}
            >
              {/* Fast Delivery - Large Card */}
              <motion.div className="bg-white rounded-lg p-4 md:p-6 min-h-[200px] md:h-48 md:col-span-2" variants={itemVariants}>
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
              </motion.div>

              <motion.div className="bg-white rounded-lg p-4 md:p-6 min-h-[200px] md:h-48" variants={itemVariants}>
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
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
