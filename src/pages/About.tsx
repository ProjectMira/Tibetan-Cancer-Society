
import React from 'react';
import PageLayout from '../components/PageLayout';
import { FileText, Award, Heart, Target } from 'lucide-react';

const About = () => {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative py-16 md:py-24">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src="/assets/about-images/TCS.JPG" 
            alt="About Us Background" 
            className="w-full h-full object-cover" 
            style={{ objectPosition: '50% 30%' }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/assets/placeholders/placeholder-image.svg';
            }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Us</h1>
            <p className="text-xl mb-8">
              Learn about the Tibetan Cancer Society's history, mission, and the official recognition we've received.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <div className="inline-flex items-center bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full mb-2">
                <Heart className="h-3 w-3 mr-1" />
                <span>Our Story</span>
              </div>
              <h2 className="text-3xl font-bold mb-4">Introduction</h2>
              <p className="text-gray-600 mb-6">
                The Tibetan Cancer Society (TCS) is a non-profit organization dedicated to cancer prevention, early detection, and awareness in Tibetan communities. Founded by Mr. Tsultrim Dorjee in 2014 and officially registered in May 2015, TCS was created to address the urgent need for better cancer care in the Tibetan diaspora.
              </p>
              <p className="text-gray-600 mb-6">
                It was formally introduced during a 2016 health meeting organized by the Central Tibetan Administration, following His Holiness the Dalai Lama's call to improve Tibetan public health.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-primary mb-6">
                <p className="text-gray-600 text-sm italic">
                  TCS holds the distinction of being the first and only Tibetan cancer-focused society to be recognized and registered under the global UICC (Union for International Cancer Control) membership, further solidifying its credibility and commitment to global cancer care standards.
                </p>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="rounded-xl overflow-hidden shadow-lg">
                <img 
                  src="/assets/about-images/TCS.JPG" 
                  alt="Tibetan Cancer Society" 
                  className="w-full h-auto"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/assets/placeholder-image.jpg';
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Mission Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2 order-2 md:order-1">
              <div className="rounded-xl overflow-hidden shadow-lg">
                <img 
                  src="/assets/about-images/TCS-mission.png" 
                  alt="Our Mission" 
                  className="w-full h-auto"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/assets/placeholder-image.jpg';
                  }}
                />
              </div>
            </div>
            <div className="md:w-1/2 order-1 md:order-2">
              <div className="inline-flex items-center bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full mb-2">
                <Target className="h-3 w-3 mr-1" />
                <span>Our Purpose</span>
              </div>
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-gray-600 mb-6">
                At the Tibetan Cancer Society, our mission is to do everything possible to prevent cancer in Tibetan communities through early screening, awareness programs, and health education. We are committed to empowering individuals with knowledge about cancer prevention and encouraging regular check-ups for early detection.
              </p>
              <p className="text-gray-600 mb-6">
                We also provide crucial support to those affected by cancer, offering financial assistance for treatment, palliative care, rehabilitation, and overall welfare. Our work extends to research and awareness efforts to better understand and address the challenges faced by Tibetans living with cancer.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-primary mb-1">2014</div>
                  <div className="text-sm text-gray-600">Year Founded</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-primary mb-1">5000+</div>
                  <div className="text-sm text-gray-600">Lives Impacted</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Appreciation and Legal Documents Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full mb-2">
              <Award className="h-3 w-3 mr-1" />
              <span>Recognition</span>
            </div>
            <h2 className="text-3xl font-bold mb-4">Appreciation and Legal Documents</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              The Tibetan Cancer Society is officially recognized by the Central Tibetan Administration and registered as a non-profit organization.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* HH Dalai Lama Office Letter */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-start mb-4">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">HH Dalai Lama Office Letter</h3>
                  <p className="text-gray-600 text-sm">
                    Official letter of recognition and support from the Office of His Holiness the 14th Dalai Lama, acknowledging the importance of our work in the Tibetan community.
                  </p>
                </div>
              </div>
              <div className="rounded-lg overflow-hidden border border-gray-200">
                <img 
                  src="/assets/about-images/HH_letter.jpeg" 
                  alt="HH Dalai Lama Office Letter" 
                  className="w-full h-auto"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/assets/placeholder-image.jpg';
                  }}
                />
              </div>
              <div className="mt-4 text-center">
                <a 
                  href="/assets/documents/HH_letter.pdf" 
                  target="_blank"
                  className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
                >
                  View Full Document
                </a>
              </div>
            </div>

            {/* Letter of Registration */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-start mb-4">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Letter of Registration</h3>
                  <p className="text-gray-600 text-sm">
                    Official registration document confirming our status as a registered non-profit organization dedicated to cancer care and support in the Tibetan community.
                  </p>
                </div>
              </div>
              <div className="rounded-lg overflow-hidden border border-gray-200">
                <img 
                  src="/assets/about-images/registration.jpeg" 
                  alt="Registration Letter" 
                  className="w-full h-auto"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/assets/placeholder-image.jpg';
                  }}
                />
              </div>
              <div className="mt-4 text-center">
                <a 
                  href="/assets/documents/registration_letter.pdf" 
                  target="_blank"
                  className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
                >
                  View Full Document
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary/5 p-8 md:p-12 rounded-2xl text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Join Us in Our Mission</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Help us continue our work in cancer prevention, awareness, and support for the Tibetan community.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="/donate" 
                className="bg-primary text-white hover:bg-primary/90 font-semibold py-3 px-6 rounded-full transition-colors"
              >
                Support Our Cause
              </a>
              <a 
                href="/contact" 
                className="bg-white text-primary border border-primary hover:bg-gray-50 font-semibold py-3 px-6 rounded-full transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default About;
