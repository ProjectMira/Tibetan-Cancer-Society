import React from 'react';

// Performance utilities for optimizing the application

/**
 * Preload critical resources
 */
export const preloadCriticalResources = () => {
  // Preload critical images
  const preloadImage = (src: string) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  };

  // Preload hero images
  preloadImage('/assets/hero-images/world cancer day .png');
  preloadImage('/assets/programs/cancer-day.jpg');
};

/**
 * Debounce function to limit API calls
 */
export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Throttle function to limit function calls
 */
export const throttle = <T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

/**
 * Lazy load components
 */
export const lazy = <T extends React.ComponentType<unknown>>(
  importFunc: () => Promise<{ default: T }>
): React.LazyExoticComponent<T> => {
  return React.lazy(importFunc);
};

/**
 * Cache management utilities
 */
export class CacheManager {
  private static cache = new Map<string, { data: unknown; timestamp: number; ttl: number }>();

  static set<T>(key: string, data: T, ttlMinutes: number = 30) {
    const ttl = ttlMinutes * 60 * 1000; // Convert to milliseconds
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    });
  }

  static get<T>(key: string): T | null {
    const cached = this.cache.get(key);
    if (!cached) return null;

    const now = Date.now();
    if (now - cached.timestamp > cached.ttl) {
      this.cache.delete(key);
      return null;
    }

    return cached.data as T;
  }

  static clear() {
    this.cache.clear();
  }

  static size() {
    return this.cache.size;
  }
}

/**
 * Image optimization utilities
 */
export const ImageOptimizer = {
  /**
   * Generate WebP version of image URL if supported
   */
  getOptimizedImageUrl: (originalUrl: string): string => {
    // External URLs are served as-is.
    if (originalUrl.startsWith('http')) return originalUrl;

    // Check if browser supports WebP
    const supportsWebP = (() => {
      try {
        const canvas = document.createElement('canvas') as HTMLCanvasElement & {
          toDataURL?: (type?: string) => string;
        };
        canvas.width = canvas.height = 1;
        if (typeof canvas.toDataURL !== 'function') {
          return false;
        }
        return canvas.toDataURL('image/webp').includes('image/webp');
      } catch {
        return false;
      }
    })();

    if (!supportsWebP) return originalUrl;

    // For local images, you could implement WebP conversion logic here
    // For now, return the original URL
    return originalUrl;
  },

  /**
   * Calculate responsive image sizes
   */
  getResponsiveSizes: (maxWidth: number) => {
    return `(max-width: 640px) 100vw, (max-width: 1024px) 50vw, ${maxWidth}px`;
  },

  /**
   * Generate srcSet for responsive images
   */
  generateSrcSet: (baseUrl: string, sizes: number[]) => {
    return sizes.map(size => `${baseUrl}?w=${size} ${size}w`).join(', ');
  }
};

/**
 * Bundle size analyzer
 */
export const BundleAnalyzer = {
  /**
   * Log bundle performance metrics
   */
  logPerformanceMetrics: () => {
    if ('performance' in window) {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      console.group('🚀 Performance Metrics');
      console.log(`📊 DOM Content Loaded: ${navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart}ms`);
      console.log(`⏱️ Page Load Time: ${navigation.loadEventEnd - navigation.loadEventStart}ms`);
      console.log(`🌐 DNS Lookup: ${navigation.domainLookupEnd - navigation.domainLookupStart}ms`);
      console.log(`🔗 TCP Connect: ${navigation.connectEnd - navigation.connectStart}ms`);
      console.groupEnd();
    }
  },

  /**
   * Monitor memory usage (Chrome only)
   */
  monitorMemoryUsage: () => {
    const memoryPerformance = performance as Performance & {
      memory?: {
        usedJSHeapSize: number;
        totalJSHeapSize: number;
        jsHeapSizeLimit: number;
      };
    };
    if (memoryPerformance.memory) {
      const memory = memoryPerformance.memory;
      console.group('💾 Memory Usage');
      console.log(`Used: ${(memory.usedJSHeapSize / 1048576).toFixed(2)} MB`);
      console.log(`Total: ${(memory.totalJSHeapSize / 1048576).toFixed(2)} MB`);
      console.log(`Limit: ${(memory.jsHeapSizeLimit / 1048576).toFixed(2)} MB`);
      console.groupEnd();
    }
  }
};
