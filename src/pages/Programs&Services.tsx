import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import { ArrowRight, Heart, Search, Users, Info, Truck, Megaphone, Ambulance, Home, Coffee, Calendar } from 'lucide-react';

// Helper function to get the appropriate icon component
const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case 'Heart': return <Heart className="h-6 w-6 text-primary" />;
    case 'Search': return <Search className="h-6 w-6 text-primary" />;
    case 'Users': return <Users className="h-6 w-6 text-primary" />;
    case 'Info': return <Info className="h-6 w-6 text-primary" />;
    case 'Truck': return <Truck className="h-6 w-6 text-primary" />;
    case 'Megaphone': return <Megaphone className="h-6 w-6 text-primary" />;
    default: return <Info className="h-6 w-6 text-primary" />;
  }
};

interface ProgramFeature {
  value: string;
  label: string;
}

interface Program {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  image: string;
  features: string[];
  stats: ProgramFeature[];
  contactPerson: string;
  contactEmail: string;
}

const ProgramsAndServices = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        // Fetch the main programs.json file
        const response = await fetch('/assets/data/programs.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        if (data && Array.isArray(data.programs)) {
          setPrograms(data.programs);
        } else {
          throw new Error('Invalid programs data format');
        }
      } catch (error) {
        setError(error instanceof Error ? error : new Error('An unknown error occurred'));
        console.error("Failed to fetch programs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  if (loading) {
    return (
      <PageLayout>
        <div className="flex justify-center items-center min-h-[50vh]">
          <p className="text-lg">Loading programs...</p>
        </div>
      </PageLayout>
    );
  }

  if (error) {
    return (
      <PageLayout>
        <div className="flex justify-center items-center min-h-[50vh]">
          <p className="text-lg text-red-600">Error loading programs: {error.message}</p>
        </div>
      </PageLayout>
    );
  }

  // All programs
  const allPrograms = programs;

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative py-16 md:py-24">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {programs && programs.length > 0 && (
            <img 
              src={programs[0].image || "/assets/programs/health-camp.jpg"} 
              alt="Programs & Services Background" 
              className="w-full h-full object-cover" 
              style={{ objectPosition: '50% 40%' }}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                // Try another program image as fallback
                if (programs.length > 1) {
                  target.src = programs[1].image || "/assets/programs/compassion-home.jpg";
                } else {
                  target.src = "/assets/programs/health-camp.jpg";
                }
              }}
            />
          )}
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Programs & Services</h1>
            <p className="text-xl mb-8">
              The Tibetan Cancer Society offers a comprehensive range of programs and services designed to support cancer patients, survivors, and their families throughout their journey.
            </p>
            <Link 
              to="/donate" 
              className="inline-block bg-white text-primary hover:bg-gray-100 font-semibold py-3 px-6 rounded-full transition-colors"
            >
              Support Our Work
            </Link>
          </div>
        </div>
      </section>

      {/* All Programs */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4 text-center">Our Programs & Services</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto text-center mb-12">
            Discover the various ways we support the Tibetan community in the fight against cancer.
          </p>
          
          {/* Navigation Bar */}
          <div className="mb-12">
            <nav className="flex flex-wrap justify-center gap-2 md:gap-4">
              <Link 
                to="/programs-services" 
                className="flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors text-sm md:text-base"
              >
                <Info className="h-4 w-4 mr-2" />
                All Programs
              </Link>
              <Link 
                to="/programs/ambulance-services" 
                className="flex items-center px-4 py-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors text-sm md:text-base"
              >
                <Ambulance className="h-4 w-4 mr-2" />
                Ambulance Services
              </Link>
              <Link 
                to="/programs/compassion-home" 
                className="flex items-center px-4 py-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors text-sm md:text-base"
              >
                <Home className="h-4 w-4 mr-2" />
                Compassion Home
              </Link>
              <Link 
                to="/programs/community-kitchen" 
                className="flex items-center px-4 py-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors text-sm md:text-base"
              >
                <Coffee className="h-4 w-4 mr-2" />
                Community Kitchen
              </Link>
              <Link 
                to="/programs/cancer-awareness-camp" 
                className="flex items-center px-4 py-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors text-sm md:text-base"
              >
                <Heart className="h-4 w-4 mr-2" />
                Cancer Awareness Camp
              </Link>
              <Link 
                to="/programs/world-cancer-day" 
                className="flex items-center px-4 py-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors text-sm md:text-base"
              >
                <Calendar className="h-4 w-4 mr-2" />
                World Cancer Day
              </Link>
            </nav>
          </div>
          
          {allPrograms.map((program, index) => (
            <div key={program.id} className="mb-10 bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3">
                  <img 
                    src={program.image || `/assets/programs/${program.id}.jpg`} 
                    alt={program.title} 
                    className="w-full h-auto rounded-lg object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/assets/placeholders/placeholder-image.svg';
                    }}
                  />
                </div>
                <div className="md:w-2/3">
                  <div className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full mb-2">
                    {program.features && program.features.length > 0 ? program.features[0] : 'Support Program'}
                  </div>
                  <Link to={`/programs/${program.id}`} className="hover:text-primary transition-colors">
                    <h3 className="text-2xl font-bold mb-3">{program.title}</h3>
                  </Link>
                  <div className="text-gray-600 mb-4">
                    <div dangerouslySetInnerHTML={{ __html: program.fullDescription.replace(/\n/g, '<br/>') }} />
                  </div>
                  <div className="flex flex-wrap gap-4">
                    {program.stats && program.stats.map((stat, statIndex) => (
                      <div key={statIndex} className="flex items-center">
                        <div className="bg-green-100 p-2 rounded-full mr-2">
                          <Users className="h-4 w-4 text-green-600" />
                        </div>
                        <span className="text-sm">{stat.value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4">
                    <Link 
                      to={program.id === 'sunday-program' ? '/programs/compassion-home?tab=sunday#sunday-program-tab' : `/programs/${program.id}`} 
                      className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
                    >
                      Learn more
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary/5 p-8 md:p-12 rounded-2xl text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Need Support or Information?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Whether you're a patient, survivor, caregiver, or just looking for information, we're here to help.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                to="/contact" 
                className="bg-primary text-white hover:bg-primary/90 font-semibold py-3 px-6 rounded-full transition-colors"
              >
                Contact Us
              </Link>
              <Link 
                to="/resources" 
                className="bg-white text-primary border border-primary hover:bg-gray-50 font-semibold py-3 px-6 rounded-full transition-colors"
              >
                View Resources
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default ProgramsAndServices;