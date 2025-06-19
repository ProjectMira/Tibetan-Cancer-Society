import React, { useState, useEffect } from 'react';
import PageLayout from '../components/PageLayout';
import ImageModal from '../components/ImageModal';
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
    // This effect runs once on component mount
    const handleTabSelection = () => {
      // Check URL parameters for tab selection
      const queryParams = new URLSearchParams(window.location.search);
      const tabParam = queryParams.get('tab');
      const hash = window.location.hash;
      
      // Set active tab based on URL parameter or hash
      if (tabParam === 'sunday' || hash.includes('sunday-program')) {
        setActiveTab('sunday');
        
        // Focus on the Sunday program section after a short delay to ensure DOM is fully loaded
        setTimeout(() => {
          // First try to click the Sunday tab button to ensure proper tab activation
          const sundayTabButton = document.getElementById('sunday-program-tab');
          if (sundayTabButton && sundayTabButton instanceof HTMLButtonElement) {
            sundayTabButton.click(); // Programmatically click the button to ensure event handlers run
            sundayTabButton.focus();
            
            // After clicking the tab, scroll to the content section
            setTimeout(() => {
              const sundayProgramSection = document.getElementById('sunday-program-section');
              if (sundayProgramSection) {
                sundayProgramSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
              } else {
                // If section not found, at least scroll to the tab
                sundayTabButton.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
            }, 100);
          }
        }, 500); // Increased delay to ensure DOM is fully loaded
      }
    };
    
    // Run the handler once on mount
    handleTabSelection();
    
    // Also add a listener for hash changes (for when users navigate with browser back/forward)
    window.addEventListener('hashchange', handleTabSelection);

    // Fetch data
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

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener('hashchange', handleTabSelection);
    };
  }, []);

  // Navigation functions for the image modal
  const getImagesForActiveView = () => {
    if (activeTab === 'homes' && homeData?.compassion_home && homeData.compassion_home.length > 0) {
      return homeData.compassion_home[activeHomeIndex].images || [];
    } else if (activeTab === 'sunday' && homeData?.sunday_program) {
      return homeData.sunday_program.images || [];
    }
    return [];
  };
  
  const handlePrevImage = () => {
    if (!selectedImage) return;
    
    const images = getImagesForActiveView();
    const currentIndex = images.findIndex(img => img === selectedImage);
    if (currentIndex > 0) {
      setSelectedImage(images[currentIndex - 1]);
    } else {
      // Loop to the end if at the beginning
      setSelectedImage(images[images.length - 1]);
    }
  };
  
  const handleNextImage = () => {
    if (!selectedImage) return;
    
    const images = getImagesForActiveView();
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
          <img 
            src="/assets/hero-images/compassion home.jpg" 
            alt="Compassion Home" 
            className="w-full h-full object-cover" 
            style={{ objectPosition: '50% 40%' }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/assets/placeholders/placeholder-image.svg';
              target.onerror = null; // Prevent infinite loop
            }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Compassion Home</h1>
            <p className="text-xl mb-8">
              Compassion Home, an initiative of the Tibetan Cancer Society, provides a safe and welcoming haven for cancer patients who must travel far from home to receive treatment. Our facility offers a peaceful and supportive environment where patients can stay throughout their treatment journey, easing the emotional, financial, and logistical challenges of finding accommodation near hospitals. We are dedicated to offering comfort, dignity, and care to those facing cancer, helping them feel at home even when they are far from their own.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="bg-white/10 backdrop-blur-sm px-4 py-3 rounded-lg flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Safe Haven for Patients</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-4 py-3 rounded-lg flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-primary" />
                <span>{activeHome.location}</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-4 py-3 rounded-lg flex items-center">
                <Users className="h-5 w-5 mr-2 text-primary" />
                <span>Supportive Community</span>
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
              Providing safe haven and support for cancer patients during their treatment journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="text-3xl font-bold text-blue-900 mb-2">200+</div>
              <div className="text-blue-700 font-medium">Patients Housed</div>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-600 text-white rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="text-3xl font-bold text-green-900 mb-2">3000+</div>
              <div className="text-green-700 font-medium">Nights of Accommodation</div>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-600 text-white rounded-full mb-4">
                <MapPin className="h-6 w-6" />
              </div>
              <div className="text-3xl font-bold text-purple-900 mb-2">2</div>
              <div className="text-purple-700 font-medium">Safe Locations</div>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-600 text-white rounded-full mb-4">
                <Calendar className="h-6 w-6" />
              </div>
              <div className="text-3xl font-bold text-orange-900 mb-2">9+</div>
              <div className="text-orange-700 font-medium">Years of Service</div>
            </div>
          </div>
        </div>
      </section>

      {/* Compassion Home Details */}
      <section className="py-12 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Compassion Homes</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Supporting cancer patients with safe accommodation and care during their treatment journey.
            </p>
          </div>
          
          {/* Purpose Section */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300 mb-12">
            <div className="bg-primary text-white text-center py-3 rounded-t-lg">
              <h3 className="text-xl font-bold">Our Purposes</h3>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                {homeData.Purpose.map((purpose, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700">{purpose}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Tabs */}
          <div className="flex justify-center mb-12">
            <div className="grid grid-cols-2 w-full max-w-2xl gap-0 rounded-lg shadow-md overflow-hidden" role="group">
              <button
                type="button"
                className={`px-6 py-4 text-lg font-medium flex items-center justify-center gap-2 transition-all duration-200 ${
                  activeTab === 'homes'
                    ? 'bg-primary text-white shadow-inner'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                } border border-gray-200`}
                onClick={() => setActiveTab('homes')}
                aria-label="View Compassion Homes"
              >
                <MapPin className="h-5 w-5" />
                <span>Compassion Homes</span>
              </button>
              <button
                type="button"
                className={`px-6 py-4 text-lg font-medium flex items-center justify-center gap-2 transition-all duration-200 ${
                  activeTab === 'sunday'
                    ? 'bg-primary text-white shadow-inner'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                } border border-gray-200`}
                onClick={() => setActiveTab('sunday')}
                aria-label="View Sunday Program"
                id="sunday-program-tab"
              >
                <Calendar className="h-5 w-5" />
                <span>Sunday Program</span>
              </button>
            </div>
          </div>
          
          <div className="mb-12">
            {activeTab === 'homes' ? (
              <>
                {/* Location Selector */}
                {homes.length > 1 && (
                  <div className="mb-12">
                    <h3 className="text-2xl font-bold text-center mb-6">Our Compassion Home Locations</h3>
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
                )}
                
                {/* Home Details Card */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 mb-12">
                  <div className="bg-primary text-white text-center py-3 rounded-t-lg">
                    <h3 className="text-xl font-bold">{activeHome.location} Compassion Home</h3>
                  </div>
                  
                  <div className="p-6">
                    <div className="mb-6">
                      <div className="bg-gray-50 p-5 rounded-lg">
                        <div className="flex items-center mb-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="font-semibold">Inauguration:</span>
                          <span className="ml-2">{activeHome.inauguration_date}</span>
                        </div>
                        
                        <div className="flex items-center mb-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                          </svg>
                          <span className="font-semibold">Funded By:</span>
                          <span className="ml-2">{activeHome.funded_by}</span>
                        </div>
                        
                        <div className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          <div>
                            <span className="font-semibold">Total Staff:</span>
                            <span className="ml-2 block text-gray-700">{activeHome.total_staff}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Purpose */}
                    {activeHome.Purpose && (
                      <div className="mb-8">
                        <h4 className="text-xl font-bold mb-4">Home Purpose</h4>
                        <div className="space-y-3">
                          {activeHome.Purpose.map((purpose, index) => (
                            <div key={index} className="bg-gray-50 p-4 rounded-lg">
                              <p className="text-gray-700">{purpose}</p>
                            </div>
                          ))}
                        </div>
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
                          alt={`${activeHome.location} Home Image ${index + 1}`}
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
              <>
                {/* Sunday Program */}
                <div id="sunday-program-section" className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 mb-12">
                  <div className="bg-primary text-white text-center py-3 rounded-t-lg">
                    <h3 className="text-xl font-bold">Sunday Program</h3>
                  </div>
                  
                  <div className="p-6">
                    <div className="mb-6">
                      <div className="bg-gray-50 p-5 rounded-lg">
                        <div className="flex items-center mb-4">
                          <Calendar className="h-5 w-5 text-primary mr-2" />
                          <span className="font-semibold">Initiated On:</span>
                          <span className="ml-2">{sundayProgram.initiated_on}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Purpose */}
                    <div className="mb-8">
                      <h4 className="text-xl font-bold mb-4">Program Purpose</h4>
                      <div className="space-y-3">
                        {sundayProgram.Purpose.map((purpose, index) => (
                          <div key={index} className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-gray-700">{purpose}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Image Gallery */}
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
            onNext={handleNextImage}
            onPrevious={handlePrevImage}
            currentIndex={getImagesForActiveView().findIndex(img => img === selectedImage)}
            totalImages={getImagesForActiveView().length}
          />
        )}
      </section>


    </PageLayout>
  );
};

export default CompassionHome;
