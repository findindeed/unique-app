import { motion, useScroll, useTransform } from 'framer-motion';
import { ThreeHero } from './ThreeHero';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useRef } from 'react';

export const Hero = ({ onOpenQuote }: { onOpenQuote?: () => void }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen flex items-center justify-center overflow-hidden bg-slate-50">
      {/* Background Machine Image from PDF */}
      <div className="absolute inset-0 -z-10 opacity-10 grayscale pointer-events-none">
        <img 
          src="/input_file_0.png" 
          alt="Unique Paper Machinery" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white" />
      </div>

      <ThreeHero />
      
      <motion.div 
        style={{ y, opacity }}
        className="container mx-auto px-6 z-10 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-1 rounded-full border border-industrial-accent/20 bg-industrial-accent/10 text-industrial-accent text-xs font-bold uppercase tracking-[0.4em] mb-6">
            Precision • Performance • Productivity
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-extrabold mb-8 leading-[1.1] tracking-tighter text-slate-900">
            India's Leading <br />
            <span className="text-gradient">Tissue & Napkin Making Machine</span> <br />
            Manufacturer
          </h1>
          <p className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light leading-relaxed">
            High-performance tissue paper making machine and paper napkin manufacturing solutions. We engineer the future of paper converting with precision and global standards.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary group w-full sm:w-auto"
            >
              View Products <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
            <motion.button 
              onClick={onOpenQuote}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-outline w-full sm:w-auto"
            >
              Get a Quote
            </motion.button>
          </div>
        </motion.div>
      </motion.div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-industrial-accent/50"
      >
        <ChevronDown size={32} />
      </motion.div>

      {/* Background Gradient Orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-industrial-accent/10 rounded-full blur-[120px] -z-20" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-industrial-yellow/5 rounded-full blur-[120px] -z-20" />
    </section>
  );
};
