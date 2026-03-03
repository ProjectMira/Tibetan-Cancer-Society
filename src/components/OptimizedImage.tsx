import React, { useState, useRef, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  fallbackSrc?: string;
  loading?: 'lazy' | 'eager';
  onLoad?: () => void;
  onError?: (error: Event) => void;
  placeholder?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  fallbackSrc,
  loading = 'lazy',
  onLoad,
  onError,
  placeholder,
  style,
  onClick
}) => {
  const [imageSrc, setImageSrc] = useState<string>(placeholder || '');
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const [isInView, setIsInView] = useState(false);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (loading === 'eager') {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '50px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [loading]);

  // Set image source when in view
  useEffect(() => {
    if (isInView && !imageSrc && !hasError) {
      setImageSrc(src);
    }
  }, [isInView, src, imageSrc, hasError]);

  const handleLoad = () => {
    setIsLoaded(true);
    if (onLoad) onLoad();
  };

  const handleError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const target = event.target as HTMLImageElement;
    
    // Avoid infinite error loops
    if (target.dataset.errorCount) {
      const errorCount = parseInt(target.dataset.errorCount) + 1;
      target.dataset.errorCount = errorCount.toString();
      
      if (errorCount > 3) {
        setHasError(true);
        const placeholderUrl = `https://via.placeholder.com/${width || 400}x${height || 400}/e5e7eb/6b7280?text=${encodeURIComponent(alt || 'Image')}`;
        setImageSrc(placeholderUrl);
        if (onError) onError(event.nativeEvent);
        return;
      }
    } else {
      target.dataset.errorCount = '1';
    }
    
    // Try fallback source first
    if (fallbackSrc && imageSrc !== fallbackSrc && !hasError) {
      setImageSrc(fallbackSrc);
      return;
    }
    
    // Try different file extensions if original failed
    const originalSrc = src;
    if (imageSrc === originalSrc && !hasError) {
      const basePath = originalSrc.substring(0, originalSrc.lastIndexOf('.'));
      const alternatives = ['.JPG', '.jpeg', '.JPEG', '.png', '.PNG'];
      
      for (const ext of alternatives) {
        if (!originalSrc.toLowerCase().endsWith(ext.toLowerCase())) {
          setImageSrc(basePath + ext);
          return;
        }
      }
    }
    
    // Final fallback to placeholder
    setHasError(true);
    const placeholderUrl = `https://via.placeholder.com/${width || 400}x${height || 400}/e5e7eb/6b7280?text=${encodeURIComponent(alt || 'Image')}`;
    setImageSrc(placeholderUrl);
    
    if (onError) onError(event.nativeEvent);
  };

  const imageStyles: React.CSSProperties = {
    ...style,
    opacity: isLoaded ? 1 : 0.7,
    transition: 'opacity 0.3s ease-in-out',
  };

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ width, height }}>
      {imageSrc ? (
        <img
          ref={imgRef}
          src={imageSrc}
          alt={alt}
          className="w-full h-full object-cover"
          style={imageStyles}
          onLoad={handleLoad}
          onError={handleError}
          onClick={onClick}
          loading={loading}
        />
      ) : (
        <div 
          ref={imgRef}
          className={`w-full h-full bg-gray-200 flex items-center justify-center ${className}`}
          style={{ width, height }}
        >
          <div className="text-gray-500 text-center">
            <div className="animate-pulse">Loading...</div>
          </div>
        </div>
      )}
      
      {!isLoaded && imageSrc && !hasError && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="text-gray-500">Loading...</div>
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;