
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Index = () => {
  useEffect(() => {
    // Smooth scroll to section when clicking on links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (!targetId || targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth'
          });
        }
      });
    });
    
    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', function (e) {
          e.preventDefault();
        });
      });
    };
  }, []);
  
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        
        {/* Quick Links Section */}
        <section className="py-16 bg-white">
          <div className="section-container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-50 rounded-xl p-8 text-center hover:shadow-md transition-all">
                <h3 className="text-2xl font-semibold mb-4">Cancer Information</h3>
                <p className="text-muted-foreground mb-6">Learn about different types of cancer, symptoms, and prevention methods.</p>
                <Link to="/cancer-info" className="inline-flex items-center text-primary hover:underline">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-8 text-center hover:shadow-md transition-all">
                <h3 className="text-2xl font-semibold mb-4">Support Services</h3>
                <p className="text-muted-foreground mb-6">Discover the various ways we support cancer patients and their families.</p>
                <Link to="/about" className="inline-flex items-center text-primary hover:underline">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-8 text-center hover:shadow-md transition-all">
                <h3 className="text-2xl font-semibold mb-4">Get Involved</h3>
                <p className="text-muted-foreground mb-6">Find out how you can contribute to our cause through donations or volunteering.</p>
                <Link to="/donate" className="inline-flex items-center text-primary hover:underline">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Impact Section */}
        <section className="py-16 bg-gray-50">
          <div className="section-container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Impact</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Through education, support, and community outreach, we're making a difference in the lives of those affected by cancer.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
              <div className="p-6">
                <p className="text-4xl font-bold text-primary mb-2">500+</p>
                <p className="text-muted-foreground">Patients Supported</p>
              </div>
              
              <div className="p-6">
                <p className="text-4xl font-bold text-primary mb-2">20+</p>
                <p className="text-muted-foreground">Health Camps</p>
              </div>
              
              <div className="p-6">
                <p className="text-4xl font-bold text-primary mb-2">10+</p>
                <p className="text-muted-foreground">Partner Organizations</p>
              </div>
              
              <div className="p-6">
                <p className="text-4xl font-bold text-primary mb-2">5000+</p>
                <p className="text-muted-foreground">Community Members Educated</p>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <Link to="/gallery" className="btn-secondary">
                View Our Gallery
              </Link>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-primary/10">
          <div className="section-container text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Us in Making a Difference</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">Your support helps us continue our mission of providing resources, education, and support to those affected by cancer in the Tibetan community.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/donate" className="btn-primary">
                Donate Now
              </Link>
              <Link to="/contact" className="btn-secondary">
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
