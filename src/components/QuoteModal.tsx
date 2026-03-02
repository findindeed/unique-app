import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, User, Mail, Phone, MessageSquare, CheckCircle2 } from 'lucide-react';
import React, { useState } from 'react';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuoteModal = ({ isOpen, onClose }: QuoteModalProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSubmitted(true);
        // Reset after some time
        setTimeout(() => {
          setIsSubmitted(false);
          onClose();
        }, 3000);
      }
    } catch (error) {
      console.error("Error submitting quote request:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg glass-card overflow-hidden bg-white shadow-2xl border-slate-100"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-industrial-accent to-industrial-yellow" />
            
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-900 transition-colors"
            >
              <X size={24} />
            </button>

            <div className="p-8">
              {isSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="py-12 text-center space-y-6"
                >
                  <div className="w-20 h-20 bg-industrial-accent/10 rounded-full flex items-center justify-center mx-auto text-industrial-accent">
                    <CheckCircle2 size={48} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-display font-bold text-slate-900">Quote Request Sent!</h3>
                    <p className="text-slate-500">
                      Thank you for your interest. Our technical team will review your requirements and contact you within 24 hours.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <>
                  <div className="mb-8">
                    <h2 className="text-3xl font-display font-bold mb-2 text-slate-900">Get a <span className="text-gradient">Custom Quote</span></h2>
                    <p className="text-slate-500 text-sm">
                      Tell us about your production requirements and we'll provide a tailored machinery solution.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-4">
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                          required
                          name="name"
                          type="text" 
                          placeholder="Full Name"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 focus:border-industrial-accent outline-none transition-all text-sm text-slate-900"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                          <input 
                            required
                            name="email"
                            type="email" 
                            placeholder="Email Address"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 focus:border-industrial-accent outline-none transition-all text-sm text-slate-900"
                          />
                        </div>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                          <input 
                            required
                            name="phone"
                            type="tel" 
                            placeholder="Phone Number"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 focus:border-industrial-accent outline-none transition-all text-sm text-slate-900"
                          />
                        </div>
                      </div>

                      <div className="relative">
                        <MessageSquare className="absolute left-4 top-4 text-slate-400" size={18} />
                        <textarea 
                          required
                          name="message"
                          rows={4}
                          placeholder="Tell us about your requirements (e.g., machine type, production capacity, etc.)"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 focus:border-industrial-accent outline-none transition-all text-sm resize-none text-slate-900"
                        ></textarea>
                      </div>
                    </div>

                    <button 
                      disabled={isLoading}
                      type="submit" 
                      className="btn-primary w-full py-4 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <Send size={18} /> Send Quote Request
                        </>
                      )}
                    </button>
                    
                    <p className="text-[10px] text-center text-slate-400 uppercase tracking-widest">
                      By submitting, you agree to our privacy policy
                    </p>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
