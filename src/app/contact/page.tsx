'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import ContactForm from '../components/ContactForm';
import colorsJson from '../../../colors.json';
import { useI18n } from '../../context/LanguageProvider';

export default function ContactPage() {
  const colors = colorsJson.colors;
  const { t } = useI18n();
  const contactRef = useRef(null);
  const contactInView = useInView(contactRef, { once: true, margin: '-100px' });

  const bg =
    'https://images.unsplash.com/photo-1531973533171-6f21d8793e05?q=80&w=1887&auto=format&fit=crop';

  const features = [
    'contact.feature_staff',
    'contact.feature_satisfaction',
    'contact.feature_testing',
    'contact.feature_pricing',
  ];

  return (
    <div style={{ backgroundColor: colors.black }} className="min-h-screen text-white">

      {/* Hero Section */}
      <section className="px-6 md:px-12 py-16 md:py-24 text-center">

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight"
        >
          {t('contact.title_prefix')} <span style={{ color: colors.orange }}>{t('contact.title_suffix')}</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-2xl md:text-3xl font-semibold mb-10 max-w-4xl mx-auto"
        >
          {t('contact.subtitle')}
        </motion.p>

        {/* Features */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 max-w-4xl mx-auto mb-12">
          {features.map((key, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + (i * 0.1) }}
              className="flex items-center gap-2 text-sm md:text-base"
            >
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-white/90">
                ✓
              </span>
              <span>{t(key)}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Main Section */}
      <section ref={contactRef} className="relative px-6 md:px-12 pb-20">
        <div className="absolute inset-0 -z-10"
          style={{
            backgroundImage: `url(${bg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(3px) saturate(0.9)',
            opacity: 0.25,
          }}
        />
        <div className="absolute inset-0 -z-10 bg-black/70" />

        <div className="flex flex-col lg:flex-row gap-6 max-w-6xl mx-auto">

          {/* Left Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={contactInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="rounded-3xl p-8 md:p-12 flex-1"
            style={{ backgroundColor: 'rgba(30, 30, 30, 0.8)' }}
          >
            <motion.h2
              initial={{ opacity: 0 }}
              animate={contactInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl md:text-4xl font-extrabold text-white mb-4"
            >
              {t('contact.request_title')}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={contactInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-white/95 text-sm md:text-base mb-8"
            >
              {t('contact.request_desc')}
            </motion.p>

            <ContactForm />
          </motion.div>

          {/* Right Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={contactInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="rounded-3xl p-8 md:p-12 lg:w-2/5 flex flex-col justify-between"
            style={{ backgroundColor: 'rgba(30, 30, 30, 0.8)' }}
          >
            <div>
              <motion.h3
                initial={{ opacity: 0 }}
                animate={contactInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-3xl md:text-4xl font-extrabold text-white mb-8"
              >
                {t('contact.info_heading_line1')}
                {t('contact.info_heading_line2')}
              </motion.h3>

              {/* Content blocks */}
              {['location', 'quick', 'hours', 'cta'].map((k, i) => (
                <motion.div
                  key={k}
                  initial={{ opacity: 0 }}
                  animate={contactInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + (i * 0.1) }}
                  className="space-y-2 mb-6"
                >
                  {/* Labels based on translation key mapping */}
                  {k === 'location' && (
                    <>
                      <h4 className="font-bold text-white text-base">{t('contact.our_location')}</h4>
                      <p className="text-white opacity-90 text-sm leading-relaxed">
                        10 Office Park Building 20th Floor Unit C.10<br/>
                        TB Simatupang No 18, Jakarta Selatan, 12520
                      </p>
                    </>
                  )}

                  {k === 'quick' && (
                    <>
                      <h4 className="font-bold text-white text-base">{t('contact.quick_contact')}</h4>
                      <p className="text-white opacity-90 text-sm leading-relaxed">
                        Email: contact@itf-pro.fr<br />
                        Phone: (+33) 0 98-63-37-58
                      </p>
                    </>
                  )}

                  {k === 'hours' && (
                    <>
                      <h4 className="font-bold text-white text-base">{t('contact.opening_hours')}</h4>
                      <p className="text-white opacity-90 text-sm leading-relaxed">
                        {t('contact.opening_days')}<br />
                        {t('contact.opening_time')}
                      </p>
                    </>
                  )}

                  {k === 'cta' && (
                    <p className="font-bold text-white text-sm leading-relaxed">
                      {t('contact.cta_line')}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={contactInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="w-full mt-8 py-3 px-4 rounded-lg font-bold text-white"
              style={{ backgroundColor: colors.black }}
            >
              {t('contact.contact_button')}
            </motion.button>
          </motion.div>

        </div>
      </section>
    </div>
  );
}
