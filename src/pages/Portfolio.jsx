import React from 'react';
import { motion } from 'framer-motion';
import BreadboardGrid from '../components/ui/BreadboardGrid';
import SignalStrength from '../components/ui/SignalStrength';

const Portfolio = () => {
    return (
        <main className="bg-metal-black pt-48 pb-32 circuit-grid-bg">
            <section className="px-4 max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-12">
                    <div className="max-w-2xl">
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-electric-blue tracking-[1em] uppercase text-[10px] font-black mb-6 block font-mono neon-text"
                        >
                            Case Studies
                        </motion.span>
                        <h1 className="text-7xl md:text-9xl font-black text-silver-primary leading-[0.85] tracking-tighter">
                            System<br /><span className="text-metallic italic">Projects.</span>
                        </h1>
                    </div>
                </div>

                {/* Signal divider */}
                <SignalStrength className="mb-16" />

                {/* Photonic Project Grid */}
                <BreadboardGrid />
            </section>
        </main>
    );
};

export default Portfolio;
