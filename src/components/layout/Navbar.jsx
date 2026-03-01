import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import Magnetic from '../ui/Magnetic';
import LaserCTA from '../ui/LaserCTA';
import { Moon, Sun, Menu, X, Palette } from 'lucide-react';
import { useAudio } from '../ui/AudioEngine.jsx';
import FiberPulse from '../ui/FiberPulse';

const Navbar = () => {
    const { playSound } = useAudio();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isDark, setIsDark] = useState(true);
    const [isClassic, setIsClassic] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100, damping: 30, restDelta: 0.001
    });

    useEffect(() => {
        const savedTheme = typeof window !== 'undefined' ? localStorage.getItem('theme') : 'dark';
        const savedPalette = typeof window !== 'undefined' ? localStorage.getItem('palette') : 'photonics';
        const initialDark = savedTheme ? savedTheme === 'dark' : true;
        const initialClassic = savedPalette === 'classic';

        setIsDark(initialDark);
        setIsClassic(initialClassic);
        document.documentElement.setAttribute('data-theme', initialDark ? 'dark' : 'silver');
        if (initialClassic) {
            document.documentElement.setAttribute('data-palette', 'classic');
        } else {
            document.documentElement.removeAttribute('data-palette');
        }

        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleTheme = () => {
        playSound('click');
        const newDark = !isDark;
        setIsDark(newDark);
        const themeLabel = newDark ? 'dark' : 'silver';
        localStorage.setItem('theme', themeLabel);
        document.documentElement.setAttribute('data-theme', themeLabel);
        window.dispatchEvent(new Event('theme-changed'));
    };

    const togglePalette = () => {
        playSound('click');
        const newClassic = !isClassic;
        setIsClassic(newClassic);
        if (newClassic) {
            document.documentElement.setAttribute('data-palette', 'classic');
            localStorage.setItem('palette', 'classic');
        } else {
            document.documentElement.removeAttribute('data-palette');
            localStorage.setItem('palette', 'photonics');
        }
        window.dispatchEvent(new Event('theme-changed'));
    };

    const links = [
        { name: 'Home', path: '/' },
        { name: 'Projects', path: '/projects' },
        { name: 'The Lab', path: '/lab' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ];

    const themeLabel = isDark ? 'dark' : 'lab';

    return (
        <>
            {/* Progress bar — spectrum gradient */}
            <div className="fixed top-0 left-0 w-full h-[3px] z-[1000] pointer-events-none">
                <FiberPulse progress={scrollYProgress} />
            </div>

            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${isScrolled ? 'py-4' : 'py-8'}`}>
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                    {/* Logo */}
                    <Magnetic strength={0.2}>
                        <Link
                            to="/"
                            onClick={() => playSound('click')}
                            onMouseEnter={() => playSound('hover')}
                            className="text-2xl font-black tracking-tighter text-silver-primary group flex items-center gap-3"
                        >
                            <div className={`w-10 h-10 rounded-none flex items-center justify-center text-sm font-black transition-all duration-500 shadow-lg font-mono border ${isClassic
                                ? 'bg-silver-primary text-metal-black group-hover:bg-gold-accent'
                                : 'bg-transparent text-electric-blue border-electric-blue group-hover:bg-electric-blue group-hover:text-metal-black electric-pulse'
                                }`}>
                                AB
                            </div>
                            <span className="hidden md:block font-mono">
                                AVISHEK<span className="text-gold-accent">.</span>
                            </span>
                        </Link>
                    </Magnetic>

                    {/* Desktop Nav Links */}
                    <div className={`hidden md:flex px-10 py-4 items-center gap-12 backdrop-blur-3xl shadow-2xl transition-all duration-500 ${isClassic
                        ? 'glass-metal bg-metal-black/40 border-metal-white/10'
                        : 'bg-deep-navy/60 border border-electric-blue/10'
                        } ${isScrolled && !isClassic ? 'neon-border' : ''}`}>
                        {links.map((link) => (
                            <Magnetic key={link.name} strength={0.3}>
                                <Link
                                    to={link.path}
                                    onClick={() => playSound('click')}
                                    onMouseEnter={() => playSound('hover')}
                                    className={`relative text-[10px] uppercase tracking-[0.4em] font-black font-mono transition-all duration-500 ${location.pathname === link.path
                                        ? 'text-gold-accent'
                                        : 'text-grey-secondary hover:text-silver-primary'
                                        }`}
                                >
                                    {link.name}
                                    {location.pathname === link.path && (
                                        <motion.div
                                            layoutId="nav-underline"
                                            className="absolute -bottom-2 left-0 w-full h-[2px]"
                                            style={{
                                                background: isClassic ? '#D4AF37' : '#00D9FF',
                                                boxShadow: isClassic
                                                    ? '0 0 8px rgba(212, 175, 55, 0.8)'
                                                    : '0 0 10px rgba(0, 217, 255, 0.8)',
                                            }}
                                        />
                                    )}
                                </Link>
                            </Magnetic>
                        ))}
                    </div>

                    {/* Right Controls */}
                    <div className="flex items-center gap-4">
                        {/* Theme Label */}
                        <div className="hidden lg:flex items-center gap-3 px-4 py-2 bg-metal-black/10 rounded-none border border-metal-white/5">
                            <div className={`w-2 h-2 rounded-full ${isDark ? 'bg-electric-blue pulse-glow' : 'bg-silver-primary shadow-[0_0_10px_white]'}`} />
                            <span className="text-[8px] font-black tracking-widest text-silver-primary uppercase font-mono">{themeLabel} mode</span>
                        </div>

                        {/* Palette Toggle (Classic / Photonics) */}
                        <Magnetic strength={0.3}>
                            <button
                                onClick={togglePalette}
                                onMouseEnter={() => playSound('hover')}
                                title={isClassic ? 'Switch to Photonics' : 'Switch to Classic'}
                                className={`w-10 h-10 rounded-none border flex items-center justify-center transition-all duration-500 ${isClassic
                                    ? 'border-metal-white/10 text-silver-primary hover:text-gold-accent hover:border-gold-accent bg-metal-white/5'
                                    : 'border-electric-blue/30 text-electric-blue hover:text-neon-purple hover:border-neon-purple bg-electric-blue/5'
                                    }`}
                            >
                                <Palette size={16} />
                            </button>
                        </Magnetic>

                        {/* Dark/Light Toggle */}
                        <Magnetic strength={0.4}>
                            <button
                                onClick={toggleTheme}
                                onMouseEnter={() => playSound('hover')}
                                className={`w-10 h-10 rounded-none border flex items-center justify-center transition-all duration-500 ${isClassic
                                    ? 'border-metal-white/10 text-silver-primary hover:text-gold-accent hover:border-gold-accent bg-metal-white/5'
                                    : 'border-electric-blue/30 text-electric-blue hover:text-neon-purple hover:border-neon-purple bg-electric-blue/5'
                                    }`}
                            >
                                {isDark ? <Sun size={18} /> : <Moon size={18} />}
                            </button>
                        </Magnetic>

                        {/* Hire Me CTA */}
                        <div className="hidden md:block">
                            <LaserCTA>
                                <Link
                                    to="/contact"
                                    onClick={() => playSound('click')}
                                    onMouseEnter={() => playSound('hover')}
                                    className={`px-10 py-5 font-black tracking-[0.4em] text-[10px] items-center transition-all border ${isClassic
                                        ? 'btn-precious'
                                        : 'bg-electric-blue text-deep-navy hover:bg-transparent hover:text-electric-blue border-electric-blue'
                                        }`}
                                >
                                    HIRE ME
                                </Link>
                            </LaserCTA>
                        </div>

                        {/* Mobile Menu Toggle */}
                        <button
                            className="md:hidden text-silver-primary"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="md:hidden mt-4 mx-6 p-6 bg-deep-navy/95 backdrop-blur-xl border border-electric-blue/20"
                    >
                        {links.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                onClick={() => { playSound('click'); setMobileMenuOpen(false); }}
                                className={`block py-3 text-sm uppercase tracking-[0.3em] font-black font-mono transition-colors ${location.pathname === link.path ? 'text-gold-accent' : 'text-grey-secondary hover:text-silver-primary'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </motion.div>
                )}
            </nav>
        </>
    );
};

export default Navbar;
