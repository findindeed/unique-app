import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, ShieldCheck, Zap, Cog, Headphones, Wrench, Settings } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ProductCard: React.FC<{ product: any }> = ({ product }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  // Glare effect values
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glareOpacity = useTransform(mouseXSpring, [-0.5, 0.5], [0, 0.3]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <Link to={`/product/${product.id}`}>
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ 
          rotateX, 
          rotateY, 
          transformStyle: "preserve-3d",
          perspective: "1000px" 
        }}
        className="relative group h-full"
      >
        <div className="glass-card p-6 h-full flex flex-col transition-all duration-500 hover:bg-white hover:border-industrial-accent/30 hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)] relative overflow-hidden">
          {/* Glare Effect Overlay */}
          <motion.div 
            style={{
              background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(0,0,0,0.03) 0%, transparent 80%)`,
              opacity: glareOpacity,
            }}
            className="absolute inset-0 pointer-events-none z-20"
          />

          <div className="relative aspect-video rounded-xl overflow-hidden mb-6 shadow-sm" style={{ transform: "translateZ(60px)" }}>
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
          </div>
          
          <div style={{ transform: "translateZ(40px)" }}>
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-display font-bold text-slate-900 group-hover:text-industrial-accent transition-colors">
                {product.name}
              </h3>
              {product.model && (
                <span className="text-[10px] font-bold text-industrial-accent bg-industrial-accent/10 px-2 py-0.5 rounded">
                  {product.model}
                </span>
              )}
            </div>
            <p className="text-slate-500 text-sm mb-6 line-clamp-2">
              {product.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-8">
              {product.features.map((f: string, i: number) => (
                <span key={i} className="text-[10px] uppercase tracking-wider px-2 py-1 bg-slate-100 rounded border border-slate-200 text-slate-600">
                  {f}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-auto flex items-center gap-2 text-industrial-accent font-bold text-sm group/btn" style={{ transform: "translateZ(50px)" }}>
            View Details <ArrowUpRight size={16} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <span className="text-industrial-accent text-xs font-bold uppercase tracking-[0.3em] mb-4 block">Our Machinery</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900">
              Precision Engineered <br /> <span className="text-gradient">Production Lines</span>
            </h2>
          </div>
          <button className="btn-outline">View All Products</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((p: any) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
};

export const ProductPortfolio = () => {
  const portfolio = [
    "Tissue Napkin Making Machines", "Automatic Napkin Making Machine", "L-Fold Dispenser Tissue Machines", 
    "V-Fold Tissue Making Machine", "N-Fold Tissue Paper Machine", "Facial Tissue Manufacturing Machine", 
    "Butter Paper Roll Rewinder Machines", "Aluminum Foil Rewinder Machines", "Reel-to-Reel Rewinder with Printing Units", 
    "Slicer / Slitting Machines", "Toilet Roll & Kitchen Towel Machines", 
    "Automatic Tissue Packaging Machines", "Manual Packaging Machines", 
    "Reel-to-Sheet Cutting Machines", "Paper Napkin Manufacturing Machine"
  ];

  return (
    <section className="py-24 border-t border-slate-100">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-display font-bold mb-4 text-slate-900">Complete Product Portfolio</h2>
          <p className="text-slate-400">Innovating the Future of Paper Converting Machines</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {portfolio.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 p-4 glass-card hover:bg-slate-100 transition-colors"
            >
              <div className="w-2 h-2 rounded-full bg-industrial-accent" />
              <span className="text-sm font-medium text-slate-700">{item}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const BrandsWeUse = () => {
  const brands = [
    { name: "S.K Company", type: "Motor", src: "/input_file_19.png" },
    { name: "Multi Span", type: "Volt Ammeter", src: "/input_file_20.png" },
    { name: "SKF / FKD", type: "Bearings", src: "/input_file_21.png" },
    { name: "L&T", type: "AC Drive", src: "/input_file_22.png" },
    { name: "Janatics", type: "Pneumatic", src: "/input_file_23.png" },
    { name: "Deepak Drive", type: "Variable Pully", src: "/input_file_24.png" },
    { name: "Rudra", type: "Blades", src: "/input_file_25.png" },
    { name: "L.P.S Company", type: "Bolts", src: "/input_file_26.png" }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-industrial-accent text-xs font-bold uppercase tracking-[0.3em] mb-4 block">Quality Components</span>
          <h2 className="text-3xl font-display font-bold text-slate-900">Premium Brands We Use</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {brands.map((brand, i) => (
            <div key={i} className="p-6 glass-card text-center group hover:border-industrial-accent/30 transition-all bg-white shadow-sm">
              <div className="flex justify-center mb-4">
                <img 
                  src={brand.src} 
                  alt={brand.name} 
                  className="h-8 w-auto object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
              <div className="text-xs uppercase tracking-widest text-slate-400 mb-2">{brand.type}</div>
              <div className="text-lg font-bold text-slate-800 group-hover:text-industrial-accent transition-colors">{brand.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const WhoWeServe = () => {
  const sectors = [
    { title: "Manufacturers & Exporters", desc: "Of tissue napkins, toilet rolls, and kitchen rolls." },
    { title: "Hotels & Restaurants", desc: "Requiring branded napkins and premium tissues." },
    { title: "Retail Brands", desc: "Looking for customized private label paper products." },
    { title: "Distributors", desc: "Entrepreneurs starting new ventures in paper converting." }
  ];

  return (
    <section className="py-24 bg-slate-50 border-y border-slate-100">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-industrial-accent text-xs font-bold uppercase tracking-[0.3em] mb-4 block">Our Reach</span>
          <h2 className="text-3xl font-display font-bold text-slate-900">Who We Serve</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {sectors.map((sector, i) => (
            <div key={i} className="p-8 glass-card border-slate-200 hover:border-industrial-accent/20 transition-all group bg-white">
              <h4 className="text-lg font-bold mb-3 text-industrial-accent">{sector.title}</h4>
              <p className="text-sm text-slate-500 leading-relaxed">{sector.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const WhyChooseUs = () => {
  const points = [
    { icon: Zap, title: "Advanced Technology", desc: "Advanced technology and durable machinery designed for precision." },
    { icon: ShieldCheck, title: "High-Quality Output", desc: "Consistent high-quality output meeting international standards." },
    { icon: Headphones, title: "After-Sales Support", desc: "Comprehensive after-sales service and technical support." },
    { icon: Settings, title: "Customized Solutions", desc: "Customized solutions tailored to match specific business needs." },
    { icon: Wrench, title: "Reliable Performance", desc: "Machines built for long-term performance and reliability." }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-display font-bold mb-4 text-slate-900">Why Industry Leaders Choose Us</h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            We don't just sell machines; we build partnerships that drive business growth through technical excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {points.map((point, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="text-center space-y-4 group"
            >
              <div className="w-16 h-16 mx-auto rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-industrial-accent group-hover:bg-industrial-accent group-hover:text-white transition-all duration-500 animate-float shadow-sm" style={{ animationDelay: `${i * 0.5}s` }}>
                <point.icon size={32} />
              </div>
              <h4 className="font-display font-bold text-lg text-slate-800">{point.title}</h4>
              <p className="text-slate-500 text-sm leading-relaxed">{point.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
