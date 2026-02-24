import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Magnetic from '../ui/Magnetic';
import gsap from 'gsap';

const NameHero = () => {
    const containerRef = useRef(null);
    const textRef = useRef(null);
    const { scrollY } = useScroll();

    // Kinetic Typography: Scroll-mapped skew and weight
    const skewX = useTransform(scrollY, [0, 500], [0, 10]);
    const letterSpacing = useTransform(scrollY, [0, 500], ["0.1em", "0.5em"]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    useEffect(() => {
        const letters = "AVISHEK BIST".split("");
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
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-metal-black brushed-metal"
        >
            {/* Background Texture Overlay */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,_var(--gold)_0%,_transparent_70%)] opacity-10 animate-pulse" />
            </div>

            {/* Magnetic Glitch Typography */}
            <div className="relative z-10 w-full px-4 text-center">
                <Magnetic strength={0.2} radius={400}>
                    <motion.div
                        ref={textRef}
                        style={{ skewX, letterSpacing, opacity }}
                        className="relative inline-block cursor-none group"
                    >
                        {/* Shadow Layers for depth */}
                        <h1 className="text-[10vw] md:text-[12vw] font-black text-metal-white leading-none tracking-tighter mix-blend-difference">
                            AVISHEK BIST
                        </h1>
                        <h1 className="absolute inset-0 text-[10vw] md:text-[12vw] font-black text-silver-primary leading-none tracking-tighter opacity-30 blur-[2px] translate-x-[2px] translate-y-[2px] group-hover:translate-x-[10px] group-hover:translate-y-[10px] transition-transform duration-500">
                            AVISHEK BIST
                        </h1>
                        <h1 className="absolute inset-0 text-[10vw] md:text-[12vw] font-black text-gold-accent leading-none tracking-tighter opacity-10 group-hover:opacity-40 translate-x-[-2px] translate-y-[-2px] group-hover:translate-x-[-8px] group-hover:translate-y-[-8px] transition-all duration-500">
                            AVISHEK BIST
                        </h1>

                        {/* Mercury Drop Decoration */}
                        <motion.div
                            initial={{ scale: 0 }}
                            whileHover={{ scale: 1, y: 50 }}
                            className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-silver-primary blur-[8px] opacity-0 group-hover:opacity-40 transition-all duration-700"
                        />
                    </motion.div>
                </Magnetic>

                {/* Kinetic Subtitle */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1 }}
                    className="mt-12 overflow-hidden"
                >
                    <p className="text-grey-secondary text-sm md:text-lg font-bold tracking-[0.5em] uppercase kinetic-header group">
                        <span className="inline-block group-hover:text-gold-accent transition-colors duration-500">Electrical Engineering</span>
                        <span className="mx-4 text-silver-primary opacity-20">/</span>
                        <span className="inline-block group-hover:text-metal-white transition-colors duration-500">Photonic Research</span>
                    </p>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
            >
                <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-gold-accent to-transparent" />
                <span className="text-[8px] font-black tracking-[0.8em] text-silver-primary uppercase opacity-30">Scroll Down</span>
            </motion.div>
        </section>
    );
};

export default NameHero;
