import { motion } from 'framer-motion';
import { Phone, MessageCircle, ArrowUp } from 'lucide-react';
import { useState, useEffect } from 'react';

export const FloatingElements = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-1 z-[10000]">
        <div 
          className="h-full bg-industrial-accent shadow-[0_0_10px_rgba(1,151,178,0.8)] transition-all duration-100"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="fixed bottom-8 right-8 z-[999] flex flex-col gap-4">
        {/* WhatsApp */}
        <motion.a
          href="https://wa.me/919999267279"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-lg relative group"
        >
          <MessageCircle size={28} />
          <span className="absolute right-full mr-4 px-3 py-1 bg-white text-black text-xs font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            WhatsApp Us
          </span>
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
        </motion.a>

        {/* Call */}
        <motion.a
          href="tel:+919999267279"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-14 h-14 bg-industrial-accent rounded-full flex items-center justify-center text-white shadow-lg relative group"
        >
          <Phone size={28} />
          <span className="absolute right-full mr-4 px-3 py-1 bg-white text-black text-xs font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Call Now
          </span>
        </motion.a>

        {/* Back to Top */}
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-14 h-14 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-900 shadow-lg"
          >
            <ArrowUp size={28} />
          </motion.button>
        )}
      </div>
    </>
  );
};
