import React, { useState, useEffect } from 'react';
import PageLayout from '../components/PageLayout';
import { X } from 'lucide-react';
import { useLocation } from 'react-router-dom';
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
  CardTitle,
  CardDescription
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
      'https://images.unsplash.com/photo-1472396961366-2d5fba72006d',
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
    location: 'Tibetan Children\'s Village, Dharamshala',
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
  }
];

const Gallery = () => {
  
  
  return (
    <PageLayout>
      <section className="py-16 bg-white">
        <div className="section-container">
          <div className="flex flex-col gap-12">
  {galleryItems.map((item) => (
    <div key={item.id} className="p-6">
      <div className="mb-4">
  <h3 className="text-2xl font-bold text-center mb-4">{item.title}</h3>
</div>
      <div className="flex flex-row flex-wrap gap-4">
        {item.images.map((image, idx) => (
          <img
            key={idx}
            src={image}
            alt={`${item.title} - Image ${idx + 1}`}
            className="w-72 h-56 object-cover rounded"
          />
        ))}
      </div>
    </div>
  ))}
</div>
        </div>
      </section>
      
      
    </PageLayout>
  );
};

export default Gallery;
