'use client';
import { useRef } from 'react';
import { 
  motion, 
  useInView, 
  useMotionValue, 
  useSpring, 
  useTransform // New: For 3D tilt calculations
} from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image'; 
import colorsJson from '../../../colors.json';
import { useI18n } from '../../context/LanguageProvider';

// --- Reusable Component for Animated Cards ---
// This component encapsulates the advanced 3D hover and entrance animation logic
const ProjectCard = ({ project, index, colors, featuredInView }) => {
  // Motion values for tilt calculations
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-100, 100], [10, -10]), { stiffness: 100, damping: 10 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-10, 10]), { stiffness: 100, damping: 10 });

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.article
      key={project.id}
      // 2. Card Hover Effect (3D Tilt)
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ 
        perspective: 1000,
        transformStyle: "preserve-3d", 
        rotateX, 
        rotateY,
        scale: useTransform(x, [-100, 100], [1, 1]) // Prevent scale jump on hover
      }}
      // 1. Staggered Entrance Animation
      variants={{
        hidden: { opacity: 0, y: 50, scale: 0.95 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { type: "spring", stiffness: 100, damping: 15, duration: 0.8 },
        },
      }}
    >
      {/* Image Container */}
      <div className="relative h-[180px] md:h-[200px] w-full rounded-[8px] overflow-hidden bg-[#2A2A2A] shadow-xl">
        {/* 4. Optimized Image Zoom */}
        <motion.div 
            className="w-full h-full"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <Image 
                src={project.image} 
                alt={project.title}
                fill 
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
        </motion.div>
      </div>

      <h3 className="mt-4 text-lg font-semibold" style={{ color: colors.orange }}>
        {project.title}
      </h3>
      <p className="text-[12px] text-[#B7B7B7] mt-1">{project.desc}</p>
    </motion.article>
  );
};
// ---------------------------------------------


export default function ProjectPage() {
  const colors = colorsJson.colors;
  const { t } = useI18n();

  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, margin: '-100px' });

  const featuredRef = useRef(null);
  const featuredInView = useInView(featuredRef, { once: true, margin: '-100px' });

  const learnMoreRef = useRef(null);
  const learnMoreInView = useInView(learnMoreRef, { once: true, margin: '-100px' });

  // 5. Cleaned up Text/Desc: Use a valid translation key or fallback for desc
  const projects = [
    { 
      id: 'a', 
      title: t('La gare du Bourget 6 000 m2'), 
      desc: t('Flocage SF1h protection de la structure par un fibreux'), 
      image: '/images/p1.jpg' 
    },
    { 
      id: 'b', 
      title: t('Homebox Lomme 3 800 m2'), 
      desc: 'Flocage CF1h protection des planchers en bois par produit fibreux et structure acier par produit pâteux', 
      image: '/images/p2.jpg' 
    },
    { 
      id: 'c', 
      title: t('Prologis Havre 10 000 m2'), 
      desc: "Flocage CF2h création des bandes de 5m large de part et d’autre des murs de séparations par produit fibreux", 
      image: '/images/p3.jpg' 
    },
  ];

  return (
    <main style={{ backgroundColor: colors.black }} className="text-white min-h-screen">

      {/* Hero: Increased Y-motion for subtle depth */}
      <motion.section
        ref={heroRef}
        initial={{ opacity: 0, y: 40 }} // Increased initial y
        animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }} // Smoother spring transition
        className="px-6 md:px-12 pt-16 pb-8 text-center"
      >
        <h1 className="text-[34px] md:text-5xl font-extrabold leading-tight">
          {t('project.title_prefix')} <span style={{ color: colors.orange }}>{t('project.title_suffix')}</span>
        </h1>
        <p className="mt-3 md:mt-4 text-[13px] md:text-base text-[#CFCFCF] max-w-xl md:max-w-2xl mx-auto leading-relaxed">
          {t('project.subtitle_line1')} {t('project.subtitle_line2')}
        </p>
      </motion.section>

      {/* Featured: Enhanced Staggered Grid */}
      <motion.section
        ref={featuredRef}
        initial={{ opacity: 0, y: 20 }}
        animate={featuredInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className="px-6 md:px-12"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-[26px] md:text-[32px] font-bold mb-6">{t('project.featured_heading')}</h2>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            animate={featuredInView ? "visible" : "hidden"}
            // Stagger the children's animation
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.15, // Increased stagger time
                  delayChildren: 0.3,
                },
              },
            }}
          >
            {projects.map((p, index) => (
              <ProjectCard 
                key={p.id} 
                project={p} 
                index={index} 
                colors={colors} 
                featuredInView={featuredInView} 
              />
            ))}
          </motion.div>

          {/* Load more */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={featuredInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-8 mb-20"
          >
            <motion.button
              // 3. Button Press Effect
              whileTap={{ scale: 0.95, y: 1 }} // Squash and push down on press
              className="inline-flex items-center justify-center min-w-[128px] px-5 py-3 rounded-[10px] font-semibold text-white transition-opacity hover:opacity-90 shadow-lg"
              style={{ backgroundColor: colors.orange }}
            >
              {t('project.load_more')}
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      {/* Learn more strip */}
      <motion.section
        ref={learnMoreRef}
        initial={{ opacity: 0, y: 20 }}
        animate={learnMoreInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className="px-6 md:px-12 pb-20"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-[32px] font-bold mb-4">{t('project.learn_more')}</h2>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <p className="text-md md:text-base text-[#D8D8D8] max-w-2xl">
              {t('project.learn_more_desc')}
            </p>
            <Link
              href="/contact"
              passHref
              >
                <motion.button
                    // 3. Button Press Effect
                    whileTap={{ scale: 0.95, y: 1 }}
                    className="px-6 mb-4 py-3 rounded-[10px] font-semibold text-white whitespace-nowrap transition-opacity hover:opacity-90 shadow-lg"
                    style={{ backgroundColor: colors.orange }}
                >
                    {t('project.get_in_touch')}
                </motion.button>
            </Link>
          </div>
        </div>
      </motion.section>
    </main>
  );
}