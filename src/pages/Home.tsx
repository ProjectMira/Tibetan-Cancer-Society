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
import { Quote, ArrowRight, Users, MapPin } from 'lucide-react';

// About section component for the home page
const AboutSection = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Impact</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            The Tibetan Cancer Society is making a difference in the lives of cancer patients and their families across the Tibetan community.
          </p>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 text-center">
          <div className="p-4 bg-white rounded-xl shadow-sm">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">1000+</div>
            <div className="text-sm text-gray-600">Cancer Screenings Conducted</div>
          </div>
          <div className="p-4 bg-white rounded-xl shadow-sm">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">500+</div>
            <div className="text-sm text-gray-600">Patients Supported</div>
          </div>
          <div className="p-4 bg-white rounded-xl shadow-sm">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">50+</div>
            <div className="text-sm text-gray-600">Awareness Programs</div>
          </div>
          <div className="p-4 bg-white rounded-xl shadow-sm">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">10</div>
            <div className="text-sm text-gray-600">Years of Service</div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/2">
            <h3 className="text-2xl font-bold mb-4">About Tibetan Cancer Society</h3>
            <p className="text-gray-600 mb-4">
              The Tibetan Cancer Society (TCS) is a non-profit organization dedicated to cancer prevention, early detection, and awareness in Tibetan communities. Founded by Mr. Tsultrim Dorjee in 2014 and officially registered in May 2015, TCS addresses the urgent need for better cancer care in the Tibetan diaspora.
            </p>
            <p className="text-gray-600 mb-6">
              Our mission is to prevent cancer through early screening, awareness programs, and health education while providing crucial support to those affected by cancer.
            </p>
            <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-primary mb-6">
              <h4 className="font-semibold mb-2">Recent Achievement</h4>
              <p className="text-sm text-gray-600">
                In 2024, we successfully launched our mobile cancer screening program, reaching remote Tibetan settlements and providing free screenings to over 200 individuals.
              </p>
            </div>
            <Link to="/about" className="inline-flex items-center text-primary font-medium hover:underline">
              Learn more about us
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          <div className="md:w-1/2">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src="assets/about-images/TCS.JPG" 
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

const ServicesSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Programs & Services</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            The Tibetan Cancer Society offers a comprehensive range of programs and services to support cancer patients, survivors, and their families.
          </p>
        </div>
        
        {/* Cancer Awareness Camp */}
        <div className="mb-10 bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <img 
                src="/assets/programs/awareness-camp.jpg" 
                alt="Cancer Awareness Camp" 
                className="w-full h-auto rounded-lg object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/assets/placeholders/placeholder-image.svg';
                }}
              />
            </div>
            <div className="md:w-2/3">
              <div className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full mb-2">
                Early Detection Program
              </div>
              <Link to="/programs/cancer-awareness-camp" className="hover:text-primary transition-colors">
                <h3 className="text-2xl font-bold mb-3">Cancer Awareness Camp</h3>
              </Link>
              <p className="text-gray-600 mb-4">
                Our Cancer Awareness Cum Detection Camps are comprehensive events organized in various Tibetan settlements to raise awareness about cancer and provide free screening services.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center">
                  <div className="bg-green-100 p-2 rounded-full mr-2">
                    <Users className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-sm">1500+ people screened</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-green-100 p-2 rounded-full mr-2">
                    <MapPin className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-sm">25+ camps conducted</span>
                </div>
              </div>
              <div className="mt-4">
                <Link 
                  to="/programs/cancer-awareness-camp" 
                  className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
                >
                  Learn more
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* World Cancer Day */}
        <div className="mb-10 bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <img 
                src="/assets/programs/world-cancer-day.jpg" 
                alt="World Cancer Day" 
                className="w-full h-auto rounded-lg object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/assets/placeholders/placeholder-image.svg';
                }}
              />
            </div>
            <div className="md:w-2/3">
              <div className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full mb-2">
                Annual Event
              </div>
              <Link to="/programs/world-cancer-day" className="hover:text-primary transition-colors">
                <h3 className="text-2xl font-bold mb-3">World Cancer Day</h3>
              </Link>
              <p className="text-gray-600 mb-4">
                Every year on February 4th, we organize special events to mark World Cancer Day. These events aim to inspire action, raise awareness, and reduce stigma around cancer in the Tibetan community.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center">
                  <div className="bg-green-100 p-2 rounded-full mr-2">
                    <Users className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-sm">1000+ annual participants</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-green-100 p-2 rounded-full mr-2">
                    <MapPin className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-sm">7 years of celebration</span>
                </div>
              </div>
              <div className="mt-4">
                <Link 
                  to="/programs/world-cancer-day" 
                  className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
                >
                  Learn more
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Patient Support */}
        <div className="mb-10 bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <img 
                src="/assets/programs/patient-support.jpg" 
                alt="Patient Support" 
                className="w-full h-auto rounded-lg object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/assets/placeholders/placeholder-image.svg';
                }}
              />
            </div>
            <div className="md:w-2/3">
              <div className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full mb-2">
                Support Program
              </div>
              <Link to="/programs/patient-support" className="hover:text-primary transition-colors">
                <h3 className="text-2xl font-bold mb-3">Patient Support</h3>
              </Link>
              <p className="text-gray-600 mb-4">
                Our Patient Support program provides comprehensive assistance to cancer patients and their families. We offer emotional support through counseling, financial assistance for treatment costs, transportation to medical appointments, and help navigating the healthcare system.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center">
                  <div className="bg-green-100 p-2 rounded-full mr-2">
                    <Users className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-sm">500+ patients supported</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-green-100 p-2 rounded-full mr-2">
                    <MapPin className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-sm">₹1.5M financial aid provided</span>
                </div>
              </div>
              <div className="mt-4">
                <Link 
                  to="/programs/patient-support" 
                  className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
                >
                  Learn more
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Compassion Home */}
        <div className="mb-10 bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <img 
                src="/assets/programs/compassion-home.jpg" 
                alt="Compassion Home" 
                className="w-full h-auto rounded-lg object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/assets/placeholders/placeholder-image.svg';
                }}
              />
            </div>
            <div className="md:w-2/3">
              <div className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full mb-2">
                Accommodation Program
              </div>
              <Link to="/programs/compassion-home" className="hover:text-primary transition-colors">
                <h3 className="text-2xl font-bold mb-3">Compassion Home</h3>
              </Link>
              <p className="text-gray-600 mb-4">
                Compassion Home provides temporary accommodation for cancer patients who need to travel away from their homes for treatment. Our facility offers a comfortable, supportive environment where patients can stay during their treatment period.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center">
                  <div className="bg-green-100 p-2 rounded-full mr-2">
                    <Users className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-sm">200+ patients housed</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-green-100 p-2 rounded-full mr-2">
                    <MapPin className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-sm">3000+ nights of accommodation</span>
                </div>
              </div>
              <div className="mt-4">
                <Link 
                  to="/programs/compassion-home" 
                  className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
                >
                  Learn more
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Ambulance Services */}
        <div className="mb-10 bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <img 
                src="/assets/home/ambulance.png" 
                alt="Ambulance Services" 
                className="w-full h-auto rounded-lg object-cover"
              />
            </div>
            <div className="md:w-2/3">
              <div className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full mb-2">
                Transportation Program
              </div>
              <Link to="/programs/ambulance-services" className="hover:text-primary transition-colors">
                <h3 className="text-2xl font-bold mb-3">Ambulance Services</h3>
              </Link>
              <p className="text-gray-600 mb-4">
                Our ambulance services provide reliable transportation for cancer patients to medical facilities for treatments, check-ups, and emergencies. This service helps reduce the burden of transportation for patients and their families.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center">
                  <div className="bg-green-100 p-2 rounded-full mr-2">
                    <Users className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-sm">300+ patients transported</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-green-100 p-2 rounded-full mr-2">
                    <MapPin className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-sm">2 dedicated ambulances</span>
                </div>
              </div>
              <div className="mt-4">
                <Link 
                  to="/programs/ambulance-services" 
                  className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
                >
                  Learn more
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Community Kitchen */}
        <div className="mb-10 bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <img 
                src="/assets/home/community-kitchen.jpg" 
                alt="Community Kitchen" 
                className="w-full h-auto rounded-lg object-cover"
              />
            </div>
            <div className="md:w-2/3">
              <div className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full mb-2">
                Nutrition Program
              </div>
              <Link to="/programs/community-kitchen" className="hover:text-primary transition-colors">
                <h3 className="text-2xl font-bold mb-3">Community Kitchen</h3>
              </Link>
              <p className="text-gray-600 mb-4">
                Our Community Kitchen provides nutritious meals for cancer patients and their families during treatment. Proper nutrition is crucial for cancer recovery, and our kitchen ensures patients receive balanced, healthy meals.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center">
                  <div className="bg-green-100 p-2 rounded-full mr-2">
                    <Users className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-sm">10,000+ meals served</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-green-100 p-2 rounded-full mr-2">
                    <MapPin className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-sm">Daily service available</span>
                </div>
              </div>
              <div className="mt-4">
                <Link 
                  to="/programs/community-kitchen" 
                  className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
                >
                  Learn more
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Meals for Invisibles */}
        <div className="mb-10 bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <img 
                src="/assets/home/MFI.png" 
                alt="Meals for Invisibles" 
                className="w-full h-auto rounded-lg object-cover"
              />
            </div>
            <div className="md:w-2/3">
              <div className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full mb-2">
                Outreach Program
              </div>
              <Link to="/programs/meals-for-invisibles" className="hover:text-primary transition-colors">
                <h3 className="text-2xl font-bold mb-3">Meals for Invisibles</h3>
              </Link>
              <p className="text-gray-600 mb-4">
                Meals for Invisibles provides food for homeless and underprivileged cancer patients who often go unnoticed. This program ensures that even the most vulnerable members of our community receive proper nutrition during their cancer journey.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center">
                  <div className="bg-green-100 p-2 rounded-full mr-2">
                    <Users className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-sm">150+ individuals served weekly</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-green-100 p-2 rounded-full mr-2">
                    <MapPin className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-sm">3 distribution centers</span>
                </div>
              </div>
              <div className="mt-4">
                <Link 
                  to="/programs/meals-for-invisibles" 
                  className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
                >
                  Learn more
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Sunday Program */}
        <div className="mb-10 bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <img 
                src="/assets/programs/sunday-program.jpg" 
                alt="Sunday Program" 
                className="w-full h-auto rounded-lg object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/assets/placeholders/placeholder-image.svg';
                }}
              />
            </div>
            <div className="md:w-2/3">
              <div className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full mb-2">
                Community Program
              </div>
              <Link to="/programs/sunday-program" className="hover:text-primary transition-colors">
                <h3 className="text-2xl font-bold mb-3">Sunday Program</h3>
              </Link>
              <p className="text-gray-600 mb-4">
                Our Sunday Program provides weekly gatherings for cancer patients and survivors to connect, share experiences, and heal together. These sessions include support group discussions, meditation, and educational talks about cancer management.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center">
                  <div className="bg-green-100 p-2 rounded-full mr-2">
                    <Users className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-sm">30+ participants weekly</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-green-100 p-2 rounded-full mr-2">
                    <MapPin className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-sm">250+ sessions conducted</span>
                </div>
              </div>
              <div className="mt-4">
                <Link 
                  to="/programs/sunday-program" 
                  className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
                >
                  Learn more
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

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

