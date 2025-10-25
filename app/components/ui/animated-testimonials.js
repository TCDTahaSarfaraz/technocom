// app/components/ui/animated-testimonials.js
'use client'

import { motion, useTransform, useScroll } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

// This is the main container for the horizontal scroll animation.
export const AnimatedTestimonials = ({ testimonials }) => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: targetRef });
    
    // Maps the vertical scroll progress (0 to 1) to a horizontal translation.
    // Adjust the "-95%" value if you have more or fewer cards to ensure
    // the last card scrolls fully into view.
    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

    return (
        <section ref={targetRef} className="relative h-[300vh] bg-gray-900">
            {/* The outer div is sticky, so it stays in place while the user scrolls */}
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                <motion.div style={{ x }} className="flex gap-8">
                    {/* 
                      Using a more stable key like the name is better than the index.
                      This ensures React can track each item correctly.
                    */}
                    {testimonials.map((testimonial) => (
                        <Card key={testimonial.name} {...testimonial} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

// This is the individual testimonial card.
const Card = ({ quote, name, designation, src }) => {
    return (
        <div className="relative h-[450px] w-[350px] shrink-0 overflow-hidden rounded-2xl bg-black/50 p-8 shadow-lg border border-gray-700 backdrop-blur-lg">
             <div className="absolute inset-0 z-0 opacity-10">
                {/* 
                  UPDATED: `layout="fill"` is deprecated.
                  Use the `fill` prop and `className="object-cover"` for the same effect.
                */}
                <Image src={src} alt={name} fill className="object-cover" />
            </div>
            <div className="relative z-10 flex flex-col justify-between h-full">
                {/*
                  THIS IS THE KEY FIX:
                  We construct the string with quotes using template literals (` `)
                  and the HTML entity `&quot;` for the double quotes.
                  This correctly escapes the quotes and solves the linter error.
                */}
                <p className="text-lg italic text-gray-300">{`&quot;${quote}&quot;`}</p>

                <div className="flex items-center gap-4">
                     <Image
                        width={40}
                        height={40}
                        className="rounded-full object-cover border-2 border-gray-500"
                        src={src}
                        alt={name}
                    />
                    <div>
                        <p className="font-semibold text-white">{name}</p>
                        <p className="text-sm text-gray-400">{designation}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};