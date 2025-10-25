'use client';

import { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const HeroAnimation = lazy(() => import('./HeroAnimation'));

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Home() {
  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex flex-col justify-center bg-white dark:bg-[#0d1120] text-gray-900 dark:text-white overflow-hidden pt-20 md:pt-0"
    >
      <div className="absolute inset-0 z-0 h-full w-full bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:36px_36px]" />

      <motion.div
        className="container mx-auto relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Text */}
        <div className="text-center md:text-left max-w-xl mx-auto md:mx-0">
          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-tight"
          >
            Complete, fully
            <br className="hidden sm:block" />
            configurable
            <br className="hidden sm:block" />
            <span className="text-indigo-600 dark:text-indigo-400">AI Agent</span> system
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-5 sm:mt-6 text-sm sm:text-base lg:text-lg text-gray-600 dark:text-slate-300 leading-relaxed max-w-md mx-auto md:mx-0"
          >
            Our platform is the only complete, configurable AI Agent System in customer service—empowering teams to customize, test, and continuously improve through a no-code experience.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3 sm:gap-4"
          >
            <button className="group w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 bg-black dark:bg-white text-white dark:text-black font-semibold rounded-md hover:scale-105 transition-transform duration-300 flex items-center justify-center gap-2 shadow-lg text-sm sm:text-base">
              Start free trial
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 font-semibold rounded-md text-gray-700 dark:text-slate-300 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-800/50 hover:scale-105 transition-all duration-300 text-sm sm:text-base">
              View demo
            </button>
          </motion.div>
        </div>

        {/* Animation */}
        <div className="relative w-full h-[320px] sm:h-[400px] md:h-[450px] lg:h-[500px] xl:h-[560px] mt-8 md:mt-0">
          <Suspense fallback={<div className="w-full h-full bg-gray-100 dark:bg-slate-800/30 rounded-xl animate-pulse" />}>
            <HeroAnimation />
          </Suspense>
        </div>
      </motion.div>
    </section>
  );
}