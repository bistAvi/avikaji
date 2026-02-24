import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Magnetic from '../components/ui/Magnetic';
import Tilt from '../components/ui/Tilt';

const ProjectCard = ({ title, subtitle, detail, tags, link, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`relative group ${index % 3 === 0 ? 'md:col-span-8' : 'md:col-span-4'}`}
        >
            <Tilt className="h-full">
                <div className="glass-metal h-full p-12 overflow-hidden flex flex-col justify-between hover:border-gold-accent/30 transition-all duration-700 bg-metal-black/40">
                    <div className="relative z-10">
                        <div className="flex gap-2 mb-8">
                            {tags.map(tag => (
                                <span key={tag} className="text-[8px] font-black uppercase tracking-[0.3em] text-gold-accent border border-gold-accent/20 px-3 py-1 bg-gold-accent/5">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <h3 className="text-4xl md:text-5xl font-black text-silver-primary mb-2 leading-none tracking-tighter">
                            {title}
                        </h3>
                        <p className="text-gold-accent/60 text-[10px] uppercase tracking-[0.5em] font-black mb-6">{subtitle}</p>
                        <p className="text-grey-secondary text-base max-w-md leading-relaxed">
                            {detail}
                        </p>
                    </div>

                    <div className="mt-12 flex items-center justify-between">
                        <Magnetic strength={0.3}>
                            <a href={link} className="inline-flex items-center gap-4 text-silver-primary font-black tracking-[0.4em] text-[10px] border-b-2 border-metal-white/5 pb-2 hover:border-gold-accent hover:text-gold-accent transition-all">
                                VIEW ARCHIVE <span>→</span>
                            </a>
                        </Magnetic>
                        <div className="text-metal-white/5 font-black text-8xl italic">0{index + 1}</div>
                    </div>

                    {/* Brushed Texture Layer */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none brushed-metal" />
                </div>
            </Tilt>
        </motion.div>
    );
};

const Portfolio = () => {
    const projects = [
        {
            title: 'Digital Wireless',
            subtitle: 'Capstone 2025',
            detail: 'Designed and implemented a complete digital wireless communication system using MATLAB and USRP SDR.',
            tags: ['MATLAB', 'USRP', 'DSP'],
            link: 'https://github.com/Mutuwira/Capstone-/tree/main'
        },
        {
            title: 'NurseQ',
            subtitle: 'NYUAD Hackathon',
            detail: 'Nurse scheduling optimization system; won Best Presentation.',
            tags: ['Algorithms', 'Python'],
            link: 'https://hackathon.nyuad.nyu.edu/year/2022/'
        },
        {
            title: 'River Analysis',
            subtitle: 'Mahakali Basin',
            detail: 'Spatial and temporal data analysis for flood risk patterns using QGIS and SQL.',
            tags: ['QGIS', 'SQL'],
            link: '#'
        },
        {
            title: 'Waveguide Sim',
            subtitle: 'Photonics Lab',
            detail: 'Simulation for microparticle sensing in oil pipelines.',
            tags: ['Lumerical', 'Research'],
            link: '#'
        }
    ];

    return (
        <main className="bg-metal-black pt-48 pb-32">
            <section className="px-4 max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row items-end justify-between mb-32 gap-12">
                    <div className="max-w-2xl">
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-gold-accent tracking-[1em] uppercase text-[10px] font-black mb-6 block"
                        >
                            Case Studies
                        </motion.span>
                        <h1 className="text-7xl md:text-9xl font-black text-silver-primary leading-[0.85] tracking-tighter">
                            Engineering<br /><span className="text-metallic italic">Archives.</span>
                        </h1>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    {projects.map((project, idx) => (
                        <ProjectCard key={idx} index={idx} {...project} />
                    ))}
                </div>
            </section>
        </main>
    );
};

export default Portfolio;
