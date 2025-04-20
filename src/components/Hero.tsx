import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-white pt-16 relative">
      <div className="section-container w-full max-w-7xl mx-auto px-4">
        
        {/* Hero Images Container */}
        <div className="w-full max-w-4xl mx-auto p-6 border border-gray-200 rounded-lg shadow-sm bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Image - HH Photo */}
            <div className="aspect-square rounded-lg overflow-hidden">
              <img 
                src="/assets/home/HH.webp" 
                alt="HH Photo" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Right Image - HH Letter */}
            <div className="aspect-square rounded-lg overflow-hidden">
              <img 
                src="/assets/home/HH_letter.jpeg" 
                alt="HH Letter Image" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
