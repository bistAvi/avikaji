import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

/* ════════════════════════════════════════════════════════════
   DiffractionOverlay — Prismatic edge effect reacting to scroll
   Appears during high-velocity scrolls
   ════════════════════════════════════════════════════════════ */

const DiffractionOverlay = () => {
    const { scrollYProgress } = useScroll();
    const [velocity, setVelocity] = useState(0);

    // Track scroll velocity approximately
    useEffect(() => {
        let lastY = window.scrollY;
        const handleScroll = () => {
            const currentY = window.scrollY;
            const diff = Math.abs(currentY - lastY);
            setVelocity(diff);
            lastY = currentY;

            // Decay velocity
            setTimeout(() => setVelocity(v => v * 0.9), 100);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const opacity = useTransform(scrollYProgress, [0, 1], [0, 0]); // dummy used for trigger
    const prismOpacity = Math.min(velocity / 100, 0.4);

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
            {/* Left Fringe */}
            <motion.div
                className="absolute inset-y-0 left-0 w-[40px] bg-gradient-to-r from-[#B800FF]/20 via-[#00D9FF]/10 to-transparent blur-md"
                style={{ opacity: prismOpacity }}
            />
            {/* Right Fringe */}
            <motion.div
                className="absolute inset-y-0 right-0 w-[40px] bg-gradient-to-l from-[#FF1744]/20 via-[#FFD700]/10 to-transparent blur-md"
                style={{ opacity: prismOpacity }}
            />
        </div>
    );
};

export default DiffractionOverlay;
