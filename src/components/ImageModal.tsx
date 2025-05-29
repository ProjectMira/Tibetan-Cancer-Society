import React from 'react';

interface ImageModalProps {
  src: string;
  alt: string;
  onClose: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
  currentIndex?: number;
  totalImages?: number;
}

const ImageModal: React.FC<ImageModalProps> = ({
  src,
  alt,
  onClose,
  onNext,
  onPrevious,
  currentIndex,
  totalImages
}) => {
  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="flex items-center justify-center gap-4 max-w-[95vw]">
        {/* Previous button - outside the image */}
        {onPrevious && (
          <button
            className="bg-white/10 text-white rounded-full p-4 hover:bg-white/20 transition-colors z-20 flex-shrink-0"
            onClick={(e) => {
              e.stopPropagation();
              onPrevious();
            }}
            aria-label="Previous image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}
        
        {/* Image container */}
        <div className="relative max-w-4xl max-h-[85vh] overflow-hidden">
          {/* Close button - stays on the image */}
          <button 
            className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-colors z-20"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {/* Image */}
          <img 
            src={src} 
            alt={alt} 
            className="max-h-[85vh] max-w-full object-contain bg-white/10 backdrop-blur-sm rounded-lg" 
            onClick={(e) => e.stopPropagation()}
          />
          
          {/* Image counter */}
          {currentIndex !== undefined && totalImages !== undefined && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              {currentIndex + 1} / {totalImages}
            </div>
          )}
        </div>
        
        {/* Next button - outside the image */}
        {onNext && (
          <button
            className="bg-white/10 text-white rounded-full p-4 hover:bg-white/20 transition-colors z-20 flex-shrink-0"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            aria-label="Next image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default ImageModal;
