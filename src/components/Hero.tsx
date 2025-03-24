
import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
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
    
    if (heroRef.current) {
      observer.observe(heroRef.current);
    }
    
    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50 pt-16">
      <div 
        ref={heroRef} 
        className="section-container flex flex-col items-center text-center transition-all duration-700 opacity-0 translate-y-8"
      >
        <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-6">
          Beautifully Crafted
        </span>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold max-w-4xl leading-tight md:leading-tight lg:leading-tight">
          Design with <span className="text-primary">simplicity</span>, built with precision
        </h1>
        <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl">
          A minimalist approach to products that embodies elegance, functionality, and attention to detail.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <a href="#features" className="btn-primary">
            Explore Features
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
          <a href="#about" className="btn-secondary">
            Learn More
          </a>
        </div>
        
        <div className="mt-24 w-full max-w-5xl rounded-xl overflow-hidden shadow-2xl">
          <div className="aspect-video bg-gray-100 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
