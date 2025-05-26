import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Phone, HelpCircle, Mail, Heart, Search } from 'lucide-react';
import HelpModal from './HelpModal';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [helpModalOpen, setHelpModalOpen] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    phone: '',
    email: ''
  });

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
  
  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const response = await fetch('/assets/data/footer.json');
        const data = await response.json();
        setContactInfo({
          phone: data.contact.phone,
          email: data.contact.email
        });
      } catch (error) {
        console.error('Error fetching contact info:', error);
      }
    };

    fetchContactInfo();
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 flex flex-col justify-center transition-all duration-300 ${
        scrolled ? 'bg-white shadow-sm' : 'bg-white'
      }`}
    >


      {/* Main Navigation */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              {/* Logo */}
              <Link to="/" className="flex items-center">
                <img
                  src="/assets/logo.jpeg"
                  alt="Tibetan Cancer Society Logo"
                  className="h-12 w-12 object-cover rounded-full mr-3 border border-blue-200"
                />
                <span className="text-xl font-bold text-primary">Tibetan Cancer Society</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/about" className="font-medium hover:text-primary transition-colors py-2 border-b-2 border-transparent hover:border-primary">
                About Us
              </Link>
              <Link to="/programs-services" className="font-medium hover:text-primary transition-colors py-2 border-b-2 border-transparent hover:border-primary">
                Programs & Services
              </Link>
              <Link to="/testimonials" className="font-medium hover:text-primary transition-colors py-2 border-b-2 border-transparent hover:border-primary">
                Testimonials
              </Link>
              <Link to="/team" className="font-medium hover:text-primary transition-colors py-2 border-b-2 border-transparent hover:border-primary">
                Our Team
              </Link>
              <Link to="/contact" className="font-medium hover:text-primary transition-colors py-2 border-b-2 border-transparent hover:border-primary">
                Contact
              </Link>
              <button className="text-gray-600 hover:text-primary" aria-label="Search">
                <Search className="h-5 w-5" />
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden">
              <Link to="/donate" className="flex items-center bg-red-600 text-white hover:bg-red-700 px-3 py-1.5 rounded-md mr-4">
                <Heart className="h-3.5 w-3.5 mr-1" />
                Donate
              </Link>
              <button
                className="text-gray-600"
                onClick={toggleMobileMenu}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-[6.5rem] left-0 right-0 bg-white shadow-lg z-50 border-t border-gray-200">
          <div className="px-4 py-2 space-y-1 divide-y divide-gray-200">
            <Link 
              to="/about" 
              className="block py-3 font-medium hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              About Us
            </Link>
            <Link 
              to="/programs-services" 
              className="block py-3 font-medium hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Programs & Services
            </Link>
            <Link 
              to="/testimonials" 
              className="block py-3 font-medium hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Testimonials
            </Link>
            <Link 
              to="/team" 
              className="block py-3 font-medium hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Our Team
            </Link>
            <Link 
              to="/contact" 
              className="block py-3 font-medium hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>

            <div className="py-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full py-2 pl-3 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                />
                <button className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                  <Search className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Help Modal */}
      <HelpModal isOpen={helpModalOpen} onClose={() => setHelpModalOpen(false)} />
    </header>
  );
};

export default Navbar;
