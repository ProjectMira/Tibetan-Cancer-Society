import React from 'react';
import PageLayout from '../components/PageLayout';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

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
                            <img
                              src={image}
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