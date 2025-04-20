import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import PageLayout from '../components/PageLayout';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

// const galleryItems = [ ... ]; // REMOVE the hardcoded data

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState([]); // State to hold fetched data
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    const fetchGalleryItems = async () => {
      try {
        // Fetch data from the JSON file
        const response = await fetch('/assets/data/galleryitems.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setGalleryItems(data); // Update state with fetched data
      } catch (error) {
        setError(error); // Set error state if fetch fails
        console.error("Failed to fetch gallery items:", error);
      } finally {
        setLoading(false); // Set loading to false after fetch attempt
      }
    };

    fetchGalleryItems();
  }, []); // Empty dependency array ensures this runs only once on mount

  // --- Rendering Logic (kept similar to your original code) ---
  if (loading) {
    return <PageLayout><p>Loading gallery items...</p></PageLayout>;
  }

  if (error) {
    return <PageLayout><p>Error loading gallery items: {error.message}</p></PageLayout>;
  }

  // Render the gallery only if data is loaded and no error occurred
  return (
    <PageLayout>
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-16">
            {/* Use the state variable galleryItems */}
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

                <Carousel className="w-full max-w-4xl mx-auto"
                  opts={{
                    align: "start",
                    loop: true,
                  }}>
                  <CarouselContent>
                    {item.images.map((image, idx) => (
                      <CarouselItem key={idx} className="md:basis-1/2 lg:basis-1/3">
                        <Card className="border-none">
                          <CardContent className="p-2">
                            {/* Image source needs leading slash */}
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
    </PageLayout>
  );
};

export default Gallery;