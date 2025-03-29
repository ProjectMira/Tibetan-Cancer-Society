
import React, { useState } from 'react';
import PageLayout from '../components/PageLayout';
import { X } from 'lucide-react';

const galleryItems = [
  {
    id: 1,
    title: 'Health Camp in Dharamshala',
    description: 'Our team provided free cancer screenings and educational workshops to over 100 community members.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb'
  },
  {
    id: 2,
    title: 'Cancer Awareness Workshop',
    description: 'Local healthcare workers learning about early detection and prevention methods.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158'
  },
  {
    id: 3,
    title: 'Support Group Meeting',
    description: 'Monthly gatherings provide emotional support and practical advice for patients and families.',
    image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027'
  },
  {
    id: 4,
    title: 'Fundraising Event',
    description: 'Community members came together to raise funds for treatment support programs.',
    image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b'
  },
  {
    id: 5,
    title: 'Medical Training Program',
    description: 'Training local health workers in basic cancer care and patient support techniques.',
    image: 'https://images.unsplash.com/photo-1615729947596-a598e5de0ab3'
  },
  {
    id: 6,
    title: 'Rural Outreach Initiative',
    description: 'Bringing cancer awareness to remote mountain communities through mobile health units.',
    image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7'
  },
  {
    id: 7,
    title: 'Patient Success Story',
    description: 'Tenzin, a breast cancer survivor, sharing her journey and inspiring others at our community event.',
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b'
  },
  {
    id: 8,
    title: 'Annual Conference',
    description: 'Healthcare professionals and advocates gathered to discuss advancements in cancer care.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb'
  },
];

const Gallery = () => {
  const [selectedItem, setSelectedItem] = useState<(typeof galleryItems)[0] | null>(null);
  
  return (
    <PageLayout 
      title="Gallery" 
      description="Explore photos from our events, programs, and the communities we serve."
    >
      <section className="py-16 bg-white">
        <div className="section-container">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {galleryItems.map((item) => (
              <div 
                key={item.id} 
                className="overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSelectedItem(item)}
              >
                <div className="aspect-square">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Modal for displaying image details */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-auto">
            <div className="relative">
              <img 
                src={selectedItem.image} 
                alt={selectedItem.title} 
                className="w-full h-auto"
              />
              <button 
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{selectedItem.title}</h3>
              <p className="text-muted-foreground">{selectedItem.description}</p>
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default Gallery;
