import { motion } from 'framer-motion';
import { Phone, MessageCircle } from 'lucide-react';

export const Conversion = ({ onOpenQuote }: { onOpenQuote?: () => void }) => {
  return (
    <section className="py-24 relative overflow-hidden bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative glass-card p-12 md:p-20 overflow-hidden text-center bg-slate-50/50"
        >
          {/* Background Decoration */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-industrial-accent/5 to-industrial-yellow/5 -z-10" />
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-industrial-accent/10 rounded-full blur-[100px]" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-industrial-yellow/5 rounded-full blur-[100px]" />

          <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 tracking-tighter text-slate-900">
            Start Your Tissue Manufacturing <br />
            <span className="text-gradient">Business Today</span>
          </h2>
          <p className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto mb-12">
            Join 200+ successful entrepreneurs who scaled their production with Unique Paper Converting Machines.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <motion.button
              onClick={onOpenQuote}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary w-full sm:w-auto"
            >
              Get a Quote
            </motion.button>
            <motion.a
              href="tel:+919999267279"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-outline w-full sm:w-auto"
            >
              <Phone size={20} /> Call Now
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export const Clients = () => {
  const logos = [
    { name: "Paseo", src: "/input_file_2.png" },
    { name: "APP Sinarmas", src: "/input_file_4.png" },
    { name: "Florence", src: "/input_file_6.png" },
    { name: "Rid", src: "/input_file_8.png" },
    { name: "Multiline", src: "/input_file_10.png" },
    { name: "Paramount", src: "/input_file_12.png" },
    { name: "Claret", src: "/input_file_14.png" },
    { name: "Buzil Rossari", src: "/input_file_16.png" },
  ];

  return (
    <section className="py-20 border-y border-slate-100 overflow-hidden bg-white">
      <div className="container mx-auto px-6 mb-12 text-center">
        <p className="text-xs uppercase tracking-[0.5em] text-slate-300 font-bold">Trusted by Industry Leaders</p>
      </div>
      
      <div className="flex gap-12 animate-infinite-scroll">
        <div className="flex gap-12 shrink-0">
          {logos.map((logo, i) => (
            <div key={i} className="flex items-center gap-2 opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500 cursor-pointer">
              <img 
                src={logo.src} 
                alt={logo.name} 
                className="h-10 w-auto object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              <span className="text-sm font-bold text-slate-500">{logo.name}</span>
            </div>
          ))}
        </div>
        <div className="flex gap-12 shrink-0">
          {logos.map((logo, i) => (
            <div key={i + 10} className="flex items-center gap-2 opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500 cursor-pointer">
              <img 
                src={logo.src} 
                alt={logo.name} 
                className="h-10 w-auto object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              <span className="text-sm font-bold text-slate-500">{logo.name}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes infinite-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-infinite-scroll {
          animation: infinite-scroll 30s linear infinite;
        }
      `}</style>
    </section>
  );
};
