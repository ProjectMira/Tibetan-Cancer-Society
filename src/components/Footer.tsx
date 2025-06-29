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
    landline: string;
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
      case 'whatsapp':
        return (
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.051 3.488"/>
          </svg>
        );
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
              <li className="flex items-start">
                <Phone className="h-4 w-4 text-primary mr-2 mt-0.5" />
                <div className="text-muted-foreground text-sm">
                  <div>Mobile: {footerData.contact.phone}</div>
                  <div>Landline: {footerData.contact.landline}</div>
                </div>
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
