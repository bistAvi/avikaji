import React from 'react';
import { motion } from 'framer-motion';

/* ════════════════════════════════════════════════════════════
   SignalStrength — Animated equalizer-style section divider
   Bars pulse at different frequencies, color shifts by theme
   ════════════════════════════════════════════════════════════ */

const BAR_COUNT = 7;

const barVariants = (delay, maxHeight) => ({
    initial: { height: 4 },
    animate: {
        height: [4, maxHeight, 4, maxHeight * 0.6, 4],
        transition: {
            duration: 1.8 + delay * 0.3,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: delay * 0.15,
        },
    },
});

const SignalStrength = ({ className = '' }) => {
    const bars = Array.from({ length: BAR_COUNT }, (_, i) => {
        const center = Math.floor(BAR_COUNT / 2);
        const distFromCenter = Math.abs(i - center);
        const maxHeight = 40 - distFromCenter * 6; // tallest in center
        return { delay: i, maxHeight: Math.max(maxHeight, 10) };
    });

    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className={`flex items-end justify-center gap-[6px] h-[60px] w-full ${className}`}
        >
            {bars.map((bar, i) => (
                <motion.div
                    key={i}
                    className="w-[3px] rounded-full"
                    style={{
                        background: `linear-gradient(to top, var(--electric), var(--neon))`,
                        boxShadow: '0 0 6px var(--glow-electric)',
                    }}
                    variants={barVariants(bar.delay, bar.maxHeight)}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: false, margin: '-30px' }}
                />
            ))}
        </motion.div>
    );
};

export default SignalStrength;
