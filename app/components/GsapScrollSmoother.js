// app/components/GsapScrollSmoother.js
'use client';

import { useLayoutEffect } from 'react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

const GsapScrollSmoother = () => {
  // We use useLayoutEffect to run the GSAP code after the DOM has been painted,
  // but before the browser has had a chance to paint the screen. This is the
  // best hook for DOM manipulation like this to avoid a "flicker" effect.
  useLayoutEffect(() => {
    // It's a best practice to register plugins in the effect hook
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    // Create the ScrollSmoother instance
    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.5, // How much to smooth the scroll (1 is default)
      effects: true, // Lets you use data-speed and data-lag attributes
    });

    // --- CLEANUP FUNCTION ---
    // This is crucial for preventing memory leaks in a React environment.
    // When the component unmounts, we kill the ScrollSmoother instance.
    return () => {
      smoother.kill();
    };
  }, []); // The empty dependency array ensures this effect runs only once on mount

  // This component does not render any visible HTML
  return null;
};

export default GsapScrollSmoother;