const Home = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch('/assets/data/testimonials.json');
        if (!response.ok) {
          throw new Error('Failed to load testimonials');
        }
        const data = await response.json();
        // Only show first 3 testimonials on home page
        setTestimonials(data.testimonials.slice(0, 3));
      } catch (error) {
        console.error('Error loading testimonials:', error);
      }
    };

    fetchTestimonials();
  }, []);
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />

      {/* About Section */}
      <AboutSection />

      {/* Services Section */}
      <ServicesSection />

      {/* Testimonials Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Patient Stories</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Hear from those who have been supported by the Tibetan Cancer Society.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white rounded-xl shadow-sm p-6 transition-shadow hover:shadow-md"
              >
                <Quote className="h-8 w-8 text-primary mb-4" />
                <div className="mb-2">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    {testimonial.diagnosis}
                  </span>
                </div>
                <blockquote className="mb-4">
                  <p className="text-gray-700 italic line-clamp-4">{testimonial.quote}</p>
                </blockquote>
                <div className="flex items-center">
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
                    <div className="text-base font-semibold">{testimonial.name}, {testimonial.age}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.location} • {testimonial.date}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/testimonials"
              className="inline-flex items-center text-primary hover:text-primary/80 font-semibold"
            >
              View All Patient Stories
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
