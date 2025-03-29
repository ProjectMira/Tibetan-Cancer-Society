
import React, { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface PageLayoutProps {
  title: string;
  description?: string;
  children: ReactNode;
  backgroundClass?: string;
}

const PageLayout = ({ 
  title, 
  description, 
  children,
  backgroundClass = 'bg-primary/10'
}: PageLayoutProps) => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24">
        {/* Page Header */}
        <div className={`${backgroundClass} py-12`}>
          <div className="section-container text-center">
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
