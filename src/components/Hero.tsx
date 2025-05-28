import React from 'react';
import { ArrowRight, Heart, Search, Calendar, Users, Info, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative pt-16 md:pt-16">
      {/* Main Hero Banner */}
      <div className="relative text-white">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src="/assets/home/homepage.png" 
            alt="Background" 
            className="w-full h-full object-cover"
            style={{ objectPosition: '50% 30%' }}
          />
        </div>
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black opacity-40 z-0"></div>
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-48 lg:py-56">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Every Cancer.<br />Every Life.</h1>
            <p className="text-lg md:text-xl mb-8 max-w-lg">
              The Tibetan Cancer Society is dedicated to saving lives, celebrating lives, and leading the fight for a world without cancer.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/donate" className="bg-white text-primary hover:bg-gray-100 font-semibold py-3 px-8 rounded-full transition-colors">
                Donate Now
              </Link>
              <Link to="/programs-services" className="bg-transparent hover:bg-white/10 border-2 border-white font-semibold py-3 px-8 rounded-full transition-colors">
                Our Programs
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Quick Action Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link to="/programs/cancer-awareness-camp" className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow group">
            <div className="flex items-start">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <Search className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">Cancer Awareness Camp</h3>
                <p className="text-sm text-gray-600">Screening and awareness camps in Tibetan communities</p>
              </div>
            </div>
          </Link>
          
          <Link to="/programs/world-cancer-day" className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow group">
            <div className="flex items-start">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">World Cancer Day</h3>
                <p className="text-sm text-gray-600">Annual events to mark World Cancer Day on February 4th</p>
              </div>
            </div>
          </Link>
          
          <Link to="/programs/ambulance-services" className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow group">
            <div className="flex items-start">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <Truck className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">Ambulance Services</h3>
                <p className="text-sm text-gray-600">Transportation for cancer patients to medical facilities</p>
              </div>
            </div>
          </Link>
          
          <Link to="/programs/meals-for-invisibles" className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow group">
            <div className="flex items-start">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">Meals for Invisibles</h3>
                <p className="text-sm text-gray-600">Food for homeless and underprivileged cancer patients</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
