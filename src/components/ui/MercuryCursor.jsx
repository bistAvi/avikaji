import React, { useState, useEffect, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { useAudio } from './AudioEngine.jsx';

const MercuryCursor = () => {
    const { playSound } = useAudio();
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const [velocity, setVelocity] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const lastX = useRef(-100);
    const lastY = useRef(-100);

    const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
    const outSpringConfig = { damping: 30, stiffness: 150, mass: 1 };

    const x = useSpring(cursorX, springConfig);
    const y = useSpring(cursorY, springConfig);

    const outX = useSpring(cursorX, outSpringConfig);
    const outY = useSpring(cursorY, outSpringConfig);

    useEffect(() => {
        const moveCursor = (e) => {
            const vx = e.clientX - lastX.current;
            const vy = e.clientY - lastY.current;
            setVelocity({ x: vx, y: vy });

            cursorX.set(e.clientX);
            cursorY.set(e.clientY);

            lastX.current = e.clientX;
            lastY.current = e.clientY;
        };

        const handleMouseEnter = () => {
            playSound('hover');
            setIsHovered(true);
        };
        const handleMouseLeave = () => setIsHovered(false);

        window.addEventListener('mousemove', moveCursor);

        const magneticItems = document.querySelectorAll('button, a, .magnetic-item');
        magneticItems.forEach(item => {
            item.addEventListener('mouseenter', handleMouseEnter);
            item.addEventListener('mouseleave', handleMouseLeave);
            item.addEventListener('mousedown', () => playSound('click'));
        });

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            magneticItems.forEach(item => {
                item.removeEventListener('mouseenter', handleMouseEnter);
                item.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, [playSound]);

    const speed = Math.sqrt(velocity.x ** 2 + velocity.y ** 2);
    const scaleX = 1 + Math.min(speed / 100, 1.5);
    const scaleY = 1 - Math.min(speed / 200, 0.5);
    const angle = Math.atan2(velocity.y, velocity.x) * (180 / Math.PI);

    return (
        <div className="fixed inset-0 pointer-events-none z-[99999] gooey-container">
            <style dangerouslySetInnerHTML={{ __html: `* { cursor: none !important; }` }} />
            <svg className="hidden">
                <defs>
                    <filter id="gooey">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                        <feColorMatrix
                            in="blur"
                            mode="matrix"
                            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10"
                            result="gooey"
                        />
                        <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
                    </filter>
                </defs>
            </svg>

            <motion.div
                className="absolute w-12 h-12 rounded-full bg-silver-primary opacity-60 flex items-center justify-center"
                style={{
                    x: outX,
                    y: outY,
                    left: -24,
                    top: -24,
                    rotate: angle,
                    scaleX: isHovered ? 1.5 : scaleX,
                    scaleY: isHovered ? 1.5 : scaleY,
                }}
            >
                <div className="w-full h-full rounded-full border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.2)]" />
            </motion.div>

            <motion.div
                className="absolute w-4 h-4 rounded-full bg-white z-10"
                style={{
                    x,
                    y,
                    left: -8,
                    top: -8,
                    scale: isHovered ? 2 : 1,
                }}
                animate={{
                    backgroundColor: isHovered ? "#D4AF37" : "#FFFFFF"
                }}
            />
        </div>
    );
};

export default MercuryCursor;
