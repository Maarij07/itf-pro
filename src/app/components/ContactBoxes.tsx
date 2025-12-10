"use client";
import React from 'react';
import ContactFormWithValidation from './ContactFormWithValidation';
import colorsJson from '../../../colors.json';
import { useI18n } from '../../context/LanguageProvider';

export default function ContactBoxes() {
  const colors = colorsJson.colors;
  const { t } = useI18n();

  return (
    <section
      className="relative py-12 md:py-16 px-6"
      style={{ backgroundColor: colors.black }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* Left Box - Request A Quote Form */}
          <div 
            className="lg:col-span-2 rounded-2xl p-8"
            style={{ 
              backgroundColor: '#2a2a2a',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
            }}
          >
            <h3 className="text-2xl font-bold text-white mb-3">
              {t('contact.request_title')}
            </h3>
            <p className="text-gray-400 text-sm mb-6">
              {t('contact.request_desc')}
            </p>

            <ContactFormWithValidation />
          </div>

          {/* Right Box - Contact Info */}
          <div 
            className="rounded-2xl p-8 flex flex-col justify-between"
            style={{ 
              backgroundColor: '#2a2a2a',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
            }}
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">
                {t('contact.info_heading_line1')} {t('contact.info_heading_line2')}
              </h3>

              {/* Our Location */}
              <div className="mb-6">
                <h4 className="text-white font-semibold mb-2">{t('contact.our_location')}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {t('footer.addressLine1')}<br />
                  {t('footer.addressCity')}<br />
                  {t('footer.addressZip')}
                </p>
              </div>

              {/* Quick Contact */}
              <div className="mb-6">
                <h4 className="text-white font-semibold mb-2">{t('contact.quick_contact')}</h4>
                <p className="text-gray-400 text-sm">
                  Email: {t('footer.email')}<br />
                  Contact Us: {t('footer.phone')}
                </p>
              </div>

              {/* Opening Hours */}
              <div className="mb-6">
                <h4 className="text-white font-semibold mb-2">{t('contact.opening_hours')}</h4>
                <p className="text-gray-400 text-sm">
                  {t('contact.opening_days')}<br />
                  {t('contact.opening_time')}
                </p>
              </div>

              {/* CTA */}
              <div className="mb-4">
                <p className="text-gray-300 text-sm font-medium">
                  {t('contact.cta_line')}
                </p>
              </div>
            </div>

            {/* Contact Us Button */}
            <a
              href="/contact"
              className="inline-block w-full text-center py-3 rounded-lg font-semibold text-white transition-colors hover:opacity-90"
              style={{ backgroundColor: colors.orange }}
            >
              {t('contact.contact_button')}
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
