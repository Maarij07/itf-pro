/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import colorsJson from '../../../colors.json';
import { useI18n } from '../../context/LanguageProvider';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export default function ServicePage() {
  const colors = colorsJson.colors;
  const { t } = useI18n();

  const serviceScrollerRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [step, setStep] = useState(0);

  // Fade-in state for sections
  const [visibleSections, setVisibleSections] = useState<{ [key: number]: boolean }>({});

  const cards = [
    {
      title: t('services.fire_resistant_flocking'),
      desc: t('service_page.card_desc_fire_resistant_flocking'),
      img: './images/service/Flocage coupe-feu.jpeg',
    },
    {
      title: t('services.thermal_insulation'),
      desc: t('service_page.card_desc_thermal_insulation'),
      img: './images/service/Flocage thermique.jpeg',
    },
    {
      title: t('services.duct_enclosure'),
      desc: t('service_page.card_desc_duct_enclosure'),
      img: './images/service/Conduit et encoffrement coupe-feu.jpeg',
    },
    {
      title: t('services.special_fireproof_coating'),
      desc: t('service_page.card_desc_special_fireproof_coating'),
      img: './images/service/fireproof-service.svg',
    },
    {
      title: t('services.advanced_hvac_protection'),
      desc: t('service_page.card_desc_advanced_hvac_protection'),
      img: './images/service/hvac-service.svg',
    },
  ];

  const heroBg = './images/service/bg.svg';

  useEffect(() => {
    const el = serviceScrollerRef.current;
    if (!el) return;

    // Calculate step based on 1 card width + gap
    const first = el.querySelector('[data-card]') as HTMLElement | null;
    if (first) {
      const style = window.getComputedStyle(first);
      const marginRight = parseFloat(style.marginRight || '0');
      setStep(first.offsetWidth + marginRight);
    }

    const updateScroll = () => {
      if (!el) return;
      const { scrollLeft, scrollWidth, clientWidth } = el;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
    };
    updateScroll();
    el.addEventListener('scroll', updateScroll, { passive: true } as any);

    const RO = (window as any).ResizeObserver;
    const ro = RO ? new RO(updateScroll) : null;
    if (ro && el) ro.observe(el);

    return () => {
      el.removeEventListener('scroll', updateScroll);
      if (ro) ro.disconnect();
    };
  }, []);

  const scrollServices = (dir: number) => {
    const el = serviceScrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  // Intersection Observer for fade-in sections
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = Number(entry.target.getAttribute('data-index'));
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({ ...prev, [idx]: true }));
          }
        });
      },
      { threshold: 0.2 }
    );

    document.querySelectorAll('[data-index]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main style={{ backgroundColor: colors.black }} className="text-white min-h-screen">

      {/* Hero */}
      <section
        data-index={1}
        className={`relative h-[85vh] bg-cover bg-center flex items-center w-full overflow-hidden transition-all duration-[1200ms] ease-out opacity-0 ${
          visibleSections[1] ? 'opacity-100 translate-y-0' : 'translate-y-6'
        }`}
        style={{ backgroundImage: `url(${heroBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/5 via-black/20 to-black/15"></div>
        <div className="relative max-w-7xl mx-auto w-full h-full flex items-center px-6 text-white py-12">
          <div>
            <h1 className="mb-6 mt-10 font-extrabold leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-5xl">
              {t('service_page.hero_prefix1')}{' '}
              <span style={{ color: colors.orange }}>{t('service_page.hero_orange1')}</span>{' '}
              {t('service_page.hero_prefix2')}{' '}
              <br/>
              <span style={{ color: colors.orange }}>{t('service_page.hero_orange2')}</span>{' '}
              {t('service_page.hero_suffix')}
            </h1>
            <p className=" mb-30 max-w-xl text-base text-zinc-200">
              {t('service_page.hero_sub1')}
              <br />
              {t('service_page.hero_sub2')}
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section
        data-index={2}
        className={`py-10 transition-all duration-[1200ms] ease-out opacity-0 ${
          visibleSections[2] ? 'opacity-100 translate-y-0' : 'translate-y-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-8">{t('services.heading')}</h2>

          <div className="relative flex items-center w-full">
            {/* Scroll Buttons */}
            <button
              onClick={() => scrollServices(-1)}
              aria-label="Prev"
              className="absolute left-0 top-1/2 -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center bg-white/10 text-white hover:bg-white/20 disabled:opacity-40 z-10 transition-all"
              disabled={!canScrollLeft}
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={() => scrollServices(1)}
              aria-label="Next"
              className="absolute right-0 top-1/2 -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center bg-white/10 text-white hover:bg-white/20 disabled:opacity-40 z-10 transition-all"
              disabled={!canScrollRight}
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l6 6-6 6" />
              </svg>
            </button>

            {/* Cards */}
            <div
              ref={serviceScrollerRef}
              className="flex w-full justify-start items-center gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2"
              style={{ scrollbarWidth: 'none', scrollSnapType: 'x mandatory' }}
            >
              {cards.map((c, i) => (
                <article
                  key={i}
                  data-card
                  className="overflow-hidden rounded-lg sm:rounded-xl border border-white/15 shadow-[0_6px_20px_rgba(0,0,0,0.3)] snap-start shrink-0 transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_12px_28px_rgba(0,0,0,0.45)]"
                  style={{
                    backgroundColor: ' #1A1A1A',
                    width: 'calc((100% - 2rem)/3)',
                    flex: '0 0 auto',
                  }}
                >
                  <div className="overflow-hidden" style={{ height: 'clamp(100px, 25vw, 160px)' }}>
                    <img src={c.img} alt={c.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="px-4 sm:px-5 py-4 sm:py-5">
                    <h3 className="leading-snug font-bold text-sm sm:text-base md:text-lg" style={{ color: colors.orange }}>
                      {c.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/80 mt-2">{c.desc}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

     {/* Timeline */}
      <section
        data-index={3}
        className={`pb-16 transition-all duration-[1200ms] ease-out opacity-0 ${
          visibleSections[3] ? 'opacity-100 translate-y-0' : 'translate-y-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl sm:text-3xl font-bold mb-12 sm:mb-16">
            {t('service_page.process_heading')}
          </h2>

          <div className="relative mx-auto max-w-5xl">
            {/* Desktop: horizontal line */}
            <div
              className="hidden md:block absolute left-0 w-full rounded-full"
              style={{
                top: '20px',
                height: '8px',
                background: `linear-gradient(90deg, ${colors.orange}, #FF9E5E)`,
                boxShadow: `0 0 15px 2px ${colors.orange}80`,
                zIndex: 0,
              }}
            />

            {/* Mobile: vertical line */}
            <div
              className="md:hidden absolute rounded-full"
              style={{
                left: '20px',
                top: '20px',
                bottom: '20px',
                width: '8px',
                background: `linear-gradient(180deg, ${colors.orange}, #FF9E5E)`,
                boxShadow: `0 0 15px 2px ${colors.orange}80`,
                zIndex: 0,
              }}
            />

            {/* Steps */}
            <div className="relative z-10 flex flex-col md:flex-row md:justify-between md:items-start w-full gap-8 md:gap-0">
              {[1, 2, 3, 4].map((num, index) => (
                <div
                  key={num}
                  className={`flex items-start gap-4 md:gap-0 md:flex-col ${
                    index === 0 ? 'md:items-start' : index === 3 ? 'md:items-end' : 'md:items-center'
                  }`}
                >
                  {/* Dot */}
                  <div
                    className="rounded-full box-border relative shrink-0"
                    style={{
                      width: 'clamp(40px, 5vw, 48px)',
                      height: 'clamp(40px, 5vw, 48px)',
                      backgroundColor: '#faa673',
                      border: '4px solid #FFFFFF',
                      boxShadow: '0 0 10px rgba(0,0,0,0.5)',
                    }}
                  />

                  {/* Text */}
                  <div className="md:mt-6 text-left md:text-center">
                    <span className="block text-base sm:text-lg md:text-2xl font-bold text-white whitespace-normal md:whitespace-nowrap">
                      {num}. {t(`service_page.process${num}` as any)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        data-index={4}
        className={`pb-20 transition-all duration-[1200ms] ease-out opacity-0 ${
          visibleSections[4] ? 'opacity-100 translate-y-0' : 'translate-y-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold">{t('service_page.cta_line1')}</h3>
              <p className="text-2xl sm:text-3xl font-extrabold mt-1">{t('service_page.cta_line2')}</p>
            </div>
            <Link
              href="/contact"
              className="px-5 py-3 rounded-lg font-semibold text-white whitespace-nowrap transition-all hover:shadow-lg"
              style={{ backgroundColor: colors.orange }}
            >
              {t('service_page.request_quote')}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
