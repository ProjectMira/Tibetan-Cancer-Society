import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Phone, HelpCircle, Mail, Heart, Search, ChevronDown } from 'lucide-react';
import HelpModal from './HelpModal';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [helpModalOpen, setHelpModalOpen] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    phone: '',
    email: ''
  });
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [programsDropdownOpen, setProgramsDropdownOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [mobileProgramsOpen, setMobileProgramsOpen] = useState(false);

  const navigate = useNavigate();

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
              {/* About Us Dropdown */}
              <Link to="/about" className="font-medium hover:text-primary transition-colors py-2 border-b-2 border-transparent hover:border-primary">
                About Us
              </Link>
              {/* Programs & Services Dropdown */}
              <div className="relative">
                <button
                  className="font-medium hover:text-primary transition-colors py-2 border-b-2 border-transparent hover:border-primary flex items-center gap-1"
                  tabIndex={0}
                  onClick={(e) => {
                    e.preventDefault();
                    setProgramsDropdownOpen((open) => {
                      if (!open) setAboutDropdownOpen(false);
                      return !open;
                    });
                  }}
                >
                  Programs & Services <ChevronDown className="h-4 w-4" />
                </button>
              </div>
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
              <Link to="/donate" className="flex items-center bg-pink-600 text-white hover:bg-pink-700 px-3 py-1.5 rounded-md mr-4">
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
            {/* About Us Mobile Dropdown */}
            <div>
              <button
                className="w-full text-left py-3 font-medium hover:text-primary flex items-center justify-between"
                onClick={() => setMobileAboutOpen((v) => !v)}
              >
                About Us <ChevronDown className={`h-4 w-4 ml-2 transition-transform ${mobileAboutOpen ? 'rotate-180' : ''}`} />
              </button>
              {mobileAboutOpen && (
                <div className="pl-4 pb-2">
                  <Link to="/about#hero" className="block py-2" onClick={() => setMobileMenuOpen(false)}>Hero/Intro</Link>
                  <Link to="/about#mission" className="block py-2" onClick={() => setMobileMenuOpen(false)}>Mission</Link>
                  <Link to="/about#appreciation" className="block py-2" onClick={() => setMobileMenuOpen(false)}>Appreciation & Legal Documents</Link>
                  <Link to="/about#media-coverage" className="block py-2" onClick={() => setMobileMenuOpen(false)}>Media Coverage</Link>
                  <Link to="/team" className="block py-2" onClick={() => setMobileMenuOpen(false)}>Our Team</Link>
                  <Link to="/testimonials" className="block py-2" onClick={() => setMobileMenuOpen(false)}>Testimonials</Link>
                  <Link to="/contact" className="block py-2" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
                </div>
              )}
            </div>
            {/* Programs & Services Mobile Dropdown */}
            <div>
              <button
                className="w-full text-left py-3 font-medium hover:text-primary flex items-center justify-between"
                onClick={() => setMobileProgramsOpen((v) => !v)}
              >
                Programs & Services <ChevronDown className={`h-4 w-4 ml-2 transition-transform ${mobileProgramsOpen ? 'rotate-180' : ''}`} />
              </button>
              {mobileProgramsOpen && (
                <div className="pl-4 pb-2">
                  <Link to="/programs-services" className="block py-2" onClick={() => setMobileMenuOpen(false)}>All Programs</Link>
                  <Link to="/programs/cancer-awareness-camp" className="block py-2" onClick={() => setMobileMenuOpen(false)}>Cancer Awareness Camp</Link>
                  <Link to="/programs/world-cancer-day" className="block py-2" onClick={() => setMobileMenuOpen(false)}>World Cancer Day</Link>
                  <Link to="/programs/compassion-home" className="block py-2" onClick={() => setMobileMenuOpen(false)}>Compassion Home</Link>
                  <Link to="/programs/ambulance-services" className="block py-2" onClick={() => setMobileMenuOpen(false)}>Ambulance Services</Link>
                  <Link to="/programs/community-kitchen" className="block py-2" onClick={() => setMobileMenuOpen(false)}>Community Kitchen</Link>
                  <Link to="/programs/meals-for-invisibles" className="block py-2" onClick={() => setMobileMenuOpen(false)}>Meals for Invisibles</Link>
                  <Link to="/programs/compassion-home?tab=sunday#sunday-program-tab" className="block py-2" onClick={() => setMobileMenuOpen(false)}>Sunday Program</Link>
                </div>
              )}
            </div>
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
      
      {/* Desktop Dropdowns (full-width, root-level) */}
      {aboutDropdownOpen && (
        {/* About Us dropdown removed as requested */}
      )}
      {programsDropdownOpen && (
        <div className="fixed left-0 right-0 top-[64px] bg-white shadow-xl border-t border-gray-200 z-40">
          <div className="max-w-6xl mx-auto px-0 pt-6 pb-0">
            <div className="grid grid-cols-3 gap-8">
              <div>
                <div className="mb-2 text-lg font-bold text-gray-900 tracking-wide">Patient Programs</div>
                <Link to="/programs/cancer-awareness-camp" className="block py-1.5 text-base text-gray-700 rounded transition hover:bg-primary/10 hover:text-primary font-semibold text-left" onClick={() => setProgramsDropdownOpen(false)}>Cancer Awareness Camp</Link>
                <Link to="/programs/world-cancer-day" className="block py-1.5 text-base text-gray-700 rounded transition hover:bg-primary/10 hover:text-primary font-semibold text-left" onClick={() => setProgramsDropdownOpen(false)}>World Cancer Day</Link>
              </div>
              <div>
                <div className="mb-2 text-lg font-bold text-gray-900 tracking-wide">Support Services</div>
                <Link to="/programs/compassion-home" className="block py-1.5 text-base text-gray-700 rounded transition hover:bg-primary/10 hover:text-primary font-semibold text-left" onClick={() => setProgramsDropdownOpen(false)}>Compassion Home</Link>
                <Link to="/programs/ambulance-services" className="block py-1.5 text-base text-gray-700 rounded transition hover:bg-primary/10 hover:text-primary font-semibold text-left" onClick={() => setProgramsDropdownOpen(false)}>Ambulance Services</Link>
              </div>
              <div>
                <div className="mb-2 text-lg font-bold text-gray-900 tracking-wide">Community Initiatives</div>
                <Link to="/programs/community-kitchen" className="block py-1.5 text-base text-gray-700 rounded transition hover:bg-primary/10 hover:text-primary font-semibold text-left" onClick={() => setProgramsDropdownOpen(false)}>Community Kitchen</Link>
                <Link to="/programs/meals-for-invisibles" className="block py-1.5 text-base text-gray-700 rounded transition hover:bg-primary/10 hover:text-primary font-semibold text-left" onClick={() => setProgramsDropdownOpen(false)}>Meals for Invisibles</Link>
              </div>
            </div>
          </div>
          <button className="w-full flex items-center justify-center gap-2 bg-pink-600 text-white py-4 text-xl font-bold shadow hover:bg-pink-700 transition" onClick={() => { setProgramsDropdownOpen(false); navigate('/programs-services'); }}>
            Explore Programs & Services <span className="ml-1">→</span>
          </button>
        </div>
      )}
      
      {/* Help Modal */}
      <HelpModal isOpen={helpModalOpen} onClose={() => setHelpModalOpen(false)} />
    </header>
  );
};

export default Navbar;

