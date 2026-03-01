import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ════════════════════════════════════════════════════════════
   EnergyLevelSkills — Quantum energy level diagram
   Skills shown as electrons on discrete energy levels
   Hover = electron transition + photon emission
   ════════════════════════════════════════════════════════════ */

const skillCategories = {
    Software: [
        { name: 'Python', level: 4 },
        { name: 'MATLAB', level: 4 },
        { name: 'SQL', level: 3 },
        { name: 'C++', level: 3 },
        { name: 'React', level: 3 },
        { name: 'GAMS', level: 3 },
    ],
    Hardware: [
        { name: 'VHDL', level: 4 },
        { name: 'Simulink', level: 4 },
        { name: 'PCB Design', level: 3 },
        { name: 'USRP SDR', level: 3 },
        { name: 'Power Sys', level: 4 },
        { name: 'Digital Logic', level: 4 },
    ],
    Research: [
        { name: 'Lumerical', level: 4 },
        { name: 'FDTD', level: 4 },
        { name: 'Photonics', level: 3 },
        { name: 'ML/AI', level: 3 },
        { name: 'QGIS', level: 4 },
        { name: 'DSP', level: 4 },
    ],
};

const categoryColors = {
    Software: { electron: '#00D9FF', glow: 'rgba(0, 217, 255, 0.4)', label: 'electric-blue' },
    Hardware: { electron: '#B800FF', glow: 'rgba(184, 0, 255, 0.4)', label: 'neon-purple' },
    Research: { electron: '#00FF41', glow: 'rgba(0, 255, 65, 0.4)', label: 'glow-green' },
};

const LEVELS = [1, 2, 3, 4, 5];
const LEVEL_LABELS = ['n=1 Basic', 'n=2 Familiar', 'n=3 Proficient', 'n=4 Advanced', 'n=5 Expert'];

