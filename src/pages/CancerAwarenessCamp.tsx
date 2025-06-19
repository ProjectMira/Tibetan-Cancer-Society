import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import ImageModal from '../components/ImageModal';
import { Calendar, MapPin, FileText, Users, ChevronDown, ChevronUp, PlayCircle, DollarSign } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Define types for our data
interface Collaborator {
  name: string;
  logo: string;
}

interface GenderStats {
  male: number;
  female: number;
}

interface AgeGroup {
  group: string;
  count: number;
}

interface TestResult {
  category: string;
  count: number;
}

interface Settlement {
  name: string;
  summary: string;
  genderStats: GenderStats;
  ageGroups: AgeGroup[];
  testResults: TestResult[];
  photos: string[];
}

interface HealthCamp {
  id: string;
  date: string;
  place: string;
  testsOffered: string[];
  collaborators: Collaborator[];
  settlements: Settlement[];
}

interface CampData {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  image: string;
  features: string[];
  stats: { value: string; label: string }[];
  contactPerson: string;
  contactEmail: string;
  healthCamps: HealthCamp[];
  videos?: {
    topic: string;
    category: string;
    video_links: Array<{
      id: string;
      url: string;
      title: string;
    }>;
  };
}

// Colors for charts
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];
const GENDER_COLORS = ['#0088FE', '#FF6B8A'];
const RESULT_COLORS = ['#4CAF50', '#FFC107', '#FF69B4'];

