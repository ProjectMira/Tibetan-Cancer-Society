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
import ProgramCard from '../components/ProgramCard';
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-full mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-3xl font-bold text-blue-900 mb-2">45,000+</div>
            <div className="text-blue-700 font-medium">Cancer Screenings Conducted</div>
          </div>

          <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-600 text-white rounded-full mb-4">
              <Users className="h-6 w-6" />
            </div>
            <div className="text-3xl font-bold text-green-900 mb-2">30,000+</div>
            <div className="text-green-700 font-medium">Patients Supported</div>
          </div>

          <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-600 text-white rounded-full mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <div className="text-3xl font-bold text-purple-900 mb-2">144+</div>
            <div className="text-purple-700 font-medium">Awareness Programs</div>
          </div>

          <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-600 text-white rounded-full mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="text-3xl font-bold text-orange-900 mb-2">10</div>
            <div className="text-orange-700 font-medium">Years of Service</div>
          </div>
        </div>
        
        {/* About Organization Box */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 mb-12">
          <h3 className="text-2xl font-bold mb-4">Tibetan Cancer Society (TCS)</h3>
          <div className="text-lg font-semibold text-primary mb-4 italic">
            Compassion in Action. Hope in Healing.
          </div>
          <p className="text-gray-600 mb-4">
            The Tibetan Cancer Society (TCS) is a registered non-governmental organization (NGO) founded in 2014 and formally established on May 8, 2015, with a mission to address the growing burden of cancer within the Tibetan refugee diaspora and other marginalized communities across India, Nepal, and the Himalayan region. Our organization is committed to advancing cancer prevention, early detection, patient care, and public education—offering compassionate, culturally sensitive, and holistic support to those most in need.
          </p>
          <p className="text-gray-600 mb-4">
            What began as a deeply personal response to a health crisis in the Tibetan exile community has evolved into one of South Asia's most respected Tibetan-led healthcare initiatives. Without formal medical training or institutional financial backing, our founder relied on empathy, resilience, and community mobilization to build an organization that now serves as a lifeline for thousands of individuals and families affected by cancer.
          </p>
          <p className="text-gray-600 mb-6">
            At TCS, we believe that access to quality cancer care is not a privilege, but a human right. Guided by this principle, we work tirelessly to eliminate the barriers that prevent vulnerable populations from receiving timely diagnoses, effective treatment, and dignified support throughout their journey.
          </p>
          <Link to="/about" className="inline-flex items-center text-primary font-medium hover:underline">
            Learn more about us
            <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>

        {/* Founder Message and Image Side by Side */}
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/2">
            <h4 className="text-xl font-semibold mb-4 text-gray-900">A Message from Our Founder</h4>
            <p className="text-gray-700 text-sm leading-relaxed">
              "When I first became aware of the alarming rise in cancer cases within our Tibetan refugee settlements, I was deeply troubled not only by the suffering I witnessed but also by the absence of any organization dedicated to cancer awareness, early detection, or patient support within our community. After months of research, I learned that cancer accounted for nearly 80 percent of both morbidity and mortality among the Tibetan exile population, making it the most urgent health crisis we faced. Yet no efforts were being made to address it. With no formal medical training, financial support, or institutional guidance, I made a personal commitment to act. I started with nothing more than a sense of duty and the small profit generated from my modest business, which I fully reinvested into organizing awareness campaigns and screening camps. My original intention was to establish a foundation and hand it over to the Central Tibetan Administration so they could expand and sustain the work. In 2016, I had the opportunity to meet Sikyong Dr. Lobsang Sangay and formally presented the documentation for the Tibetan Cancer Society, requesting that the CTA take over the mission. While he appreciated the initiative, he encouraged me to continue the work independently. From that moment onward, I accepted the responsibility with a full heart. Despite immense challenges and personal sacrifices, I remained committed to building an organization that would stand as a symbol of compassion, dignity, and hope. The Tibetan Cancer Society was not built through wealth or influence, but through persistence, community trust, and the belief that no one should have to face cancer alone. Today, every life we touch reflects the strength of that belief and the collective effort of those who continue to walk this path with us. This is more than a healthcare initiative; it is a human movement rooted in empathy and sustained by unwavering hope."
            </p>
          </div>
          <div className="md:w-1/2">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src="/assets/home/Tsultrim Dorjee.png" 
                alt="Tsultrim Dorjee - Founder of Tibetan Cancer Society" 
                className="w-full h-auto"
              />
            </div>
            <div className="text-center mt-4">
              <p className="text-gray-700 font-medium">Mr. Tsultrim Dorjee, Founder & CEO</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Services section component
const ServicesSection = () => {
  interface ProgramData {
    id: string;
    title: string;
    shortDescription: string;
    fullDescription: string;
    icon: string;
    image: string;
    features: string[];
    stats: { value: string; label: string }[];
    contactPerson: string;
    contactEmail: string;
  }

  // State for all program data
  const [programsData, setProgramsData] = useState<Record<string, ProgramData>>({}); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgramsData = async () => {
      setLoading(true);
      try {
        // Fetch the centralized programs.json file
        const response = await fetch('/assets/data/programs.json');
        if (!response.ok) {
          throw new Error(`Failed to load programs data: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!data || !Array.isArray(data.programs)) {
          throw new Error('Invalid programs data format');
        }
        
        // Create a record with program ID as key for easier access
        const programsRecord: Record<string, ProgramData> = {};
        data.programs.forEach((program: ProgramData) => {
          programsRecord[program.id] = program;
        });
        
        setProgramsData(programsRecord);
      } catch (error) {
        console.error('Error loading programs data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProgramsData();
  }, []);

  // Program configurations with custom labels
  const programConfigs = [
    { id: "cancer-awareness-camp", label: "Early Detection Program" },
    { id: "world-cancer-day", label: "Annual Event" },
    { id: "compassion-home", label: "Accommodation Program" },
    { id: "ambulance-services", label: "Transportation Program" },
    { id: "community-kitchen", label: "Nutrition Program" },
    { id: "meals-for-invisibles", label: "Outreach Program" },
    { id: "sunday-program", label: "Community Program" }
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Programs & Services</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            The Tibetan Cancer Society offers a comprehensive range of programs and services to support cancer patients, survivors, and their families.
          </p>
        </div>
        
        {loading ? (
          <div className="space-y-10">
            {programConfigs.map((config) => (
              <ProgramCard 
                key={config.id}
                program={null as any}
                label={config.label}
                loading={true}
              />
            ))}
          </div>
        ) : (
          <div>
            {programConfigs.map((config) => {
              const program = programsData[config.id];
              return (
                <ProgramCard 
                  key={config.id}
                  program={program}
                  label={config.label}
                />
              );
            })}
          </div>
        )}
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Words of Hope</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Read stories from the brave individuals and families we've supported.
            </p>
          </div>
          <div className="overflow-hidden">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
            >
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id}>
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
                </CarouselItem>
              ))}
            </Carousel>
          </div>
          <div className="text-center mt-4">
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
