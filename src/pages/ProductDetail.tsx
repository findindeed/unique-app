import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, ShieldCheck, Zap, Wrench, Settings, Phone, MessageCircle } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { FloatingElements } from '../components/FloatingElements';

const ProductDetail = ({ onOpenQuote }: { onOpenQuote?: () => void }) => {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        const found = data.find((p: any) => p.id === id);
        setProduct(found);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="h-screen bg-white flex items-center justify-center text-industrial-accent">Loading...</div>;
  if (!product) return <div className="h-screen bg-white flex items-center justify-center">Product not found. <Link to="/" className="text-industrial-accent ml-2 underline">Go Back</Link></div>;

  return (
    <div className="bg-white min-h-screen">
      <Navbar onOpenQuote={onOpenQuote} />
      
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-6">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-industrial-accent transition-colors mb-12 group">
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Back to Products
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Image Section */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <div className="glass-card p-4 rounded-3xl overflow-hidden bg-slate-50 border-slate-100">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full rounded-2xl grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 glass-card p-6 border-slate-200 shadow-2xl bg-white">
                <div className="text-xs uppercase tracking-widest text-slate-400 mb-1">Model Number</div>
                <div className="text-2xl font-display font-bold text-industrial-accent">{product.model || "UPCM-PRO"}</div>
              </div>
            </motion.div>

            {/* Content Section */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div>
                <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight text-slate-900">
                  {product.name}
                </h1>
                <p className="text-slate-600 text-xl leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-display font-bold text-industrial-accent">Technical Specifications</h3>
                <div className="glass-card overflow-hidden border-slate-100 bg-white shadow-sm">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-100">
                        <th className="px-6 py-4 text-xs uppercase tracking-widest text-slate-400 font-bold">Parameter</th>
                        <th className="px-6 py-4 text-xs uppercase tracking-widest text-slate-400 font-bold">Details</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {product.features.map((feature: string, i: number) => {
                        // Try to split by common delimiters or just use the whole string
                        let label = "Feature";
                        let value = feature;
                        
                        if (feature.includes("Sheets/Min") || feature.includes("Rolls / 8 Hrs") || feature.includes("Tissues/Min")) {
                          label = "Production Capacity";
                        } else if (feature.includes("Printing")) {
                          label = "Printing Unit";
                        } else if (feature.includes("Dimension")) {
                          label = "Machine Dimensions";
                        } else if (feature.includes("Controller")) {
                          label = "Control System";
                        } else if (feature.includes("Width")) {
                          label = "Working Width";
                        } else if (feature.includes("Embossing")) {
                          label = "Embossing System";
                        } else if (feature.includes("Sealing")) {
                          label = "Sealing Method";
                        } else if (feature.includes("Loading")) {
                          label = "Loading System";
                        }

                        return (
                          <tr key={i} className="hover:bg-slate-50 transition-colors">
                            <td className="px-6 py-4 text-sm font-bold text-slate-700">{label}</td>
                            <td className="px-6 py-4 text-sm text-slate-600">{value}</td>
                          </tr>
                        );
                      })}
                      {product.model && (
                        <tr className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4 text-sm font-bold text-slate-700">Model Series</td>
                          <td className="px-6 py-4 text-sm text-slate-600">{product.model}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-100">
                <div className="text-center">
                  <ShieldCheck className="mx-auto text-industrial-accent mb-2" size={24} />
                  <div className="text-[10px] uppercase tracking-widest text-slate-400">1 Year Warranty</div>
                </div>
                <div className="text-center">
                  <Zap className="mx-auto text-industrial-accent mb-2" size={24} />
                  <div className="text-[10px] uppercase tracking-widest text-slate-400">High Performance</div>
                </div>
                <div className="text-center">
                  <Wrench className="mx-auto text-industrial-accent mb-2" size={24} />
                  <div className="text-[10px] uppercase tracking-widest text-slate-400">Low Maintenance</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-8">
                <button 
                  onClick={onOpenQuote}
                  className="btn-primary flex-1 flex items-center justify-center gap-2"
                >
                  <Phone size={20} /> Get Price Quote
                </button>
                <a href="https://wa.me/919999267279" className="btn-outline flex-1">
                  <MessageCircle size={20} /> Technical Inquiry
                </a>
              </div>
            </motion.div>
          </div>

          {/* Detailed Specs Placeholder */}
          <section className="mt-24 pt-24 border-t border-slate-100">
            <h2 className="text-3xl font-display font-bold mb-12 text-center text-slate-900">Technical Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass-card p-8 space-y-4 bg-slate-50 border-slate-100">
                <Settings className="text-industrial-accent" size={32} />
                <h4 className="text-xl font-bold text-slate-900">Advanced Control</h4>
                <p className="text-sm text-slate-500">Equipped with state-of-the-art PLC systems and intuitive touch-screen interfaces for seamless operation.</p>
              </div>
              <div className="glass-card p-8 space-y-4 bg-slate-50 border-slate-100">
                <Zap className="text-industrial-accent" size={32} />
                <h4 className="text-xl font-bold text-slate-900">Energy Efficient</h4>
                <p className="text-sm text-slate-500">Engineered with high-efficiency motors and drives to reduce operational costs while maintaining peak output.</p>
              </div>
              <div className="glass-card p-8 space-y-4 bg-slate-50 border-slate-100">
                <ShieldCheck className="text-industrial-accent" size={32} />
                <h4 className="text-xl font-bold text-slate-900">Industrial Safety</h4>
                <p className="text-sm text-slate-500">Built-in safety protocols and emergency stop systems ensuring a secure working environment for operators.</p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
      <FloatingElements />
    </div>
  );
};

export default ProductDetail;
