import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, CheckCircle2, Phone, Mail, MapPin, ArrowRight, ChevronRight, Award, ShieldCheck, Zap } from 'lucide-react';
import * as THREE from 'three';

// --- API CONFIG ---
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// --- COMPONENTS ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-industrial-accent rounded-lg flex items-center justify-center text-white font-bold text-xl">U</div>
          <span className="font-display font-bold text-xl tracking-tight">UNIQUE PAPER</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {['About', 'Products', 'Features', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium hover:text-industrial-accent transition-colors">{item}</a>
          ))}
          <button className="bg-industrial-accent text-white px-6 py-2 rounded-full text-sm font-bold hover:shadow-lg transition-all">Get Quote</button>
        </div>

        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white shadow-xl p-6 flex flex-col gap-4 md:hidden"
          >
            {['About', 'Products', 'Features', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setIsOpen(false)} className="text-lg font-bold">{item}</a>
            ))}
            <button className="w-full bg-industrial-accent text-white py-4 rounded-xl font-bold">Get Quote</button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const ThreeModel = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    const size = Math.min(containerRef.current.clientWidth, 400);
    renderer.setSize(size, size);
    containerRef.current.appendChild(renderer.domElement);

    // Simple industrial-looking geometry
    const geometry = new THREE.BoxGeometry(2, 1, 1.5);
    const material = new THREE.MeshStandardMaterial({ color: 0x0197b2, roughness: 0.3, metalness: 0.8 });
    const machine = new THREE.Mesh(geometry, material);
    scene.add(machine);

    const light = new THREE.DirectionalLight(0xffffff, 2);
    light.position.set(5, 5, 5);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0x404040, 2));

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      machine.rotation.y += 0.01;
      machine.rotation.x += 0.005;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      renderer.dispose();
      if (containerRef.current) containerRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} className="w-full flex justify-center items-center" />;
};

const Hero = () => (
  <section className="relative min-h-screen flex items-center pt-20 bg-slate-50 overflow-hidden">
    <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span className="inline-block px-4 py-1 rounded-full bg-industrial-accent/10 text-industrial-accent text-xs font-bold uppercase tracking-widest mb-6">Industrial Excellence</span>
        <h1 className="text-5xl md:text-7xl font-display font-extrabold mb-8 leading-tight">
          Next-Gen <br />
          <span className="text-industrial-accent">Paper Converting</span> <br />
          Solutions
        </h1>
        <p className="text-slate-600 text-lg mb-10 max-w-lg">High-performance tissue and napkin manufacturing machines engineered for maximum efficiency and durability.</p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="bg-industrial-accent text-white px-8 py-4 rounded-full font-bold hover:shadow-xl transition-all flex items-center gap-2">
            Explore Machines <ArrowRight size={20} />
          </button>
          <button className="border-2 border-slate-200 px-8 py-4 rounded-full font-bold hover:bg-slate-100 transition-all">Watch Demo</button>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="relative"
      >
        <div className="absolute inset-0 bg-industrial-accent/20 blur-3xl rounded-full" />
        <ThreeModel />
      </motion.div>
    </div>
  </section>
);

const About = () => (
  <section id="about" className="py-24 bg-white">
    <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
      <div className="relative">
        <div className="aspect-square bg-slate-100 rounded-3xl overflow-hidden">
          <img src="https://picsum.photos/seed/factory/800/800" alt="Factory" className="w-full h-full object-cover" />
        </div>
        <div className="absolute -bottom-10 -right-10 bg-industrial-accent text-white p-10 rounded-3xl shadow-2xl hidden md:block">
          <p className="text-5xl font-extrabold mb-2">25+</p>
          <p className="text-sm font-bold uppercase tracking-widest opacity-80">Years of Innovation</p>
        </div>
      </div>

      <div>
        <h2 className="text-4xl font-display font-bold mb-8">Pioneering the Future of <span className="text-industrial-accent">Paper Manufacturing</span></h2>
        <p className="text-slate-600 text-lg mb-8 leading-relaxed">Unique Paper Converting Machines has been at the forefront of industrial engineering since 1998. We specialize in high-speed, precision-engineered solutions for the global paper industry.</p>
        
        <div className="space-y-6">
          {[
            { title: 'Global Reach', desc: 'Exporting to over 30 countries worldwide.' },
            { title: 'Custom Engineering', desc: 'Tailored solutions for your specific production needs.' },
            { title: 'Eco-Friendly', desc: 'Machines designed for minimal waste and energy consumption.' }
          ].map((item, i) => (
            <div key={i} className="flex gap-4">
              <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-industrial-accent flex-shrink-0">
                <CheckCircle2 size={24} />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                <p className="text-slate-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const Contact = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus('success');
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-24 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col lg:flex-row">
          <div className="lg:w-1/2 bg-industrial-accent p-12 text-white">
            <h2 className="text-4xl font-display font-bold mb-8">Get in Touch</h2>
            <p className="opacity-80 mb-12">Have questions about our machines? Our technical experts are ready to help you scale your production.</p>
            
            <div className="space-y-8">
              <div className="flex gap-6 items-start">
                <MapPin className="flex-shrink-0" />
                <div>
                  <h4 className="font-bold mb-1">Factory Address</h4>
                  <p className="opacity-70 text-sm">Plot No. 12, Gali No. 4, Okhla Phase 3, New Delhi, 110020</p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <Phone className="flex-shrink-0" />
                <div>
                  <h4 className="font-bold mb-1">Call Us</h4>
                  <p className="opacity-70 text-sm">+91 99992 67279</p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <Mail className="flex-shrink-0" />
                <div>
                  <h4 className="font-bold mb-1">Email Us</h4>
                  <p className="opacity-70 text-sm">info@uniquepaper.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Name</label>
                  <input name="name" required className="w-full border-b-2 border-slate-100 py-2 outline-none focus:border-industrial-accent transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Email</label>
                  <input name="email" type="email" required className="w-full border-b-2 border-slate-100 py-2 outline-none focus:border-industrial-accent transition-colors" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Message</label>
                <textarea name="message" required rows={4} className="w-full border-b-2 border-slate-100 py-2 outline-none focus:border-industrial-accent transition-colors resize-none" />
              </div>
              
              <button 
                disabled={status === 'loading'}
                className="w-full bg-industrial-accent text-white py-4 rounded-xl font-bold hover:shadow-lg transition-all disabled:opacity-50"
              >
                {status === 'loading' ? 'Sending...' : 'Send Message'}
              </button>

              {status === 'success' && <p className="text-emerald-500 font-bold text-center">Message sent successfully!</p>}
              {status === 'error' && <p className="text-rose-500 font-bold text-center">Failed to send message. Please try again.</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const App = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Contact />
      <footer className="py-12 bg-white border-t border-slate-100 text-center">
        <p className="text-slate-400 text-sm">© 2026 Unique Paper Converting Machines. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
