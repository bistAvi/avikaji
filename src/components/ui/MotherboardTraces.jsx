import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

/* ════════════════════════════════════════════════════════════
   MotherboardTraces — Background SVG traces that specifically
   connect components on the Contact page.
   ════════════════════════════════════════════════════════════ */

const MotherboardTraces = ({ isTyping }) => {
    const traces = useMemo(() => [
        { d: "M 10 100 L 100 100 L 100 300 L 300 300", delay: 0 },
        { d: "M 50 50 L 50 150 L 250 150 L 250 400", delay: 0.2 },
        { d: "M 800 500 L 700 500 L 700 300 L 500 300", delay: 0.4 },
        { d: "M 900 100 L 800 100 L 800 250 L 600 250", delay: 0.6 },
        { d: "M 100 600 L 400 600 L 400 450", delay: 0.8 },
    ], []);

    return (
        <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
            <svg viewBox="0 0 1000 800" className="w-full h-full" preserveAspectRatio="none">
                <defs>
                    <filter id="traceGlow">
                        <feGaussianBlur stdDeviation="2" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {traces.map((trace, i) => (
                    <g key={i}>
                        {/* Base Trace */}
                        <path
                            d={trace.d}
                            fill="none"
                            stroke="var(--gridg)"
                            strokeWidth="1.5"
                        />
                        {/* Active Glow Trace */}
                        <motion.path
                            d={trace.d}
                            fill="none"
                            stroke="var(--electric)"
                            strokeWidth="2"
                            filter="url(#traceGlow)"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={isTyping ? { pathLength: 1, opacity: 0.6 } : { pathLength: 0, opacity: 0 }}
                            transition={{ duration: 1, delay: trace.delay, ease: "easeInOut" }}
                        />
                        {/* Animated Pulses */}
                        <motion.circle
                            r="2"
                            fill="var(--electric)"
                            initial={{ offsetDistance: "0%" }}
                            animate={{ offsetDistance: "100%" }}
                            transition={{ duration: 3, delay: trace.delay, repeat: Infinity, ease: "linear" }}
                            style={{ offsetPath: `path('${trace.d}')`, opacity: isTyping ? 1 : 0 }}
                        />
                    </g>
                ))}
            </svg>
        </div>
    );
};

export default MotherboardTraces;
