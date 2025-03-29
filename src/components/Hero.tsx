
import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

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
          Fighting Cancer Together
        </span>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold max-w-4xl leading-tight md:leading-tight lg:leading-tight">
          Supporting the <span className="text-primary">Tibetan</span> community against cancer
        </h1>
        <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl">
          The Tibetan Cancer Society is dedicated to raising awareness, providing support, and offering resources to cancer patients and their families in the Tibetan community.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Link to="/about" className="btn-primary">
            Learn About Us
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <Link to="/donate" className="btn-secondary">
            Donate Now
          </Link>
        </div>
        
        <div className="mt-24 w-full max-w-5xl rounded-xl overflow-hidden shadow-2xl">
          <div className="aspect-video bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb')" }}></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
