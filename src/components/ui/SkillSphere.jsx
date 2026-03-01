import React, { useMemo, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, TrackballControls } from '@react-three/drei';
import * as THREE from 'three';

const skills = [
    'Matlab', 'Lumerical', 'Python', 'SQL', 'QGIS', 'C++', 'VHDL', 'GAMS',
    'Machine Learning', 'Simulink', 'Photonic Sim', 'R&D', 'Power Systems',
    'Digital Logic', 'Photonics', 'DSP', 'Radio', 'Encoded Comm'
];

function Word({ children, ...props }) {
    const color = new THREE.Color();
    const fontProps = {
        fontSize: 2.2,
        letterSpacing: -0.05,
        lineHeight: 1,
        'material-toneMapped': false
    };
    const ref = useRef();
    const [hovered, setHovered] = useState(false);

    const over = (e) => (e.stopPropagation(), setHovered(true));
    const out = () => setHovered(false);

    useFrame(({ camera }) => {
        if (!ref.current) return;
        ref.current.quaternion.copy(camera.quaternion);

        const palette = document.documentElement.getAttribute('data-palette');
        const theme = document.documentElement.getAttribute('data-theme');

        let baseColor, hoverColor;
        if (palette === 'classic') {
            baseColor = theme === 'silver' ? '#1a1a1a' : '#C0C0C0';
            hoverColor = '#D4AF37';
        } else {
            baseColor = theme === 'silver' ? '#2A3A5A' : '#00D9FF';
            hoverColor = '#B800FF';
        }

        ref.current.material.color.lerp(color.set(hovered ? hoverColor : baseColor), 0.1);
    });

    return (
        <Text ref={ref} onPointerOver={over} onPointerOut={out} {...fontProps} {...props}>
            {children}
        </Text>
    );
}

function Cloud({ count = 8, radius = 20 }) {
    const words = useMemo(() => {
        const temp = [];
        const spherical = new THREE.Spherical();
        const phiSpan = Math.PI / (count + 1);
        const thetaSpan = (Math.PI * 2) / count;

        let index = 0;
        for (let i = 1; i < count + 1; i++) {
            for (let j = 0; j < count; j++) {
                const word = skills[index % skills.length];
                temp.push([new THREE.Vector3().setFromSpherical(spherical.set(radius, phiSpan * i, thetaSpan * j)), word]);
                index++;
            }
        }
        return temp;
    }, [count, radius]);

    const groupRef = useRef();
    useFrame(() => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.005;
            groupRef.current.rotation.x += 0.002;
        }
    });

    return (
        <group ref={groupRef}>
            {words.map(([pos, word], index) => (
                <Word key={index} position={pos}>
                    {word}
                </Word>
            ))}
        </group>
    );
}

const SkillSphere = () => {
    const [bgColor, setBgColor] = useState('#0A1428');

    useEffect(() => {
        const updateTheme = () => {
            const palette = document.documentElement.getAttribute('data-palette');
            const theme = document.documentElement.getAttribute('data-theme');
            if (palette === 'classic') {
                setBgColor(theme === 'silver' ? '#e0e0e0' : '#050505');
            } else {
                setBgColor(theme === 'silver' ? '#F0F4FA' : '#0A1428');
            }
        };
        updateTheme();
        window.addEventListener('theme-changed', updateTheme);
        return () => window.removeEventListener('theme-changed', updateTheme);
    }, []);

    return (
        <div className="w-full h-[600px] relative pointer-events-auto">
            <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 35], fov: 90 }}>
                <fog attach="fog" args={[bgColor, 0, 80]} />
                <Cloud count={6} radius={22} />
                <TrackballControls noZoom />
            </Canvas>
            <div className="absolute inset-x-0 bottom-10 flex flex-col items-center pointer-events-none">
                <span className="text-[10px] font-black tracking-[0.5em] text-electric-blue uppercase opacity-50 font-mono">Drag to Rotate Matrix</span>
            </div>
        </div>
    );
};

export default SkillSphere;
