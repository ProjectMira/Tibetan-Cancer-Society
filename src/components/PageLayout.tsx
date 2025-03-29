
import React, { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface PageLayoutProps {
  title: string;
  description?: string;
  children: ReactNode;
  backgroundClass?: string;
  backgroundImage?: string;
}

const PageLayout = ({ 
  title, 
  description, 
  children,
  backgroundClass = 'bg-primary/10',
  backgroundImage = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb'
}: PageLayoutProps) => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24">
        {/* Page Header */}
        <div className={`py-12 relative overflow-hidden`}>
          <div className="absolute inset-0 z-0">
            <img 
              src={backgroundImage} 
              alt={title} 
              className="w-full h-full object-cover opacity-20"
            />
            <div className={`absolute inset-0 ${backgroundClass} opacity-60`}></div>
          </div>
          <div className="section-container text-center relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
            {description && (
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {description}
              </p>
            )}
          </div>
        </div>
        
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PageLayout;
