'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import colorsJson from '../../../colors.json';
import { useI18n } from '../../context/LanguageProvider';

const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^\+?[\d\s\-()]{10,}$/, 'Phone must be at least 10 digits'),
  service: z.string().min(1, 'Please select a service'),
  details: z.string().min(1).optional().or(z.literal('')),
});

type ContactFormInputs = z.infer<typeof contactFormSchema>;

export default function ContactFormWithValidation() {
  const colors = colorsJson.colors;
  const { t } = useI18n();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const services = [
    t('hero.feature_1'),
    t('hero.feature_2'),
    t('hero.feature_3'),
    t('hero.feature_4'),
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
        setSubmitError(t('contact.form.submit_error') || 'Failed to submit form');
      }
    } catch {
      setSubmitError(t('contact.form.submit_error_generic') || 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Success Message */}
      {submitSuccess && (
        <div className="p-4 rounded-lg text-white font-semibold bg-green-500 flex items-center gap-2">
          <span>✓</span>
          <span>{t('contact.form.submit_success') || 'Form submitted successfully!'}</span>
        </div>
      )}

      {/* Error Message */}
      {submitError && (
        <div className="p-4 rounded-lg text-white font-semibold bg-red-500 flex items-center gap-2">
          <span>✕</span>
          <span>{submitError}</span>
        </div>
      )}

      {/* Row 1: Name & Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <input
            {...register('name')}
            type="text"
            placeholder={t('contact.form.name')}
            className={`w-full px-4 py-3 rounded-lg bg-[#3a3a3a] text-white placeholder-gray-500 outline-none border transition ${
              errors.name ? 'border-red-500' : 'border-gray-600 focus:border-orange-500'
            }`}
          />
          {errors.name && (
            <p className="text-red-500 text-xs md:text-sm mt-1.5 font-medium">
              {errors.name.message}
            </p>
          )}
        </div>
        <div>
          <input
            {...register('email')}
            type="email"
            placeholder={t('contact.form.email')}
            className={`w-full px-4 py-3 rounded-lg bg-[#3a3a3a] text-white placeholder-gray-500 outline-none border transition ${
              errors.email ? 'border-red-500' : 'border-gray-600 focus:border-orange-500'
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs md:text-sm mt-1.5 font-medium">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      {/* Row 2: Phone & Service */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <input
            {...register('phone')}
            type="tel"
            placeholder={t('contact.form.phone')}
            className={`w-full px-4 py-3 rounded-lg bg-[#3a3a3a] text-white placeholder-gray-500 outline-none border transition ${
              errors.phone ? 'border-red-500' : 'border-gray-600 focus:border-orange-500'
            }`}
          />
          {errors.phone && (
            <p className="text-red-500 text-xs md:text-sm mt-1.5 font-medium">
              {errors.phone.message}
            </p>
          )}
        </div>
        <div>
          <select
            {...register('service')}
            className={`w-full px-4 py-3 rounded-lg bg-[#3a3a3a] text-gray-500 outline-none appearance-none cursor-pointer border transition ${
              errors.service ? 'border-red-500' : 'border-gray-600 focus:border-orange-500'
            }`}
          >
            <option value="">{t('contact.form.select_service')}</option>
            {services.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
          {errors.service && (
            <p className="text-red-500 text-xs md:text-sm mt-1.5 font-medium">
              {errors.service.message}
            </p>
          )}
        </div>
      </div>

      {/* Row 3: Additional Details */}
      <div>
        <textarea
          {...register('details')}
          placeholder={t('contact.form.details')}
          rows={4}
          className={`w-full px-4 py-3 rounded-lg bg-[#3a3a3a] text-white placeholder-gray-500 outline-none resize-none border transition ${
            errors.details ? 'border-red-500' : 'border-gray-600 focus:border-orange-500'
          }`}
        />
        {errors.details && (
          <p className="text-red-500 text-xs md:text-sm mt-1.5 font-medium">
            {errors.details.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 rounded-lg font-semibold text-white transition-colors hover:opacity-90 disabled:opacity-50"
        style={{ backgroundColor: colors.orange }}
      >
        {isSubmitting ? t('contact.form.submitting') || 'Submitting...' : t('contact.form.submit')}
      </button>
    </form>
  );
}
