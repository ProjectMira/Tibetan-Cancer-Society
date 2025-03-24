
import React, { useEffect, useRef } from 'react';
import { Lightbulb, Eye, Zap, Shield, Workflow } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard = ({ icon, title, description, delay }: FeatureCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('opacity-100');
            entry.target.classList.remove('opacity-0', 'translate-y-8');
          }, delay);
        }
      },
      {
        root: null,
        threshold: 0.1,
      }
    );
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [delay]);
  
  return (
    <div 
      ref={cardRef} 
      className="feature-card opacity-0 translate-y-8 transition-all duration-700"
    >
      <div className="feature-icon">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

const Features = () => {
  const headingRef = useRef<HTMLDivElement>(null);
  
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
    
    if (headingRef.current) {
      observer.observe(headingRef.current);
    }
    
    return () => {
      if (headingRef.current) {
        observer.unobserve(headingRef.current);
      }
    };
  }, []);
  
  return (
    <div id="features" className="bg-white py-24">
      <div className="section-container">
        <div 
          ref={headingRef} 
          className="text-center max-w-3xl mx-auto mb-16 opacity-0 translate-y-8 transition-all duration-700"
        >
          <p className="section-heading">Features</p>
          <h2 className="section-title">Designed with purpose</h2>
          <p className="text-muted-foreground text-lg">
            Every detail has been carefully considered to create a product that not only looks beautiful but functions seamlessly.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<Lightbulb size={24} />}
            title="Intuitive Design"
            description="Simple interfaces that focus on what matters, eliminating unnecessary distractions."
            delay={0}
          />
          <FeatureCard 
            icon={<Eye size={24} />}
            title="Aesthetic Precision"
            description="Meticulously crafted visuals with attention to every pixel and proportion."
            delay={100}
          />
          <FeatureCard 
            icon={<Zap size={24} />}
            title="Powerful Performance"
            description="Lightning-fast responsiveness that keeps up with your demands."
            delay={200}
          />
          <FeatureCard 
            icon={<Shield size={24} />}
            title="Robust Security"
            description="Built with security in mind, protecting your data at every level."
            delay={300}
          />
          <FeatureCard 
            icon={<Workflow size={24} />}
            title="Seamless Integration"
            description="Works harmoniously with your existing tools and workflows."
            delay={400}
          />
          <FeatureCard 
            icon={<Zap size={24} />}
            title="Efficient Workflow"
            description="Streamlined processes that save time and reduce complexity."
            delay={500}
          />
        </div>
      </div>
    </div>
  );
};

export default Features;
