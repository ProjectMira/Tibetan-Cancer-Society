import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-300 ${
        scrolled ? 'bg-white/80 backdrop-blur-md border-b border-border shadow-sm' : 'bg-transparent'
      }`}
      style={{marginTop: '0.75rem'}}
    >
      <div className="w-[96%] bg-blue-100 border-2 border-gray-200 rounded-2xl shadow-xl max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6 md:py-6" style={{ fontSize: '1.5rem' }}>
          <div className="flex items-center">
            {/* Logo Image */}
            <img
              src="/assets/logo.jpeg"
              alt="Tibetan Cancer Society Logo"
              className="w-14 h-14 object-cover rounded-full mr-4 border-2 border-blue-300 shadow-inner bg-white"
            />
            <Link to="/" className="text-2xl md:text-3xl font-display font-bold tracking-tight text-primary">
              Tibetan Cancer Society
            </Link>
          </div>
          <nav className="hidden md:flex space-x-10 ml-4">
            <Link to="/about" className="text-xl font-semibold hover:text-primary transition-colors">
              About
            </Link>
            <Link to="/programs-services" className="text-xl font-semibold hover:text-primary transition-colors">
              Programs & Services
            </Link>
            <Link to="/team" className="text-xl font-semibold hover:text-primary transition-colors">
              Team
            </Link>
            <Link to="/donate" className="text-xl font-semibold hover:text-primary transition-colors">
              Donate
            </Link>
          </nav>
          <button
            className="md:hidden"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </div>
      
      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <div className="px-4 py-6 space-y-4">
            <Link 
              to="/about" 
              className="block text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/programs-services" 
              className="block text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Programs & Services
            </Link>
            <Link 
              to="/team" 
              className="block text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Team
            </Link>
            <Link 
              to="/donate" 
              className="block text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Donate
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
