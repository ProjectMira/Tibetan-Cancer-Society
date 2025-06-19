import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import ProgramCard from '../components/ProgramCard';
import { ArrowRight, Heart, Search, Users, Info, Truck, Megaphone, Ambulance, Home, Coffee, Calendar } from 'lucide-react';

interface Program {
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
          <p className="text-lg text-pink-600">Error loading programs: {error.message}</p>
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
          <img 
            src="/assets/hero-images/TCS program and services.jpg" 
            alt="Programs & Services Background" 
            className="w-full h-full object-cover" 
            style={{ objectPosition: '50% 40%' }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/assets/programs/health-camp.jpg";
            }}
          />
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
            <ProgramCard 
              key={program.id}
              program={program}
            />
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