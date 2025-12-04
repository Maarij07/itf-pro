'use client';
import Link from 'next/link';
import colorsJson from '../../../colors.json';
import { useI18n } from '../../context/LanguageProvider';
import { useReveal } from '../hooks/useReveal';

export default function ProjectPage() {
  const colors = colorsJson.colors;
  const { t } = useI18n();

  const hero = useReveal("delay-1");
  const featured = useReveal("delay-1");
  const loadMore = useReveal("delay-2");
  const learnMore = useReveal("delay-3");

  return (
    <main style={{ backgroundColor: colors.black }} className="text-white min-h-screen">

      {/* Hero */}
      <section ref={hero.ref} className={`px-6 md:px-12 pt-16 pb-8 text-center ${hero.className}`}>
        <h1 className="text-[34px] md:text-5xl font-extrabold leading-tight">
          {t('project.title_prefix')} <span style={{ color: colors.orange }}>{t('project.title_suffix')}</span>
        </h1>
        <p className="mt-3 md:mt-4 text-[13px] md:text-base text-[#CFCFCF] max-w-xl md:max-w-2xl mx-auto leading-relaxed">
          {t('project.subtitle_line1')} {t('project.subtitle_line2')}
        </p>
      </section>

      {/* Featured */}
      <section ref={featured.ref} className={`px-6 md:px-12 ${featured.className}`}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-[26px] md:text-[32px] font-bold mb-6">{t('project.featured_heading')}</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { id: 'a', title: t('project.card_a'), desc: t('project.card_desc') },
              { id: 'b', title: t('project.card_b'), desc: t('project.card_desc') },
              { id: 'c', title: t('project.card_c'), desc: t('project.card_desc') },
            ].map((p, i) => {
              const projectReveal = useReveal(`delay-${i + 2}`);
              return (
                <article
                  key={p.id}
                  ref={projectReveal.ref}
                  className={projectReveal.className}
                >
                  <div className="h-[180px] md:h-[200px] rounded-[8px] bg-[#CBCBCB]" />
                  <h3 className="mt-4 text-lg font-semibold" style={{ color: colors.orange }}>
                    {p.title}
                  </h3>
                  <p className="text-[12px] text-[#B7B7B7] mt-1">{p.desc}</p>
                </article>
              );
            })}
          </div>

          {/* Load more */}
          <div
            ref={loadMore.ref}
            className={`text-center mt-8 mb-20 ${loadMore.className}`}
          >
            <button
              className="inline-flex items-center justify-center min-w-[128px] px-5 py-3 rounded-[10px] font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: colors.orange }}
            >
              {t('project.load_more')}
            </button>
          </div>
        </div>
      </section>

      {/* Learn more strip */}
      <section
        ref={learnMore.ref}
        className={`px-6 md:px-12 pb-20 ${learnMore.className}`}
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
      </section>
    </main>
  );
}
