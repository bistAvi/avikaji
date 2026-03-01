import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Magnetic from '../components/ui/Magnetic';
import { Mail, Linkedin, MapPin, Send, CheckCircle, AlertTriangle } from 'lucide-react';
import { useAudio } from '../components/ui/AudioEngine.jsx';
import MotherboardTraces from '../components/ui/MotherboardTraces';

const ContactItem = ({ icon: Icon, label, value, link }) => {
    const { playSound } = useAudio();
    return (
        <Magnetic strength={0.2} radius={100}>
            <a href={link} target="_blank" rel="noopener noreferrer" onClick={() => playSound('click')} onMouseEnter={() => playSound('hover')} className="group flex items-center gap-6 p-6 glass-metal hover:border-electric-blue/40 transition-all duration-500">
                <div className="w-14 h-14 rounded-none bg-electric-blue/10 flex items-center justify-center text-electric-blue group-hover:bg-electric-blue group-hover:text-metal-black transition-all duration-500">
                    <Icon size={24} />
                </div>
                <div>
                    <p className="text-[10px] font-black tracking-[0.3em] text-grey-secondary uppercase mb-1 font-mono">{label}</p>
                    <p className="text-lg font-bold text-silver-primary group-hover:text-electric-blue transition-colors font-mono">{value}</p>
                </div>
            </a>
        </Magnetic>
    );
};

