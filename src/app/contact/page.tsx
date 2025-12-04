'use client';

import ContactForm from '../components/ContactForm';
import colorsJson from '../../../colors.json';
import { useI18n } from '../../context/LanguageProvider';
import {useReveal} from '../hooks/useReveal';

export default function ContactPage() {
  const colors = colorsJson.colors;
  const { t } = useI18n();
  const { getAnimation } = useReveal();

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
        <h1
          data-animate-id="hero-title"
          className={`${getAnimation('hero-title')} text-5xl md:text-6xl font-extrabold mb-6 tracking-tight`}
        >
          {t('contact.title_prefix')} <span style={{ color: colors.orange }}>{t('contact.title_suffix')}</span>
        </h1>

        {/* Subtitle */}
        <p
          data-animate-id="hero-sub"
          className={`${getAnimation('hero-sub')} text-2xl md:text-3xl font-semibold mb-10 max-w-4xl mx-auto`}
        >
          {t('contact.subtitle')}
        </p>

        {/* Features */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 max-w-4xl mx-auto mb-12">
          {features.map((key, i) => (
            <div
              key={key}
              data-animate-id={`hero-feature-${i}`}
              className={`${getAnimation(`hero-feature-${i}`, i)} flex items-center gap-2 text-sm md:text-base`}
            >
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-white/90">
                ✓
              </span>
              <span>{t(key)}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Main Section */}
      <section className="relative px-6 md:px-12 pb-20">
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
          <div
            data-animate-id="form-card"
            className={`${getAnimation('form-card')} rounded-3xl p-8 md:p-12 flex-1`}
            style={{ backgroundColor: colors.orange }}
          >
            <h2
              data-animate-id="form-head"
              className={`${getAnimation('form-head', 1)} text-3xl md:text-4xl font-extrabold text-white mb-4`}
            >
              {t('contact.request_title')}
            </h2>

            <p
              data-animate-id="form-desc"
              className={`${getAnimation('form-desc', 2)} text-white/95 text-sm md:text-base mb-8`}
            >
              {t('contact.request_desc')}
            </p>

            <ContactForm />
          </div>

          {/* Right Card */}
          <div
            data-animate-id="info-card"
            className={`${getAnimation('info-card')} rounded-3xl p-8 md:p-12 lg:w-2/5 flex flex-col justify-between`}
            style={{ backgroundColor: colors.orange }}
          >
            <div>
              <h3
                data-animate-id="info-head"
                className={`${getAnimation('info-head')} text-3xl md:text-4xl font-extrabold text-white mb-8`}
              >
                {t('contact.info_heading_line1')}
                {t('contact.info_heading_line2')}
              </h3>

              {/* Content blocks */}
              {['location', 'quick', 'hours', 'cta'].map((k, i) => (
                <div
                  key={k}
                  data-animate-id={`info-block-${i}`}
                  className={`${getAnimation(`info-block-${i}`, i)} space-y-2 mb-6`}
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
                </div>
              ))}
            </div>

            <button
              data-animate-id="info-button"
              className={`${getAnimation('info-button')} w-full mt-8 py-3 px-4 rounded-lg font-bold text-white`}
              style={{ backgroundColor: colors.black }}
            >
              {t('contact.contact_button')}
            </button>
          </div>

        </div>
      </section>
    </div>
  );
}
