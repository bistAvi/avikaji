import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import NameHero from './components/hero/NameHero';
import Portfolio from './pages/Portfolio';
import Lab from './pages/Lab';
import About from './pages/About';
import Contact from './pages/Contact';
import MercuryCursor from './components/ui/MercuryCursor';

const LiquidTransition = ({ children }) => {
    return (
        <>
            <motion.div
                className="fixed inset-0 bg-silver-primary z-[99999] origin-bottom pointer-events-none"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 0 }}
                exit={{ scaleY: 1 }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
            >
                {children}
            </motion.div>
        </>
    );
};

function AppContent() {
    const location = useLocation();

    return (
        <div className="relative min-h-screen">
            <div className="metal-noise" />

            <MercuryCursor />
            <Navbar />

            <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<LiquidTransition><NameHero /></LiquidTransition>} />
                    <Route path="/work" element={<LiquidTransition><Portfolio /></LiquidTransition>} />
                    <Route path="/lab" element={<LiquidTransition><Lab /></LiquidTransition>} />
                    <Route path="/about" element={<LiquidTransition><About /></LiquidTransition>} />
                    <Route path="/contact" element={<LiquidTransition><Contact /></LiquidTransition>} />
                </Routes>
            </AnimatePresence>
        </div>
    );
}

function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    );
}

export default App;
