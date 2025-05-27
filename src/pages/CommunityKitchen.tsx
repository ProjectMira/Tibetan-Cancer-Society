import React, { useState, useEffect } from 'react';
import PageLayout from '../components/PageLayout';
import { Calendar, MapPin, Users } from 'lucide-react';

interface KitchenData {
  location: string;
  inauguration_date: string;
  funded_by: string;
  total_staff: string;
  images: string[];
}

interface CommunityKitchenData {
  Community_kitchen1: KitchenData;
  Community_kitchen2: KitchenData;
  purposes: string[];
}

const CommunityKitchen: React.FC = () => {
  const [kitchenData, setKitchenData] = useState<CommunityKitchenData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [footerData, setFooterData] = useState<any>(null);
  const [activeKitchenIndex, setActiveKitchenIndex] = useState<0 | 1>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch community kitchen data
        const kitchenResponse = await fetch('/assets/data/communitykitchen.json');
        if (!kitchenResponse.ok) {
          throw new Error('Failed to fetch community kitchen data');
        }
        const kitchenData = await kitchenResponse.json();
        setKitchenData(kitchenData);
        
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
          <p className="text-lg">Loading community kitchen data...</p>
        </div>
      </PageLayout>
    );
  }

  if (error) {
    return (
      <PageLayout>
        <div className="flex justify-center items-center min-h-[50vh]">
          <p className="text-lg text-red-600">Error loading community kitchen data: {error}</p>
        </div>
      </PageLayout>
    );
  }

  if (!kitchenData) {
    return (
      <PageLayout>
        <div className="flex justify-center items-center min-h-[50vh]">
          <p className="text-lg">No community kitchen data available.</p>
        </div>
      </PageLayout>
    );
  }

  // Get the current active kitchen data
  const kitchens = [
    kitchenData.Community_kitchen1,
    kitchenData.Community_kitchen2
  ];
  const activeKitchen = kitchens[activeKitchenIndex];

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative py-16 md:py-24">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src="/assets/community-kitchen/2021-communitykitchen-majnukatilla1.JPG" 
            alt="Community Kitchen" 
            className="w-full h-full object-cover" 
            style={{ objectPosition: '50% 40%' }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              // Try alternative image if the main one fails to load
              target.src = '/assets/community-kitchen/2024-communitykitchen-BudhVihar1.jpeg';
              // Add another error handler for the fallback image
              target.onerror = () => {
                target.src = '/assets/placeholders/placeholder-image.svg';
                target.onerror = null; // Prevent infinite loop
              };
            }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Community Kitchen</h1>
            <p className="text-xl mb-8">
              Providing nutritious meals and support to cancer patients and the marginalized community.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="bg-white/10 backdrop-blur-sm px-4 py-3 rounded-lg flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Free Nutritious Meals</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-4 py-3 rounded-lg flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-primary" />
                <span>{activeKitchen.location}</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-4 py-3 rounded-lg flex items-center">
                <Users className="h-5 w-5 mr-2 text-primary" />
                <span>Supporting the Marginalized</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Kitchen Details */}
      <section className="py-12 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Community Kitchens</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Serving the community with nutritious meals and creating opportunities for youth employment.
            </p>
          </div>
          
          {/* Purposes Section */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300 mb-12">
            <div className="bg-primary text-white text-center py-3 rounded-t-lg">
              <h3 className="text-xl font-bold">Our Purposes</h3>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                {kitchenData.purposes.map((purpose, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700">{purpose}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Kitchen Tabs */}
          <div className="flex justify-center mb-12">
            <div className="grid grid-cols-2 w-full max-w-2xl gap-0 rounded-lg shadow-md overflow-hidden" role="group">
              <button
                type="button"
                className={`px-6 py-4 text-lg font-medium flex items-center justify-center gap-2 transition-all duration-200 ${
                  activeKitchenIndex === 0
                    ? 'bg-primary text-white shadow-inner'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                } border border-gray-200`}
                onClick={() => setActiveKitchenIndex(0)}
                aria-label="View Majnukatilla Community Kitchen"
              >
                <MapPin className="h-5 w-5" />
                <span>{kitchens[0].location}</span>
              </button>
              <button
                type="button"
                className={`px-6 py-4 text-lg font-medium flex items-center justify-center gap-2 transition-all duration-200 ${
                  activeKitchenIndex === 1
                    ? 'bg-primary text-white shadow-inner'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                } border border-gray-200`}
                onClick={() => setActiveKitchenIndex(1)}
                aria-label="View Budh Vihar Community Kitchen"
              >
                <MapPin className="h-5 w-5" />
                <span>{kitchens[1].location}</span>
              </button>
            </div>
          </div>
          
          <div className="text-center mb-8 text-gray-600 italic">
            <p>Click on a location above to view details about each community kitchen</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300 mb-12">
            <div className="bg-primary text-white text-center py-3 rounded-t-lg">
              <h3 className="text-xl font-bold">{activeKitchen.location} Community Kitchen</h3>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <div className="bg-gray-50 p-5 rounded-lg">
                  <div className="mb-3">
                    <div className="flex items-center mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="font-semibold">Location:</span>
                      <span className="ml-2">{activeKitchen.location}</span>
                    </div>
                    
                    <div className="flex items-center mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="font-semibold">Inauguration:</span>
                      <span className="ml-2">{activeKitchen.inauguration_date}</span>
                    </div>
                    
                    <div className="flex items-center mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                      </svg>
                      <span className="font-semibold">Funded By:</span>
                      <span className="ml-2">{activeKitchen.funded_by}</span>
                    </div>
                    
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <div>
                        <span className="font-semibold">Total Staff:</span>
                        <span className="ml-2 block text-gray-700">{activeKitchen.total_staff}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              

            </div>
          </div>
          
          {/* Image Gallery */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-center mb-8">{activeKitchen.location} Gallery</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeKitchen.images.map((img, index) => (
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
                    alt={`${activeKitchen.location} Kitchen Image ${index + 1}`}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      // Try with different case extensions if the original fails
                      if (img.toLowerCase().endsWith('.jpg')) {
                        target.src = img.replace(/\.jpg$/i, '.JPG');
                      } else if (img.toLowerCase().endsWith('.jpeg')) {
                        target.src = img.replace(/\.jpeg$/i, '.JPEG');
                      } else {
                        target.src = '/assets/placeholders/placeholder-image.svg';
                      }
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Image Modal */}
        {imageModalOpen && selectedImage && (
          <ImageModal
            src={selectedImage}
            alt="Community Kitchen Image"
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
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Support Our Community Kitchen</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Help us continue providing nutritious meals to cancer patients and marginalized communities.
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

export default CommunityKitchen;
