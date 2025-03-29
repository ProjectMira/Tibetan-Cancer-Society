
import React from 'react';
import { useNavigate } from 'react-router-dom';

// This array maps photos to their destination pages and specific item IDs
const featuredPhotos = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    alt: 'Mountain landscape',
    title: 'Health Camp in Dharamshala',
    description: 'Cancer awareness and screening camp',
    destinationPage: '/gallery',
    itemId: 1, // This corresponds to galleryItem id
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1472396961693-142e6e269027',
    alt: 'Deer in mountains',
    title: 'Support Group Meeting',
    description: 'Monthly support gatherings',
    destinationPage: '/gallery',
    itemId: 3,
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1493962853295-0fd70327578a',
    alt: 'Mountains at sunset',
    title: 'Fundraising Event',
    description: 'Community fundraiser',
    destinationPage: '/gallery',
    itemId: 4,
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1615729947596-a598e5de0ab3',
    alt: 'Grassy mountains',
    title: 'Medical Training Program',
    description: 'Training healthcare workers',
    destinationPage: '/gallery',
    itemId: 5,
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
    alt: 'Mountain valley',
    title: 'Rural Outreach Initiative',
    description: 'Reaching remote communities',
    destinationPage: '/gallery',
    itemId: 6,
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
    alt: 'Night sky',
    title: 'Patient Success Story',
    description: 'Cancer survivor stories',
    destinationPage: '/gallery',
    itemId: 7,
  },
];

const PhotoGallery = () => {
  const navigate = useNavigate();

  const handlePhotoClick = (photo: typeof featuredPhotos[0]) => {
    // Navigate to the destination page with state to identify the specific item
    navigate(photo.destinationPage, { 
      state: { selectedItemId: photo.itemId } 
    });
  };

  return (
    <section className="py-16 bg-white">
      <div className="section-container">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">Our Photo Gallery</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-center mb-12">
          Explore photos from our events, programs, and community initiatives across Tibet.
          Click on any photo to see more details.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {featuredPhotos.map((photo, index) => (
            <div 
              key={photo.id} 
              className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer group relative"
              onClick={() => handlePhotoClick(photo)}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={photo.src} 
                  alt={photo.alt} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="text-lg font-semibold">{photo.title}</h3>
                    <p className="text-sm">{photo.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhotoGallery;
