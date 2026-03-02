import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';
import { Menu, X, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Navbar = ({ onOpenQuote }: { onOpenQuote?: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/#about" },
    { name: "Products", href: "/#products" },
    { name: "Contact", href: "/#contact" }
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-500 ${isScrolled ? 'py-4 bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-sm' : 'py-8 bg-transparent'}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <img 
            src="/input_file_94.png" 
            alt="Unique Paper Converting Machines Logo" 
            className="h-12 w-auto object-contain"
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-sm font-medium text-slate-600 hover:text-industrial-accent transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-industrial-accent transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          <button 
            onClick={onOpenQuote}
            className="px-6 py-2 bg-slate-100 border border-slate-200 rounded-full text-sm font-bold hover:bg-slate-200 transition-all text-slate-900"
          >
            Get Quote
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-slate-900"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 w-full bg-white border-t border-slate-100 p-6 flex flex-col gap-6 md:hidden shadow-xl"
        >
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-lg font-display font-bold text-slate-800"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <button 
            onClick={() => {
              onOpenQuote?.();
              setIsMobileMenuOpen(false);
            }}
            className="btn-primary w-full"
          >
            Get Quote
          </button>
        </motion.div>
      )}
    </nav>
  );
};
