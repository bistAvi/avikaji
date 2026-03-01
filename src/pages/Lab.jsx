import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SkillSphere from '../components/ui/SkillSphere';
import EnergyLevelSkills from '../components/ui/EnergyLevelSkills';
import SignalStrength from '../components/ui/SignalStrength';
import LaserCTA from '../components/ui/LaserCTA';
import Magnetic from '../components/ui/Magnetic';
import Tilt from '../components/ui/Tilt';
import { Layers, Lightbulb, Workflow, X, Cpu, Globe, Database, Network } from 'lucide-react';
import { useAudio } from '../components/ui/AudioEngine.jsx';

const BentoFeature = ({ title, icon: Icon, children, className }) => {
    return (
        <Tilt className={className}>
            <div className="glass-metal p-10 flex flex-col h-full justify-between hover:border-electric-blue/40 transition-colors bg-metal-black/40 group">
                <div className="w-12 h-12 rounded-xl bg-electric-blue/10 flex items-center justify-center text-electric-blue mb-8 group-hover:shadow-[0_0_15px_var(--glow-electric)] transition-shadow">
                    <Icon size={24} />
                </div>
                <div>
                    <h4 className="text-silver-primary font-black text-lg mb-2 uppercase tracking-tight font-mono">{title}</h4>
                    <div className="text-grey-secondary text-sm leading-relaxed">{children}</div>
                </div>
            </div>
        </Tilt>
    );
};

const Lab = () => {
    const { playSound } = useAudio();
    const [showSpecs, setShowSpecs] = useState(false);

    const specs = [
        { cat: "Photonics", item: "Lumerical FDE/FDTD", icon: <Lightbulb size={16} /> },
        { cat: "Systems", item: "Matlab & Simulink", icon: <Cpu size={16} /> },
        { cat: "Data", item: "SQL & QGIS Analysis", icon: <Database size={16} /> },
        { cat: "Compute", item: "Python / C++ Scopes", icon: <Globe size={16} /> },
        { cat: "Logic", item: "VHDL Digital Design", icon: <Network size={16} /> }
    ];

    return (
        <main className="bg-metal-black pt-48 pb-32 min-h-screen circuit-grid-bg">
            <section className="px-4 max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
                    <div className="lg:col-span-5">
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-electric-blue tracking-[1em] uppercase text-[10px] font-black mb-6 block font-mono neon-text"
                        >
                            R&D Matrix
                        </motion.span>
                        <h1 className="text-6xl md:text-8xl font-black text-silver-primary leading-[0.9] tracking-tighter mb-8">
                            Technical<br />
                            <span className="text-metallic italic">Lab.</span>
                        </h1>
                        <p className="text-grey-secondary text-lg leading-relaxed mb-12 max-w-sm">
                            Visualizing the intersection of power systems engineering and advanced photonic research.
                        </p>
                        <div className="flex gap-6">
                            <Magnetic>
                                <LaserCTA onClick={() => { playSound('click'); setShowSpecs(true); }}>
                                    <button
                                        className="px-8 py-4 bg-electric-blue text-deep-navy font-black uppercase tracking-[0.3em] text-[10px] font-mono border border-electric-blue hover:bg-transparent hover:text-electric-blue transition-all flex items-center gap-3"
                                    >
                                        Explore Specs <Cpu size={16} />
                                    </button>
                                </LaserCTA>
                            </Magnetic>
                        </div>
                    </div>

                    <div className="lg:col-span-7 relative h-[600px] flex items-center justify-center">
                        <div className="absolute inset-0 bg-electric-blue/5 rounded-full blur-[100px] -z-10" />
                        <SkillSphere />
                    </div>
                </div>

                {/* Signal Strength Divider */}
                <SignalStrength className="my-16" />

                {/* Energy Level Skills Section */}
                <div className="mb-24">
                    <EnergyLevelSkills />
                </div>

                {/* Signal Strength Divider */}
                <SignalStrength className="my-16" />

                {/* Bento Lab Breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <BentoFeature title="Photonics" icon={Lightbulb}>
                        Simulating waveguides and neuromorphic computing using <strong className="text-electric-blue">Lumerical FDE</strong> and FDTD.
                    </BentoFeature>
                    <BentoFeature title="Analytics" icon={Layers}>
                        Spatial and temporal modeling for renewable energy infrastructure with <strong className="text-electric-blue">Python/QGIS</strong>.
                    </BentoFeature>
                    <BentoFeature title="Control" icon={Workflow}>
                        Developing robust power systems and digital logic with <strong className="text-electric-blue">Matlab & VHDL</strong>.
                    </BentoFeature>
                </div>
            </section>

            {/* Technical Specs Overlay */}
            <AnimatePresence>
                {showSpecs && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12"
                    >
                        <div
                            className="absolute inset-0 bg-metal-black/90 backdrop-blur-xl"
                            onClick={() => setShowSpecs(false)}
                        />

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 50 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 50 }}
                            className="w-full max-w-2xl glass-metal p-12 relative z-10 border-electric-blue/20"
                        >
                            <button
                                onClick={() => setShowSpecs(false)}
                                className="absolute top-8 right-8 text-silver-primary hover:text-electric-blue transition-colors"
                            >
                                <X size={24} />
                            </button>

                            <div className="mb-12">
                                <span className="text-electric-blue text-[10px] font-black tracking-[0.5em] uppercase block mb-4 font-mono neon-text">Diagnostic Export</span>
                                <h2 className="text-4xl font-black text-silver-primary tracking-tighter">System <span className="text-electric-blue">Capabilities.</span></h2>
                            </div>

                            <div className="space-y-4">
                                {specs.map((s, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="flex items-center justify-between p-6 border border-electric-blue/10 hover:border-electric-blue/40 bg-electric-blue/5 transition-all group"
                                    >
                                        <div className="flex items-center gap-4">
                                            <span className="text-electric-blue">{s.icon}</span>
                                            <div>
                                                <p className="text-[10px] font-black text-grey-secondary uppercase tracking-widest font-mono">{s.cat}</p>
                                                <p className="text-xl font-bold text-silver-primary group-hover:text-electric-blue transition-colors font-mono">{s.item}</p>
                                            </div>
                                        </div>
                                        <div className="w-1.5 h-1.5 rounded-full bg-electric-blue opacity-0 group-hover:opacity-100 transition-opacity pulse-glow" />
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
};

export default Lab;
