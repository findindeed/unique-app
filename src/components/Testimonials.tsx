import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: "Rajesh Kumar",
    role: "Director, RK Paper Products",
    content: "The high-speed tissue paper machine from Unique Paper is a game-changer. Our production capacity has doubled, and the quality is unmatched in the market.",
    rating: 5,
    image: "https://picsum.photos/seed/user1/100/100"
  },
  {
    id: 2,
    name: "Amit Sharma",
    role: "Proprietor, Sharma Industries",
    content: "Excellent after-sales service. The technical team is very professional and helped us set up the entire plant in Okhla. Highly recommended for paper converting machines.",
    rating: 5,
    image: "https://picsum.photos/seed/user2/100/100"
  },
  {
    id: 3,
    name: "Sanjay Gupta",
    role: "CEO, Global Tissues",
    content: "We have been using their machines for 5 years now. Robust build and very low maintenance. The best in India for paper converting technology.",
    rating: 5,
    image: "https://picsum.photos/seed/user3/100/100"
  },
  {
    id: 4,
    name: "Vikram Singh",
    role: "Operations Manager, North Paper Co.",
    content: "The automatic core loading feature is fantastic. It saves so much time and labor. Truly unique machines as the name suggests.",
    rating: 4,
    image: "https://picsum.photos/seed/user4/100/100"
  },
  {
    id: 5,
    name: "Priya Mehra",
    role: "Founder, Eco-Friendly Tissues",
    content: "Very impressed with the precision of the cutting and folding. The machines are energy efficient and the support team is always available.",
    rating: 5,
    image: "https://picsum.photos/seed/user5/100/100"
  }
];

export const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.5,
      rotateY: direction > 0 ? 45 : -45,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.5,
      rotateY: direction < 0 ? 45 : -45,
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => (prevIndex + newDirection + reviews.length) % reviews.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] border border-industrial-accent/20 rounded-full animate-pulse" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-industrial-accent text-xs font-bold uppercase tracking-[0.3em] mb-4 block"
          >
            Client Success
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-bold mb-6 text-slate-900"
          >
            Trusted by <span className="text-gradient">Industry Leaders</span>
          </motion.h2>
        </div>

        <div className="relative h-[450px] flex items-center justify-center perspective-1000">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
                scale: { duration: 0.4 },
                rotateY: { duration: 0.4 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);
                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
              className="absolute w-full max-w-2xl"
            >
              <div className="glass-card p-8 md:p-12 relative overflow-hidden group bg-white shadow-xl border-slate-100">
                {/* Quote Icon */}
                <div className="absolute top-6 right-8 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Quote size={80} className="text-industrial-accent" />
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full border-2 border-industrial-accent p-1 mb-6 relative">
                    <img 
                      src={reviews[currentIndex].image} 
                      alt={reviews[currentIndex].name}
                      className="w-full h-full rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-industrial-accent p-1.5 rounded-full">
                      <Star size={12} className="text-white fill-white" />
                    </div>
                  </div>

                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={16} 
                        className={i < reviews[currentIndex].rating ? "text-industrial-accent fill-industrial-accent" : "text-slate-200"} 
                      />
                    ))}
                  </div>

                  <p className="text-xl md:text-2xl font-medium text-slate-700 mb-8 italic leading-relaxed">
                    "{reviews[currentIndex].content}"
                  </p>

                  <div>
                    <h4 className="text-lg font-bold text-slate-900 mb-1">{reviews[currentIndex].name}</h4>
                    <p className="text-sm text-industrial-accent font-medium uppercase tracking-wider">{reviews[currentIndex].role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-4 z-20">
            <button 
              onClick={() => paginate(-1)}
              className="p-3 rounded-full glass-card border-slate-200 hover:border-industrial-accent/50 text-slate-400 hover:text-industrial-accent transition-all bg-white shadow-sm"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={() => paginate(1)}
              className="p-3 rounded-full glass-card border-slate-200 hover:border-industrial-accent/50 text-slate-400 hover:text-industrial-accent transition-all bg-white shadow-sm"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Google Business Profile Badge */}
        <div className="mt-16 flex flex-col items-center">
          <div className="flex items-center gap-3 px-6 py-3 glass-card border-slate-200 bg-white shadow-sm">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_Business_Profile_logo.svg/1024px-Google_Business_Profile_logo.svg.png" 
              alt="Google Business Profile" 
              className="h-6"
            />
            <div className="h-4 w-[1px] bg-slate-200" />
            <div className="flex items-center gap-1">
              <span className="text-sm font-bold text-slate-900">4.9</span>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} className="text-industrial-accent fill-industrial-accent" />
                ))}
              </div>
              <span className="text-xs text-slate-400 ml-1">(80+ Reviews)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
