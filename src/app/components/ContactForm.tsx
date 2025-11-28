'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import colorsJson from '../../../colors.json';
import { useI18n } from '../../context/LanguageProvider';

const contactFormSchema = z.object({
  name: z.string().min(2, 'min'),
  email: z.string().email('email'),
  phone: z.string().min(10, 'min'),
  service: z.string().min(1, 'required'),
  details: z.string().min(10, 'min'),
});

type ContactFormInputs = z.infer<typeof contactFormSchema>;

export default function ContactForm() {
  const colors = colorsJson.colors;
  const { t } = useI18n();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const services = [
    t('contact.form.opt_web'),
    t('contact.form.opt_mobile'),
    t('contact.form.opt_uiux'),
    t('contact.form.opt_consulting'),
    t('contact.form.opt_other'),
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormInputs>({
    resolver: zodResolver(contactFormSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: ContactFormInputs) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitSuccess(true);
        reset();
        setTimeout(() => setSubmitSuccess(false), 5000);
      } else {
        setSubmitError(t('contact.form.submit_error'));
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitError(t('contact.form.submit_error_generic'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Success Message */}
      {submitSuccess && (
        <div className="mb-6 p-4 rounded-lg text-white font-semibold bg-green-500 flex items-center gap-2">
          <span>✓</span>
          <span>{t('contact.form.submit_success')}</span>
        </div>
      )}

      {/* Error Message */}
      {submitError && (
        <div className="mb-6 p-4 rounded-lg text-white font-semibold bg-red-500 flex items-center gap-2">
          <span>✕</span>
          <span>{submitError}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name and Email Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {/* Name Field */}
            <div className="flex flex-col">
              <input
                {...register('name')}
                type="text"
                placeholder={t('contact.form.name')}
                className={`w-full px-6 py-3 rounded-lg bg-white border-0 text-gray-900 placeholder-gray-500 transition-all ${
                  errors.name
                    ? 'ring-2 ring-red-500'
                    : 'focus:outline-none focus:ring-2 focus:ring-offset-2'
                }`}
                style={
                  !errors.name
                    ? ({
                        '--tw-ring-color': colors.orange,
                      } as React.CSSProperties)
                    : undefined
                }
              />
              {errors.name && (
                <p className="text-white text-xs md:text-sm mt-1.5 font-medium">{t('contact.form.error_name')}</p>
              )}
            </div>

            {/* Email Field */}
            <div className="flex flex-col">
              <input
                {...register('email')}
                type="email"
                placeholder={t('contact.form.email')}
                className={`w-full px-6 py-3 rounded-lg bg-white border-0 text-gray-900 placeholder-gray-500 transition-all ${
                  errors.email
                    ? 'ring-2 ring-red-500'
                    : 'focus:outline-none focus:ring-2 focus:ring-offset-2'
                }`}
                style={
                  !errors.email
                    ? ({
                        '--tw-ring-color': colors.orange,
                      } as React.CSSProperties)
                    : undefined
                }
              />
              {errors.email && (
                <p className="text-white text-xs md:text-sm mt-1.5 font-medium">{t('contact.form.error_email')}</p>
              )}
            </div>
          </div>

          {/* Phone and Service Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {/* Phone Field */}
            <div className="flex flex-col">
              <input
                {...register('phone')}
                type="tel"
                placeholder={t('contact.form.phone')}
                className={`w-full px-6 py-3 rounded-lg bg-white border-0 text-gray-900 placeholder-gray-500 transition-all ${
                  errors.phone
                    ? 'ring-2 ring-red-500'
                    : 'focus:outline-none focus:ring-2 focus:ring-offset-2'
                }`}
                style={
                  !errors.phone
                    ? ({
                        '--tw-ring-color': colors.orange,
                      } as React.CSSProperties)
                    : undefined
                }
              />
              {errors.phone && (
                <p className="text-white text-xs md:text-sm mt-1.5 font-medium">{t('contact.form.error_phone')}</p>
              )}
            </div>

            {/* Service Select */}
            <div className="flex flex-col">
              <div className="relative">
                <select
                  {...register('service')}
                  className={`w-full px-6 py-3 rounded-lg bg-white border-0 text-gray-700 placeholder-gray-500 appearance-none cursor-pointer pr-10 transition-all ${
                    errors.service
                      ? 'ring-2 ring-red-500'
                      : 'focus:outline-none focus:ring-2 focus:ring-offset-2'
                  }`}
                  style={
                    !errors.service
                      ? ({
                          '--tw-ring-color': colors.orange,
                        } as React.CSSProperties)
                      : undefined
                  }
                >
                  <option value="" className="text-gray-500">
                    {t('contact.form.select_service')}
                  </option>
                  {services.map(service => (
                    <option key={service} value={service} className="text-gray-900">
                      {service}
                    </option>
                  ))}
                </select>
                <svg
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
              {errors.service && (
                <p className="text-white text-xs md:text-sm mt-1.5 font-medium">{t('contact.form.error_service')}</p>
              )}
            </div>
          </div>

          {/* Additional Details Textarea */}
          <div className="flex flex-col">
            <textarea
              {...register('details')}
              placeholder={t('contact.form.details')}
              rows={4}
              className={`w-full px-6 py-3 rounded-lg bg-white border-0 text-gray-900 placeholder-gray-500 resize-none transition-all ${
                errors.details
                  ? 'ring-2 ring-red-500'
                  : 'focus:outline-none focus:ring-2 focus:ring-offset-2'
              }`}
              style={
                !errors.details
                  ? ({
                      '--tw-ring-color': colors.orange,
                    } as React.CSSProperties)
                  : undefined
              }
            />
            {errors.details && (
              <p className="text-white text-xs md:text-sm mt-1.5 font-medium">{t('contact.form.error_details')}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed hover:shadow-lg active:shadow-md"
            style={{
              backgroundColor: colors.black,
            }}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-r-transparent"></span>
                {t('contact.form.submitting')}
              </span>
            ) : (
              t('contact.form.submit')
            )}
          </button>
        </form>
    </>
  );
}
