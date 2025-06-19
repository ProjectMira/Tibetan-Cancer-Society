import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import { Calendar, MapPin, RotateCw, Heart, Info, Ambulance, Home, Coffee, PlayCircle } from 'lucide-react';
import ImageModal from '../components/ImageModal';

interface AmbulanceService {
  'Patient Name'?: string;
  Diagnosis?: string;
  Date: string;
  From?: string;
  To?: string;
  from?: string;
  to?: string;
  diagnosis?: string;
  Trip: string;
  Story?: string;
  Image?: string[];
}

interface AmbulanceCar {
  inauguration_date: string;
  funded_by: string;
  venue: string;
  event: string;
  images: string[];
}

interface AmbulanceData {
  ambulance_service_provided: AmbulanceService[];
  ambulance_cars: Array<{
    Ambulance1: AmbulanceCar;
    Ambulance2: AmbulanceCar;
  }>;
  patient_stories: {
    'Patient Name': string;
    Diagnosis: string;
    Date: string;
    From: string;
    To: string;
    Trip: string;
    Story: string;
    Image: string[];
  }[];
  videos?: {
    topic: string;
    category: string;
    video_links: string[];
  };
}

const AmbulanceServices: React.FC = () => {
  const [ambulanceData, setAmbulanceData] = useState<AmbulanceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'cars' | 'services' | 'stories'>('cars');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [modalImages, setModalImages] = useState<string[]>([]);
  const [modalIndex, setModalIndex] = useState<number>(-1);
  const [footerData, setFooterData] = useState<any>(null);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch ambulance data
        const ambulanceResponse = await fetch('/assets/data/ambulance.json');
        if (!ambulanceResponse.ok) {
          throw new Error('Failed to fetch ambulance data');
        }
        const ambulanceData = await ambulanceResponse.json();
        setAmbulanceData(ambulanceData);
        
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

  if (loading) {
    return (
      <PageLayout>
        <div className="flex justify-center items-center min-h-[50vh]">
          <p className="text-lg">Loading ambulance services data...</p>
        </div>
      </PageLayout>
    );
  }

  if (error) {
    return (
      <PageLayout>
        <div className="flex justify-center items-center min-h-[50vh]">
          <p className="text-lg text-red-600">Error loading ambulance data: {error}</p>
        </div>
      </PageLayout>
    );
  }

  if (!ambulanceData) {
    return (
      <PageLayout>
        <div className="flex justify-center items-center min-h-[50vh]">
          <p className="text-lg">No ambulance data available.</p>
        </div>
      </PageLayout>
    );
  }

  // Get regular services, patient stories, and ambulance cars
  const regularServices = ambulanceData.ambulance_service_provided;
  const patientStories = ambulanceData.patient_stories || [];
  const ambulanceCars = ambulanceData.ambulance_cars ? ambulanceData.ambulance_cars[0] : null;
  
  console.log('Patient Stories:', patientStories.length);
  console.log('Regular Services:', regularServices.length);
  
  // Pagination for ambulance services
  const indexOfLastService = currentPage * itemsPerPage;
  const indexOfFirstService = indexOfLastService - itemsPerPage;
  const currentServices = regularServices.slice(indexOfFirstService, indexOfLastService);
  const totalPages = Math.ceil(regularServices.length / itemsPerPage);
  
  // Function to change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Format date function
  const formatDate = (dateString: string) => {
    // Check if date is in format "DD/MM/YYYY"
    if (dateString.includes('/')) {
      const [day, month, year] = dateString.split('/');
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
    // Otherwise assume it's in YYYY-MM-DD format or just return as is
    return dateString;
  };

  const openModal = (images: string[], idx: number) => {
    setModalImages(images);
    setSelectedImage(images[idx]);
    setModalIndex(idx);
    setImageModalOpen(true);
  };

  const closeModal = () => {
    setImageModalOpen(false);
    setSelectedImage(null);
    setModalIndex(-1);
    setModalImages([]);
  };

  const handlePrev = () => {
    if (!modalImages.length) return;
    const prevIdx = (modalIndex - 1 + modalImages.length) % modalImages.length;
    setSelectedImage(modalImages[prevIdx]);
    setModalIndex(prevIdx);
  };

  const handleNext = () => {
    if (!modalImages.length) return;
    const nextIdx = (modalIndex + 1) % modalImages.length;
    setSelectedImage(modalImages[nextIdx]);
    setModalIndex(nextIdx);
  };
  
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative py-16 md:py-24">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src="/assets/hero-images/Ambulance service.jpg" 
            alt="Ambulance Services" 
            className="w-full h-full object-cover" 
            style={{ objectPosition: '50% 40%' }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/assets/programs/ambulance.jpg';
            }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Ambulance Services</h1>
            <p className="text-xl mb-8">
              Providing critical transportation for patients to access medical care when they need it most.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="bg-white/10 backdrop-blur-sm px-4 py-3 rounded-lg flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
                <span>24/7 Emergency Service</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-4 py-3 rounded-lg flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-primary" />
                <span>Door-to-Hospital Transport</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-4 py-3 rounded-lg flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span>Medical Staff On Board</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Bar */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex flex-wrap justify-center gap-2 md:gap-4">
            <Link 
              to="/programs-services" 
              className="flex items-center px-4 py-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors text-sm md:text-base"
            >
              <Info className="h-4 w-4 mr-2" />
              All Programs
            </Link>
            <Link 
              to="/ambulance-services" 
              className="flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors text-sm md:text-base"
            >
              <Ambulance className="h-4 w-4 mr-2" />
              Ambulance Services
            </Link>
            <Link 
              to="/compassion-home" 
              className="flex items-center px-4 py-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors text-sm md:text-base"
            >
              <Home className="h-4 w-4 mr-2" />
              Compassion Home
            </Link>
            <Link 
              to="/community-kitchen" 
              className="flex items-center px-4 py-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors text-sm md:text-base"
            >
              <Coffee className="h-4 w-4 mr-2" />
              Community Kitchen
            </Link>
            <Link 
              to="/cancer-awareness-camp" 
              className="flex items-center px-4 py-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors text-sm md:text-base"
            >
              <Heart className="h-4 w-4 mr-2" />
              Cancer Awareness Camp
            </Link>
            <Link 
              to="/world-cancer-day" 
              className="flex items-center px-4 py-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors text-sm md:text-base"
            >
              <Calendar className="h-4 w-4 mr-2" />
              World Cancer Day
            </Link>
          </nav>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-primary/5 p-6 rounded-xl text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">750+</div>
              <p className="text-gray-600">Total Ambulance Services</p>
            </div>
            <div className="bg-primary/5 p-6 rounded-xl text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary mb-2">1,55,000</div>
              <p className="text-gray-600">Total K.M. Covered</p>
            </div>
            <div className="bg-primary/5 p-6 rounded-xl text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{patientStories ? patientStories.length : 0}</div>
              <p className="text-gray-600">Patient Stories</p>
            </div>
            <div className="bg-primary/5 p-6 rounded-xl text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">24/7</div>
              <p className="text-gray-600">Emergency Availability</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="flex border-b border-gray-200 overflow-x-auto">
            <button
              className={`py-4 px-6 text-center border-b-2 font-medium text-lg ${
                activeTab === 'cars'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('cars')}
            >
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 16v3a2 2 0 01-2 2h-1a2 2 0 01-2-2v-1h-2v1a2 2 0 01-2 2H9a2 2 0 01-2-2v-3m14-6v2a2 2 0 01-2 2H9a2 2 0 01-2-2v-2m14-6l-3-3H8L5 7m14-1v2H5V6a2 2 0 012-2h10a2 2 0 012 2z" />
                </svg>
                <span>Our Ambulances</span>
              </div>
            </button>
            <button
              className={`py-4 px-6 text-center border-b-2 font-medium text-lg ${
                activeTab === 'services'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('services')}
            >
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Ambulance Services</span>
              </div>
            </button>
            <button
              className={`py-4 px-6 text-center border-b-2 font-medium text-lg ${
                activeTab === 'stories'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('stories')}
            >
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <span>Patient Stories</span>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Modal for enlarged image */}
      {imageModalOpen && selectedImage && (
        <ImageModal
          src={selectedImage}
          alt="Enlarged ambulance image"
          onClose={closeModal}
          onNext={modalImages.length > 1 ? handleNext : undefined}
          onPrevious={modalImages.length > 1 ? handlePrev : undefined}
          currentIndex={modalIndex}
          totalImages={modalImages.length}
        />
      )}
      
      {/* Ambulance Cars */}
      {activeTab === 'cars' && (
        <section className="py-12 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Ambulance Fleet</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Providing critical medical transportation services to the Tibetan community and beyond.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {ambulanceCars && (
                <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                  <div className="bg-primary text-white text-center py-3 rounded-t-lg">
                    <h3 className="text-xl font-bold">Ambulance 1</h3>
                  </div>
                  
                  <div className="p-6">
                    <div className="mb-6">
                      <div className="bg-gray-50 p-5 rounded-lg">
                        <div className="mb-3">
                          <div className="flex items-center mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="font-semibold">Inauguration:</span>
                            <span className="ml-2">{ambulanceCars.Ambulance1.inauguration_date}</span>
                          </div>
                          
                          <div className="flex items-center mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                            </svg>
                            <span className="font-semibold">Funded By:</span>
                            <span className="ml-2">{ambulanceCars.Ambulance1.funded_by}</span>
                          </div>
                          
                          <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="font-semibold">Venue:</span>
                            <span className="ml-2">{ambulanceCars.Ambulance1.venue}</span>
                          </div>
                        </div>
                        
                        <div className="mt-4">
                          <h4 className="font-bold text-primary mb-2 text-lg">Event Description</h4>
                          <p className="text-gray-700 text-sm leading-relaxed">
                            {ambulanceCars.Ambulance1.event}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <h4 className="font-bold text-xl text-center text-gray-800 mb-5">Inauguration Gallery</h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {ambulanceCars.Ambulance1.images.map((img, imgIndex) => (
                          <div 
                            key={imgIndex} 
                            className="aspect-square overflow-hidden rounded-lg shadow-md border border-gray-200 cursor-pointer transform transition hover:scale-105"
                            onClick={() => openModal(ambulanceCars.Ambulance1.images, imgIndex)}
                          >
                            <img
                              className="w-full h-full object-cover"
                              src={img}
                              alt={`Ambulance 1 - Image ${imgIndex + 1}`}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {ambulanceCars && (
                <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                  <div className="bg-primary text-white text-center py-3 rounded-t-lg">
                    <h3 className="text-xl font-bold">Ambulance 2</h3>
                  </div>
                  
                  <div className="p-6">
                    <div className="mb-6">
                      <div className="bg-gray-50 p-5 rounded-lg">
                        <div className="mb-3">
                          <div className="flex items-center mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="font-semibold">Inauguration:</span>
                            <span className="ml-2">{ambulanceCars.Ambulance2.inauguration_date}</span>
                          </div>
                          
                          <div className="flex items-center mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                            </svg>
                            <span className="font-semibold">Funded By:</span>
                            <span className="ml-2">{ambulanceCars.Ambulance2.funded_by}</span>
                          </div>
                          
                          <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="font-semibold">Venue:</span>
                            <span className="ml-2">{ambulanceCars.Ambulance2.venue}</span>
                          </div>
                        </div>
                        
                        <div className="mt-4">
                          <h4 className="font-bold text-primary mb-2 text-lg">Event Description</h4>
                          <p className="text-gray-700 text-sm leading-relaxed">
                            {ambulanceCars.Ambulance2.event}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <h4 className="font-bold text-xl text-center text-gray-800 mb-5">Donation Gallery</h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {ambulanceCars.Ambulance2.images.map((img, imgIndex) => (
                          <div 
                            key={imgIndex} 
                            className="aspect-square overflow-hidden rounded-lg shadow-md border border-gray-200 cursor-pointer transform transition hover:scale-105"
                            onClick={() => openModal(ambulanceCars.Ambulance2.images, imgIndex)}
                          >
                            <img
                              className="w-full h-full object-cover"
                              src={img}
                              alt={`Ambulance 2 - Image ${imgIndex + 1}`}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Ambulance Services Table */}
      {activeTab === 'services' && (
        <section className="py-8 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-6">Ambulance Service Records</h2>
            <div className="overflow-x-auto bg-white rounded-xl shadow-sm">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-primary/10">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-primary uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-primary uppercase tracking-wider">
                      Diagnosis
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-primary uppercase tracking-wider">
                      From
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-primary uppercase tracking-wider">
                      To
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-primary uppercase tracking-wider">
                      Trip Type
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentServices.map((service, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {formatDate(service.Date)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{service.Diagnosis || service.diagnosis}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{service.From || service.from}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{service.To || service.to}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-bold rounded-full ${service.Trip === 'Round trip' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                          {service.Trip}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-8">
              <nav className="inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center px-4 py-2 rounded-l-md border ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-500 hover:bg-gray-50'} text-sm font-medium`}
                >
                  Previous
                </button>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  // Calculate page numbers to show (centered around current page)
                  let pageNum = currentPage;
                  if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  // Skip if page number is out of range
                  if (pageNum <= 0 || pageNum > totalPages) return null;
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => paginate(pageNum)}
                      className={`relative inline-flex items-center px-4 py-2 border ${currentPage === pageNum ? 'bg-primary text-white' : 'bg-white text-gray-500 hover:bg-gray-50'} text-sm font-medium`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                <button
                  onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
                  disabled={currentPage === totalPages}
                  className={`relative inline-flex items-center px-4 py-2 rounded-r-md border ${currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-500 hover:bg-gray-50'} text-sm font-medium`}
                >
                  Next
                </button>
              </nav>
            </div>
          </div>
        </section>
      )}

      {/* Patient Stories */}
      {activeTab === 'stories' && (
        <section className="py-12 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Patient Stories</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Real stories of patients who have benefited from our ambulance services.
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-8">
              {patientStories.map((story, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                  <div className="bg-primary text-white text-center py-3 rounded-t-lg">
                    <h3 className="text-xl font-bold">{story['Patient Name']}</h3>
                  </div>
                  
                  <div className="p-6">
                    <div className="mb-6">
                      <div className="bg-gray-50 p-5 rounded-lg">
                        <div className="mb-3">
                          <div className="flex items-center mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <span className="font-semibold">Diagnosis:</span>
                            <span className="ml-2">{story.Diagnosis}</span>
                          </div>
                          
                          <div className="flex items-center mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="font-semibold">Date:</span>
                            <span className="ml-2">{story.Date}</span>
                          </div>
                          
                          <div className="flex items-center mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="font-semibold">Location:</span>
                            <span className="ml-2">{story.From} to {story.To}</span>
                          </div>
                          
                          <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            <span className="font-semibold">Trip Type:</span>
                            <span className="ml-2">{story.Trip}</span>
                          </div>
                        </div>
                        
                        {story.Image && story.Image.length > 0 && (
                          <div className="mt-4">
                            <h4 className="font-bold text-primary mb-3 text-lg">Patient Gallery</h4>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                              {story.Image.map((img, imgIndex) => (
                                <div 
                                  key={imgIndex} 
                                  className="aspect-square overflow-hidden rounded-lg shadow-md border border-gray-200 cursor-pointer transform transition hover:scale-105"
                                  onClick={() => openModal(story.Image, imgIndex)}
                                >
                                  <img
                                    className="w-full h-full object-cover"
                                    src={img}
                                    alt={`${story['Patient Name']} - Image ${imgIndex + 1}`}
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <h4 className="font-bold text-primary mb-2 text-lg">Patient Story</h4>
                      <p className="text-gray-700 text-sm leading-relaxed">{story.Story}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Ambulance Service Videos Section */}
      {ambulanceData.videos && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full mb-2">
                <PlayCircle className="h-3 w-3 mr-1" />
                <span>Video Gallery</span>
              </div>
              <h2 className="text-3xl font-bold mb-4">Ambulance Service Videos</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Watch our ambulance services in action and see how we provide critical transportation for patients in need.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {ambulanceData.videos.video_links.map((videoUrl, index) => {
                // Handle both youtu.be and youtube.com formats
                let videoId = '';
                if (videoUrl.includes('youtu.be/')) {
                  videoId = videoUrl.split('youtu.be/')[1].split('?')[0];
                } else if (videoUrl.includes('youtube.com/watch?v=')) {
                  videoId = videoUrl.split('v=')[1].split('&')[0];
                }
                const embedUrl = `https://www.youtube.com/embed/${videoId}`;
                
                return (
                  <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="aspect-video">
                      <iframe
                        src={embedUrl}
                        title={`Ambulance Service Video ${index + 1}`}
                        className="w-full h-full"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">Ambulance Service Video {index + 1}</h3>
                      <p className="text-sm text-gray-600">
                        Watch our emergency ambulance services providing critical transportation for patients.
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary/5 p-8 md:p-12 rounded-2xl text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Need Ambulance Service?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Our ambulance service is available 24/7 for emergency transportation to medical facilities.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href={`tel:${footerData?.contact?.phone || '+91 82172 11567'}`} 
                className="bg-primary text-white hover:bg-primary/90 font-semibold py-3 px-6 rounded-full transition-colors flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Call for Emergency
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

export default AmbulanceServices;
