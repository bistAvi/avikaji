import React, { useState } from 'react';
import { motion } from 'framer-motion';

/* ════════════════════════════════════════════════════════════
   LaserCTA — Button wrapper that fires a "laser path" around
   the button border on hover.
   ════════════════════════════════════════════════════════════ */

const LaserCTA = ({ children, className = "", onClick }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className={`relative group overflow-hidden cursor-pointer ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onClick}
        >
            {/* Laser Border Path */}
            {isHovered && (
                <>
                    <motion.div
                        className="absolute top-0 left-0 h-[2px] bg-white pulse-glow z-20"
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 0.3 }}
                    />
                    <motion.div
                        className="absolute top-0 right-0 w-[2px] bg-white pulse-glow z-20"
                        initial={{ height: 0 }}
                        animate={{ height: '100%' }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                    />
                    <motion.div
                        className="absolute bottom-0 right-0 h-[2px] bg-white pulse-glow z-20"
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 0.3, delay: 0.6 }}
                    />
                    <motion.div
                        className="absolute bottom-0 left-0 w-[2px] bg-white pulse-glow z-20"
                        initial={{ height: 0 }}
                        animate={{ height: '100%' }}
                        transition={{ duration: 0.3, delay: 0.9 }}
                    />
                </>
            )}

            {/* Content Slot */}
            <div className="relative z-10">
                {children}
            </div>

            {/* Background Glow */}
            <div className="absolute inset-0 bg-electric-blue/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
        </div>
    );
};

export default LaserCTA;
