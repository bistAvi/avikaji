import { motion, useTransform, useSpring } from 'framer-motion';

const FiberPulse = ({ progress }) => {
    // Convert 0-1 progress to percentage-based MotionValues
    const widthPercent = useTransform(progress, [0, 1], ["0%", "100%"]);
    const leftTransitionPercent = useTransform(progress, [0, 1], ["-40%", "60%"]);
    const leadTipPercent = useTransform(progress, [0, 1], ["0%", "100%"]);

    return (
        <div className="absolute inset-0 w-full h-[3px] bg-white/5 overflow-hidden">
            {/* Background Cable */}
            <motion.div
                className="absolute top-0 left-0 h-full bg-electric-blue transition-all duration-300 ease-out"
                style={{ width: widthPercent, opacity: 0.3 }}
            />

            {/* Trailing Glow */}
            <motion.div
                className="absolute top-0 h-full bg-gradient-to-r from-transparent via-electric-blue to-transparent"
                style={{ width: '40%', left: leftTransitionPercent }}
                animate={{ opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 1, repeat: Infinity }}
            />

            {/* High-Intensity Pulse */}
            <motion.div
                className="absolute top-0 h-full bg-white w-[100px] blur-[8px]"
                initial={{ left: '-10%' }}
                animate={{ left: '110%' }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                style={{ opacity: 0.6 }}
            />

            {/* Lead Tip */}
            <motion.div
                className="absolute top-0 h-full w-[4px] bg-white pulse-glow"
                style={{ left: leadTipPercent, x: "-50%" }}
            />
        </div>
    );
};

export default FiberPulse;
