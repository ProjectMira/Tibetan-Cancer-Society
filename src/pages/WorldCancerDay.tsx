import React, { useState, useEffect } from 'react';
import PageLayout from '../components/PageLayout';
import ImageModal from '../components/ImageModal';
import { MapPin, Award } from 'lucide-react';

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
          <div 
            className="w-full h-full bg-cover bg-center opacity-15"
            style={{ backgroundImage: `url('/assets/backgrounds/world-cancer-day-bg.jpg')` }}
          />
        </div>
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">World Cancer Day</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              An annual global initiative to raise awareness, improve education, and promote action against cancer.
            </p>
          </div>
          
          {/* About World Cancer Day */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-10">
            <div className="h-1.5 bg-gradient-to-r from-blue-500 to-primary/60"></div>
            <div className="p-5 md:p-6">
              <h3 className="text-xl font-bold mb-4 text-primary flex items-center">
                <Award className="h-5 w-5 mr-2" />
                About World Cancer Day
              </h3>
              <div className="text-gray-700 space-y-4">
                <p className="text-gray-600 mb-6">
                  World Cancer Day is an international day marked on February 4 to raise awareness of cancer and to encourage its prevention, detection, and treatment. The Tibetan Cancer Society actively participates in this global initiative through various awareness programs and activities.
                </p>
                <p className="text-gray-600 mb-6">
                  Our organization also runs a <a href="/programs/compassion-home?tab=sunday" className="text-primary font-medium hover:underline">Sunday Program</a> as part of our Compassion Home initiative, providing additional support to cancer patients.
                </p>
                <p>
                  Our World Cancer Day events typically include awareness campaigns, free health screenings, educational talks by oncologists, and community activities that bring people together in the fight against cancer.
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

      {/* Call to Action */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary/5 p-8 md:p-12 rounded-2xl text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Join Us in the Fight Against Cancer</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Support our World Cancer Day initiatives and help us raise awareness about cancer prevention and early detection.
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

export default WorldCancerDay;