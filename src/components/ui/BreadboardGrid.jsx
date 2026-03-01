import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';

/* ════════════════════════════════════════════════════════════
   BreadboardGrid — Projects displayed as electronic
   components on a breadboard with wire connections
   ════════════════════════════════════════════════════════════ */

const projects = [
    {
        id: 'wireless',
        title: 'Digital Wireless',
        subtitle: 'Capstone 2025',
        detail: 'Designed and implemented a complete digital wireless communication system using MATLAB and USRP SDR platform. End-to-end signal processing pipeline.',
        tags: ['MATLAB', 'USRP', 'DSP'],
        link: 'https://github.com/Mutuwira/Capstone-/tree/main',
        type: 'ic',
        color: '#00D9FF',
        row: 0, col: 0, span: 2,
    },
    {
        id: 'nurseq',
        title: 'NurseQ',
        subtitle: 'NYUAD Hackathon',
        detail: 'Nurse scheduling optimization system — won Best Presentation. Algorithmic approach to workforce scheduling.',
        tags: ['Algorithms', 'Python'],
        link: 'https://hackathon.nyuad.nyu.edu/year/2022/',
        type: 'led',
        color: '#00FF41',
        row: 0, col: 2, span: 1,
    },
    {
        id: 'river',
        title: 'River Analysis',
        subtitle: 'Mahakali Basin',
        detail: 'Spatial and temporal data analysis for flood risk patterns in the Mahakali River Basin using QGIS and SQL.',
        tags: ['QGIS', 'SQL'],
        link: '#',
        type: 'resistor',
        color: '#B800FF',
        row: 1, col: 0, span: 1,
    },
    {
        id: 'waveguide',
        title: 'Waveguide Sim',
        subtitle: 'Photonics Lab',
        detail: 'Simulation for microparticle sensing in oil pipelines using Lumerical FDE waveguide solvers.',
        tags: ['Lumerical', 'Research'],
        link: '#',
        type: 'sensor',
        color: '#FFD700',
        row: 1, col: 1, span: 2,
    },
];

const wires = [
    { from: 'wireless', to: 'nurseq' },
    { from: 'wireless', to: 'river' },
    { from: 'river', to: 'waveguide' },
    { from: 'nurseq', to: 'waveguide' },
];

const ComponentShape = ({ type, color, isHovered }) => {
    const glowStyle = isHovered ? { filter: `drop-shadow(0 0 8px ${color}) drop-shadow(0 0 16px ${color}40)` } : {};

    if (type === 'ic') {
        return (
            <svg width="48" height="48" viewBox="0 0 48 48" style={glowStyle}>
                <rect x={8} y={8} width={32} height={32} rx={2} fill="none" stroke={color} strokeWidth={1.5} />
                {[16, 24, 32].map(pos => (
                    <React.Fragment key={pos}>
                        <line x1={pos} y1={8} x2={pos} y2={2} stroke={color} strokeWidth={1} />
                        <line x1={pos} y1={40} x2={pos} y2={46} stroke={color} strokeWidth={1} />
                    </React.Fragment>
                ))}
                {[16, 24, 32].map(pos => (
                    <React.Fragment key={`h-${pos}`}>
                        <line x1={8} y1={pos} x2={2} y2={pos} stroke={color} strokeWidth={1} />
                        <line x1={40} y1={pos} x2={46} y2={pos} stroke={color} strokeWidth={1} />
                    </React.Fragment>
                ))}
                <circle cx={14} cy={14} r={2} fill={color} />
            </svg>
        );
    }
    if (type === 'led') {
        return (
            <svg width="48" height="48" viewBox="0 0 48 48" style={glowStyle}>
                <polygon points="24,6 42,36 6,36" fill="none" stroke={color} strokeWidth={1.5} />
                <line x1={6} y1={36} x2={42} y2={36} stroke={color} strokeWidth={1.5} />
                <line x1={24} y1={36} x2={24} y2={46} stroke={color} strokeWidth={1} />
                <line x1={36} y1={14} x2={44} y2={8} stroke={color} strokeWidth={1} />
                <line x1={40} y1={18} x2={46} y2={12} stroke={color} strokeWidth={1} />
            </svg>
        );
    }
    if (type === 'resistor') {
        return (
            <svg width="48" height="48" viewBox="0 0 48 48" style={glowStyle}>
                <line x1={0} y1={24} x2={8} y2={24} stroke={color} strokeWidth={1.5} />
                <polyline points="8,24 12,12 18,36 24,12 30,36 36,12 40,24" fill="none" stroke={color} strokeWidth={1.5} />
                <line x1={40} y1={24} x2={48} y2={24} stroke={color} strokeWidth={1.5} />
            </svg>
        );
    }
    // sensor
    return (
        <svg width="48" height="48" viewBox="0 0 48 48" style={glowStyle}>
            <circle cx={24} cy={24} r={18} fill="none" stroke={color} strokeWidth={1.5} />
            <path d="M14,24 Q24,10 34,24 Q24,38 14,24" fill="none" stroke={color} strokeWidth={1} />
            <circle cx={24} cy={24} r={3} fill={color} opacity={0.5} />
        </svg>
    );
};

