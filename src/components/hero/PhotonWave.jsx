import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/* ════════════════════════════════════════════════════════════
   PhotonWave — Animated Electromagnetic Wave Visualization
   E-field (vertical, cyan) + B-field (horizontal, purple)
   propagating along the Z-axis with floating photon particles
   ════════════════════════════════════════════════════════════ */

// ── Electromagnetic Wave Mesh ──
function EMWave({ mouse }) {
    const eFieldRef = useRef();
    const bFieldRef = useRef();
    const axisRef = useRef();

    const POINTS = 200;
    const WAVE_LENGTH = 30;
    const AMPLITUDE = 2.5;

    // Create geometry buffers
    const ePositions = useMemo(() => new Float32Array(POINTS * 3), []);
    const bPositions = useMemo(() => new Float32Array(POINTS * 3), []);
    const eColors = useMemo(() => new Float32Array(POINTS * 3), []);
    const bColors = useMemo(() => new Float32Array(POINTS * 3), []);

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime();

        // Mouse influence on amplitude & frequency
        const mx = mouse.current.x * 0.5;
        const my = mouse.current.y * 0.5;
        const ampMod = 1 + my * 0.3;
        const freqMod = 1 + mx * 0.15;

        for (let i = 0; i < POINTS; i++) {
            const frac = i / (POINTS - 1);
            const z = (frac - 0.5) * WAVE_LENGTH;
            const phase = frac * Math.PI * 4 * freqMod - t * 2;

            // E-field: vertical oscillation (Y)
            const ey = Math.sin(phase) * AMPLITUDE * ampMod;
            ePositions[i * 3] = 0;
            ePositions[i * 3 + 1] = ey;
            ePositions[i * 3 + 2] = z;

            // B-field: horizontal oscillation (X), π/2 phase offset
            const bx = Math.sin(phase + Math.PI / 2) * AMPLITUDE * ampMod;
            bPositions[i * 3] = bx;
            bPositions[i * 3 + 1] = 0;
            bPositions[i * 3 + 2] = z;

            // Color: spectrum shift along the wave
            const hueE = 0.52 + frac * 0.08 + Math.sin(t * 0.5) * 0.05;  // cyan range
            const hueB = 0.78 + frac * 0.06 + Math.sin(t * 0.3) * 0.04;  // purple range
            const colorE = new THREE.Color().setHSL(hueE, 1, 0.55);
            const colorB = new THREE.Color().setHSL(hueB, 1, 0.5);

            eColors[i * 3] = colorE.r;
            eColors[i * 3 + 1] = colorE.g;
            eColors[i * 3 + 2] = colorE.b;

            bColors[i * 3] = colorB.r;
            bColors[i * 3 + 1] = colorB.g;
            bColors[i * 3 + 2] = colorB.b;
        }

        if (eFieldRef.current) {
            eFieldRef.current.geometry.attributes.position.needsUpdate = true;
            eFieldRef.current.geometry.attributes.color.needsUpdate = true;
        }
        if (bFieldRef.current) {
            bFieldRef.current.geometry.attributes.position.needsUpdate = true;
            bFieldRef.current.geometry.attributes.color.needsUpdate = true;
        }
    });

    return (
        <group rotation={[0, 0.3, 0.1]}>
            {/* E-Field Wave */}
            <line ref={eFieldRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={POINTS}
                        array={ePositions}
                        itemSize={3}
                    />
                    <bufferAttribute
                        attach="attributes-color"
                        count={POINTS}
                        array={eColors}
                        itemSize={3}
                    />
                </bufferGeometry>
                <lineBasicMaterial vertexColors transparent opacity={0.9} linewidth={2} />
            </line>

            {/* B-Field Wave */}
            <line ref={bFieldRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={POINTS}
                        array={bPositions}
                        itemSize={3}
                    />
                    <bufferAttribute
                        attach="attributes-color"
                        count={POINTS}
                        array={bColors}
                        itemSize={3}
                    />
                </bufferGeometry>
                <lineBasicMaterial vertexColors transparent opacity={0.7} linewidth={2} />
            </line>

            {/* Propagation Axis */}
            <line ref={axisRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={2}
                        array={new Float32Array([0, 0, -WAVE_LENGTH / 2, 0, 0, WAVE_LENGTH / 2])}
                        itemSize={3}
                    />
                </bufferGeometry>
                <lineBasicMaterial color="#ffffff" transparent opacity={0.08} />
            </line>
        </group>
    );
}

// ── Floating Photon Particles ──
function PhotonParticles({ count = 150, mouse }) {
    const meshRef = useRef();

    const [positions, velocities, colors] = useMemo(() => {
        const pos = new Float32Array(count * 3);
        const vel = new Float32Array(count * 3);
        const col = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 30;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 30;

            vel[i * 3] = (Math.random() - 0.5) * 0.01;
            vel[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
            vel[i * 3 + 2] = (Math.random() - 0.5) * 0.01;

            // Random color: cyan, purple, or green photons
            const type = Math.random();
            if (type < 0.5) {
                col[i * 3] = 0; col[i * 3 + 1] = 0.85; col[i * 3 + 2] = 1;    // cyan
            } else if (type < 0.8) {
                col[i * 3] = 0.72; col[i * 3 + 1] = 0; col[i * 3 + 2] = 1;   // purple
            } else {
                col[i * 3] = 0; col[i * 3 + 1] = 1; col[i * 3 + 2] = 0.25;   // green
            }
        }
        return [pos, vel, col];
    }, [count]);

    useFrame(({ clock }) => {
        if (!meshRef.current) return;
        const posAttr = meshRef.current.geometry.attributes.position;
        const t = clock.getElapsedTime();

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            posAttr.array[i3] += velocities[i3] + Math.sin(t + i) * 0.003;
            posAttr.array[i3 + 1] += velocities[i3 + 1] + Math.cos(t * 0.7 + i) * 0.002;
            posAttr.array[i3 + 2] += velocities[i3 + 2];

            // Subtle mouse attraction
            posAttr.array[i3] += mouse.current.x * 0.001;
            posAttr.array[i3 + 1] += mouse.current.y * 0.001;

            // Wrap around boundaries
            if (Math.abs(posAttr.array[i3]) > 18) posAttr.array[i3] *= -0.5;
            if (Math.abs(posAttr.array[i3 + 1]) > 12) posAttr.array[i3 + 1] *= -0.5;
            if (Math.abs(posAttr.array[i3 + 2]) > 18) posAttr.array[i3 + 2] *= -0.5;
        }
        posAttr.needsUpdate = true;
    });

    return (
        <points ref={meshRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={count}
                    array={colors}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                vertexColors
                size={0.08}
                transparent
                opacity={0.6}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </points>
    );
}

// ── Slow Camera Drift ──
function CameraDrift() {
    useFrame(({ camera, clock }) => {
        const t = clock.getElapsedTime();
        camera.position.x = Math.sin(t * 0.1) * 1.5;
        camera.position.y = Math.cos(t * 0.08) * 0.8;
        camera.lookAt(0, 0, 0);
    });
    return null;
}

// ── Main Scene ──
function WaveScene({ mouse }) {
    const { gl } = useThree();

    useEffect(() => {
        const updateTheme = () => {
            const palette = document.documentElement.getAttribute('data-palette');
            const theme = document.documentElement.getAttribute('data-theme');
            if (palette === 'classic') {
                gl.setClearColor(theme === 'silver' ? '#F8F9FA' : '#050505', 1);
            } else {
                gl.setClearColor(theme === 'silver' ? '#F0F4FA' : '#0A1428', 1);
            }
        };
        updateTheme();
        window.addEventListener('theme-changed', updateTheme);
        return () => window.removeEventListener('theme-changed', updateTheme);
    }, [gl]);

    return (
        <>
            <CameraDrift />
            <EMWave mouse={mouse} />
            <PhotonParticles count={120} mouse={mouse} />
            <ambientLight intensity={0.3} />
        </>
    );
}

// ── Exported Component ──
const PhotonWave = () => {
    const mouse = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const handleMove = (e) => {
            mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener('mousemove', handleMove);
        return () => window.removeEventListener('mousemove', handleMove);
    }, []);

    return (
        <div className="absolute inset-0 z-0">
            <Canvas
                dpr={[1, 1.5]}
                camera={{ position: [0, 0, 12], fov: 60 }}
                gl={{ antialias: true, alpha: false }}
            >
                <WaveScene mouse={mouse} />
            </Canvas>
        </div>
    );
};

export default PhotonWave;
