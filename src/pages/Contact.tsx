import React, { useState, useEffect } from 'react';
import PageLayout from '../components/PageLayout';
import { Phone, Mail, MapPin, Clock, ExternalLink } from 'lucide-react';

const Contact = () => {
  const [contactInfo, setContactInfo] = useState({
    phone: '',
    landline: '',
    email: '',
    mainAddress: '',
    delhiAddress: '',
    southAddress: ''
  });

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const response = await fetch('/assets/data/footer.json');
        const data = await response.json();
        setContactInfo(data.contact);
      } catch (error) {
        console.error('Error fetching contact info:', error);
      }
    };

    fetchContactInfo();
  }, []);
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative text-white py-[4.4rem] md:py-[6.6rem]">
        {/* Background Image with responsive cropping */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* Mobile view - show face */}
          <img 
            src="/assets/contact-us/contact.png" 
            alt="Contact Us Background" 
            className="w-full h-full object-cover md:hidden" 
            style={{ minHeight: '100%', objectPosition: '50% 40%' }}
          />
          
          {/* Desktop view - focus on hands */}
          <img 
            src="/assets/contact-us/contact.png" 
            alt="Contact Us Background" 
            className="w-full h-full object-cover hidden md:block" 
            style={{ 
              minHeight: '100%', 
              objectPosition: '50% 85%',
              transform: 'scale(1.5)',
              transformOrigin: 'center 85%'
            }}
          />
          
          {/* Overlay for both */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 md:mb-6 drop-shadow-lg">Contact Us</h1>
            <p className="text-lg md:text-xl mb-6 md:mb-8 max-w-md mx-auto leading-relaxed drop-shadow-md">
              Reach out to the Tibetan Cancer Society for support, information, or to get involved.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold mb-8">Get In Touch</h2>
              
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1">Phone</h3>
                    <p className="text-gray-600 mb-1">Mobile: {contactInfo.phone}</p>
                    <p className="text-gray-600 mb-1">Landline: {contactInfo.landline}</p>
                    <p className="text-sm text-gray-500">Monday to Friday, 9:00 AM to 5:00 PM IST</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1">Email</h3>
                    <p className="text-gray-600 mb-1">{contactInfo.email}</p>
                    <p className="text-sm text-gray-500">We'll respond as soon as possible</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1">Our Offices</h3>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-800">Main Office:</h4>
                      <p className="text-gray-600 mb-1">{contactInfo.mainAddress}</p>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-800">Delhi Branch:</h4>
                      <p className="text-gray-600 mb-1">{contactInfo.delhiAddress}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-800">South Branch:</h4>
                      <p className="text-gray-600 mb-1">{contactInfo.southAddress}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1">Office Hours</h3>
                    <p className="text-gray-600">Monday to Friday: 9:00 AM - 5:00 PM IST</p>
                    <p className="text-gray-600">Saturday: 10:00 AM - 2:00 PM IST</p>
                    <p className="text-gray-600">Sunday: Closed</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-10">
                <h3 className="text-xl font-semibold mb-4">Connect With Us</h3>
                <div className="flex space-x-4">
                  <a 
                    href="https://www.facebook.com/tibethealth.org" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors"
                    aria-label="Facebook"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a 
                    href="https://x.com/TcsAdmin" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-black text-white p-3 rounded-full hover:bg-gray-800 transition-colors"
                    aria-label="Twitter/X"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                  <a 
                    href="https://www.instagram.com/tibetan.cancersociety/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white p-3 rounded-full hover:opacity-90 transition-opacity"
                    aria-label="Instagram"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a 
                    href={`https://wa.me/${contactInfo.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-green-500 text-white p-3 rounded-full hover:bg-green-600 transition-colors"
                    aria-label="WhatsApp"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.051 3.488"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="bg-gray-50 p-8 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone (Optional)</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <select
                    id="subject"
                    name="subject"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    required
                  >
                    <option value="">Please select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Patient Support</option>
                    <option value="donation">Donation Information</option>
                    <option value="volunteer">Volunteer Opportunities</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    required
                  ></textarea>
                </div>
                
                <div>
                  <button
                    type="submit"
                    className="w-full bg-primary text-white py-3 px-4 rounded-md hover:bg-primary/90 transition-colors font-medium"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Location</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Visit our office in Dharamshala, Himachal Pradesh. We're located at Manocha House, DC Resident.
            </p>
          </div>
          
          <div className="rounded-lg overflow-hidden shadow-md">
            <div className="aspect-w-16 aspect-h-9 h-[400px]">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13482.77882498372!2d76.31465672665716!3d32.21898935613384!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391b50df65bd7311%3A0x3e08bdb100c6dc3c!2sDharamshala%2C%20Himachal%20Pradesh%20176215!5e0!3m2!1sen!2sin!4v1653458562886!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Tibetan Cancer Society Location"
              ></iframe>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <a 
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contactInfo.mainAddress)}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
            >
              <span>Get Directions</span>
              <ExternalLink className="h-4 w-4 ml-1" />
            </a>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Contact;