const BreadboardGrid = () => {
    const [selectedProject, setSelectedProject] = useState(null);
    const [hoveredProject, setHoveredProject] = useState(null);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full"
        >
            {/* Header */}
            <div className="flex items-center gap-4 mb-10">
                <div className="w-3 h-3 bg-electric-blue pulse-glow rounded-full" />
                <span className="text-electric-blue text-[10px] font-black tracking-[0.5em] uppercase font-mono neon-text">
                    Photonic System Grid
                </span>
            </div>

            {/* Breadboard Surface */}
            <div className="relative glass-metal p-6 md:p-10 overflow-hidden">
                {/* Dot-grid pattern */}
                <div
                    className="absolute inset-0 opacity-20 pointer-events-none"
                    style={{
                        backgroundImage: 'radial-gradient(circle, var(--gridg) 1px, transparent 1px)',
                        backgroundSize: '20px 20px',
                    }}
                />

                {/* Wire SVG overlay */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-[1]" preserveAspectRatio="none">
                    {wires.map((wire, i) => {
                        const fromP = projects.find(p => p.id === wire.from);
                        const toP = projects.find(p => p.id === wire.to);
                        if (!fromP || !toP) return null;

                        // Approximate positions based on grid
                        const cols = 3;
                        const fromX = ((fromP.col + fromP.span / 2) / cols) * 100;
                        const fromY = (fromP.row + 0.5) / 2 * 100;
                        const toX = ((toP.col + toP.span / 2) / cols) * 100;
                        const toY = (toP.row + 0.5) / 2 * 100;

                        const isActive = hoveredProject === wire.from || hoveredProject === wire.to;

                        return (
                            <line
                                key={i}
                                x1={`${fromX}%`} y1={`${fromY}%`}
                                x2={`${toX}%`} y2={`${toY}%`}
                                stroke={isActive ? 'var(--electric)' : 'var(--gridg)'}
                                strokeWidth={isActive ? 2 : 1}
                                strokeDasharray={isActive ? 'none' : '4 6'}
                                opacity={isActive ? 0.8 : 0.3}
                                style={{ transition: 'all 0.3s ease' }}
                            />
                        );
                    })}
                </svg>

                {/* Project Component Grid */}
                <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {projects.map((project) => {
                        const isHovered = hoveredProject === project.id;
                        return (
                            <motion.div
                                key={project.id}
                                className={`group relative p-8 border transition-all duration-500 cursor-pointer bg-metal-black/40 ${project.span === 2 ? 'md:col-span-2' : ''
                                    } ${isHovered ? 'border-electric-blue/50' : 'border-metal-white/5'}`}
                                style={isHovered ? { boxShadow: `0 0 25px ${project.color}20, inset 0 0 20px ${project.color}05` } : {}}
                                onMouseEnter={() => setHoveredProject(project.id)}
                                onMouseLeave={() => setHoveredProject(null)}
                                onClick={() => setSelectedProject(project)}
                                whileHover={{ y: -4 }}
                            >
                                {/* Component Icon + Title row */}
                                <div className="flex items-center gap-5 mb-6">
                                    <ComponentShape type={project.type} color={project.color} isHovered={isHovered} />
                                    <div>
                                        <h3 className="text-xl font-black text-silver-primary font-mono group-hover:text-electric-blue transition-colors">
                                            {project.title}
                                        </h3>
                                        <span className="text-[9px] font-black tracking-[0.4em] uppercase font-mono" style={{ color: project.color, opacity: 0.6 }}>
                                            {project.subtitle}
                                        </span>
                                    </div>
                                </div>

                                {/* Tags */}
                                <div className="flex gap-2 flex-wrap mb-4">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="tech-tag" style={{ borderColor: project.color, color: project.color }}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Brief */}
                                <p className="text-grey-secondary text-xs leading-relaxed line-clamp-2 group-hover:text-silver-primary transition-colors">
                                    {project.detail}
                                </p>

                                {/* Status LED */}
                                <div className="absolute top-4 right-4 flex items-center gap-2">
                                    <div
                                        className="w-2 h-2 rounded-full"
                                        style={{
                                            backgroundColor: project.color,
                                            boxShadow: isHovered ? `0 0 8px ${project.color}` : 'none',
                                            transition: 'box-shadow 0.3s',
                                        }}
                                    />
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Project Detail Overlay */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12"
                    >
                        <div className="absolute inset-0 bg-metal-black/90 backdrop-blur-xl" onClick={() => setSelectedProject(null)} />

                        <motion.div
                            initial={{ scale: 0.9, y: 40, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.9, y: 40, opacity: 0 }}
                            className="relative z-10 w-full max-w-lg glass-metal p-10"
                            style={{ borderColor: selectedProject.color + '40' }}
                        >
                            <button onClick={() => setSelectedProject(null)} className="absolute top-6 right-6 text-grey-secondary hover:text-silver-primary transition-colors">
                                <X size={20} />
                            </button>

                            <div className="flex items-center gap-4 mb-6">
                                <ComponentShape type={selectedProject.type} color={selectedProject.color} isHovered />
                                <div>
                                    <h2 className="text-2xl font-black text-silver-primary font-mono">{selectedProject.title}</h2>
                                    <span className="text-[9px] font-black tracking-[0.4em] uppercase font-mono" style={{ color: selectedProject.color }}>
                                        {selectedProject.subtitle}
                                    </span>
                                </div>
                            </div>

                            <div className="flex gap-2 flex-wrap mb-6">
                                {selectedProject.tags.map(tag => (
                                    <span key={tag} className="tech-tag" style={{ borderColor: selectedProject.color, color: selectedProject.color }}>
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <p className="text-grey-secondary text-sm leading-relaxed mb-8">{selectedProject.detail}</p>

                            {selectedProject.link !== '#' && (
                                <a
                                    href={selectedProject.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-6 py-3 font-black uppercase tracking-[0.3em] text-[9px] font-mono border transition-all hover-lift"
                                    style={{ borderColor: selectedProject.color, color: selectedProject.color }}
                                >
                                    View Source <ExternalLink size={12} />
                                </a>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default BreadboardGrid;