const EnergyLevelSkills = () => {
    const [activeCategory, setActiveCategory] = useState('Software');
    const [hoveredSkill, setHoveredSkill] = useState(null);
    const [photonEmissions, setPhotonEmissions] = useState([]);
    const containerRef = useRef(null);

    const skills = skillCategories[activeCategory];
    const colors = categoryColors[activeCategory];

    const emitPhoton = (skillName, level) => {
        const id = Date.now() + Math.random();
        setPhotonEmissions(prev => [...prev, { id, skillName, level }]);
        setTimeout(() => {
            setPhotonEmissions(prev => prev.filter(p => p.id !== id));
        }, 1000);
    };

    const CHART_HEIGHT = 320;
    const CHART_WIDTH = 700;
    const LEVEL_SPACING = CHART_HEIGHT / (LEVELS.length + 1);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full"
            ref={containerRef}
        >
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-3 h-3 rounded-full pulse-glow" style={{ backgroundColor: colors.electron }} />
                    <span className="text-electric-blue text-[10px] font-black tracking-[0.5em] uppercase font-mono neon-text">
                        Quantum Skill Matrix
                    </span>
                </div>

                {/* Category Tabs */}
                <div className="flex gap-2">
                    {Object.keys(skillCategories).map(cat => (
                        <button
                            key={cat}
                            onClick={() => { setActiveCategory(cat); setHoveredSkill(null); }}
                            className={`px-4 py-2 text-[9px] font-black tracking-[0.3em] uppercase font-mono border transition-all duration-300 ${activeCategory === cat
                                ? 'text-metal-black border-electric-blue'
                                : 'text-grey-secondary border-metal-white/10 hover:border-electric-blue/40 hover:text-silver-primary'
                                }`}
                            style={activeCategory === cat ? { backgroundColor: categoryColors[cat].electron } : {}}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Energy Level Diagram */}
            <div className="relative glass-metal p-6 md:p-10 overflow-hidden">
                <div className="relative overflow-x-auto">
                    <svg viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`} className="w-full min-w-[500px]" style={{ height: CHART_HEIGHT }}>
                        <defs>
                            <filter id="electronBloom">
                                <feGaussianBlur stdDeviation="4" result="blur" />
                                <feMerge>
                                    <feMergeNode in="blur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                            <filter id="photonTrail">
                                <feGaussianBlur stdDeviation="2" result="blur" />
                                <feMerge>
                                    <feMergeNode in="blur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>

                        {/* Energy level lines */}
                        {LEVELS.map((level, i) => {
                            const yPos = CHART_HEIGHT - (level * LEVEL_SPACING);
                            return (
                                <g key={level}>
                                    <line
                                        x1={60} y1={yPos} x2={CHART_WIDTH - 20} y2={yPos}
                                        stroke="var(--gridg)" strokeWidth={1} strokeDasharray="4 6"
                                        opacity={0.5}
                                    />
                                    <text x={8} y={yPos + 3} fill="var(--grey)" fontSize={8} fontFamily="'Fira Code', monospace" opacity={0.5}>
                                        {LEVEL_LABELS[i]}
                                    </text>
                                </g>
                            );
                        })}

                        {/* Electrons (skill dots) on levels */}
                        <AnimatePresence mode="wait">
                            {skills.map((skill, i) => {
                                const yPos = CHART_HEIGHT - (skill.level * LEVEL_SPACING);
                                const xPos = 100 + i * ((CHART_WIDTH - 140) / (skills.length - 1 || 1));
                                const isHovered = hoveredSkill === skill.name;
                                const jumpY = isHovered ? yPos - 35 : yPos;

                                return (
                                    <g
                                        key={`${activeCategory}-${skill.name}`}
                                        onMouseEnter={() => { setHoveredSkill(skill.name); emitPhoton(skill.name, skill.level); }}
                                        onMouseLeave={() => setHoveredSkill(null)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        {/* Connection line from electron to its level */}
                                        {isHovered && (
                                            <motion.line
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 0.3 }}
                                                x1={xPos} y1={yPos} x2={xPos} y2={jumpY}
                                                stroke={colors.electron}
                                                strokeWidth={1}
                                                strokeDasharray="2 3"
                                            />
                                        )}

                                        {/* Electron */}
                                        <motion.circle
                                            cx={xPos}
                                            initial={{ cy: yPos, r: 6 }}
                                            animate={{ cy: jumpY, r: isHovered ? 9 : 6 }}
                                            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                                            fill={colors.electron}
                                            opacity={isHovered ? 1 : 0.7}
                                            filter={isHovered ? 'url(#electronBloom)' : undefined}
                                        />

                                        {/* Inner glow */}
                                        <motion.circle
                                            cx={xPos}
                                            initial={{ cy: yPos }}
                                            animate={{ cy: jumpY }}
                                            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                                            r={3}
                                            fill="white"
                                            opacity={isHovered ? 0.6 : 0.3}
                                        />

                                        {/* Skill label */}
                                        <motion.text
                                            x={xPos}
                                            initial={{ y: yPos + 20 }}
                                            animate={{ y: isHovered ? jumpY + 24 : yPos + 20 }}
                                            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                                            textAnchor="middle"
                                            fill={isHovered ? colors.electron : 'var(--silver)'}
                                            fontSize={isHovered ? 10 : 8}
                                            fontFamily="'Space Mono', monospace"
                                            fontWeight="700"
                                        >
                                            {skill.name}
                                        </motion.text>
                                    </g>
                                );
                            })}
                        </AnimatePresence>

                        {/* Photon emission particles */}
                        {photonEmissions.map(p => {
                            const skill = skills.find(s => s.name === p.skillName);
                            if (!skill) return null;
                            const xPos = 100 + skills.indexOf(skill) * ((CHART_WIDTH - 140) / (skills.length - 1 || 1));
                            const yPos = CHART_HEIGHT - (skill.level * LEVEL_SPACING) - 35;

                            return (
                                <motion.g key={p.id}>
                                    {[0, 1, 2, 3].map(j => (
                                        <motion.circle
                                            key={j}
                                            cx={xPos}
                                            cy={yPos}
                                            r={2}
                                            fill={colors.electron}
                                            filter="url(#photonTrail)"
                                            initial={{ opacity: 0.8 }}
                                            animate={{
                                                cx: xPos + Math.cos(j * Math.PI / 2) * 30,
                                                cy: yPos + Math.sin(j * Math.PI / 2) * 30,
                                                opacity: 0,
                                                r: 0,
                                            }}
                                            transition={{ duration: 0.6, ease: 'easeOut' }}
                                        />
                                    ))}
                                </motion.g>
                            );
                        })}

                        {/* Y-axis label */}
                        <text x={4} y={15} fill="var(--electric)" fontSize={8} fontFamily="'Fira Code', monospace" opacity={0.4}>
                            Energy ↑
                        </text>
                    </svg>
                </div>

                {/* Legend */}
                <div className="mt-4 flex gap-6 justify-center">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.electron, boxShadow: `0 0 8px ${colors.glow}` }} />
                        <span className="text-grey-secondary text-[9px] font-mono uppercase tracking-widest">Hover to excite electron</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default EnergyLevelSkills;
