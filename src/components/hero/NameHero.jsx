import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Magnetic from '../ui/Magnetic';
import gsap from 'gsap';
import PhotonWave from './PhotonWave';

const NameHero = () => {
    const containerRef = useRef(null);
    const textRef = useRef(null);
    const { scrollY } = useScroll();

    // Kinetic Typography: Scroll-mapped skew and weight
    const skewX = useTransform(scrollY, [0, 500], [0, 10]);
    const letterSpacing = useTransform(scrollY, [0, 500], ["0.1em", "0.5em"]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    useEffect(() => {
        const targetText = textRef.current;
        if (!targetText) return;

        const handleMouseEnter = () => {
            gsap.to(targetText, {
                duration: 0.1,
                opacity: 0.8,
                repeat: 5,
                yoyo: true,
                onComplete: () => gsap.to(targetText, { opacity: 1 })
            });
        };

        targetText.addEventListener('mouseenter', handleMouseEnter);
        return () => targetText.removeEventListener('mouseenter', handleMouseEnter);
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-metal-black"
        >
            {/* 3D EM Wave Background */}
            <PhotonWave />

            {/* Subtle radial glow overlay */}
            <div className="absolute inset-0 z-[1] pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] bg-[radial-gradient(circle,_rgba(0,217,255,0.06)_0%,_transparent_60%)]" />
                <div className="absolute top-1/3 right-1/4 w-[40vw] h-[40vh] bg-[radial-gradient(circle,_rgba(184,0,255,0.04)_0%,_transparent_60%)]" />
            </div>

            {/* Main Title */}
            <div className="relative z-10 w-full px-4 text-center">
                <Magnetic strength={0.2} radius={400}>
                    <motion.div
                        ref={textRef}
                        style={{ skewX, letterSpacing, opacity }}
                        className="relative inline-block cursor-none group"
                    >
                        {/* Primary title */}
                        <h1 className="text-[10vw] md:text-[12vw] font-black text-metal-white leading-none tracking-tighter mix-blend-difference font-mono">
                            AVISHEK BIST
                        </h1>
                        {/* Neon ghost layer */}
                        <h1 className="absolute inset-0 text-[10vw] md:text-[12vw] font-black leading-none tracking-tighter opacity-20 blur-[3px] translate-x-[2px] translate-y-[2px] group-hover:translate-x-[10px] group-hover:translate-y-[10px] transition-transform duration-500 neon-text font-mono">
                            AVISHEK BIST
                        </h1>
                        {/* Purple reflection layer */}
                        <h1 className="absolute inset-0 text-[10vw] md:text-[12vw] font-black leading-none tracking-tighter opacity-10 group-hover:opacity-30 translate-x-[-2px] translate-y-[-2px] group-hover:translate-x-[-8px] group-hover:translate-y-[-8px] transition-all duration-500 neon-purple-text font-mono">
                            AVISHEK BIST
                        </h1>

                        {/* Photon glow on hover */}
                        <motion.div
                            initial={{ scale: 0 }}
                            whileHover={{ scale: 1, y: 50 }}
                            className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full blur-[12px] opacity-0 group-hover:opacity-50 transition-all duration-700"
                            style={{ backgroundColor: 'var(--electric)' }}
                        />
                    </motion.div>
                </Magnetic>

                {/* Subtitle with wavelength label */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1 }}
                    className="mt-12 overflow-hidden"
                >
                    <p className="text-grey-secondary text-sm md:text-lg font-bold tracking-[0.5em] uppercase font-mono group">
                        <span className="inline-block group-hover:text-electric-blue transition-colors duration-500">Electrical Engineering</span>
                        <span className="mx-4 text-electric-blue opacity-30">/</span>
                        <span className="inline-block group-hover:text-neon-purple transition-colors duration-500">Photonic Research</span>
                    </p>
                </motion.div>

                {/* Wavelength tech indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 1 }}
                    className="mt-6"
                >
                    <span className="wavelength-label">λ = 450nm ─ 700nm</span>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-10"
            >
                <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-electric-blue to-transparent" />
                <span className="text-[8px] font-black tracking-[0.8em] text-electric-blue uppercase opacity-40 font-mono">Scroll Down</span>
            </motion.div>
        </section>
    );
};

export default NameHero;
