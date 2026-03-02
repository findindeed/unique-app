import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

const Counter = ({ value, suffix = "" }: { value: number, suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const increment = end / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return <span ref={ref}>{count}{suffix}</span>;
};

export const About = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image/Visual Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl overflow-hidden glass-card p-4">
              <img 
                src="/input_file_1.png" 
                alt="Unique Paper Converting Machines Factory" 
                className="w-full h-full object-cover rounded-2xl grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
            {/* Floating Stats */}
            <div className="absolute -bottom-10 -right-10 glass-card p-8 shadow-2xl bg-white/90">
              <div className="text-4xl font-display font-bold text-industrial-accent mb-1">
                <Counter value={8} suffix="+" />
              </div>
              <div className="text-xs uppercase tracking-widest text-slate-400">Years Experience</div>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <span className="text-industrial-accent text-xs font-bold uppercase tracking-[0.3em] mb-4 block">About the Company</span>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-slate-900">
                Established in <span className="text-industrial-accent">2017</span>
              </h2>
              <p className="text-slate-600 leading-relaxed text-lg mb-6">
                Founded by two visionary friends – <strong>Mr. Pawan Kumar Srivastava (Pankaj)</strong>, a skilled Technical Engineer, and <strong>Mr. Raju Chauhan</strong>, an experienced Mechanical Engineer. We specialize in high-quality <strong>tissue paper making machine</strong> and <strong>napkin manufacturing machine</strong> solutions.
              </p>
              <p className="text-slate-600 leading-relaxed text-lg">
                Both founders began their professional journey in Faridabad, gaining deep expertise in paper converting technology. With combined knowledge and a passion for engineering excellence, they built Unique Paper Converting Machines into a trusted name for high-quality, efficient, and reliable <strong>tissue paper manufacturing machine</strong> and <strong>napkin machine</strong> across India and beyond.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                "Advanced Durable Machines",
                "Customer-Focused Solutions",
                "Strong After-Sales Support",
                "Precision Engineering",
                "Pan India Service Network",
                "1 Year Comprehensive Warranty"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-slate-700">
                  <CheckCircle2 className="text-industrial-accent" size={20} />
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-slate-100">
              <div>
                <div className="text-2xl font-display font-bold text-industrial-accent">
                  <Counter value={200} suffix="+" />
                </div>
                <div className="text-[10px] uppercase tracking-widest text-slate-400">Machines Installed</div>
              </div>
              <div>
                <div className="text-2xl font-display font-bold text-industrial-accent">
                  <Counter value={2017} suffix="" />
                </div>
                <div className="text-[10px] uppercase tracking-widest text-slate-400">Founded</div>
              </div>
              <div>
                <div className="text-2xl font-display font-bold text-industrial-accent">
                  <Counter value={100} suffix="%" />
                </div>
                <div className="text-[10px] uppercase tracking-widest text-slate-400">Satisfaction</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Background Mesh Gradient */}
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,rgba(1,151,178,0.05),transparent_50%)] -z-10" />
    </section>
  );
};
