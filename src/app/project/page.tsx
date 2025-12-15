'use client';
import React, { useMemo, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import colorsJson from '../../../colors.json';
import { useI18n } from '../../context/LanguageProvider';

interface Project {
  id: string;
  title: string;
  desc: string;
  image: string;
}

interface ProjectCardProps {
  project: Project;
  colors: { [key: string]: string };
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, colors }) => {
  return (
    <article className="group">
      <div className="relative h-[180px] md:h-[200px] w-full rounded-[8px] overflow-hidden bg-[#2A2A2A] shadow-xl">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <h3 className="mt-4 text-lg font-semibold" style={{ color: colors.orange }}>
        {project.title}
      </h3>
      <p className="text-[12px] text-[#B7B7B7] mt-1">{project.desc}</p>
    </article>
  );
};


export default function ProjectPage() {
  const colors = colorsJson.colors;
  const { t } = useI18n();

  const [showMore, setShowMore] = useState(false);

  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, margin: '-100px' });

  const featuredRef = useRef(null);
  const featuredInView = useInView(featuredRef, { once: true, margin: '-100px' });

  const learnMoreRef = useRef(null);
  const learnMoreInView = useInView(learnMoreRef, { once: true, margin: '-100px' });

  const baseProjects: Project[] = useMemo(
    () => [
      {
        id: 'a',
        title: t('project.cards.gare_bourget.title'),
        desc: t('project.cards.gare_bourget.desc'),
        image: '/images/p1.jpg',
      },
      {
        id: 'b',
        title: t('project.cards.homebox_lomme.title'),
        desc: t('project.cards.homebox_lomme.desc'),
        image: '/images/p2.jpg',
      },
      {
        id: 'c',
        title: t('project.cards.prologis_havre.title'),
        desc: t('project.cards.prologis_havre.desc'),
        image: '/images/p3.jpg',
      },
    ],
    [t]
  );

  const moreProjects: Project[] = useMemo(
    () => [
      {
        id: 'more-1',
        title: t('project.cards.more_coming_soon.title'),
        desc: t('project.cards.more_coming_soon.desc'),
        image: '/images/project/coming-card.svg',
      },
      {
        id: 'more-2',
        title: t('project.cards.more_coming_soon.title'),
        desc: t('project.cards.more_coming_soon.desc'),
        image: '/images/project/coming-card.svg',
      },
      {
        id: 'more-3',
        title: t('project.cards.more_coming_soon.title'),
        desc: t('project.cards.more_coming_soon.desc'),
        image: '/images/project/coming-card.svg',
      },
    ],
    [t]
  );

  const projects = showMore ? [...baseProjects, ...moreProjects] : baseProjects;

  return (
    <main style={{ backgroundColor: colors.black }} className="text-white min-h-screen">

      {/* Hero: Increased Y-motion for subtle depth */}
      <motion.section
        ref={heroRef}
        initial={{ opacity: 0, y: 40 }}
        animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
        className="pt-16 pb-8"
      >
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-[34px] md:text-5xl font-extrabold leading-tight">
            {t('project.title_prefix')} <span style={{ color: colors.orange }}>{t('project.title_suffix')}</span>
          </h1>
          <p className="mt-3 md:mt-4 text-[13px] md:text-base text-[#CFCFCF] max-w-xl md:max-w-2xl mx-auto leading-relaxed">
            {t('project.subtitle_line1')} {t('project.subtitle_line2')}
          </p>
        </div>
      </motion.section>

      {/* Featured: Enhanced Staggered Grid */}
      <motion.section
        ref={featuredRef}
        initial={{ opacity: 0, y: 20 }}
        animate={featuredInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className="pb-20"
      >
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-[26px] md:text-[32px] font-bold mb-6">{t('project.featured_heading')}</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((p) => (
              <ProjectCard key={p.id} project={p} colors={colors} />
            ))}
          </div>

          {/* Load more */}
          {!showMore && (
            <div className="text-center mt-8">
              <button
                onClick={() => setShowMore(true)}
                className="inline-flex items-center justify-center min-w-[128px] px-5 py-3 rounded-[10px] font-semibold text-white transition-opacity hover:opacity-90 shadow-lg"
                style={{ backgroundColor: colors.orange }}
              >
                {t('project.load_more')}
              </button>
            </div>
          )}
        </div>
      </motion.section>

      {/* Learn more strip */}
      <motion.section
        ref={learnMoreRef}
        initial={{ opacity: 0, y: 20 }}
        animate={learnMoreInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className="pb-20"
      >
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-[32px] font-bold mb-4">{t('project.learn_more')}</h2>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <p className="text-md md:text-base text-[#D8D8D8] max-w-2xl">{t('project.learn_more_desc')}</p>
            <Link href="/contact">
              <button
                className="px-6 mb-4 py-3 rounded-[10px] font-semibold text-white whitespace-nowrap transition-opacity hover:opacity-90 shadow-lg"
                style={{ backgroundColor: colors.orange }}
              >
                {t('project.get_in_touch')}
              </button>
            </Link>
          </div>
        </div>
      </motion.section>
    </main>
  );
}