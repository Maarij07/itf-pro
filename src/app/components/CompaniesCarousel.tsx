"use client";
import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import colorsJson from '../../../colors.json';

const customerLogos = [
  { src: '/images/companies/gf logo.png', alt: 'GF' },
  { src: '/images/companies/ProLogis-logo.svg', alt: 'Prologis' },
  { src: '/images/companies/levaparcLogo.avif', alt: 'Levaparc' },
  { src: '/images/companies/xBox Logo.svg', alt: 'Xbox' },
  { src: '/images/companies/xpoLogistics Logo.png', alt: 'XPO Logistics' },
];

const supplierLogos = [
  { src: '/images/suppliers/eurisol-logo.svg', alt: 'Eurisol' },
  { src: '/images/suppliers/geostaff-logo.webp', alt: 'Geostaff' },
  { src: '/images/suppliers/projiso logo.png', alt: 'Projiso' },
  { src: '/images/suppliers/promat-logo.svg', alt: 'Promat' },
];

export default function CompaniesCarousel() {
  const colors = colorsJson.colors;
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });

  // Duplicate the lists so they can scroll seamlessly
  const scrollingCustomerLogos = [...customerLogos, ...customerLogos];
  const scrollingSupplierLogos = [...supplierLogos, ...supplierLogos];

  return (
    <section
      ref={sectionRef}
      className="relative py-12 md:py-16 px-6"
      style={{ backgroundColor: colors.black }}
    >
      {/* Main heading for key customer */}
      <div className="max-w-4xl mx-auto mb-10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4"
          style={{ color: colors.orange }}
        >
          Our Trusted Customer
        </motion.h2>

        {/* Main customer logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex justify-center mb-4"
        >
          <div className="inline-flex items-center justify-center px-6 py-3 bg-white/5 rounded-lg shadow-md">
            <Image
              src="/images/Trusted-Customer/ovhcloud-logo.svg"
              alt="OVHcloud main customer"
              width={220}
              height={110}
              className="object-contain max-h-24 w-auto"
            />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-sm md:text-base text-gray-300 leading-relaxed"
        >
          Serving this customer requires a deep understanding of complex requirements and
          flawless project execution. Not every provider is able to meet the quality and
          reliability standards they expect from their partners.
        </motion.p>
      </div>

      {/* Row 1: Our Trusted Customers (left text, right scrolling logos) */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center gap-8 md:gap-12">
        {/* Left: Heading */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.6 }}
          className="md:w-1/3"
        >
          <h2
            className="text-2xl md:text-3xl font-extrabold mb-2"
            style={{ color: colors.orange }}
          >
            Our Trusted Customers
          </h2>
          <p className="text-sm md:text-base text-gray-300">
            Companies who trusted us with their projects over the years.
          </p>
        </motion.div>

        {/* Right: Horizontal scrolling logos */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="md:w-2/3 overflow-hidden"
        >
          <div className="relative w-full overflow-hidden">
            <div className="flex items-center gap-10 min-w-max animate-[logo-scroll_25s_linear_infinite] hover:[animation-play-state:paused]">
              {scrollingCustomerLogos.map((logo, index) => (
                <div
                  key={`${logo.alt}-${index}`}
                  className="flex-shrink-0 flex items-center justify-center h-16 md:h-20 opacity-70 hover:opacity-100 transition-opacity duration-200"
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={160}
                    height={80}
                    className="object-contain max-h-16 md:max-h-20 w-auto bg-white/5 rounded"
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Row 2: Our Suppliers (left scrolling logos, right text) */}
      <div className="max-w-7xl mx-auto mt-12 flex flex-col md:flex-row md:items-center gap-8 md:gap-12">
        {/* Left: Horizontal scrolling supplier logos */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="md:w-2/3 overflow-hidden order-2 md:order-1"
        >
          <div className="relative w-full overflow-hidden">
            <div className="flex items-center gap-10 min-w-max animate-[logo-scroll_25s_linear_infinite] hover:[animation-play-state:paused]">
              {scrollingSupplierLogos.map((logo, index) => (
                <div
                  key={`${logo.alt}-${index}`}
                  className="flex-shrink-0 flex items-center justify-center h-16 md:h-20 opacity-70 hover:opacity-100 transition-opacity duration-200"
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={160}
                    height={80}
                    className="object-contain max-h-16 md:max-h-20 w-auto bg-white/5 rounded"
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right: Heading */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="md:w-1/3 order-1 md:order-2"
        >
          <h2
            className="text-2xl md:text-3xl font-extrabold mb-2"
            style={{ color: colors.orange }}
          >
            Our Suppliers
          </h2>
          <p className="text-sm md:text-base text-gray-300">
            Leading suppliers we partner with to deliver high-quality solutions.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
