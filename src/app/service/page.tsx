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
  // visual constants for process bar
  const barTop = 38; // move line slightly down
  const barHeight = 10; // thicker core line
  const dotSize = 30; // slightly bigger dots
  const insetPercent = 2; // line left/right inset percent
  const barShiftPx = 18; // shift entire bar and dots to the left
  const cardWidth = 320; // fixed card width for consistent slide
  const cardImgHeight = 160; // shorter image as per mock

  // horizontal scroller state
  const serviceScrollerRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [step, setStep] = useState(320);

  useEffect(() => {
    const el = serviceScrollerRef.current;
    if (!el) return;
    const first = el.querySelector('[data-card]') as HTMLElement | null;
    const second = (first?.nextElementSibling as HTMLElement) || null;
    if (first && second) setStep(second.offsetLeft - first.offsetLeft);
    else if (first) setStep(first.clientWidth);

    const update = () => {
      if (!el) return;
      const { scrollLeft, scrollWidth, clientWidth } = el;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
    };
    update();
    el.addEventListener('scroll', update, { passive: true } as any);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const RO = (window as any).ResizeObserver;
    const ro = RO ? new RO(update) : null;
    if (ro && el) ro.observe(el);
    return () => {
      el.removeEventListener('scroll', update);
      if (ro) ro.disconnect();
    };
  }, []);

  const scrollServices = (dir: number) => {
    const el = serviceScrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

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
  ];

  const process = [
    t('process.step1_title'),
    t('process.step2_title'),
    t('process.step3_title'),
    t('process.step4_title'),
  ];

  const heroBg =
    'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1800&q=80';

  return (
    <main style={{ backgroundColor: colors.black }} className="text-white min-h-screen">
      {/* Hero */}
      <section
        className="relative h-[340px] md:h-[420px] lg:h-[460px] w-full mb-6"
        style={{ backgroundImage: `url(${heroBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative max-w-7xl mx-auto h-full flex items-center px-6">
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight">
              {t('service_page.hero_prefix1')} {''}
              <span style={{ color: colors.orange }}>{t('service_page.hero_orange1')}</span> {t('service_page.hero_prefix2')}{' '}
              <span style={{ color: colors.orange }}>{t('service_page.hero_orange2')}</span> {t('service_page.hero_suffix')}
            </h1>
            <p className="mt-3 max-w-2xl text-sm md:text-base text-zinc-200">
              {t('service_page.hero_sub1')}
              <br />
              {t('service_page.hero_sub2')}
            </p>
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section className="px-6 mt-6 mb-6 md:px-12 py-10 md:py-14">
        <div className="max-w-7xl mx-auto relative">
          <h2 className="text-2xl md:text-3xl font-bold mb-10">{t('services.heading')}</h2>

          {/* Interactive chevrons */}
          <div className="relative">
            <button
              onClick={() => scrollServices(-1)}
              aria-label="Prev"
              className="hidden md:flex absolute -left-6 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full items-center justify-center bg-white/10 text-white hover:bg-white/20 disabled:opacity-40 z-10"
              disabled={!canScrollLeft}
            >
              <svg className="w-20 h-20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6"/></svg>
            </button>

            <button
              onClick={() => scrollServices(1)}
              aria-label="Next"
              className="hidden md:flex absolute -right-6 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full items-center justify-center bg-white/10 text-white hover:bg-white/20 disabled:opacity-40 z-10"
              disabled={!canScrollRight}
            >
              <svg className="w-20 h-20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l6 6-6 6"/></svg>
            </button>

            <div
              ref={serviceScrollerRef}
              className="flex justify-center items-center gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2"
              style={{ scrollbarWidth: 'none' } as React.CSSProperties}
            >
              {cards.map((c, i) => (
                <article
                  key={i}
                  data-card
                  className="overflow-hidden rounded-xl border border-white/15 shadow-[0_6px_20px_rgba(0,0,0,0.3)] snap-start"
                  style={{ backgroundColor: '#1A1A1A', width: cardWidth }}
                >
                  {/* Image */}
                  <div className="overflow-hidden" style={{ height: cardImgHeight }}>
                    <img src={c.img} alt={c.title} className="w-full h-full object-cover" />
                  </div>
                  {/* Text panel below */}
                  <div className="px-5 py-5">
                    <h3 className="leading-snug font-bold text-[19px] md:text-[20px]" style={{ color: colors.orange }}>{c.title}</h3>
                    <p className="text-[13px] text-white/80 mt-2.5">{t('service_page.card_desc')}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="px-6 md:px-12 pb-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xxl md:text-3xl font-bold mb-6">{t('service_page.process_heading')}</h2>

          {/* Progress line with dots */}
          <div className="relative mx-auto max-w-3xl px-4" style={{ height: 110 }}>
            {/* Bar container (relative) so percentages are within the shortened width) */}
            <div
              className="absolute"
              style={{ left: `calc(${insetPercent}% - ${barShiftPx}px)`, right: `calc(${insetPercent}% + ${barShiftPx}px)`, top: barTop, height: barHeight, borderRadius: 9999 }}
            >
              {/* Glow underlay */}
              <div
                className="absolute  left-0 right-0 rounded-full"
                style={{ background: `linear-gradient(90deg, ${colors.orange}, #FF9E5E)`, filter: 'blur(3px)' }}
              />
              {/* Core line */}
              <div className="absolute inset-0 rounded-full" style={{ background: `linear-gradient(90deg, ${colors.orange}, #FF9E5E)` }} />

              {/* Dots + labels */}
              {dotPositions.map((pct, idx) => (
                <div key={idx} className="absolute" style={{ left: `${pct}%`, top: '50%', transform: 'translate(-50%, -50%)' }}>
                  <div
                    className="rounded-full"
                    style={{ width: dotSize, height: dotSize, background: '#FAA673', border: '2px solid #FFFFFF', boxShadow: '0 0 12px rgba(255,116,32,.45)' }}
                  />
                  <div
                    className="text-white text-lg font-semibold pt-4"
                    style={{ position: 'absolute', top: dotSize / 2 + 14, left: '50%', transform: 'translateX(calc(-50% - 12px))', width: 192, fontSize: 16, textAlign: 'center' }}
                  >
                    {idx + 1}. {t(`service_page.process${idx + 1}` as any)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-12 mt-4 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h3 className="text-xl md:text-3xl font-extrabold">{t('service_page.cta_line1')}</h3>
              <p className="text-xl md:text-3xl font-extrabold mt-1">{t('service_page.cta_line2')}</p>
            </div>
            <Link href="/contact" className="px-5 py-3 rounded-[10px] font-semibold text-white" style={{ backgroundColor: colors.orange }}>
              {t('service_page.request_quote')}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
