import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import { ArrowLeft, Mail, User } from 'lucide-react';
import { Heart, Search, Users, Info, Truck, Utensils, Coffee, Calendar, Home } from 'lucide-react';

// Helper function to get the appropriate icon component
const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case 'Heart': return <Heart className="h-6 w-6 text-primary" />;
    case 'Search': return <Search className="h-6 w-6 text-primary" />;
    case 'Users': return <Users className="h-6 w-6 text-primary" />;
    case 'Info': return <Info className="h-6 w-6 text-primary" />;
    case 'Truck': return <Truck className="h-6 w-6 text-primary" />;
    case 'Utensils': return <Utensils className="h-6 w-6 text-primary" />;
    case 'Coffee': return <Coffee className="h-6 w-6 text-primary" />;
    case 'Calendar': return <Calendar className="h-6 w-6 text-primary" />;
    case 'Home': return <Home className="h-6 w-6 text-primary" />;
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

const ProgramDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [program, setProgram] = useState<Program | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProgram = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        const response = await fetch(`/assets/data/programs/${id}.json`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProgram(data);
      } catch (error) {
        setError(error instanceof Error ? error : new Error('An unknown error occurred'));
        console.error("Failed to fetch program:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProgram();
  }, [id]);

  if (loading) {
    return (
      <PageLayout>
        <div className="flex justify-center items-center min-h-[50vh]">
          <p className="text-lg">Loading program details...</p>
        </div>
      </PageLayout>
    );
  }

  if (error || !program) {
    return (
      <PageLayout>
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="text-center">
            <p className="text-lg text-pink-600 mb-4">
              {error ? `Error: ${error.message}` : 'Program not found'}
            </p>
            <Link 
              to="/programs-services" 
              className="inline-flex items-center text-primary hover:text-primary/80"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
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
      <section className="bg-gradient-to-r from-primary to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            to="/programs-services" 
            className="inline-flex items-center text-white/80 hover:text-white mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Programs & Services
          </Link>
          <h1 className="text-4xl font-bold mb-4">{program.title}</h1>
          <p className="text-xl max-w-3xl">{program.shortDescription}</p>
        </div>
      </section>

      {/* Program Details */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl overflow-hidden shadow-md mb-8">
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

              <div className="prose prose-lg max-w-none">
                <h2 className="text-2xl font-bold mb-4">About This Program</h2>
                <p className="text-gray-700">{program.fullDescription}</p>
                
                <h3 className="text-xl font-semibold mt-8 mb-4">Key Features</h3>
                <ul className="space-y-2">
                  {program.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-primary mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <div className="bg-gray-50 rounded-xl p-6 mb-8">
                <div className="flex items-center mb-6">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    {getIconComponent(program.icon)}
                  </div>
                  <h3 className="text-xl font-semibold">{program.title}</h3>
                </div>

                {program.stats && program.stats.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-500 uppercase mb-3">Impact</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {program.stats.map((stat, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg text-center">
                          <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
                          <div className="text-sm text-gray-600">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="text-sm font-medium text-gray-500 uppercase mb-3">Contact</h4>
                  <div className="space-y-3">
                    {program.contactPerson && (
                      <div className="flex items-center">
                        <User className="h-5 w-5 text-gray-400 mr-2" />
                        <span>{program.contactPerson}</span>
                      </div>
                    )}
                    {program.contactEmail && (
                      <div className="flex items-center">
                        <Mail className="h-5 w-5 text-gray-400 mr-2" />
                        <a 
                          href={`mailto:${program.contactEmail}`} 
                          className="text-primary hover:underline"
                        >
                          {program.contactEmail}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-primary/5 rounded-xl p-6">
                <h4 className="text-lg font-semibold mb-4">Need Support?</h4>
                <p className="text-gray-600 mb-4">
                  If you have questions about this program or need assistance, please don't hesitate to contact us.
                </p>
                <Link 
                  to="/contact" 
                  className="block w-full bg-primary text-white text-center py-3 rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Programs */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8">Explore Other Programs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link 
              to="/programs-services" 
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col items-center text-center"
            >
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">View All Programs</h3>
              <p className="text-gray-600 text-sm">
                Explore our complete range of programs and services
              </p>
            </Link>
            
            <Link 
              to="/donate" 
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col items-center text-center"
            >
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Support Our Work</h3>
              <p className="text-gray-600 text-sm">
                Help us continue providing these essential services
              </p>
            </Link>
            
            <Link 
              to="/contact" 
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col items-center text-center"
            >
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Get in Touch</h3>
              <p className="text-gray-600 text-sm">
                Contact us for more information about our programs
              </p>
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default ProgramDetail;
