import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { useAudio } from './AudioEngine.jsx';

/* ════════════════════════════════════════════════════════════
   PhotonCursor — Neon-glowing cursor with particle trail
   Colors shift based on hovered element type:
     Default: electric cyan | Buttons: neon purple | 3D: glow green
   ════════════════════════════════════════════════════════════ */

const TRAIL_LENGTH = 10;
const TRAIL_COLORS = {
    default: 'rgba(0, 217, 255, ',
    button: 'rgba(184, 0, 255, ',
    link: 'rgba(0, 229, 255, ',
    interactive: 'rgba(0, 255, 65, ',
};

const MercuryCursor = () => {
    const { playSound } = useAudio();
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const [velocity, setVelocity] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const [hoverType, setHoverType] = useState('default');

    const lastX = useRef(-100);
    const lastY = useRef(-100);
    const trailCanvasRef = useRef(null);
    const trailPositions = useRef([]);
    const animFrameRef = useRef(null);

    const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
    const outSpringConfig = { damping: 30, stiffness: 150, mass: 1 };

    const x = useSpring(cursorX, springConfig);
    const y = useSpring(cursorY, springConfig);

    const outX = useSpring(cursorX, outSpringConfig);
    const outY = useSpring(cursorY, outSpringConfig);

    // Trail rendering on canvas
    const renderTrail = useCallback(() => {
        const canvas = trailCanvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const positions = trailPositions.current;
        const colorPrefix = TRAIL_COLORS[hoverType] || TRAIL_COLORS.default;

        for (let i = 0; i < positions.length; i++) {
            const pos = positions[i];
            const progress = i / positions.length;
            const alpha = progress * 0.4;
            const size = 2 + progress * 3;

            ctx.beginPath();
            ctx.arc(pos.x, pos.y, size, 0, Math.PI * 2);
            ctx.fillStyle = colorPrefix + alpha + ')';
            ctx.fill();

            // Outer glow
            ctx.beginPath();
            ctx.arc(pos.x, pos.y, size + 4, 0, Math.PI * 2);
            ctx.fillStyle = colorPrefix + (alpha * 0.2) + ')';
            ctx.fill();
        }

        animFrameRef.current = requestAnimationFrame(renderTrail);
    }, [hoverType]);

    useEffect(() => {
        animFrameRef.current = requestAnimationFrame(renderTrail);
        return () => {
            if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
        };
    }, [renderTrail]);

    useEffect(() => {
        const moveCursor = (e) => {
            const vx = e.clientX - lastX.current;
            const vy = e.clientY - lastY.current;
            setVelocity({ x: vx, y: vy });

            cursorX.set(e.clientX);
            cursorY.set(e.clientY);

            // Update trail
            trailPositions.current.push({ x: e.clientX, y: e.clientY });
            if (trailPositions.current.length > TRAIL_LENGTH) {
                trailPositions.current.shift();
            }

            lastX.current = e.clientX;
            lastY.current = e.clientY;
        };

        const handleMouseEnter = (e) => {
            playSound('hover');
            setIsHovered(true);

            const el = e.target;
            if (el.tagName === 'BUTTON' || el.closest('button')) {
                setHoverType('button');
            } else if (el.tagName === 'A' || el.closest('a')) {
                setHoverType('link');
            } else if (el.closest('canvas') || el.classList.contains('magnetic-item')) {
                setHoverType('interactive');
            } else {
                setHoverType('default');
            }
        };

        const handleMouseLeave = () => {
            setIsHovered(false);
            setHoverType('default');
        };

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

    const glowColors = {
        default: '#00D9FF',
        button: '#B800FF',
        link: '#00E5FF',
        interactive: '#00FF41',
    };

    const currentGlow = glowColors[hoverType] || glowColors.default;

    return (
        <div className="fixed inset-0 pointer-events-none z-[99999]">
            <style dangerouslySetInnerHTML={{ __html: `* { cursor: none !important; }` }} />

            {/* Particle trail canvas */}
            <canvas
                ref={trailCanvasRef}
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ zIndex: 1 }}
            />

            {/* Outer ring — pulsing neon border */}
            <motion.div
                className="absolute rounded-full"
                style={{
                    x: outX,
                    y: outY,
                    left: -20,
                    top: -20,
                    width: 40,
                    height: 40,
                    rotate: angle,
                    scaleX: isHovered ? 1.6 : scaleX,
                    scaleY: isHovered ? 1.6 : scaleY,
                    zIndex: 2,
                }}
            >
                <div
                    className="w-full h-full rounded-full transition-all duration-300"
                    style={{
                        border: `1.5px solid ${currentGlow}`,
                        boxShadow: `0 0 12px ${currentGlow}40, inset 0 0 8px ${currentGlow}15`,
                    }}
                />
            </motion.div>

            {/* Core dot — glowing photon */}
            <motion.div
                className="absolute rounded-full z-10"
                style={{
                    x,
                    y,
                    left: -5,
                    top: -5,
                    width: 10,
                    height: 10,
                    scale: isHovered ? 1.8 : 1,
                    zIndex: 3,
                }}
            >
                <div
                    className="w-full h-full rounded-full transition-colors duration-200"
                    style={{
                        backgroundColor: currentGlow,
                        boxShadow: `0 0 8px ${currentGlow}, 0 0 20px ${currentGlow}60`,
                    }}
                />
            </motion.div>
        </div>
    );
};

export default MercuryCursor;
