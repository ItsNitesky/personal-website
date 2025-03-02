'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';

// TypewriterText Component
const TypewriterText = ({ text, className }: { text: string; className: string }) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let timeouts: NodeJS.Timeout[] = [];
    const chars = text.split('');

    chars.forEach((char, index) => {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + char);
      }, 50 * index);
      timeouts.push(timeout);
    });

    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, [text]);

  return <h2 className={className}>{displayText || ' '}</h2>;
};

// SkillCard Component
const SkillCard = ({ skill, index }: {
  skill: {
    name: string;
    icon: string;
    level: number;
    color: string;
    description: string;
  };
  index: number;
}) => {
  return (
    <motion.div
      className="relative isolate h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index }}
    >
      <motion.div
        className="p-6 rounded-xl border border-purple-500/20 bg-purple-900/10 transition-all duration-300 h-full flex flex-col"
        whileHover={{ scale: 1.05 }}
      >
        <div className="relative z-10 flex flex-col flex-grow">
          <span className="text-3xl mb-4 block">{skill.icon}</span>
          <h3 className="text-lg font-semibold text-white mb-2">{skill.name}</h3>
          <div className="h-1.5 w-full bg-purple-900/30 rounded-full overflow-hidden mb-3">
            <motion.div
              className="h-full"
              style={{ backgroundColor: skill.color }}
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.level}%` }}
              transition={{ duration: 1, delay: 0.2 }}
            />
          </div>
          <p className="text-sm text-purple-200/70">
            {skill.description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function Home() {
  const [activeSection, setActiveSection] = useState(0);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const springConfig = { stiffness: 100, damping: 30 };
  const mouseXSpring = useSpring(mousePosition.x, springConfig);
  const mouseYSpring = useSpring(mousePosition.y, springConfig);

  const skills = [
    { name: 'Community Building', icon: '🤝', level: 95, color: '#A855F7', description: 'Lorem ipsum odor amet, consectetuer adipiscing elit.' },
    { name: 'Content Strategy', icon: '📊', level: 90, color: '#8B5CF6', description: 'Lorem ipsum odor amet, consectetuer adipiscing elit.' },
    { name: 'Web Development', icon: '💻', level: 85, color: '#7C3AED', description: 'Lorem ipsum odor amet, consectetuer adipiscing elit.' },
    { name: 'Event Management', icon: '🎮', level: 92, color: '#6D28D9', description: 'Lorem ipsum odor amet, consectetuer adipiscing elit.' }
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      setMousePosition({
        x: clientX / innerWidth,
        y: clientY / innerHeight,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const y = useTransform(scrollYProgress, [0, 1], [0, -300]);

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#0A0118]">
      {/* Enhanced star background */}
      <div className="absolute inset-0 stars-background" />

      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-purple-900/20 via-[#0A0118] to-[#0A0118] animate-pulse-slow" />

      {/* Interactive grid */}
      <div
        className="absolute inset-0 grid-background opacity-10"
        style={{
          transform: `rotate(${Number(mouseXSpring) * 5}deg) scale(${1 + Number(mouseYSpring) * 0.1})`
        }}
      />

      {/* Main content container */}
      <div ref={containerRef} className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="w-full py-20 flex flex-col items-center justify-center">
          {/* Hero Section with enhanced animations */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center space-y-8 relative max-w-5xl mx-auto"
          >
            {/* Animated circles behind the title */}
            <div className="absolute inset-0 -z-10">
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-purple-600/5"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.2, 0.3],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-purple-500/10"
                animate={{
                  scale: [1.2, 1, 1.2],
                  opacity: [0.2, 0.3, 0.2],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>

            {/* Main title with enhanced animation */}
            <motion.div
              className="relative inline-block"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <h1 className="text-8xl font-extrabold tracking-tight">
                <span className="text-white page-text">Hi, I&apos;m </span>
                <span className="magical-text">Brant</span>
              </h1>
            </motion.div>

            {/* Subtitle with typing effect */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <TypewriterText
                text="Community & Content Marketing Professional"
                className="text-3xl font-semibold magical-text-subtle"
              />
            </motion.div>
          </motion.div>

          {/* Experience Cards with parallax effect */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full mt-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="p-6 rounded-xl border border-purple-500/20 bg-purple-900/10 hover:bg-purple-900/20 transition-all duration-300 flex flex-col items-center text-center"
              whileHover={{ scale: 1.02, borderColor: 'rgba(168, 85, 247, 0.4)' }}
            >
              <h3 className="text-xl font-semibold text-purple-200 mb-4">Experience Highlights</h3>
              <p className="text-lg text-purple-100/90 leading-relaxed page-text">
                Lorem ipsum odor amet, consectetuer adipiscing elit. Ligula finibus ligula ex porttitor pretium phasellus. Lobortis maecenas euismod eget massa id. Nascetur donec suspendisse condimentum conubia pulvinar curabitur. Ut felis non felis rutrum hac parturient? Nibh pharetra turpis, ut suscipit montes feugiat bibendum.
              </p>
            </motion.div>

            <motion.div
              className="p-6 rounded-xl border border-purple-500/20 bg-purple-900/10 hover:bg-purple-900/20 transition-all duration-300 flex flex-col items-center text-center"
              whileHover={{ scale: 1.02, borderColor: 'rgba(168, 85, 247, 0.4)' }}
            >
              <h3 className="text-xl font-semibold text-purple-200 mb-4">What Sets Me Apart</h3>
              <p className="text-lg text-purple-100/90 leading-relaxed page-text">
                Lorem ipsum odor amet, consectetuer adipiscing elit. Ligula finibus ligula ex porttitor pretium phasellus. Lobortis maecenas euismod eget massa id. Nascetur donec suspendisse condimentum conubia pulvinar curabitur. Ut felis non felis rutrum hac parturient? Nibh pharetra turpis, ut suscipit montes feugiat bibendum.
              </p>
            </motion.div>
          </motion.div>

          {/* Enhanced Skills Section */}
          <motion.div
            className="mt-20 w-full max-w-5xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-center text-purple-200 mb-10">Core Competencies</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {skills.map((skill, index) => (
                <SkillCard key={skill.name} skill={skill} index={index} />
              ))}
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="text-purple-200/70 text-sm font-medium">
              Scroll to explore
            </div>
            <div className="mt-2 w-6 h-6 border-2 border-purple-500/30 rounded-full mx-auto">
              <div className="w-2 h-2 bg-purple-500 rounded-full mx-auto mt-1 animate-bounce" />
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
