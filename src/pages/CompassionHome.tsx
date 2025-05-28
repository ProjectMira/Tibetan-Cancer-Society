import React, { useState, useEffect } from 'react';
import PageLayout from '../components/PageLayout';
import { Calendar, MapPin, Users } from 'lucide-react';

interface HomeData {
  inauguration_date: string;
  funded_by: string;
  location: string;
  Purpose?: string[];
  total_staff: string;
  images: string[];
}

interface SundayProgramData {
  initiated_on: string;
  Purpose: string[];
  images: string[];
}

interface CompassionHomeData {
  Purpose: string[];
  compassion_home: HomeData[];
  sunday_program: SundayProgramData;
}

const CompassionHome: React.FC = () => {
  const [homeData, setHomeData] = useState<CompassionHomeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [footerData, setFooterData] = useState<any>(null);
  const [activeHomeIndex, setActiveHomeIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'homes' | 'sunday'>('homes');

  useEffect(() => {
    // Check URL parameters for tab selection
    const queryParams = new URLSearchParams(window.location.search);
    const tabParam = queryParams.get('tab');
    if (tabParam === 'sunday') {
      setActiveTab('sunday');
    }
    
    const fetchData = async () => {
      try {
        // Fetch compassion home data
        const homeResponse = await fetch('/assets/data/compassionhome.json');
        if (!homeResponse.ok) {
          throw new Error('Failed to fetch compassion home data');
        }
        const homeData = await homeResponse.json();
        setHomeData(homeData);
        
        // Fetch footer data
        const footerResponse = await fetch('/assets/data/footer.json');
        if (!footerResponse.ok) {
          throw new Error('Failed to fetch footer data');
        }
        const footerData = await footerResponse.json();
        setFooterData(footerData);
      } catch (err) {
        setError('Error loading data. Please try again later.');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Image Modal Component
  const ImageModal = ({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) => {
    return (
      <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={onClose}>
        <div className="relative max-w-4xl max-h-[90vh] overflow-hidden">
          <button 
            className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <img 
            src={src} 
            alt={alt} 
            className="max-h-[85vh] max-w-full object-contain bg-white/10 backdrop-blur-sm rounded-lg" 
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <PageLayout>
        <div className="flex justify-center items-center min-h-[50vh]">
          <p className="text-lg">Loading compassion home data...</p>
        </div>
      </PageLayout>
    );
  }

  if (error) {
    return (
      <PageLayout>
        <div className="flex justify-center items-center min-h-[50vh]">
          <p className="text-lg text-red-600">Error loading compassion home data: {error}</p>
        </div>
      </PageLayout>
    );
  }

  if (!homeData) {
    return (
      <PageLayout>
        <div className="flex justify-center items-center min-h-[50vh]">
          <p className="text-lg">No compassion home data available.</p>
        </div>
      </PageLayout>
    );
  }

  // Get the current active home data
  const homes = homeData.compassion_home;
  const activeHome = homes[activeHomeIndex];
  const sundayProgram = homeData.sunday_program;

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative py-16 md:py-24">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div 
            className="w-full h-full bg-cover bg-center opacity-15"
            style={{ backgroundImage: `url('/assets/backgrounds/compassion-home-bg.jpg')` }}
          />
        </div>
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Compassion Home</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Providing a safe, comfortable, and supportive environment for cancer patients during their treatment journey.
            </p>
          </div>
          
          {/* General Purpose Section */}
          {homeData.Purpose && (
            <div className="bg-gray-50 rounded-xl shadow-sm overflow-hidden mb-10">
              <div className="p-5 md:p-6">
                <h3 className="text-xl font-bold mb-4 text-primary flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.769 2.156 18 4.828 18h10.343c2.673 0 4.012-3.231 2.122-5.121l-4-4A1 1 0 0113 8.172V4.414l.707-.707A1 1 0 0013 2H7zm2 6.172V4h2v4.172a3 3 0 00.879 2.12l1.027 1.028a4 4 0 00-2.171.102l-.47.156a4 4 0 01-2.53 0l-.563-.187a1.993 1.993 0 00-.114-.035l1.063-1.063A3 3 0 009 8.172z" clipRule="evenodd" />
                  </svg>
                  Our Mission & Purpose
                </h3>
                <ul className="space-y-3">
                  {homeData.Purpose.map((purpose, index) => (
                    <li key={index} className="flex items-start bg-white p-3 rounded-md shadow-xs">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary flex items-center justify-center mt-0.5 mr-3 text-white">
                        <span className="font-medium text-xs">{index + 1}</span>
                      </div>
                      <p className="text-gray-700 text-sm flex-1">{purpose}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          
          {/* Tabs */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-gray-100 rounded-lg p-1">
              <button 
                className={`px-6 py-2 rounded-md font-medium ${activeTab === 'homes' ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-200'}`}
                onClick={() => setActiveTab('homes')}
              >
                Compassion Homes
              </button>
              <button 
                className={`px-6 py-2 rounded-md font-medium ${activeTab === 'sunday' ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-200'}`}
                onClick={() => setActiveTab('sunday')}
                id="sunday-program-tab"
              >
                Sunday Program
              </button>
            </div>
          </div>
          
          {activeTab === 'homes' ? (
            <>
              {/* Location Selector */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-center mb-6">Our Compassion Home Locations</h2>
                <div className="flex flex-wrap justify-center gap-4">
                  {homes.map((home, index) => (
                    <button
                      key={index}
                      className={`px-6 py-3 rounded-full font-medium transition-colors ${activeHomeIndex === index ? 'bg-primary text-white' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'}`}
                      onClick={() => setActiveHomeIndex(index)}
                    >
                      {home.location}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Home Details */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden mb-12">
                <div className="p-6 md:p-8">
                  <h3 className="text-2xl font-bold mb-6">{activeHome.location} Compassion Home</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Calendar className="h-5 w-5 text-primary mr-2" />
                        <h4 className="font-semibold">Inauguration Date</h4>
                      </div>
                      <p>{activeHome.inauguration_date}</p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Users className="h-5 w-5 text-primary mr-2" />
                        <h4 className="font-semibold">Funded By</h4>
                      </div>
                      <p>{activeHome.funded_by}</p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <MapPin className="h-5 w-5 text-primary mr-2" />
                        <h4 className="font-semibold">Staff</h4>
                      </div>
                      <p>{activeHome.total_staff}</p>
                    </div>
                  </div>
                  
                  {/* Purpose */}
                  {activeHome.Purpose && (
                    <div className="mb-8">
                      <h4 className="text-xl font-semibold mb-4">Our Purpose</h4>
                      <ul className="space-y-4">
                        {activeHome.Purpose.map((purpose, index) => (
                          <li key={index} className="flex items-start">
                            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 mr-3">
                              <span className="text-primary font-semibold text-sm">{index + 1}</span>
                            </div>
                            <p className="text-gray-700">{purpose}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Image Gallery */}
              <div className="mt-12">
                <h3 className="text-2xl font-bold text-center mb-8">{activeHome.location} Gallery</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {activeHome.images.map((img, index) => (
                    <div 
                      key={index} 
                      className="aspect-square overflow-hidden rounded-lg shadow-md border border-gray-200 cursor-pointer transform transition hover:scale-105"
                      onClick={() => {
                        setSelectedImage(img);
                        setImageModalOpen(true);
                      }}
                    >
                      <img
                        className="w-full h-full object-cover"
                        src={img}
                        alt={`${activeHome.location} Compassion Home Image ${index + 1}`}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          // Try with different case extensions if the original fails
                          if (img.toLowerCase().endsWith('.jpg')) {
                            target.src = img.replace(/\.jpg$/i, '.JPG');
                          } else if (img.toLowerCase().endsWith('.jpeg')) {
                            target.src = img.replace(/\.jpeg$/i, '.JPEG');
                          } else if (img.toLowerCase().endsWith('.png')) {
                            target.src = img.replace(/\.png$/i, '.PNG');
                          } else {
                            target.src = '/assets/placeholders/placeholder-image.svg';
                          }
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            /* Sunday Program Content */
            <>
              <div className="bg-white rounded-xl shadow-md overflow-hidden mb-12" id="sunday-program-section">
                <div className="p-6 md:p-8">
                  <h3 className="text-2xl font-bold mb-6">Sunday Program</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Calendar className="h-5 w-5 text-primary mr-2" />
                        <h4 className="font-semibold">Initiated On</h4>
                      </div>
                      <p>{sundayProgram.initiated_on}</p>
                    </div>
                  </div>
                  
                  {/* Purpose */}
                  <div className="mb-8">
                    <h4 className="text-xl font-semibold mb-4">Program Objectives</h4>
                    <ul className="space-y-4">
                      {sundayProgram.Purpose.map((purpose, index) => (
                        <li key={index} className="flex items-start">
                          <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 mr-3">
                            <span className="text-primary font-semibold text-sm">{index + 1}</span>
                          </div>
                          <p className="text-gray-700">{purpose}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mb-8">
                    <h4 className="text-xl font-semibold mb-4">About the Sunday Program</h4>
                    <p className="text-gray-700 mb-4">
                      The Sunday Program is a special initiative organized by the Tibetan Cancer Society at our Compassion Homes. 
                      Every Sunday, we create a relaxed and supportive environment where cancer patients, survivors, and their 
                      families can come together to share experiences, engage in recreational activities, and build a sense of community.
                    </p>
                    <p className="text-gray-700">
                      These gatherings include various activities such as group discussions, light exercises, meditation sessions, 
                      cultural performances, and shared meals. The program has become a vital part of our support system, 
                      helping patients cope with the emotional and psychological challenges of cancer treatment.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Sunday Program Gallery */}
              <div className="mt-12">
                <h3 className="text-2xl font-bold text-center mb-8">Sunday Program Gallery</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sundayProgram.images.map((img, index) => (
                    <div 
                      key={index} 
                      className="aspect-square overflow-hidden rounded-lg shadow-md border border-gray-200 cursor-pointer transform transition hover:scale-105"
                      onClick={() => {
                        setSelectedImage(img);
                        setImageModalOpen(true);
                      }}
                    >
                      <img
                        className="w-full h-full object-cover"
                        src={img}
                        alt={`Sunday Program Image ${index + 1}`}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          // Try with different case extensions if the original fails
                          if (img.toLowerCase().endsWith('.jpg')) {
                            target.src = img.replace(/\.jpg$/i, '.JPG');
                          } else if (img.toLowerCase().endsWith('.jpeg')) {
                            target.src = img.replace(/\.jpeg$/i, '.JPEG');
                          } else if (img.toLowerCase().endsWith('.png')) {
                            target.src = img.replace(/\.png$/i, '.PNG');
                          } else {
                            target.src = '/assets/placeholders/placeholder-image.svg';
                          }
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
        
        {/* Image Modal */}
        {imageModalOpen && selectedImage && (
          <ImageModal
            src={selectedImage}
            alt="Compassion Home Image"
            onClose={() => {
              setImageModalOpen(false);
              setSelectedImage(null);
            }}
          />
        )}
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary/5 p-8 md:p-12 rounded-2xl text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Support Our Compassion Home</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Help us continue providing safe accommodation and support for cancer patients during their treatment journey.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href={`tel:${footerData?.contact?.phone || '+91 82172 11567'}`} 
                className="bg-primary text-white hover:bg-primary/90 font-semibold py-3 px-6 rounded-full transition-colors flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Contact Us
              </a>
              <a 
                href={`mailto:${footerData?.contact?.email || 'tibetancancersocietys@gmail.com'}`} 
                className="bg-white text-primary border border-primary hover:bg-gray-50 font-semibold py-3 px-6 rounded-full transition-colors flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                Email Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default CompassionHome;