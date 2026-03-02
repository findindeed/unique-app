import { motion } from 'framer-motion';
import { Settings } from 'lucide-react';

export const Preloader = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center"
    >
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative flex flex-col items-center gap-4"
      >
        <img 
          src="/input_file_94.png" 
          alt="Unique Paper Converting Machines Logo" 
          className="h-24 w-auto object-contain"
        />
      </motion.div>
      
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: 200 }}
        transition={{ duration: 2, ease: "easeInOut" }}
        className="h-1 bg-industrial-accent mt-8 rounded-full shadow-[0_0_15px_rgba(242,125,38,0.3)]"
      />
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-slate-400 text-xs uppercase tracking-[0.3em] mt-4 font-medium"
      >
        Engineering Excellence
      </motion.p>
    </motion.div>
  );
};
