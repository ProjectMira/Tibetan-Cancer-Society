import React from 'react';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PhotoGallery from '../components/PhotoGallery';

const Home = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      
      {/* TCS Health Camp Section */}
      <section className="py-12 bg-white">
        <div className="section-container">
          <h2 className="text-3xl font-bold mb-6 text-center">TCS Health Camp</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all">
                <div className="aspect-square relative overflow-hidden">
                  <img 
                    src={`https://source.unsplash.com/random/300x300?health,medical&sig=${item}`}
                    alt={`Health Camp Image ${item}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-600">Description</p>
                  <p className="text-sm text-gray-600">Year</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TCS During Covid Section */}
      <section className="py-12 bg-gray-50">
        <div className="section-container">
          <h2 className="text-3xl font-bold mb-6 text-center">TCS During Covid</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all">
                <div className="aspect-square relative overflow-hidden">
                  <img 
                    src={`https://source.unsplash.com/random/300x300?covid,health&sig=${item+10}`}
                    alt={`Covid Response Image ${item}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-600">Description</p>
                  <p className="text-sm text-gray-600">Year</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TCS Compassion Home Section */}
      <section className="py-12 bg-white">
        <div className="section-container">
          <h2 className="text-3xl font-bold mb-6 text-center">TCS Compassion Home</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all">
                <div className="aspect-square relative overflow-hidden">
                  <img 
                    src={`https://source.unsplash.com/random/300x300?compassion,care&sig=${item+20}`}
                    alt={`Compassion Home Image ${item}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-600">Description</p>
                  <p className="text-sm text-gray-600">Year</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Patient Testimonies Section */}
      <section className="py-12 bg-gray-50">
        <div className="section-container">
          <h2 className="text-3xl font-bold mb-6 text-center">Patient Testimonies</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all">
                <div className="aspect-square relative overflow-hidden">
                  <img 
                    src={`https://source.unsplash.com/random/300x300?patient,testimony&sig=${item+30}`}
                    alt={`Patient Testimony ${item}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-600">Description</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meal for Invisible Section */}
      <section className="py-12 bg-white">
        <div className="section-container">
          <h2 className="text-3xl font-bold mb-6 text-center">Meal for Invisible</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all">
                <div className="aspect-square relative overflow-hidden">
                  <img 
                    src={`https://source.unsplash.com/random/300x300?meal,food&sig=${item+40}`}
                    alt={`Meal for Invisible ${item}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-600">Description</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
