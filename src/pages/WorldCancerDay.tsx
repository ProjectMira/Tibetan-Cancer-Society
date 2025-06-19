import React, { useState, useEffect } from 'react';
import PageLayout from '../components/PageLayout';
import ImageModal from '../components/ImageModal';
import { MapPin, Award, Calendar, Users } from 'lucide-react';

interface CancerDayEvent {
  year: string;
  theme: string;
  venue: string;
  activities_awareness_mission: string[];
  guest_of_honour: string;
  image: string[];
  about_event?: string;
}

const WorldCancerDay: React.FC = () => {
  const [eventsData, setEventsData] = useState<CancerDayEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [footerData, setFooterData] = useState<any>(null);
  const [activeEventIndex, setActiveEventIndex] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch cancer day data
        const eventsResponse = await fetch('/assets/data/cancerday.json');
        if (!eventsResponse.ok) {
          throw new Error('Failed to fetch World Cancer Day data');
        }
        const eventsData = await eventsResponse.json();
        setEventsData(eventsData); // JSON is already in array format
        
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
          <p className="text-lg">Loading World Cancer Day data...</p>
        </div>
      </PageLayout>
    );
  }

  if (error) {
    return (
      <PageLayout>
        <div className="flex justify-center items-center min-h-[50vh]">
          <p className="text-lg text-red-600">Error loading World Cancer Day data: {error}</p>
        </div>
      </PageLayout>
    );
  }

  if (!eventsData || eventsData.length === 0) {
    return (
      <PageLayout>
        <div className="flex justify-center items-center min-h-[50vh]">
          <p className="text-lg">No World Cancer Day data available.</p>
        </div>
      </PageLayout>
    );
  }

  // Sort events by year in descending order (most recent first)
  const sortedEvents = [...eventsData].sort((a, b) => parseInt(b.year) - parseInt(a.year));
  const activeEvent = sortedEvents[activeEventIndex];

  // Navigation functions for the image modal
  const handlePrevImage = () => {
    if (!selectedImage || !activeEvent) return;
    
    const images = activeEvent.image || [];
    const currentIndex = images.findIndex(img => img === selectedImage);
    if (currentIndex > 0) {
      setSelectedImage(images[currentIndex - 1]);
    } else {
      // Loop to the end if at the beginning
      setSelectedImage(images[images.length - 1]);
    }
  };

  const handleNextImage = () => {
    if (!selectedImage || !activeEvent) return;
    
    const images = activeEvent.image || [];
    const currentIndex = images.findIndex(img => img === selectedImage);
    if (currentIndex < images.length - 1) {
      setSelectedImage(images[currentIndex + 1]);
    } else {
      // Loop to the beginning if at the end
      setSelectedImage(images[0]);
    }
  };

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative py-16 md:py-24">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src="/assets/hero-images/world cancer day .png" 
            alt="World Cancer Day" 
            className="w-full h-full object-cover" 
            style={{ objectPosition: '50% 40%' }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/assets/programs/cancer-day.jpg';
            }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">World Cancer Day</h1>
            <p className="text-xl mb-8">
              An annual global initiative to raise awareness, improve education, and promote action against cancer.
            </p>
          </div>
        </div>
      </section>

      {/* Impact Statistics Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Impact</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Raising awareness and promoting action against cancer through our annual World Cancer Day initiatives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-full mb-4">
                <Calendar className="h-6 w-6" />
              </div>
              <div className="text-3xl font-bold text-blue-900 mb-2">10+</div>
              <div className="text-blue-700 font-medium">Years of Celebration</div>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-600 text-white rounded-full mb-4">
                <Users className="h-6 w-6" />
              </div>
              <div className="text-3xl font-bold text-green-900 mb-2">1000+</div>
              <div className="text-green-700 font-medium">Annual Participants</div>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-600 text-white rounded-full mb-4">
                <Award className="h-6 w-6" />
              </div>
              <div className="text-3xl font-bold text-purple-900 mb-2">UICC</div>
              <div className="text-purple-700 font-medium">Member Organization</div>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-600 text-white rounded-full mb-4">
                <MapPin className="h-6 w-6" />
              </div>
              <div className="text-3xl font-bold text-orange-900 mb-2">5+</div>
              <div className="text-orange-700 font-medium">Event Locations</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* About World Cancer Day */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-10">
            <div className="h-1.5 bg-gradient-to-r from-blue-500 to-primary/60"></div>
            <div className="p-5 md:p-6">
              <h3 className="text-xl font-bold mb-4 text-primary flex items-center">
                <Award className="h-5 w-5 mr-2" />
                World Cancer Day: United in Action, Rooted in Compassion
              </h3>
              <div className="text-gray-700 space-y-4">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">Tibetan Cancer Society Observes World Cancer Day as a Proud Member of UICC, Geneva</h4>
                
                <p className="text-gray-600 mb-4">
                  Every year on February 4th, the global community comes together to mark World Cancer Day, a unified effort led by the Union for International Cancer Control (UICC) to raise awareness, improve education, and inspire action against one of the world's most pressing health challenges. As a proud member of UICC, based in Geneva, Switzerland, the Tibetan Cancer Society (TCS) is honored to stand in solidarity with healthcare institutions, NGOs, policymakers, and communities around the world, reaffirming our shared commitment to reducing the impact of cancer—especially among the most vulnerable.
                </p>
                
                <p className="text-gray-600 mb-4">
                  At TCS, World Cancer Day is more than a symbolic occasion. It is a call to action. Every year, we organize special programs, outreach events, and educational campaigns that reflect the year's global theme, while also tailoring our efforts to meet the unique needs of the Tibetan refugee diaspora and underserved Himalayan communities. Whether the theme is "Close the Care Gap," "I Am and I Will," or "Together, all our actions matter," we adapt its message into culturally resonant, community-driven initiatives that promote early detection, prevention, and compassion-centered care.
                </p>
                
                <p className="text-gray-600 mb-4">
                  In previous years, our World Cancer Day programs have included free cancer screening camps, school and monastery outreach, public health talks, interactive awareness sessions, and patient support drives. We bring these initiatives directly into settlements and remote areas where healthcare access is limited, ensuring that no one is left behind because of geography, economic hardship, or social stigma.
                </p>
                
                <p className="text-gray-600 mb-4">
                  Our participation in World Cancer Day is also a reflection of our core belief—that cancer care is a human right, not a privilege. As one of the few Tibetan-led cancer organizations in South Asia, TCS bridges the gap between global best practices and grassroots realities. We use this annual moment not only to raise awareness but also to foster hope, mobilize support, and advocate for equitable healthcare policies that serve all people, regardless of background or circumstance.
                </p>
                
                <p className="text-gray-600 mb-4">
                  In alignment with UICC's vision, we work toward a future where early diagnosis is accessible, where treatment is timely and affordable, and where every patient is treated with dignity and empathy. World Cancer Day empowers us to amplify this mission and connect it to a broader global movement.
                </p>
                
                <p className="text-gray-600 mb-4">
                  This year, as we mark World Cancer Day, we invite individuals, organizations, and supporters around the world to join hands with us. Whether by sponsoring a screening camp, supporting our Compassion Home, sharing our message online, or simply speaking up about the importance of early detection—you become part of a global force working to eliminate the inequalities that fuel this disease.
                </p>
                
                <p className="text-gray-600 font-medium">
                  Together, we remember those we have lost, we support those who are fighting, and we continue our work so that one day, no one has to suffer alone. From the heart of the Tibetan community to the global stage, the Tibetan Cancer Society remains committed to Compassion in Action, and Hope in Healing.
                </p>
              </div>
            </div>
          </div>
          
          {/* Year Selector */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-center mb-6">Our World Cancer Day Events</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {sortedEvents.map((event, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 rounded-full font-medium transition-colors ${activeEventIndex === index ? 'bg-primary text-white' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'}`}
                  onClick={() => setActiveEventIndex(index)}
                >
                  {event.year}
                </button>
              ))}
            </div>
          </div>
          
          {/* Event Details */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-12">
            <div className="h-2 bg-gradient-to-r from-primary to-primary/60"></div>
            <div className="p-6 md:p-8">
              <h3 className="text-2xl font-bold mb-6">{activeEvent.year} World Cancer Day</h3>
              {/* About Event Section */}
              {activeEvent["About Event"] || activeEvent.about_event ? (
                <div className="mb-8">
                  <div className="bg-primary/5 border-l-4 border-primary p-4 rounded-lg text-gray-700 text-base">
                    {activeEvent["About Event"] || activeEvent.about_event}
                  </div>
                </div>
              ) : null}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Award className="h-5 w-5 text-primary mr-2" />
                    <h4 className="font-semibold">Theme</h4>
                  </div>
                  <p>"{activeEvent.theme}"</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <MapPin className="h-5 w-5 text-primary mr-2" />
                    <h4 className="font-semibold">Venue</h4>
                  </div>
                  <p>{activeEvent.venue}</p>
                </div>
              </div>
              
              {/* Guest of Honor */}
              <div className="mb-8">
                <h4 className="text-xl font-semibold mb-4">Guest of Honor</h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700">{activeEvent.guest_of_honour}</p>
                </div>
              </div>
              
              {/* Activities */}
              <div className="mb-8">
                <h4 className="text-xl font-semibold mb-4">Activities & Awareness Mission</h4>
                <ul className="space-y-2">
                  {activeEvent.activities_awareness_mission.map((activity, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 mr-3">
                        <span className="text-primary font-semibold text-xs">{index + 1}</span>
                      </div>
                      <p className="text-gray-700">{activity}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          {/* Image Gallery */}
          <div className="mt-12 bg-white rounded-xl shadow-sm overflow-hidden p-6">
            <div className="h-1.5 bg-gradient-to-r from-red-500 to-primary mb-6"></div>
            <h3 className="text-2xl font-bold text-center mb-8">{activeEvent.year} Event Gallery</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeEvent.image.map((img, index) => (
                <div 
                  key={index} 
                  className="aspect-square overflow-hidden rounded-lg shadow-sm border border-gray-200 cursor-pointer transform transition hover:scale-105"
                  onClick={() => {
                    setSelectedImage(img);
                    setImageModalOpen(true);
                  }}
                >
                  <img
                    className="w-full h-full object-cover"
                    src={img}
                    alt={`World Cancer Day ${activeEvent.year} Image ${index + 1}`}
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
                        // Try changing folder from 'cancer-day' to 'camps' or vice versa
                        if (img.includes('/assets/cancer-day/')) {
                          target.src = img.replace('/assets/cancer-day/', '/assets/camps/');
                        } else if (img.includes('/assets/camps/')) {
                          target.src = img.replace('/assets/camps/', '/assets/cancer-day/');
                        } else {
                          target.src = '/assets/placeholders/placeholder-image.svg';
                        }
                      }
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Image Modal */}
        {imageModalOpen && selectedImage && activeEvent && (
          <ImageModal
            src={selectedImage}
            alt="World Cancer Day Event"
            onClose={() => {
              setImageModalOpen(false);
              setSelectedImage(null);
            }}
            onNext={handleNextImage}
            onPrevious={handlePrevImage}
            currentIndex={activeEvent.image ? activeEvent.image.findIndex(img => img === selectedImage) : 0}
            totalImages={activeEvent.image ? activeEvent.image.length : 0}
          />
        )}
      </section>


    </PageLayout>
  );
};

export default WorldCancerDay;