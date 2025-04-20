
import React, { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface PageLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  backgroundClass?: string;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PageLayout;
