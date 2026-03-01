import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

/* ════════════════════════════════════════════════════════════
   CircuitTimeline — Career milestones as circuit nodes
   with animated electron flow along PCB traces
   ════════════════════════════════════════════════════════════ */

const milestones = [
    {
        id: 'nyuad',
        label: 'NYU Abu Dhabi',
        year: '2021–2025',
        detail: 'B.S. Electrical Engineering – GPA 3.85, Honors Scholar',
        x: 80, y: 100,
        type: 'ic'
    },
    {
        id: 'hackathon',
        label: 'NurseQ Hackathon',
        year: '2022',
        detail: 'Won Best Presentation — nurse scheduling optimization',
        x: 300, y: 60,
        type: 'led'
    },
    {
        id: 'photonics',
        label: 'Photonics Research',
        year: '2023–2024',
        detail: 'Waveguide simulation for microparticle sensing – Lumerical FDE/FDTD',
        x: 520, y: 140,
        type: 'sensor'
    },
    {
        id: 'capstone',
        label: 'Digital Wireless',
        year: '2025',
        detail: 'SDR-based digital communication system – MATLAB & USRP',
        x: 740, y: 80,
        type: 'ic'
    },
    {
        id: 'founders',
        label: 'Founders Award',
        year: '2025',
        detail: 'NYU Founders Day Scholar recognition',
        x: 920, y: 160,
        type: 'led'
    },
];

// Trace connections
const traces = [
    { from: 'nyuad', to: 'hackathon' },
    { from: 'hackathon', to: 'photonics' },
    { from: 'photonics', to: 'capstone' },
    { from: 'capstone', to: 'founders' },
    { from: 'nyuad', to: 'photonics' },
];

const ComponentIcon = ({ type, size = 28 }) => {
    const s = size;
    if (type === 'ic') {
        return (
            <g>
                <rect x={-s / 2} y={-s / 2} width={s} height={s} rx={2} fill="none" stroke="currentColor" strokeWidth={1.5} />
                {[-s / 3, 0, s / 3].map((offset, i) => (
                    <React.Fragment key={i}>
                        <line x1={offset} y1={-s / 2} x2={offset} y2={-s / 2 - 6} stroke="currentColor" strokeWidth={1} />
                        <line x1={offset} y1={s / 2} x2={offset} y2={s / 2 + 6} stroke="currentColor" strokeWidth={1} />
                    </React.Fragment>
                ))}
                <circle cx={-s / 3} cy={-s / 3} r={2} fill="currentColor" />
            </g>
        );
    }
    if (type === 'led') {
        return (
            <g>
                <polygon points={`0,${-s / 2} ${s / 2},${s / 3} ${-s / 2},${s / 3}`} fill="none" stroke="currentColor" strokeWidth={1.5} />
                <line x1={-s / 2} y1={s / 3} x2={s / 2} y2={s / 3} stroke="currentColor" strokeWidth={1.5} />
                {[s / 4, s / 3].map((offset, i) => (
                    <line key={i} x1={offset} y1={-s / 4 + i * 4} x2={offset + 8} y2={-s / 4 - 4 + i * 4} stroke="currentColor" strokeWidth={1} markerEnd="url(#arrowhead)" />
                ))}
            </g>
        );
    }
    // sensor
    return (
        <g>
            <circle cx={0} cy={0} r={s / 2} fill="none" stroke="currentColor" strokeWidth={1.5} />
            <path d={`M${-s / 4},0 Q0,${-s / 3} ${s / 4},0 Q0,${s / 3} ${-s / 4},0`} fill="none" stroke="currentColor" strokeWidth={1} />
        </g>
    );
};

const ElectronParticle = ({ path, delay, duration }) => {
    return (
        <motion.circle
            r={2.5}
            fill="var(--electric)"
            filter="url(#electronGlow)"
            initial={{ offsetDistance: '0%' }}
            animate={{ offsetDistance: '100%' }}
            transition={{
                duration,
                delay,
                repeat: Infinity,
                ease: 'linear',
            }}
            style={{ offsetPath: `path('${path}')`, offsetRotate: '0deg' }}
        />
    );
};

