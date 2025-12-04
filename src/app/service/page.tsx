/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import colorsJson from '../../../colors.json';
import { useI18n } from '../../context/LanguageProvider';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export default function ServicePage() {
  const colors = colorsJson.colors;
  const { t } = useI18n();

  const dotPositions = [0, 33.333, 66.666, 100];
  const serviceScrollerRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [step, setStep] = useState(0);

  // Fade-in state for sections
  const [visibleSections, setVisibleSections] = useState<{ [key: number]: boolean }>({});

  const cards = [
    {
      title: t('services.fire_resistant_flocking'),
      img: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: t('services.thermal_insulation'),
      img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: t('services.duct_enclosure'),
      img: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80',
    },
    // Additional cards
    {
      title: 'Special Fireproof Coating',
      img: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Advanced HVAC Protection',
      img: 'https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?auto=format&fit=crop&w=800&q=80',
    },
  ];

  const heroBg =
    'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1800&q=80';

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
        className={`relative h-[280px] sm:h-[340px] md:h-[400px] lg:h-[460px] w-full mb-6 overflow-hidden transition-all duration-[1200ms] ease-out opacity-0 ${
          visibleSections[1] ? 'opacity-100 translate-y-0' : 'translate-y-6'
        }`}
        style={{ backgroundImage: `url(${heroBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative max-w-7xl mx-auto h-full flex items-center px-4 sm:px-6 md:px-8 lg:px-12">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight">
              {t('service_page.hero_prefix1')}{' '}
              <span style={{ color: colors.orange }}>{t('service_page.hero_orange1')}</span>{' '}
              {t('service_page.hero_prefix2')}{' '}
              <span style={{ color: colors.orange }}>{t('service_page.hero_orange2')}</span>{' '}
              {t('service_page.hero_suffix')}
            </h1>
            <p className="mt-2 sm:mt-3 max-w-2xl text-xs sm:text-sm md:text-base text-zinc-200">
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
        className={`px-4 sm:px-6 md:px-8 lg:px-12 py-10 transition-all duration-[1200ms] ease-out opacity-0 ${
          visibleSections[2] ? 'opacity-100 translate-y-0' : 'translate-y-6'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-8">{t('services.heading')}</h2>

          <div className="relative flex items-center justify-center">
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
              className="flex justify-start items-center gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2"
              style={{ scrollbarWidth: 'none', scrollSnapType: 'x mandatory' }}
            >
              {cards.map((c, i) => (
                <article
                  key={i}
                  data-card
                  className="overflow-hidden rounded-lg sm:rounded-xl border border-white/15 shadow-[0_6px_20px_rgba(0,0,0,0.3)] snap-start shrink-0 transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_12px_28px_rgba(0,0,0,0.45)]"
                  style={{
                    backgroundColor: '#1A1A1A',
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
                    <p className="text-xs sm:text-sm text-white/80 mt-2">{t('service_page.card_desc')}</p>
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
        className={`px-4 sm:px-6 md:px-8 lg:px-12 pb-16 transition-all duration-[1200ms] ease-out opacity-0 ${
          visibleSections[3] ? 'opacity-100 translate-y-0' : 'translate-y-6'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-3xl font-bold mb-8 sm:mb-10 md:mb-12">
            {t('service_page.process_heading')}
          </h2>

          <div className="relative mx-auto max-w-4xl">
            <div className="flex justify-between items-center relative" style={{ height: 'clamp(40px, 10vw, 60px)' }}>
              <div
                className="absolute left-0 right-0"
                style={{
                  top: '50%',
                  transform: 'translateY(-50%)',
                  height: 'clamp(6px, 1.5vw, 10px)',
                  background: `linear-gradient(90deg, ${colors.orange}, #FF9E5E)`,
                  borderRadius: 9999,
                  zIndex: 1,
                }}
              />
              {dotPositions.map((pct, idx) => (
                <div
                  key={idx}
                  className="rounded-full shrink-0 relative"
                  style={{
                    width: 'clamp(28px, 6vw, 40px)',
                    height: 'clamp(28px, 6vw, 40px)',
                    background: '#FAA673',
                    border: '4px solid #FFFFFF',
                    boxShadow: '0 0 12px rgba(255,116,32,.45)',
                    zIndex: 10,
                  }}
                />
              ))}
            </div>

            <div className="flex justify-between items-start relative mt-4 sm:mt-5 md:mt-6">
              {dotPositions.map((pct, idx) => (
                <div key={idx} className="text-white font-semibold text-xs sm:text-sm md:text-base text-center flex-1" style={{ lineHeight: '1.3' }}>
                  <div className="font-bold">{idx + 1}.</div>
                  <div>{t(`service_page.process${idx + 1}` as any)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        data-index={4}
        className={`px-4 sm:px-6 md:px-8 lg:px-12 pb-20 transition-all duration-[1200ms] ease-out opacity-0 ${
          visibleSections[4] ? 'opacity-100 translate-y-0' : 'translate-y-6'
        }`}
      >
        <div className="max-w-7xl mx-auto">
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
