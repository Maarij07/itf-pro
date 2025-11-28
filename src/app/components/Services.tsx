"use client";
import React, { useState, useRef } from 'react';
import colorsJson from '../../../colors.json';
import { useI18n } from '../../context/LanguageProvider';

export default function Services() {
  const colors = colorsJson.colors;
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState('all_works');
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.2; // Increased from 0.5 to 1.2 for better responsiveness
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const tabs = [
    { key: 'all_works', label: t('services.all_works') },
    { key: 'construction', label: t('services.construction') },
    { key: 'architecture', label: t('services.architecture') },
    { key: 'building', label: t('services.building') },
    { key: 'renovations', label: t('services.renovations') },
    { key: 'interior', label: t('services.interior') },
  ];

  const serviceItems = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&q=80',
      title: t('services.fire_resistant_flocking'),
      category: 'construction'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80',
      title: t('services.thermal_insulation'),
      category: 'building'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=600&q=80',
      title: t('services.duct_enclosure'),
      category: 'interior'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80',
      title: 'Intumescent Paint',
      category: 'construction'
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80',
      title: 'Structural Insulation',
      category: 'architecture'
    }
  ];

  const filteredItems = activeTab === 'all_works' 
    ? serviceItems 
    : serviceItems.filter(item => item.category === activeTab);

  return (
    <section
      className="relative py-16 md:py-24 px-6"
      style={{ backgroundColor: colors.black }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          {/* Heading */}
          <h2 
            className="text-4xl md:text-5xl font-extrabold mb-6 md:mb-0"
            style={{ color: colors.orange }}
          >
            {t('services.heading')}
          </h2>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 md:gap-4">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className="px-4 py-2 text-sm font-medium rounded transition-colors"
                style={{
                  color: activeTab === tab.key ? colors.orange : '#9CA3AF'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4 mb-8 cursor-grab select-none scroll-smooth"
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
            cursor: isDragging ? 'grabbing' : 'grab'
          }}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          {filteredItems.map((item) => (
            <div key={item.id} className="relative group overflow-hidden rounded-lg flex-shrink-0" style={{ width: '20vw' }}>
              {/* Image */}
              <div className="relative h-[460px] md:h-[552px]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 pointer-events-none"
                />
                
                {/* Inner shadow overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Text overlay */}
                <div className="absolute bottom-6 left-0 right-0 px-6">
                  <h3 className="text-white text-lg md:text-xl font-semibold text-center">
                    {item.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Explore All Projects Button */}
        <div className="text-center md:text-right">
          <button
            className="inline-flex items-center gap-3 text-sm font-medium hover:opacity-80 transition-opacity"
            style={{ color: colors.orange }}
          >
            {t('services.explore_all')}
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ backgroundColor: colors.orange }}
            >
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}