import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import Magnetic from '../ui/Magnetic';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useAudio } from '../ui/AudioEngine.jsx';

const Navbar = () => {
    const { playSound } = useAudio();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isDark, setIsDark] = useState(true);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [currentTheme, setCurrentTheme] = useState('dark');
    const location = useLocation();

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100, damping: 30, restDelta: 0.001
    });

    useEffect(() => {
        // Safe access to localStorage after mount
        const saved = typeof window !== 'undefined' ? localStorage.getItem('theme') : 'dark';
        const initialDark = saved ? saved === 'dark' : true;
        setIsDark(initialDark);
        setCurrentTheme(initialDark ? 'dark' : 'silver');
        document.documentElement.setAttribute('data-theme', initialDark ? 'dark' : 'silver');

        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleTheme = () => {
        playSound('click');
        const newDark = !isDark;
        setIsDark(newDark);
        const themeLabel = newDark ? 'dark' : 'silver';
        setCurrentTheme(themeLabel);
        localStorage.setItem('theme', themeLabel);
        document.documentElement.setAttribute('data-theme', themeLabel);

        // Broadcast theme change for non-reactive components (like Three.js)
        window.dispatchEvent(new Event('theme-changed'));
    };

    const links = [
        { name: 'Home', path: '/' },
        { name: 'Work', path: '/work' },
        { name: 'The Lab', path: '/lab' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 right-0 h-[3px] z-[100] origin-left"
                style={{
                    scaleX,
                    background: 'linear-gradient(90deg, #C0C0C0 0%, #D4AF37 50%, #C0C0C0 100%)',
                    boxShadow: '0 0 10px rgba(212, 175, 55, 0.5)'
                }}
            />

            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${isScrolled ? 'py-4' : 'py-8'}`}>
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                    <Magnetic strength={0.2}>
                        <Link
                            to="/"
                            onClick={() => playSound('click')}
                            onMouseEnter={() => playSound('hover')}
                            className="text-2xl font-black tracking-tighter text-silver-primary group flex items-center gap-3"
                        >
                            <div className="w-10 h-10 rounded-none bg-silver-primary text-metal-black flex items-center justify-center text-sm font-black group-hover:bg-gold-accent transition-colors duration-500 shadow-lg">
                                AB
                            </div>
                            <span className="hidden md:block">AVISHEK<span className="text-gold-accent">.</span></span>
                        </Link>
                    </Magnetic>

                    <div className="hidden md:flex glass-metal px-10 py-4 items-center gap-12 bg-metal-black/40 border-metal-white/10 backdrop-blur-3xl shadow-2xl">
                        {links.map((link) => (
                            <Magnetic key={link.name} strength={0.3}>
                                <Link
                                    to={link.path}
                                    onClick={() => playSound('click')}
                                    onMouseEnter={() => playSound('hover')}
                                    className={`relative text-[10px] uppercase tracking-[0.4em] font-black transition-all duration-500 ${location.pathname === link.path ? 'text-gold-accent' : 'text-grey-secondary hover:text-silver-primary'}`}
                                >
                                    {link.name}
                                    {location.pathname === link.path && (
                                        <motion.div
                                            layoutId="nav-underline"
                                            className="absolute -bottom-2 left-0 w-full h-[2px] bg-gold-accent shadow-[0_0_8px_rgba(212,175,55,0.8)]"
                                        />
                                    )}
                                </Link>
                            </Magnetic>
                        ))}
                    </div>

                    <div className="flex items-center gap-6">
                        {/* Theme Visual Indicator Block */}
                        <div className="hidden lg:flex items-center gap-3 px-4 py-2 bg-metal-black/10 rounded-none border border-metal-white/5">
                            <div className={`w-2 h-2 rounded-none ${isDark ? 'bg-gold-accent animate-pulse' : 'bg-silver-primary shadow-[0_0_10px_white]'}`} />
                            <span className="text-[8px] font-black tracking-widest text-silver-primary uppercase">{currentTheme} mode</span>
                        </div>

                        <Magnetic strength={0.4}>
                            <button
                                onClick={toggleTheme}
                                onMouseEnter={() => playSound('hover')}
                                className="w-10 h-10 rounded-none border border-metal-white/10 flex items-center justify-center text-silver-primary hover:text-gold-accent hover:border-gold-accent transition-all duration-500 bg-metal-white/5"
                            >
                                {isDark ? <Sun size={18} /> : <Moon size={18} />}
                            </button>
                        </Magnetic>

                        <div className="hidden md:block">
                            <Magnetic strength={0.2}>
                                <Link
                                    to="/contact"
                                    onClick={() => playSound('click')}
                                    onMouseEnter={() => playSound('hover')}
                                    className="btn-precious shiver flex items-center gap-2 group"
                                >
                                    <span className="relative z-10">HIRE ME</span>
                                </Link>
                            </Magnetic>
                        </div>

                        <button
                            className="md:hidden text-silver-primary"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
