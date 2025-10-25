// app/components/Footer.js
'use client';

import React from 'react';

// --- SVG Icons (No changes needed here, they are perfect) ---
const ApplePayIcon = () => ( <svg width="40" height="24" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.524 8.441c.018-2.61 2.22-4.14 4.303-4.157 2.07-.017 3.733 1.15 4.636 2.822-2.19.034-4.252 1.391-5.188 3.33-.89 1.84.183 4.14 2.155 4.14 2.222 0 3.715-1.927 5.17-1.927 1.454 0 3.16.94 4.286.958v-2.31c-.13-.017-1.97-.27-3.41-1.722-1.939-1.944-2.73-4.73-2.086-7.551C29.69.15 26.68.016 24.58.016c-3.142 0-5.83 1.62-7.39 4.053-1.66 2.592-.857 6.427 1.334 6.427 1.127 0 2.053-.61 2.982-1.638-.016-.017-.033-.017-.05-.017zM20.25 15.163c-1.385 1.134-2.508 2.84-2.84 4.764-1.29-.085-2.58-1.076-3.498-2.22-1.543-1.944-2.875-4.816-2.875-7.792 0-3.348 1.624-5.753 4.197-5.753 2.24 0 3.82 1.5 5.01 1.5s1.956-1.373 3.96-1.373c.183 0 .366.017.53.034-.15.118-.3.237-.468.355-1.42 1.025-2.457 2.628-2.457 4.542 0 3.243 2.19 5.05 4.354 5.05 1.957 0 3.012-1.458 3.977-1.458.948 0 2.156.99 3.297.99v2.327c-2.07 0-3.48-1.117-4.572-1.117-1.092 0-2.342 1.1-4.25 1.1-2.053 0-3.585-1.57-4.88-1.57z" fill="currentColor"></path></svg> );
const PayPalIcon = () => ( <svg width="53" height="24" viewBox="0 0 53 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.983 2.183H.236l2.35 15.304c.16 1.026.96 1.838 1.983 1.959l7.982.94 1.487-9.673.016.096a.916.916 0 011.025-.808l3.125.132c5.986.253 9.77-3.194 9.176-9.154L26.79.255C26.115-.553 21.05-.733 15.1 2.1c-1.258.598-2.316 1.34-3.159 2.182l1.041-2.099zM2.586 16.96c-.347-.04-.632-.303-.687-.655L.016 4.704h4.485c2.955-1.632 6.02-2.39 8.92-2.198l-.78 5.09-1.42 9.27-8.635.086zM41.737 8.353c-.352-2.314-2.434-4.897-6.23-5.35L29.52 2.87c-.664-.082-1.313.33-1.453.99l-2.923 18.995c-.07.45.24.858.69.928l2.972.46c.092.013.185.02.278.02.358 0 .69-.22.827-.565l2.09-5.185 1.05-6.815c1.474-.472 2.87-1.47 3.59-3.23l.117-.11zM52.321 8.353c-.352-2.314-2.435-4.897-6.23-5.35L40.104 2.87c-.663-.082-1.312.33-1.452.99L35.728 22.86c-.07.45.24.858.69.928l2.973.46c.092.013.185.02.278.02.358 0 .69-.22.828-.565l2.09-5.185 1.05-6.815c1.474-.472 2.87-1.47 3.59-3.23l.116-.11z" fill="currentColor"></path></svg> );
const VisaIcon = () => ( <svg width="38" height="24" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.623 24c2.197 0 4.226-.74 5.86-2.14l-3.28-19.782c-.172-1.03-1.022-1.8-2.073-1.8H.242L0 2.478h10.96c.725 0 1.34.52 1.488 1.233l2.84 17.067a3.81 3.81 0 00-.773.084c-1.378.362-2.13.916-2.784 1.547l1.9-1.623zM37.992 8.337c.07-.468-.266-.898-.734-.97L31.03.348c-.468-.073-1.02.16-1.2.628L25.13 18.9c-.11.468.21.93.678 1.003l2.34.35c.468.073 1.02-.16 1.2-.628l8.644-11.3v.004zM24.726.976l-5.94 22.02c1.78.68 3.738.93 5.484.532l5.63-20.81-5.174-1.742z" fill="currentColor"></path></svg> );
const MastercardIcon = () => ( <svg width="31" height="24" viewBox="0 0 31 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0_105_2)"><path d="M12.001 22.316C5.395 22.316.035 17.51.035 12.004S5.395 1.691 12.001 1.691s11.966 4.807 11.966 10.313c0 5.506-5.36 10.312-11.966 10.312z" fill="#EB001B"></path><path d="M30.638 15.344c-2.024-4.803-6.958-8.216-12.723-8.216-1.583 0-3.09.284-4.502.813C17.388 4.09 23.336 6.34 27.27 10.63c2.618 2.85 4.093 6.64 3.79 10.916a10.875 10.875 0 01-.422-6.202z" fill="#F79E1B"></path><path d="M18.636 12.004c0-3.15-2.203-5.83-5.416-6.622v13.245c3.213-.792 5.416-3.473 5.416-6.623z" fill="#FF5F00"></path></g><defs><clipPath id="clip0_105_2"><path fill="#fff" transform="translate(0.035 1.691)" d="M0 0h30.931v20.625H0z"></path></clipPath></defs></svg>);
const ArrowRight = () => ( <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.313 11.313a.937.937 0 001.325 0l4.688-4.688a.938.938 0 000-1.325L7.638.613a.937.937 0 00-1.325 1.325l3.566 3.562H.938a.938.938 0 100 1.875h8.566l-3.566 3.563a.937.937 0 000 1.325z" fill="currentColor"></path></svg> );
const InstagramIcon = () => ( <svg width="20" height="20" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><rect x="4" y="4" width="16" height="16" rx="4"></rect><circle cx="12" cy="12" r="3"></circle><line x1="16.5" y1="7.5" x2="16.5" y2="7.501"></line></svg> );
const TwitterIcon = () => ( <svg width="20" height="20" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c-.002 -.249 1.51 -2.772 1.818 -4.013z"></path></svg> );
const FacebookIcon = () => ( <svg width="20" height="20" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3"></path></svg> );

const Footer = () => {
    const scrollToTop = () => {
        if (typeof window !== 'undefined') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        // --- ADDED DARK MODE STYLES ---
        <footer className="bg-[#F6F5F3] text-black dark:bg-gray-900 dark:text-gray-300">
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-1">
                        {/* --- ADDED DARK MODE STYLES --- */}
                        <h2 className="font-serif text-3xl md:text-4xl text-black dark:text-white uppercase mb-8 leading-tight tracking-wider">
                            Get updates on fun stuff you probably want to know about in your inbox.
                        </h2>
                        <form onSubmit={(e) => e.preventDefault()}>
                            {/* --- ADDED DARK MODE STYLES --- */}
                            <div className="relative border-b border-black dark:border-gray-600">
                                <input
                                    type="email"
                                    placeholder="Email address"
                                    className="w-full bg-transparent py-3 outline-none placeholder:text-gray-500 dark:placeholder:text-gray-400 text-black dark:text-white"
                                    required
                                />
                                <button type="submit" className="absolute right-0 top-1/2 -translate-y-1/2" aria-label="Submit email">
                                    <ArrowRight />
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="hidden lg:block"></div>

                    <div className="grid grid-cols-2 gap-8">
                        <div>
                             {/* --- ADDED DARK MODE STYLES --- */}
                            <h3 className="font-semibold text-black dark:text-white mb-4">Menu</h3>
                            <ul className="space-y-3 text-gray-700 dark:text-gray-400">
                                <li><a href="#" className="hover:text-black dark:hover:text-white transition-colors">Shop All</a></li>
                                <li><a href="#" className="hover:text-black dark:hover:text-white transition-colors">About Us</a></li>
                                <li><a href="#" className="hover:text-black dark:hover:text-white transition-colors">Community (Vibes)</a></li>
                            </ul>
                        </div>
                        <div>
                            {/* --- ADDED DARK MODE STYLES --- */}
                            <h3 className="font-semibold text-black dark:text-white mb-4">Support</h3>
                            <ul className="space-y-3 text-gray-700 dark:text-gray-400">
                                <li><a href="#" className="hover:text-black dark:hover:text-white transition-colors">Shipping & Returns</a></li>
                                <li><a href="#" className="hover:text-black dark:hover:text-white transition-colors">Help & FAQ</a></li>
                                <li><a href="#" className="hover:text-black dark:hover:text-white transition-colors">Terms & Conditions</a></li>
                                <li><a href="#" className="hover:text-black dark:hover:text-white transition-colors">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-black dark:hover:text-white transition-colors">Contact</a></li>
                                <li><a href="#" className="hover:text-black dark:hover:text-white transition-colors">Login</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* --- ADDED DARK MODE STYLES --- */}
                <div className="grid grid-cols-2 lg:grid-cols-3 items-center mt-12 pt-8 border-t border-gray-300 dark:border-gray-700">
                    {/* --- ADDED DARK MODE STYLES --- */}
                    <div className="flex items-center gap-4 text-gray-800 dark:text-gray-400">
                        <ApplePayIcon />
                        <PayPalIcon />
                        <MastercardIcon />
                        <VisaIcon />
                    </div>

                    <div className="hidden lg:flex justify-center items-center gap-2">
                         {/* --- INVERTED COLORS FOR DARK MODE --- */}
                        <a href="#" aria-label="Instagram" className="w-10 h-10 bg-black text-white dark:bg-white dark:text-black rounded-full flex items-center justify-center transition-opacity hover:opacity-80"> <InstagramIcon /> </a>
                        <a href="#" aria-label="Twitter" className="w-10 h-10 bg-black text-white dark:bg-white dark:text-black rounded-full flex items-center justify-center transition-opacity hover:opacity-80"> <TwitterIcon /> </a>
                        <a href="#" aria-label="Facebook" className="w-10 h-10 bg-black text-white dark:bg-white dark:text-black rounded-full flex items-center justify-center transition-opacity hover:opacity-80"> <FacebookIcon /> </a>
                    </div>
                    
                    <div className="flex justify-end">
                         {/* --- INVERTED COLORS AND SVG COLOR FOR DARK MODE --- */}
                         <button onClick={scrollToTop} aria-label="Back to top" className="w-8 h-8 bg-black text-[#F6F5F3] dark:bg-white dark:text-gray-900 rounded-sm flex items-center justify-center">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.35355 0.646447C6.15829 0.451184 5.84171 0.451184 5.64645 0.646447L2.46447 3.82843C2.2692 4.02369 2.2692 4.34027 2.46447 4.53553C2.65973 4.7308 2.97631 4.7308 3.17157 4.53553L6 1.70711L8.82843 4.53553C9.02369 4.7308 9.34027 4.7308 9.53553 4.53553C9.7308 4.34027 9.7308 4.02369 9.53553 3.82843L6.35355 0.646447ZM5.5 12L5.5 1L6.5 1L6.5 12L5.5 12Z" fill="currentColor"/>
                            </svg>
                        </button>
                    </div>

                </div>
            </div>
        </footer>
    );
};

export default Footer;