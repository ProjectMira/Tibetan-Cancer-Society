import React, { useEffect, useState } from 'react';
import PageLayout from '../components/PageLayout';
import { FileText, Award, Heart, Target, PlayCircle } from 'lucide-react';
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

  // Add state for media coverage
  const [mediaCoverage, setMediaCoverage] = React.useState<any[]>([]);
  const [loadingMedia, setLoadingMedia] = React.useState(true);
  const [errorMedia, setErrorMedia] = React.useState<string | null>(null);
  const [mediaModalOpen, setMediaModalOpen] = React.useState(false);
  const [mediaModalImages, setMediaModalImages] = React.useState<string[]>([]);
  const [mediaModalIndex, setMediaModalIndex] = React.useState<number>(-1);
  const [mediaModalTitle, setMediaModalTitle] = React.useState<string>('');

  React.useEffect(() => {
    const fetchMedia = async () => {
      try {
        const res = await fetch('/assets/data/media-coverage.json');
        if (!res.ok) throw new Error('Failed to fetch media coverage');
        const data = await res.json();
        setMediaCoverage(data.media_coverage || []);
      } catch (e) {
        setErrorMedia('Could not load media coverage.');
      } finally {
        setLoadingMedia(false);
      }
    };
    fetchMedia();
  }, []);

  const openMediaModal = (images: string[], idx: number, title: string) => {
    setMediaModalImages(images);
    setMediaModalIndex(idx);
    setMediaModalOpen(true);
    setMediaModalTitle(title);
  };
  const closeMediaModal = () => {
    setMediaModalOpen(false);
    setMediaModalImages([]);
    setMediaModalIndex(-1);
    setMediaModalTitle('');
  };
  const handleMediaPrev = () => {
    if (!mediaModalImages.length) return;
    const prevIdx = (mediaModalIndex - 1 + mediaModalImages.length) % mediaModalImages.length;
    setMediaModalIndex(prevIdx);
  };
  const handleMediaNext = () => {
    if (!mediaModalImages.length) return;
    const nextIdx = (mediaModalIndex + 1) % mediaModalImages.length;
    setMediaModalIndex(nextIdx);
  };

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative py-16 md:py-24">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src="/assets/hero-images/About Us.jpg" 
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
          <div className="inline-flex items-center bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full mb-6">
            <Heart className="h-3 w-3 mr-1" />
            <span>Our Story</span>
          </div>
          
          {/* About Organization Box */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 mb-12">
            <h2 className="text-3xl font-bold mb-4">Tibetan Cancer Society (TCS)</h2>
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
            <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-primary mb-6">
              <p className="text-gray-600 text-sm italic">
                TCS holds the distinction of being the first and only Tibetan cancer-focused society to be recognized and registered under the global UICC (Union for International Cancer Control) membership, further solidifying its credibility and commitment to global cancer care standards.
              </p>
            </div>
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
              <div className="rounded-xl overflow-hidden shadow-lg">
                <img 
                  src="/assets/home/Tsultrim Dorjee.png" 
                  alt="Tsultrim Dorjee - Founder of Tibetan Cancer Society" 
                  className="w-full h-auto"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/assets/placeholder-image.jpg';
                  }}
                />
              </div>
              <div className="text-center mt-4">
                <p className="text-gray-700 font-medium">Mr. Tsultrim Dorjee, Founder & CEO</p>
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
                To reduce the human and societal burden of cancer—particularly within the Tibetan refugee diaspora and other underserved populations—through awareness, early detection, patient navigation, emergency response, and comprehensive care.
              </p>
              <p className="text-gray-600 mb-6">
                We strive to ensure that every individual, regardless of socioeconomic status, geography, or nationality, has access to compassionate, equitable, and culturally respectful healthcare.
              </p>
              <p className="text-gray-600 mb-6">
                With deep hope and determination, we look forward to a future where our programs may also reach inside Tibet, bringing life-saving education, screening, and services to our people in their homeland.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-primary mb-1">2014</div>
                  <div className="text-sm text-gray-600">Year Founded</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-primary mb-1">75,000+</div>
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
                <div className="text-center text-pink-500 col-span-2">{errorDocs}</div>
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

      {/* Media Coverage Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full mb-2">
              <Award className="h-3 w-3 mr-1" />
              <span>Media Coverage</span>
            </div>
            <h2 className="text-3xl font-bold mb-4">Media Coverage of the Tibetan Cancer Society</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore how our work has been featured in the media over the years.
            </p>
          </div>
          {loadingMedia ? (
            <div className="text-center text-gray-500">Loading media coverage...</div>
          ) : errorMedia ? (
                            <div className="text-center text-pink-500">{errorMedia}</div>
          ) : (
            mediaCoverage.map((outlet, outletIdx) => (
              <div key={outletIdx} className="mb-12">
                <h3 className="text-2xl font-semibold mb-6 text-primary">{outlet.media_outlet}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                  {outlet.articles.map((article, artIdx) => {
                    // Normalize cover image to array
                    const images = Array.isArray(article['cover image']) ? article['cover image'] : [article['cover image']];
                    return images.map((img, imgIdx) => (
                      <div key={imgIdx} className="bg-white rounded-xl border border-gray-100 shadow-sm flex flex-col items-center p-4">
                        <div
                          className="w-full h-56 flex items-center justify-center overflow-hidden rounded-lg mb-3 cursor-pointer bg-white"
                          onClick={() => openMediaModal(images, imgIdx, outlet.media_outlet)}
                        >
                          <img
                            src={img}
                            alt={outlet.media_outlet + ' media coverage'}
                            className="object-contain max-h-56 w-auto max-w-full"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = '/assets/placeholders/placeholder-image.svg';
                            }}
                          />
                        </div>
                        <div className="text-center w-full">
                          <div className="font-semibold text-base mb-1 mt-1 break-words leading-tight">{article.date}</div>
                          {article.article_link && (
                            <a
                              href={article.article_link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline text-sm"
                            >
                              Read Article
                            </a>
                          )}
                        </div>
                      </div>
                    ));
                  })}
                </div>
              </div>
            ))
          )}
        </div>
        {/* Media Image Modal */}
        {mediaModalOpen && mediaModalImages.length > 0 && (
          <ImageModal
            src={mediaModalImages[mediaModalIndex]}
            alt={mediaModalTitle + ' media coverage'}
            onClose={closeMediaModal}
            onNext={mediaModalImages.length > 1 ? handleMediaNext : undefined}
            onPrevious={mediaModalImages.length > 1 ? handleMediaPrev : undefined}
            currentIndex={mediaModalIndex}
            totalImages={mediaModalImages.length}
          />
        )}
      </section>

      {/* Health Camp Videos Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full mb-2">
              <PlayCircle className="h-3 w-3 mr-1" />
              <span>Video Gallery</span>
            </div>
            <h2 className="text-3xl font-bold mb-4">Tibetan Cancer Society Media</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Watch interviews and media coverage featuring our work in cancer awareness, ambulance services, and community support programs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { id: "8rSR2sf3VC0", title: "In conversation with the founder of Tibetan Cancer Society", url: "https://www.youtube.com/watch?v=8rSR2sf3VC0" },
              { id: "LwsGgLF4XRM", title: "Tsultrim Dorjee on Tibetan Cancer Society in COVID Times", url: "https://www.youtube.com/watch?v=LwsGgLF4XRM" },
              { id: "MWz66bWh3e8", title: "Tibetan Cancer Society and their 'Meals for the Invisibles'", url: "https://www.youtube.com/watch?v=MWz66bWh3e8" },
              { id: "Ef3TrtQQEqk", title: "In Conversation with TYC & Tibet Cancer Society president about social work in BodhGaya", url: "https://www.youtube.com/watch?v=Ef3TrtQQEqk" },
              { id: "QocmgZdAywE", title: "Tibetan Cancer Society launches new Ambulance to help patients and poor in Delhi", url: "https://www.youtube.com/watch?v=QocmgZdAywE" }
            ].map((video, index) => {
              const embedUrl = `https://www.youtube.com/embed/${video.id}`;
              
              return (
                <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="aspect-video">
                    <iframe
                      src={embedUrl}
                      title={video.title}
                      className="w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">{video.title}</h3>
                    <p className="text-sm text-gray-600">
                      Media coverage and interviews about our organization's mission and impact.
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>


    </PageLayout>
  );
};

export default About;
