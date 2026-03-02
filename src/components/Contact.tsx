import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import React, { useState } from 'react';

export const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSubmitted(true);
        (e.target as HTMLFormElement).reset();
        setTimeout(() => setIsSubmitted(false), 5000);
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: <MapPin className="text-industrial-accent" />,
      title: "Our Factory",
      details: "Plot No. 12, Gali No. 4, Near Okhla Phase 3, New Delhi - 110020"
    },
    {
      icon: <Phone className="text-industrial-accent" />,
      title: "Call Us",
      details: "+91 99992 67279"
    },
    {
      icon: <Mail className="text-industrial-accent" />,
      title: "Email Us",
      details: "uniquepaperconverting@gmail.com"
    },
    {
      icon: <Clock className="text-industrial-accent" />,
      title: "Working Hours",
      details: "Mon - Sat: 9:00 AM - 6:00 PM"
    }
  ];

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-industrial-accent text-xs font-bold uppercase tracking-[0.3em] mb-4 block"
          >
            Get In Touch
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-bold mb-6 text-slate-900"
          >
            Contact Our <span className="text-gradient">Experts</span>
          </motion.h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Have questions about our machines or need a customized solution? Our team is here to help you scale your paper converting business.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            {contactInfo.map((info, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-6 p-6 glass-card border-slate-100 bg-slate-50/50"
              >
                <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0">
                  {info.icon}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">{info.title}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">{info.details}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="glass-card p-8 md:p-12 bg-white shadow-xl border-slate-100"
            >
              {isSubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                    <Send size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Message Sent!</h3>
                  <p className="text-slate-500">Thank you for reaching out. We will get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 ml-1">Full Name</label>
                      <input 
                        required
                        name="name"
                        type="text" 
                        placeholder="John Doe"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 px-6 focus:border-industrial-accent outline-none transition-all text-slate-900"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                      <input 
                        required
                        name="email"
                        type="email" 
                        placeholder="john@example.com"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 px-6 focus:border-industrial-accent outline-none transition-all text-slate-900"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Your Message</label>
                    <textarea 
                      required
                      name="message"
                      rows={6}
                      placeholder="How can we help you?"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 px-6 focus:border-industrial-accent outline-none transition-all text-slate-900 resize-none"
                    ></textarea>
                  </div>
                  <button 
                    disabled={isLoading}
                    type="submit" 
                    className="btn-primary w-full md:w-auto px-12"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        Send Message <Send size={18} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
