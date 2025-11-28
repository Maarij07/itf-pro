'use client';
import ContactForm from '../components/ContactForm';
import colorsJson from '../../../colors.json';
import { useI18n } from '../../context/LanguageProvider';

export default function ContactPage() {
  const colors = colorsJson.colors;
  const { t } = useI18n();
  const bg =
    'https://images.unsplash.com/photo-1531973533171-6f21d8793e05?q=80&w=1887&auto=format&fit=crop';

  return (
    <div style={{ backgroundColor: colors.black }} className="min-h-screen text-white">
      {/* Hero Section with Title */}
      <section className="px-6 md:px-12 py-16 md:py-24 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">
          {t('contact.title_prefix')} <span style={{ color: colors.orange }}>{t('contact.title_suffix')}</span>
        </h1>

        <p className="text-2xl md:text-3xl font-semibold mb-10 max-w-4xl mx-auto">
          {t('contact.subtitle')}
        </p>

        {/* Benefits Row */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 max-w-4xl mx-auto mb-12">
          {[
            t('contact.feature_staff'),
            t('contact.feature_satisfaction'),
            t('contact.feature_testing'),
            t('contact.feature_pricing'),
          ].map((label) => (
            <div key={label} className="flex items-center gap-2 text-sm md:text-base">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-white/90">
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-black" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Main Content Section - Form and Contact Info */}
      <section className="relative px-6 md:px-12 pb-20">
        {/* Blurred background image behind the cards */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10"
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
          {/* Left: Contact Form - 60% width */}
          <div
            className="rounded-3xl p-8 md:p-12 flex-1 shadow-[0_12px_30px_rgba(0,0,0,0.35)]"
            style={{ backgroundColor: colors.orange }}
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">{t('contact.request_title')}</h2>
            <p className="text-white/95 text-sm md:text-base mb-8 leading-relaxed">
              {t('contact.request_desc')}
            </p>
            <ContactForm />
          </div>

          {/* Right: Contact Information - 40% width */}
          <div
            className="rounded-3xl p-8 md:p-12 lg:w-2/5 flex flex-col justify-between shadow-[0_12px_30px_rgba(0,0,0,0.35)]"
            style={{ backgroundColor: colors.orange }}
          >
            <div>
              <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-8 leading-tight">
                {t('contact.info_heading_line1')}<br />
                {t('contact.info_heading_line2')}
              </h3>

              <div className="space-y-6">
                {/* Address */}
                <div>
                  <h4 className="font-bold text-white mb-2 text-base">{t('contact.our_location')}</h4>
                  <p className="text-white text-sm opacity-90 leading-relaxed">
                    10 Office Park Building 20th Floor Unit C.10<br />
                    TB Simatupang No 18, Jakarta Selatan, 12520
                  </p>
                </div>

                {/* Quick Contact */}
                <div>
                  <h4 className="font-bold text-white mb-2 text-base">{t('contact.quick_contact')}</h4>
                  <p className="text-white text-sm opacity-90 leading-relaxed">
                    Email: contact@itf-pro.fr<br />
                    Phone: (+33) 0 98-63-37-58
                  </p>
                </div>

                {/* Opening Hours */}
                <div>
                  <h4 className="font-bold text-white mb-2 text-base">{t('contact.opening_hours')}</h4>
                  <p className="text-white text-sm opacity-90 leading-relaxed">
                    {t('contact.opening_days')}<br />
                    {t('contact.opening_time')}
                  </p>
                </div>

                {/* CTA */}
                <div className="pt-4 border-t border-white/40">
                  <p className="text-white text-sm font-bold leading-relaxed">
                    {t('contact.cta_line')}
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Button */}
            <button
              className="w-full mt-8 py-3 px-4 rounded-lg font-bold text-white transition-all duration-200 hover:shadow-lg hover:opacity-90"
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