const Contact = () => {
    const { playSound } = useAudio();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [isTyping, setIsTyping] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        type: 'hiring',
        urgency: 'low',
        message: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (!isTyping) {
            setIsTyping(true);
            setTimeout(() => setIsTyping(false), 2000);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        playSound('click');

        try {
            const response = await fetch('http://localhost:5001/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (data.success) {
                setIsSubmitted(true);
                playSound('success');
            } else {
                setError(data.message || "Failed to transmit message.");
            }
        } catch (err) {
            console.error('Transmission Error:', err);
            setError("Transmission node offline. Start 'node server/index.js' to enable.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="bg-metal-black pt-32 pb-24 min-h-screen relative overflow-hidden circuit-grid-bg">
            <MotherboardTraces isTyping={isTyping} />
            <section className="px-4 max-w-7xl mx-auto relative z-10">
                <div className="mb-24">
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-electric-blue tracking-[0.8em] uppercase text-[10px] font-black mb-6 block font-mono neon-text"
                    >
                        Contact System
                    </motion.span>
                    <h1 className="text-7xl md:text-9xl font-black text-silver-primary leading-[0.85] tracking-tighter mb-12">
                        General<br />
                        <span className="text-metallic italic">Inquiry.</span>
                    </h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-32">
                    <div className="lg:col-span-8 glass-metal p-12">
                        <AnimatePresence mode="wait">
                            {!isSubmitted ? (
                                <motion.form
                                    key="contact-form"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    onSubmit={handleSubmit}
                                    className="relative z-10 space-y-10"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                        <div className="space-y-4">
                                            <label className="text-electric-blue text-[10px] font-black tracking-[0.5em] uppercase font-mono block">Identity</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                placeholder="Your Name"
                                                required
                                                className="w-full bg-transparent border-b border-white/10 py-4 text-silver-primary font-mono focus:border-electric-blue outline-none transition-all placeholder:text-grey-secondary/30"
                                            />
                                        </div>
                                        <div className="space-y-4">
                                            <label className="text-electric-blue text-[10px] font-black tracking-[0.5em] uppercase font-mono block">Email Node</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                placeholder="email@example.com"
                                                required
                                                className="w-full bg-transparent border-b border-white/10 py-4 text-silver-primary font-mono focus:border-electric-blue outline-none transition-all placeholder:text-grey-secondary/30"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                        <div className="space-y-4">
                                            <label className="text-electric-blue text-[10px] font-black tracking-[0.5em] uppercase font-mono block">Inquiry Type</label>
                                            <select
                                                name="type"
                                                value={formData.type}
                                                onChange={handleInputChange}
                                                className="w-full bg-transparent border-b border-white/10 py-4 text-silver-primary font-mono focus:border-electric-blue outline-none transition-all cursor-pointer"
                                            >
                                                <option value="hiring" className="bg-metal-black">Career Opportunity / Hiring</option>
                                                <option value="project" className="bg-metal-black">Project Collaboration</option>
                                                <option value="research" className="bg-metal-black">Photonic Research</option>
                                                <option value="general" className="bg-metal-black">General Transmission</option>
                                            </select>
                                        </div>
                                        <div className="space-y-4">
                                            <label className="text-electric-blue text-[10px] font-black tracking-[0.5em] uppercase font-mono block">Urgency</label>
                                            <select
                                                name="urgency"
                                                value={formData.urgency}
                                                onChange={handleInputChange}
                                                className="w-full bg-transparent border-b border-white/10 py-4 text-silver-primary font-mono focus:border-electric-blue outline-none transition-all cursor-pointer"
                                            >
                                                <option value="low" className="bg-metal-black">Standard</option>
                                                <option value="medium" className="bg-metal-black">Priority</option>
                                                <option value="high" className="bg-metal-black">Critical / Immediate</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <label className="text-electric-blue text-[10px] font-black tracking-[0.5em] uppercase font-mono block">Detailed Brief</label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            placeholder="How can we collaborate?"
                                            required
                                            rows={5}
                                            className="w-full bg-transparent border-b border-white/10 py-4 text-silver-primary font-mono focus:border-electric-blue outline-none transition-all placeholder:text-grey-secondary/30 resize-none"
                                        />
                                    </div>

                                    {error && (
                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3 text-warning-red text-xs font-bold uppercase tracking-widest bg-warning-red/10 p-4 border border-warning-red/20 font-mono">
                                            <AlertTriangle size={16} /> {error}
                                        </motion.div>
                                    )}

                                    <Magnetic strength={0.1}>
                                        <button
                                            disabled={isSubmitting}
                                            type="submit"
                                            onMouseEnter={() => playSound('hover')}
                                            className="group flex items-center gap-4 px-12 py-6 bg-electric-blue text-deep-navy font-black uppercase tracking-[0.4em] text-[10px] overflow-hidden relative disabled:opacity-50 font-mono border border-electric-blue hover:bg-transparent hover:text-electric-blue transition-all"
                                        >
                                            <span className="relative z-10 flex items-center gap-3">
                                                {isSubmitting ? 'Transmitting...' : (
                                                    <>Dispatch Message <Send size={16} /></>
                                                )}
                                            </span>
                                        </button>
                                    </Magnetic>
                                </motion.form>
                            ) : (
                                <motion.div
                                    key="success-message"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center space-y-8 py-20 relative z-10"
                                >
                                    <div className="w-24 h-24 rounded-full bg-electric-blue/20 flex items-center justify-center text-electric-blue mx-auto mb-8" style={{ boxShadow: '0 0 30px var(--glow-electric)' }}>
                                        <CheckCircle size={48} />
                                    </div>
                                    <h2 className="text-4xl font-black text-silver-primary tracking-tighter">Transmission <span className="text-electric-blue">Complete.</span></h2>
                                    <p className="text-grey-secondary text-lg max-w-sm mx-auto leading-relaxed">
                                        Your vision has been encrypted and dispatched. I'll respond through the NYUAD secure node shortly.
                                    </p>
                                    <button
                                        onClick={() => setIsSubmitted(false)}
                                        className="text-electric-blue font-black uppercase tracking-[0.4em] text-[10px] hover:text-silver-primary transition-colors font-mono"
                                    >
                                        Send another message
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="lg:col-span-4 space-y-6">
                        <ContactItem icon={Mail} label="Direct" value="avi.bist@nyu.edu" link="mailto:avi.bist@nyu.edu" />
                        <ContactItem icon={Linkedin} label="Network" value="Avishek Bist" link="https://www.linkedin.com/in/avishek-bist-a23b81162/" />
                        <ContactItem icon={MapPin} label="Origin" value="Kathmandu / Abu Dhabi" link="#" />
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Contact;
