
import React, { useState } from 'react';
import PageLayout from '../components/PageLayout';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { 
  Card, 
  CardContent, 
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

const galleryItems = [
  {
    id: 1,
    title: 'Health Camp in Dharamshala',
    description: 'Our team provided free cancer screenings and educational workshops to over 100 community members.',
    location: 'Dharamshala, Himachal Pradesh',
    date: 'March 15, 2023',
    images: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
      'https://images.unsplash.com/photo-1472396961693-142e6e269027',
      'https://images.unsplash.com/photo-1493962853295-0fd70327578a'
    ]
  },
  {
    id: 2,
    title: 'Cancer Awareness Workshop',
    description: 'Local healthcare workers learning about early detection and prevention methods.',
    location: 'McLeod Ganj',
    date: 'April 20, 2023',
    images: [
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
      'https://images.unsplash.com/photo-1466721591366-2d5fba72006d'
    ]
  },
  {
    id: 3,
    title: 'Support Group Meeting',
    description: 'Monthly gatherings provide emotional support and practical advice for patients and families.',
    location: 'Tibetan Children's Village, Dharamshala',
    date: 'May 10, 2023',
    images: [
      'https://images.unsplash.com/photo-1472396961693-142e6e269027',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb'
    ]
  },
  {
    id: 4,
    title: 'Fundraising Event',
    description: 'Community members came together to raise funds for treatment support programs.',
    location: 'Main Temple Complex, McLeod Ganj',
    date: 'June 5, 2023',
    images: [
      'https://images.unsplash.com/photo-1501854140801-50d01698950b',
      'https://images.unsplash.com/photo-1493962853295-0fd70327578a'
    ]
  },
  {
    id: 5,
    title: 'Medical Training Program',
    description: 'Training local health workers in basic cancer care and patient support techniques.',
    location: 'Delek Hospital, Dharamshala',
    date: 'July 12, 2023',
    images: [
      'https://images.unsplash.com/photo-1615729947596-a598e5de0ab3',
      'https://images.unsplash.com/photo-1472396961693-142e6e269027'
    ]
  },
  {
    id: 6,
    title: 'Rural Outreach Initiative',
    description: 'Bringing cancer awareness to remote mountain communities through mobile health units.',
    location: 'Kangra Valley',
    date: 'August 25, 2023',
    images: [
      'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb'
    ]
  },
  {
    id: 7,
    title: 'Patient Success Story',
    description: 'Tenzin, a breast cancer survivor, sharing her journey and inspiring others at our community event.',
    location: 'Community Hall, McLeod Ganj',
    date: 'September 18, 2023',
    images: [
      'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
      'https://images.unsplash.com/photo-1493962853295-0fd70327578a'
    ]
  },
  {
    id: 8,
    title: 'Annual Conference',
    description: 'Healthcare professionals and advocates gathered to discuss advancements in cancer care.',
    location: 'Tibetan Institute of Performing Arts',
    date: 'October 7, 2023',
    images: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
      'https://images.unsplash.com/photo-1472396961693-142e6e269027'
    ]
  },
];

const Gallery = () => {
  const [selectedItem, setSelectedItem] = useState<(typeof galleryItems)[0] | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  const handleItemClick = (item: typeof galleryItems[0]) => {
    setSelectedItem(item);
    setActiveImageIndex(0);
  };
  
  const closeModal = () => {
    setSelectedItem(null);
    setActiveImageIndex(0);
  };
  
  return (
    <PageLayout 
      title="Gallery" 
      description="Explore photos from our events, programs, and the communities we serve."
    >
      <section className="py-16 bg-white">
        <div className="section-container">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {galleryItems.map((item) => (
              <Card 
                key={item.id} 
                className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handleItemClick(item)}
              >
                <div className="aspect-square">
                  <img 
                    src={item.images[0]} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                  />
                </div>
                <CardHeader className="p-4">
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardFooter className="px-4 py-2 text-xs text-muted-foreground flex justify-between">
                  <span>{item.date}</span>
                  <span>{item.location}</span>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Modal for displaying gallery item details */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="relative">
              <Carousel className="w-full">
                <CarouselContent>
                  {selectedItem.images.map((image, index) => (
                    <CarouselItem key={index}>
                      <div className="p-1">
                        <div className="aspect-video relative">
                          <img 
                            src={image} 
                            alt={`${selectedItem.title} - Image ${index + 1}`} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-2" />
                <CarouselNext className="right-2" />
              </Carousel>
              <button 
                onClick={closeModal}
                className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-colors z-10"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{selectedItem.title}</h3>
              <p className="text-muted-foreground mb-4">{selectedItem.description}</p>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>📅 {selectedItem.date}</span>
                <span>📍 {selectedItem.location}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default Gallery;
