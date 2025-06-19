import React, { useState, useEffect } from 'react';
import PageLayout from '../components/PageLayout';
import ImageModal from '../components/ImageModal';
import { Calendar, Users, Coffee, DollarSign, PlayCircle } from 'lucide-react';

interface MealService {
  'SR.NO': number;
  DATE: string;
  SPONSOR: string;
  PURPOSE: string;
  MEALS_PROVIDED: number;
}

interface MFIData {
  list: MealService[];
  images: string[];
  videos?: {
    topic: string;
    video_links: string[];
  };
}

const MealsForInvisible: React.FC = () => {
  const [mfiData, setMfiData] = useState<MealService[]>([]);
  const [mfiImages, setMfiImages] = useState<string[]>([]);
  const [mfiVideos, setMfiVideos] = useState<{topic: string; video_links: string[]} | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'served'>('overview');
  const [currentPage, setCurrentPage] = useState(1);
  const [footerData, setFooterData] = useState<any>(null);
  const [totalMeals, setTotalMeals] = useState(0);
  const [totalSponsors, setTotalSponsors] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch MFI data
        const mfiResponse = await fetch('/assets/data/MFI.json');
        if (!mfiResponse.ok) {
          throw new Error('Failed to fetch MFI data');
        }
        const data = await mfiResponse.json();
        
        // Check if data has the expected structure
        if (data && data.list && Array.isArray(data.list)) {
          setMfiData(data.list);
          
          // Set images if available
          if (data.images && Array.isArray(data.images)) {
            setMfiImages(data.images);
          }
          
          // Set videos if available
          if (data.videos) {
            setMfiVideos(data.videos);
          }
          
          // Calculate total meals and unique sponsors
          const totalMeals = data.list.reduce((sum: number, service: MealService) => sum + service.MEALS_PROVIDED, 0);
          setTotalMeals(totalMeals);
          
          // Count unique sponsors
          const uniqueSponsors = new Set(data.list.map((service: MealService) => service.SPONSOR));
          setTotalSponsors(uniqueSponsors.size);
        } else {
          throw new Error('Invalid data format');
        }
        
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
          <p className="text-lg">Loading Meals for Invisible data...</p>
        </div>
      </PageLayout>
    );
  }

  if (error) {
    return (
      <PageLayout>
        <div className="flex justify-center items-center min-h-[50vh]">
          <p className="text-lg text-red-600">Error loading data: {error}</p>
        </div>
      </PageLayout>
    );
  }

  if (!mfiData || mfiData.length === 0) {
    return (
      <PageLayout>
        <div className="flex justify-center items-center min-h-[50vh]">
          <p className="text-lg">No Meals for Invisible data available.</p>
        </div>
      </PageLayout>
    );
  }

  // Pagination for meal services
  const indexOfLastService = currentPage * itemsPerPage;
  const indexOfFirstService = indexOfLastService - itemsPerPage;
  const currentServices = mfiData.slice(indexOfFirstService, indexOfLastService);
  const totalPages = Math.ceil(mfiData.length / itemsPerPage);
  
  // Function to change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Format date function
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(date);
    } catch (error) {
      return dateString; // Return original string if parsing fails
    }
  };
  
  // Navigation functions for the image modal
  const handlePrevImage = () => {
    if (!selectedImage) return;
    
    const currentIndex = mfiImages.findIndex(img => img === selectedImage);
    if (currentIndex > 0) {
      setSelectedImage(mfiImages[currentIndex - 1]);
    } else {
      // Loop to the end if at the beginning
      setSelectedImage(mfiImages[mfiImages.length - 1]);
    }
  };
  
  const handleNextImage = () => {
    if (!selectedImage) return;
    
    const currentIndex = mfiImages.findIndex(img => img === selectedImage);
    if (currentIndex < mfiImages.length - 1) {
      setSelectedImage(mfiImages[currentIndex + 1]);
    } else {
      // Loop to the beginning if at the end
      setSelectedImage(mfiImages[0]);
    }
  };

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative py-16 md:py-24">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src="/assets/hero-images/Meals for Invisible.jpg" 
            alt="Meals for Invisible" 
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Meals for Invisible</h1>
            <p className="text-xl mb-8">
              Providing nutritious meals to homeless and underprivileged cancer patients who often go unnoticed.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="bg-white/10 backdrop-blur-sm px-4 py-3 rounded-lg flex items-center">
                <Coffee className="h-5 w-5 mr-2 text-primary" />
                <span>Meals Provided</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-4 py-3 rounded-lg flex items-center">
                <Users className="h-5 w-5 mr-2 text-primary" />
                <span>Generous Sponsors</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-4 py-3 rounded-lg flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-primary" />
                <span>Regular Meal Distribution</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Statistics Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Impact Statistics</h2>
            <p className="text-lg text-gray-600">Making a difference in the lives of the invisible members of our community</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-primary/5 p-6 rounded-xl text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary mb-2">1,25,000+</div>
              <p className="text-gray-600">Meals Provided</p>
            </div>
            <div className="bg-primary/5 p-6 rounded-xl text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">1500+</div>
              <p className="text-gray-600">Generous Sponsors</p>
            </div>
            <div className="bg-primary/5 p-6 rounded-xl text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">100+</div>
              <p className="text-gray-600">Beneficiaries</p>
            </div>
            <div className="bg-primary/5 p-6 rounded-xl text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">5+</div>
              <p className="text-gray-600">Years of Service</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meals for Invisible Program</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              The Meals for Invisible project began as an urgent response to the devastating impact of the COVID-19 pandemic on the most vulnerable in our community—drug addicts, substance abusers, destitute individuals, and others often overlooked due to stigma.
            </p>
          </div>
          
          {/* Tabs */}
          <div className="flex justify-center mb-12">
            <div className="grid grid-cols-2 w-full max-w-2xl gap-0 rounded-lg shadow-md overflow-hidden" role="group">
              <button
                type="button"
                className={`px-6 py-4 text-lg font-medium flex items-center justify-center gap-2 transition-all duration-200 ${
                  activeTab === 'overview'
                    ? 'bg-primary text-white shadow-inner'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                } border border-gray-200`}
                onClick={() => setActiveTab('overview')}
                aria-label="View Program Overview"
              >
                <Coffee className="h-5 w-5" />
                <span>Program Overview</span>
              </button>
              <button
                type="button"
                className={`px-6 py-4 text-lg font-medium flex items-center justify-center gap-2 transition-all duration-200 ${
                  activeTab === 'served'
                    ? 'bg-primary text-white shadow-inner'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                } border border-gray-200`}
                onClick={() => setActiveTab('served')}
                aria-label="View Meals Served"
              >
                <Users className="h-5 w-5" />
                <span>Meals Served</span>
              </button>
            </div>
          </div>

          {activeTab === 'overview' ? (
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 mb-12">
              <div className="bg-primary text-white text-center py-3 rounded-t-lg">
                <h3 className="text-xl font-bold">About Meals for Invisible</h3>
              </div>
              
              <div className="p-6">
                <div className="prose max-w-none">
                  <p>
                    The Meals for Invisible project began as an urgent response to the devastating impact of the COVID-19 pandemic on the most vulnerable in our community—drug addicts, substance abusers, destitute individuals, and others often overlooked due to stigma. These "Invisible" members faced acute hunger, poverty, and lack of access to basic needs.
                  </p>
                  
                  <p className="mt-4">
                    Over two months, the project provided nutritious two-time meals daily to over 100 underprivileged people, helping boost their immunity and protect them from the virus. It also created opportunities for stranded youth to volunteer and earn wages, easing their financial burdens during difficult times.
                  </p>
                  
                  <p className="mt-4">
                    Today, the project has grown into a broader food charity drive, extending support to disadvantaged Indian destitute, poor patients seeking medical care at government hospitals, daily wagers, and others in need. With the help of generous donors, meals are provided regularly, often sponsored in honor of birthdays, death anniversaries, and other significant occasions.
                  </p>
                  
                  <p className="mt-4">
                    Meals for Invisible continues to serve as a vital lifeline, restoring dignity and hope to those society often forgets.
                  </p>
                </div>
                
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gray-50 p-5 rounded-lg">
                    <div className="flex items-center mb-3">
                      <Coffee className="h-6 w-6 text-primary mr-2" />
                      <h4 className="font-bold text-lg">Nutritious Meals</h4>
                    </div>
                    <p className="text-gray-600">
                      We provide balanced, nutritious meals that meet dietary requirements and boost immunity.
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-5 rounded-lg">
                    <div className="flex items-center mb-3">
                      <Users className="h-6 w-6 text-primary mr-2" />
                      <h4 className="font-bold text-lg">Community Support</h4>
                    </div>
                    <p className="text-gray-600">
                      Our program is made possible by generous community sponsors who donate to provide meals.
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-5 rounded-lg">
                    <div className="flex items-center mb-3">
                      <Calendar className="h-6 w-6 text-primary mr-2" />
                      <h4 className="font-bold text-lg">Regular Distribution</h4>
                    </div>
                    <p className="text-gray-600">
                      We distribute meals at key locations where vulnerable populations gather or reside.
                    </p>
                  </div>
                </div>
                

              </div>
            </div>
          ) : (
            <div>
              <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 mb-8">
                <div className="bg-gradient-to-r from-primary to-primary/80 text-white text-center py-4 rounded-t-lg">
                  <h3 className="text-xl font-bold">Meal Service Records</h3>
                  <p className="text-sm text-white/90 mt-1">Detailed record of all meal sponsorships and distributions</p>
                </div>
                
                <div className="p-6">
                  {/* Summary Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{currentServices.length}</div>
                      <div className="text-xs text-gray-600">Records on Page</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{mfiData.length.toLocaleString()}</div>
                      <div className="text-xs text-gray-600">Total Records</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{currentServices.reduce((sum, service) => sum + service.MEALS_PROVIDED, 0).toLocaleString()}</div>
                      <div className="text-xs text-gray-600">Meals This Page</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{totalMeals.toLocaleString()}</div>
                      <div className="text-xs text-gray-600">Total Meals</div>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-2 text-primary" />
                              Date
                            </div>
                          </th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-2 text-primary" />
                              Sponsor
                            </div>
                          </th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Purpose</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                            <div className="flex items-center">
                              <Coffee className="h-4 w-4 mr-2 text-primary" />
                              Meals
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-100">
                        {currentServices.map((service, index) => (
                          <tr key={index} className={`transition-colors hover:bg-blue-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{formatDate(service.DATE)}</div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm font-medium text-gray-900 max-w-xs">
                                {service.SPONSOR}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                {service.PURPOSE}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <span className="text-lg font-bold text-primary">{service.MEALS_PROVIDED.toLocaleString()}</span>
                                <span className="text-xs text-gray-500 ml-1">meals</span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  {/* Enhanced Pagination */}
                  {totalPages > 1 && (
                    <div className="mt-8">
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-700">
                          Showing <span className="font-medium">{indexOfFirstService + 1}</span> to{' '}
                          <span className="font-medium">{Math.min(indexOfLastService, mfiData.length)}</span> of{' '}
                          <span className="font-medium">{mfiData.length.toLocaleString()}</span> records
                        </div>
                        <nav className="flex items-center space-x-2">
                          <button
                            onClick={() => paginate(Math.max(1, currentPage - 1))}
                            disabled={currentPage === 1}
                            className={`px-4 py-2 rounded-lg transition-colors ${
                              currentPage === 1 
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                                : 'bg-white text-gray-700 hover:bg-primary hover:text-white border border-gray-300 shadow-sm'
                            }`}
                          >
                            Previous
                          </button>
                          
                          {/* Show page numbers with smart truncation */}
                          {(() => {
                            const pages = [];
                            const showPages = 5;
                            let startPage = Math.max(1, currentPage - Math.floor(showPages / 2));
                            let endPage = Math.min(totalPages, startPage + showPages - 1);
                            
                            if (endPage - startPage < showPages - 1) {
                              startPage = Math.max(1, endPage - showPages + 1);
                            }
                            
                            for (let i = startPage; i <= endPage; i++) {
                              pages.push(
                                <button
                                  key={i}
                                  onClick={() => paginate(i)}
                                  className={`px-4 py-2 rounded-lg transition-colors ${
                                    currentPage === i 
                                      ? 'bg-primary text-white shadow-md' 
                                      : 'bg-white text-gray-700 hover:bg-primary hover:text-white border border-gray-300 shadow-sm'
                                  }`}
                                >
                                  {i}
                                </button>
                              );
                            }
                            return pages;
                          })()}
                          
                          <button
                            onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                            disabled={currentPage === totalPages}
                            className={`px-4 py-2 rounded-lg transition-colors ${
                              currentPage === totalPages 
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                                : 'bg-white text-gray-700 hover:bg-primary hover:text-white border border-gray-300 shadow-sm'
                            }`}
                          >
                            Next
                          </button>
                        </nav>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 mb-12">
                <div className="bg-primary text-white text-center py-3 rounded-t-lg">
                  <h3 className="text-xl font-bold">Sponsorship Summary</h3>
                </div>
                
                <div className="p-6">
                  <div className="prose max-w-none">
                    <p>
                      Our Meals for Invisible program is made possible through the generous support of sponsors who donate to provide meals for those in need. Sponsorships are often made in honor of special occasions, in memory of loved ones, or simply out of compassion for the vulnerable.
                    </p>
                    
                    <h4 className="font-bold text-lg mt-6 mb-3">How to Sponsor Meals</h4>
                    <p>
                      You can sponsor meals for any number of people. The cost per meal is approximately ₹50, but any contribution is welcome. To sponsor meals, please contact us directly or use the donation form on our website.
                    </p>
                    
                    <h4 className="font-bold text-lg mt-6 mb-3">Recognition</h4>
                    <p>
                      All sponsors are acknowledged in our records and, with permission, on our social media channels. Your generosity helps us continue this vital service and brings dignity to those who need it most.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Image Gallery */}
              {mfiImages.length > 0 && (
                <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 mb-12">
                  <div className="bg-primary text-white text-center py-3 rounded-t-lg">
                    <h3 className="text-xl font-bold">Program Gallery</h3>
                  </div>
                  
                  <div className="p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {mfiImages.map((image, index) => (
                        <div 
                          key={index} 
                          className="overflow-hidden rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 cursor-pointer transform transition hover:scale-105"
                          onClick={() => {
                            setSelectedImage(image);
                            setImageModalOpen(true);
                          }}
                        >
                          <img 
                            src={image} 
                            alt={`Meals for Invisible program activity ${index + 1}`} 
                            className="w-full h-48 object-cover"
                            loading="lazy"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              // Try with different case extensions if the original fails
                              if (image.toLowerCase().endsWith('.jpg')) {
                                target.src = image.replace(/\.jpg$/i, '.JPG');
                              } else if (image.toLowerCase().endsWith('.jpeg')) {
                                target.src = image.replace(/\.jpeg$/i, '.JPEG');
                              } else if (image.toLowerCase().endsWith('.png')) {
                                target.src = image.replace(/\.png$/i, '.PNG');
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
              )}
            </div>
          )}
        </div>
      </section>

      {/* Meals for Invisible Videos Section */}
      {mfiVideos && mfiVideos.video_links && mfiVideos.video_links.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full mb-2">
                <PlayCircle className="h-3 w-3 mr-1" />
                <span>Video Gallery</span>
              </div>
              <h2 className="text-3xl font-bold mb-4">Meals for Invisible Videos</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Watch our meal distribution program in action, see how we serve nutritious meals to homeless and underprivileged individuals.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mfiVideos.video_links.map((videoUrl, index) => {
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
                        title={`Meals for Invisible Video ${index + 1}`}
                        className="w-full h-full"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">Meals for Invisible Video {index + 1}</h3>
                      <p className="text-sm text-gray-600">
                        Watch our meal distribution activities serving those who need it most.
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
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Sponsor Meals for the Invisible</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Your contribution can provide nutritious meals to those who need it most. Sponsor meals for birthdays, anniversaries, or in memory of loved ones.
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
      
      {/* Image Modal */}
      {imageModalOpen && selectedImage && (
        <ImageModal
          src={selectedImage}
          alt="Meals for Invisible Image"
          onClose={() => {
            setImageModalOpen(false);
            setSelectedImage(null);
          }}
          onNext={handleNextImage}
          onPrevious={handlePrevImage}
          currentIndex={mfiImages.findIndex(img => img === selectedImage)}
          totalImages={mfiImages.length}
        />
      )}
    </PageLayout>
  );
};

export default MealsForInvisible;
