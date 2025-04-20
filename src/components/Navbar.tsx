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
      className={`fixed top-0 left-0 right-0 z-50 flex flex-col justify-center transition-all duration-300 ${
        scrolled ? 'bg-white/80 backdrop-blur-md border-b border-border shadow-sm' : 'bg-transparent'
      }`}
      style={{marginTop: '0.75rem'}}
    >
      <div className="w-[96%] bg-blue-100 border-2 border-gray-200 rounded-2xl shadow-xl max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 md:py-6" style={{ fontSize: '1.5rem' }}>
          <div className="flex items-center">
            {/* Logo Image */}
            <img
              src="/assets/logo.jpeg"
              alt="Tibetan Cancer Society Logo"
              className="w-10 h-10 md:w-14 md:h-14 object-cover rounded-full mr-2 md:mr-4 border-2 border-blue-300 shadow-inner bg-white"
            />
            <Link to="/" className="text-xl md:text-3xl font-display font-bold tracking-tight text-primary truncate">
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
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
      
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-[5.5rem] left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg z-50 rounded-b-lg border-x border-b border-gray-200 mx-2">
          <div className="px-6 py-6 space-y-6 flex flex-col">
            <Link 
              to="/about" 
              className="block text-lg font-medium hover:text-primary transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/programs-services" 
              className="block text-lg font-medium hover:text-primary transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Programs & Services
            </Link>
            <Link 
              to="/team" 
              className="block text-lg font-medium hover:text-primary transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Team
            </Link>
            <Link 
              to="/donate" 
              className="block text-lg font-medium hover:text-primary transition-colors py-2"
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
