import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { useMemo } from 'react';

export const MarketArea = () => {
  const majorStates = [
    { name: "Delhi", x: "48%", y: "22%", machines: 35, isMinor: false },
    { name: "Uttar Pradesh", x: "58%", y: "30%", machines: 25, isMinor: false },
    { name: "Haryana", x: "45%", y: "20%", machines: 22, isMinor: false },
    { name: "Rajasthan", x: "35%", y: "35%", machines: 18, isMinor: false },
    { name: "Punjab", x: "42%", y: "15%", machines: 15, isMinor: false },
    { name: "Gujarat", x: "25%", y: "48%", machines: 28, isMinor: false },
    { name: "Maharashtra", x: "35%", y: "58%", machines: 26, isMinor: false },
    { name: "West Bengal", x: "80%", y: "45%", machines: 12, isMinor: false },
    { name: "Karnataka", x: "44%", y: "78%", machines: 10, isMinor: false },
    { name: "Tamil Nadu", x: "52%", y: "85%", machines: 8, isMinor: false },
    { name: "Telangana", x: "50%", y: "65%", machines: 7, isMinor: false },
    { name: "Madhya Pradesh", x: "48%", y: "48%", machines: 6, isMinor: false },
    { name: "Bihar", x: "72%", y: "32%", machines: 5, isMinor: false },
    { name: "Odisha", x: "72%", y: "55%", machines: 4, isMinor: false },
    { name: "Kerala", x: "48%", y: "88%", machines: 3, isMinor: false },
    { name: "Assam", x: "90%", y: "35%", machines: 2, isMinor: false },
    { name: "Uttarakhand", x: "52%", y: "20%", machines: 2, isMinor: false },
    { name: "Jharkhand", x: "75%", y: "42%", machines: 2, isMinor: false },
    { name: "Goa", x: "32%", y: "72%", machines: 1, isMinor: false },
  ];

  // Generate 100+ random points across India
  const allPoints = useMemo(() => {
    const points = [...majorStates];
    const seed = 123; // For consistent "randomness"
    let currentSeed = seed;
    
    const random = () => {
      currentSeed = (currentSeed * 9301 + 49297) % 233280;
      return currentSeed / 233280;
    };

    for (let i = 0; i < 110; i++) {
      // Rough India shape constraints in %
      const x = 20 + random() * 65;
      const y = 15 + random() * 75;
      
      // Basic filter to keep points roughly within India's map boundaries
      const isWithinMap = (x: number, y: number) => {
        if (y < 30 && (x < 35 || x > 65)) return false; // North tip
        if (y > 70 && (x < 35 || x > 65)) return false; // South tip
        if (x < 25 && (y < 40 || y > 65)) return false; // West edge
        if (x > 75 && (y < 35 || y > 60)) return false; // East edge
        return true;
      };

      if (isWithinMap(x, y)) {
        points.push({
          name: `Region ${i + 1}`,
          x: `${x}%`,
          y: `${y}%`,
          machines: Math.floor(random() * 15) + 1,
          isMinor: true
        });
      }
    }
    return points;
  }, []);

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-industrial-accent/5 rounded-full blur-[150px] -z-10" />

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="z-10">
            <span className="text-industrial-accent text-xs font-bold uppercase tracking-[0.3em] mb-4 block">Global Reach</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-8 text-slate-900">
              Serving the <span className="text-gradient">Heart of Industry</span>
            </h2>
            <p className="text-slate-600 text-lg mb-12 leading-relaxed">
              Our service network spans across India's major industrial hubs, ensuring rapid response times and local expertise wherever you are. With <span className="text-industrial-accent font-bold">200+ installations</span> nationwide.
            </p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {majorStates.slice(0, 12).map((state) => (
                <div key={state.name} className="flex flex-col p-4 glass-card border-slate-100 hover:border-industrial-accent/20 transition-all group bg-slate-50/50">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-industrial-accent group-hover:animate-ping" />
                    <span className="text-sm font-bold text-slate-800">{state.name}</span>
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-industrial-accent/60 font-bold">
                    {state.machines}+ Machines Delivered
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative aspect-square glass-card p-4 flex items-center justify-center overflow-hidden bg-slate-50/50 border-slate-100">
            {/* Abstract India Map Representation */}
            <div className="relative w-full h-full opacity-10 grayscale brightness-100">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/India_location_map.svg/800px-India_location_map.svg.png" 
                alt="India Map" 
                className="w-full h-full object-contain opacity-50"
              />
            </div>
            
            {/* Animated Location Pins */}
            {allPoints.map((point, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ 
                  delay: (point.isMinor ? 0.5 : 0) + (i % 20) * 0.05,
                  duration: 0.5
                }}
                viewport={{ once: true }}
                className={`absolute group cursor-pointer ${point.isMinor ? 'z-10' : 'z-20'}`}
                style={{ left: point.x, top: point.y }}
              >
                <div className="relative">
                  {point.isMinor ? (
                    <div className="w-1.5 h-1.5 bg-industrial-accent/40 rounded-full hover:bg-industrial-accent transition-colors" />
                  ) : (
                    <>
                      <MapPin size={20} className="text-industrial-accent -translate-x-1/2 -translate-y-full drop-shadow-[0_0_8px_rgba(1,151,178,0.4)]" />
                      <div className="absolute top-0 left-0 w-3 h-3 bg-industrial-accent rounded-full -translate-x-1/2 -translate-y-1/2 animate-ping opacity-30" />
                    </>
                  )}
                  
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-slate-900 text-white text-[10px] font-bold rounded shadow-xl opacity-0 group-hover:opacity-100 transition-all scale-90 group-hover:scale-100 pointer-events-none whitespace-nowrap z-50">
                    <div className="text-industrial-accent mb-0.5">{point.name}</div>
                    <div className="text-[9px] opacity-70">{point.machines}+ Machines Delivered</div>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-slate-900" />
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Map Legend */}
            <div className="absolute bottom-4 right-4 flex flex-col gap-2 p-3 glass-card bg-white/80 backdrop-blur-md border-slate-200 shadow-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-industrial-accent rounded-full" />
                <span className="text-[9px] uppercase tracking-widest text-slate-600">Major States</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-industrial-accent/40 rounded-full" />
                <span className="text-[9px] uppercase tracking-widest text-slate-400">Service Points</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

