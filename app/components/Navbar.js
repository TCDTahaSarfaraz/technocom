'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeSwitcher from './ThemeSwitcher';

const MenuToggle = ({ isOpen, toggle }) => (
  <motion.button
    aria-label={isOpen ? "Close menu" : "Open menu"}
    aria-expanded={isOpen}
    onClick={toggle}
    className="relative z-[100] w-8 h-8 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    animate={isOpen ? "open" : "closed"}
  >
    <motion.svg width="24" height="24" viewBox="0 0 24 24" className="text-foreground">
      <motion.path stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" variants={{ closed: { d: "M 4 6 L 20 6" }, open: { d: "M 6 18 L 18 6" } }} transition={{ duration: 0.4 }} />
      <motion.path stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" d="M 4 12 L 20 12" variants={{ closed: { opacity: 1 }, open: { opacity: 0 } }} transition={{ duration: 0.2 }} />
      <motion.path stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" variants={{ closed: { d: "M 4 18 L 20 18" }, open: { d: "M 6 6 L 18 18" } }} transition={{ duration: 0.4 }} />
    </motion.svg>
  </motion.button>
);

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Services', href: '#Services' },
    { name: 'Contact', href: '#contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const navBg = scrolled
    ? 'bg-background/90 shadow-lg backdrop-blur-xl border-b border-border/40'
    : 'bg-transparent';

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, ease: [0.6, 0.05, 0.01, 0.9] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${navBg}`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex justify-between items-center">
          <Link href="#home" className="text-xl sm:text-2xl font-bold text-foreground">
            MyWebsite
          </Link>

          {/* Desktop */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-muted-foreground hover:text-foreground font-medium transition-colors text-sm lg:text-base"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center space-x-4">
            <ThemeSwitcher />
            <Link
              href="#contact"
              className="bg-primary text-primary-foreground font-semibold px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity text-sm"
            >
              Contact Sales
            </Link>
          </div>

          {/* Mobile */}
          <div className="flex lg:hidden items-center space-x-3">
            <ThemeSwitcher />
            <MenuToggle isOpen={menuOpen} toggle={() => setMenuOpen(prev => !prev)} />
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu - NOW SHOWS ALL LINKS */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-y-0 right-0 w-full max-w-xs bg-background shadow-2xl z-[49] flex flex-col pt-20 px-6 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col space-y-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block text-2xl font-medium text-foreground hover:text-primary transition-colors py-2"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.08 }}
              >
                <Link
                  href="#contact"
                  onClick={() => setMenuOpen(false)}
                  className="block mt-6 bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-full text-center hover:opacity-90 transition-opacity"
                >
                  Contact Sales
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;