const CancerAwarenessCamp = () => {
  const [campData, setCampData] = useState<CampData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [expandedCamps, setExpandedCamps] = useState<{ [key: string]: boolean }>({});
  const [expandedSettlements, setExpandedSettlements] = useState<{ [key: string]: boolean }>({});
  const [footerData, setFooterData] = useState<any>(null);
  
  // Image modal state
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [activeSettlement, setActiveSettlement] = useState<Settlement | null>(null);

  useEffect(() => {
    const fetchCampData = async () => {
      try {
        const response = await fetch('/assets/data/cancer-awareness-camp.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCampData(data);

        // Fetch footer data
        const footerResponse = await fetch('/assets/data/footer.json');
        if (!footerResponse.ok) {
          throw new Error('Failed to fetch footer data');
        }
        const footerData = await footerResponse.json();
        setFooterData(footerData);

        // Initialize expanded state for all camps and settlements
        const campStates: { [key: string]: boolean } = {};
        const settlementStates: { [key: string]: boolean } = {};
        
        data.healthCamps.forEach((camp: HealthCamp) => {
          campStates[camp.id] = false;
          camp.settlements.forEach((settlement) => {
            settlementStates[`${camp.id}-${settlement.name}`] = false;
          });
        });
        
        // Set first camp as expanded by default
        if (data.healthCamps.length > 0) {
          campStates[data.healthCamps[0].id] = true;
          if (data.healthCamps[0].settlements.length > 0) {
            settlementStates[`${data.healthCamps[0].id}-${data.healthCamps[0].settlements[0].name}`] = true;
          }
        }
        
        setExpandedCamps(campStates);
        setExpandedSettlements(settlementStates);
      } catch (error) {
        setError(error instanceof Error ? error : new Error('An unknown error occurred'));
        console.error("Failed to fetch camp data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCampData();
  }, []);

  const toggleCamp = (campId: string) => {
    setExpandedCamps(prev => ({
      ...prev,
      [campId]: !prev[campId]
    }));
  };

  const toggleSettlement = (campId: string, settlementName: string) => {
    const key = `${campId}-${settlementName}`;
    setExpandedSettlements(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Format gender data for pie chart
  const formatGenderData = (stats: GenderStats) => [
    { name: 'Male', value: stats.male },
    { name: 'Female', value: stats.female }
  ];

  // Image modal navigation functions
  const handlePrevImage = () => {
    if (!selectedImage || !activeSettlement) return;
    
    const images = activeSettlement.photos || [];
    const currentIndex = images.findIndex(img => img === selectedImage);
    if (currentIndex > 0) {
      setSelectedImage(images[currentIndex - 1]);
    } else {
      // Loop to the end if at the beginning
      setSelectedImage(images[images.length - 1]);
    }
  };
  
  const handleNextImage = () => {
    if (!selectedImage || !activeSettlement) return;
    
    const images = activeSettlement.photos || [];
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
          <p className="text-lg">Loading camp data...</p>
        </div>
      </PageLayout>
    );
  }

  if (error || !campData) {
    return (
      <PageLayout>
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="text-center">
            <p className="text-lg text-pink-600 mb-4">
              {error ? `Error: ${error.message}` : 'Camp data not found'}
            </p>
            <Link 
              to="/programs-services" 
              className="inline-flex items-center text-primary hover:text-primary/80"
            >
              Back to Programs & Services
            </Link>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          {campData.healthCamps && campData.healthCamps.length > 0 && 
           campData.healthCamps[0].settlements && 
           campData.healthCamps[0].settlements.length > 0 && 
           campData.healthCamps[0].settlements[0].photos && 
           campData.healthCamps[0].settlements[0].photos.length > 0 ? (
            <img 
              src={campData.healthCamps[0].settlements[0].photos[0]} 
              alt="Cancer Awareness Camp" 
              className="w-full h-full object-cover brightness-50"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/assets/programs/awareness-camp.jpg';
              }}
            />
          ) : (
            <img 
              src={campData.image || "/assets/programs/awareness-camp.jpg"} 
              alt="Cancer Awareness Camp" 
              className="w-full h-full object-cover brightness-50"
            />
          )}
        </div>
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-3xl text-white">
            <h1 className="text-4xl font-bold mb-4">{campData.title}</h1>
            <p className="text-xl mb-6">{campData.fullDescription}</p>
            <div className="flex flex-wrap gap-4">
              {campData.stats.map((stat, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg">
                  <div className="text-sm opacity-80">{stat.label}</div>
                </div>
              ))}
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
              Our cancer awareness and detection efforts across Tibetan communities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="text-3xl font-bold text-blue-900 mb-2">45,000</div>
              <div className="text-blue-700 font-medium">People Screened</div>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-600 text-white rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div className="text-3xl font-bold text-green-900 mb-2">144+</div>
              <div className="text-green-700 font-medium">Campus</div>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-600 text-white rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="text-3xl font-bold text-purple-900 mb-2">39.21%</div>
              <div className="text-purple-700 font-medium">H. pylori Positive</div>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-600 text-white rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-3xl font-bold text-orange-900 mb-2">60.79%</div>
              <div className="text-orange-700 font-medium">H. pylori Negative</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-center">Our Health Camps</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto text-center">
              We organize regular health camps across various Tibetan settlements to provide cancer screening and awareness services.
              Below is a list of our recent and upcoming camps.
            </p>
          </div>

          {/* Health Camps Accordion */}
          <div className="space-y-6">
            {campData.healthCamps.map((camp) => (
              <div key={camp.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                {/* Camp Header - Always visible */}
                <div 
                  className="p-6 flex flex-col md:flex-row md:items-center justify-between cursor-pointer hover:bg-gray-50"
                  onClick={() => toggleCamp(camp.id)}
                >
                  <div className="flex-grow">
                    <div className="flex flex-wrap gap-4 mb-3">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="h-5 w-5 mr-2 text-primary" />
                        <span>{camp.date}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <MapPin className="h-5 w-5 mr-2 text-primary" />
                        <span>{camp.place}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Health Camp in {camp.place}</h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {camp.testsOffered.map((test, index) => (
                        <span 
                          key={index} 
                          className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full"
                        >
                          {test}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center mt-4 md:mt-0">
                    {expandedCamps[camp.id] ? 
                      <ChevronUp className="h-6 w-6 text-gray-400" /> : 
                      <ChevronDown className="h-6 w-6 text-gray-400" />}
                  </div>
                </div>

                {/* Camp Details - Visible when expanded */}
                {expandedCamps[camp.id] && (
                  <div className="border-t border-gray-100 p-6">
                    {/* Collaborators */}
                    <div className="mb-8">
                      <h4 className="text-lg font-semibold mb-4">Collaborators</h4>
                      <div className="flex flex-wrap gap-6 items-center">
                        {camp.collaborators.map((collaborator, index) => (
                          <div key={index} className="flex flex-col items-center">
                            <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center p-2 mb-2">
                              <img
                                src={collaborator.logo}
                                alt={collaborator.name}
                                className="w-full h-auto rounded-lg object-cover"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src = '/assets/placeholders/placeholder-image.svg';
                                }}
                              />
                            </div>
                            <span className="text-sm text-center">{collaborator.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Settlements */}
                    <div>
                      <h4 className="text-lg font-semibold mb-4">Settlements Covered</h4>
                      <div className="space-y-4">
                        {camp.settlements.map((settlement) => {
                          const settlementKey = `${camp.id}-${settlement.name}`;
                          const isExpanded = expandedSettlements[settlementKey];

                          return (
                            <div key={settlement.name} className="border border-gray-200 rounded-lg overflow-hidden">
                              {/* Settlement Header */}
                              <div 
                                className="p-4 bg-gray-50 flex justify-between items-center cursor-pointer hover:bg-gray-100"
                                onClick={() => toggleSettlement(camp.id, settlement.name)}
                              >
                                <h5 className="text-md font-medium">{settlement.name}</h5>
                                <div>
                                  {isExpanded ? 
                                    <ChevronUp className="h-5 w-5 text-gray-400" /> : 
                                    <ChevronDown className="h-5 w-5 text-gray-400" />}
                                </div>
                              </div>

                              {/* Settlement Details */}
                              {isExpanded && (
                                <div className="p-4">
                                  <p className="text-gray-600 mb-6">{settlement.summary}</p>
                                  
                                  {/* Statistics Section */}
                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                    {/* Gender Distribution */}
                                    {settlement.genderStats && typeof settlement.genderStats.male === 'number' && typeof settlement.genderStats.female === 'number' ? (
                                    <div className="bg-white p-4 rounded-lg shadow-sm">
                                      <h6 className="text-sm font-semibold mb-4 text-center">Gender Distribution</h6>
                                      <div className="h-64">
                                        <ResponsiveContainer width="100%" height="100%">
                                          <PieChart>
                                            <Pie
                                              data={formatGenderData(settlement.genderStats)}
                                              cx="50%"
                                              cy="50%"
                                              labelLine={false}
                                              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                              outerRadius={80}
                                              fill="#8884d8"
                                              dataKey="value"
                                            >
                                              {formatGenderData(settlement.genderStats).map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={GENDER_COLORS[index % GENDER_COLORS.length]} />
                                              ))}
                                            </Pie>
                                            <Tooltip />
                                          </PieChart>
                                        </ResponsiveContainer>
                                      </div>
                                      <div className="flex justify-center gap-4 mt-2">
                                        <div className="flex items-center">
                                          <div className="w-3 h-3 bg-[#0088FE] rounded-full mr-1"></div>
                                          <span className="text-xs">Male: {settlement.genderStats.male}</span>
                                        </div>
                                        <div className="flex items-center">
                                          <div className="w-3 h-3 bg-[#FF6B8A] rounded-full mr-1"></div>
                                          <span className="text-xs">Female: {settlement.genderStats.female}</span>
                                        </div>
                                      </div>
                                    </div>
                                    ) : null}

                                    {/* Age Demographics */}
                                    {Array.isArray(settlement.ageGroups) && settlement.ageGroups.length > 0 ? (
                                    <div className="bg-white p-4 rounded-lg shadow-sm">
                                      <h6 className="text-sm font-semibold mb-4 text-center">Age Demographics</h6>
                                      <div className="h-64">
                                        <ResponsiveContainer width="100%" height="100%">
                                          <BarChart
                                            data={settlement.ageGroups}
                                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                          >
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="group" />
                                            <YAxis />
                                            <Tooltip />
                                            <Bar dataKey="count" fill="#8884d8">
                                              {settlement.ageGroups.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                              ))}
                                            </Bar>
                                          </BarChart>
                                        </ResponsiveContainer>
                                      </div>
                                    </div>
                                    ) : null}

                                    {/* Test Results */}
                                    {Array.isArray(settlement.testResults) && settlement.testResults.length > 0 ? (
                                    <div className="bg-white p-4 rounded-lg shadow-sm">
                                      <h6 className="text-sm font-semibold mb-4 text-center">Test Results</h6>
                                      <div className="h-64">
                                        <ResponsiveContainer width="100%" height="100%">
                                          <PieChart>
                                            <Pie
                                              data={settlement.testResults}
                                              cx="50%"
                                              cy="50%"
                                              labelLine={false}
                                              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                              outerRadius={80}
                                              fill="#8884d8"
                                              dataKey="count"
                                              nameKey="category"
                                            >
                                              {settlement.testResults.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={RESULT_COLORS[index % RESULT_COLORS.length]} />
                                              ))}
                                            </Pie>
                                            <Tooltip />
                                          </PieChart>
                                        </ResponsiveContainer>
                                      </div>
                                      <div className="flex justify-center gap-4 mt-2">
                                        {settlement.testResults.map((result, index) => (
                                          <div key={index} className="flex items-center">
                                            <div 
                                              className="w-3 h-3 rounded-full mr-1"
                                              style={{ backgroundColor: RESULT_COLORS[index % RESULT_COLORS.length] }}
                                            ></div>
                                            <span className="text-xs">{result.category}: {result.count}</span>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                    ) : null}
                                  </div>

                                  {/* Photo Gallery */}
                                  <div>
                                    <h6 className="text-sm font-semibold mb-4">Photo Gallery</h6>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                      {settlement.photos.map((photo, index) => (
                                        <div 
                                          key={index} 
                                          className="rounded-lg overflow-hidden shadow-sm cursor-pointer transform transition hover:scale-105"
                                          onClick={() => {
                                            setSelectedImage(photo);
                                            setActiveSettlement(settlement);
                                            setImageModalOpen(true);
                                          }}
                                        >
                                          <img 
                                            src={photo} 
                                            alt={`${settlement.name} Camp Photo ${index + 1}`} 
                                            className="w-full h-48 object-cover"
                                            onError={(e) => {
                                              const target = e.target as HTMLImageElement;
                                              target.src = '/assets/placeholders/placeholder-image.svg';
                                            }}
                                          />
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Modal */}
      {imageModalOpen && selectedImage && activeSettlement && (
        <ImageModal
          src={selectedImage}
          alt="Camp Photo"
          onClose={() => {
            setImageModalOpen(false);
            setSelectedImage(null);
          }}
          onNext={handleNextImage}
          onPrevious={handlePrevImage}
          currentIndex={activeSettlement.photos.findIndex(img => img === selectedImage)}
          totalImages={activeSettlement.photos.length}
        />
      )}

      {/* Cancer Awareness Camp Videos Section */}
      {campData.videos && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full mb-2">
                <PlayCircle className="h-3 w-3 mr-1" />
                <span>Video Gallery</span>
              </div>
              <h2 className="text-3xl font-bold mb-4">Cancer Awareness Camp Videos</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Watch our cancer awareness and detection camps in action, see how we educate communities and provide vital screening services.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {campData.videos.video_links.map((video, index) => {
                const embedUrl = `https://www.youtube.com/embed/${video.id}`;
                
                return (
                  <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="aspect-video">
                      <iframe
                        src={embedUrl}
                        title={video.title}
                        className="w-full h-full"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">{video.title}</h3>
                      <p className="text-sm text-gray-600">
                        Watch our cancer awareness and detection activities in Tibetan communities.
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
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary/5 p-8 md:p-12 rounded-2xl text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Interested in Organizing a Camp?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              If you would like to organize a cancer awareness and detection camp in your community, please get in touch with us.
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

export default CancerAwarenessCamp;
