import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PhotoGallery from '../components/PhotoGallery';
import { Link } from 'react-router-dom';
import { Quote, ArrowRight, Users, MapPin } from 'lucide-react';

// About section component for the home page
const AboutSection = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Impact</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            The Tibetan Cancer Society is making a difference in the lives of cancer patients and their families across the Tibetan community.
          </p>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 text-center">
          <div className="p-4 bg-white rounded-xl shadow-sm">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">1000+</div>
            <div className="text-sm text-gray-600">Cancer Screenings Conducted</div>
          </div>
          <div className="p-4 bg-white rounded-xl shadow-sm">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">500+</div>
            <div className="text-sm text-gray-600">Patients Supported</div>
          </div>
          <div className="p-4 bg-white rounded-xl shadow-sm">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">50+</div>
            <div className="text-sm text-gray-600">Awareness Programs</div>
          </div>
          <div className="p-4 bg-white rounded-xl shadow-sm">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">10</div>
            <div className="text-sm text-gray-600">Years of Service</div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/2">
            <h3 className="text-2xl font-bold mb-4">About Tibetan Cancer Society</h3>
            <p className="text-gray-600 mb-4">
              The Tibetan Cancer Society (TCS) is a non-profit organization dedicated to cancer prevention, early detection, and awareness in Tibetan communities. Founded by Mr. Tsultrim Dorjee in 2014 and officially registered in May 2015, TCS addresses the urgent need for better cancer care in the Tibetan diaspora.
            </p>
            <p className="text-gray-600 mb-6">
              Our mission is to prevent cancer through early screening, awareness programs, and health education while providing crucial support to those affected by cancer.
            </p>
            <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-primary mb-6">
              <h4 className="font-semibold mb-2">Recent Achievement</h4>
              <p className="text-sm text-gray-600">
                In 2024, we successfully launched our mobile cancer screening program, reaching remote Tibetan settlements and providing free screenings to over 200 individuals.
              </p>
            </div>
            <Link to="/about" className="inline-flex items-center text-primary font-medium hover:underline">
              Learn more about us
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          <div className="md:w-1/2">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src="assets/about-images/TCS.JPG" 
                alt="Tibetan Cancer Society" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Services section component
const ServicesSection = () => {
  interface ProgramData {
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
  }

  // State for all program data
  const [programsData, setProgramsData] = useState<Record<string, ProgramData>>({}); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgramsData = async () => {
      setLoading(true);
      try {
        // List of program IDs to fetch
        const programIds = [
          'cancer-awareness-camp',
          'world-cancer-day',
          'patient-support',
          'compassion-home',
          'ambulance-services',
          'community-kitchen',
          'meals-for-invisibles',
          'sunday-program'
        ];
        
        // Fetch each program individually
        const programPromises = programIds.map(async (id) => {
          const response = await fetch(`/assets/data/programs/${id}.json`);
          if (!response.ok) {
            throw new Error(`Failed to load ${id} data`);
          }
          return response.json();
        });
        
        // Wait for all programs to be fetched
        const fetchedPrograms = await Promise.all(programPromises);
        
        // Create a record with program ID as key
        const programsRecord: Record<string, ProgramData> = {};
        fetchedPrograms.forEach((program) => {
          programsRecord[program.id] = program;
        });
        
        setProgramsData(programsRecord);
      } catch (error) {
        console.error('Error loading programs data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProgramsData();
  }, []);

  // Program Card component for displaying each program
  const ProgramCard = ({ programId, label }: { programId: string, label: string }) => {
    const program = programsData[programId];
    
    if (!program && !loading) {
      return <div>Program information not available</div>;
    }
    
    // Determine the correct link path based on the program ID
    const linkPath = programId === 'sunday-program' ? '/programs/compassion-home?tab=sunday' : `/programs/${programId}`;
    
    return (
      <div className="mb-10 bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <img 
              src={program?.image || `/assets/programs/${programId}.jpg`} 
              alt={program?.title || programId} 
              className="w-full h-auto rounded-lg object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/assets/placeholders/placeholder-image.svg';
              }}
            />
          </div>
          <div className="md:w-2/3">
            <div className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full mb-2">
              {label}
            </div>
            <Link to={linkPath} className="hover:text-primary transition-colors">
              <h3 className="text-2xl font-bold mb-3">{program?.title || programId}</h3>
            </Link>
            <div className="text-gray-600 mb-4">
              {program ? (
                <div dangerouslySetInnerHTML={{ __html: program.fullDescription.replace(/\n/g, '<br/>') }} />
              ) : (
                <p>Loading program information...</p>
              )}
            </div>
            <div className="flex flex-wrap gap-4">
              {program?.stats && program.stats.map((stat, index) => (
                <div key={index} className="flex items-center">
                  <div className="bg-green-100 p-2 rounded-full mr-2">
                    <Users className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-sm">{stat.value} {stat.label.toLowerCase()}</span>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Link 
                to={linkPath} 
                className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
              >
                Learn more
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Programs & Services</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            The Tibetan Cancer Society offers a comprehensive range of programs and services to support cancer patients, survivors, and their families.
          </p>
        </div>
        
        {loading ? (
          <div className="text-center py-12">
            <p className="text-lg">Loading programs information...</p>
          </div>
        ) : (
          <>
            <ProgramCard programId="cancer-awareness-camp" label="Early Detection Program" />
            <ProgramCard programId="world-cancer-day" label="Annual Event" />
            <ProgramCard programId="patient-support" label="Support Program" />
            <ProgramCard programId="compassion-home" label="Accommodation Program" />
            <ProgramCard programId="ambulance-services" label="Transportation Program" />
            <ProgramCard programId="community-kitchen" label="Nutrition Program" />
            <ProgramCard programId="meals-for-invisibles" label="Outreach Program" />
            <ProgramCard programId="sunday-program" label="Community Program" />
          </>
        )}
      </div>
    </section>
  );
};

interface Testimonial {
  id: number;
  name: string;
  age: number;
  diagnosis: string;
  location: string;
  image: string;
  quote: string;
  date: string;
}

const Home = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch('/assets/data/testimonials.json');
        if (!response.ok) {
          throw new Error('Failed to load testimonials');
        }
        const data = await response.json();
        // Only show first 3 testimonials on home page
        setTestimonials(data.testimonials.slice(0, 3));
      } catch (error) {
        console.error('Error loading testimonials:', error);
      }
    };

    fetchTestimonials();
  }, []);
  
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />

      {/* About Section */}
      <AboutSection />

      {/* Services Section */}
      <ServicesSection />

      {/* Testimonials Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Patient Stories</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Hear from those who have been supported by the Tibetan Cancer Society.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white rounded-xl shadow-sm p-6 transition-shadow hover:shadow-md"
              >
                <Quote className="h-8 w-8 text-primary mb-4" />
                <div className="mb-2">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    {testimonial.diagnosis}
                  </span>
                </div>
                <blockquote className="mb-4">
                  <p className="text-gray-700 italic line-clamp-4">{testimonial.quote}</p>
                </blockquote>
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img
                      className="h-12 w-12 rounded-full object-cover"
                      src={testimonial.image}
                      alt={testimonial.name}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/assets/default-avatar.png';
                      }}
                    />
                  </div>
                  <div className="ml-4">
                    <div className="text-base font-semibold">{testimonial.name}, {testimonial.age}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.location} • {testimonial.date}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/testimonials"
              className="inline-flex items-center text-primary hover:text-primary/80 font-semibold"
            >
              View All Patient Stories
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
