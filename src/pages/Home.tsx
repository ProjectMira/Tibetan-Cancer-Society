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
    return <section id="gallery" className="py-16 bg-white"><div className="section-container"><p>Loading gallery items...</p></div></section>;
  }
  if (error) {
    return <section id="gallery" className="py-16 bg-white"><div className="section-container"><p>Error loading gallery items: {error.message}</p></div></section>;
  }

  return (
    <section id="gallery" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-16">
          {galleryItems.map((item) => (
            <div key={item.id} className="p-6 bg-gray-50 rounded-lg shadow">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-center mb-2">{item.title}</h3>
                <p className="text-gray-600 text-center mb-1">{item.description}</p>
                <div className="flex justify-center gap-4 text-sm text-gray-500">
                  <span>{item.location}</span>
                  <span>•</span>
                  <span>{item.date}</span>
                </div>
              </div>
              <Carousel className="w-full max-w-4xl mx-auto" opts={{ align: "start", loop: true }}>
                <CarouselContent>
                  {item.images.map((image, idx) => (
                    <CarouselItem key={idx} className="md:basis-1/2 lg:basis-1/3">
                      <Card className="border-none">
                        <CardContent className="p-2">
                          <img
                            src={`/${image}`}
                            alt={`${item.title} - Image ${idx + 1}`}
                            className="w-full h-56 object-cover rounded-lg shadow"
                          />
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="flex justify-center mt-4">
                  <CarouselPrevious className="mr-2" />
                  <CarouselNext />
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

      {/* Gallery Section */}
      <GallerySection />

      <Footer />
    </div>
  );
};

export default Home;
