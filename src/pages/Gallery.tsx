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
    title: 'Health Camps',
    description: 'Our team provided free cancer screenings and educational workshops to over 100 community members.',
    location: 'Dharamshala, Himachal Pradesh',
    date: 'March 15, 2023',
    images: [
      'assets/gallery-images/health-camps/3.png',
      'assets/gallery-images/health-camps/5.png',
      'assets/gallery-images/health-camps/8.png',
    ]
  },
  {
    id: 2,
    title: 'Compassion Home',
    description: 'Local healthcare workers learning about early detection and prevention methods.',
    location: 'McLeod Ganj',
    date: 'April 20, 2023',
    images: [
      'assets/gallery-images/compassion-home/1.png',
      'assets/gallery-images/compassion-home/3.png',
      'assets/gallery-images/compassion-home/4.png'
    ]
  },
  {
    id: 3,
    title: 'Covid Aid Tour',
    description: 'Monthly gatherings provide emotional support and practical advice for patients and families.',
    location: 'Tibetan Children\'s Village, Dharamshala',
    date: 'May 10, 2023',
    images: [
      'assets/gallery-images/covid-aid-tour/darjeeling.png',
      'assets/gallery-images/covid-aid-tour/sanada-west-bengal.png',
      'assets/gallery-images/covid-aid-tour/shilong.png'
    ]
  },
  {
    id: 4,
    title: 'World Cancer Day',
    description: 'Community members came together to raise funds for treatment support programs.',
    location: 'Main Temple Complex, McLeod Ganj',
    date: 'June 5, 2023',
    images: [
      'assets/gallery-images/cancer-day/educational-session.png',
      'assets/gallery-images/cancer-day/indian-man-interview.png',
      'assets/gallery-images/cancer-day/yes-we-can-children.png'
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
      <div className="flex flex-row flex-wrap gap-6 justify-center items-center">
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
