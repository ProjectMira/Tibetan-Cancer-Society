import React from 'react';
import { ArrowLeft, Mail, User } from 'lucide-react';
import { Link, useParams, Navigate } from 'react-router-dom';
import PageLayout from './PageLayout';

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

interface ProgramDetailProps {
  programs: Program[];
}

const ProgramDetail: React.FC<ProgramDetailProps> = ({ programs }) => {
  const { programId } = useParams<{ programId: string }>();
  const program = programs.find(p => p.id === programId);
  
  if (!program) {
    return <Navigate to="/programs-services" />;
  }

  return (
    <PageLayout>
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link 
              to="/programs-services" 
              className="inline-flex items-center text-primary hover:text-primary/80 font-medium mb-4"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Programs & Services
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{program.title}</h1>
            <p className="text-lg text-gray-600 max-w-3xl">{program.shortDescription}</p>
          </div>
          
          {/* Hero Image */}
          <div className="rounded-xl overflow-hidden shadow-md mb-12">
            <img 
              src={program.image} 
              alt={program.title} 
              className="w-full h-auto object-cover max-h-[400px]" 
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/assets/placeholder-image.jpg';
              }}
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-4">About This Program</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">{program.fullDescription}</p>
              
              <h3 className="text-xl font-semibold mb-3">What We Offer</h3>
              <ul className="space-y-2 mb-8">
                {program.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block bg-primary/10 text-primary rounded-full p-1 mr-3 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <User className="h-5 w-5 text-primary mr-3" />
                    <span>{program.contactPerson}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-primary mr-3" />
                    <a 
                      href={`mailto:${program.contactEmail}`} 
                      className="text-primary hover:underline"
                    >
                      {program.contactEmail}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="bg-primary/5 p-6 rounded-xl sticky top-24">
                <h3 className="text-xl font-semibold mb-4">Program Impact</h3>
                <div className="space-y-4">
                  {program.stats.map((stat, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6">
                  <Link 
                    to="/donate" 
                    className="block w-full bg-primary text-white text-center py-3 px-4 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                  >
                    Support This Program
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-bold mb-6">Other Programs You Might Be Interested In</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {programs
                .filter(p => p.id !== program.id)
                .slice(0, 3)
                .map(relatedProgram => (
                  <Link 
                    key={relatedProgram.id} 
                    to={`/programs-services/${relatedProgram.id}`}
                    className="group block p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                  >
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {relatedProgram.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {relatedProgram.shortDescription}
                    </p>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default ProgramDetail;
