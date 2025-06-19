import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users } from 'lucide-react';

/**
 * ProgramCard - A reusable component for displaying program information
 * 
 * Used in both Home.tsx and Programs&Services.tsx pages to maintain consistency
 * 
 * @param program - The program data object containing all program information
 * @param label - Optional custom label to display (falls back to first feature if not provided)
 * @param loading - Boolean to show loading skeleton state
 * @param className - Optional additional CSS classes for customization
 */

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

interface ProgramCardProps {
  program: Program;
  label?: string; // Optional custom label, falls back to first feature
  loading?: boolean;
  className?: string; // Optional additional CSS classes
}

const ProgramCard: React.FC<ProgramCardProps> = ({ 
  program, 
  label, 
  loading = false,
  className = ""
}) => {
  if (loading) {
    return (
      <div className={`mb-10 bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100 ${className}`}>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <div className="w-full h-48 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
          <div className="md:w-2/3">
            <div className="h-6 bg-gray-200 rounded mb-2 w-24 animate-pulse"></div>
            <div className="h-8 bg-gray-200 rounded mb-3 w-3/4 animate-pulse"></div>
            <div className="space-y-2 mb-4">
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!program) {
    return (
      <div className={`mb-10 bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100 ${className}`}>
        <div className="text-center py-8">
          <p className="text-gray-500">Program information not available</p>
        </div>
      </div>
    );
  }

  // Determine the correct link path based on the program ID
  const linkPath = program.id === 'sunday-program' 
    ? '/programs/compassion-home?tab=sunday#sunday-program-tab' 
    : `/programs/${program.id}`;

  // Determine the label to display
  const displayLabel = label || 
    (program.features && program.features.length > 0 ? program.features[0] : 'Support Program');

  return (
    <div className={`mb-10 bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow ${className}`}>
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
            {displayLabel}
          </div>
          <Link to={linkPath} className="hover:text-primary transition-colors">
            <h3 className="text-2xl font-bold mb-3">{program.title}</h3>
          </Link>
          <div className="text-gray-600 mb-4">
            <div dangerouslySetInnerHTML={{ __html: program.fullDescription.replace(/\n/g, '<br/>') }} />
          </div>
          
          {/* Stats/Features Display */}
          {program.stats && program.stats.length > 0 && (
            <div className="flex flex-wrap gap-4 mb-4">
              {program.stats.map((stat, index) => {
                // Function to determine color scheme based on stat content/meaning
                const getColorSchemeForStat = (label: string, value: string) => {
                  const lowerLabel = label.toLowerCase();
                  const lowerValue = value.toLowerCase();
                  
                  // Blue - Numbers/quantities (people, screenings, services, meals, etc.)
                  if (lowerLabel.includes('people') || lowerLabel.includes('screened') || 
                      lowerLabel.includes('services') || lowerLabel.includes('meals') || 
                      lowerLabel.includes('patients') || lowerLabel.includes('attendees') ||
                      lowerLabel.includes('sponsors') || lowerLabel.includes('kitchens') ||
                      lowerLabel.includes('sessions')) {
                    return { bg: 'bg-blue-100', icon: 'text-blue-600' };
                  }
                  
                  // Green - Coverage/reach (campus, locations, km, accommodation, etc.)
                  if (lowerLabel.includes('campus') || lowerLabel.includes('locations') || 
                      lowerLabel.includes('k.m.') || lowerLabel.includes('nights') ||
                      lowerLabel.includes('served') || lowerLabel.includes('beneficiaries') ||
                      lowerLabel.includes('participants')) {
                    return { bg: 'bg-green-100', icon: 'text-green-600' };
                  }
                  
                  // Purple - Medical/health results (positive, negative, stories, etc.)
                  if (lowerLabel.includes('positive') || lowerLabel.includes('negative') || 
                      lowerLabel.includes('stories') || lowerLabel.includes('housed') ||
                      lowerLabel.includes('member') || lowerValue.includes('uicc') ||
                      lowerLabel.includes('support')) {
                    return { bg: 'bg-purple-100', icon: 'text-purple-600' };
                  }
                  
                  // Orange - Time/duration/availability (years, availability, celebration, running, etc.)
                  if (lowerLabel.includes('years') || lowerLabel.includes('availability') || 
                      lowerLabel.includes('celebration') || lowerLabel.includes('running') ||
                      lowerValue.includes('24/7') || lowerValue.includes('weekly') ||
                      lowerLabel.includes('event')) {
                    return { bg: 'bg-orange-100', icon: 'text-orange-600' };
                  }
                  
                  // Default to blue for any unmatched stats
                  return { bg: 'bg-blue-100', icon: 'text-blue-600' };
                };
                
                const colorScheme = getColorSchemeForStat(stat.label, stat.value);
                
                return (
                  <div key={index} className="flex items-center">
                    <div className={`${colorScheme.bg} p-2 rounded-full mr-2`}>
                      <Users className={`h-4 w-4 ${colorScheme.icon}`} />
                    </div>
                    <span className="text-sm font-medium">{stat.value}</span>
                    {stat.label && (
                      <span className="text-sm text-gray-500 ml-1">{stat.label.toLowerCase()}</span>
                    )}
                  </div>
                );
              })}
            </div>
          )}
          
          <div className="mt-4">
            <Link 
              to={linkPath} 
              className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors"
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

export default ProgramCard; 