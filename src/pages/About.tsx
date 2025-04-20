
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const About = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24">
        {/* Page Header */}
        
        {/* Mission Section */}
        <section className="py-16 bg-white">
          <div className="section-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Introduction</h2>
                <p className="text-muted-foreground mb-6">
                The Tibetan Cancer Society (TCS) is a non-profit organization dedicated to cancer prevention, early detection, and awareness in Tibetan communities. Founded by Mr. Tsultrim Dorjee in 2014 and officially registered in May 2015, TCS was created to address the urgent need for better cancer care in the Tibetan diaspora. It was formally introduced during a 2016 health meeting organized by the Central Tibetan Administration, following His Holiness the Dalai Lama’s call to improve Tibetan public health.
                </p>
                <p className="text-muted-foreground">
                TCS holds the distinction of being the first and only Tibetan cancer-focused society to be recognized and registered under the global UICC (Union for International Cancer Control) membership, further solidifying its credibility and commitment to global cancer care standards.
                </p>
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="data/about-images/TCS.png" 
                  alt="TCS" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Vision Section */}
        <section className="py-16 bg-gray-50">
          <div className="section-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1 rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1615729947596-a598e5de0ab3" 
                  alt="Tibetan mountains" 
                  className="w-full h-auto"
                />
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                <p className="text-muted-foreground mb-6">
                At the Tibetan Cancer Society, our mission is to do everything possible to prevent cancer in Tibetan communities through early screening, awareness programs, and health education. We are committed to empowering individuals with knowledge about cancer prevention and encouraging regular check-ups for early detection. Through education and counseling, we aim to foster a proactive approach to health and wellness.
                </p>
                <p className="text-muted-foreground">
                We also provide crucial support to those affected by cancer, offering financial assistance for treatment, palliative care, rehabilitation, and overall welfare. Our work extends to research and awareness efforts to better understand and address the challenges faced by Tibetans living with cancer. We are dedicated to creating a compassionate network that supports patients and their families throughout their cancer journey.
                </p>
              </div>
            </div>
          </div>
        </section>
        
      </main>
      <Footer />
    </div>
  );
};

export default About;
