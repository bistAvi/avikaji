import React, { useState, useEffect } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor = () => {
    const [isHovered, setIsHovered] = useState(false);
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 700 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleHover = () => setIsHovered(true);
        const handleUnhover = () => setIsHovered(false);

        window.addEventListener('mousemove', moveCursor);

        const links = document.querySelectorAll('a, button, .magnetic-item');
        links.forEach(link => {
            link.addEventListener('mouseenter', handleHover);
            link.addEventListener('mouseleave', handleUnhover);
        });

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            links.forEach(link => {
                link.removeEventListener('mouseenter', handleHover);
                link.removeEventListener('mouseleave', handleUnhover);
            });
        };
    }, []);

    return (
        <>
            {/* Main Cursor Dot */}
            <motion.div
                className="fixed top-0 left-0 w-3 h-3 bg-white rounded-full pointer-events-none z-[10000] mix-blend-difference"
                style={{
                    translateX: cursorXSpring,
                    translateY: cursorYSpring,
                    scale: isHovered ? 4 : 1,
                }}
            />
            {/* Outer Mercury Ring */}
            <motion.div
                className="fixed top-0 left-0 w-12 h-12 border border-white/20 rounded-full pointer-events-none z-[9999]"
                style={{
                    translateX: useSpring(cursorX, { damping: 40, stiffness: 400 }),
                    translateY: useSpring(cursorY, { damping: 40, stiffness: 400 }),
                    x: -18,
                    y: -18,
                    scale: isHovered ? 1.5 : 1,
                    opacity: isHovered ? 0.5 : 0.8,
                }}
            >
                <div className="absolute inset-0 bg-accent-blue/5 rounded-full blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
        </>
    );
};

export default CustomCursor;
