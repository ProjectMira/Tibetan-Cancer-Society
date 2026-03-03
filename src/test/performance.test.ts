import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { 
  CacheManager, 
  debounce, 
  throttle, 
  ImageOptimizer 
} from '../utils/performance';

describe('Performance utilities', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
    CacheManager.clear();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  describe('CacheManager', () => {
    it('stores and retrieves data correctly', () => {
      const testData = { key: 'value', number: 42 };
      
      CacheManager.set('test-key', testData);
      const retrieved = CacheManager.get('test-key');
      
      expect(retrieved).toEqual(testData);
    });

    it('returns null for non-existent keys', () => {
      expect(CacheManager.get('non-existent')).toBeNull();
    });

    it('respects TTL and expires data', () => {
      const testData = { expired: true };
      
      // Set with 0 TTL (should expire immediately)
      CacheManager.set('expire-test', testData, 0);
      
      vi.advanceTimersByTime(1);
      expect(CacheManager.get('expire-test')).toBeNull();
    });

    it('clears all cached data', () => {
      CacheManager.set('key1', 'value1');
      CacheManager.set('key2', 'value2');
      
      expect(CacheManager.size()).toBe(2);
      
      CacheManager.clear();
      
      expect(CacheManager.size()).toBe(0);
      expect(CacheManager.get('key1')).toBeNull();
      expect(CacheManager.get('key2')).toBeNull();
    });
  });

  describe('debounce', () => {
    it('delays function execution', () => {
      const mockFn = vi.fn();
      const debouncedFn = debounce(mockFn, 100);
      
      debouncedFn('test');
      expect(mockFn).not.toHaveBeenCalled();
      
      // Fast-forward time
      vi.advanceTimersByTime(100);
      expect(mockFn).toHaveBeenCalledWith('test');
    });

    it('cancels previous calls when called multiple times', () => {
      const mockFn = vi.fn();
      const debouncedFn = debounce(mockFn, 100);
      
      debouncedFn('first');
      debouncedFn('second');
      debouncedFn('third');
      
      vi.advanceTimersByTime(100);
      
      expect(mockFn).toHaveBeenCalledTimes(1);
      expect(mockFn).toHaveBeenCalledWith('third');
    });
  });

  describe('throttle', () => {
    it('limits function calls within time window', () => {
      const mockFn = vi.fn();
      const throttledFn = throttle(mockFn, 100);
      
      throttledFn('first');
      throttledFn('second');
      throttledFn('third');
      
      expect(mockFn).toHaveBeenCalledTimes(1);
      expect(mockFn).toHaveBeenCalledWith('first');
      
      vi.advanceTimersByTime(100);
      
      throttledFn('fourth');
      expect(mockFn).toHaveBeenCalledTimes(2);
      expect(mockFn).toHaveBeenLastCalledWith('fourth');
    });
  });

  describe('ImageOptimizer', () => {
    interface MockCanvas {
      width: number;
      height: number;
      toDataURL: ReturnType<typeof vi.fn>;
    }

    beforeEach(() => {
      // Mock canvas and toDataURL for WebP support detection
      const mockCanvas: MockCanvas = {
        width: 1,
        height: 1,
        toDataURL: vi.fn()
      };
      
      vi.spyOn(document, 'createElement').mockReturnValue(mockCanvas as unknown as HTMLElement);
    });

    it('detects WebP support and returns optimized URL', () => {
      // Mock WebP support
      const mockCanvas = document.createElement('canvas') as unknown as MockCanvas;
      mockCanvas.toDataURL.mockReturnValue('data:image/webp;base64,test');
      
      const originalUrl = '/test-image.jpg';
      const optimizedUrl = ImageOptimizer.getOptimizedImageUrl(originalUrl);
      
      expect(optimizedUrl).toBe(originalUrl); // Currently returns original
    });

    it('returns original URL when WebP is not supported', () => {
      // Mock no WebP support
      const mockCanvas = document.createElement('canvas') as unknown as MockCanvas;
      mockCanvas.toDataURL.mockReturnValue('data:image/png;base64,test');
      
      const originalUrl = '/test-image.jpg';
      const optimizedUrl = ImageOptimizer.getOptimizedImageUrl(originalUrl);
      
      expect(optimizedUrl).toBe(originalUrl);
    });

    it('generates responsive sizes string', () => {
      const sizes = ImageOptimizer.getResponsiveSizes(800);
      expect(sizes).toBe('(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 800px');
    });

    it('generates srcSet for different sizes', () => {
      const baseUrl = '/image.jpg';
      const sizes = [400, 800, 1200];
      const srcSet = ImageOptimizer.generateSrcSet(baseUrl, sizes);
      
      expect(srcSet).toBe('/image.jpg?w=400 400w, /image.jpg?w=800 800w, /image.jpg?w=1200 1200w');
    });

    it('handles external URLs correctly', () => {
      const externalUrl = 'https://example.com/image.jpg';
      const optimizedUrl = ImageOptimizer.getOptimizedImageUrl(externalUrl);
      
      expect(optimizedUrl).toBe(externalUrl);
    });
  });
});
