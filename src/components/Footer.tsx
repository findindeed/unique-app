import { motion } from 'framer-motion';
import { Phone, MessageCircle, Mail, MapPin, Facebook, Linkedin, Twitter, Instagram, ChevronRight } from 'lucide-react';

export const Footer = () => {
  const cities = ["Delhi", "Mumbai", "Chennai", "Kolkata", "Bengaluru", "Hyderabad", "Pune", "Ahmedabad", "Jaipur", "Lucknow"];

  return (
    <footer className="relative bg-slate-50 pt-20 pb-10 overflow-hidden border-t border-slate-200">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Company Info */}
          <div className="space-y-6">
            <img 
              src="/input_file_94.png" 
              alt="Unique Paper Converting Machines Logo" 
              className="h-12 w-auto object-contain"
            />
            <p className="text-slate-600 text-sm leading-relaxed">
              Unique Paper Converting Machines is India's leading manufacturer of high-performance <strong>tissue paper making machine</strong> and <strong>napkin making machine</strong> solutions.
            </p>
            <div className="flex gap-4">
              {[Facebook, Linkedin, Twitter, Instagram].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -5, color: '#0197B2' }}
                  className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:border-industrial-accent transition-colors"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-display font-bold mb-6 text-slate-900">Quick Links</h4>
            <ul className="space-y-4">
              {["Home", "About", "Products", "Contact", "Privacy Policy", "Terms & Conditions", "Warranty"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-slate-600 hover:text-industrial-accent text-sm flex items-center gap-2 transition-colors">
                    <ChevronRight size={14} /> {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-lg font-display font-bold mb-6 text-slate-900">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-slate-600 text-sm">
                <MapPin size={18} className="text-industrial-accent shrink-0" />
                <span>Reg. Office & Factory: G-190, Mavi Mohalla, Tekhand, Okhla Phase I, New Delhi, Delhi 110020</span>
              </li>
              <li className="flex items-center gap-3 text-slate-600 text-sm">
                <Phone size={18} className="text-industrial-accent shrink-0" />
                <span>+91-9999267279</span>
              </li>
              <li className="flex items-center gap-3 text-slate-600 text-sm">
                <Mail size={18} className="text-industrial-accent shrink-0" />
                <div className="flex flex-col">
                  <span className="break-all">info@uniquepaperconvertingmachines.com</span>
                  <span className="break-all text-xs opacity-50">unique.paper.converting.machines@gmail.com</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Our Clients */}
          <div>
            <h4 className="text-lg font-display font-bold mb-6 text-slate-900">Our Clients</h4>
            <div className="flex flex-wrap gap-2">
              {["Paseo", "APP Sinarmas", "Florence", "Rid", "Multiline", "Paramount", "Claret", "Buzil Rossari", "White Rose", "Gloria", "Punya", "Colors"].map((client) => (
                <span key={client} className="px-2 py-1 bg-white rounded text-[9px] uppercase tracking-wider text-slate-400 border border-slate-200">
                  {client}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Google Map Embed */}
        <div className="w-full h-64 rounded-2xl overflow-hidden mb-12 border border-slate-200 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3505.474665484803!2d77.276418375497!3d28.52542597572457!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce15105655555%3A0x867b1c0616e9a890!2sUnique%20Paper%20Converting%20Machines!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400 uppercase tracking-[0.2em]">
          <p>© 2026 Unique Paper Converting Machines. All Rights Reserved.</p>
          <p>Developed by <span className="text-industrial-accent">Arif Saifi</span></p>
        </div>
      </div>
    </footer>
  );
};
