import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import MercuryCursor from './components/ui/MercuryCursor';
import DiffractionOverlay from './components/ui/DiffractionOverlay';

// Lazy load pages for performance
const NameHero = lazy(() => import('./components/hero/NameHero'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const Lab = lazy(() => import('./pages/Lab'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));

const PageLoader = () => (
    <div className="fixed inset-0 bg-metal-black z-[10000] flex items-center justify-center">
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-12 h-12 border-2 border-electric-blue/20 border-t-electric-blue rounded-full animate-spin"
        />
    </div>
);

const LiquidTransition = ({ children }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            {children}
        </motion.div>
    );
};

function AppContent() {
    const location = useLocation();

    return (
        <div className="relative min-h-screen">
            <div className="metal-noise" />

            <MercuryCursor />
            <Navbar />
            <DiffractionOverlay />

            <AnimatePresence mode="wait">
                <Suspense fallback={<PageLoader />}>
                    <Routes location={location} key={location.pathname}>
                        <Route path="/" element={<LiquidTransition><NameHero /></LiquidTransition>} />
                        <Route path="/projects" element={<LiquidTransition><Portfolio /></LiquidTransition>} />
                        <Route path="/lab" element={<LiquidTransition><Lab /></LiquidTransition>} />
                        <Route path="/about" element={<LiquidTransition><About /></LiquidTransition>} />
                        <Route path="/contact" element={<LiquidTransition><Contact /></LiquidTransition>} />
                    </Routes>
                </Suspense>
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
