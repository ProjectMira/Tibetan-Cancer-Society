
import React, { useEffect, useRef } from 'react';

const About = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100');
          entry.target.classList.remove('opacity-0', 'translate-y-8');
        }
      },
      {
        root: null,
        threshold: 0.1,
      }
    );
    
    if (contentRef.current) {
      observer.observe(contentRef.current);
    }
    
    if (imageRef.current) {
      observer.observe(imageRef.current);
    }
    
    return () => {
      if (contentRef.current) {
        observer.unobserve(contentRef.current);
      }
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, []);
  
  return (
    <div id="about" className="bg-gray-50 py-24">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div 
            ref={contentRef} 
            className="opacity-0 translate-y-8 transition-all duration-700"
          >
            <p className="section-heading">About Us</p>
            <h2 className="section-title">Committed to excellence and simplicity</h2>
            <p className="text-muted-foreground mb-6">
              We believe that great design is not just what it looks like, but how it works. Our approach combines aesthetic minimalism with functional clarity to create products that are both beautiful and intuitive.
            </p>
            <p className="text-muted-foreground mb-8">
              Every detail, from the spacing between elements to the subtle transitions between states, has been carefully considered to create a cohesive and delightful experience.
            </p>
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4 rounded-lg bg-white shadow-sm">
                <p className="text-3xl font-bold text-primary">100%</p>
                <p className="text-sm text-muted-foreground mt-1">Satisfaction</p>
              </div>
              <div className="p-4 rounded-lg bg-white shadow-sm">
                <p className="text-3xl font-bold text-primary">24/7</p>
                <p className="text-sm text-muted-foreground mt-1">Support</p>
              </div>
              <div className="p-4 rounded-lg bg-white shadow-sm">
                <p className="text-3xl font-bold text-primary">15+</p>
                <p className="text-sm text-muted-foreground mt-1">Years</p>
              </div>
            </div>
          </div>
          
          <div 
            ref={imageRef} 
            className="opacity-0 translate-y-8 transition-all duration-700 delay-300"
          >
            <div className="aspect-square bg-white rounded-2xl shadow-xl overflow-hidden relative">
              <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
