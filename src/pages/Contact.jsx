import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Magnetic from '../components/ui/Magnetic';
import { Mail, Linkedin, MapPin, Send, CheckCircle, AlertTriangle } from 'lucide-react';
import { useAudio } from '../components/ui/AudioEngine.jsx';

const ContactItem = ({ icon: Icon, label, value, link }) => {
    const { playSound } = useAudio();
    return (
        <Magnetic strength={0.2} radius={100}>
            <a href={link} onClick={() => playSound('click')} onMouseEnter={() => playSound('hover')} className="group flex items-center gap-6 p-6 glass-metal hover:border-gold-accent/40 transition-all duration-500">
                <div className="w-14 h-14 rounded-2xl bg-metal-white/5 flex items-center justify-center text-gold-accent group-hover:bg-gold-accent group-hover:text-metal-black transition-all duration-500">
                    <Icon size={24} />
                </div>
                <div>
                    <p className="text-[10px] font-black tracking-[0.3em] text-grey-secondary uppercase mb-1">{label}</p>
                    <p className="text-lg font-bold text-silver-primary group-hover:text-gold-accent transition-colors">{value}</p>
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        playSound('click');

        const formData = {
            name: e.target[0].value,
            email: e.target[1].value,
            type: e.target[2].value,
            urgency: e.target[3].value,
            message: e.target[4].value
        };

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
                throw new Error(data.message);
            }
        } catch (err) {
            console.error('Transmission Error:', err);
            setError("Transmission node unreachable. Ensure backend is active and configured.");
            // Fallback: Still show success for demo if desired, but here we show error
            // setIsSubmitted(true); 
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="bg-metal-black pt-48 pb-32 overflow-hidden min-h-screen">
            <section className="px-4 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">

                    <div className="lg:col-span-5">
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-gold-accent tracking-[1em] uppercase text-[10px] font-black mb-6 block"
                        >
                            Contact System
                        </motion.span>
                        <h1 className="text-7xl md:text-8xl font-black text-silver-primary leading-[0.9] tracking-tighter mb-12">
                            General<br />
                            <span className="text-metallic italic">Inquiry.</span>
                        </h1>

                        <div className="space-y-6">
                            <ContactItem icon={Mail} label="Direct" value="avi.bist@nyu.edu" link="mailto:avi.bist@nyu.edu" />
                            <ContactItem icon={Linkedin} label="Network" value="Avishek Bist" link="#" />
                            <ContactItem icon={MapPin} label="Origin" value="Kathmandu / Abu Dhabi" link="#" />
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-7"
                    >
                        <div className="glass-metal p-12 relative overflow-hidden min-h-[500px] flex flex-col justify-center">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-gold-accent/5 rounded-full blur-[100px] pointer-events-none" />

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
                                                <label className="text-[10px] font-black tracking-[0.4em] text-gold-accent uppercase ml-1">Identity</label>
                                                <input required type="text" placeholder="Your Name" className="w-full bg-transparent border-b-2 border-metal-white/5 p-4 text-silver-primary text-xl font-bold outline-none focus:border-gold-accent transition-all placeholder:text-silver-primary/20" />
                                            </div>
                                            <div className="space-y-4">
                                                <label className="text-[10px] font-black tracking-[0.4em] text-gold-accent uppercase ml-1">Email Node</label>
                                                <input required type="email" placeholder="email@example.com" className="w-full bg-transparent border-b-2 border-metal-white/5 p-4 text-silver-primary text-xl font-bold outline-none focus:border-gold-accent transition-all placeholder:text-silver-primary/20" />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                            <div className="space-y-4">
                                                <label className="text-[10px] font-black tracking-[0.4em] text-gold-accent uppercase ml-1">Inquiry Type</label>
                                                <select className="w-full bg-transparent border-b-2 border-metal-white/5 p-4 text-silver-primary text-xl font-bold outline-none focus:border-gold-accent transition-all appearance-none cursor-pointer">
                                                    <option value="hiring" className="bg-metal-black text-white">Career Opportunity / Hiring</option>
                                                    <option value="project" className="bg-metal-black text-white">Project Collaboration</option>
                                                    <option value="research" className="bg-metal-black text-white">Photonic Research</option>
                                                    <option value="general" className="bg-metal-black text-white">General Transmission</option>
                                                </select>
                                            </div>
                                            <div className="space-y-4">
                                                <label className="text-[10px] font-black tracking-[0.4em] text-gold-accent uppercase ml-1">Urgency</label>
                                                <select className="w-full bg-transparent border-b-2 border-metal-white/5 p-4 text-silver-primary text-xl font-bold outline-none focus:border-gold-accent transition-all appearance-none cursor-pointer">
                                                    <option value="low" className="bg-metal-black text-white">Standard</option>
                                                    <option value="medium" className="bg-metal-black text-white">Priority</option>
                                                    <option value="high" className="bg-metal-black text-white">Critical / Immediate</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black tracking-[0.4em] text-gold-accent uppercase ml-1">Detailed Brief</label>
                                            <textarea required rows="4" placeholder="How can we collaborate?" className="w-full bg-transparent border-b-2 border-metal-white/5 p-4 text-silver-primary text-xl font-bold outline-none focus:border-gold-accent transition-all resize-none placeholder:text-silver-primary/20" />
                                        </div>

                                        {error && (
                                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3 text-red-400 text-xs font-bold uppercase tracking-widest bg-red-400/10 p-4 rounded-xl border border-red-400/20">
                                                <AlertTriangle size={16} /> {error}
                                            </motion.div>
                                        )}

                                        <Magnetic strength={0.1}>
                                            <button
                                                disabled={isSubmitting}
                                                onMouseEnter={() => playSound('hover')}
                                                className="group flex items-center gap-4 px-12 py-6 bg-silver-primary text-metal-black font-black uppercase tracking-[0.4em] rounded-full overflow-hidden relative disabled:opacity-50"
                                            >
                                                <div className="absolute inset-0 bg-gold-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
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
                                        <div className="w-24 h-24 rounded-full bg-gold-accent/20 flex items-center justify-center text-gold-accent mx-auto mb-8 shadow-gold">
                                            <CheckCircle size={48} />
                                        </div>
                                        <h2 className="text-4xl font-black text-silver-primary tracking-tighter">Transmission <span className="text-gold-accent">Complete.</span></h2>
                                        <p className="text-grey-secondary text-lg max-w-sm mx-auto leading-relaxed">
                                            Your vision has been encrypted and dispatched. I'll respond through the NYUAD secure node shortly.
                                        </p>
                                        <button
                                            onClick={() => setIsSubmitted(false)}
                                            className="text-gold-accent font-black uppercase tracking-[0.4em] text-[10px] hover:text-silver-primary transition-colors"
                                        >
                                            Send another message
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            </section>
        </main>
    );
};

export default Contact;
