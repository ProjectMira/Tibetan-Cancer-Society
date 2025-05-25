import React, { useState, useEffect } from 'react';
import PageLayout from '../components/PageLayout';
import { Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  age: number;
  diagnosis: string;
  location: string;
  image: string;
  quote: string;
  date: string;
}

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch('/assets/data/testimonials.json');
        if (!response.ok) {
          throw new Error('Failed to load testimonials');
        }
        const data = await response.json();
        setTestimonials(data.testimonials);
      } catch (error) {
        console.error('Error loading testimonials:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  // Handle opening and closing the modal
  const handleCardClick = (testimonial: Testimonial) => setSelectedTestimonial(testimonial);
  const handleCloseModal = () => setSelectedTestimonial(null);

  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (selectedTestimonial) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedTestimonial]);

  if (loading) {
    return (
      <PageLayout>
        <div className="flex justify-center items-center min-h-[50vh]">
          <p className="text-lg">Loading testimonials...</p>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Patient Testimonials</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real stories from our community members who have been supported by the Tibetan Cancer Society.
            </p>
          </div>

          {selectedTestimonial ? (
            // --- Detailed View (Modal) ---
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
              onClick={handleCloseModal}
            >
              <div
                className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-4 md:p-10 relative flex flex-col items-center overflow-y-auto max-h-[90vh] m-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={handleCloseModal}
                  className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl z-10 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-sm"
                  aria-label="Close"
                >
                  &times;
                </button>
                <div className="flex flex-col items-center w-full">
                  <Quote className="h-12 w-12 text-primary mb-6" />
                  <div className="mb-4">
                    <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                      {selectedTestimonial.diagnosis}
                    </span>
                  </div>
                  <img
                    src={selectedTestimonial.image}
                    alt={selectedTestimonial.name}
                    className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-full border shadow-md mb-4"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/assets/default-avatar.png';
                    }}
                  />
                  <h3 className="text-2xl md:text-3xl font-bold mb-1 text-center">{selectedTestimonial.name}</h3>
                  <p className="text-muted-foreground mb-4 text-base md:text-lg text-center">
                    {selectedTestimonial.location} • {selectedTestimonial.date}
                  </p>
                  <blockquote className="text-gray-700 italic whitespace-pre-line text-sm md:text-base text-center px-2 md:px-0">
                    {selectedTestimonial.quote}
                  </blockquote>
                </div>
              </div>
            </div>
          ) : (
            // --- Grid View ---
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 auto-rows-auto">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="bg-white rounded-xl shadow-sm p-6 transition-shadow hover:shadow-md flex flex-col h-full cursor-pointer"
                  onClick={() => handleCardClick(testimonial)}
                >
                  <Quote className="h-8 w-8 text-primary mb-4" />
                  <div className="mb-2">
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      {testimonial.diagnosis}
                    </span>
                  </div>
                  <blockquote className="mb-4 flex-grow">
                    <p className="text-gray-700 italic">
                      {testimonial.quote.length > 200 
                        ? `${testimonial.quote.substring(0, 200)}...` 
                        : testimonial.quote}
                    </p>
                    {testimonial.quote.length > 200 && (
                      <button 
                        className="mt-2 text-primary text-sm font-medium hover:underline"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCardClick(testimonial);
                        }}
                      >
                        Read More
                      </button>
                    )}
                  </blockquote>
                  <div className="flex items-center mt-auto">
                    <div className="flex-shrink-0">
                      <img
                        className="h-12 w-12 rounded-full object-cover"
                        src={testimonial.image}
                        alt={testimonial.name}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/assets/default-avatar.png';
                        }}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-base font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.location} • {testimonial.date}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
};

export default Testimonials;
