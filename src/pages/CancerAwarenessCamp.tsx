import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import ImageModal from '../components/ImageModal';
import { Calendar, MapPin, FileText, Users, ChevronDown, ChevronUp, PlayCircle } from 'lucide-react';
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
    video_links: string[];
  };
}

// Colors for charts
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];
const GENDER_COLORS = ['#0088FE', '#FF6B8A'];
const RESULT_COLORS = ['#4CAF50', '#FFC107', '#F44336'];

const CancerAwarenessCamp = () => {
  const [campData, setCampData] = useState<CampData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [expandedCamps, setExpandedCamps] = useState<{ [key: string]: boolean }>({});
  const [expandedSettlements, setExpandedSettlements] = useState<{ [key: string]: boolean }>({});
  
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
            <p className="text-lg text-red-600 mb-4">
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
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Impact Statistics</h2>
            <p className="text-lg text-gray-600">Our cancer awareness and detection efforts across Tibetan communities</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-primary/5 p-6 rounded-xl text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary mb-2">45,000</div>
              <p className="text-gray-600">People Screened</p>
            </div>
            <div className="bg-primary/5 p-6 rounded-xl text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">144+</div>
              <p className="text-gray-600">Campus</p>
            </div>
            <div className="bg-primary/5 p-6 rounded-xl text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">39.21%</div>
              <p className="text-gray-600">H. pylori Positive</p>
            </div>
            <div className="bg-primary/5 p-6 rounded-xl text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">60.79%</div>
              <p className="text-gray-600">H. pylori Negative</p>
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
              {campData.videos.video_links.map((videoUrl, index) => {
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
                        title={`Cancer Awareness Camp Video ${index + 1}`}
                        className="w-full h-full"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">Cancer Awareness Camp Video {index + 1}</h3>
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
              <Link 
                to="/contact" 
                className="bg-primary text-white hover:bg-primary/90 font-semibold py-3 px-6 rounded-full transition-colors"
              >
                Contact Us
              </Link>
              <a 
                href={`mailto:${campData.contactEmail}`} 
                className="bg-white text-primary border border-primary hover:bg-gray-50 font-semibold py-3 px-6 rounded-full transition-colors"
              >
                Email the Program Coordinator
              </a>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default CancerAwarenessCamp;
