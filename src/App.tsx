import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Preloader } from './components/Preloader';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Products, WhyChooseUs, ProductPortfolio, BrandsWeUse, WhoWeServe } from './components/Products';
import { Clients, Conversion } from './components/Conversion';
import { MarketArea } from './components/MarketArea';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { FloatingElements } from './components/FloatingElements';
import { QuoteModal } from './components/QuoteModal';
import ProductDetail from './pages/ProductDetail';

const LandingPage = ({ onOpenQuote }: { onOpenQuote: () => void }) => (
  <>
    <Navbar onOpenQuote={onOpenQuote} />
    <main>
      <Hero onOpenQuote={onOpenQuote} />
      <Clients />
      <div id="about">
        <About />
      </div>
      <div id="products">
        <Products />
      </div>
      <ProductPortfolio />
      <WhoWeServe />
      <BrandsWeUse />
      <WhyChooseUs />
      <MarketArea />
      <Testimonials />
      <Contact />
      <Conversion onOpenQuote={onOpenQuote} />
    </main>
    <Footer />
    <FloatingElements />
  </>
);

export default function App() {
  const [loading, setLoading] = useState(true);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  useEffect(() => {
    // Simulate loading time for 3D assets and cinematic feel
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <div className="relative">
        <AnimatePresence>
          {loading && <Preloader />}
        </AnimatePresence>

        {!loading && (
          <>
            <Routes>
              <Route path="/" element={<LandingPage onOpenQuote={() => setIsQuoteModalOpen(true)} />} />
              <Route path="/product/:id" element={<ProductDetail onOpenQuote={() => setIsQuoteModalOpen(true)} />} />
            </Routes>
            <QuoteModal 
              isOpen={isQuoteModalOpen} 
              onClose={() => setIsQuoteModalOpen(false)} 
            />
          </>
        )}
      </div>
    </Router>
  );
}