const CircuitTimeline = () => {
    const [hoveredNode, setHoveredNode] = useState(null);
    const svgRef = useRef(null);
    const [dims, setDims] = useState({ w: 1050, h: 260 });

    useEffect(() => {
        const updateDims = () => {
            if (svgRef.current?.parentElement) {
                const w = svgRef.current.parentElement.clientWidth;
                setDims({ w: Math.max(w, 600), h: 260 });
            }
        };
        updateDims();
        window.addEventListener('resize', updateDims);
        return () => window.removeEventListener('resize', updateDims);
    }, []);

    const nodeMap = {};
    milestones.forEach(m => { nodeMap[m.id] = m; });

    const scaleX = dims.w / 1050;

    const getTracePath = (from, to) => {
        const a = nodeMap[from];
        const b = nodeMap[to];
        const ax = a.x * scaleX, ay = a.y;
        const bx = b.x * scaleX, by = b.y;
        const mx = (ax + bx) / 2;
        // 90-degree PCB-style traces
        return `M${ax},${ay} L${mx},${ay} L${mx},${by} L${bx},${by}`;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full"
        >
            <div className="mb-8 flex items-center gap-4">
                <div className="w-3 h-3 bg-electric-blue pulse-glow rounded-full" />
                <span className="text-electric-blue text-[10px] font-black tracking-[0.5em] uppercase font-mono neon-text">Career Circuit</span>
            </div>

            <div className="relative w-full overflow-x-auto">
                <svg
                    ref={svgRef}
                    viewBox={`0 0 ${dims.w} ${dims.h}`}
                    className="w-full min-w-[600px]"
                    style={{ height: dims.h }}
                >
                    <defs>
                        <filter id="electronGlow">
                            <feGaussianBlur stdDeviation="3" result="blur" />
                            <feMerge>
                                <feMergeNode in="blur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                        <filter id="nodeGlow">
                            <feGaussianBlur stdDeviation="6" result="blur" />
                            <feMerge>
                                <feMergeNode in="blur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                        <marker id="arrowhead" markerWidth="6" markerHeight="4" refX="6" refY="2" orient="auto">
                            <polygon points="0 0, 6 2, 0 4" fill="currentColor" />
                        </marker>
                    </defs>

                    {/* PCB Traces */}
                    {traces.map((trace, i) => {
                        const d = getTracePath(trace.from, trace.to);
                        return (
                            <g key={i}>
                                <path
                                    d={d}
                                    fill="none"
                                    stroke="var(--gridg)"
                                    strokeWidth={2}
                                    opacity={0.5}
                                />
                                <path
                                    d={d}
                                    fill="none"
                                    stroke="var(--electric)"
                                    strokeWidth={1}
                                    strokeDasharray="6 4"
                                    opacity={0.6}
                                />
                            </g>
                        );
                    })}

                    {/* Electron particles flowing along traces */}
                    {traces.map((trace, i) => {
                        const d = getTracePath(trace.from, trace.to);
                        return (
                            <React.Fragment key={`e-${i}`}>
                                <ElectronParticle path={d} delay={i * 0.7} duration={3 + i * 0.5} />
                                <ElectronParticle path={d} delay={i * 0.7 + 1.5} duration={3 + i * 0.5} />
                            </React.Fragment>
                        );
                    })}

                    {/* Milestone Nodes */}
                    {milestones.map((m) => {
                        const mx = m.x * scaleX;
                        const isHovered = hoveredNode === m.id;
                        return (
                            <g
                                key={m.id}
                                transform={`translate(${mx}, ${m.y})`}
                                onMouseEnter={() => setHoveredNode(m.id)}
                                onMouseLeave={() => setHoveredNode(null)}
                                style={{ cursor: 'pointer' }}
                                className="transition-transform"
                            >
                                {/* Glow circle behind */}
                                {isHovered && (
                                    <circle r={30} fill="var(--electric)" opacity={0.1} filter="url(#nodeGlow)" />
                                )}

                                {/* Component icon */}
                                <g style={{ color: isHovered ? 'var(--electric)' : 'var(--silver)', transition: 'color 0.3s' }}>
                                    <ComponentIcon type={m.type} size={isHovered ? 32 : 26} />
                                </g>

                                {/* Label */}
                                <text
                                    y={-28}
                                    textAnchor="middle"
                                    fill={isHovered ? 'var(--electric)' : 'var(--silver)'}
                                    fontSize={isHovered ? 11 : 9}
                                    fontFamily="'Space Mono', monospace"
                                    fontWeight="700"
                                    letterSpacing="0.1em"
                                    style={{ transition: 'all 0.3s', textTransform: 'uppercase' }}
                                >
                                    {m.label}
                                </text>

                                {/* Year */}
                                <text
                                    y={38}
                                    textAnchor="middle"
                                    fill="var(--electric)"
                                    fontSize={8}
                                    fontFamily="'Fira Code', monospace"
                                    opacity={0.6}
                                >
                                    {m.year}
                                </text>
                            </g>
                        );
                    })}
                </svg>

                {/* Tooltip */}
                {hoveredNode && (() => {
                    const node = nodeMap[hoveredNode];
                    const mx = node.x * scaleX;
                    return (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute z-20 glass-metal p-4 neon-border max-w-[250px]"
                            style={{
                                left: Math.min(mx - 60, dims.w - 270),
                                top: node.y + 55,
                            }}
                        >
                            <p className="text-electric-blue text-[9px] font-black tracking-[0.3em] uppercase font-mono mb-1">{node.year}</p>
                            <p className="text-silver-primary text-sm font-bold font-mono">{node.label}</p>
                            <p className="text-grey-secondary text-xs mt-1">{node.detail}</p>
                        </motion.div>
                    );
                })()}
            </div>
        </motion.div>
    );
};

export default CircuitTimeline;
