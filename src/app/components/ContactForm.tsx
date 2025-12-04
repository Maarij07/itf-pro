'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import colorsJson from '../../../colors.json';
import { useI18n } from '../../context/LanguageProvider';
import {useReveal} from '../hooks/useReveal';

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
  const { getAnimation } = useReveal();

  const services = [
    t('contact.form.opt_web'),
    t('contact.form.opt_mobile'),
    t('contact.form.opt_uiux'),
    t('contact.form.opt_consulting'),
    t('contact.form.opt_other'),
  ];

  const { register, handleSubmit, formState: { errors }, reset } =
    useForm<ContactFormInputs>({
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
    } catch {
      setSubmitError(t('contact.form.submit_error_generic'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const ids = ['success', 'error', 'name', 'email', 'phone', 'service', 'details', 'submit'];

  return (
    <div className="space-y-8">
      {/* Success */}
      {submitSuccess && (
        <div
          className={getAnimation('success', ids.indexOf('success'))}
          data-animate-id="success"
        >
          <div className="mb-6 p-4 rounded-lg text-white font-semibold bg-green-500 flex items-center gap-2">
            <span>✓</span>
            <span>{t('contact.form.submit_success')}</span>
          </div>
        </div>
      )}

      {/* Error */}
      {submitError && (
        <div
          className={getAnimation('error', ids.indexOf('error'))}
          data-animate-id="error"
        >
          <div className="mb-6 p-4 rounded-lg text-white font-semibold bg-red-500 flex items-center gap-2">
            <span>✕</span>
            <span>{submitError}</span>
          </div>
        </div>
      )}

      {/* Form Fields */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">

          {/* Name */}
          <div
            className={getAnimation('name', ids.indexOf('name'))}
            data-animate-id="name"
          >
            <input {...register('name')}
              type="text"
              placeholder={t('contact.form.name')}
              className={`w-full px-6 py-3 rounded-lg bg-white border-0 text-gray-900`}
            />
            {errors.name && <p className="text-white text-xs md:text-sm mt-1.5 font-medium">{t('contact.form.error_name')}</p>}
          </div>

          {/* Email */}
          <div
            className={getAnimation('email', ids.indexOf('email'))}
            data-animate-id="email"
          >
            <input {...register('email')}
              type="email"
              placeholder={t('contact.form.email')}
              className={`w-full px-6 py-3 rounded-lg bg-white border-0 text-gray-900`}
            />
            {errors.email && <p className="text-white text-xs md:text-sm mt-1.5 font-medium">{t('contact.form.error_email')}</p>}
          </div>
        </div>

        {/* Phone + Service */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">

          <div
            className={getAnimation('phone', ids.indexOf('phone'))}
            data-animate-id="phone"
          >
            <input {...register('phone')}
              type="tel"
              placeholder={t('contact.form.phone')}
              className={`w-full px-6 py-3 rounded-lg bg-white border-0 text-gray-900`}
            />
            {errors.phone && <p className="text-white text-xs md:text-sm mt-1.5 font-medium">{t('contact.form.error_phone')}</p>}
          </div>

          <div
            className={getAnimation('service', ids.indexOf('service'))}
            data-animate-id="service"
          >
            <select {...register('service')}
              className="w-full px-6 py-3 rounded-lg bg-white border-0 text-gray-700 cursor-pointer"
            >
              <option value="">{t('contact.form.select_service')}</option>
              {services.map((x) => (
                <option key={x} value={x}>{x}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Details */}
        <div
          className={getAnimation('details', ids.indexOf('details'))}
          data-animate-id="details"
        >
          <textarea {...register('details')}
            rows={4}
            placeholder={t('contact.form.details')}
            className="w-full px-6 py-3 rounded-lg bg-white border-0 text-gray-900"
          />
        </div>

        {/* Submit Button */}
        <div
          className={getAnimation('submit', ids.indexOf('submit'))}
          data-animate-id="submit"
        >
          <button type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-6 rounded-lg font-semibold text-white"
            style={{ backgroundColor: colors.black }}
          >
            {isSubmitting ? t('contact.form.submitting') : t('contact.form.submit')}
          </button>
        </div>
      </form>
    </div>
  );
}
