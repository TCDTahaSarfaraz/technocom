'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { BackgroundGradient } from '../../components/ui/shadcn-io/background-gradient';
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, 0.05, 0.01, 0.9],
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full py-16 sm:py-20 lg:py-28 overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900"
    >
      {/* Animated Gradient Background */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'linear-gradient(to right, #e0e7ff, #c7d2fe, #ddd6fe)',
          backgroundSize: '200% 200%',
        }}
        animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
      />
      <div className="absolute inset-0 z-[1] bg-white/70 dark:bg-black/50 backdrop-blur-sm" />

      <div className="relative z-10 container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <BackgroundGradient
            className="rounded-2xl sm:rounded-3xl w-full p-6 sm:p-8 md:p-10 lg:p-12 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl shadow-2xl"
            containerClassName="w-full"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-16">
              {/* Left: Form */}
              <motion.div variants={itemVariants} className="flex flex-col">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
                  Get in Touch
                </h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-6 sm:mb-8">
                  Have a project in mind or just want to say hi? Fill out the form, and we'll get back to you.
                </p>

                <form className="space-y-4 sm:space-y-5 flex-grow flex flex-col">
                  <input
                    type="text"
                    placeholder="Full Name"
                    required
                    className="w-full p-3 sm:p-4 bg-gray-100 dark:bg-slate-800/70 border border-gray-300 dark:border-slate-700 text-gray-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-all text-sm sm:text-base"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    required
                    className="w-full p-3 sm:p-4 bg-gray-100 dark:bg-slate-800/70 border border-gray-300 dark:border-slate-700 text-gray-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-all text-sm sm:text-base"
                  />
                  <textarea
                    placeholder="Your Message"
                    required
                    rows={5}
                    className="w-full p-3 sm:p-4 bg-gray-100 dark:bg-slate-800/70 border border-gray-300 dark:border-slate-700 text-gray-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-all resize-none text-sm sm:text-base flex-grow"
                  ></textarea>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500 text-white font-semibold p-3 sm:p-4 rounded-xl hover:opacity-90 shadow-lg shadow-indigo-500/30 dark:shadow-purple-500/30 transition-all duration-300 text-sm sm:text-base"
                  >
                    Send Message
                  </button>
                </form>
              </motion.div>

              {/* Right: Details + Map */}
              <motion.div variants={itemVariants} className="space-y-8 sm:space-y-10">
                <div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-5 sm:mb-6">
                    Contact Details
                  </h3>
                  <div className="space-y-5 sm:space-y-6 text-gray-700 dark:text-gray-300">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600 dark:text-indigo-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">Email</p>
                        <a href="mailto:hi@untitledui.com" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-sm sm:text-base">
                          hi@untitledui.com
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 sm:gap-4">
                      <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600 dark:text-indigo-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">Phone</p>
                        <p className="text-sm sm:text-base">+1 (555) 000-0000</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 sm:gap-4">
                      <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600 dark:text-indigo-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">Office Location</p>
                        <p className="text-sm sm:text-base">100 Smith Street, Collingwood VIC 3066 AU</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Map */}
                <div className="relative w-full h-64 sm:h-72 md:h-80 lg:h-96 rounded-2xl overflow-hidden border border-gray-300 dark:border-slate-700 shadow-lg">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3620.401590081113!2d67.00464987401142!3d24.850130145673422!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33e06f2a60f3b%3A0xd6863f65ab088107!2sTechnoCom%20Developments!5e0!3m2!1sen!2s!4v1761140136766!5m2!1sen!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="grayscale hover:grayscale-0 transition-all duration-500"
                    title="TechnoCom Office Location"
                  ></iframe>
                </div>
              </motion.div>
            </div>
          </BackgroundGradient>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;