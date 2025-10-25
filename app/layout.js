import { Manrope } from 'next/font/google'; // 1. Import the font for optimization
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';

// 2. Import the essential, persistent components
import { Providers } from './providers';
import Navbar from '../app/components/Navbar';
import Footer from '../app/components/Footer';

//
import GsapScrollSmoother from '../app/components/GsapScrollSmoother';


// 3. Configure the font with subsets and display swapping for performance
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope', // Optional: for use in CSS
});

export const metadata = {
  title: 'My Professional Website',
  description: 'A modern, animated professional website with seamless theme switching.',
};

// 4. The definitive RootLayout component
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={manrope.className} suppressHydrationWarning>
      <body>
        <Providers>
          {/* 
            This component contains all the client-side GSAP logic.
            It doesn't render any visible elements, but its effect hook will
            run on the client to initialize the smooth scroll.
          */}
          <GsapScrollSmoother />

          {/* 
            GSAP ScrollSmoother requires a specific wrapper structure.
            The outer div is the viewport, and the inner div is the scrollable content.
          */}
          <div id="smooth-wrapper">
            <div id="smooth-content">
              <Navbar />
              <main id="main-content">
                {children}
              </main>
              <Footer />
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}