import React, { useEffect, useState } from 'react';
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FooterData {
  organization: {
    name: string;
    description: string;
    socialMedia: Array<{
      platform: string;
      url: string;
    }>;
  };
  contact: {
    mainAddress: string;
    delhiAddress: string;
    southAddress: string;
    phone: string;
    email: string;
  };
}

const Footer = () => {
  const [footerData, setFooterData] = useState<FooterData | null>(null);

  useEffect(() => {
    const loadFooterData = async () => {
      try {
        const response = await fetch('/assets/data/footer.json');
        if (!response.ok) {
          throw new Error('Failed to load footer data');
        }
        const data = await response.json();
        setFooterData(data);
      } catch (error) {
        console.error('Error loading footer data:', error);
      }
    };

    loadFooterData();
  }, []);

  if (!footerData) return null;

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'facebook':
        return <Facebook className="h-5 w-5" />;
      case 'twitter':
        return <Twitter className="h-5 w-5" />;
      case 'instagram':
        return <Instagram className="h-5 w-5" />;
      default:
        return null;
    }
  };

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">{footerData.organization.name}</h3>
            <p className="text-muted-foreground mb-4 max-w-xs">
              {footerData.organization.description}
            </p>
            <div className="flex space-x-4">
              {footerData.organization.socialMedia.map((social, index) => (
                <a 
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-primary"
                >
                  {getSocialIcon(social.platform)}
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/testimonials" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Patient Stories
                </Link>
              </li>
              <li>
                <Link 
                  to="/donate" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Support Us
                </Link>
              </li>
            </ul>
            
            <h3 className="text-lg font-semibold mt-6 mb-4">Our Programs</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/programs/cancer-awareness-camp" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Awareness Camps
                </Link>
              </li>
              <li>
                <Link 
                  to="/programs/world-cancer-day" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  World Cancer Day
                </Link>
              </li>
              <li>
                <Link 
                  to="/programs/patient-support" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Patient Support
                </Link>
              </li>
              <li>
                <Link 
                  to="/programs/compassion-home" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Compassion Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/programs/ambulance-services" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Ambulance Services
                </Link>
              </li>
              <li>
                <Link 
                  to="/programs/community-kitchen" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Community Kitchen
                </Link>
              </li>
              <li>
                <Link 
                  to="/programs/meals-for-invisibles" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Meals for Invisibles
                </Link>
              </li>
              <li>
                <Link 
                  to="/programs/sunday-program" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Sunday Program
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-primary mt-0.5 mr-3" />
                <span className="text-muted-foreground">{footerData.contact.mainAddress}</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-primary mr-3" />
                <span className="text-muted-foreground">{footerData.contact.phone}</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-primary mr-3" />
                <span className="text-muted-foreground">{footerData.contact.email}</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-center text-muted-foreground text-sm">
            © {new Date().getFullYear()} {footerData.organization.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
