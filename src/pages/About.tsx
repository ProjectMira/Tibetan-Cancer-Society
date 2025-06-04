import React, { useEffect, useState } from 'react';
import PageLayout from '../components/PageLayout';
import { FileText, Award, Heart, Target } from 'lucide-react';
import ImageModal from '../components/ImageModal';

// Helper to generate title from filename
function titleFromFilename(filename: string) {
  return filename
    .replace(/.*\//, '') // Remove path
    .replace(/[-_]/g, ' ')
    .replace(/\.[^.]+$/, '')
    .replace(/\b(\d{1,2})\b/g, ' $1')
    .replace(/\b([A-Z]{2,})\b/g, s => s.charAt(0) + s.slice(1).toLowerCase())
    .replace(/\b([a-z])/g, s => s.toUpperCase())
    .trim();
}

const About = () => {
  // Modal state
  const [modalDoc, setModalDoc] = React.useState<null | { src: string; title: string; description?: string }>(null);
  const [modalIndex, setModalIndex] = React.useState<number>(-1);
  const openModal = (doc: { image: string; title: string }, idx: number) => {
    setModalDoc({ src: doc.image, title: doc.title });
    setModalIndex(idx);
  };
  const closeModal = () => {
    setModalDoc(null);
    setModalIndex(-1);
  };
  const handlePrev = () => {
    if (!documentImages.length) return;
    const prevIdx = (modalIndex - 1 + documentImages.length) % documentImages.length;
    setModalDoc({ src: documentImages[prevIdx].image, title: documentImages[prevIdx].title });
    setModalIndex(prevIdx);
  };
  const handleNext = () => {
    if (!documentImages.length) return;
    const nextIdx = (modalIndex + 1) % documentImages.length;
    setModalDoc({ src: documentImages[nextIdx].image, title: documentImages[nextIdx].title });
    setModalIndex(nextIdx);
  };

  // State for document images from JSON
  const [documentImages, setDocumentImages] = React.useState<{ image: string; title: string }[]>([]);
  const [loadingDocs, setLoadingDocs] = React.useState(true);
  const [errorDocs, setErrorDocs] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchDocs = async () => {
      try {
        const res = await fetch('/assets/data/documents.json');
        if (!res.ok) throw new Error('Failed to fetch documents');
        const data = await res.json();
        setDocumentImages(data[Object.keys(data)[0]] || []);
      } catch (e) {
        setErrorDocs('Could not load documents.');
      } finally {
        setLoadingDocs(false);
      }
    };
    fetchDocs();
  }, []);

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative py-16 md:py-24">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src="/assets/about-images/TCS.JPG" 
            alt="About Us Background" 
            className="w-full h-full object-cover" 
            style={{ objectPosition: '50% 30%' }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/assets/placeholders/placeholder-image.svg';
            }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Us</h1>
            <p className="text-xl mb-8">
              Learn about the Tibetan Cancer Society's history, mission, and the official recognition we've received.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <div className="inline-flex items-center bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full mb-2">
                <Heart className="h-3 w-3 mr-1" />
                <span>Our Story</span>
              </div>
              <h2 className="text-3xl font-bold mb-4">Introduction</h2>
              <p className="text-gray-600 mb-6">
                The Tibetan Cancer Society (TCS) is a non-profit organization dedicated to cancer prevention, early detection, and awareness in Tibetan communities. Founded by Mr. Tsultrim Dorjee in 2014 and officially registered in May 2015, TCS was created to address the urgent need for better cancer care in the Tibetan diaspora.
              </p>
              <p className="text-gray-600 mb-6">
                It was formally introduced during a 2016 health meeting organized by the Central Tibetan Administration, following His Holiness the Dalai Lama's call to improve Tibetan public health.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-primary mb-6">
                <p className="text-gray-600 text-sm italic">
                  TCS holds the distinction of being the first and only Tibetan cancer-focused society to be recognized and registered under the global UICC (Union for International Cancer Control) membership, further solidifying its credibility and commitment to global cancer care standards.
                </p>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="rounded-xl overflow-hidden shadow-lg">
                <img 
                  src="/assets/about-images/TCS.JPG" 
                  alt="Tibetan Cancer Society" 
                  className="w-full h-auto"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/assets/placeholder-image.jpg';
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Mission Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2 order-2 md:order-1">
              <div className="rounded-xl overflow-hidden shadow-lg">
                <img 
                  src="/assets/about-images/TCS-mission.png" 
                  alt="Our Mission" 
                  className="w-full h-auto"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/assets/placeholder-image.jpg';
                  }}
                />
              </div>
            </div>
            <div className="md:w-1/2 order-1 md:order-2">
              <div className="inline-flex items-center bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full mb-2">
                <Target className="h-3 w-3 mr-1" />
                <span>Our Purpose</span>
              </div>
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-gray-600 mb-6">
                At the Tibetan Cancer Society, our mission is to do everything possible to prevent cancer in Tibetan communities through early screening, awareness programs, and health education. We are committed to empowering individuals with knowledge about cancer prevention and encouraging regular check-ups for early detection.
              </p>
              <p className="text-gray-600 mb-6">
                We also provide crucial support to those affected by cancer, offering financial assistance for treatment, palliative care, rehabilitation, and overall welfare. Our work extends to research and awareness efforts to better understand and address the challenges faced by Tibetans living with cancer.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-primary mb-1">2014</div>
                  <div className="text-sm text-gray-600">Year Founded</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-primary mb-1">5000+</div>
                  <div className="text-sm text-gray-600">Lives Impacted</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Appreciation and Legal Documents Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full mb-2">
              <Award className="h-3 w-3 mr-1" />
              <span>Recognition</span>
            </div>
            <h2 className="text-3xl font-bold mb-4">Appreciation and Legal Documents</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Recognition and legal documentation are vital for our mission—these letters and certificates reflect the trust, support, and official status granted to the Tibetan Cancer Society by various authorities and partners.
            </p>
          </div>

          {/* Unified Documents Grid */}
          <div className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {loadingDocs ? (
                <div className="text-center text-gray-500 col-span-2">Loading documents...</div>
              ) : errorDocs ? (
                <div className="text-center text-red-500 col-span-2">{errorDocs}</div>
              ) : (
                documentImages.map((doc, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl border border-gray-200 shadow-md flex flex-col items-center mx-auto max-w-lg p-6"
                    style={{ minWidth: 320 }}
                  >
                    {/* Icon and Title Row */}
                    <div className="flex items-center w-full mb-4">
                      <div className="bg-primary/10 p-3 rounded-full mr-4 flex-shrink-0">
                        <FileText className="h-6 w-6 text-primary" />
                      </div>
                      <div className="font-bold text-lg text-gray-900 text-left">{doc.title}</div>
                    </div>
                    {/* Optional Description */}
                    {doc.description && (
                      <div className="text-gray-600 text-sm mb-4 w-full text-left">{doc.description}</div>
                    )}
                    {/* Image */}
                    <div
                      className="w-full flex items-center justify-center overflow-hidden rounded-lg border border-gray-100 bg-white mb-2 cursor-pointer"
                      style={{ minHeight: 320, maxHeight: 400 }}
                      onClick={() => openModal(doc, idx)}
                    >
                      <img
                        src={doc.image}
                        alt={doc.title}
                        className="object-contain max-h-96 w-auto max-w-full p-4"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/assets/placeholders/placeholder-image.svg';
                        }}
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Modal for full-size image */}
          {modalDoc && (
            <ImageModal
              src={modalDoc.src}
              alt={modalDoc.title}
              onClose={closeModal}
              onNext={handleNext}
              onPrevious={handlePrev}
              currentIndex={modalIndex}
              totalImages={documentImages.length}
            />
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary/5 p-8 md:p-12 rounded-2xl text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Join Us in Our Mission</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Help us continue our work in cancer prevention, awareness, and support for the Tibetan community.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="/donate" 
                className="bg-primary text-white hover:bg-primary/90 font-semibold py-3 px-6 rounded-full transition-colors"
              >
                Support Our Cause
              </a>
              <a 
                href="/contact" 
                className="bg-white text-primary border border-primary hover:bg-gray-50 font-semibold py-3 px-6 rounded-full transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default About;
