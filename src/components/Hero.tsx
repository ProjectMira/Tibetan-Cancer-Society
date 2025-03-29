
import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  
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
    
    // Add animation to each word in the title
    if (titleRef.current) {
      const words = titleRef.current.innerText.split(' ');
      titleRef.current.innerHTML = '';
      
      words.forEach((word, index) => {
        const span = document.createElement('span');
        span.className = 'inline-block animate-fade-in opacity-0';
        span.style.animationDelay = `${index * 150}ms`;
        span.textContent = (index > 0 ? ' ' : '') + word;
        titleRef.current?.appendChild(span);
      });
      
      // Special styling for the word "Tibetan"
      const spans = titleRef.current.querySelectorAll('span');
      spans.forEach(span => {
        if (span.textContent?.includes('Tibetan')) {
          span.className = 'inline-block text-primary animate-scale-in opacity-0';
          span.style.animationDelay = '900ms';
        }
      });
    }
    
    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50 pt-16 relative">
      {/* Background image */}
      <div className="absolute inset-0 z-0 opacity-20">
        <img 
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb" 
          alt="Mountains in Tibet" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div 
        ref={heroRef} 
        className="section-container flex flex-col items-center text-center transition-all duration-700 opacity-0 translate-y-8 relative z-10"
      >
        <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-6 animate-fade-in">
          Fighting Cancer Together
        </span>
        <h1 
          ref={titleRef}
          className="text-5xl md:text-6xl lg:text-7xl font-display font-bold max-w-4xl leading-tight md:leading-tight lg:leading-tight"
        >
          Supporting the <span className="text-primary">Tibetan</span> community against cancer
        </h1>
        <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl animate-fade-in" style={{ animationDelay: '1.2s' }}>
          The Tibetan Cancer Society is dedicated to raising awareness, providing support, and offering resources to cancer patients and their families in the Tibetan community.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: '1.5s' }}>
          <Link to="/about" className="btn-primary">
            Learn About Us
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <Link to="/donate" className="btn-secondary">
            Donate Now
          </Link>
        </div>
        
        <div className="mt-24 w-full max-w-5xl rounded-xl overflow-hidden shadow-2xl animate-scale-in" style={{ animationDelay: '1.8s' }}>
          <div className="aspect-video bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb')" }}></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
