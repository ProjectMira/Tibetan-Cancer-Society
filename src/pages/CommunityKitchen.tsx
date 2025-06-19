import React, { useState, useEffect } from 'react';
import PageLayout from '../components/PageLayout';
import ImageModal from '../components/ImageModal';
import { Calendar, MapPin, Users, DollarSign } from 'lucide-react';

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

  // Navigation functions for the image modal
  const handlePrevImage = () => {
    if (!selectedImage || !activeKitchen) return;
    
    const images = activeKitchen.images || [];
    const currentIndex = images.findIndex(img => img === selectedImage);
    if (currentIndex > 0) {
      setSelectedImage(images[currentIndex - 1]);
    } else {
      // Loop to the end if at the beginning
      setSelectedImage(images[images.length - 1]);
    }
  };
  
  const handleNextImage = () => {
    if (!selectedImage || !activeKitchen) return;
    
    const images = activeKitchen.images || [];
    const currentIndex = images.findIndex(img => img === selectedImage);
    if (currentIndex < images.length - 1) {
      setSelectedImage(images[currentIndex + 1]);
    } else {
      // Loop to the beginning if at the end
      setSelectedImage(images[0]);
    }
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
          <p className="text-lg text-pink-600">Error loading community kitchen data: {error}</p>
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
              Our Community Kitchen prepares and delivers nutritious, healing meals to cancer patients and their families, recognizing that proper nutrition is essential during treatment but often difficult to maintain due to fatigue, side effects, or financial challenges. To support patients during this critical time, we provide carefully prepared meals designed to meet their specific dietary needs. Beyond cancer care, we are committed to serving vulnerable members of our community by offering nutritious, unlimited meals at no cost to Tibetan homeless individuals, people struggling with or recovering from addiction, sex workers, and anyone who cannot afford a meal. Our kitchen is a place of nourishment, compassion, and dignity, where everyone in need is welcomed and cared for.
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

      {/* Impact Statistics Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Impact</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Making a difference in the lives of cancer patients and marginalized communities through our community kitchens.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-3xl font-bold text-blue-900 mb-2">2</div>
              <div className="text-blue-700 font-medium">Active Kitchens</div>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-600 text-white rounded-full mb-4">
                <Users className="h-6 w-6" />
              </div>
              <div className="text-3xl font-bold text-green-900 mb-2">1000+</div>
              <div className="text-green-700 font-medium">People Served Daily</div>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-600 text-white rounded-full mb-4">
                <MapPin className="h-6 w-6" />
              </div>
              <div className="text-3xl font-bold text-purple-900 mb-2">2</div>
              <div className="text-purple-700 font-medium">Strategic Locations</div>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-600 text-white rounded-full mb-4">
                <Calendar className="h-6 w-6" />
              </div>
              <div className="text-3xl font-bold text-orange-900 mb-2">5+</div>
              <div className="text-orange-700 font-medium">Years of Service</div>
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
            onNext={handleNextImage}
            onPrevious={handlePrevImage}
            currentIndex={activeKitchen.images.findIndex(img => img === selectedImage)}
            totalImages={activeKitchen.images.length}
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
                href={`https://wa.me/${(footerData?.contact?.phone || '+91 82172 11567').replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary text-white hover:bg-primary/90 font-semibold py-3 px-6 rounded-full transition-colors flex items-center"
              >
                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.051 3.488"/>
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
              <a 
                href="/donate" 
                className="bg-green-600 text-white hover:bg-green-700 font-semibold py-3 px-6 rounded-full transition-colors flex items-center"
              >
                <DollarSign className="h-5 w-5 mr-2" />
                Donate Now
              </a>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default CommunityKitchen;
