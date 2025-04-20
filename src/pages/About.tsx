
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
                <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                <p className="text-muted-foreground mb-6">
                  The Tibetan Cancer Society is dedicated to improving the lives of cancer patients and their families through education, support, and advocacy. We work to ensure that all members of the Tibetan community have access to information, resources, and quality care.
                </p>
                <p className="text-muted-foreground">
                  We strive to reduce the impact of cancer through early detection, prevention programs, and by providing emotional and practical support to those affected by cancer. By working together with healthcare providers, community leaders, and other organizations, we aim to create a comprehensive support system for all those in need.
                </p>
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1472396961693-142e6e269027" 
                  alt="Tibetan landscape" 
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
                <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
                <p className="text-muted-foreground mb-6">
                  We envision a future where cancer no longer poses a significant threat to the Tibetan community. A world where every individual has access to education about cancer prevention, early detection, and treatment options.
                </p>
                <p className="text-muted-foreground">
                  We work toward a community where cancer patients receive holistic care that addresses both their physical and emotional needs, and where their families have the resources and support to help their loved ones through the cancer journey.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Partners Section */}
        <section className="py-16 bg-white">
          <div className="section-container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Partners & Collaborators</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We work alongside these organizations to provide comprehensive support and resources to our community.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 items-center justify-items-center">
              {/* Partner logos would go here - using placeholder boxes for now */}
              {[1, 2, 3, 4, 5, 6, 8].map((item) => (
                <div key={item} className="bg-gray-100 rounded-lg p-8 flex items-center justify-center w-full h-32">
                  <div className="text-gray-400 font-semibold">Partner Logo</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
