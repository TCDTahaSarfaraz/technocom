// app/components/About.js -- THIS CODE IS CORRECT.

'use client';
import ProductSuiteScene from './ProductSuiteScene';

const About = () => (
    <section id="about" className="py-24 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
                <div className="lg:w-1/2 text-center lg:text-left">
                    <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-indigo-500">
                        MODULAR SOLUTIONS
                    </h3>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
                        A fully integrated suite of financial products
                    </h2>
                </div>
                <div className="w-full lg:w-1/2">
                    <ProductSuiteScene />
                </div>
            </div>
        </div>
    </section>
);

export default About;