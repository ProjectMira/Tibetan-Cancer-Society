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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-x-8 gap-y-10">
          {/* Column 1: Organization Info */}
          <div>
            <h3 className="text-lg font-semibold mb-3">{footerData.organization.name}</h3>
            <p className="text-muted-foreground text-sm mb-4 max-w-xs">
              {footerData.organization.description}
            </p>
            <div className="flex space-x-4 mb-2">
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
          
          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <div className="grid gap-y-2">
              <Link 
                to="/about" 
                className="text-muted-foreground text-sm hover:text-primary transition-colors"
              >
                About Us
              </Link>
              <Link 
                to="/testimonials" 
                className="text-muted-foreground text-sm hover:text-primary transition-colors"
              >
                Patient Stories
              </Link>
              <Link 
                to="/team" 
                className="text-muted-foreground text-sm hover:text-primary transition-colors"
              >
                Our Team
              </Link>
              <Link 
                to="/donate" 
                className="text-muted-foreground text-sm hover:text-primary transition-colors"
              >
                Support Us
              </Link>
              <Link 
                to="/contact" 
                className="text-muted-foreground text-sm hover:text-primary transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
          
          {/* Column 3: Our Programs */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Our Programs</h3>
            <div className="grid gap-y-2">
              <Link 
                to="/programs/cancer-awareness-camp" 
                className="text-muted-foreground text-sm hover:text-primary transition-colors"
              >
                Awareness Camps
              </Link>
              <Link 
                to="/programs/world-cancer-day" 
                className="text-muted-foreground text-sm hover:text-primary transition-colors"
              >
                World Cancer Day
              </Link>

              <Link 
                to="/programs/compassion-home" 
                className="text-muted-foreground text-sm hover:text-primary transition-colors"
              >
                Compassion Home
              </Link>
              <Link 
                to="/programs/ambulance-services" 
                className="text-muted-foreground text-sm hover:text-primary transition-colors"
              >
                Ambulance Services
              </Link>
            </div>
          </div>
          
          {/* Column 4: Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Contact Information</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-4 w-4 text-primary mt-0.5 mr-2" />
                <span className="text-muted-foreground text-sm">{footerData.contact.mainAddress}</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-4 w-4 text-primary mr-2" />
                <span className="text-muted-foreground text-sm">{footerData.contact.phone}</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-4 w-4 text-primary mr-2" />
                <span className="text-muted-foreground text-sm">{footerData.contact.email}</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-center text-muted-foreground text-sm">
            © {new Date().getFullYear()} {footerData.organization.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
