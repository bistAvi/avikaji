import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Award, Star, Zap, ChevronRight } from 'lucide-react';
import Magnetic from '../components/ui/Magnetic';
import Tilt from '../components/ui/Tilt';
import SVGDrawIcon from '../components/ui/SVGDrawIcon';

const HonorCard = ({ title, detail, organization, date, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className="group relative h-[400px] w-full flex-shrink-0 snap-start"
        >
            <Tilt className="h-full">
                <div className="glass-metal h-full p-12 flex flex-col justify-between transition-all duration-500 overflow-hidden group-hover:border-gold-accent/40 bg-metal-black/40">
                    <div className="absolute inset-x-0 bottom-0 h-1 bg-gold-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />

                    <div className="relative z-10">
                        <div className="flex items-center gap-6 mb-8">
                            <div className="w-16 h-16 rounded-none bg-gold-accent/10 flex items-center justify-center text-gold-accent gold-glow group-hover:scale-110 transition-transform duration-500">
                                <Star size={32} />
                            </div>
                            <div>
                                <span className="text-gold-accent text-[10px] font-black tracking-[0.4em] uppercase">{date}</span>
                                <h3 className="text-3xl font-black text-silver-primary group-hover:text-gold-accent transition-colors">{title}</h3>
                            </div>
                        </div>
                        <p className="text-grey-secondary text-base leading-relaxed max-w-lg group-hover:text-silver-primary transition-colors">
                            {detail}
                        </p>
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-grey-secondary text-xs font-bold uppercase tracking-widest">{organization}</span>
                        <Magnetic strength={0.2} radius={100}>
                            <div className="w-10 h-10 rounded-full border border-metal-white/10 flex items-center justify-center text-metal-white/20 group-hover:text-gold-accent group-hover:border-gold-accent transition-all">
                                <ChevronRight size={20} />
                            </div>
                        </Magnetic>
                    </div>

                    <div className="absolute -right-10 -bottom-10 text-metal-white/5 group-hover:text-gold-accent/5 transition-colors pointer-events-none">
                        <Award size={300} strokeWidth={0.5} />
                    </div>
                </div>
            </Tilt>
        </motion.div>
    );
};

const About = () => {
    const honors = [
        {
            title: 'University Honors Scholar',
            organization: 'New York University',
            date: 'Final Baccalaureate Recognition',
            detail: 'Recognized as a University Honors Scholar, placing in the highest bracket of scholastic preferment at graduation.'
        },
        {
            title: 'KU Green Campus Runner-up',
            organization: 'Khalifa University',
            date: 'Sustainability Competition',
            detail: 'Proposed a campus Carbon Footprint Calculator using card payment tracking systems for energy efficiency.'
        },
        {
            title: 'Vice Chair of Logistics',
            organization: 'Student Energy Summit',
            date: 'International Leadership',
            detail: 'Managed logistics for 600+ participants and organized workshops on energy infrastructure resilience.'
        }
    ];

    return (
        <main className="bg-metal-black pt-32 pb-24 overflow-x-hidden">
            <section className="px-4 max-w-7xl mx-auto">
                <div className="mb-24">
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-gold-accent tracking-[0.8em] uppercase text-[10px] font-black mb-6 block"
                    >
                        Professional Philosophy
                    </motion.span>
                    <h1 className="text-7xl md:text-9xl font-black text-silver-primary leading-[0.85] tracking-tighter mb-12">
                        Driven by<br />
                        <span className="text-metallic italic">Curiosity.</span>
                    </h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-48">
                    <div className="md:col-span-8 glass-metal p-12 flex flex-col justify-between">
                        <p className="text-2xl text-silver-primary leading-relaxed font-light mb-12 font-sans">
                            I am an Electrical Engineering graduate from <strong className="text-metal-white">NYU Abu Dhabi</strong> who doesn't believe in boundaries between disciplines. My work explores the fascinating dance between <strong className="text-gold-accent gold-glow px-2">electrons and photons</strong>.
                        </p>
                        <div className="flex items-end justify-between">
                            <div className="flex gap-4">
                                <div className="px-6 py-2 rounded-none border border-metal-white/10 text-[10px] font-black tracking-widest uppercase">Research</div>
                                <div className="px-6 py-2 rounded-none border border-metal-white/10 text-[10px] font-black tracking-widest uppercase">Energy</div>
                                <div className="px-6 py-2 rounded-none border border-metal-white/10 text-[10px] font-black tracking-widest uppercase">Ethics</div>
                            </div>
                            <div className="opacity-40 hover:opacity-100 transition-opacity">
                                <SVGDrawIcon
                                    size={100}
                                    path="M10 80 Q 25 10, 40 80 T 70 80 M 30 50 L 50 50 M 80 20 L 80 80"
                                    className="text-silver-primary"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="md:col-span-4 grid grid-rows-2 gap-6">
                        <div className="glass-metal p-10 gold-glow hover-lift shiver">
                            <Zap className="text-gold-accent mb-4" />
                            <h4 className="text-silver-primary font-black text-xs uppercase tracking-widest">NYU Founders</h4>
                            <p className="text-grey-secondary text-xs mt-2 italic">Founders Day Scholar Award</p>
                        </div>
                        <div className="glass-metal p-10 border-metal-white/10 hover:border-silver-primary hover-lift">
                            <h4 className="text-silver-primary font-black text-xs uppercase tracking-widest">GPA: 3.85</h4>
                            <p className="text-grey-secondary text-xs mt-2 italic">Electrical Engineering degree conferred May 2025.</p>
                        </div>
                    </div>
                </div>

                <div className="relative mb-48">
                    <div className="flex items-end justify-between mb-16">
                        <h2 className="text-5xl font-black text-silver-primary tracking-tighter">Honors <span className="text-gold-accent">&</span> Awards</h2>
                        <span className="text-[10px] font-black tracking-[0.4em] uppercase text-grey-secondary mb-2 animate-pulse">Drag to scroll context</span>
                    </div>

                    <div className="flex gap-8 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-12 cursor-grab active:cursor-grabbing">
                        {honors.map((honor, idx) => (
                            <HonorCard key={idx} index={idx} {...honor} />
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default About;
