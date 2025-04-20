import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PhotoGallery from '../components/PhotoGallery';
import { Link } from 'react-router-dom';

// About section component for the home page
const AboutSection = () => {
  return (
    <section className="py-8 md:py-12 bg-gray-50">
      <div className="section-container px-4 md:px-6">
        <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center">
          <div className="md:w-1/2 order-2 md:order-1">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">About Us</h2>
            <p className="text-muted-foreground text-sm md:text-base mb-4">
              The Tibetan Cancer Society (TCS) is a non-profit organization dedicated to cancer prevention, early detection, and awareness in Tibetan communities. Founded by Mr. Tsultrim Dorjee in 2014 and officially registered in May 2015, TCS addresses the urgent need for better cancer care in the Tibetan diaspora.
            </p>
            <p className="text-muted-foreground text-sm md:text-base mb-4">
              Our mission is to prevent cancer through early screening, awareness programs, and health education while providing crucial support to those affected by cancer.
            </p>
            <Link to="/about" className="inline-flex items-center text-primary font-medium hover:underline">
              Learn more about us
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="md:w-1/2 order-1 md:order-2">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src="assets/about-images/TCS.png" 
                alt="Tibetan Cancer Society" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const GallerySection = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGalleryItems = async () => {
      try {
        const response = await fetch('/assets/data/galleryitems.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setGalleryItems(data);
      } catch (error) {
        setError(error);
        console.error("Failed to fetch gallery items:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGalleryItems();
  }, []);

  if (loading) {
    return (
      <section id="gallery" className="py-8 md:py-16 bg-white">
        <div className="section-container px-4">
          <div className="flex justify-center items-center min-h-[200px]">
            <p className="text-lg">Loading gallery items...</p>
          </div>
        </div>
      </section>
    );
  }
  
  if (error) {
    return (
      <section id="gallery" className="py-8 md:py-16 bg-white">
        <div className="section-container px-4">
          <div className="flex justify-center items-center min-h-[200px]">
            <p className="text-lg text-red-500">Error loading gallery items: {error.message}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="gallery" className="py-8 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12">Programs and Services</h2>
        <div className="flex flex-col gap-8 md:gap-16">
          {galleryItems.map((item) => (
            <div key={item.id} className="p-4 md:p-6 bg-gray-50 rounded-lg shadow">
              <div className="mb-4 md:mb-6">
                <h3 className="text-xl md:text-2xl font-bold text-center mb-2">{item.title}</h3>
                <p className="text-gray-600 text-center mb-1 text-sm md:text-base">{item.description}</p>
                <div className="flex flex-col md:flex-row justify-center gap-2 md:gap-4 text-xs md:text-sm text-gray-500 items-center">
                  <span>{item.location}</span>
                  <span className="hidden md:inline">•</span>
                  <span>{item.date}</span>
                </div>
              </div>
              <Carousel className="w-full max-w-4xl mx-auto" opts={{ align: "start", loop: true }}>
                <CarouselContent>
                  {item.images.map((image, idx) => (
                    <CarouselItem key={idx} className="md:basis-1/2 lg:basis-1/3 pl-4 md:pl-6">
                      <Card className="border-none">
                        <CardContent className="p-1 md:p-2">
                          <img
                            src={`/${image}`}
                            alt={`${item.title} - Image ${idx + 1}`}
                            className="w-full h-40 md:h-56 object-cover rounded-lg shadow"
                            loading="lazy"
                          />
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="flex justify-center mt-4">
                  <CarouselPrevious className="mr-2 h-8 w-8 md:h-10 md:w-10" />
                  <CarouselNext className="h-8 w-8 md:h-10 md:w-10" />
                </div>
              </Carousel>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Home = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />

      {/* About Section */}
      <AboutSection />

      {/* Gallery Section */}
      <GallerySection />

      <Footer />
    </div>
  );
};

export default Home;
