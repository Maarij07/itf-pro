"use client";
import React from 'react';
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
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

            <form className="space-y-4">
              {/* Row 1: Name & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder={t('contact.form.name')}
                  className="w-full px-4 py-3 rounded-lg bg-[#3a3a3a] text-white placeholder-gray-500 outline-none border border-gray-600 focus:border-orange-500 transition"
                />
                <input
                  type="email"
                  placeholder={t('contact.form.email')}
                  className="w-full px-4 py-3 rounded-lg bg-[#3a3a3a] text-white placeholder-gray-500 outline-none border border-gray-600 focus:border-orange-500 transition"
                />
              </div>

              {/* Row 2: Phone & Service */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="tel"
                  placeholder={t('contact.form.phone')}
                  className="w-full px-4 py-3 rounded-lg bg-[#3a3a3a] text-white placeholder-gray-500 outline-none border border-gray-600 focus:border-orange-500 transition"
                />
                <select
                  className="w-full px-4 py-3 rounded-lg bg-[#3a3a3a] text-gray-500 outline-none appearance-none cursor-pointer border border-gray-600 focus:border-orange-500 transition"
                  defaultValue=""
                >
                  <option value="" disabled>{t('contact.form.select_service')}</option>
                  <option value="fire_resistant">{t('hero.feature_1')}</option>
                  <option value="intumescent">{t('hero.feature_2')}</option>
                  <option value="thermal">{t('hero.feature_3')}</option>
                  <option value="duct">{t('hero.feature_4')}</option>
                </select>
              </div>

              {/* Row 3: Additional Details */}
              <textarea
                placeholder={t('contact.form.details')}
                rows={4}
                className="w-full px-4 py-3 rounded-lg bg-[#3a3a3a] text-white placeholder-gray-500 outline-none resize-none border border-gray-600 focus:border-orange-500 transition"
              />

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 rounded-lg font-semibold text-white transition-colors hover:opacity-90"
                style={{ backgroundColor: colors.orange }}
              >
                {t('contact.form.submit')}
              </button>
            </form>
          </div>

          {/* Right Box - Contact Info */}
          <div 
            className="rounded-2xl p-8"
            style={{ 
              backgroundColor: '#2a2a2a',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
            }}
          >
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
