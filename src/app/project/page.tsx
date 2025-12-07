'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import colorsJson from '../../../colors.json';
import { useI18n } from '../../context/LanguageProvider';

export default function ProjectPage() {
  const colors = colorsJson.colors;
  const { t } = useI18n();

  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, margin: '-100px' });

  const featuredRef = useRef(null);
  const featuredInView = useInView(featuredRef, { once: true, margin: '-100px' });

  const learnMoreRef = useRef(null);
  const learnMoreInView = useInView(learnMoreRef, { once: true, margin: '-100px' });

  return (
    <main style={{ backgroundColor: colors.black }} className="text-white min-h-screen">

      {/* Hero */}
      <motion.section
        ref={heroRef}
        initial={{ opacity: 0, y: 20 }}
        animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className="px-6 md:px-12 pt-16 pb-8 text-center"
      >
        <h1 className="text-[34px] md:text-5xl font-extrabold leading-tight">
          {t('project.title_prefix')} <span style={{ color: colors.orange }}>{t('project.title_suffix')}</span>
        </h1>
        <p className="mt-3 md:mt-4 text-[13px] md:text-base text-[#CFCFCF] max-w-xl md:max-w-2xl mx-auto leading-relaxed">
          {t('project.subtitle_line1')} {t('project.subtitle_line2')}
        </p>
      </motion.section>

      {/* Featured */}
      <motion.section
        ref={featuredRef}
        initial={{ opacity: 0, y: 20 }}
        animate={featuredInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className="px-6 md:px-12"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-[26px] md:text-[32px] font-bold mb-6">{t('project.featured_heading')}</h2>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            animate={featuredInView ? "visible" : "hidden"}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.2,
                },
              },
            }}
          >
            {[
              { id: 'a', title: t('project.card_a'), desc: t('project.card_desc') },
              { id: 'b', title: t('project.card_b'), desc: t('project.card_desc') },
              { id: 'c', title: t('project.card_c'), desc: t('project.card_desc') },
            ].map((p) => (
              <motion.article
                key={p.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6 },
                  },
                }}
              >
                <div className="h-[180px] md:h-[200px] rounded-[8px] bg-[#CBCBCB]" />
                <h3 className="mt-4 text-lg font-semibold" style={{ color: colors.orange }}>
                  {p.title}
                </h3>
                <p className="text-[12px] text-[#B7B7B7] mt-1">{p.desc}</p>
              </motion.article>
            ))}
          </motion.div>

          {/* Load more */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={featuredInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center mt-8 mb-20"
          >
            <button
              className="inline-flex items-center justify-center min-w-[128px] px-5 py-3 rounded-[10px] font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: colors.orange }}
            >
              {t('project.load_more')}
            </button>
          </motion.div>
        </div>
      </motion.section>

      {/* Learn more strip */}
      <motion.section
        ref={learnMoreRef}
        initial={{ opacity: 0, y: 20 }}
        animate={learnMoreInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className="px-6 md:px-12 pb-20"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-[32px] font-bold mb-4">{t('project.learn_more')}</h2>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <p className="text-md md:text-base text-[#D8D8D8] max-w-2xl">
              {t('project.learn_more_desc')}
            </p>
            <Link
              href="/contact"
              className="px-6 mb-4 py-3 rounded-[10px] font-semibold text-white whitespace-nowrap transition-opacity hover:opacity-90"
              style={{ backgroundColor: colors.orange }}
            >
              {t('project.get_in_touch')}
            </Link>
          </div>
        </div>
      </motion.section>
    </main>
  );
}
